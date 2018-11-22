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
import { Observable } from '../Observable';
import { asap } from '../scheduler/asap';
import { isNumeric } from '../util/isNumeric';
var SubscribeOnObservable = (function (_super) {
    __extends(SubscribeOnObservable, _super);
    function SubscribeOnObservable(source, delayTime, scheduler) {
        if (delayTime === void 0) { delayTime = 0; }
        if (scheduler === void 0) { scheduler = asap; }
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.delayTime = delayTime;
        _this.scheduler = scheduler;
        if (!isNumeric(delayTime) || delayTime < 0) {
            _this.delayTime = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            _this.scheduler = asap;
        }
        return _this;
    }
    SubscribeOnObservable.create = function (source, delay, scheduler) {
        if (delay === void 0) { delay = 0; }
        if (scheduler === void 0) { scheduler = asap; }
        return new SubscribeOnObservable(source, delay, scheduler);
    };
    SubscribeOnObservable.dispatch = function (arg) {
        var source = arg.source, subscriber = arg.subscriber;
        return this.add(source.subscribe(subscriber));
    };
    SubscribeOnObservable.prototype._subscribe = function (subscriber) {
        var delay = this.delayTime;
        var source = this.source;
        var scheduler = this.scheduler;
        return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
            source: source, subscriber: subscriber
        });
    };
    return SubscribeOnObservable;
}(Observable));
export { SubscribeOnObservable };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3Vic2NyaWJlT25PYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZXh0ZXJuYWwvcnhqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL1N1YnNjcmliZU9uT2JzZXJ2YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBR0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDekMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBWTlDO0lBQThDLHlDQUFhO0lBWXpELCtCQUFtQixNQUFxQixFQUNwQixTQUFxQixFQUNyQixTQUErQjtRQUQvQiwwQkFBQSxFQUFBLGFBQXFCO1FBQ3JCLDBCQUFBLEVBQUEsZ0JBQStCO1FBRm5ELFlBR0UsaUJBQU8sU0FPUjtRQVZrQixZQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3BCLGVBQVMsR0FBVCxTQUFTLENBQVk7UUFDckIsZUFBUyxHQUFULFNBQVMsQ0FBc0I7UUFFakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFO1lBQzFDLEtBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxDQUFDLFNBQVMsSUFBSSxPQUFPLFNBQVMsQ0FBQyxRQUFRLEtBQUssVUFBVSxFQUFFO1lBQzFELEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCOztJQUNILENBQUM7SUFwQk0sNEJBQU0sR0FBYixVQUFpQixNQUFxQixFQUFFLEtBQWlCLEVBQUUsU0FBK0I7UUFBbEQsc0JBQUEsRUFBQSxTQUFpQjtRQUFFLDBCQUFBLEVBQUEsZ0JBQStCO1FBQ3hGLE9BQU8sSUFBSSxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFHTSw4QkFBUSxHQUFmLFVBQTZDLEdBQW1CO1FBQ3RELElBQUEsbUJBQU0sRUFBRSwyQkFBVSxDQUFTO1FBQ25DLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQWVELDBDQUFVLEdBQVYsVUFBVyxVQUF5QjtRQUNsQyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzdCLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0IsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUVqQyxPQUFPLFNBQVMsQ0FBQyxRQUFRLENBQW1CLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUU7WUFDakYsTUFBTSxRQUFBLEVBQUUsVUFBVSxZQUFBO1NBQ25CLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCw0QkFBQztBQUFELENBQUMsQUFsQ0QsQ0FBOEMsVUFBVSxHQWtDdkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTY2hlZHVsZXJMaWtlLCBTY2hlZHVsZXJBY3Rpb24gfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgYXNhcCB9IGZyb20gJy4uL3NjaGVkdWxlci9hc2FwJztcbmltcG9ydCB7IGlzTnVtZXJpYyB9IGZyb20gJy4uL3V0aWwvaXNOdW1lcmljJztcblxuZXhwb3J0IGludGVyZmFjZSBEaXNwYXRjaEFyZzxUPiB7XG4gIHNvdXJjZTogT2JzZXJ2YWJsZTxUPjtcbiAgc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPjtcbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKiBAaGlkZSB0cnVlXG4gKi9cbmV4cG9ydCBjbGFzcyBTdWJzY3JpYmVPbk9ic2VydmFibGU8VD4gZXh0ZW5kcyBPYnNlcnZhYmxlPFQ+IHtcbiAgLyoqIEBub2NvbGxhcHNlICovXG4gIHN0YXRpYyBjcmVhdGU8VD4oc291cmNlOiBPYnNlcnZhYmxlPFQ+LCBkZWxheTogbnVtYmVyID0gMCwgc2NoZWR1bGVyOiBTY2hlZHVsZXJMaWtlID0gYXNhcCk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiBuZXcgU3Vic2NyaWJlT25PYnNlcnZhYmxlKHNvdXJjZSwgZGVsYXksIHNjaGVkdWxlcik7XG4gIH1cblxuICAvKiogQG5vY29sbGFwc2UgKi9cbiAgc3RhdGljIGRpc3BhdGNoPFQ+KHRoaXM6IFNjaGVkdWxlckFjdGlvbjxUPiwgYXJnOiBEaXNwYXRjaEFyZzxUPik6IFN1YnNjcmlwdGlvbiB7XG4gICAgY29uc3QgeyBzb3VyY2UsIHN1YnNjcmliZXIgfSA9IGFyZztcbiAgICByZXR1cm4gdGhpcy5hZGQoc291cmNlLnN1YnNjcmliZShzdWJzY3JpYmVyKSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlOiBPYnNlcnZhYmxlPFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGRlbGF5VGltZTogbnVtYmVyID0gMCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IFNjaGVkdWxlckxpa2UgPSBhc2FwKSB7XG4gICAgc3VwZXIoKTtcbiAgICBpZiAoIWlzTnVtZXJpYyhkZWxheVRpbWUpIHx8IGRlbGF5VGltZSA8IDApIHtcbiAgICAgIHRoaXMuZGVsYXlUaW1lID0gMDtcbiAgICB9XG4gICAgaWYgKCFzY2hlZHVsZXIgfHwgdHlwZW9mIHNjaGVkdWxlci5zY2hlZHVsZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5zY2hlZHVsZXIgPSBhc2FwO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAZGVwcmVjYXRlZCBUaGlzIGlzIGFuIGludGVybmFsIGltcGxlbWVudGF0aW9uIGRldGFpbCwgZG8gbm90IHVzZS4gKi9cbiAgX3N1YnNjcmliZShzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+KSB7XG4gICAgY29uc3QgZGVsYXkgPSB0aGlzLmRlbGF5VGltZTtcbiAgICBjb25zdCBzb3VyY2UgPSB0aGlzLnNvdXJjZTtcbiAgICBjb25zdCBzY2hlZHVsZXIgPSB0aGlzLnNjaGVkdWxlcjtcblxuICAgIHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGU8RGlzcGF0Y2hBcmc8YW55Pj4oU3Vic2NyaWJlT25PYnNlcnZhYmxlLmRpc3BhdGNoLCBkZWxheSwge1xuICAgICAgc291cmNlLCBzdWJzY3JpYmVyXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==