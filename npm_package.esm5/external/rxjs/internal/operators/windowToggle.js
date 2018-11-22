var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Subject } from '../Subject';
import { Subscription } from '../Subscription';
import { tryCatch } from '../util/tryCatch';
import { errorObject } from '../util/errorObject';
import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
export function windowToggle(openings, closingSelector) {
    return function (source) { return source.lift(new WindowToggleOperator(openings, closingSelector)); };
}
var WindowToggleOperator = (function () {
    function WindowToggleOperator(openings, closingSelector) {
        this.openings = openings;
        this.closingSelector = closingSelector;
    }
    WindowToggleOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new WindowToggleSubscriber(subscriber, this.openings, this.closingSelector));
    };
    return WindowToggleOperator;
}());
var WindowToggleSubscriber = (function (_super) {
    __extends(WindowToggleSubscriber, _super);
    function WindowToggleSubscriber(destination, openings, closingSelector) {
        var _this = _super.call(this, destination) || this;
        _this.openings = openings;
        _this.closingSelector = closingSelector;
        _this.contexts = [];
        _this.add(_this.openSubscription = subscribeToResult(_this, openings, openings));
        return _this;
    }
    WindowToggleSubscriber.prototype._next = function (value) {
        var contexts = this.contexts;
        if (contexts) {
            var len = contexts.length;
            for (var i = 0; i < len; i++) {
                contexts[i].window.next(value);
            }
        }
    };
    WindowToggleSubscriber.prototype._error = function (err) {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
                var context = contexts[index];
                context.window.error(err);
                context.subscription.unsubscribe();
            }
        }
        _super.prototype._error.call(this, err);
    };
    WindowToggleSubscriber.prototype._complete = function () {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
                var context = contexts[index];
                context.window.complete();
                context.subscription.unsubscribe();
            }
        }
        _super.prototype._complete.call(this);
    };
    WindowToggleSubscriber.prototype._unsubscribe = function () {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
                var context = contexts[index];
                context.window.unsubscribe();
                context.subscription.unsubscribe();
            }
        }
    };
    WindowToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (outerValue === this.openings) {
            var closingSelector = this.closingSelector;
            var closingNotifier = tryCatch(closingSelector)(innerValue);
            if (closingNotifier === errorObject) {
                return this.error(errorObject.e);
            }
            else {
                var window_1 = new Subject();
                var subscription = new Subscription();
                var context = { window: window_1, subscription: subscription };
                this.contexts.push(context);
                var innerSubscription = subscribeToResult(this, closingNotifier, context);
                if (innerSubscription.closed) {
                    this.closeWindow(this.contexts.length - 1);
                }
                else {
                    innerSubscription.context = context;
                    subscription.add(innerSubscription);
                }
                this.destination.next(window_1);
            }
        }
        else {
            this.closeWindow(this.contexts.indexOf(outerValue));
        }
    };
    WindowToggleSubscriber.prototype.notifyError = function (err) {
        this.error(err);
    };
    WindowToggleSubscriber.prototype.notifyComplete = function (inner) {
        if (inner !== this.openSubscription) {
            this.closeWindow(this.contexts.indexOf(inner.context));
        }
    };
    WindowToggleSubscriber.prototype.closeWindow = function (index) {
        if (index === -1) {
            return;
        }
        var contexts = this.contexts;
        var context = contexts[index];
        var window = context.window, subscription = context.subscription;
        contexts.splice(index, 1);
        window.complete();
        subscription.unsubscribe();
    };
    return WindowToggleSubscriber;
}(OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93VG9nZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZXh0ZXJuYWwvcnhqcy9pbnRlcm5hbC9vcGVyYXRvcnMvd2luZG93VG9nZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFHQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDNUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQWdEOUQsTUFBTSxVQUFVLFlBQVksQ0FBTyxRQUF1QixFQUN2QixlQUFrRDtJQUNuRixPQUFPLFVBQUMsTUFBcUIsSUFBSyxPQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxvQkFBb0IsQ0FBTyxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUMsRUFBdEUsQ0FBc0UsQ0FBQztBQUMzRyxDQUFDO0FBRUQ7SUFFRSw4QkFBb0IsUUFBdUIsRUFDdkIsZUFBa0Q7UUFEbEQsYUFBUSxHQUFSLFFBQVEsQ0FBZTtRQUN2QixvQkFBZSxHQUFmLGVBQWUsQ0FBbUM7SUFDdEUsQ0FBQztJQUVELG1DQUFJLEdBQUosVUFBSyxVQUFxQyxFQUFFLE1BQVc7UUFDckQsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksc0JBQXNCLENBQ2hELFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQ2hELENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCwyQkFBQztBQUFELENBQUMsQUFYRCxJQVdDO0FBWUQ7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QUM7SUFDbEIsQ0FBQztJQUVELCtDQUFjLEdBQWQsVUFBZSxLQUFtQjtRQUNoQyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBUSxLQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNoRTtJQUNILENBQUM7SUFFTyw0Q0FBVyxHQUFuQixVQUFvQixLQUFhO1FBQy9CLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2hCLE9BQU87U0FDUjtRQUVPLElBQUEsd0JBQVEsQ0FBVTtRQUMxQixJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsSUFBQSx1QkFBTSxFQUFFLG1DQUFZLENBQWE7UUFDekMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUIsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xCLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBQ0gsNkJBQUM7QUFBRCxDQUFDLEFBN0hELENBQTJDLGVBQWUsR0E2SHpEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAnLi4vU3ViamVjdCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgdHJ5Q2F0Y2ggfSBmcm9tICcuLi91dGlsL3RyeUNhdGNoJztcbmltcG9ydCB7IGVycm9yT2JqZWN0IH0gZnJvbSAnLi4vdXRpbC9lcnJvck9iamVjdCc7XG5pbXBvcnQgeyBPdXRlclN1YnNjcmliZXIgfSBmcm9tICcuLi9PdXRlclN1YnNjcmliZXInO1xuaW1wb3J0IHsgSW5uZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vSW5uZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IHN1YnNjcmliZVRvUmVzdWx0IH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCc7XG5pbXBvcnQgeyBPcGVyYXRvckZ1bmN0aW9uIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vKipcbiAqIEJyYW5jaCBvdXQgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHZhbHVlcyBhcyBhIG5lc3RlZCBPYnNlcnZhYmxlIHN0YXJ0aW5nIGZyb21cbiAqIGFuIGVtaXNzaW9uIGZyb20gYG9wZW5pbmdzYCBhbmQgZW5kaW5nIHdoZW4gdGhlIG91dHB1dCBvZiBgY2xvc2luZ1NlbGVjdG9yYFxuICogZW1pdHMuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkl0J3MgbGlrZSB7QGxpbmsgYnVmZmVyVG9nZ2xlfSwgYnV0IGVtaXRzIGEgbmVzdGVkXG4gKiBPYnNlcnZhYmxlIGluc3RlYWQgb2YgYW4gYXJyYXkuPC9zcGFuPlxuICpcbiAqICFbXSh3aW5kb3dUb2dnbGUucG5nKVxuICpcbiAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHdpbmRvd3Mgb2YgaXRlbXMgaXQgY29sbGVjdHMgZnJvbSB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlLiBUaGUgb3V0cHV0IE9ic2VydmFibGUgZW1pdHMgd2luZG93cyB0aGF0IGNvbnRhaW4gdGhvc2UgaXRlbXNcbiAqIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGJldHdlZW4gdGhlIHRpbWUgd2hlbiB0aGUgYG9wZW5pbmdzYFxuICogT2JzZXJ2YWJsZSBlbWl0cyBhbiBpdGVtIGFuZCB3aGVuIHRoZSBPYnNlcnZhYmxlIHJldHVybmVkIGJ5XG4gKiBgY2xvc2luZ1NlbGVjdG9yYCBlbWl0cyBhbiBpdGVtLlxuICpcbiAqICMjIEV4YW1wbGVcbiAqIEV2ZXJ5IG90aGVyIHNlY29uZCwgZW1pdCB0aGUgY2xpY2sgZXZlbnRzIGZyb20gdGhlIG5leHQgNTAwbXNcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGNvbnN0IGNsaWNrcyA9IGZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiBjb25zdCBvcGVuaW5ncyA9IGludGVydmFsKDEwMDApO1xuICogY29uc3QgcmVzdWx0ID0gY2xpY2tzLnBpcGUoXG4gKiAgIHdpbmRvd1RvZ2dsZShvcGVuaW5ncywgaSA9PiBpICUgMiA/IGludGVydmFsKDUwMCkgOiBlbXB0eSgpKSxcbiAqICAgbWVyZ2VBbGwoKSxcbiAqICk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICogYGBgXG4gKlxuICogQHNlZSB7QGxpbmsgd2luZG93fVxuICogQHNlZSB7QGxpbmsgd2luZG93Q291bnR9XG4gKiBAc2VlIHtAbGluayB3aW5kb3dUaW1lfVxuICogQHNlZSB7QGxpbmsgd2luZG93V2hlbn1cbiAqIEBzZWUge0BsaW5rIGJ1ZmZlclRvZ2dsZX1cbiAqXG4gKiBAcGFyYW0ge09ic2VydmFibGU8Tz59IG9wZW5pbmdzIEFuIG9ic2VydmFibGUgb2Ygbm90aWZpY2F0aW9ucyB0byBzdGFydCBuZXdcbiAqIHdpbmRvd3MuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBPKTogT2JzZXJ2YWJsZX0gY2xvc2luZ1NlbGVjdG9yIEEgZnVuY3Rpb24gdGhhdCB0YWtlc1xuICogdGhlIHZhbHVlIGVtaXR0ZWQgYnkgdGhlIGBvcGVuaW5nc2Agb2JzZXJ2YWJsZSBhbmQgcmV0dXJucyBhbiBPYnNlcnZhYmxlLFxuICogd2hpY2gsIHdoZW4gaXQgZW1pdHMgKGVpdGhlciBgbmV4dGAgb3IgYGNvbXBsZXRlYCksIHNpZ25hbHMgdGhhdCB0aGVcbiAqIGFzc29jaWF0ZWQgd2luZG93IHNob3VsZCBjb21wbGV0ZS5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8T2JzZXJ2YWJsZTxUPj59IEFuIG9ic2VydmFibGUgb2Ygd2luZG93cywgd2hpY2ggaW4gdHVyblxuICogYXJlIE9ic2VydmFibGVzLlxuICogQG1ldGhvZCB3aW5kb3dUb2dnbGVcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aW5kb3dUb2dnbGU8VCwgTz4ob3BlbmluZ3M6IE9ic2VydmFibGU8Tz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NpbmdTZWxlY3RvcjogKG9wZW5WYWx1ZTogTykgPT4gT2JzZXJ2YWJsZTxhbnk+KTogT3BlcmF0b3JGdW5jdGlvbjxULCBPYnNlcnZhYmxlPFQ+PiB7XG4gIHJldHVybiAoc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBzb3VyY2UubGlmdChuZXcgV2luZG93VG9nZ2xlT3BlcmF0b3I8VCwgTz4ob3BlbmluZ3MsIGNsb3NpbmdTZWxlY3RvcikpO1xufVxuXG5jbGFzcyBXaW5kb3dUb2dnbGVPcGVyYXRvcjxULCBPPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIE9ic2VydmFibGU8VD4+IHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9wZW5pbmdzOiBPYnNlcnZhYmxlPE8+LFxuICAgICAgICAgICAgICBwcml2YXRlIGNsb3NpbmdTZWxlY3RvcjogKG9wZW5WYWx1ZTogTykgPT4gT2JzZXJ2YWJsZTxhbnk+KSB7XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8T2JzZXJ2YWJsZTxUPj4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgV2luZG93VG9nZ2xlU3Vic2NyaWJlcihcbiAgICAgIHN1YnNjcmliZXIsIHRoaXMub3BlbmluZ3MsIHRoaXMuY2xvc2luZ1NlbGVjdG9yXG4gICAgKSk7XG4gIH1cbn1cblxuaW50ZXJmYWNlIFdpbmRvd0NvbnRleHQ8VD4ge1xuICB3aW5kb3c6IFN1YmplY3Q8VD47XG4gIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgV2luZG93VG9nZ2xlU3Vic2NyaWJlcjxULCBPPiBleHRlbmRzIE91dGVyU3Vic2NyaWJlcjxULCBhbnk+IHtcbiAgcHJpdmF0ZSBjb250ZXh0czogV2luZG93Q29udGV4dDxUPltdID0gW107XG4gIHByaXZhdGUgb3BlblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPE9ic2VydmFibGU8VD4+LFxuICAgICAgICAgICAgICBwcml2YXRlIG9wZW5pbmdzOiBPYnNlcnZhYmxlPE8+LFxuICAgICAgICAgICAgICBwcml2YXRlIGNsb3NpbmdTZWxlY3RvcjogKG9wZW5WYWx1ZTogTykgPT4gT2JzZXJ2YWJsZTxhbnk+KSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICAgIHRoaXMuYWRkKHRoaXMub3BlblN1YnNjcmlwdGlvbiA9IHN1YnNjcmliZVRvUmVzdWx0KHRoaXMsIG9wZW5pbmdzLCBvcGVuaW5ncyBhcyBhbnkpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCkge1xuICAgIGNvbnN0IHsgY29udGV4dHMgfSA9IHRoaXM7XG4gICAgaWYgKGNvbnRleHRzKSB7XG4gICAgICBjb25zdCBsZW4gPSBjb250ZXh0cy5sZW5ndGg7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGNvbnRleHRzW2ldLndpbmRvdy5uZXh0KHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2Vycm9yKGVycjogYW55KSB7XG5cbiAgICBjb25zdCB7IGNvbnRleHRzIH0gPSB0aGlzO1xuICAgIHRoaXMuY29udGV4dHMgPSBudWxsO1xuXG4gICAgaWYgKGNvbnRleHRzKSB7XG4gICAgICBjb25zdCBsZW4gPSBjb250ZXh0cy5sZW5ndGg7XG4gICAgICBsZXQgaW5kZXggPSAtMTtcblxuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW4pIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IGNvbnRleHRzW2luZGV4XTtcbiAgICAgICAgY29udGV4dC53aW5kb3cuZXJyb3IoZXJyKTtcbiAgICAgICAgY29udGV4dC5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdXBlci5fZXJyb3IoZXJyKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY29tcGxldGUoKSB7XG4gICAgY29uc3QgeyBjb250ZXh0cyB9ID0gdGhpcztcbiAgICB0aGlzLmNvbnRleHRzID0gbnVsbDtcbiAgICBpZiAoY29udGV4dHMpIHtcbiAgICAgIGNvbnN0IGxlbiA9IGNvbnRleHRzLmxlbmd0aDtcbiAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW4pIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IGNvbnRleHRzW2luZGV4XTtcbiAgICAgICAgY29udGV4dC53aW5kb3cuY29tcGxldGUoKTtcbiAgICAgICAgY29udGV4dC5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc3VwZXIuX2NvbXBsZXRlKCk7XG4gIH1cblxuICAvKiogQGRlcHJlY2F0ZWQgVGhpcyBpcyBhbiBpbnRlcm5hbCBpbXBsZW1lbnRhdGlvbiBkZXRhaWwsIGRvIG5vdCB1c2UuICovXG4gIF91bnN1YnNjcmliZSgpIHtcbiAgICBjb25zdCB7IGNvbnRleHRzIH0gPSB0aGlzO1xuICAgIHRoaXMuY29udGV4dHMgPSBudWxsO1xuICAgIGlmIChjb250ZXh0cykge1xuICAgICAgY29uc3QgbGVuID0gY29udGV4dHMubGVuZ3RoO1xuICAgICAgbGV0IGluZGV4ID0gLTE7XG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbikge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gY29udGV4dHNbaW5kZXhdO1xuICAgICAgICBjb250ZXh0LndpbmRvdy51bnN1YnNjcmliZSgpO1xuICAgICAgICBjb250ZXh0LnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5vdGlmeU5leHQob3V0ZXJWYWx1ZTogYW55LCBpbm5lclZhbHVlOiBhbnksXG4gICAgICAgICAgICAgb3V0ZXJJbmRleDogbnVtYmVyLCBpbm5lckluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgaW5uZXJTdWI6IElubmVyU3Vic2NyaWJlcjxULCBhbnk+KTogdm9pZCB7XG5cbiAgICBpZiAob3V0ZXJWYWx1ZSA9PT0gdGhpcy5vcGVuaW5ncykge1xuXG4gICAgICBjb25zdCB7IGNsb3NpbmdTZWxlY3RvciB9ID0gdGhpcztcbiAgICAgIGNvbnN0IGNsb3NpbmdOb3RpZmllciA9IHRyeUNhdGNoKGNsb3NpbmdTZWxlY3RvcikoaW5uZXJWYWx1ZSk7XG5cbiAgICAgIGlmIChjbG9zaW5nTm90aWZpZXIgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVycm9yKGVycm9yT2JqZWN0LmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgd2luZG93ID0gbmV3IFN1YmplY3Q8VD4oKTtcbiAgICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgICAgICBjb25zdCBjb250ZXh0ID0geyB3aW5kb3csIHN1YnNjcmlwdGlvbiB9O1xuICAgICAgICB0aGlzLmNvbnRleHRzLnB1c2goY29udGV4dCk7XG4gICAgICAgIGNvbnN0IGlubmVyU3Vic2NyaXB0aW9uID0gc3Vic2NyaWJlVG9SZXN1bHQodGhpcywgY2xvc2luZ05vdGlmaWVyLCBjb250ZXh0IGFzIGFueSk7XG5cbiAgICAgICAgaWYgKGlubmVyU3Vic2NyaXB0aW9uLmNsb3NlZCkge1xuICAgICAgICAgIHRoaXMuY2xvc2VXaW5kb3codGhpcy5jb250ZXh0cy5sZW5ndGggLSAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAoPGFueT4gaW5uZXJTdWJzY3JpcHRpb24pLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICAgIHN1YnNjcmlwdGlvbi5hZGQoaW5uZXJTdWJzY3JpcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHdpbmRvdyk7XG5cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jbG9zZVdpbmRvdyh0aGlzLmNvbnRleHRzLmluZGV4T2Yob3V0ZXJWYWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIG5vdGlmeUVycm9yKGVycjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5lcnJvcihlcnIpO1xuICB9XG5cbiAgbm90aWZ5Q29tcGxldGUoaW5uZXI6IFN1YnNjcmlwdGlvbik6IHZvaWQge1xuICAgIGlmIChpbm5lciAhPT0gdGhpcy5vcGVuU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmNsb3NlV2luZG93KHRoaXMuY29udGV4dHMuaW5kZXhPZigoPGFueT4gaW5uZXIpLmNvbnRleHQpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsb3NlV2luZG93KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgeyBjb250ZXh0cyB9ID0gdGhpcztcbiAgICBjb25zdCBjb250ZXh0ID0gY29udGV4dHNbaW5kZXhdO1xuICAgIGNvbnN0IHsgd2luZG93LCBzdWJzY3JpcHRpb24gfSA9IGNvbnRleHQ7XG4gICAgY29udGV4dHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB3aW5kb3cuY29tcGxldGUoKTtcbiAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19