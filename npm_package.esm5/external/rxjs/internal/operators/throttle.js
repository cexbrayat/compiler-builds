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
import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
export var defaultThrottleConfig = {
    leading: true,
    trailing: false
};
export function throttle(durationSelector, config) {
    if (config === void 0) { config = defaultThrottleConfig; }
    return function (source) { return source.lift(new ThrottleOperator(durationSelector, config.leading, config.trailing)); };
}
var ThrottleOperator = (function () {
    function ThrottleOperator(durationSelector, leading, trailing) {
        this.durationSelector = durationSelector;
        this.leading = leading;
        this.trailing = trailing;
    }
    ThrottleOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ThrottleSubscriber(subscriber, this.durationSelector, this.leading, this.trailing));
    };
    return ThrottleOperator;
}());
var ThrottleSubscriber = (function (_super) {
    __extends(ThrottleSubscriber, _super);
    function ThrottleSubscriber(destination, durationSelector, _leading, _trailing) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        _this.durationSelector = durationSelector;
        _this._leading = _leading;
        _this._trailing = _trailing;
        _this._hasValue = false;
        return _this;
    }
    ThrottleSubscriber.prototype._next = function (value) {
        this._hasValue = true;
        this._sendValue = value;
        if (!this._throttled) {
            if (this._leading) {
                this.send();
            }
            else {
                this.throttle(value);
            }
        }
    };
    ThrottleSubscriber.prototype.send = function () {
        var _a = this, _hasValue = _a._hasValue, _sendValue = _a._sendValue;
        if (_hasValue) {
            this.destination.next(_sendValue);
            this.throttle(_sendValue);
        }
        this._hasValue = false;
        this._sendValue = null;
    };
    ThrottleSubscriber.prototype.throttle = function (value) {
        var duration = this.tryDurationSelector(value);
        if (duration) {
            this.add(this._throttled = subscribeToResult(this, duration));
        }
    };
    ThrottleSubscriber.prototype.tryDurationSelector = function (value) {
        try {
            return this.durationSelector(value);
        }
        catch (err) {
            this.destination.error(err);
            return null;
        }
    };
    ThrottleSubscriber.prototype.throttlingDone = function () {
        var _a = this, _throttled = _a._throttled, _trailing = _a._trailing;
        if (_throttled) {
            _throttled.unsubscribe();
        }
        this._throttled = null;
        if (_trailing) {
            this.send();
        }
    };
    ThrottleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.throttlingDone();
    };
    ThrottleSubscriber.prototype.notifyComplete = function () {
        this.throttlingDone();
    };
    return ThrottleSubscriber;
}(OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyb3R0bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9leHRlcm5hbC9yeGpzL2ludGVybmFsL29wZXJhdG9ycy90aHJvdHRsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXJELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBUzlELE1BQU0sQ0FBQyxJQUFNLHFCQUFxQixHQUFtQjtJQUNuRCxPQUFPLEVBQUUsSUFBSTtJQUNiLFFBQVEsRUFBRSxLQUFLO0NBQ2hCLENBQUM7QUE2Q0YsTUFBTSxVQUFVLFFBQVEsQ0FBSSxnQkFBMEQsRUFDMUQsTUFBOEM7SUFBOUMsdUJBQUEsRUFBQSw4QkFBOEM7SUFDeEUsT0FBTyxVQUFDLE1BQXFCLElBQUssT0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBcEYsQ0FBb0YsQ0FBQztBQUN6SCxDQUFDO0FBRUQ7SUFDRSwwQkFBb0IsZ0JBQTBELEVBQzFELE9BQWdCLEVBQ2hCLFFBQWlCO1FBRmpCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBMEM7UUFDMUQsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixhQUFRLEdBQVIsUUFBUSxDQUFTO0lBQ3JDLENBQUM7SUFFRCwrQkFBSSxHQUFKLFVBQUssVUFBeUIsRUFBRSxNQUFXO1FBQ3pDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FDckIsSUFBSSxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUN2RixDQUFDO0lBQ0osQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQVhELElBV0M7QUFPRDtJQUF1QyxzQ0FBcUI7SUFLMUQsNEJBQXNCLFdBQTBCLEVBQzVCLGdCQUE2RCxFQUM3RCxRQUFpQixFQUNqQixTQUFrQjtRQUh0QyxZQUlFLGtCQUFNLFdBQVcsQ0FBQyxTQUNuQjtRQUxxQixpQkFBVyxHQUFYLFdBQVcsQ0FBZTtRQUM1QixzQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQTZDO1FBQzdELGNBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsZUFBUyxHQUFULFNBQVMsQ0FBUztRQUw5QixlQUFTLEdBQUcsS0FBSyxDQUFDOztJQU8xQixDQUFDO0lBRVMsa0NBQUssR0FBZixVQUFnQixLQUFRO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRXhCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDakIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2I7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0QjtTQUNGO0lBQ0gsQ0FBQztJQUVPLGlDQUFJLEdBQVo7UUFDUSxJQUFBLFNBQWdDLEVBQTlCLHdCQUFTLEVBQUUsMEJBQW1CLENBQUM7UUFDdkMsSUFBSSxTQUFTLEVBQUU7WUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUVPLHFDQUFRLEdBQWhCLFVBQWlCLEtBQVE7UUFDdkIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pELElBQUksUUFBUSxFQUFFO1lBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLGlCQUFpQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQy9EO0lBQ0gsQ0FBQztJQUVPLGdEQUFtQixHQUEzQixVQUE0QixLQUFRO1FBQ2xDLElBQUk7WUFDRixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNyQztRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUIsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7SUFFTywyQ0FBYyxHQUF0QjtRQUNRLElBQUEsU0FBZ0MsRUFBOUIsMEJBQVUsRUFBRSx3QkFBa0IsQ0FBQztRQUN2QyxJQUFJLFVBQVUsRUFBRTtZQUNkLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUMxQjtRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBRXZCLElBQUksU0FBUyxFQUFFO1lBQ2IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBRUQsdUNBQVUsR0FBVixVQUFXLFVBQWEsRUFBRSxVQUFhLEVBQzVCLFVBQWtCLEVBQUUsVUFBa0IsRUFDdEMsUUFBK0I7UUFDeEMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCwyQ0FBYyxHQUFkO1FBQ0UsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUF4RUQsQ0FBdUMsZUFBZSxHQXdFckQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5cbmltcG9ydCB7IE91dGVyU3Vic2NyaWJlciB9IGZyb20gJy4uL091dGVyU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBJbm5lclN1YnNjcmliZXIgfSBmcm9tICcuLi9Jbm5lclN1YnNjcmliZXInO1xuaW1wb3J0IHsgc3Vic2NyaWJlVG9SZXN1bHQgfSBmcm9tICcuLi91dGlsL3N1YnNjcmliZVRvUmVzdWx0JztcblxuaW1wb3J0IHsgTW9ub1R5cGVPcGVyYXRvckZ1bmN0aW9uLCBTdWJzY3JpYmFibGVPclByb21pc2UsIFRlYXJkb3duTG9naWMgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGhyb3R0bGVDb25maWcge1xuICBsZWFkaW5nPzogYm9vbGVhbjtcbiAgdHJhaWxpbmc/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdFRocm90dGxlQ29uZmlnOiBUaHJvdHRsZUNvbmZpZyA9IHtcbiAgbGVhZGluZzogdHJ1ZSxcbiAgdHJhaWxpbmc6IGZhbHNlXG59O1xuXG4vKipcbiAqIEVtaXRzIGEgdmFsdWUgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUsIHRoZW4gaWdub3JlcyBzdWJzZXF1ZW50IHNvdXJjZVxuICogdmFsdWVzIGZvciBhIGR1cmF0aW9uIGRldGVybWluZWQgYnkgYW5vdGhlciBPYnNlcnZhYmxlLCB0aGVuIHJlcGVhdHMgdGhpc1xuICogcHJvY2Vzcy5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SXQncyBsaWtlIHtAbGluayB0aHJvdHRsZVRpbWV9LCBidXQgdGhlIHNpbGVuY2luZ1xuICogZHVyYXRpb24gaXMgZGV0ZXJtaW5lZCBieSBhIHNlY29uZCBPYnNlcnZhYmxlLjwvc3Bhbj5cbiAqXG4gKiAhW10odGhyb3R0bGUucG5nKVxuICpcbiAqIGB0aHJvdHRsZWAgZW1pdHMgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHZhbHVlcyBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGVcbiAqIHdoZW4gaXRzIGludGVybmFsIHRpbWVyIGlzIGRpc2FibGVkLCBhbmQgaWdub3JlcyBzb3VyY2UgdmFsdWVzIHdoZW4gdGhlIHRpbWVyXG4gKiBpcyBlbmFibGVkLiBJbml0aWFsbHksIHRoZSB0aW1lciBpcyBkaXNhYmxlZC4gQXMgc29vbiBhcyB0aGUgZmlyc3Qgc291cmNlXG4gKiB2YWx1ZSBhcnJpdmVzLCBpdCBpcyBmb3J3YXJkZWQgdG8gdGhlIG91dHB1dCBPYnNlcnZhYmxlLCBhbmQgdGhlbiB0aGUgdGltZXJcbiAqIGlzIGVuYWJsZWQgYnkgY2FsbGluZyB0aGUgYGR1cmF0aW9uU2VsZWN0b3JgIGZ1bmN0aW9uIHdpdGggdGhlIHNvdXJjZSB2YWx1ZSxcbiAqIHdoaWNoIHJldHVybnMgdGhlIFwiZHVyYXRpb25cIiBPYnNlcnZhYmxlLiBXaGVuIHRoZSBkdXJhdGlvbiBPYnNlcnZhYmxlIGVtaXRzIGFcbiAqIHZhbHVlIG9yIGNvbXBsZXRlcywgdGhlIHRpbWVyIGlzIGRpc2FibGVkLCBhbmQgdGhpcyBwcm9jZXNzIHJlcGVhdHMgZm9yIHRoZVxuICogbmV4dCBzb3VyY2UgdmFsdWUuXG4gKlxuICogIyMgRXhhbXBsZVxuICogRW1pdCBjbGlja3MgYXQgYSByYXRlIG9mIGF0IG1vc3Qgb25lIGNsaWNrIHBlciBzZWNvbmRcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGNvbnN0IGNsaWNrcyA9IGZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiBjb25zdCByZXN1bHQgPSBjbGlja3MucGlwZSh0aHJvdHRsZShldiA9PiBpbnRlcnZhbCgxMDAwKSkpO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqIGBgYFxuICpcbiAqIEBzZWUge0BsaW5rIGF1ZGl0fVxuICogQHNlZSB7QGxpbmsgZGVib3VuY2V9XG4gKiBAc2VlIHtAbGluayBkZWxheVdoZW59XG4gKiBAc2VlIHtAbGluayBzYW1wbGV9XG4gKiBAc2VlIHtAbGluayB0aHJvdHRsZVRpbWV9XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbih2YWx1ZTogVCk6IFN1YnNjcmliYWJsZU9yUHJvbWlzZX0gZHVyYXRpb25TZWxlY3RvciBBIGZ1bmN0aW9uXG4gKiB0aGF0IHJlY2VpdmVzIGEgdmFsdWUgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUsIGZvciBjb21wdXRpbmcgdGhlIHNpbGVuY2luZ1xuICogZHVyYXRpb24gZm9yIGVhY2ggc291cmNlIHZhbHVlLCByZXR1cm5lZCBhcyBhbiBPYnNlcnZhYmxlIG9yIGEgUHJvbWlzZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgYSBjb25maWd1cmF0aW9uIG9iamVjdCB0byBkZWZpbmUgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIGJlaGF2aW9yLiBEZWZhdWx0c1xuICogdG8gYHsgbGVhZGluZzogdHJ1ZSwgdHJhaWxpbmc6IGZhbHNlIH1gLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn0gQW4gT2JzZXJ2YWJsZSB0aGF0IHBlcmZvcm1zIHRoZSB0aHJvdHRsZSBvcGVyYXRpb24gdG9cbiAqIGxpbWl0IHRoZSByYXRlIG9mIGVtaXNzaW9ucyBmcm9tIHRoZSBzb3VyY2UuXG4gKiBAbWV0aG9kIHRocm90dGxlXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGhyb3R0bGU8VD4oZHVyYXRpb25TZWxlY3RvcjogKHZhbHVlOiBUKSA9PiBTdWJzY3JpYmFibGVPclByb21pc2U8YW55PixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWc6IFRocm90dGxlQ29uZmlnID0gZGVmYXVsdFRocm90dGxlQ29uZmlnKTogTW9ub1R5cGVPcGVyYXRvckZ1bmN0aW9uPFQ+IHtcbiAgcmV0dXJuIChzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IHNvdXJjZS5saWZ0KG5ldyBUaHJvdHRsZU9wZXJhdG9yKGR1cmF0aW9uU2VsZWN0b3IsIGNvbmZpZy5sZWFkaW5nLCBjb25maWcudHJhaWxpbmcpKTtcbn1cblxuY2xhc3MgVGhyb3R0bGVPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkdXJhdGlvblNlbGVjdG9yOiAodmFsdWU6IFQpID0+IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxhbnk+LFxuICAgICAgICAgICAgICBwcml2YXRlIGxlYWRpbmc6IGJvb2xlYW4sXG4gICAgICAgICAgICAgIHByaXZhdGUgdHJhaWxpbmc6IGJvb2xlYW4pIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPiwgc291cmNlOiBhbnkpOiBUZWFyZG93bkxvZ2ljIHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShcbiAgICAgIG5ldyBUaHJvdHRsZVN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5kdXJhdGlvblNlbGVjdG9yLCB0aGlzLmxlYWRpbmcsIHRoaXMudHJhaWxpbmcpXG4gICAgKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2NcbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBUaHJvdHRsZVN1YnNjcmliZXI8VCwgUj4gZXh0ZW5kcyBPdXRlclN1YnNjcmliZXI8VCwgUj4ge1xuICBwcml2YXRlIF90aHJvdHRsZWQ6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBfc2VuZFZhbHVlOiBUO1xuICBwcml2YXRlIF9oYXNWYWx1ZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBkdXJhdGlvblNlbGVjdG9yOiAodmFsdWU6IFQpID0+IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxudW1iZXI+LFxuICAgICAgICAgICAgICBwcml2YXRlIF9sZWFkaW5nOiBib29sZWFuLFxuICAgICAgICAgICAgICBwcml2YXRlIF90cmFpbGluZzogYm9vbGVhbikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIHRoaXMuX2hhc1ZhbHVlID0gdHJ1ZTtcbiAgICB0aGlzLl9zZW5kVmFsdWUgPSB2YWx1ZTtcblxuICAgIGlmICghdGhpcy5fdGhyb3R0bGVkKSB7XG4gICAgICBpZiAodGhpcy5fbGVhZGluZykge1xuICAgICAgICB0aGlzLnNlbmQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudGhyb3R0bGUodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2VuZCgpIHtcbiAgICBjb25zdCB7IF9oYXNWYWx1ZSwgX3NlbmRWYWx1ZSB9ID0gdGhpcztcbiAgICBpZiAoX2hhc1ZhbHVlKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQoX3NlbmRWYWx1ZSk7XG4gICAgICB0aGlzLnRocm90dGxlKF9zZW5kVmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLl9oYXNWYWx1ZSA9IGZhbHNlO1xuICAgIHRoaXMuX3NlbmRWYWx1ZSA9IG51bGw7XG4gIH1cblxuICBwcml2YXRlIHRocm90dGxlKHZhbHVlOiBUKTogdm9pZCB7XG4gICAgY29uc3QgZHVyYXRpb24gPSB0aGlzLnRyeUR1cmF0aW9uU2VsZWN0b3IodmFsdWUpO1xuICAgIGlmIChkdXJhdGlvbikge1xuICAgICAgdGhpcy5hZGQodGhpcy5fdGhyb3R0bGVkID0gc3Vic2NyaWJlVG9SZXN1bHQodGhpcywgZHVyYXRpb24pKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRyeUR1cmF0aW9uU2VsZWN0b3IodmFsdWU6IFQpOiBTdWJzY3JpYmFibGVPclByb21pc2U8YW55PiB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB0aGlzLmR1cmF0aW9uU2VsZWN0b3IodmFsdWUpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0aHJvdHRsaW5nRG9uZSgpIHtcbiAgICBjb25zdCB7IF90aHJvdHRsZWQsIF90cmFpbGluZyB9ID0gdGhpcztcbiAgICBpZiAoX3Rocm90dGxlZCkge1xuICAgICAgX3Rocm90dGxlZC51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICB0aGlzLl90aHJvdHRsZWQgPSBudWxsO1xuXG4gICAgaWYgKF90cmFpbGluZykge1xuICAgICAgdGhpcy5zZW5kKCk7XG4gICAgfVxuICB9XG5cbiAgbm90aWZ5TmV4dChvdXRlclZhbHVlOiBULCBpbm5lclZhbHVlOiBSLFxuICAgICAgICAgICAgIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgIGlubmVyU3ViOiBJbm5lclN1YnNjcmliZXI8VCwgUj4pOiB2b2lkIHtcbiAgICB0aGlzLnRocm90dGxpbmdEb25lKCk7XG4gIH1cblxuICBub3RpZnlDb21wbGV0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnRocm90dGxpbmdEb25lKCk7XG4gIH1cbn1cbiJdfQ==