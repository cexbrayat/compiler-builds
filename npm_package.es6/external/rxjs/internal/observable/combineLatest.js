import { isScheduler } from '../util/isScheduler';
import { isArray } from '../util/isArray';
import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
import { fromArray } from './fromArray';
const NONE = {};
export function combineLatest(...observables) {
    let resultSelector = null;
    let scheduler = null;
    if (isScheduler(observables[observables.length - 1])) {
        scheduler = observables.pop();
    }
    if (typeof observables[observables.length - 1] === 'function') {
        resultSelector = observables.pop();
    }
    if (observables.length === 1 && isArray(observables[0])) {
        observables = observables[0];
    }
    return fromArray(observables, scheduler).lift(new CombineLatestOperator(resultSelector));
}
export class CombineLatestOperator {
    constructor(resultSelector) {
        this.resultSelector = resultSelector;
    }
    call(subscriber, source) {
        return source.subscribe(new CombineLatestSubscriber(subscriber, this.resultSelector));
    }
}
export class CombineLatestSubscriber extends OuterSubscriber {
    constructor(destination, resultSelector) {
        super(destination);
        this.resultSelector = resultSelector;
        this.active = 0;
        this.values = [];
        this.observables = [];
    }
    _next(observable) {
        this.values.push(NONE);
        this.observables.push(observable);
    }
    _complete() {
        const observables = this.observables;
        const len = observables.length;
        if (len === 0) {
            this.destination.complete();
        }
        else {
            this.active = len;
            this.toRespond = len;
            for (let i = 0; i < len; i++) {
                const observable = observables[i];
                this.add(subscribeToResult(this, observable, observable, i));
            }
        }
    }
    notifyComplete(unused) {
        if ((this.active -= 1) === 0) {
            this.destination.complete();
        }
    }
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        const values = this.values;
        const oldVal = values[outerIndex];
        const toRespond = !this.toRespond
            ? 0
            : oldVal === NONE ? --this.toRespond : this.toRespond;
        values[outerIndex] = innerValue;
        if (toRespond === 0) {
            if (this.resultSelector) {
                this._tryResultSelector(values);
            }
            else {
                this.destination.next(values.slice());
            }
        }
    }
    _tryResultSelector(values) {
        let result;
        try {
            result = this.resultSelector.apply(this, values);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tYmluZUxhdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2V4dGVybmFsL3J4anMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9jb21iaW5lTGF0ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxXQUFXLEVBQUcsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsT0FBTyxFQUFHLE1BQU0saUJBQWlCLENBQUM7QUFFM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR3JELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzlELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFeEMsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBbUpoQixNQUFNLFVBQVUsYUFBYSxDQUFPLEdBQUcsV0FHMkI7SUFDaEUsSUFBSSxjQUFjLEdBQWtDLElBQUksQ0FBQztJQUN6RCxJQUFJLFNBQVMsR0FBa0IsSUFBSSxDQUFDO0lBRXBDLElBQUksV0FBVyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDcEQsU0FBUyxHQUFrQixXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDOUM7SUFFRCxJQUFJLE9BQU8sV0FBVyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssVUFBVSxFQUFFO1FBQzdELGNBQWMsR0FBaUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO0tBQ2xFO0lBSUQsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDdkQsV0FBVyxHQUEyQixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdEQ7SUFFRCxPQUFPLFNBQVMsQ0FBQyxXQUFX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Q0gsQ0FBQztJQUVPLGtCQUFrQixDQUFDLE1BQWE7UUFDdEMsSUFBSSxNQUFXLENBQUM7UUFDaEIsSUFBSTtZQUNGLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDbEQ7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE9ic2VydmFibGVJbnB1dCwgU2NoZWR1bGVyTGlrZSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGlzU2NoZWR1bGVyICB9IGZyb20gJy4uL3V0aWwvaXNTY2hlZHVsZXInO1xuaW1wb3J0IHsgaXNBcnJheSAgfSBmcm9tICcuLi91dGlsL2lzQXJyYXknO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgT3V0ZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vT3V0ZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgSW5uZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vSW5uZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IHN1YnNjcmliZVRvUmVzdWx0IH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCc7XG5pbXBvcnQgeyBmcm9tQXJyYXkgfSBmcm9tICcuL2Zyb21BcnJheSc7XG5cbmNvbnN0IE5PTkUgPSB7fTtcblxuLyogdHNsaW50OmRpc2FibGU6bWF4LWxpbmUtbGVuZ3RoICovXG4vKiogQGRlcHJlY2F0ZWQgcmVzdWx0U2VsZWN0b3Igbm8gbG9uZ2VyIHN1cHBvcnRlZCwgcGlwZSB0byBtYXAgaW5zdGVhZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVMYXRlc3Q8VCwgUj4odjE6IE9ic2VydmFibGVJbnB1dDxUPiwgcmVzdWx0U2VsZWN0b3I6ICh2MTogVCkgPT4gUiwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IE9ic2VydmFibGU8Uj47XG4vKiogQGRlcHJlY2F0ZWQgcmVzdWx0U2VsZWN0b3Igbm8gbG9uZ2VyIHN1cHBvcnRlZCwgcGlwZSB0byBtYXAgaW5zdGVhZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVMYXRlc3Q8VCwgVDIsIFI+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCByZXN1bHRTZWxlY3RvcjogKHYxOiBULCB2MjogVDIpID0+IFIsIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiBPYnNlcnZhYmxlPFI+O1xuLyoqIEBkZXByZWNhdGVkIHJlc3VsdFNlbGVjdG9yIG5vIGxvbmdlciBzdXBwb3J0ZWQsIHBpcGUgdG8gbWFwIGluc3RlYWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTGF0ZXN0PFQsIFQyLCBUMywgUj4odjE6IE9ic2VydmFibGVJbnB1dDxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCByZXN1bHRTZWxlY3RvcjogKHYxOiBULCB2MjogVDIsIHYzOiBUMykgPT4gUiwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IE9ic2VydmFibGU8Uj47XG4vKiogQGRlcHJlY2F0ZWQgcmVzdWx0U2VsZWN0b3Igbm8gbG9uZ2VyIHN1cHBvcnRlZCwgcGlwZSB0byBtYXAgaW5zdGVhZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVMYXRlc3Q8VCwgVDIsIFQzLCBUNCwgUj4odjE6IE9ic2VydmFibGVJbnB1dDxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0PiwgcmVzdWx0U2VsZWN0b3I6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCkgPT4gUiwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IE9ic2VydmFibGU8Uj47XG4vKiogQGRlcHJlY2F0ZWQgcmVzdWx0U2VsZWN0b3Igbm8gbG9uZ2VyIHN1cHBvcnRlZCwgcGlwZSB0byBtYXAgaW5zdGVhZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVMYXRlc3Q8VCwgVDIsIFQzLCBUNCwgVDUsIFI+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4sIHY1OiBPYnNlcnZhYmxlSW5wdXQ8VDU+LCByZXN1bHRTZWxlY3RvcjogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgdjQ6IFQ0LCB2NTogVDUpID0+IFIsIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiBPYnNlcnZhYmxlPFI+O1xuLyoqIEBkZXByZWNhdGVkIHJlc3VsdFNlbGVjdG9yIG5vIGxvbmdlciBzdXBwb3J0ZWQsIHBpcGUgdG8gbWFwIGluc3RlYWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTGF0ZXN0PFQsIFQyLCBUMywgVDQsIFQ1LCBUNiwgUj4odjE6IE9ic2VydmFibGVJbnB1dDxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0PiwgdjU6IE9ic2VydmFibGVJbnB1dDxUNT4sIHY2OiBPYnNlcnZhYmxlSW5wdXQ8VDY+LCByZXN1bHRTZWxlY3RvcjogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgdjQ6IFQ0LCB2NTogVDUsIHY2OiBUNikgPT4gUiwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IE9ic2VydmFibGU8Uj47XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTGF0ZXN0PFQsIFQyPih2MTogT2JzZXJ2YWJsZUlucHV0PFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IE9ic2VydmFibGU8W1QsIFQyXT47XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdDxULCBUMiwgVDM+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IE9ic2VydmFibGU8W1QsIFQyLCBUM10+O1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVMYXRlc3Q8VCwgVDIsIFQzLCBUND4odjE6IE9ic2VydmFibGVJbnB1dDxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0Piwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IE9ic2VydmFibGU8W1QsIFQyLCBUMywgVDRdPjtcbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTGF0ZXN0PFQsIFQyLCBUMywgVDQsIFQ1Pih2MTogT2JzZXJ2YWJsZUlucHV0PFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4sIHY0OiBPYnNlcnZhYmxlSW5wdXQ8VDQ+LCB2NTogT2JzZXJ2YWJsZUlucHV0PFQ1Piwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IE9ic2VydmFibGU8W1QsIFQyLCBUMywgVDQsIFQ1XT47XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdDxULCBUMiwgVDMsIFQ0LCBUNSwgVDY+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4sIHY1OiBPYnNlcnZhYmxlSW5wdXQ8VDU+LCB2NjogT2JzZXJ2YWJsZUlucHV0PFQ2Piwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IE9ic2VydmFibGU8W1QsIFQyLCBUMywgVDQsIFQ1LCBUNl0+O1xuXG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdDxUPihhcnJheTogT2JzZXJ2YWJsZUlucHV0PFQ+W10sIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiBPYnNlcnZhYmxlPFRbXT47XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdDxSPihhcnJheTogT2JzZXJ2YWJsZUlucHV0PGFueT5bXSwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IE9ic2VydmFibGU8Uj47XG4vKiogQGRlcHJlY2F0ZWQgcmVzdWx0U2VsZWN0b3Igbm8gbG9uZ2VyIHN1cHBvcnRlZCwgcGlwZSB0byBtYXAgaW5zdGVhZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVMYXRlc3Q8VCwgUj4oYXJyYXk6IE9ic2VydmFibGVJbnB1dDxUPltdLCByZXN1bHRTZWxlY3RvcjogKC4uLnZhbHVlczogQXJyYXk8VD4pID0+IFIsIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiBPYnNlcnZhYmxlPFI+O1xuLyoqIEBkZXByZWNhdGVkIHJlc3VsdFNlbGVjdG9yIG5vIGxvbmdlciBzdXBwb3J0ZWQsIHBpcGUgdG8gbWFwIGluc3RlYWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTGF0ZXN0PFI+KGFycmF5OiBPYnNlcnZhYmxlSW5wdXQ8YW55PltdLCByZXN1bHRTZWxlY3RvcjogKC4uLnZhbHVlczogQXJyYXk8YW55PikgPT4gUiwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdDxUPiguLi5vYnNlcnZhYmxlczogQXJyYXk8T2JzZXJ2YWJsZUlucHV0PFQ+IHwgU2NoZWR1bGVyTGlrZT4pOiBPYnNlcnZhYmxlPFRbXT47XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdDxULCBSPiguLi5vYnNlcnZhYmxlczogQXJyYXk8T2JzZXJ2YWJsZUlucHV0PFQ+IHwgKCguLi52YWx1ZXM6IEFycmF5PFQ+KSA9PiBSKSB8IFNjaGVkdWxlckxpa2U+KTogT2JzZXJ2YWJsZTxSPjtcbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTGF0ZXN0PFI+KC4uLm9ic2VydmFibGVzOiBBcnJheTxPYnNlcnZhYmxlSW5wdXQ8YW55PiB8ICgoLi4udmFsdWVzOiBBcnJheTxhbnk+KSA9PiBSKSB8IFNjaGVkdWxlckxpa2U+KTogT2JzZXJ2YWJsZTxSPjtcbi8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5cbi8qKlxuICogQ29tYmluZXMgbXVsdGlwbGUgT2JzZXJ2YWJsZXMgdG8gY3JlYXRlIGFuIE9ic2VydmFibGUgd2hvc2UgdmFsdWVzIGFyZVxuICogY2FsY3VsYXRlZCBmcm9tIHRoZSBsYXRlc3QgdmFsdWVzIG9mIGVhY2ggb2YgaXRzIGlucHV0IE9ic2VydmFibGVzLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5XaGVuZXZlciBhbnkgaW5wdXQgT2JzZXJ2YWJsZSBlbWl0cyBhIHZhbHVlLCBpdFxuICogY29tcHV0ZXMgYSBmb3JtdWxhIHVzaW5nIHRoZSBsYXRlc3QgdmFsdWVzIGZyb20gYWxsIHRoZSBpbnB1dHMsIHRoZW4gZW1pdHNcbiAqIHRoZSBvdXRwdXQgb2YgdGhhdCBmb3JtdWxhLjwvc3Bhbj5cbiAqXG4gKiAhW10oY29tYmluZUxhdGVzdC5wbmcpXG4gKlxuICogYGNvbWJpbmVMYXRlc3RgIGNvbWJpbmVzIHRoZSB2YWx1ZXMgZnJvbSBhbGwgdGhlIE9ic2VydmFibGVzIHBhc3NlZCBhc1xuICogYXJndW1lbnRzLiBUaGlzIGlzIGRvbmUgYnkgc3Vic2NyaWJpbmcgdG8gZWFjaCBPYnNlcnZhYmxlIGluIG9yZGVyIGFuZCxcbiAqIHdoZW5ldmVyIGFueSBPYnNlcnZhYmxlIGVtaXRzLCBjb2xsZWN0aW5nIGFuIGFycmF5IG9mIHRoZSBtb3N0IHJlY2VudFxuICogdmFsdWVzIGZyb20gZWFjaCBPYnNlcnZhYmxlLiBTbyBpZiB5b3UgcGFzcyBgbmAgT2JzZXJ2YWJsZXMgdG8gb3BlcmF0b3IsXG4gKiByZXR1cm5lZCBPYnNlcnZhYmxlIHdpbGwgYWx3YXlzIGVtaXQgYW4gYXJyYXkgb2YgYG5gIHZhbHVlcywgaW4gb3JkZXJcbiAqIGNvcnJlc3BvbmRpbmcgdG8gb3JkZXIgb2YgcGFzc2VkIE9ic2VydmFibGVzICh2YWx1ZSBmcm9tIHRoZSBmaXJzdCBPYnNlcnZhYmxlXG4gKiBvbiB0aGUgZmlyc3QgcGxhY2UgYW5kIHNvIG9uKS5cbiAqXG4gKiBTdGF0aWMgdmVyc2lvbiBvZiBgY29tYmluZUxhdGVzdGAgYWNjZXB0cyBlaXRoZXIgYW4gYXJyYXkgb2YgT2JzZXJ2YWJsZXNcbiAqIG9yIGVhY2ggT2JzZXJ2YWJsZSBjYW4gYmUgcHV0IGRpcmVjdGx5IGFzIGFuIGFyZ3VtZW50LiBOb3RlIHRoYXQgYXJyYXkgb2ZcbiAqIE9ic2VydmFibGVzIGlzIGdvb2QgY2hvaWNlLCBpZiB5b3UgZG9uJ3Qga25vdyBiZWZvcmVoYW5kIGhvdyBtYW55IE9ic2VydmFibGVzXG4gKiB5b3Ugd2lsbCBjb21iaW5lLiBQYXNzaW5nIGVtcHR5IGFycmF5IHdpbGwgcmVzdWx0IGluIE9ic2VydmFibGUgdGhhdFxuICogY29tcGxldGVzIGltbWVkaWF0ZWx5LlxuICpcbiAqIFRvIGVuc3VyZSBvdXRwdXQgYXJyYXkgaGFzIGFsd2F5cyB0aGUgc2FtZSBsZW5ndGgsIGBjb21iaW5lTGF0ZXN0YCB3aWxsXG4gKiBhY3R1YWxseSB3YWl0IGZvciBhbGwgaW5wdXQgT2JzZXJ2YWJsZXMgdG8gZW1pdCBhdCBsZWFzdCBvbmNlLFxuICogYmVmb3JlIGl0IHN0YXJ0cyBlbWl0dGluZyByZXN1bHRzLiBUaGlzIG1lYW5zIGlmIHNvbWUgT2JzZXJ2YWJsZSBlbWl0c1xuICogdmFsdWVzIGJlZm9yZSBvdGhlciBPYnNlcnZhYmxlcyBzdGFydGVkIGVtaXR0aW5nLCBhbGwgdGhlc2UgdmFsdWVzIGJ1dCB0aGUgbGFzdFxuICogd2lsbCBiZSBsb3N0LiBPbiB0aGUgb3RoZXIgaGFuZCwgaWYgc29tZSBPYnNlcnZhYmxlIGRvZXMgbm90IGVtaXQgYSB2YWx1ZSBidXRcbiAqIGNvbXBsZXRlcywgcmVzdWx0aW5nIE9ic2VydmFibGUgd2lsbCBjb21wbGV0ZSBhdCB0aGUgc2FtZSBtb21lbnQgd2l0aG91dFxuICogZW1pdHRpbmcgYW55dGhpbmcsIHNpbmNlIGl0IHdpbGwgYmUgbm93IGltcG9zc2libGUgdG8gaW5jbHVkZSB2YWx1ZSBmcm9tXG4gKiBjb21wbGV0ZWQgT2JzZXJ2YWJsZSBpbiByZXN1bHRpbmcgYXJyYXkuIEFsc28sIGlmIHNvbWUgaW5wdXQgT2JzZXJ2YWJsZSBkb2VzXG4gKiBub3QgZW1pdCBhbnkgdmFsdWUgYW5kIG5ldmVyIGNvbXBsZXRlcywgYGNvbWJpbmVMYXRlc3RgIHdpbGwgYWxzbyBuZXZlciBlbWl0XG4gKiBhbmQgbmV2ZXIgY29tcGxldGUsIHNpbmNlLCBhZ2FpbiwgaXQgd2lsbCB3YWl0IGZvciBhbGwgc3RyZWFtcyB0byBlbWl0IHNvbWVcbiAqIHZhbHVlLlxuICpcbiAqIElmIGF0IGxlYXN0IG9uZSBPYnNlcnZhYmxlIHdhcyBwYXNzZWQgdG8gYGNvbWJpbmVMYXRlc3RgIGFuZCBhbGwgcGFzc2VkIE9ic2VydmFibGVzXG4gKiBlbWl0dGVkIHNvbWV0aGluZywgcmVzdWx0aW5nIE9ic2VydmFibGUgd2lsbCBjb21wbGV0ZSB3aGVuIGFsbCBjb21iaW5lZFxuICogc3RyZWFtcyBjb21wbGV0ZS4gU28gZXZlbiBpZiBzb21lIE9ic2VydmFibGUgY29tcGxldGVzLCByZXN1bHQgb2ZcbiAqIGBjb21iaW5lTGF0ZXN0YCB3aWxsIHN0aWxsIGVtaXQgdmFsdWVzIHdoZW4gb3RoZXIgT2JzZXJ2YWJsZXMgZG8uIEluIGNhc2VcbiAqIG9mIGNvbXBsZXRlZCBPYnNlcnZhYmxlLCBpdHMgdmFsdWUgZnJvbSBub3cgb24gd2lsbCBhbHdheXMgYmUgdGhlIGxhc3RcbiAqIGVtaXR0ZWQgdmFsdWUuIE9uIHRoZSBvdGhlciBoYW5kLCBpZiBhbnkgT2JzZXJ2YWJsZSBlcnJvcnMsIGBjb21iaW5lTGF0ZXN0YFxuICogd2lsbCBlcnJvciBpbW1lZGlhdGVseSBhcyB3ZWxsLCBhbmQgYWxsIG90aGVyIE9ic2VydmFibGVzIHdpbGwgYmUgdW5zdWJzY3JpYmVkLlxuICpcbiAqIGBjb21iaW5lTGF0ZXN0YCBhY2NlcHRzIGFzIG9wdGlvbmFsIHBhcmFtZXRlciBgcHJvamVjdGAgZnVuY3Rpb24sIHdoaWNoIHRha2VzXG4gKiBhcyBhcmd1bWVudHMgYWxsIHZhbHVlcyB0aGF0IHdvdWxkIG5vcm1hbGx5IGJlIGVtaXR0ZWQgYnkgcmVzdWx0aW5nIE9ic2VydmFibGUuXG4gKiBgcHJvamVjdGAgY2FuIHJldHVybiBhbnkga2luZCBvZiB2YWx1ZSwgd2hpY2ggd2lsbCBiZSB0aGVuIGVtaXR0ZWQgYnkgT2JzZXJ2YWJsZVxuICogaW5zdGVhZCBvZiBkZWZhdWx0IGFycmF5LiBOb3RlIHRoYXQgYHByb2plY3RgIGRvZXMgbm90IHRha2UgYXMgYXJndW1lbnQgdGhhdCBhcnJheVxuICogb2YgdmFsdWVzLCBidXQgdmFsdWVzIHRoZW1zZWx2ZXMuIFRoYXQgbWVhbnMgZGVmYXVsdCBgcHJvamVjdGAgY2FuIGJlIGltYWdpbmVkXG4gKiBhcyBmdW5jdGlvbiB0aGF0IHRha2VzIGFsbCBpdHMgYXJndW1lbnRzIGFuZCBwdXRzIHRoZW0gaW50byBhbiBhcnJheS5cbiAqXG4gKiAjIyBFeGFtcGxlc1xuICogIyMjIENvbWJpbmUgdHdvIHRpbWVyIE9ic2VydmFibGVzXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBjb25zdCBmaXJzdFRpbWVyID0gdGltZXIoMCwgMTAwMCk7IC8vIGVtaXQgMCwgMSwgMi4uLiBhZnRlciBldmVyeSBzZWNvbmQsIHN0YXJ0aW5nIGZyb20gbm93XG4gKiBjb25zdCBzZWNvbmRUaW1lciA9IHRpbWVyKDUwMCwgMTAwMCk7IC8vIGVtaXQgMCwgMSwgMi4uLiBhZnRlciBldmVyeSBzZWNvbmQsIHN0YXJ0aW5nIDAsNXMgZnJvbSBub3dcbiAqIGNvbnN0IGNvbWJpbmVkVGltZXJzID0gY29tYmluZUxhdGVzdChmaXJzdFRpbWVyLCBzZWNvbmRUaW1lcik7XG4gKiBjb21iaW5lZFRpbWVycy5zdWJzY3JpYmUodmFsdWUgPT4gY29uc29sZS5sb2codmFsdWUpKTtcbiAqIC8vIExvZ3NcbiAqIC8vIFswLCAwXSBhZnRlciAwLjVzXG4gKiAvLyBbMSwgMF0gYWZ0ZXIgMXNcbiAqIC8vIFsxLCAxXSBhZnRlciAxLjVzXG4gKiAvLyBbMiwgMV0gYWZ0ZXIgMnNcbiAqIGBgYFxuICpcbiAqICMjIyBDb21iaW5lIGFuIGFycmF5IG9mIE9ic2VydmFibGVzXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBjb25zdCBvYnNlcnZhYmxlcyA9IFsxLCA1LCAxMF0ubWFwKFxuICogICBuID0+IG9mKG4pLnBpcGUoXG4gKiAgICAgZGVsYXkobiAqIDEwMDApLCAgIC8vIGVtaXQgMCBhbmQgdGhlbiBlbWl0IG4gYWZ0ZXIgbiBzZWNvbmRzXG4gKiAgICAgc3RhcnRXaXRoKDApLFxuICogICApXG4gKiApO1xuICogY29uc3QgY29tYmluZWQgPSBjb21iaW5lTGF0ZXN0KG9ic2VydmFibGVzKTtcbiAqIGNvbWJpbmVkLnN1YnNjcmliZSh2YWx1ZSA9PiBjb25zb2xlLmxvZyh2YWx1ZSkpO1xuICogLy8gTG9nc1xuICogLy8gWzAsIDAsIDBdIGltbWVkaWF0ZWx5XG4gKiAvLyBbMSwgMCwgMF0gYWZ0ZXIgMXNcbiAqIC8vIFsxLCA1LCAwXSBhZnRlciA1c1xuICogLy8gWzEsIDUsIDEwXSBhZnRlciAxMHNcbiAqIGBgYFxuICpcbiAqXG4gKiAjIyMgVXNlIHByb2plY3QgZnVuY3Rpb24gdG8gZHluYW1pY2FsbHkgY2FsY3VsYXRlIHRoZSBCb2R5LU1hc3MgSW5kZXhcbiAqIGBgYGphdmFzY3JpcHRcbiAqICogY29uc3Qgd2VpZ2h0ID0gb2YoNzAsIDcyLCA3NiwgNzksIDc1KTtcbiAqIGNvbnN0IGhlaWdodCA9IG9mKDEuNzYsIDEuNzcsIDEuNzgpO1xuICogY29uc3QgYm1pID0gY29tYmluZUxhdGVzdCh3ZWlnaHQsIGhlaWdodCkucGlwZShcbiAqICAgbWFwKChbdywgaF0pID0+IHcgLyAoaCAqIGgpKSxcbiAqICk7XG4gKiBibWkuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coJ0JNSSBpcyAnICsgeCkpO1xuICpcbiAqIC8vIFdpdGggb3V0cHV0IHRvIGNvbnNvbGU6XG4gKiAvLyBCTUkgaXMgMjQuMjEyMjkzMzg4NDI5NzUzXG4gKiAvLyBCTUkgaXMgMjMuOTM5NDgwOTkyMDUyMDlcbiAqIC8vIEJNSSBpcyAyMy42NzEyNTM2Mjk1OTIyMjJcbiAqIGBgYFxuICpcbiAqIEBzZWUge0BsaW5rIGNvbWJpbmVBbGx9XG4gKiBAc2VlIHtAbGluayBtZXJnZX1cbiAqIEBzZWUge0BsaW5rIHdpdGhMYXRlc3RGcm9tfVxuICpcbiAqIEBwYXJhbSB7T2JzZXJ2YWJsZUlucHV0fSBvYnNlcnZhYmxlMSBBbiBpbnB1dCBPYnNlcnZhYmxlIHRvIGNvbWJpbmUgd2l0aCBvdGhlciBPYnNlcnZhYmxlcy5cbiAqIEBwYXJhbSB7T2JzZXJ2YWJsZUlucHV0fSBvYnNlcnZhYmxlMiBBbiBpbnB1dCBPYnNlcnZhYmxlIHRvIGNvbWJpbmUgd2l0aCBvdGhlciBPYnNlcnZhYmxlcy5cbiAqIE1vcmUgdGhhbiBvbmUgaW5wdXQgT2JzZXJ2YWJsZXMgbWF5IGJlIGdpdmVuIGFzIGFyZ3VtZW50c1xuICogb3IgYW4gYXJyYXkgb2YgT2JzZXJ2YWJsZXMgbWF5IGJlIGdpdmVuIGFzIHRoZSBmaXJzdCBhcmd1bWVudC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFtwcm9qZWN0XSBBbiBvcHRpb25hbCBmdW5jdGlvbiB0byBwcm9qZWN0IHRoZSB2YWx1ZXMgZnJvbVxuICogdGhlIGNvbWJpbmVkIGxhdGVzdCB2YWx1ZXMgaW50byBhIG5ldyB2YWx1ZSBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGUuXG4gKiBAcGFyYW0ge1NjaGVkdWxlckxpa2V9IFtzY2hlZHVsZXI9bnVsbF0gVGhlIHtAbGluayBTY2hlZHVsZXJMaWtlfSB0byB1c2UgZm9yIHN1YnNjcmliaW5nIHRvXG4gKiBlYWNoIGlucHV0IE9ic2VydmFibGUuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIG9mIHByb2plY3RlZCB2YWx1ZXMgZnJvbSB0aGUgbW9zdCByZWNlbnRcbiAqIHZhbHVlcyBmcm9tIGVhY2ggaW5wdXQgT2JzZXJ2YWJsZSwgb3IgYW4gYXJyYXkgb2YgdGhlIG1vc3QgcmVjZW50IHZhbHVlcyBmcm9tXG4gKiBlYWNoIGlucHV0IE9ic2VydmFibGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTGF0ZXN0PFQsIFI+KC4uLm9ic2VydmFibGVzOiBBcnJheTxhbnkgfCBPYnNlcnZhYmxlSW5wdXQ8YW55PiB8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXJyYXk8T2JzZXJ2YWJsZUlucHV0PGFueT4+IHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKCguLi52YWx1ZXM6IEFycmF5PGFueT4pID0+IFIpKSB8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2NoZWR1bGVyTGlrZT4pOiBPYnNlcnZhYmxlPFI+IHtcbiAgbGV0IHJlc3VsdFNlbGVjdG9yOiAoLi4udmFsdWVzOiBBcnJheTxhbnk+KSA9PiBSID0gIG51bGw7XG4gIGxldCBzY2hlZHVsZXI6IFNjaGVkdWxlckxpa2UgPSBudWxsO1xuXG4gIGlmIChpc1NjaGVkdWxlcihvYnNlcnZhYmxlc1tvYnNlcnZhYmxlcy5sZW5ndGggLSAxXSkpIHtcbiAgICBzY2hlZHVsZXIgPSA8U2NoZWR1bGVyTGlrZT5vYnNlcnZhYmxlcy5wb3AoKTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb2JzZXJ2YWJsZXNbb2JzZXJ2YWJsZXMubGVuZ3RoIC0gMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXN1bHRTZWxlY3RvciA9IDwoLi4udmFsdWVzOiBBcnJheTxhbnk+KSA9PiBSPm9ic2VydmFibGVzLnBvcCgpO1xuICB9XG5cbiAgLy8gaWYgdGhlIGZpcnN0IGFuZCBvbmx5IG90aGVyIGFyZ3VtZW50IGJlc2lkZXMgdGhlIHJlc3VsdFNlbGVjdG9yIGlzIGFuIGFycmF5XG4gIC8vIGFzc3VtZSBpdCdzIGJlZW4gY2FsbGVkIHdpdGggYGNvbWJpbmVMYXRlc3QoW29iczEsIG9iczIsIG9iczNdLCByZXN1bHRTZWxlY3RvcilgXG4gIGlmIChvYnNlcnZhYmxlcy5sZW5ndGggPT09IDEgJiYgaXNBcnJheShvYnNlcnZhYmxlc1swXSkpIHtcbiAgICBvYnNlcnZhYmxlcyA9IDxBcnJheTxPYnNlcnZhYmxlPGFueT4+Pm9ic2VydmFibGVzWzBdO1xuICB9XG5cbiAgcmV0dXJuIGZyb21BcnJheShvYnNlcnZhYmxlcywgc2NoZWR1bGVyKS5saWZ0KG5ldyBDb21iaW5lTGF0ZXN0T3BlcmF0b3I8VCwgUj4ocmVzdWx0U2VsZWN0b3IpKTtcbn1cblxuZXhwb3J0IGNsYXNzIENvbWJpbmVMYXRlc3RPcGVyYXRvcjxULCBSPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFI+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZXN1bHRTZWxlY3Rvcj86ICguLi52YWx1ZXM6IEFycmF5PGFueT4pID0+IFIpIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxSPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBDb21iaW5lTGF0ZXN0U3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLnJlc3VsdFNlbGVjdG9yKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmV4cG9ydCBjbGFzcyBDb21iaW5lTGF0ZXN0U3Vic2NyaWJlcjxULCBSPiBleHRlbmRzIE91dGVyU3Vic2NyaWJlcjxULCBSPiB7XG4gIHByaXZhdGUgYWN0aXZlOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIHZhbHVlczogYW55W10gPSBbXTtcbiAgcHJpdmF0ZSBvYnNlcnZhYmxlczogYW55W10gPSBbXTtcbiAgcHJpdmF0ZSB0b1Jlc3BvbmQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxSPiwgcHJpdmF0ZSByZXN1bHRTZWxlY3Rvcj86ICguLi52YWx1ZXM6IEFycmF5PGFueT4pID0+IFIpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQob2JzZXJ2YWJsZTogYW55KSB7XG4gICAgdGhpcy52YWx1ZXMucHVzaChOT05FKTtcbiAgICB0aGlzLm9ic2VydmFibGVzLnB1c2gob2JzZXJ2YWJsZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCkge1xuICAgIGNvbnN0IG9ic2VydmFibGVzID0gdGhpcy5vYnNlcnZhYmxlcztcbiAgICBjb25zdCBsZW4gPSBvYnNlcnZhYmxlcy5sZW5ndGg7XG4gICAgaWYgKGxlbiA9PT0gMCkge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFjdGl2ZSA9IGxlbjtcbiAgICAgIHRoaXMudG9SZXNwb25kID0gbGVuO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gb2JzZXJ2YWJsZXNbaV07XG4gICAgICAgIHRoaXMuYWRkKHN1YnNjcmliZVRvUmVzdWx0KHRoaXMsIG9ic2VydmFibGUsIG9ic2VydmFibGUsIGkpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBub3RpZnlDb21wbGV0ZSh1bnVzZWQ6IFN1YnNjcmliZXI8Uj4pOiB2b2lkIHtcbiAgICBpZiAoKHRoaXMuYWN0aXZlIC09IDEpID09PSAwKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG5cbiAgbm90aWZ5TmV4dChvdXRlclZhbHVlOiBULCBpbm5lclZhbHVlOiBSLFxuICAgICAgICAgICAgIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgIGlubmVyU3ViOiBJbm5lclN1YnNjcmliZXI8VCwgUj4pOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLnZhbHVlcztcbiAgICBjb25zdCBvbGRWYWwgPSB2YWx1ZXNbb3V0ZXJJbmRleF07XG4gICAgY29uc3QgdG9SZXNwb25kID0gIXRoaXMudG9SZXNwb25kXG4gICAgICA/IDBcbiAgICAgIDogb2xkVmFsID09PSBOT05FID8gLS10aGlzLnRvUmVzcG9uZCA6IHRoaXMudG9SZXNwb25kO1xuICAgIHZhbHVlc1tvdXRlckluZGV4XSA9IGlubmVyVmFsdWU7XG5cbiAgICBpZiAodG9SZXNwb25kID09PSAwKSB7XG4gICAgICBpZiAodGhpcy5yZXN1bHRTZWxlY3Rvcikge1xuICAgICAgICB0aGlzLl90cnlSZXN1bHRTZWxlY3Rvcih2YWx1ZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHZhbHVlcy5zbGljZSgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF90cnlSZXN1bHRTZWxlY3Rvcih2YWx1ZXM6IGFueVtdKSB7XG4gICAgbGV0IHJlc3VsdDogYW55O1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSB0aGlzLnJlc3VsdFNlbGVjdG9yLmFwcGx5KHRoaXMsIHZhbHVlcyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dChyZXN1bHQpO1xuICB9XG59XG4iXX0=