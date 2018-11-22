import { Subscriber } from '../Subscriber';
import { Observable } from '../Observable';
import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
export function delayWhen(delayDurationSelector, subscriptionDelay) {
    if (subscriptionDelay) {
        return (source) => new SubscriptionDelayObservable(source, subscriptionDelay)
            .lift(new DelayWhenOperator(delayDurationSelector));
    }
    return (source) => source.lift(new DelayWhenOperator(delayDurationSelector));
}
class DelayWhenOperator {
    constructor(delayDurationSelector) {
        this.delayDurationSelector = delayDurationSelector;
    }
    call(subscriber, source) {
        return source.subscribe(new DelayWhenSubscriber(subscriber, this.delayDurationSelector));
    }
}
class DelayWhenSubscriber extends OuterSubscriber {
    constructor(destination, delayDurationSelector) {
        super(destination);
        this.delayDurationSelector = delayDurationSelector;
        this.completed = false;
        this.delayNotifierSubscriptions = [];
        this.index = 0;
    }
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(outerValue);
        this.removeSubscription(innerSub);
        this.tryComplete();
    }
    notifyError(error, innerSub) {
        this._error(error);
    }
    notifyComplete(innerSub) {
        const value = this.removeSubscription(innerSub);
        if (value) {
            this.destination.next(value);
        }
        this.tryComplete();
    }
    _next(value) {
        const index = this.index++;
        try {
            const delayNotifier = this.delayDurationSelector(value, index);
            if (delayNotifier) {
                this.tryDelay(delayNotifier, value);
            }
        }
        catch (err) {
            this.destination.error(err);
        }
    }
    _complete() {
        this.completed = true;
        this.tryComplete();
        this.unsubscribe();
    }
    removeSubscription(subscription) {
        subscription.unsubscribe();
        const subscriptionIdx = this.delayNotifierSubscriptions.indexOf(subscription);
        if (subscriptionIdx !== -1) {
            this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
        }
        return subscription.outerValue;
    }
    tryDelay(delayNotifier, value) {
        const notifierSubscription = subscribeToResult(this, delayNotifier, value);
        if (notifierSubscription && !notifierSubscription.closed) {
            const destination = this.destination;
            destination.add(notifierSubscription);
            this.delayNotifierSubscriptions.push(notifierSubscription);
        }
    }
    tryComplete() {
        if (this.completed && this.delayNotifierSubscriptions.length === 0) {
            this.destination.complete();
        }
    }
}
class SubscriptionDelayObservable extends Observable {
    constructor(source, subscriptionDelay) {
        super();
        this.source = source;
        this.subscriptionDelay = subscriptionDelay;
    }
    _subscribe(subscriber) {
        this.subscriptionDelay.subscribe(new SubscriptionDelaySubscriber(subscriber, this.source));
    }
}
class SubscriptionDelaySubscriber extends Subscriber {
    constructor(parent, source) {
        super();
        this.parent = parent;
        this.source = source;
        this.sourceSubscribed = false;
    }
    _next(unused) {
        this.subscribeToSource();
    }
    _error(err) {
        this.unsubscribe();
        this.parent.error(err);
    }
    _complete() {
        this.unsubscribe();
        this.subscribeToSource();
    }
    subscribeToSource() {
        if (!this.sourceSubscribed) {
            this.sourceSubscribed = true;
            this.unsubscribe();
            this.source.subscribe(this.parent);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsYXlXaGVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZXh0ZXJuYWwvcnhqcy9pbnRlcm5hbC9vcGVyYXRvcnMvZGVsYXlXaGVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFckQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUEyRDlELE1BQU0sVUFBVSxTQUFTLENBQUkscUJBQW1FLEVBQ25FLGlCQUFtQztJQUM5RCxJQUFJLGlCQUFpQixFQUFFO1FBQ3JCLE9BQU8sQ0FBQyxNQUFxQixFQUFFLEVBQUUsQ0FDL0IsSUFBSSwyQkFBMkIsQ0FBQyxNQUFNLEVBQUUsaUJBQWlCLENBQUM7YUFDdkQsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO0tBQ3pEO0lBQ0QsT0FBTyxDQUFDLE1BQXFCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7QUFDOUYsQ0FBQztBQUVELE1BQU0saUJBQWlCO0lBQ3JCLFlBQW9CLHFCQUFtRTtRQUFuRSwwQkFBcUIsR0FBckIscUJBQXFCLENBQThDO0lBQ3ZGLENBQUM7SUFFRCxJQUFJLENBQUMsVUFBeUIsRUFBRSxNQUFXO1FBQ3pDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO0lBQzNGLENBQUM7Q0FDRjtBQU9ELE1BQU0sbUJBQTBCLFNBQVEsZUFBcUI7SUFLM0QsWUFBWSxXQUEwQixF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O0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBPdXRlclN1YnNjcmliZXIgfSBmcm9tICcuLi9PdXRlclN1YnNjcmliZXInO1xuaW1wb3J0IHsgSW5uZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vSW5uZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IHN1YnNjcmliZVRvUmVzdWx0IH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCc7XG5pbXBvcnQgeyBNb25vVHlwZU9wZXJhdG9yRnVuY3Rpb24sIFRlYXJkb3duTG9naWMgfSBmcm9tICcuLi90eXBlcyc7XG5cbi8qIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuLyoqIEBkZXByZWNhdGVkIEluIGZ1dHVyZSB2ZXJzaW9ucywgZW1wdHkgbm90aWZpZXJzIHdpbGwgbm8gbG9uZ2VyIHJlLWVtaXQgdGhlIHNvdXJjZSB2YWx1ZSBvbiB0aGUgb3V0cHV0IG9ic2VydmFibGUuICovXG5leHBvcnQgZnVuY3Rpb24gZGVsYXlXaGVuPFQ+KGRlbGF5RHVyYXRpb25TZWxlY3RvcjogKHZhbHVlOiBULCBpbmRleDogbnVtYmVyKSA9PiBPYnNlcnZhYmxlPG5ldmVyPiwgc3Vic2NyaXB0aW9uRGVsYXk/OiBPYnNlcnZhYmxlPGFueT4pOiBNb25vVHlwZU9wZXJhdG9yRnVuY3Rpb248VD47XG5leHBvcnQgZnVuY3Rpb24gZGVsYXlXaGVuPFQ+KGRlbGF5RHVyYXRpb25TZWxlY3RvcjogKHZhbHVlOiBULCBpbmRleDogbnVtYmVyKSA9PiBPYnNlcnZhYmxlPGFueT4sIHN1YnNjcmlwdGlvbkRlbGF5PzogT2JzZXJ2YWJsZTxhbnk+KTogTW9ub1R5cGVPcGVyYXRvckZ1bmN0aW9uPFQ+O1xuLyogdHNsaW50OmRpc2FibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5cbi8qKlxuICogRGVsYXlzIHRoZSBlbWlzc2lvbiBvZiBpdGVtcyBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBieSBhIGdpdmVuIHRpbWUgc3BhblxuICogZGV0ZXJtaW5lZCBieSB0aGUgZW1pc3Npb25zIG9mIGFub3RoZXIgT2JzZXJ2YWJsZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SXQncyBsaWtlIHtAbGluayBkZWxheX0sIGJ1dCB0aGUgdGltZSBzcGFuIG9mIHRoZVxuICogZGVsYXkgZHVyYXRpb24gaXMgZGV0ZXJtaW5lZCBieSBhIHNlY29uZCBPYnNlcnZhYmxlLjwvc3Bhbj5cbiAqXG4gKiAhW10oZGVsYXlXaGVuLnBuZylcbiAqXG4gKiBgZGVsYXlXaGVuYCB0aW1lIHNoaWZ0cyBlYWNoIGVtaXR0ZWQgdmFsdWUgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUgYnkgYVxuICogdGltZSBzcGFuIGRldGVybWluZWQgYnkgYW5vdGhlciBPYnNlcnZhYmxlLiBXaGVuIHRoZSBzb3VyY2UgZW1pdHMgYSB2YWx1ZSxcbiAqIHRoZSBgZGVsYXlEdXJhdGlvblNlbGVjdG9yYCBmdW5jdGlvbiBpcyBjYWxsZWQgd2l0aCB0aGUgc291cmNlIHZhbHVlIGFzXG4gKiBhcmd1bWVudCwgYW5kIHNob3VsZCByZXR1cm4gYW4gT2JzZXJ2YWJsZSwgY2FsbGVkIHRoZSBcImR1cmF0aW9uXCIgT2JzZXJ2YWJsZS5cbiAqIFRoZSBzb3VyY2UgdmFsdWUgaXMgZW1pdHRlZCBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGUgb25seSB3aGVuIHRoZSBkdXJhdGlvblxuICogT2JzZXJ2YWJsZSBlbWl0cyBhIHZhbHVlIG9yIGNvbXBsZXRlcy5cbiAqIFRoZSBjb21wbGV0aW9uIG9mIHRoZSBub3RpZmllciB0cmlnZ2VyaW5nIHRoZSBlbWlzc2lvbiBvZiB0aGUgc291cmNlIHZhbHVlXG4gKiBpcyBkZXByZWNhdGVkIGJlaGF2aW9yIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gZnV0dXJlIHZlcnNpb25zLlxuICpcbiAqIE9wdGlvbmFsbHksIGBkZWxheVdoZW5gIHRha2VzIGEgc2Vjb25kIGFyZ3VtZW50LCBgc3Vic2NyaXB0aW9uRGVsYXlgLCB3aGljaFxuICogaXMgYW4gT2JzZXJ2YWJsZS4gV2hlbiBgc3Vic2NyaXB0aW9uRGVsYXlgIGVtaXRzIGl0cyBmaXJzdCB2YWx1ZSBvclxuICogY29tcGxldGVzLCB0aGUgc291cmNlIE9ic2VydmFibGUgaXMgc3Vic2NyaWJlZCB0byBhbmQgc3RhcnRzIGJlaGF2aW5nIGxpa2VcbiAqIGRlc2NyaWJlZCBpbiB0aGUgcHJldmlvdXMgcGFyYWdyYXBoLiBJZiBgc3Vic2NyaXB0aW9uRGVsYXlgIGlzIG5vdCBwcm92aWRlZCxcbiAqIGBkZWxheVdoZW5gIHdpbGwgc3Vic2NyaWJlIHRvIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBhcyBzb29uIGFzIHRoZSBvdXRwdXRcbiAqIE9ic2VydmFibGUgaXMgc3Vic2NyaWJlZC5cbiAqXG4gKiAjIyBFeGFtcGxlXG4gKiBEZWxheSBlYWNoIGNsaWNrIGJ5IGEgcmFuZG9tIGFtb3VudCBvZiB0aW1lLCBiZXR3ZWVuIDAgYW5kIDUgc2Vjb25kc1xuICogYGBgamF2YXNjcmlwdFxuICogY29uc3QgY2xpY2tzID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIGNvbnN0IGRlbGF5ZWRDbGlja3MgPSBjbGlja3MucGlwZShcbiAqICAgZGVsYXlXaGVuKGV2ZW50ID0+IGludGVydmFsKE1hdGgucmFuZG9tKCkgKiA1MDAwKSksXG4gKiApO1xuICogZGVsYXllZENsaWNrcy5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKiBgYGBcbiAqXG4gKiBAc2VlIHtAbGluayBkZWJvdW5jZX1cbiAqIEBzZWUge0BsaW5rIGRlbGF5fVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQsIGluZGV4OiBudW1iZXIpOiBPYnNlcnZhYmxlfSBkZWxheUR1cmF0aW9uU2VsZWN0b3IgQSBmdW5jdGlvbiB0aGF0XG4gKiByZXR1cm5zIGFuIE9ic2VydmFibGUgZm9yIGVhY2ggdmFsdWUgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUsIHdoaWNoXG4gKiBpcyB0aGVuIHVzZWQgdG8gZGVsYXkgdGhlIGVtaXNzaW9uIG9mIHRoYXQgaXRlbSBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGVcbiAqIHVudGlsIHRoZSBPYnNlcnZhYmxlIHJldHVybmVkIGZyb20gdGhpcyBmdW5jdGlvbiBlbWl0cyBhIHZhbHVlLlxuICogQHBhcmFtIHtPYnNlcnZhYmxlfSBzdWJzY3JpcHRpb25EZWxheSBBbiBPYnNlcnZhYmxlIHRoYXQgdHJpZ2dlcnMgdGhlXG4gKiBzdWJzY3JpcHRpb24gdG8gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIG9uY2UgaXQgZW1pdHMgYW55IHZhbHVlLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IGRlbGF5cyB0aGUgZW1pc3Npb25zIG9mIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUgYnkgYW4gYW1vdW50IG9mIHRpbWUgc3BlY2lmaWVkIGJ5IHRoZSBPYnNlcnZhYmxlIHJldHVybmVkIGJ5XG4gKiBgZGVsYXlEdXJhdGlvblNlbGVjdG9yYC5cbiAqIEBtZXRob2QgZGVsYXlXaGVuXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVsYXlXaGVuPFQ+KGRlbGF5RHVyYXRpb25TZWxlY3RvcjogKHZhbHVlOiBULCBpbmRleDogbnVtYmVyKSA9PiBPYnNlcnZhYmxlPGFueT4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbkRlbGF5PzogT2JzZXJ2YWJsZTxhbnk+KTogTW9ub1R5cGVPcGVyYXRvckZ1bmN0aW9uPFQ+IHtcbiAgaWYgKHN1YnNjcmlwdGlvbkRlbGF5KSB7XG4gICAgcmV0dXJuIChzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+XG4gICAgICBuZXcgU3Vic2NyaXB0aW9uRGVsYXlPYnNlcnZhYmxlKHNvdXJjZSwgc3Vic2NyaXB0aW9uRGVsYXkpXG4gICAgICAgIC5saWZ0KG5ldyBEZWxheVdoZW5PcGVyYXRvcihkZWxheUR1cmF0aW9uU2VsZWN0b3IpKTtcbiAgfVxuICByZXR1cm4gKHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gc291cmNlLmxpZnQobmV3IERlbGF5V2hlbk9wZXJhdG9yKGRlbGF5RHVyYXRpb25TZWxlY3RvcikpO1xufVxuXG5jbGFzcyBEZWxheVdoZW5PcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWxheUR1cmF0aW9uU2VsZWN0b3I6ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlcikgPT4gT2JzZXJ2YWJsZTxhbnk+KSB7XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4sIHNvdXJjZTogYW55KTogVGVhcmRvd25Mb2dpYyB7XG4gICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IERlbGF5V2hlblN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5kZWxheUR1cmF0aW9uU2VsZWN0b3IpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgRGVsYXlXaGVuU3Vic2NyaWJlcjxULCBSPiBleHRlbmRzIE91dGVyU3Vic2NyaWJlcjxULCBSPiB7XG4gIHByaXZhdGUgY29tcGxldGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgZGVsYXlOb3RpZmllclN1YnNjcmlwdGlvbnM6IEFycmF5PFN1YnNjcmlwdGlvbj4gPSBbXTtcbiAgcHJpdmF0ZSBpbmRleDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBkZWxheUR1cmF0aW9uU2VsZWN0b3I6ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlcikgPT4gT2JzZXJ2YWJsZTxhbnk+KSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICB9XG5cbiAgbm90aWZ5TmV4dChvdXRlclZhbHVlOiBULCBpbm5lclZhbHVlOiBhbnksXG4gICAgICAgICAgICAgb3V0ZXJJbmRleDogbnVtYmVyLCBpbm5lckluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgaW5uZXJTdWI6IElubmVyU3Vic2NyaWJlcjxULCBSPik6IHZvaWQge1xuICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dChvdXRlclZhbHVlKTtcbiAgICB0aGlzLnJlbW92ZVN1YnNjcmlwdGlvbihpbm5lclN1Yik7XG4gICAgdGhpcy50cnlDb21wbGV0ZSgpO1xuICB9XG5cbiAgbm90aWZ5RXJyb3IoZXJyb3I6IGFueSwgaW5uZXJTdWI6IElubmVyU3Vic2NyaWJlcjxULCBSPik6IHZvaWQge1xuICAgIHRoaXMuX2Vycm9yKGVycm9yKTtcbiAgfVxuXG4gIG5vdGlmeUNvbXBsZXRlKGlubmVyU3ViOiBJbm5lclN1YnNjcmliZXI8VCwgUj4pOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMucmVtb3ZlU3Vic2NyaXB0aW9uKGlubmVyU3ViKTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMudHJ5Q29tcGxldGUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbmRleCsrO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkZWxheU5vdGlmaWVyID0gdGhpcy5kZWxheUR1cmF0aW9uU2VsZWN0b3IodmFsdWUsIGluZGV4KTtcbiAgICAgIGlmIChkZWxheU5vdGlmaWVyKSB7XG4gICAgICAgIHRoaXMudHJ5RGVsYXkoZGVsYXlOb3RpZmllciwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfY29tcGxldGUoKTogdm9pZCB7XG4gICAgdGhpcy5jb21wbGV0ZWQgPSB0cnVlO1xuICAgIHRoaXMudHJ5Q29tcGxldGUoKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZVN1YnNjcmlwdGlvbihzdWJzY3JpcHRpb246IElubmVyU3Vic2NyaWJlcjxULCBSPik6IFQge1xuICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuXG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uSWR4ID0gdGhpcy5kZWxheU5vdGlmaWVyU3Vic2NyaXB0aW9ucy5pbmRleE9mKHN1YnNjcmlwdGlvbik7XG4gICAgaWYgKHN1YnNjcmlwdGlvbklkeCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuZGVsYXlOb3RpZmllclN1YnNjcmlwdGlvbnMuc3BsaWNlKHN1YnNjcmlwdGlvbklkeCwgMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1YnNjcmlwdGlvbi5vdXRlclZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSB0cnlEZWxheShkZWxheU5vdGlmaWVyOiBPYnNlcnZhYmxlPGFueT4sIHZhbHVlOiBUKTogdm9pZCB7XG4gICAgY29uc3Qgbm90aWZpZXJTdWJzY3JpcHRpb24gPSBzdWJzY3JpYmVUb1Jlc3VsdCh0aGlzLCBkZWxheU5vdGlmaWVyLCB2YWx1ZSk7XG5cbiAgICBpZiAobm90aWZpZXJTdWJzY3JpcHRpb24gJiYgIW5vdGlmaWVyU3Vic2NyaXB0aW9uLmNsb3NlZCkge1xuICAgICAgY29uc3QgZGVzdGluYXRpb24gPSB0aGlzLmRlc3RpbmF0aW9uIGFzIFN1YnNjcmlwdGlvbjtcbiAgICAgIGRlc3RpbmF0aW9uLmFkZChub3RpZmllclN1YnNjcmlwdGlvbik7XG4gICAgICB0aGlzLmRlbGF5Tm90aWZpZXJTdWJzY3JpcHRpb25zLnB1c2gobm90aWZpZXJTdWJzY3JpcHRpb24pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdHJ5Q29tcGxldGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29tcGxldGVkICYmIHRoaXMuZGVsYXlOb3RpZmllclN1YnNjcmlwdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBTdWJzY3JpcHRpb25EZWxheU9ic2VydmFibGU8VD4gZXh0ZW5kcyBPYnNlcnZhYmxlPFQ+IHtcbiAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZTogT2JzZXJ2YWJsZTxUPiwgcHJpdmF0ZSBzdWJzY3JpcHRpb25EZWxheTogT2JzZXJ2YWJsZTxhbnk+KSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8qKiBAZGVwcmVjYXRlZCBUaGlzIGlzIGFuIGludGVybmFsIGltcGxlbWVudGF0aW9uIGRldGFpbCwgZG8gbm90IHVzZS4gKi9cbiAgX3N1YnNjcmliZShzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+KSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25EZWxheS5zdWJzY3JpYmUobmV3IFN1YnNjcmlwdGlvbkRlbGF5U3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLnNvdXJjZSkpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBTdWJzY3JpcHRpb25EZWxheVN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgcHJpdmF0ZSBzb3VyY2VTdWJzY3JpYmVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJlbnQ6IFN1YnNjcmliZXI8VD4sIHByaXZhdGUgc291cmNlOiBPYnNlcnZhYmxlPFQ+KSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh1bnVzZWQ6IGFueSkge1xuICAgIHRoaXMuc3Vic2NyaWJlVG9Tb3VyY2UoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfZXJyb3IoZXJyOiBhbnkpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5wYXJlbnQuZXJyb3IoZXJyKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY29tcGxldGUoKSB7XG4gICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuc3Vic2NyaWJlVG9Tb3VyY2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9Tb3VyY2UoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnNvdXJjZVN1YnNjcmliZWQpIHtcbiAgICAgIHRoaXMuc291cmNlU3Vic2NyaWJlZCA9IHRydWU7XG4gICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLnNvdXJjZS5zdWJzY3JpYmUodGhpcy5wYXJlbnQpO1xuICAgIH1cbiAgfVxufVxuIl19