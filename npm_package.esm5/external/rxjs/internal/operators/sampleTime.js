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
import { Subscriber } from '../Subscriber';
import { async } from '../scheduler/async';
export function sampleTime(period, scheduler) {
    if (scheduler === void 0) { scheduler = async; }
    return function (source) { return source.lift(new SampleTimeOperator(period, scheduler)); };
}
var SampleTimeOperator = (function () {
    function SampleTimeOperator(period, scheduler) {
        this.period = period;
        this.scheduler = scheduler;
    }
    SampleTimeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new SampleTimeSubscriber(subscriber, this.period, this.scheduler));
    };
    return SampleTimeOperator;
}());
var SampleTimeSubscriber = (function (_super) {
    __extends(SampleTimeSubscriber, _super);
    function SampleTimeSubscriber(destination, period, scheduler) {
        var _this = _super.call(this, destination) || this;
        _this.period = period;
        _this.scheduler = scheduler;
        _this.hasValue = false;
        _this.add(scheduler.schedule(dispatchNotification, period, { subscriber: _this, period: period }));
        return _this;
    }
    SampleTimeSubscriber.prototype._next = function (value) {
        this.lastValue = value;
        this.hasValue = true;
    };
    SampleTimeSubscriber.prototype.notifyNext = function () {
        if (this.hasValue) {
            this.hasValue = false;
            this.destination.next(this.lastValue);
        }
    };
    return SampleTimeSubscriber;
}(Subscriber));
function dispatchNotification(state) {
    var subscriber = state.subscriber, period = state.period;
    subscriber.notifyNext();
    this.schedule(state, period);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FtcGxlVGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2V4dGVybmFsL3J4anMvaW50ZXJuYWwvb3BlcmF0b3JzL3NhbXBsZVRpbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUVBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBMEMzQyxNQUFNLFVBQVUsVUFBVSxDQUFJLE1BQWMsRUFBRSxTQUFnQztJQUFoQywwQkFBQSxFQUFBLGlCQUFnQztJQUM1RSxPQUFPLFVBQUMsTUFBcUIsSUFBSyxPQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBdEQsQ0FBc0QsQ0FBQztBQUMzRixDQUFDO0FBRUQ7SUFDRSw0QkFBb0IsTUFBYyxFQUNkLFNBQXdCO1FBRHhCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxjQUFTLEdBQVQsU0FBUyxDQUFlO0lBQzVDLENBQUM7SUFFRCxpQ0FBSSxHQUFKLFVBQUssVUFBeUIsRUFBRSxNQUFXO1FBQ3pDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBT0Q7SUFBc0Msd0NBQWE7SUFJakQsOEJBQVksV0FBMEIsRUFDbEIsTUFBYyxFQUNkLFNBQXdCO1FBRjVDLFlBR0Usa0JBQU0sV0FBVyxDQUFDLFNBRW5CO1FBSm1CLFlBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxlQUFTLEdBQVQsU0FBUyxDQUFlO1FBSjVDLGNBQVEsR0FBWSxLQUFLLENBQUM7UUFNeEIsS0FBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxFQUFFLFVBQVUsRUFBRSxLQUFJLEVBQUUsTUFBTSxRQUFBLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0lBQzNGLENBQUM7SUFFUyxvQ0FBSyxHQUFmLFVBQWdCLEtBQVE7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVELHlDQUFVLEdBQVY7UUFDRSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxBQXRCRCxDQUFzQyxVQUFVLEdBc0IvQztBQUVELFNBQVMsb0JBQW9CLENBQWdDLEtBQVU7SUFDL0QsSUFBQSw2QkFBVSxFQUFFLHFCQUFNLENBQVc7SUFDbkMsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQy9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IGFzeW5jIH0gZnJvbSAnLi4vc2NoZWR1bGVyL2FzeW5jJztcbmltcG9ydCB7IE1vbm9UeXBlT3BlcmF0b3JGdW5jdGlvbiwgU2NoZWR1bGVyQWN0aW9uLCBTY2hlZHVsZXJMaWtlLCBUZWFyZG93bkxvZ2ljIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vKipcbiAqIEVtaXRzIHRoZSBtb3N0IHJlY2VudGx5IGVtaXR0ZWQgdmFsdWUgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUgd2l0aGluXG4gKiBwZXJpb2RpYyB0aW1lIGludGVydmFscy5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+U2FtcGxlcyB0aGUgc291cmNlIE9ic2VydmFibGUgYXQgcGVyaW9kaWMgdGltZVxuICogaW50ZXJ2YWxzLCBlbWl0dGluZyB3aGF0IGl0IHNhbXBsZXMuPC9zcGFuPlxuICpcbiAqICFbXShzYW1wbGVUaW1lLnBuZylcbiAqXG4gKiBgc2FtcGxlVGltZWAgcGVyaW9kaWNhbGx5IGxvb2tzIGF0IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBhbmQgZW1pdHMgd2hpY2hldmVyXG4gKiB2YWx1ZSBpdCBoYXMgbW9zdCByZWNlbnRseSBlbWl0dGVkIHNpbmNlIHRoZSBwcmV2aW91cyBzYW1wbGluZywgdW5sZXNzIHRoZVxuICogc291cmNlIGhhcyBub3QgZW1pdHRlZCBhbnl0aGluZyBzaW5jZSB0aGUgcHJldmlvdXMgc2FtcGxpbmcuIFRoZSBzYW1wbGluZ1xuICogaGFwcGVucyBwZXJpb2RpY2FsbHkgaW4gdGltZSBldmVyeSBgcGVyaW9kYCBtaWxsaXNlY29uZHMgKG9yIHRoZSB0aW1lIHVuaXRcbiAqIGRlZmluZWQgYnkgdGhlIG9wdGlvbmFsIGBzY2hlZHVsZXJgIGFyZ3VtZW50KS4gVGhlIHNhbXBsaW5nIHN0YXJ0cyBhcyBzb29uIGFzXG4gKiB0aGUgb3V0cHV0IE9ic2VydmFibGUgaXMgc3Vic2NyaWJlZC5cbiAqXG4gKiAjIyBFeGFtcGxlXG4gKiBFdmVyeSBzZWNvbmQsIGVtaXQgdGhlIG1vc3QgcmVjZW50IGNsaWNrIGF0IG1vc3Qgb25jZVxuICogYGBgamF2YXNjcmlwdFxuICogY29uc3QgY2xpY2tzID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIGNvbnN0IHJlc3VsdCA9IGNsaWNrcy5waXBlKHNhbXBsZVRpbWUoMTAwMCkpO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqIGBgYFxuICpcbiAqIEBzZWUge0BsaW5rIGF1ZGl0VGltZX1cbiAqIEBzZWUge0BsaW5rIGRlYm91bmNlVGltZX1cbiAqIEBzZWUge0BsaW5rIGRlbGF5fVxuICogQHNlZSB7QGxpbmsgc2FtcGxlfVxuICogQHNlZSB7QGxpbmsgdGhyb3R0bGVUaW1lfVxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBwZXJpb2QgVGhlIHNhbXBsaW5nIHBlcmlvZCBleHByZXNzZWQgaW4gbWlsbGlzZWNvbmRzIG9yIHRoZVxuICogdGltZSB1bml0IGRldGVybWluZWQgaW50ZXJuYWxseSBieSB0aGUgb3B0aW9uYWwgYHNjaGVkdWxlcmAuXG4gKiBAcGFyYW0ge1NjaGVkdWxlckxpa2V9IFtzY2hlZHVsZXI9YXN5bmNdIFRoZSB7QGxpbmsgU2NoZWR1bGVyTGlrZX0gdG8gdXNlIGZvclxuICogbWFuYWdpbmcgdGhlIHRpbWVycyB0aGF0IGhhbmRsZSB0aGUgc2FtcGxpbmcuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIHJlc3VsdHMgb2Ygc2FtcGxpbmcgdGhlXG4gKiB2YWx1ZXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUgYXQgdGhlIHNwZWNpZmllZCB0aW1lIGludGVydmFsLlxuICogQG1ldGhvZCBzYW1wbGVUaW1lXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FtcGxlVGltZTxUPihwZXJpb2Q6IG51bWJlciwgc2NoZWR1bGVyOiBTY2hlZHVsZXJMaWtlID0gYXN5bmMpOiBNb25vVHlwZU9wZXJhdG9yRnVuY3Rpb248VD4ge1xuICByZXR1cm4gKHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gc291cmNlLmxpZnQobmV3IFNhbXBsZVRpbWVPcGVyYXRvcihwZXJpb2QsIHNjaGVkdWxlcikpO1xufVxuXG5jbGFzcyBTYW1wbGVUaW1lT3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGVyaW9kOiBudW1iZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBTY2hlZHVsZXJMaWtlKSB7XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4sIHNvdXJjZTogYW55KTogVGVhcmRvd25Mb2dpYyB7XG4gICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IFNhbXBsZVRpbWVTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMucGVyaW9kLCB0aGlzLnNjaGVkdWxlcikpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBTYW1wbGVUaW1lU3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBsYXN0VmFsdWU6IFQ7XG4gIGhhc1ZhbHVlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgcGVyaW9kOiBudW1iZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBTY2hlZHVsZXJMaWtlKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICAgIHRoaXMuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShkaXNwYXRjaE5vdGlmaWNhdGlvbiwgcGVyaW9kLCB7IHN1YnNjcmliZXI6IHRoaXMsIHBlcmlvZCB9KSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpIHtcbiAgICB0aGlzLmxhc3RWYWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuaGFzVmFsdWUgPSB0cnVlO1xuICB9XG5cbiAgbm90aWZ5TmV4dCgpIHtcbiAgICBpZiAodGhpcy5oYXNWYWx1ZSkge1xuICAgICAgdGhpcy5oYXNWYWx1ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHRoaXMubGFzdFZhbHVlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2hOb3RpZmljYXRpb248VD4odGhpczogU2NoZWR1bGVyQWN0aW9uPGFueT4sIHN0YXRlOiBhbnkpIHtcbiAgbGV0IHsgc3Vic2NyaWJlciwgcGVyaW9kIH0gPSBzdGF0ZTtcbiAgc3Vic2NyaWJlci5ub3RpZnlOZXh0KCk7XG4gIHRoaXMuc2NoZWR1bGUoc3RhdGUsIHBlcmlvZCk7XG59XG4iXX0=