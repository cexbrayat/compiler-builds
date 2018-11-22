import { Observable } from '../Observable';
import { Notification } from '../Notification';
import { ColdObservable } from './ColdObservable';
import { HotObservable } from './HotObservable';
import { SubscriptionLog } from './SubscriptionLog';
import { VirtualTimeScheduler, VirtualAction } from '../scheduler/VirtualTimeScheduler';
import { AsyncScheduler } from '../scheduler/AsyncScheduler';
const defaultMaxFrame = 750;
export class TestScheduler extends VirtualTimeScheduler {
    constructor(assertDeepEqual) {
        super(VirtualAction, defaultMaxFrame);
        this.assertDeepEqual = assertDeepEqual;
        this.hotObservables = [];
        this.coldObservables = [];
        this.flushTests = [];
        this.runMode = false;
    }
    createTime(marbles) {
        const indexOf = marbles.indexOf('|');
        if (indexOf === -1) {
            throw new Error('marble diagram for time should have a completion marker "|"');
        }
        return indexOf * TestScheduler.frameTimeFactor;
    }
    createColdObservable(marbles, values, error) {
        if (marbles.indexOf('^') !== -1) {
            throw new Error('cold observable cannot have subscription offset "^"');
        }
        if (marbles.indexOf('!') !== -1) {
            throw new Error('cold observable cannot have unsubscription marker "!"');
        }
        const messages = TestScheduler.parseMarbles(marbles, values, error, undefined, this.runMode);
        const cold = new ColdObservable(messages, this);
        this.coldObservables.push(cold);
        return cold;
    }
    createHotObservable(marbles, values, error) {
        if (marbles.indexOf('!') !== -1) {
            throw new Error('hot observable cannot have unsubscription marker "!"');
        }
        const messages = TestScheduler.parseMarbles(marbles, values, error, undefined, this.runMode);
        const subject = new HotObservable(messages, this);
        this.hotObservables.push(subject);
        return subject;
    }
    materializeInnerObservable(observable, outerFrame) {
        const messages = [];
        observable.subscribe((value) => {
            messages.push({ frame: this.frame - outerFrame, notification: Notification.createNext(value) });
        }, (err) => {
            messages.push({ frame: this.frame - outerFrame, notification: Notification.createError(err) });
        }, () => {
            messages.push({ frame: this.frame - outerFrame, notification: Notification.createComplete() });
        });
        return messages;
    }
    expectObservable(observable, subscriptionMarbles = null) {
        const actual = [];
        const flushTest = { actual, ready: false };
        const subscriptionParsed = TestScheduler.parseMarblesAsSubscriptions(subscriptionMarbles, this.runMode);
        const subscriptionFrame = subscriptionParsed.subscribedFrame === Number.POSITIVE_INFINITY ?
            0 : subscriptionParsed.subscribedFrame;
        const unsubscriptionFrame = subscriptionParsed.unsubscribedFrame;
        let subscription;
        this.schedule(() => {
            subscription = observable.subscribe(x => {
                let value = x;
                if (x instanceof Observable) {
                    value = this.materializeInnerObservable(value, this.frame);
                }
                actual.push({ frame: this.frame, notification: Notification.createNext(value) });
            }, (err) => {
                actual.push({ frame: this.frame, notification: Notification.createError(err) });
            }, () => {
                actual.push({ frame: this.frame, notification: Notification.createComplete() });
            });
        }, subscriptionFrame);
        if (unsubscriptionFrame !== Number.POSITIVE_INFINITY) {
            this.schedule(() => subscription.unsubscribe(), unsubscriptionFrame);
        }
        this.flushTests.push(flushTest);
        const { runMode } = this;
        return {
            toBe(marbles, values, errorValue) {
                flushTest.ready = true;
                flushTest.expected = TestScheduler.parseMarbles(marbles, values, errorValue, true, runMode);
            }
        };
    }
    expectSubscriptions(actualSubscriptionLogs) {
        const flushTest = { actual: actualSubscriptionLogs, ready: false };
        this.flushTests.push(flushTest);
        const { runMode } = this;
        return {
            toBe(marbles) {
                const marblesArray = (typeof marbles === 'string') ? [marbles] : marbles;
                flushTest.ready = true;
                flushTest.expected = marblesArray.map(marbles => TestScheduler.parseMarblesAsSubscriptions(marbles, runMode));
            }
        };
    }
    flush() {
        const hotObservables = this.hotObservables;
        while (hotObservables.length > 0) {
            hotObservables.shift().setup();
        }
        super.flush();
        this.flushTests = this.flushTests.filter(test => {
            if (test.ready) {
                this.assertDeepEqual(test.actual, test.expected);
                return false;
            }
            return true;
        });
    }
    static parseMarblesAsSubscriptions(marbles, runMode = false) {
        if (typeof marbles !== 'string') {
            return new SubscriptionLog(Number.POSITIVE_INFINITY);
        }
        const len = marbles.length;
        let groupStart = -1;
        let subscriptionFrame = Number.POSITIVE_INFINITY;
        let unsubscriptionFrame = Number.POSITIVE_INFINITY;
        let frame = 0;
        for (let i = 0; i < len; i++) {
            let nextFrame = frame;
            const advanceFrameBy = (count) => {
                nextFrame += count * this.frameTimeFactor;
            };
            const c = marbles[i];
            switch (c) {
                case ' ':
                    if (!runMode) {
                        advanceFrameBy(1);
                    }
                    break;
                case '-':
                    advanceFrameBy(1);
                    break;
                case '(':
                    groupStart = frame;
                    advanceFrameBy(1);
                    break;
                case ')':
                    groupStart = -1;
                    advanceFrameBy(1);
                    break;
                case '^':
                    if (subscriptionFrame !== Number.POSITIVE_INFINITY) {
                        throw new Error('found a second subscription point \'^\' in a ' +
                            'subscription marble diagram. There can only be one.');
                    }
                    subscriptionFrame = groupStart > -1 ? groupStart : frame;
                    advanceFrameBy(1);
                    break;
                case '!':
                    if (unsubscriptionFrame !== Number.POSITIVE_INFINITY) {
                        throw new Error('found a second subscription point \'^\' in a ' +
                            'subscription marble diagram. There can only be one.');
                    }
                    unsubscriptionFrame = groupStart > -1 ? groupStart : frame;
                    break;
                default:
                    if (runMode && c.match(/^[0-9]$/)) {
                        if (i === 0 || marbles[i - 1] === ' ') {
                            const buffer = marbles.slice(i);
                            const match = buffer.match(/^([0-9]+(?:\.[0-9]+)?)(ms|s|m) /);
                            if (match) {
                                i += match[0].length - 1;
                                const duration = parseFloat(match[1]);
                                const unit = match[2];
                                let durationInMs;
                                switch (unit) {
                                    case 'ms':
                                        durationInMs = duration;
                                        break;
                                    case 's':
                                        durationInMs = duration * 1000;
                                        break;
                                    case 'm':
                                        durationInMs = duration * 1000 * 60;
                                        break;
                                    default:
                                        break;
                                }
                                advanceFrameBy(durationInMs / this.frameTimeFactor);
                                break;
                            }
                        }
                    }
                    throw new Error('there can only be \'^\' and \'!\' markers in a ' +
                        'subscription marble diagram. Found instead \'' + c + '\'.');
            }
            frame = nextFrame;
        }
        if (unsubscriptionFrame < 0) {
            return new SubscriptionLog(subscriptionFrame);
        }
        else {
            return new SubscriptionLog(subscriptionFrame, unsubscriptionFrame);
        }
    }
    static parseMarbles(marbles, values, errorValue, materializeInnerObservables = false, runMode = false) {
        if (marbles.indexOf('!') !== -1) {
            throw new Error('conventional marble diagrams cannot have the ' +
                'unsubscription marker "!"');
        }
        const len = marbles.length;
        const testMessages = [];
        const subIndex = runMode ? marbles.replace(/^[ ]+/, '').indexOf('^') : marbles.indexOf('^');
        let frame = subIndex === -1 ? 0 : (subIndex * -this.frameTimeFactor);
        const getValue = typeof values !== 'object' ?
            (x) => x :
            (x) => {
                if (materializeInnerObservables && values[x] instanceof ColdObservable) {
                    return values[x].messages;
                }
                return values[x];
            };
        let groupStart = -1;
        for (let i = 0; i < len; i++) {
            let nextFrame = frame;
            const advanceFrameBy = (count) => {
                nextFrame += count * this.frameTimeFactor;
            };
            let notification;
            const c = marbles[i];
            switch (c) {
                case ' ':
                    if (!runMode) {
                        advanceFrameBy(1);
                    }
                    break;
                case '-':
                    advanceFrameBy(1);
                    break;
                case '(':
                    groupStart = frame;
                    advanceFrameBy(1);
                    break;
                case ')':
                    groupStart = -1;
                    advanceFrameBy(1);
                    break;
                case '|':
                    notification = Notification.createComplete();
                    advanceFrameBy(1);
                    break;
                case '^':
                    advanceFrameBy(1);
                    break;
                case '#':
                    notification = Notification.createError(errorValue || 'error');
                    advanceFrameBy(1);
                    break;
                default:
                    if (runMode && c.match(/^[0-9]$/)) {
                        if (i === 0 || marbles[i - 1] === ' ') {
                            const buffer = marbles.slice(i);
                            const match = buffer.match(/^([0-9]+(?:\.[0-9]+)?)(ms|s|m) /);
                            if (match) {
                                i += match[0].length - 1;
                                const duration = parseFloat(match[1]);
                                const unit = match[2];
                                let durationInMs;
                                switch (unit) {
                                    case 'ms':
                                        durationInMs = duration;
                                        break;
                                    case 's':
                                        durationInMs = duration * 1000;
                                        break;
                                    case 'm':
                                        durationInMs = duration * 1000 * 60;
                                        break;
                                    default:
                                        break;
                                }
                                advanceFrameBy(durationInMs / this.frameTimeFactor);
                                break;
                            }
                        }
                    }
                    notification = Notification.createNext(getValue(c));
                    advanceFrameBy(1);
                    break;
            }
            if (notification) {
                testMessages.push({ frame: groupStart > -1 ? groupStart : frame, notification });
            }
            frame = nextFrame;
        }
        return testMessages;
    }
    run(callback) {
        const prevFrameTimeFactor = TestScheduler.frameTimeFactor;
        const prevMaxFrames = this.maxFrames;
        TestScheduler.frameTimeFactor = 1;
        this.maxFrames = Number.POSITIVE_INFINITY;
        this.runMode = true;
        AsyncScheduler.delegate = this;
        const helpers = {
            cold: this.createColdObservable.bind(this),
            hot: this.createHotObservable.bind(this),
            flush: this.flush.bind(this),
            expectObservable: this.expectObservable.bind(this),
            expectSubscriptions: this.expectSubscriptions.bind(this),
        };
        try {
            const ret = callback(helpers);
            this.flush();
            return ret;
        }
        finally {
            TestScheduler.frameTimeFactor = prevFrameTimeFactor;
            this.maxFrames = prevMaxFrames;
            this.runMode = false;
            AsyncScheduler.delegate = undefined;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdFNjaGVkdWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2V4dGVybmFsL3J4anMvaW50ZXJuYWwvdGVzdGluZy9UZXN0U2NoZWR1bGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRXBELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxhQUFhLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFN0QsTUFBTSxlQUFlLEdBQVcsR0FBRyxDQUFDO0FBbUJwQyxNQUFNLE9BQU8sYUFBYyxTQUFRLG9CQUFvQjtJQU1yRCxZQUFtQixlQUErRDtRQUNoRixLQUFLLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBRHJCLG9CQUFlLEdBQWYsZUFBZSxDQUFnRDtRQUxsRSxtQkFBYyxHQUF5QixFQUFFLENBQUM7UUFDMUMsb0JBQWUsR0FBMEIsRUFBRSxDQUFDO1FBQ3BELGVBQVUsR0FBb0IsRUFBRSxDQUFDO1FBQ2pDLFlBQU8sR0FBRyxLQUFLLENBQUM7SUFJeEIsQ0FBQztJQUVELFVBQVUsQ0FBQyxPQUFlO1FBQ3hCLE1BQU0sT0FBTyxHQUFXLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsSUFBSSxPQUFPLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyw2REFBNkQsQ0FBQyxDQUFDO1NB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QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDbEQsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDekQsQ0FBQztRQUNGLElBQUk7WUFDRixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2IsT0FBTyxHQUFHLENBQUM7U0FDWjtnQkFBUztZQUNSLGFBQWEsQ0FBQyxlQUFlLEdBQUcsbUJBQW1CLENBQUM7WUFDcEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7WUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsY0FBYyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7U0FDckM7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb24gfSBmcm9tICcuLi9Ob3RpZmljYXRpb24nO1xuaW1wb3J0IHsgQ29sZE9ic2VydmFibGUgfSBmcm9tICcuL0NvbGRPYnNlcnZhYmxlJztcbmltcG9ydCB7IEhvdE9ic2VydmFibGUgfSBmcm9tICcuL0hvdE9ic2VydmFibGUnO1xuaW1wb3J0IHsgVGVzdE1lc3NhZ2UgfSBmcm9tICcuL1Rlc3RNZXNzYWdlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbkxvZyB9IGZyb20gJy4vU3Vic2NyaXB0aW9uTG9nJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBWaXJ0dWFsVGltZVNjaGVkdWxlciwgVmlydHVhbEFjdGlvbiB9IGZyb20gJy4uL3NjaGVkdWxlci9WaXJ0dWFsVGltZVNjaGVkdWxlcic7XG5pbXBvcnQgeyBBc3luY1NjaGVkdWxlciB9IGZyb20gJy4uL3NjaGVkdWxlci9Bc3luY1NjaGVkdWxlcic7XG5cbmNvbnN0IGRlZmF1bHRNYXhGcmFtZTogbnVtYmVyID0gNzUwO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJ1bkhlbHBlcnMge1xuICBjb2xkOiB0eXBlb2YgVGVzdFNjaGVkdWxlci5wcm90b3R5cGUuY3JlYXRlQ29sZE9ic2VydmFibGU7XG4gIGhvdDogdHlwZW9mIFRlc3RTY2hlZHVsZXIucHJvdG90eXBlLmNyZWF0ZUhvdE9ic2VydmFibGU7XG4gIGZsdXNoOiB0eXBlb2YgVGVzdFNjaGVkdWxlci5wcm90b3R5cGUuZmx1c2g7XG4gIGV4cGVjdE9ic2VydmFibGU6IHR5cGVvZiBUZXN0U2NoZWR1bGVyLnByb3RvdHlwZS5leHBlY3RPYnNlcnZhYmxlO1xuICBleHBlY3RTdWJzY3JpcHRpb25zOiB0eXBlb2YgVGVzdFNjaGVkdWxlci5wcm90b3R5cGUuZXhwZWN0U3Vic2NyaXB0aW9ucztcbn1cblxuaW50ZXJmYWNlIEZsdXNoYWJsZVRlc3Qge1xuICByZWFkeTogYm9vbGVhbjtcbiAgYWN0dWFsPzogYW55W107XG4gIGV4cGVjdGVkPzogYW55W107XG59XG5cbmV4cG9ydCB0eXBlIG9ic2VydmFibGVUb0JlRm4gPSAobWFyYmxlczogc3RyaW5nLCB2YWx1ZXM/OiBhbnksIGVycm9yVmFsdWU/OiBhbnkpID0+IHZvaWQ7XG5leHBvcnQgdHlwZSBzdWJzY3JpcHRpb25Mb2dzVG9CZUZuID0gKG1hcmJsZXM6IHN0cmluZyB8IHN0cmluZ1tdKSA9PiB2b2lkO1xuXG5leHBvcnQgY2xhc3MgVGVzdFNjaGVkdWxlciBleHRlbmRzIFZpcnR1YWxUaW1lU2NoZWR1bGVyIHtcbiAgcHVibGljIHJlYWRvbmx5IGhvdE9ic2VydmFibGVzOiBIb3RPYnNlcnZhYmxlPGFueT5bXSA9IFtdO1xuICBwdWJsaWMgcmVhZG9ubHkgY29sZE9ic2VydmFibGVzOiBDb2xkT2JzZXJ2YWJsZTxhbnk+W10gPSBbXTtcbiAgcHJpdmF0ZSBmbHVzaFRlc3RzOiBGbHVzaGFibGVUZXN0W10gPSBbXTtcbiAgcHJpdmF0ZSBydW5Nb2RlID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGFzc2VydERlZXBFcXVhbDogKGFjdHVhbDogYW55LCBleHBlY3RlZDogYW55KSA9PiBib29sZWFuIHwgdm9pZCkge1xuICAgIHN1cGVyKFZpcnR1YWxBY3Rpb24sIGRlZmF1bHRNYXhGcmFtZSk7XG4gIH1cblxuICBjcmVhdGVUaW1lKG1hcmJsZXM6IHN0cmluZyk6IG51bWJlciB7XG4gICAgY29uc3QgaW5kZXhPZjogbnVtYmVyID0gbWFyYmxlcy5pbmRleE9mKCd8Jyk7XG4gICAgaWYgKGluZGV4T2YgPT09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ21hcmJsZSBkaWFncmFtIGZvciB0aW1lIHNob3VsZCBoYXZlIGEgY29tcGxldGlvbiBtYXJrZXIgXCJ8XCInKTtcbiAgICB9XG4gICAgcmV0dXJuIGluZGV4T2YgKiBUZXN0U2NoZWR1bGVyLmZyYW1lVGltZUZhY3RvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gbWFyYmxlcyBBIGRpYWdyYW0gaW4gdGhlIG1hcmJsZSBEU0wuIExldHRlcnMgbWFwIHRvIGtleXMgaW4gYHZhbHVlc2AgaWYgcHJvdmlkZWQuXG4gICAqIEBwYXJhbSB2YWx1ZXMgVmFsdWVzIHRvIHVzZSBmb3IgdGhlIGxldHRlcnMgaW4gYG1hcmJsZXNgLiBJZiBvbW1pdHRlZCwgdGhlIGxldHRlcnMgdGhlbXNlbHZlcyBhcmUgdXNlZC5cbiAgICogQHBhcmFtIGVycm9yIFRoZSBlcnJvciB0byB1c2UgZm9yIHRoZSBgI2AgbWFyYmxlIChpZiBwcmVzZW50KS5cbiAgICovXG4gIGNyZWF0ZUNvbGRPYnNlcnZhYmxlPFQgPSBzdHJpbmc+KG1hcmJsZXM6IHN0cmluZywgdmFsdWVzPzogeyBbbWFyYmxlOiBzdHJpbmddOiBUIH0sIGVycm9yPzogYW55KTogQ29sZE9ic2VydmFibGU8VD4ge1xuICAgIGlmIChtYXJibGVzLmluZGV4T2YoJ14nKSAhPT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY29sZCBvYnNlcnZhYmxlIGNhbm5vdCBoYXZlIHN1YnNjcmlwdGlvbiBvZmZzZXQgXCJeXCInKTtcbiAgICB9XG4gICAgaWYgKG1hcmJsZXMuaW5kZXhPZignIScpICE9PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb2xkIG9ic2VydmFibGUgY2Fubm90IGhhdmUgdW5zdWJzY3JpcHRpb24gbWFya2VyIFwiIVwiJyk7XG4gICAgfVxuICAgIGNvbnN0IG1lc3NhZ2VzID0gVGVzdFNjaGVkdWxlci5wYXJzZU1hcmJsZXMobWFyYmxlcywgdmFsdWVzLCBlcnJvciwgdW5kZWZpbmVkLCB0aGlzLnJ1bk1vZGUpO1xuICAgIGNvbnN0IGNvbGQgPSBuZXcgQ29sZE9ic2VydmFibGU8VD4obWVzc2FnZXMsIHRoaXMpO1xuICAgIHRoaXMuY29sZE9ic2VydmFibGVzLnB1c2goY29sZCk7XG4gICAgcmV0dXJuIGNvbGQ7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIG1hcmJsZXMgQSBkaWFncmFtIGluIHRoZSBtYXJibGUgRFNMLiBMZXR0ZXJzIG1hcCB0byBrZXlzIGluIGB2YWx1ZXNgIGlmIHByb3ZpZGVkLlxuICAgKiBAcGFyYW0gdmFsdWVzIFZhbHVlcyB0byB1c2UgZm9yIHRoZSBsZXR0ZXJzIGluIGBtYXJibGVzYC4gSWYgb21taXR0ZWQsIHRoZSBsZXR0ZXJzIHRoZW1zZWx2ZXMgYXJlIHVzZWQuXG4gICAqIEBwYXJhbSBlcnJvciBUaGUgZXJyb3IgdG8gdXNlIGZvciB0aGUgYCNgIG1hcmJsZSAoaWYgcHJlc2VudCkuXG4gICAqL1xuICBjcmVhdGVIb3RPYnNlcnZhYmxlPFQgPSBzdHJpbmc+KG1hcmJsZXM6IHN0cmluZywgdmFsdWVzPzogeyBbbWFyYmxlOiBzdHJpbmddOiBUIH0sIGVycm9yPzogYW55KTogSG90T2JzZXJ2YWJsZTxUPiB7XG4gICAgaWYgKG1hcmJsZXMuaW5kZXhPZignIScpICE9PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdob3Qgb2JzZXJ2YWJsZSBjYW5ub3QgaGF2ZSB1bnN1YnNjcmlwdGlvbiBtYXJrZXIgXCIhXCInKTtcbiAgICB9XG4gICAgY29uc3QgbWVzc2FnZXMgPSBUZXN0U2NoZWR1bGVyLnBhcnNlTWFyYmxlcyhtYXJibGVzLCB2YWx1ZXMsIGVycm9yLCB1bmRlZmluZWQsIHRoaXMucnVuTW9kZSk7XG4gICAgY29uc3Qgc3ViamVjdCA9IG5ldyBIb3RPYnNlcnZhYmxlPFQ+KG1lc3NhZ2VzLCB0aGlzKTtcbiAgICB0aGlzLmhvdE9ic2VydmFibGVzLnB1c2goc3ViamVjdCk7XG4gICAgcmV0dXJuIHN1YmplY3Q7XG4gIH1cblxuICBwcml2YXRlIG1hdGVyaWFsaXplSW5uZXJPYnNlcnZhYmxlKG9ic2VydmFibGU6IE9ic2VydmFibGU8YW55PixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRlckZyYW1lOiBudW1iZXIpOiBUZXN0TWVzc2FnZVtdIHtcbiAgICBjb25zdCBtZXNzYWdlczogVGVzdE1lc3NhZ2VbXSA9IFtdO1xuICAgIG9ic2VydmFibGUuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgbWVzc2FnZXMucHVzaCh7IGZyYW1lOiB0aGlzLmZyYW1lIC0gb3V0ZXJGcmFtZSwgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb24uY3JlYXRlTmV4dCh2YWx1ZSkgfSk7XG4gICAgfSwgKGVycikgPT4ge1xuICAgICAgbWVzc2FnZXMucHVzaCh7IGZyYW1lOiB0aGlzLmZyYW1lIC0gb3V0ZXJGcmFtZSwgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb24uY3JlYXRlRXJyb3IoZXJyKSB9KTtcbiAgICB9LCAoKSA9PiB7XG4gICAgICBtZXNzYWdlcy5wdXNoKHsgZnJhbWU6IHRoaXMuZnJhbWUgLSBvdXRlckZyYW1lLCBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbi5jcmVhdGVDb21wbGV0ZSgpIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBtZXNzYWdlcztcbiAgfVxuXG4gIGV4cGVjdE9ic2VydmFibGUob2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxhbnk+LFxuICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbk1hcmJsZXM6IHN0cmluZyA9IG51bGwpOiAoeyB0b0JlOiBvYnNlcnZhYmxlVG9CZUZuIH0pIHtcbiAgICBjb25zdCBhY3R1YWw6IFRlc3RNZXNzYWdlW10gPSBbXTtcbiAgICBjb25zdCBmbHVzaFRlc3Q6IEZsdXNoYWJsZVRlc3QgPSB7IGFjdHVhbCwgcmVhZHk6IGZhbHNlIH07XG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uUGFyc2VkID0gVGVzdFNjaGVkdWxlci5wYXJzZU1hcmJsZXNBc1N1YnNjcmlwdGlvbnMoc3Vic2NyaXB0aW9uTWFyYmxlcywgdGhpcy5ydW5Nb2RlKTtcbiAgICBjb25zdCBzdWJzY3JpcHRpb25GcmFtZSA9IHN1YnNjcmlwdGlvblBhcnNlZC5zdWJzY3JpYmVkRnJhbWUgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSA/XG4gICAgICAwIDogc3Vic2NyaXB0aW9uUGFyc2VkLnN1YnNjcmliZWRGcmFtZTtcbiAgICBjb25zdCB1bnN1YnNjcmlwdGlvbkZyYW1lID0gc3Vic2NyaXB0aW9uUGFyc2VkLnVuc3Vic2NyaWJlZEZyYW1lO1xuICAgIGxldCBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xuICAgICAgc3Vic2NyaXB0aW9uID0gb2JzZXJ2YWJsZS5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHg7XG4gICAgICAgIC8vIFN1cHBvcnQgT2JzZXJ2YWJsZS1vZi1PYnNlcnZhYmxlc1xuICAgICAgICBpZiAoeCBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcbiAgICAgICAgICB2YWx1ZSA9IHRoaXMubWF0ZXJpYWxpemVJbm5lck9ic2VydmFibGUodmFsdWUsIHRoaXMuZnJhbWUpO1xuICAgICAgICB9XG4gICAgICAgIGFjdHVhbC5wdXNoKHsgZnJhbWU6IHRoaXMuZnJhbWUsIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uLmNyZWF0ZU5leHQodmFsdWUpIH0pO1xuICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICBhY3R1YWwucHVzaCh7IGZyYW1lOiB0aGlzLmZyYW1lLCBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbi5jcmVhdGVFcnJvcihlcnIpIH0pO1xuICAgICAgfSwgKCkgPT4ge1xuICAgICAgICBhY3R1YWwucHVzaCh7IGZyYW1lOiB0aGlzLmZyYW1lLCBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbi5jcmVhdGVDb21wbGV0ZSgpIH0pO1xuICAgICAgfSk7XG4gICAgfSwgc3Vic2NyaXB0aW9uRnJhbWUpO1xuXG4gICAgaWYgKHVuc3Vic2NyaXB0aW9uRnJhbWUgIT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSkge1xuICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKSwgdW5zdWJzY3JpcHRpb25GcmFtZSk7XG4gICAgfVxuXG4gICAgdGhpcy5mbHVzaFRlc3RzLnB1c2goZmx1c2hUZXN0KTtcbiAgICBjb25zdCB7IHJ1bk1vZGUgfSA9IHRoaXM7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdG9CZShtYXJibGVzOiBzdHJpbmcsIHZhbHVlcz86IGFueSwgZXJyb3JWYWx1ZT86IGFueSkge1xuICAgICAgICBmbHVzaFRlc3QucmVhZHkgPSB0cnVlO1xuICAgICAgICBmbHVzaFRlc3QuZXhwZWN0ZWQgPSBUZXN0U2NoZWR1bGVyLnBhcnNlTWFyYmxlcyhtYXJibGVzLCB2YWx1ZXMsIGVycm9yVmFsdWUsIHRydWUsIHJ1bk1vZGUpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBleHBlY3RTdWJzY3JpcHRpb25zKGFjdHVhbFN1YnNjcmlwdGlvbkxvZ3M6IFN1YnNjcmlwdGlvbkxvZ1tdKTogKHsgdG9CZTogc3Vic2NyaXB0aW9uTG9nc1RvQmVGbiB9KSB7XG4gICAgY29uc3QgZmx1c2hUZXN0OiBGbHVzaGFibGVUZXN0ID0geyBhY3R1YWw6IGFjdHVhbFN1YnNjcmlwdGlvbkxvZ3MsIHJlYWR5OiBmYWxzZSB9O1xuICAgIHRoaXMuZmx1c2hUZXN0cy5wdXNoKGZsdXNoVGVzdCk7XG4gICAgY29uc3QgeyBydW5Nb2RlIH0gPSB0aGlzO1xuICAgIHJldHVybiB7XG4gICAgICB0b0JlKG1hcmJsZXM6IHN0cmluZyB8IHN0cmluZ1tdKSB7XG4gICAgICAgIGNvbnN0IG1hcmJsZXNBcnJheTogc3RyaW5nW10gPSAodHlwZW9mIG1hcmJsZXMgPT09ICdzdHJpbmcnKSA/IFttYXJibGVzXSA6IG1hcmJsZXM7XG4gICAgICAgIGZsdXNoVGVzdC5yZWFkeSA9IHRydWU7XG4gICAgICAgIGZsdXNoVGVzdC5leHBlY3RlZCA9IG1hcmJsZXNBcnJheS5tYXAobWFyYmxlcyA9PlxuICAgICAgICAgIFRlc3RTY2hlZHVsZXIucGFyc2VNYXJibGVzQXNTdWJzY3JpcHRpb25zKG1hcmJsZXMsIHJ1bk1vZGUpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGZsdXNoKCkge1xuICAgIGNvbnN0IGhvdE9ic2VydmFibGVzID0gdGhpcy5ob3RPYnNlcnZhYmxlcztcbiAgICB3aGlsZSAoaG90T2JzZXJ2YWJsZXMubGVuZ3RoID4gMCkge1xuICAgICAgaG90T2JzZXJ2YWJsZXMuc2hpZnQoKS5zZXR1cCgpO1xuICAgIH1cblxuICAgIHN1cGVyLmZsdXNoKCk7XG5cbiAgICB0aGlzLmZsdXNoVGVzdHMgPSB0aGlzLmZsdXNoVGVzdHMuZmlsdGVyKHRlc3QgPT4ge1xuICAgICAgaWYgKHRlc3QucmVhZHkpIHtcbiAgICAgICAgdGhpcy5hc3NlcnREZWVwRXF1YWwodGVzdC5hY3R1YWwsIHRlc3QuZXhwZWN0ZWQpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAbm9jb2xsYXBzZSAqL1xuICBzdGF0aWMgcGFyc2VNYXJibGVzQXNTdWJzY3JpcHRpb25zKG1hcmJsZXM6IHN0cmluZywgcnVuTW9kZSA9IGZhbHNlKTogU3Vic2NyaXB0aW9uTG9nIHtcbiAgICBpZiAodHlwZW9mIG1hcmJsZXMgIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gbmV3IFN1YnNjcmlwdGlvbkxvZyhOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkpO1xuICAgIH1cbiAgICBjb25zdCBsZW4gPSBtYXJibGVzLmxlbmd0aDtcbiAgICBsZXQgZ3JvdXBTdGFydCA9IC0xO1xuICAgIGxldCBzdWJzY3JpcHRpb25GcmFtZSA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgICBsZXQgdW5zdWJzY3JpcHRpb25GcmFtZSA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgICBsZXQgZnJhbWUgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGV0IG5leHRGcmFtZSA9IGZyYW1lO1xuICAgICAgY29uc3QgYWR2YW5jZUZyYW1lQnkgPSAoY291bnQ6IG51bWJlcikgPT4ge1xuICAgICAgICBuZXh0RnJhbWUgKz0gY291bnQgKiB0aGlzLmZyYW1lVGltZUZhY3RvcjtcbiAgICAgIH07XG4gICAgICBjb25zdCBjID0gbWFyYmxlc1tpXTtcbiAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICBjYXNlICcgJzpcbiAgICAgICAgICAvLyBXaGl0ZXNwYWNlIG5vIGxvbmdlciBhZHZhbmNlcyB0aW1lXG4gICAgICAgICAgaWYgKCFydW5Nb2RlKSB7XG4gICAgICAgICAgICBhZHZhbmNlRnJhbWVCeSgxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJy0nOlxuICAgICAgICAgIGFkdmFuY2VGcmFtZUJ5KDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICcoJzpcbiAgICAgICAgICBncm91cFN0YXJ0ID0gZnJhbWU7XG4gICAgICAgICAgYWR2YW5jZUZyYW1lQnkoMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJyknOlxuICAgICAgICAgIGdyb3VwU3RhcnQgPSAtMTtcbiAgICAgICAgICBhZHZhbmNlRnJhbWVCeSgxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnXic6XG4gICAgICAgICAgaWYgKHN1YnNjcmlwdGlvbkZyYW1lICE9PSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZm91bmQgYSBzZWNvbmQgc3Vic2NyaXB0aW9uIHBvaW50IFxcJ15cXCcgaW4gYSAnICtcbiAgICAgICAgICAgICAgJ3N1YnNjcmlwdGlvbiBtYXJibGUgZGlhZ3JhbS4gVGhlcmUgY2FuIG9ubHkgYmUgb25lLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdWJzY3JpcHRpb25GcmFtZSA9IGdyb3VwU3RhcnQgPiAtMSA/IGdyb3VwU3RhcnQgOiBmcmFtZTtcbiAgICAgICAgICBhZHZhbmNlRnJhbWVCeSgxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnISc6XG4gICAgICAgICAgaWYgKHVuc3Vic2NyaXB0aW9uRnJhbWUgIT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdmb3VuZCBhIHNlY29uZCBzdWJzY3JpcHRpb24gcG9pbnQgXFwnXlxcJyBpbiBhICcgK1xuICAgICAgICAgICAgICAnc3Vic2NyaXB0aW9uIG1hcmJsZSBkaWFncmFtLiBUaGVyZSBjYW4gb25seSBiZSBvbmUuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHVuc3Vic2NyaXB0aW9uRnJhbWUgPSBncm91cFN0YXJ0ID4gLTEgPyBncm91cFN0YXJ0IDogZnJhbWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgLy8gdGltZSBwcm9ncmVzc2lvbiBzeW50YXhcbiAgICAgICAgICBpZiAocnVuTW9kZSAmJiBjLm1hdGNoKC9eWzAtOV0kLykpIHtcbiAgICAgICAgICAgIC8vIFRpbWUgcHJvZ3Jlc3Npb24gbXVzdCBiZSBwcmVjZWVkZWQgYnkgYXQgbGVhc3Qgb25lIHNwYWNlXG4gICAgICAgICAgICAvLyBpZiBpdCdzIG5vdCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBkaWFncmFtXG4gICAgICAgICAgICBpZiAoaSA9PT0gMCB8fCBtYXJibGVzW2kgLSAxXSA9PT0gJyAnKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IG1hcmJsZXMuc2xpY2UoaSk7XG4gICAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gYnVmZmVyLm1hdGNoKC9eKFswLTldKyg/OlxcLlswLTldKyk/KShtc3xzfG0pIC8pO1xuICAgICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBpICs9IG1hdGNoWzBdLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgY29uc3QgZHVyYXRpb24gPSBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcbiAgICAgICAgICAgICAgICBjb25zdCB1bml0ID0gbWF0Y2hbMl07XG4gICAgICAgICAgICAgICAgbGV0IGR1cmF0aW9uSW5NczogbnVtYmVyO1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoICh1bml0KSB7XG4gICAgICAgICAgICAgICAgICBjYXNlICdtcyc6XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uSW5NcyA9IGR1cmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbkluTXMgPSBkdXJhdGlvbiAqIDEwMDA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uSW5NcyA9IGR1cmF0aW9uICogMTAwMCAqIDYwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGFkdmFuY2VGcmFtZUJ5KGR1cmF0aW9uSW5NcyAvIHRoaXMuZnJhbWVUaW1lRmFjdG9yKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlcmUgY2FuIG9ubHkgYmUgXFwnXlxcJyBhbmQgXFwnIVxcJyBtYXJrZXJzIGluIGEgJyArXG4gICAgICAgICAgICAnc3Vic2NyaXB0aW9uIG1hcmJsZSBkaWFncmFtLiBGb3VuZCBpbnN0ZWFkIFxcJycgKyBjICsgJ1xcJy4nKTtcbiAgICAgIH1cblxuICAgICAgZnJhbWUgPSBuZXh0RnJhbWU7XG4gICAgfVxuXG4gICAgaWYgKHVuc3Vic2NyaXB0aW9uRnJhbWUgPCAwKSB7XG4gICAgICByZXR1cm4gbmV3IFN1YnNjcmlwdGlvbkxvZyhzdWJzY3JpcHRpb25GcmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgU3Vic2NyaXB0aW9uTG9nKHN1YnNjcmlwdGlvbkZyYW1lLCB1bnN1YnNjcmlwdGlvbkZyYW1lKTtcbiAgICB9XG4gIH1cblxuICAvKiogQG5vY29sbGFwc2UgKi9cbiAgc3RhdGljIHBhcnNlTWFyYmxlcyhtYXJibGVzOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWVzPzogYW55LFxuICAgICAgICAgICAgICAgICAgICAgIGVycm9yVmFsdWU/OiBhbnksXG4gICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxpemVJbm5lck9ic2VydmFibGVzOiBib29sZWFuID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgcnVuTW9kZSA9IGZhbHNlKTogVGVzdE1lc3NhZ2VbXSB7XG4gICAgaWYgKG1hcmJsZXMuaW5kZXhPZignIScpICE9PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb252ZW50aW9uYWwgbWFyYmxlIGRpYWdyYW1zIGNhbm5vdCBoYXZlIHRoZSAnICtcbiAgICAgICAgJ3Vuc3Vic2NyaXB0aW9uIG1hcmtlciBcIiFcIicpO1xuICAgIH1cbiAgICBjb25zdCBsZW4gPSBtYXJibGVzLmxlbmd0aDtcbiAgICBjb25zdCB0ZXN0TWVzc2FnZXM6IFRlc3RNZXNzYWdlW10gPSBbXTtcbiAgICBjb25zdCBzdWJJbmRleCA9IHJ1bk1vZGUgPyBtYXJibGVzLnJlcGxhY2UoL15bIF0rLywgJycpLmluZGV4T2YoJ14nKSA6IG1hcmJsZXMuaW5kZXhPZignXicpO1xuICAgIGxldCBmcmFtZSA9IHN1YkluZGV4ID09PSAtMSA/IDAgOiAoc3ViSW5kZXggKiAtdGhpcy5mcmFtZVRpbWVGYWN0b3IpO1xuICAgIGNvbnN0IGdldFZhbHVlID0gdHlwZW9mIHZhbHVlcyAhPT0gJ29iamVjdCcgP1xuICAgICAgKHg6IGFueSkgPT4geCA6XG4gICAgICAoeDogYW55KSA9PiB7XG4gICAgICAgIC8vIFN1cHBvcnQgT2JzZXJ2YWJsZS1vZi1PYnNlcnZhYmxlc1xuICAgICAgICBpZiAobWF0ZXJpYWxpemVJbm5lck9ic2VydmFibGVzICYmIHZhbHVlc1t4XSBpbnN0YW5jZW9mIENvbGRPYnNlcnZhYmxlKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlc1t4XS5tZXNzYWdlcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWVzW3hdO1xuICAgICAgfTtcbiAgICBsZXQgZ3JvdXBTdGFydCA9IC0xO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGV0IG5leHRGcmFtZSA9IGZyYW1lO1xuICAgICAgY29uc3QgYWR2YW5jZUZyYW1lQnkgPSAoY291bnQ6IG51bWJlcikgPT4ge1xuICAgICAgICBuZXh0RnJhbWUgKz0gY291bnQgKiB0aGlzLmZyYW1lVGltZUZhY3RvcjtcbiAgICAgIH07XG5cbiAgICAgIGxldCBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbjxhbnk+O1xuICAgICAgY29uc3QgYyA9IG1hcmJsZXNbaV07XG4gICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgY2FzZSAnICc6XG4gICAgICAgICAgLy8gV2hpdGVzcGFjZSBubyBsb25nZXIgYWR2YW5jZXMgdGltZVxuICAgICAgICAgIGlmICghcnVuTW9kZSkge1xuICAgICAgICAgICAgYWR2YW5jZUZyYW1lQnkoMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICctJzpcbiAgICAgICAgICBhZHZhbmNlRnJhbWVCeSgxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnKCc6XG4gICAgICAgICAgZ3JvdXBTdGFydCA9IGZyYW1lO1xuICAgICAgICAgIGFkdmFuY2VGcmFtZUJ5KDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICcpJzpcbiAgICAgICAgICBncm91cFN0YXJ0ID0gLTE7XG4gICAgICAgICAgYWR2YW5jZUZyYW1lQnkoMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3wnOlxuICAgICAgICAgIG5vdGlmaWNhdGlvbiA9IE5vdGlmaWNhdGlvbi5jcmVhdGVDb21wbGV0ZSgpO1xuICAgICAgICAgIGFkdmFuY2VGcmFtZUJ5KDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdeJzpcbiAgICAgICAgICBhZHZhbmNlRnJhbWVCeSgxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnIyc6XG4gICAgICAgICAgbm90aWZpY2F0aW9uID0gTm90aWZpY2F0aW9uLmNyZWF0ZUVycm9yKGVycm9yVmFsdWUgfHwgJ2Vycm9yJyk7XG4gICAgICAgICAgYWR2YW5jZUZyYW1lQnkoMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgLy8gTWlnaHQgYmUgdGltZSBwcm9ncmVzc2lvbiBzeW50YXgsIG9yIGEgdmFsdWUgbGl0ZXJhbFxuICAgICAgICAgIGlmIChydW5Nb2RlICYmIGMubWF0Y2goL15bMC05XSQvKSkge1xuICAgICAgICAgICAgLy8gVGltZSBwcm9ncmVzc2lvbiBtdXN0IGJlIHByZWNlZWRlZCBieSBhdCBsZWFzdCBvbmUgc3BhY2VcbiAgICAgICAgICAgIC8vIGlmIGl0J3Mgbm90IGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGRpYWdyYW1cbiAgICAgICAgICAgIGlmIChpID09PSAwIHx8IG1hcmJsZXNbaSAtIDFdID09PSAnICcpIHtcbiAgICAgICAgICAgICAgY29uc3QgYnVmZmVyID0gbWFyYmxlcy5zbGljZShpKTtcbiAgICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSBidWZmZXIubWF0Y2goL14oWzAtOV0rKD86XFwuWzAtOV0rKT8pKG1zfHN8bSkgLyk7XG4gICAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGkgKz0gbWF0Y2hbMF0ubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICBjb25zdCBkdXJhdGlvbiA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHVuaXQgPSBtYXRjaFsyXTtcbiAgICAgICAgICAgICAgICBsZXQgZHVyYXRpb25Jbk1zOiBudW1iZXI7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHVuaXQpIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgJ21zJzpcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb25Jbk1zID0gZHVyYXRpb247XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uSW5NcyA9IGR1cmF0aW9uICogMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb25Jbk1zID0gZHVyYXRpb24gKiAxMDAwICogNjA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYWR2YW5jZUZyYW1lQnkoZHVyYXRpb25Jbk1zIC8gdGhpcy5mcmFtZVRpbWVGYWN0b3IpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbm90aWZpY2F0aW9uID0gTm90aWZpY2F0aW9uLmNyZWF0ZU5leHQoZ2V0VmFsdWUoYykpO1xuICAgICAgICAgIGFkdmFuY2VGcmFtZUJ5KDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAobm90aWZpY2F0aW9uKSB7XG4gICAgICAgIHRlc3RNZXNzYWdlcy5wdXNoKHsgZnJhbWU6IGdyb3VwU3RhcnQgPiAtMSA/IGdyb3VwU3RhcnQgOiBmcmFtZSwgbm90aWZpY2F0aW9uIH0pO1xuICAgICAgfVxuXG4gICAgICBmcmFtZSA9IG5leHRGcmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIHRlc3RNZXNzYWdlcztcbiAgfVxuXG4gIHJ1bjxUPihjYWxsYmFjazogKGhlbHBlcnM6IFJ1bkhlbHBlcnMpID0+IFQpOiBUIHtcbiAgICBjb25zdCBwcmV2RnJhbWVUaW1lRmFjdG9yID0gVGVzdFNjaGVkdWxlci5mcmFtZVRpbWVGYWN0b3I7XG4gICAgY29uc3QgcHJldk1heEZyYW1lcyA9IHRoaXMubWF4RnJhbWVzO1xuXG4gICAgVGVzdFNjaGVkdWxlci5mcmFtZVRpbWVGYWN0b3IgPSAxO1xuICAgIHRoaXMubWF4RnJhbWVzID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICAgIHRoaXMucnVuTW9kZSA9IHRydWU7XG4gICAgQXN5bmNTY2hlZHVsZXIuZGVsZWdhdGUgPSB0aGlzO1xuXG4gICAgY29uc3QgaGVscGVycyA9IHtcbiAgICAgIGNvbGQ6IHRoaXMuY3JlYXRlQ29sZE9ic2VydmFibGUuYmluZCh0aGlzKSxcbiAgICAgIGhvdDogdGhpcy5jcmVhdGVIb3RPYnNlcnZhYmxlLmJpbmQodGhpcyksXG4gICAgICBmbHVzaDogdGhpcy5mbHVzaC5iaW5kKHRoaXMpLFxuICAgICAgZXhwZWN0T2JzZXJ2YWJsZTogdGhpcy5leHBlY3RPYnNlcnZhYmxlLmJpbmQodGhpcyksXG4gICAgICBleHBlY3RTdWJzY3JpcHRpb25zOiB0aGlzLmV4cGVjdFN1YnNjcmlwdGlvbnMuYmluZCh0aGlzKSxcbiAgICB9O1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXQgPSBjYWxsYmFjayhoZWxwZXJzKTtcbiAgICAgIHRoaXMuZmx1c2goKTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIFRlc3RTY2hlZHVsZXIuZnJhbWVUaW1lRmFjdG9yID0gcHJldkZyYW1lVGltZUZhY3RvcjtcbiAgICAgIHRoaXMubWF4RnJhbWVzID0gcHJldk1heEZyYW1lcztcbiAgICAgIHRoaXMucnVuTW9kZSA9IGZhbHNlO1xuICAgICAgQXN5bmNTY2hlZHVsZXIuZGVsZWdhdGUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG59XG4iXX0=