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
import { Subscription } from '../Subscription';
import { subscribeToResult } from '../util/subscribeToResult';
import { OuterSubscriber } from '../OuterSubscriber';
export function bufferToggle(openings, closingSelector) {
    return function bufferToggleOperatorFunction(source) {
        return source.lift(new BufferToggleOperator(openings, closingSelector));
    };
}
var BufferToggleOperator = (function () {
    function BufferToggleOperator(openings, closingSelector) {
        this.openings = openings;
        this.closingSelector = closingSelector;
    }
    BufferToggleOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new BufferToggleSubscriber(subscriber, this.openings, this.closingSelector));
    };
    return BufferToggleOperator;
}());
var BufferToggleSubscriber = (function (_super) {
    __extends(BufferToggleSubscriber, _super);
    function BufferToggleSubscriber(destination, openings, closingSelector) {
        var _this = _super.call(this, destination) || this;
        _this.openings = openings;
        _this.closingSelector = closingSelector;
        _this.contexts = [];
        _this.add(subscribeToResult(_this, openings));
        return _this;
    }
    BufferToggleSubscriber.prototype._next = function (value) {
        var contexts = this.contexts;
        var len = contexts.length;
        for (var i = 0; i < len; i++) {
            contexts[i].buffer.push(value);
        }
    };
    BufferToggleSubscriber.prototype._error = function (err) {
        var contexts = this.contexts;
        while (contexts.length > 0) {
            var context = contexts.shift();
            context.subscription.unsubscribe();
            context.buffer = null;
            context.subscription = null;
        }
        this.contexts = null;
        _super.prototype._error.call(this, err);
    };
    BufferToggleSubscriber.prototype._complete = function () {
        var contexts = this.contexts;
        while (contexts.length > 0) {
            var context = contexts.shift();
            this.destination.next(context.buffer);
            context.subscription.unsubscribe();
            context.buffer = null;
            context.subscription = null;
        }
        this.contexts = null;
        _super.prototype._complete.call(this);
    };
    BufferToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        outerValue ? this.closeBuffer(outerValue) : this.openBuffer(innerValue);
    };
    BufferToggleSubscriber.prototype.notifyComplete = function (innerSub) {
        this.closeBuffer(innerSub.context);
    };
    BufferToggleSubscriber.prototype.openBuffer = function (value) {
        try {
            var closingSelector = this.closingSelector;
            var closingNotifier = closingSelector.call(this, value);
            if (closingNotifier) {
                this.trySubscribe(closingNotifier);
            }
        }
        catch (err) {
            this._error(err);
        }
    };
    BufferToggleSubscriber.prototype.closeBuffer = function (context) {
        var contexts = this.contexts;
        if (contexts && context) {
            var buffer = context.buffer, subscription = context.subscription;
            this.destination.next(buffer);
            contexts.splice(contexts.indexOf(context), 1);
            this.remove(subscription);
            subscription.unsubscribe();
        }
    };
    BufferToggleSubscriber.prototype.trySubscribe = function (closingNotifier) {
        var contexts = this.contexts;
        var buffer = [];
        var subscription = new Subscription();
        var context = { buffer: buffer, subscription: subscription };
        contexts.push(context);
        var innerSubscription = subscribeToResult(this, closingNotifier, context);
        if (!innerSubscription || innerSubscription.closed) {
            this.closeBuffer(context);
        }
        else {
            innerSubscription.context = context;
            this.add(innerSubscription);
            subscription.add(innerSubscription);
        }
    };
    return BufferToggleSubscriber;
}(OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVmZmVyVG9nZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZXh0ZXJuYWwvcnhqcy9pbnRlcm5hbC9vcGVyYXRvcnMvYnVmZmVyVG9nZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFHQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBK0NyRCxNQUFNLFVBQVUsWUFBWSxDQUMxQixRQUFrQyxFQUNsQyxlQUF5RDtJQUV6RCxPQUFPLFNBQVMsNEJBQTRCLENBQUMsTUFBcUI7UUFDaEUsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksb0JBQW9CLENBQU8sUUFBUSxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVEO0lBRUUsOEJBQW9CLFFBQWtDLEVBQ2xDLGVBQXlEO1FBRHpELGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQ2xDLG9CQUFlLEdBQWYsZUFBZSxDQUEwQztJQUM3RSxDQUFDO0lBRUQsbUNBQUksR0FBSixVQUFLLFVBQTJCLEVBQUUsTUFBVztRQUMzQyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxzQkFBc0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUN2RyxDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBVEQsSUFTQztBQVlEO0lBQTJDLDBDQUFxQjtJQUc5RCxnQ0FBWSxXQUE0QixFQUNwQixRQUFrQyxFQUNsQyxlQUFnRTtRQUZwRixZQUdFLGtCQUFNLFdBQVcsQ0FBQyxTQUVuQjtRQUptQixjQUFRLEdBQVIsUUFBUSxD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b3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgc3Vic2NyaWJlVG9SZXN1bHQgfSBmcm9tICcuLi91dGlsL3N1YnNjcmliZVRvUmVzdWx0JztcbmltcG9ydCB7IE91dGVyU3Vic2NyaWJlciB9IGZyb20gJy4uL091dGVyU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBJbm5lclN1YnNjcmliZXIgfSBmcm9tICcuLi9Jbm5lclN1YnNjcmliZXInO1xuaW1wb3J0IHsgT3BlcmF0b3JGdW5jdGlvbiwgU3Vic2NyaWJhYmxlT3JQcm9taXNlIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vKipcbiAqIEJ1ZmZlcnMgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHZhbHVlcyBzdGFydGluZyBmcm9tIGFuIGVtaXNzaW9uIGZyb21cbiAqIGBvcGVuaW5nc2AgYW5kIGVuZGluZyB3aGVuIHRoZSBvdXRwdXQgb2YgYGNsb3NpbmdTZWxlY3RvcmAgZW1pdHMuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkNvbGxlY3RzIHZhbHVlcyBmcm9tIHRoZSBwYXN0IGFzIGFuIGFycmF5LiBTdGFydHNcbiAqIGNvbGxlY3Rpbmcgb25seSB3aGVuIGBvcGVuaW5nYCBlbWl0cywgYW5kIGNhbGxzIHRoZSBgY2xvc2luZ1NlbGVjdG9yYFxuICogZnVuY3Rpb24gdG8gZ2V0IGFuIE9ic2VydmFibGUgdGhhdCB0ZWxscyB3aGVuIHRvIGNsb3NlIHRoZSBidWZmZXIuPC9zcGFuPlxuICpcbiAqICFbXShidWZmZXJUb2dnbGUucG5nKVxuICpcbiAqIEJ1ZmZlcnMgdmFsdWVzIGZyb20gdGhlIHNvdXJjZSBieSBvcGVuaW5nIHRoZSBidWZmZXIgdmlhIHNpZ25hbHMgZnJvbSBhblxuICogT2JzZXJ2YWJsZSBwcm92aWRlZCB0byBgb3BlbmluZ3NgLCBhbmQgY2xvc2luZyBhbmQgc2VuZGluZyB0aGUgYnVmZmVycyB3aGVuXG4gKiBhIFN1YnNjcmliYWJsZSBvciBQcm9taXNlIHJldHVybmVkIGJ5IHRoZSBgY2xvc2luZ1NlbGVjdG9yYCBmdW5jdGlvbiBlbWl0cy5cbiAqXG4gKiAjIyBFeGFtcGxlXG4gKlxuICogRXZlcnkgb3RoZXIgc2Vjb25kLCBlbWl0IHRoZSBjbGljayBldmVudHMgZnJvbSB0aGUgbmV4dCA1MDBtc1xuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGNvbnN0IGNsaWNrcyA9IGZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiBjb25zdCBvcGVuaW5ncyA9IGludGVydmFsKDEwMDApO1xuICogY29uc3QgYnVmZmVyZWQgPSBjbGlja3MucGlwZShidWZmZXJUb2dnbGUob3BlbmluZ3MsIGkgPT5cbiAqICAgaSAlIDIgPyBpbnRlcnZhbCg1MDApIDogZW1wdHkoKVxuICogKSk7XG4gKiBidWZmZXJlZC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKiBgYGBcbiAqXG4gKiBAc2VlIHtAbGluayBidWZmZXJ9XG4gKiBAc2VlIHtAbGluayBidWZmZXJDb3VudH1cbiAqIEBzZWUge0BsaW5rIGJ1ZmZlclRpbWV9XG4gKiBAc2VlIHtAbGluayBidWZmZXJXaGVufVxuICogQHNlZSB7QGxpbmsgd2luZG93VG9nZ2xlfVxuICpcbiAqIEBwYXJhbSB7U3Vic2NyaWJhYmxlT3JQcm9taXNlPE8+fSBvcGVuaW5ncyBBIFN1YnNjcmliYWJsZSBvciBQcm9taXNlIG9mIG5vdGlmaWNhdGlvbnMgdG8gc3RhcnQgbmV3XG4gKiBidWZmZXJzLlxuICogQHBhcmFtIHtmdW5jdGlvbih2YWx1ZTogTyk6IFN1YnNjcmliYWJsZU9yUHJvbWlzZX0gY2xvc2luZ1NlbGVjdG9yIEEgZnVuY3Rpb24gdGhhdCB0YWtlc1xuICogdGhlIHZhbHVlIGVtaXR0ZWQgYnkgdGhlIGBvcGVuaW5nc2Agb2JzZXJ2YWJsZSBhbmQgcmV0dXJucyBhIFN1YnNjcmliYWJsZSBvciBQcm9taXNlLFxuICogd2hpY2gsIHdoZW4gaXQgZW1pdHMsIHNpZ25hbHMgdGhhdCB0aGUgYXNzb2NpYXRlZCBidWZmZXIgc2hvdWxkIGJlIGVtaXR0ZWRcbiAqIGFuZCBjbGVhcmVkLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxUW10+fSBBbiBvYnNlcnZhYmxlIG9mIGFycmF5cyBvZiBidWZmZXJlZCB2YWx1ZXMuXG4gKiBAbWV0aG9kIGJ1ZmZlclRvZ2dsZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1ZmZlclRvZ2dsZTxULCBPPihcbiAgb3BlbmluZ3M6IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxPPixcbiAgY2xvc2luZ1NlbGVjdG9yOiAodmFsdWU6IE8pID0+IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxhbnk+XG4pOiBPcGVyYXRvckZ1bmN0aW9uPFQsIFRbXT4ge1xuICByZXR1cm4gZnVuY3Rpb24gYnVmZmVyVG9nZ2xlT3BlcmF0b3JGdW5jdGlvbihzb3VyY2U6IE9ic2VydmFibGU8VD4pIHtcbiAgICByZXR1cm4gc291cmNlLmxpZnQobmV3IEJ1ZmZlclRvZ2dsZU9wZXJhdG9yPFQsIE8+KG9wZW5pbmdzLCBjbG9zaW5nU2VsZWN0b3IpKTtcbiAgfTtcbn1cblxuY2xhc3MgQnVmZmVyVG9nZ2xlT3BlcmF0b3I8VCwgTz4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUW10+IHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9wZW5pbmdzOiBTdWJzY3JpYmFibGVPclByb21pc2U8Tz4sXG4gICAgICAgICAgICAgIHByaXZhdGUgY2xvc2luZ1NlbGVjdG9yOiAodmFsdWU6IE8pID0+IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxhbnk+KSB7XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VFtdPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBCdWZmZXJUb2dnbGVTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMub3BlbmluZ3MsIHRoaXMuY2xvc2luZ1NlbGVjdG9yKSk7XG4gIH1cbn1cblxuaW50ZXJmYWNlIEJ1ZmZlckNvbnRleHQ8VD4ge1xuICBidWZmZXI6IFRbXTtcbiAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBCdWZmZXJUb2dnbGVTdWJzY3JpYmVyPFQsIE8+IGV4dGVuZHMgT3V0ZXJTdWJzY3JpYmVyPFQsIE8+IHtcbiAgcHJpdmF0ZSBjb250ZXh0czogQXJyYXk8QnVmZmVyQ29udGV4dDxUPj4gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUW10+LFxuICAgICAgICAgICAgICBwcml2YXRlIG9wZW5pbmdzOiBTdWJzY3JpYmFibGVPclByb21pc2U8Tz4sXG4gICAgICAgICAgICAgIHByaXZhdGUgY2xvc2luZ1NlbGVjdG9yOiAodmFsdWU6IE8pID0+IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxhbnk+IHwgdm9pZCkge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICB0aGlzLmFkZChzdWJzY3JpYmVUb1Jlc3VsdCh0aGlzLCBvcGVuaW5ncykpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgY29uc3QgY29udGV4dHMgPSB0aGlzLmNvbnRleHRzO1xuICAgIGNvbnN0IGxlbiA9IGNvbnRleHRzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb250ZXh0c1tpXS5idWZmZXIucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9lcnJvcihlcnI6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRleHRzID0gdGhpcy5jb250ZXh0cztcbiAgICB3aGlsZSAoY29udGV4dHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgY29udGV4dCA9IGNvbnRleHRzLnNoaWZ0KCk7XG4gICAgICBjb250ZXh0LnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgY29udGV4dC5idWZmZXIgPSBudWxsO1xuICAgICAgY29udGV4dC5zdWJzY3JpcHRpb24gPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLmNvbnRleHRzID0gbnVsbDtcbiAgICBzdXBlci5fZXJyb3IoZXJyKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY29tcGxldGUoKTogdm9pZCB7XG4gICAgY29uc3QgY29udGV4dHMgPSB0aGlzLmNvbnRleHRzO1xuICAgIHdoaWxlIChjb250ZXh0cy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBjb250ZXh0ID0gY29udGV4dHMuc2hpZnQoKTtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dChjb250ZXh0LmJ1ZmZlcik7XG4gICAgICBjb250ZXh0LnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgY29udGV4dC5idWZmZXIgPSBudWxsO1xuICAgICAgY29udGV4dC5zdWJzY3JpcHRpb24gPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLmNvbnRleHRzID0gbnVsbDtcbiAgICBzdXBlci5fY29tcGxldGUoKTtcbiAgfVxuXG4gIG5vdGlmeU5leHQob3V0ZXJWYWx1ZTogYW55LCBpbm5lclZhbHVlOiBPLFxuICAgICAgICAgICAgIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgIGlubmVyU3ViOiBJbm5lclN1YnNjcmliZXI8VCwgTz4pOiB2b2lkIHtcbiAgICBvdXRlclZhbHVlID8gdGhpcy5jbG9zZUJ1ZmZlcihvdXRlclZhbHVlKSA6IHRoaXMub3BlbkJ1ZmZlcihpbm5lclZhbHVlKTtcbiAgfVxuXG4gIG5vdGlmeUNvbXBsZXRlKGlubmVyU3ViOiBJbm5lclN1YnNjcmliZXI8VCwgTz4pOiB2b2lkIHtcbiAgICB0aGlzLmNsb3NlQnVmZmVyKCg8YW55PiBpbm5lclN1YikuY29udGV4dCk7XG4gIH1cblxuICBwcml2YXRlIG9wZW5CdWZmZXIodmFsdWU6IE8pOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY2xvc2luZ1NlbGVjdG9yID0gdGhpcy5jbG9zaW5nU2VsZWN0b3I7XG4gICAgICBjb25zdCBjbG9zaW5nTm90aWZpZXIgPSBjbG9zaW5nU2VsZWN0b3IuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICBpZiAoY2xvc2luZ05vdGlmaWVyKSB7XG4gICAgICAgIHRoaXMudHJ5U3Vic2NyaWJlKGNsb3NpbmdOb3RpZmllcik7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aGlzLl9lcnJvcihlcnIpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2xvc2VCdWZmZXIoY29udGV4dDogQnVmZmVyQ29udGV4dDxUPik6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRleHRzID0gdGhpcy5jb250ZXh0cztcblxuICAgIGlmIChjb250ZXh0cyAmJiBjb250ZXh0KSB7XG4gICAgICBjb25zdCB7IGJ1ZmZlciwgc3Vic2NyaXB0aW9uIH0gPSBjb250ZXh0O1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KGJ1ZmZlcik7XG4gICAgICBjb250ZXh0cy5zcGxpY2UoY29udGV4dHMuaW5kZXhPZihjb250ZXh0KSwgMSk7XG4gICAgICB0aGlzLnJlbW92ZShzdWJzY3JpcHRpb24pO1xuICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0cnlTdWJzY3JpYmUoY2xvc2luZ05vdGlmaWVyOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBjb250ZXh0cyA9IHRoaXMuY29udGV4dHM7XG5cbiAgICBjb25zdCBidWZmZXI6IEFycmF5PFQ+ID0gW107XG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgIGNvbnN0IGNvbnRleHQgPSB7IGJ1ZmZlciwgc3Vic2NyaXB0aW9uIH07XG4gICAgY29udGV4dHMucHVzaChjb250ZXh0KTtcblxuICAgIGNvbnN0IGlubmVyU3Vic2NyaXB0aW9uID0gc3Vic2NyaWJlVG9SZXN1bHQodGhpcywgY2xvc2luZ05vdGlmaWVyLCA8YW55PmNvbnRleHQpO1xuXG4gICAgaWYgKCFpbm5lclN1YnNjcmlwdGlvbiB8fCBpbm5lclN1YnNjcmlwdGlvbi5jbG9zZWQpIHtcbiAgICAgIHRoaXMuY2xvc2VCdWZmZXIoY29udGV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICg8YW55PiBpbm5lclN1YnNjcmlwdGlvbikuY29udGV4dCA9IGNvbnRleHQ7XG5cbiAgICAgIHRoaXMuYWRkKGlubmVyU3Vic2NyaXB0aW9uKTtcbiAgICAgIHN1YnNjcmlwdGlvbi5hZGQoaW5uZXJTdWJzY3JpcHRpb24pO1xuICAgIH1cbiAgfVxufVxuIl19