var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { Observable } from '../Observable';
import { AsyncSubject } from '../AsyncSubject';
import { map } from '../operators/map';
import { canReportError } from '../util/canReportError';
import { isArray } from '../util/isArray';
import { isScheduler } from '../util/isScheduler';
export function bindCallback(callbackFunc, resultSelector, scheduler) {
    if (resultSelector) {
        if (isScheduler(resultSelector)) {
            scheduler = resultSelector;
        }
        else {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return bindCallback(callbackFunc, scheduler).apply(void 0, __spread(args)).pipe(map(function (args) { return isArray(args) ? resultSelector.apply(void 0, __spread(args)) : resultSelector(args); }));
            };
        }
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var context = this;
        var subject;
        var params = {
            context: context,
            subject: subject,
            callbackFunc: callbackFunc,
            scheduler: scheduler,
        };
        return new Observable(function (subscriber) {
            if (!scheduler) {
                if (!subject) {
                    subject = new AsyncSubject();
                    var handler = function () {
                        var innerArgs = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            innerArgs[_i] = arguments[_i];
                        }
                        subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
                        subject.complete();
                    };
                    try {
                        callbackFunc.apply(context, __spread(args, [handler]));
                    }
                    catch (err) {
                        if (canReportError(subject)) {
                            subject.error(err);
                        }
                        else {
                            console.warn(err);
                        }
                    }
                }
                return subject.subscribe(subscriber);
            }
            else {
                var state = {
                    args: args, subscriber: subscriber, params: params,
                };
                return scheduler.schedule(dispatch, 0, state);
            }
        });
    };
}
function dispatch(state) {
    var _this = this;
    var self = this;
    var args = state.args, subscriber = state.subscriber, params = state.params;
    var callbackFunc = params.callbackFunc, context = params.context, scheduler = params.scheduler;
    var subject = params.subject;
    if (!subject) {
        subject = params.subject = new AsyncSubject();
        var handler = function () {
            var innerArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                innerArgs[_i] = arguments[_i];
            }
            var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
            _this.add(scheduler.schedule(dispatchNext, 0, { value: value, subject: subject }));
        };
        try {
            callbackFunc.apply(context, __spread(args, [handler]));
        }
        catch (err) {
            subject.error(err);
        }
    }
    this.add(subject.subscribe(subscriber));
}
function dispatchNext(state) {
    var value = state.value, subject = state.subject;
    subject.next(value);
    subject.complete();
}
function dispatchError(state) {
    var err = state.err, subject = state.subject;
    subject.error(err);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZENhbGxiYWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZXh0ZXJuYWwvcnhqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL2JpbmRDYWxsYmFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN2QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQW1LbEQsTUFBTSxVQUFVLFlBQVksQ0FDMUIsWUFBc0IsRUFDdEIsY0FBdUMsRUFDdkMsU0FBeUI7SUFFekIsSUFBSSxjQUFjLEVBQUU7UUFDbEIsSUFBSSxXQUFXLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDL0IsU0FBUyxHQUFHLGNBQWMsQ0FBQztTQUM1QjthQUFNO1lBRUwsT0FBTztnQkFBQyxjQUFjO3FCQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7b0JBQWQseUJBQWM7O2dCQUFLLE9BQUEsWUFBWSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsd0JBQUksSUFBSSxHQUFFLElBQUksQ0FDNUUsR0FBRyxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLHdCQUFJLElBQUksR0FBRSxDQUFDLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUE5RCxDQUE4RCxDQUFDLENBQzlFO1lBRjBCLENBRTFCLENBQUM7U0FDSDtLQUNGO0lB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RyxDQUFDLENBQUM7U0FDcEI7S0FDRjtJQUVELElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFPRCxTQUFTLFlBQVksQ0FBeUMsS0FBbUI7SUFDdkUsSUFBQSxtQkFBSyxFQUFFLHVCQUFPLENBQVc7SUFDakMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDckIsQ0FBQztBQU9ELFNBQVMsYUFBYSxDQUEwQyxLQUFvQjtJQUMxRSxJQUFBLGVBQUcsRUFBRSx1QkFBTyxDQUFXO0lBQy9CLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNjaGVkdWxlckxpa2UsIFNjaGVkdWxlckFjdGlvbiB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEFzeW5jU3ViamVjdCB9IGZyb20gJy4uL0FzeW5jU3ViamVjdCc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICcuLi9vcGVyYXRvcnMvbWFwJztcbmltcG9ydCB7IGNhblJlcG9ydEVycm9yIH0gZnJvbSAnLi4vdXRpbC9jYW5SZXBvcnRFcnJvcic7XG5pbXBvcnQgeyBpc0FycmF5IH0gZnJvbSAnLi4vdXRpbC9pc0FycmF5JztcbmltcG9ydCB7IGlzU2NoZWR1bGVyIH0gZnJvbSAnLi4vdXRpbC9pc1NjaGVkdWxlcic7XG5cbi8vIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aFxuLyoqIEBkZXByZWNhdGVkIHJlc3VsdFNlbGVjdG9yIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQsIHVzZSBhIG1hcHBpbmcgZnVuY3Rpb24uICovXG5leHBvcnQgZnVuY3Rpb24gYmluZENhbGxiYWNrKGNhbGxiYWNrRnVuYzogRnVuY3Rpb24sIHJlc3VsdFNlbGVjdG9yOiBGdW5jdGlvbiwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6ICguLi5hcmdzOiBhbnlbXSkgPT4gT2JzZXJ2YWJsZTxhbnk+O1xuXG5leHBvcnQgZnVuY3Rpb24gYmluZENhbGxiYWNrPFIxLCBSMiwgUjMsIFI0PihjYWxsYmFja0Z1bmM6IChjYWxsYmFjazogKHJlczE6IFIxLCByZXMyOiBSMiwgcmVzMzogUjMsIHJlczQ6IFI0LCAuLi5hcmdzOiBhbnlbXSkgPT4gYW55KSA9PiBhbnksIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiAoKSA9PiBPYnNlcnZhYmxlPGFueVtdPjtcbmV4cG9ydCBmdW5jdGlvbiBiaW5kQ2FsbGJhY2s8UjEsIFIyLCBSMz4oY2FsbGJhY2tGdW5jOiAoY2FsbGJhY2s6IChyZXMxOiBSMSwgcmVzMjogUjIsIHJlczM6IFIzKSA9PiBhbnkpID0+IGFueSwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6ICgpID0+IE9ic2VydmFibGU8W1IxLCBSMiwgUjNdPjtcbmV4cG9ydCBmdW5jdGlvbiBiaW5kQ2FsbGJhY2s8UjEsIFIyPihjYWxsYmFja0Z1bmM6IChjYWxsYmFjazogKHJlczE6IFIxLCByZXMyOiBSMikgPT4gYW55KSA9PiBhbnksIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiAoKSA9PiBPYnNlcnZhYmxlPFtSMSwgUjJdPjtcbmV4cG9ydCBmdW5jdGlvbiBiaW5kQ2FsbGJhY2s8UjE+KGNhbGxiYWNrRnVuYzogKGNhbGxiYWNrOiAocmVzMTogUjEpID0+IGFueSkgPT4gYW55LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogKCkgPT4gT2JzZXJ2YWJsZTxSMT47XG5leHBvcnQgZnVuY3Rpb24gYmluZENhbGxiYWNrKGNhbGxiYWNrRnVuYzogKGNhbGxiYWNrOiAoKSA9PiBhbnkpID0+IGFueSwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6ICgpID0+IE9ic2VydmFibGU8dm9pZD47XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5kQ2FsbGJhY2s8QTEsIFIxLCBSMiwgUjMsIFI0PihjYWxsYmFja0Z1bmM6IChhcmcxOiBBMSwgY2FsbGJhY2s6IChyZXMxOiBSMSwgcmVzMjogUjIsIHJlczM6IFIzLCByZXM0OiBSNCwgLi4uYXJnczogYW55W10pID0+IGFueSkgPT4gYW55LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogKGFyZzE6IEExKSA9PiBPYnNlcnZhYmxlPGFueVtdPjtcbmV4cG9ydCBmdW5jdGlvbiBiaW5kQ2FsbGJhY2s8QTEsIFIxLCBSMiwgUjM+KGNhbGxiYWNrRnVuYzogKGFyZzE6IEExLCBjYWxsYmFjazogKHJlczE6IFIxLCByZXMyOiBSMiwgcmVzMzogUjMpID0+IGFueSkgPT4gYW55LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogKGFyZzE6IEExKSA9PiBPYnNlcnZhYmxlPFtSMSwgUjIsIFIzXT47XG5leHBvcnQgZnVuY3Rpb24gYmluZENhbGxiYWNrPEExLCBSMSwgUjI+KGNhbGxiYWNrRnVuYzogKGFyZzE6IEExLCBjYWxsYmFjazogKHJlczE6IFIxLCByZXMyOiBSMikgPT4gYW55KSA9PiBhbnksIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiAoYXJnMTogQTEpID0+IE9ic2VydmFibGU8W1IxLCBSMl0+O1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRDYWxsYmFjazxBMSwgUjE+KGNhbGxiYWNrRnVuYzogKGFyZzE6IEExLCBjYWxsYmFjazogKHJlczE6IFIxKSA9PiBhbnkpID0+IGFueSwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IChhcmcxOiBBMSkgPT4gT2JzZXJ2YWJsZTxSMT47XG5leHBvcnQgZnVuY3Rpb24gYmluZENhbGxiYWNrPEExPihjYWxsYmFja0Z1bmM6IChhcmcxOiBBMSwgY2FsbGJhY2s6ICgpID0+IGFueSkgPT4gYW55LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogKGFyZzE6IEExKSA9PiBPYnNlcnZhYmxlPHZvaWQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gYmluZENhbGxiYWNrPEExLCBBMiwgUjEsIFIyLCBSMywgUjQ+KGNhbGxiYWNrRnVuYzogKGFyZzE6IEExLCBhcmcyOiBBMiwgY2FsbGJhY2s6IChyZXMxOiBSMSwgcmVzMjogUjIsIHJlczM6IFIzLCByZXM0OiBSNCwgLi4uYXJnczogYW55W10pID0+IGFueSkgPT4gYW55LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogKGFyZzE6IEExLCBhcmcyOiBBMikgPT4gT2JzZXJ2YWJsZTxhbnlbXT47XG5leHBvcnQgZnVuY3Rpb24gYmluZENhbGxiYWNrPEExLCBBMiwgUjEsIFIyLCBSMz4oY2FsbGJhY2tGdW5jOiAoYXJnMTogQTEsIGFyZzI6IEEyLCBjYWxsYmFjazogKHJlczE6IFIxLCByZXMyOiBSMiwgcmVzMzogUjMpID0+IGFueSkgPT4gYW55LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogKGFyZzE6IEExLCBhcmcyOiBBMikgPT4gT2JzZXJ2YWJsZTxbUjEsIFIyLCBSM10+O1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRDYWxsYmFjazxBMSwgQTIsIFIxLCBSMj4oY2FsbGJhY2tGdW5jOiAoYXJnMTogQTEsIGFyZzI6IEEyLCBjYWxsYmFjazogKHJlczE6IFIxLCByZXMyOiBSMikgPT4gYW55KSA9PiBhbnksIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiAoYXJnMTogQTEsIGFyZzI6IEEyKSA9PiBPYnNlcnZhYmxlPFtSMSwgUjJdPjtcbmV4cG9ydCBmdW5jdGlvbiBiaW5kQ2FsbGJhY2s8QTEsIEEyLCBSMT4oY2FsbGJhY2tGdW5jOiAoYXJnMTogQTEsIGFyZzI6IEEyLCBjYWxsYmFjazogKHJlczE6IFIxKSA9PiBhbnkpID0+IGFueSwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IChhcmcxOiBBMSwgYXJnMjogQTIpID0+IE9ic2VydmFibGU8UjE+O1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRDYWxsYmFjazxBMSwgQTI+KGNhbGxiYWNrRnVuYzogKGFyZzE6IEExLCBhcmcyOiBBMiwgY2FsbGJhY2s6ICgpID0+IGFueSkgPT4gYW55LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogKGFyZzE6IEExLCBhcmcyOiBBMikgPT4gT2JzZXJ2YWJsZTx2b2lkPjtcblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmRDYWxsYmFjazxBMSwgQTIsIEEzLCBSMSwgUjIsIFIzLCBSND4oY2FsbGJhY2tGdW5jOiAoYXJnMTogQTEsIGFyZzI6IEEyLCBhcmczOiBBMywgY2FsbGJhY2s6IChyZXMxOiBSMSwgcmVzMjogUjIsIHJlczM6IFIzLCByZXM0OiBSNCwgLi4uYXJnczogYW55W10pID0+IGFueSkgPT4gYW55LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogKGFyZzE6IEExLCBhcmcyOiBBMiwgYXJnMzogQTMpID0+IE9ic2VydmFibGU8YW55W10+O1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRDYWxsYmFjazxBMSwgQTIsIEEzLCBSMSwgUjIsIFIzPihjYWxsYmFja0Z1bmM6IChhcmcxOiBBMSwgYXJnMjogQTIsIGFyZzM6IEEzLCBjYWxsYmFjazogKHJlczE6IFIxLCByZXMyOiBSMiwgcmVzMzogUjMpID0+IGFueSkgPT4gYW55LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogKGFyZzE6IEExLCBhcmcyOiBBMiwgYXJnMzogQTMpID0+IE9ic2VydmFibGU8W1IxLCBSMiwgUjNdPjtcbmV4cG9ydCBmdW5jdGlvbiBiaW5kQ2FsbGJhY2s8QTEsIEEyLCBBMywgUjEsIFIyPihjYWxsYmFja0Z1bmM6IChhcmcxOiBBMSwgYXJnMjogQTIsIGFyZzM6IEEzLCBjYWxsYmFjazogKHJlczE6IFIxLCByZXMyOiBSMikgPT4gYW55KSA9PiBhbnksIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiAoYXJnMTogQTEsIGFyZzI6IEEyLCBhcmczOiBBMykgPT4gT2JzZXJ2YWJsZTxbUjEsIFIyXT47XG5leHBvcnQgZnVuY3Rpb24gYmluZENhbGxiYWNrPEExLCBBMiwgQTMsIFIxPihjYWxsYmFja0Z1bmM6IChhcmcxOiBBMSwgYXJnMjogQTIsIGFyZzM6IEEzLCBjYWxsYmFjazogKHJlczE6IFIxKSA9PiBhbnkpID0+IGFueSwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IChhcmcxOiBBMSwgYXJnMjogQTIsIGFyZzM6IEEzKSA9PiBPYnNlcnZhYmxlPFIxPjtcbmV4cG9ydCBmdW5jdGlvbiBiaW5kQ2FsbGJhY2s8QTEsIEEyLCBBMz4oY2FsbGJhY2tGdW5jOiAoYXJnMTogQTEsIGFyZzI6IEEyLCBhcmczOiBBMywgY2FsbGJhY2s6ICgpID0+IGFueSkgPT4gYW55LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogKGFyZzE6IEExLCBhcmcyOiBBMiwgYXJnMzogQTMpID0+IE9ic2VydmFibGU8dm9pZD47XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5kQ2FsbGJhY2s8QTEsIEEyLCBBMywgQTQsIFIxLCBSMiwgUjMsIFI0PihjYWxsYmFja0Z1bmM6IChhcmcxOiBBMSwgYXJnMjogQTIsIGFyZzM6IEEzLCBhcmc0OiBBNCwgY2FsbGJhY2s6IChyZXMxOiBSMSwgcmVzMjogUjIsIHJlczM6IFIzLCByZXM0OiBSNCwgLi4uYXJnczogYW55W10pID0+IGFueSkgPT4gYW55LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogKGFyZzE6IEExLCBhcmcyOiBBMiwgYXJnMzogQTMsIGFyZzQ6IEE0KSA9PiBPYnNlcnZhYmxlPGFueVtdPjtcbmV4cG9ydCBmdW5jdGlvbiBiaW5kQ2FsbGJhY2s8QTEsIEEyLCBBMywgQTQsIFIxLCBSMiwgUjM+KGNhbGxiYWNrRnVuYzogKGFyZzE6IEExLCBhcmcyOiBBMiwgYXJnMzogQTMsIGFyZzQ6IEE0LCBjYWxsYmFjazogKHJlczE6IFIxLCByZXMyOiBSMiwgcmVzMzogUjMpID0+IGFueSkgPT4gYW55LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogKGFyZzE6IEExLCBhcmcyOiBBMiwgYXJnMzogQTMsIGFyZzQ6IEE0KSA9PiBPYnNlcnZhYmxlPFtSMSwgUjIsIFIzXT47XG5leHBvcnQgZnVuY3Rpb24gYmluZENhbGxiYWNrPEExLCBBMiwgQTMsIEE0LCBSMSwgUjI+KGNhbGxiYWNrRnVuYzogKGFyZzE6IEExLCBhcmcyOiBBMiwgYXJnMzogQTMsIGFyZzQ6IEE0LCBjYWxsYmFjazogKHJlczE6IFIxLCByZXMyOiBSMikgPT4gYW55KSA9PiBhbnksIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiAoYXJnMTogQTEsIGFyZzI6IEEyLCBhcmczOiBBMywgYXJnNDogQTQpID0+IE9ic2VydmFibGU8W1IxLCBSMl0+O1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRDYWxsYmFjazxBMSwgQTIsIEEzLCBBNCwgUjE+KGNhbGxiYWNrRnVuYzogKGFyZzE6IEExLCBhcmcyOiBBMiwgYXJnMzogQTMsIGFyZzQ6IEE0LCBjYWxsYmFjazogKHJlczE6IFIxKSA9PiBhbnkpID0+IGFueSwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IChhcmcxOiBBMSwgYXJnMjogQTIsIGFyZzM6IEEzLCBhcmc0OiBBNCkgPT4gT2JzZXJ2YWJsZTxSMT47XG5leHBvcnQgZnVuY3Rpb24gYmluZENhbGxiYWNrPEExLCBBMiwgQTMsIEE0PihjYWxsYmFja0Z1bmM6IChhcmcxOiBBMSwgYXJnMjogQTIsIGFyZzM6IEEzLCBhcmc0OiBBNCwgY2FsbGJhY2s6ICgpID0+IGFueSkgPT4gYW55LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogKGFyZzE6IEExLCBhcmcyOiBBMiwgYXJnMzogQTMsIGFyZzQ6IEE0KSA9PiBPYnNlcnZhYmxlPHZvaWQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gYmluZENhbGxiYWNrPEExLCBBMiwgQTMsIEE0LCBBNSwgUjEsIFIyLCBSMywgUjQ+KGNhbGxiYWNrRnVuYzogKGFyZzE6IEExLCBhcmcyOiBBMiwgYXJnMzogQTMsIGFyZzQ6IEE0LCBhcmc1OiBBNSwgY2FsbGJhY2s6IChyZXMxOiBSMSwgcmVzMjogUjIsIHJlczM6IFIzLCByZXM0OiBSNCwgLi4uYXJnczogYW55W10pID0+IGFueSkgPT4gYW55LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogKGFyZzE6IEExLCBhcmcyOiBBMiwgYXJnMzogQTMsIGFyZzQ6IEE0LCBhcmc1OiBBNSkgPT4gT2JzZXJ2YWJsZTxhbnlbXT47XG5leHBvcnQgZnVuY3Rpb24gYmluZENhbGxiYWNrPEExLCBBMiwgQTMsIEE0LCBBNSwgUjEsIFIyLCBSMz4oY2FsbGJhY2tGdW5jOiAoYXJnMTogQTEsIGFyZzI6IEEyLCBhcmczOiBBMywgYXJnNDogQTQsIGFyZzU6IEE1LCBjYWxsYmFjazogKHJlczE6IFIxLCByZXMyOiBSMiwgcmVzMzogUjMpID0+IGFueSkgPT4gYW55LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogKGFyZzE6IEExLCBhcmcyOiBBMiwgYXJnMzogQTMsIGFyZzQ6IEE0LCBhcmc1OiBBNSkgPT4gT2JzZXJ2YWJsZTxbUjEsIFIyLCBSM10+O1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRDYWxsYmFjazxBMSwgQTIsIEEzLCBBNCwgQTUsIFIxLCBSMj4oY2FsbGJhY2tGdW5jOiAoYXJnMTogQTEsIGFyZzI6IEEyLCBhcmczOiBBMywgYXJnNDogQTQsIGFyZzU6IEE1LCBjYWxsYmFjazogKHJlczE6IFIxLCByZXMyOiBSMikgPT4gYW55KSA9PiBhbnksIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiAoYXJnMTogQTEsIGFyZzI6IEEyLCBhcmczOiBBMywgYXJnNDogQTQsIGFyZzU6IEE1KSA9PiBPYnNlcnZhYmxlPFtSMSwgUjJdPjtcbmV4cG9ydCBmdW5jdGlvbiBiaW5kQ2FsbGJhY2s8QTEsIEEyLCBBMywgQTQsIEE1LCBSMT4oY2FsbGJhY2tGdW5jOiAoYXJnMTogQTEsIGFyZzI6IEEyLCBhcmczOiBBMywgYXJnNDogQTQsIGFyZzU6IEE1LCBjYWxsYmFjazogKHJlczE6IFIxKSA9PiBhbnkpID0+IGFueSwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IChhcmcxOiBBMSwgYXJnMjogQTIsIGFyZzM6IEEzLCBhcmc0OiBBNCwgYXJnNTogQTUpID0+IE9ic2VydmFibGU8UjE+O1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRDYWxsYmFjazxBMSwgQTIsIEEzLCBBNCwgQTU+KGNhbGxiYWNrRnVuYzogKGFyZzE6IEExLCBhcmcyOiBBMiwgYXJnMzogQTMsIGFyZzQ6IEE0LCBhcmc1OiBBNSwgY2FsbGJhY2s6ICgpID0+IGFueSkgPT4gYW55LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogKGFyZzE6IEExLCBhcmcyOiBBMiwgYXJnMzogQTMsIGFyZzQ6IEE0LCBhcmc1OiBBNSkgPT4gT2JzZXJ2YWJsZTx2b2lkPjtcblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmRDYWxsYmFjazxBLCBSPihjYWxsYmFja0Z1bmM6ICguLi5hcmdzOiBBcnJheTxBIHwgKChyZXN1bHQ6IFIpID0+IGFueSk+KSA9PiBhbnksIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiAoLi4uYXJnczogQVtdKSA9PiBPYnNlcnZhYmxlPFI+O1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRDYWxsYmFjazxBLCBSPihjYWxsYmFja0Z1bmM6ICguLi5hcmdzOiBBcnJheTxBIHwgKCguLi5yZXN1bHRzOiBSW10pID0+IGFueSk+KSA9PiBhbnksIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiAoLi4uYXJnczogQVtdKSA9PiBPYnNlcnZhYmxlPFJbXT47XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5kQ2FsbGJhY2soY2FsbGJhY2tGdW5jOiBGdW5jdGlvbiwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6ICguLi5hcmdzOiBhbnlbXSkgPT4gT2JzZXJ2YWJsZTxhbnk+O1xuXG4vLyB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aFxuXG4vKipcbiAqIENvbnZlcnRzIGEgY2FsbGJhY2sgQVBJIHRvIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFuIE9ic2VydmFibGUuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkdpdmUgaXQgYSBmdW5jdGlvbiBgZmAgb2YgdHlwZSBgZih4LCBjYWxsYmFjaylgIGFuZFxuICogaXQgd2lsbCByZXR1cm4gYSBmdW5jdGlvbiBgZ2AgdGhhdCB3aGVuIGNhbGxlZCBhcyBgZyh4KWAgd2lsbCBvdXRwdXQgYW5cbiAqIE9ic2VydmFibGUuPC9zcGFuPlxuICpcbiAqIGBiaW5kQ2FsbGJhY2tgIGlzIG5vdCBhbiBvcGVyYXRvciBiZWNhdXNlIGl0cyBpbnB1dCBhbmQgb3V0cHV0IGFyZSBub3RcbiAqIE9ic2VydmFibGVzLiBUaGUgaW5wdXQgaXMgYSBmdW5jdGlvbiBgZnVuY2Agd2l0aCBzb21lIHBhcmFtZXRlcnMuIFRoZVxuICogbGFzdCBwYXJhbWV0ZXIgbXVzdCBiZSBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgYGZ1bmNgIGNhbGxzIHdoZW4gaXQgaXNcbiAqIGRvbmUuXG4gKlxuICogVGhlIG91dHB1dCBvZiBgYmluZENhbGxiYWNrYCBpcyBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgdGhlIHNhbWUgcGFyYW1ldGVyc1xuICogYXMgYGZ1bmNgLCBleGNlcHQgdGhlIGxhc3Qgb25lICh0aGUgY2FsbGJhY2spLiBXaGVuIHRoZSBvdXRwdXQgZnVuY3Rpb25cbiAqIGlzIGNhbGxlZCB3aXRoIGFyZ3VtZW50cyBpdCB3aWxsIHJldHVybiBhbiBPYnNlcnZhYmxlLiBJZiBmdW5jdGlvbiBgZnVuY2BcbiAqIGNhbGxzIGl0cyBjYWxsYmFjayB3aXRoIG9uZSBhcmd1bWVudCwgdGhlIE9ic2VydmFibGUgd2lsbCBlbWl0IHRoYXQgdmFsdWUuXG4gKiBJZiBvbiB0aGUgb3RoZXIgaGFuZCB0aGUgY2FsbGJhY2sgaXMgY2FsbGVkIHdpdGggbXVsdGlwbGUgdmFsdWVzIHRoZSByZXN1bHRpbmdcbiAqIE9ic2VydmFibGUgd2lsbCBlbWl0IGFuIGFycmF5IHdpdGggc2FpZCB2YWx1ZXMgYXMgYXJndW1lbnRzLlxuICpcbiAqIEl0IGlzICoqdmVyeSBpbXBvcnRhbnQqKiB0byByZW1lbWJlciB0aGF0IGlucHV0IGZ1bmN0aW9uIGBmdW5jYCBpcyBub3QgY2FsbGVkXG4gKiB3aGVuIHRoZSBvdXRwdXQgZnVuY3Rpb24gaXMsIGJ1dCByYXRoZXIgd2hlbiB0aGUgT2JzZXJ2YWJsZSByZXR1cm5lZCBieSB0aGUgb3V0cHV0XG4gKiBmdW5jdGlvbiBpcyBzdWJzY3JpYmVkLiBUaGlzIG1lYW5zIGlmIGBmdW5jYCBtYWtlcyBhbiBBSkFYIHJlcXVlc3QsIHRoYXQgcmVxdWVzdFxuICogd2lsbCBiZSBtYWRlIGV2ZXJ5IHRpbWUgc29tZW9uZSBzdWJzY3JpYmVzIHRvIHRoZSByZXN1bHRpbmcgT2JzZXJ2YWJsZSwgYnV0IG5vdCBiZWZvcmUuXG4gKlxuICogVGhlIGxhc3Qgb3B0aW9uYWwgcGFyYW1ldGVyIC0gYHNjaGVkdWxlcmAgLSBjYW4gYmUgdXNlZCB0byBjb250cm9sIHdoZW4gdGhlIGNhbGxcbiAqIHRvIGBmdW5jYCBoYXBwZW5zIGFmdGVyIHNvbWVvbmUgc3Vic2NyaWJlcyB0byBPYnNlcnZhYmxlLCBhcyB3ZWxsIGFzIHdoZW4gcmVzdWx0c1xuICogcGFzc2VkIHRvIGNhbGxiYWNrIHdpbGwgYmUgZW1pdHRlZC4gQnkgZGVmYXVsdCwgdGhlIHN1YnNjcmlwdGlvbiB0byBhbiBPYnNlcnZhYmxlIGNhbGxzIGBmdW5jYFxuICogc3luY2hyb25vdXNseSwgYnV0IHVzaW5nIHtAbGluayBhc3luY1NjaGVkdWxlcn0gYXMgdGhlIGxhc3QgcGFyYW1ldGVyIHdpbGwgZGVmZXIgdGhlIGNhbGwgdG8gYGZ1bmNgLFxuICoganVzdCBsaWtlIHdyYXBwaW5nIHRoZSBjYWxsIGluIGBzZXRUaW1lb3V0YCB3aXRoIGEgdGltZW91dCBvZiBgMGAgd291bGQuIElmIHlvdSB3ZXJlIHRvIHVzZSB0aGUgYXN5bmMgU2NoZWR1bGVyXG4gKiBhbmQgY2FsbCBgc3Vic2NyaWJlYCBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGUsIGFsbCBmdW5jdGlvbiBjYWxscyB0aGF0IGFyZSBjdXJyZW50bHkgZXhlY3V0aW5nXG4gKiB3aWxsIGVuZCBiZWZvcmUgYGZ1bmNgIGlzIGludm9rZWQuXG4gKlxuICogQnkgZGVmYXVsdCwgcmVzdWx0cyBwYXNzZWQgdG8gdGhlIGNhbGxiYWNrIGFyZSBlbWl0dGVkIGltbWVkaWF0ZWx5IGFmdGVyIGBmdW5jYCBpbnZva2VzIHRoZSBjYWxsYmFjay5cbiAqIEluIHBhcnRpY3VsYXIsIGlmIHRoZSBjYWxsYmFjayBpcyBjYWxsZWQgc3luY2hyb25vdXNseSwgdGhlbiB0aGUgc3Vic2NyaXB0aW9uIG9mIHRoZSByZXN1bHRpbmcgT2JzZXJ2YWJsZVxuICogd2lsbCBjYWxsIHRoZSBgbmV4dGAgZnVuY3Rpb24gc3luY2hyb25vdXNseSBhcyB3ZWxsLiAgSWYgeW91IHdhbnQgdG8gZGVmZXIgdGhhdCBjYWxsLFxuICogeW91IG1heSB1c2Uge0BsaW5rIGFzeW5jU2NoZWR1bGVyfSBqdXN0IGFzIGJlZm9yZS4gIFRoaXMgbWVhbnMgdGhhdCBieSB1c2luZyBgU2NoZWR1bGVyLmFzeW5jYCB5b3UgY2FuXG4gKiBlbnN1cmUgdGhhdCBgZnVuY2AgYWx3YXlzIGNhbGxzIGl0cyBjYWxsYmFjayBhc3luY2hyb25vdXNseSwgdGh1cyBhdm9pZGluZyB0ZXJyaWZ5aW5nIFphbGdvLlxuICpcbiAqIE5vdGUgdGhhdCB0aGUgT2JzZXJ2YWJsZSBjcmVhdGVkIGJ5IHRoZSBvdXRwdXQgZnVuY3Rpb24gd2lsbCBhbHdheXMgZW1pdCBhIHNpbmdsZSB2YWx1ZVxuICogYW5kIHRoZW4gY29tcGxldGUgaW1tZWRpYXRlbHkuIElmIGBmdW5jYCBjYWxscyB0aGUgY2FsbGJhY2sgbXVsdGlwbGUgdGltZXMsIHZhbHVlcyBmcm9tIHN1YnNlcXVlbnRcbiAqIGNhbGxzIHdpbGwgbm90IGFwcGVhciBpbiB0aGUgc3RyZWFtLiBJZiB5b3UgbmVlZCB0byBsaXN0ZW4gZm9yIG11bHRpcGxlIGNhbGxzLFxuICogIHlvdSBwcm9iYWJseSB3YW50IHRvIHVzZSB7QGxpbmsgZnJvbUV2ZW50fSBvciB7QGxpbmsgZnJvbUV2ZW50UGF0dGVybn0gaW5zdGVhZC5cbiAqXG4gKiBJZiBgZnVuY2AgZGVwZW5kcyBvbiBzb21lIGNvbnRleHQgKGB0aGlzYCBwcm9wZXJ0eSkgYW5kIGlzIG5vdCBhbHJlYWR5IGJvdW5kLCB0aGUgY29udGV4dCBvZiBgZnVuY2BcbiAqIHdpbGwgYmUgdGhlIGNvbnRleHQgdGhhdCB0aGUgb3V0cHV0IGZ1bmN0aW9uIGhhcyBhdCBjYWxsIHRpbWUuIEluIHBhcnRpY3VsYXIsIGlmIGBmdW5jYFxuICogaXMgY2FsbGVkIGFzIGEgbWV0aG9kIG9mIHNvbWUgb2JqZWMgYW5kIGlmIGBmdW5jYCBpcyBub3QgYWxyZWFkeSBib3VuZCwgaW4gb3JkZXIgdG8gcHJlc2VydmUgdGhlIGNvbnRleHRcbiAqIGl0IGlzIHJlY29tbWVuZGVkIHRoYXQgdGhlIGNvbnRleHQgb2YgdGhlIG91dHB1dCBmdW5jdGlvbiBpcyBzZXQgdG8gdGhhdCBvYmplY3QgYXMgd2VsbC5cbiAqXG4gKiBJZiB0aGUgaW5wdXQgZnVuY3Rpb24gY2FsbHMgaXRzIGNhbGxiYWNrIGluIHRoZSBcIm5vZGUgc3R5bGVcIiAoaS5lLiBmaXJzdCBhcmd1bWVudCB0byBjYWxsYmFjayBpc1xuICogb3B0aW9uYWwgZXJyb3IgcGFyYW1ldGVyIHNpZ25hbGluZyB3aGV0aGVyIHRoZSBjYWxsIGZhaWxlZCBvciBub3QpLCB7QGxpbmsgYmluZE5vZGVDYWxsYmFja31cbiAqIHByb3ZpZGVzIGNvbnZlbmllbnQgZXJyb3IgaGFuZGxpbmcgYW5kIHByb2JhYmx5IGlzIGEgYmV0dGVyIGNob2ljZS5cbiAqIGBiaW5kQ2FsbGJhY2tgIHdpbGwgdHJlYXQgc3VjaCBmdW5jdGlvbnMgdGhlIHNhbWUgYXMgYW55IG90aGVyIGFuZCBlcnJvciBwYXJhbWV0ZXJzXG4gKiAod2hldGhlciBwYXNzZWQgb3Igbm90KSB3aWxsIGFsd2F5cyBiZSBpbnRlcnByZXRlZCBhcyByZWd1bGFyIGNhbGxiYWNrIGFyZ3VtZW50LlxuICpcbiAqICMjIEV4YW1wbGVzXG4gKlxuICogIyMjIENvbnZlcnQgalF1ZXJ5J3MgZ2V0SlNPTiB0byBhbiBPYnNlcnZhYmxlIEFQSVxuICogYGBgamF2YXNjcmlwdFxuICogLy8gU3VwcG9zZSB3ZSBoYXZlIGpRdWVyeS5nZXRKU09OKCcvbXkvdXJsJywgY2FsbGJhY2spXG4gKiBjb25zdCBnZXRKU09OQXNPYnNlcnZhYmxlID0gYmluZENhbGxiYWNrKGpRdWVyeS5nZXRKU09OKTtcbiAqIGNvbnN0IHJlc3VsdCA9IGdldEpTT05Bc09ic2VydmFibGUoJy9teS91cmwnKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSwgZSA9PiBjb25zb2xlLmVycm9yKGUpKTtcbiAqIGBgYFxuICpcbiAqICMjIyBSZWNlaXZlIGFuIGFycmF5IG9mIGFyZ3VtZW50cyBwYXNzZWQgdG8gYSBjYWxsYmFja1xuICogYGBgamF2YXNjcmlwdFxuICogc29tZUZ1bmN0aW9uKChhLCBiLCBjKSA9PiB7XG4gKiAgIGNvbnNvbGUubG9nKGEpOyAvLyA1XG4gKiAgIGNvbnNvbGUubG9nKGIpOyAvLyAnc29tZSBzdHJpbmcnXG4gKiAgIGNvbnNvbGUubG9nKGMpOyAvLyB7c29tZVByb3BlcnR5OiAnc29tZVZhbHVlJ31cbiAqIH0pO1xuICpcbiAqIGNvbnN0IGJvdW5kU29tZUZ1bmN0aW9uID0gYmluZENhbGxiYWNrKHNvbWVGdW5jdGlvbik7XG4gKiBib3VuZFNvbWVGdW5jdGlvbigpLnN1YnNjcmliZSh2YWx1ZXMgPT4ge1xuICogICBjb25zb2xlLmxvZyh2YWx1ZXMpIC8vIFs1LCAnc29tZSBzdHJpbmcnLCB7c29tZVByb3BlcnR5OiAnc29tZVZhbHVlJ31dXG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqICMjIyBDb21wYXJlIGJlaGF2aW91ciB3aXRoIGFuZCB3aXRob3V0IGFzeW5jIFNjaGVkdWxlclxuICogYGBgamF2YXNjcmlwdFxuICogZnVuY3Rpb24gaUNhbGxNeUNhbGxiYWNrU3luY2hyb25vdXNseShjYikge1xuICogICBjYigpO1xuICogfVxuICpcbiAqIGNvbnN0IGJvdW5kU3luY0ZuID0gYmluZENhbGxiYWNrKGlDYWxsTXlDYWxsYmFja1N5bmNocm9ub3VzbHkpO1xuICogY29uc3QgYm91bmRBc3luY0ZuID0gYmluZENhbGxiYWNrKGlDYWxsTXlDYWxsYmFja1N5bmNocm9ub3VzbHksIG51bGwsIFJ4LlNjaGVkdWxlci5hc3luYyk7XG4gKlxuICogYm91bmRTeW5jRm4oKS5zdWJzY3JpYmUoKCkgPT4gY29uc29sZS5sb2coJ0kgd2FzIHN5bmMhJykpO1xuICogYm91bmRBc3luY0ZuKCkuc3Vic2NyaWJlKCgpID0+IGNvbnNvbGUubG9nKCdJIHdhcyBhc3luYyEnKSk7XG4gKiBjb25zb2xlLmxvZygnVGhpcyBoYXBwZW5lZC4uLicpO1xuICpcbiAqIC8vIExvZ3M6XG4gKiAvLyBJIHdhcyBzeW5jIVxuICogLy8gVGhpcyBoYXBwZW5lZC4uLlxuICogLy8gSSB3YXMgYXN5bmMhXG4gKiBgYGBcbiAqXG4gKiAjIyMgVXNlIGJpbmRDYWxsYmFjayBvbiBhbiBvYmplY3QgbWV0aG9kXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBjb25zdCBib3VuZE1ldGhvZCA9IGJpbmRDYWxsYmFjayhzb21lT2JqZWN0Lm1ldGhvZFdpdGhDYWxsYmFjayk7XG4gKiBib3VuZE1ldGhvZC5jYWxsKHNvbWVPYmplY3QpIC8vIG1ha2Ugc3VyZSBtZXRob2RXaXRoQ2FsbGJhY2sgaGFzIGFjY2VzcyB0byBzb21lT2JqZWN0XG4gKiAuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICogYGBgXG4gKlxuICogQHNlZSB7QGxpbmsgYmluZE5vZGVDYWxsYmFja31cbiAqIEBzZWUge0BsaW5rIGZyb219XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyBBIGZ1bmN0aW9uIHdpdGggYSBjYWxsYmFjayBhcyB0aGUgbGFzdCBwYXJhbWV0ZXIuXG4gKiBAcGFyYW0ge1NjaGVkdWxlckxpa2V9IFtzY2hlZHVsZXJdIFRoZSBzY2hlZHVsZXIgb24gd2hpY2ggdG8gc2NoZWR1bGUgdGhlXG4gKiBjYWxsYmFja3MuXG4gKiBAcmV0dXJuIHtmdW5jdGlvbiguLi5wYXJhbXM6ICopOiBPYnNlcnZhYmxlfSBBIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgdGhlXG4gKiBPYnNlcnZhYmxlIHRoYXQgZGVsaXZlcnMgdGhlIHNhbWUgdmFsdWVzIHRoZSBjYWxsYmFjayB3b3VsZCBkZWxpdmVyLlxuICogQG5hbWUgYmluZENhbGxiYWNrXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5kQ2FsbGJhY2s8VD4oXG4gIGNhbGxiYWNrRnVuYzogRnVuY3Rpb24sXG4gIHJlc3VsdFNlbGVjdG9yPzogRnVuY3Rpb258U2NoZWR1bGVyTGlrZSxcbiAgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZVxuKTogKC4uLmFyZ3M6IGFueVtdKSA9PiBPYnNlcnZhYmxlPFQ+IHtcbiAgaWYgKHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgaWYgKGlzU2NoZWR1bGVyKHJlc3VsdFNlbGVjdG9yKSkge1xuICAgICAgc2NoZWR1bGVyID0gcmVzdWx0U2VsZWN0b3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIERFUFJFQ0FURUQgUEFUSFxuICAgICAgcmV0dXJuICguLi5hcmdzOiBhbnlbXSkgPT4gYmluZENhbGxiYWNrKGNhbGxiYWNrRnVuYywgc2NoZWR1bGVyKSguLi5hcmdzKS5waXBlKFxuICAgICAgICBtYXAoKGFyZ3MpID0+IGlzQXJyYXkoYXJncykgPyByZXN1bHRTZWxlY3RvciguLi5hcmdzKSA6IHJlc3VsdFNlbGVjdG9yKGFyZ3MpKSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICh0aGlzOiBhbnksIC4uLmFyZ3M6IGFueVtdKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgY29uc3QgY29udGV4dCA9IHRoaXM7XG4gICAgbGV0IHN1YmplY3Q6IEFzeW5jU3ViamVjdDxUPjtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBjb250ZXh0LFxuICAgICAgc3ViamVjdCxcbiAgICAgIGNhbGxiYWNrRnVuYyxcbiAgICAgIHNjaGVkdWxlcixcbiAgICB9O1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxUPihzdWJzY3JpYmVyID0+IHtcbiAgICAgIGlmICghc2NoZWR1bGVyKSB7XG4gICAgICAgIGlmICghc3ViamVjdCkge1xuICAgICAgICAgIHN1YmplY3QgPSBuZXcgQXN5bmNTdWJqZWN0PFQ+KCk7XG4gICAgICAgICAgY29uc3QgaGFuZGxlciA9ICguLi5pbm5lckFyZ3M6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICBzdWJqZWN0Lm5leHQoaW5uZXJBcmdzLmxlbmd0aCA8PSAxID8gaW5uZXJBcmdzWzBdIDogaW5uZXJBcmdzKTtcbiAgICAgICAgICAgIHN1YmplY3QuY29tcGxldGUoKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNhbGxiYWNrRnVuYy5hcHBseShjb250ZXh0LCBbLi4uYXJncywgaGFuZGxlcl0pO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgaWYgKGNhblJlcG9ydEVycm9yKHN1YmplY3QpKSB7XG4gICAgICAgICAgICAgIHN1YmplY3QuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3ViamVjdC5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzdGF0ZTogRGlzcGF0Y2hTdGF0ZTxUPiA9IHtcbiAgICAgICAgICBhcmdzLCBzdWJzY3JpYmVyLCBwYXJhbXMsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGU8RGlzcGF0Y2hTdGF0ZTxUPj4oZGlzcGF0Y2gsIDAsIHN0YXRlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn1cblxuaW50ZXJmYWNlIERpc3BhdGNoU3RhdGU8VD4ge1xuICBhcmdzOiBhbnlbXTtcbiAgc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPjtcbiAgcGFyYW1zOiBQYXJhbXNDb250ZXh0PFQ+O1xufVxuXG5pbnRlcmZhY2UgUGFyYW1zQ29udGV4dDxUPiB7XG4gIGNhbGxiYWNrRnVuYzogRnVuY3Rpb247XG4gIHNjaGVkdWxlcjogU2NoZWR1bGVyTGlrZTtcbiAgY29udGV4dDogYW55O1xuICBzdWJqZWN0OiBBc3luY1N1YmplY3Q8VD47XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoPFQ+KHRoaXM6IFNjaGVkdWxlckFjdGlvbjxEaXNwYXRjaFN0YXRlPFQ+Piwgc3RhdGU6IERpc3BhdGNoU3RhdGU8VD4pIHtcbiAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gIGNvbnN0IHsgYXJncywgc3Vic2NyaWJlciwgcGFyYW1zIH0gPSBzdGF0ZTtcbiAgY29uc3QgeyBjYWxsYmFja0Z1bmMsIGNvbnRleHQsIHNjaGVkdWxlciB9ID0gcGFyYW1zO1xuICBsZXQgeyBzdWJqZWN0IH0gPSBwYXJhbXM7XG4gIGlmICghc3ViamVjdCkge1xuICAgIHN1YmplY3QgPSBwYXJhbXMuc3ViamVjdCA9IG5ldyBBc3luY1N1YmplY3Q8VD4oKTtcblxuICAgIGNvbnN0IGhhbmRsZXIgPSAoLi4uaW5uZXJBcmdzOiBhbnlbXSkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBpbm5lckFyZ3MubGVuZ3RoIDw9IDEgPyBpbm5lckFyZ3NbMF0gOiBpbm5lckFyZ3M7XG4gICAgICB0aGlzLmFkZChzY2hlZHVsZXIuc2NoZWR1bGU8TmV4dFN0YXRlPFQ+PihkaXNwYXRjaE5leHQsIDAsIHsgdmFsdWUsIHN1YmplY3QgfSkpO1xuICAgIH07XG5cbiAgICB0cnkge1xuICAgICAgY2FsbGJhY2tGdW5jLmFwcGx5KGNvbnRleHQsIFsuLi5hcmdzLCBoYW5kbGVyXSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBzdWJqZWN0LmVycm9yKGVycik7XG4gICAgfVxuICB9XG5cbiAgdGhpcy5hZGQoc3ViamVjdC5zdWJzY3JpYmUoc3Vic2NyaWJlcikpO1xufVxuXG5pbnRlcmZhY2UgTmV4dFN0YXRlPFQ+IHtcbiAgc3ViamVjdDogQXN5bmNTdWJqZWN0PFQ+O1xuICB2YWx1ZTogVDtcbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2hOZXh0PFQ+KHRoaXM6IFNjaGVkdWxlckFjdGlvbjxOZXh0U3RhdGU8VD4+LCBzdGF0ZTogTmV4dFN0YXRlPFQ+KSB7XG4gIGNvbnN0IHsgdmFsdWUsIHN1YmplY3QgfSA9IHN0YXRlO1xuICBzdWJqZWN0Lm5leHQodmFsdWUpO1xuICBzdWJqZWN0LmNvbXBsZXRlKCk7XG59XG5cbmludGVyZmFjZSBFcnJvclN0YXRlPFQ+IHtcbiAgc3ViamVjdDogQXN5bmNTdWJqZWN0PFQ+O1xuICBlcnI6IGFueTtcbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2hFcnJvcjxUPih0aGlzOiBTY2hlZHVsZXJBY3Rpb248RXJyb3JTdGF0ZTxUPj4sIHN0YXRlOiBFcnJvclN0YXRlPFQ+KSB7XG4gIGNvbnN0IHsgZXJyLCBzdWJqZWN0IH0gPSBzdGF0ZTtcbiAgc3ViamVjdC5lcnJvcihlcnIpO1xufVxuIl19