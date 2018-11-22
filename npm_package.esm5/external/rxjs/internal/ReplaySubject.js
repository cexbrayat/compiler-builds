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
import { Subject } from './Subject';
import { queue } from './scheduler/queue';
import { Subscription } from './Subscription';
import { ObserveOnSubscriber } from './operators/observeOn';
import { ObjectUnsubscribedError } from './util/ObjectUnsubscribedError';
import { SubjectSubscription } from './SubjectSubscription';
var ReplaySubject = (function (_super) {
    __extends(ReplaySubject, _super);
    function ReplaySubject(bufferSize, windowTime, scheduler) {
        if (bufferSize === void 0) { bufferSize = Number.POSITIVE_INFINITY; }
        if (windowTime === void 0) { windowTime = Number.POSITIVE_INFINITY; }
        var _this = _super.call(this) || this;
        _this.scheduler = scheduler;
        _this._events = [];
        _this._infiniteTimeWindow = false;
        _this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
        _this._windowTime = windowTime < 1 ? 1 : windowTime;
        if (windowTime === Number.POSITIVE_INFINITY) {
            _this._infiniteTimeWindow = true;
            _this.next = _this.nextInfiniteTimeWindow;
        }
        else {
            _this.next = _this.nextTimeWindow;
        }
        return _this;
    }
    ReplaySubject.prototype.nextInfiniteTimeWindow = function (value) {
        var _events = this._events;
        _events.push(value);
        if (_events.length > this._bufferSize) {
            _events.shift();
        }
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype.nextTimeWindow = function (value) {
        this._events.push(new ReplayEvent(this._getNow(), value));
        this._trimBufferThenGetEvents();
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        var _infiniteTimeWindow = this._infiniteTimeWindow;
        var _events = _infiniteTimeWindow ? this._events : this._trimBufferThenGetEvents();
        var scheduler = this.scheduler;
        var len = _events.length;
        var subscription;
        if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        else if (this.isStopped || this.hasError) {
            subscription = Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            subscription = new SubjectSubscription(this, subscriber);
        }
        if (scheduler) {
            subscriber.add(subscriber = new ObserveOnSubscriber(subscriber, scheduler));
        }
        if (_infiniteTimeWindow) {
            for (var i = 0; i < len && !subscriber.closed; i++) {
                subscriber.next(_events[i]);
            }
        }
        else {
            for (var i = 0; i < len && !subscriber.closed; i++) {
                subscriber.next(_events[i].value);
            }
        }
        if (this.hasError) {
            subscriber.error(this.thrownError);
        }
        else if (this.isStopped) {
            subscriber.complete();
        }
        return subscription;
    };
    ReplaySubject.prototype._getNow = function () {
        return (this.scheduler || queue).now();
    };
    ReplaySubject.prototype._trimBufferThenGetEvents = function () {
        var now = this._getNow();
        var _bufferSize = this._bufferSize;
        var _windowTime = this._windowTime;
        var _events = this._events;
        var eventsCount = _events.length;
        var spliceCount = 0;
        while (spliceCount < eventsCount) {
            if ((now - _events[spliceCount].time) < _windowTime) {
                break;
            }
            spliceCount++;
        }
        if (eventsCount > _bufferSize) {
            spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
        }
        if (spliceCount > 0) {
            _events.splice(0, spliceCount);
        }
        return _events;
    };
    return ReplaySubject;
}(Subject));
export { ReplaySubject };
var ReplayEvent = (function () {
    function ReplayEvent(time, value) {
        this.time = time;
        this.value = value;
    }
    return ReplayEvent;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVwbGF5U3ViamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2V4dGVybmFsL3J4anMvaW50ZXJuYWwvUmVwbGF5U3ViamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVwQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBUTVEO0lBQXNDLGlDQUFVO0lBTTlDLHVCQUFZLFVBQTZDLEVBQzdDLFVBQTZDLEVBQ3JDLFNBQXlCO1FBRmpDLDJCQUFBLEVBQUEsYUFBcUIsTUFBTSxDQUFDLGlCQUFpQjtRQUM3QywyQkFBQSxFQUFBLGFBQXFCLE1BQU0sQ0FBQyxpQkFBaUI7UUFEekQsWUFHRSxpQkFBTyxTQVVSO1FBWG1CLGVBQVMsR0FBVCxTQUFTLENBQWdCO1FBUHJDLGFBQU8sR0FBMkIsRUFBRSxDQUFDO1FBR3JDLHlCQUFtQixHQUFZLEtBQUssQ0FBQztRQU0zQyxLQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO1FBQ25ELEtBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7UUFFbkQsSUFBSSxVQUFVLEtBQUssTUFBTSxDQUFDLGlCQUFpQixFQUFFO1lBQzNDLEtB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QyxBQUhELElBR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAnLi9TdWJqZWN0JztcbmltcG9ydCB7IFNjaGVkdWxlckxpa2UgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IHF1ZXVlIH0gZnJvbSAnLi9zY2hlZHVsZXIvcXVldWUnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBPYnNlcnZlT25TdWJzY3JpYmVyIH0gZnJvbSAnLi9vcGVyYXRvcnMvb2JzZXJ2ZU9uJztcbmltcG9ydCB7IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yIH0gZnJvbSAnLi91dGlsL09iamVjdFVuc3Vic2NyaWJlZEVycm9yJztcbmltcG9ydCB7IFN1YmplY3RTdWJzY3JpcHRpb24gfSBmcm9tICcuL1N1YmplY3RTdWJzY3JpcHRpb24nO1xuLyoqXG4gKiBBIHZhcmlhbnQgb2YgU3ViamVjdCB0aGF0IFwicmVwbGF5c1wiIG9yIGVtaXRzIG9sZCB2YWx1ZXMgdG8gbmV3IHN1YnNjcmliZXJzLlxuICogSXQgYnVmZmVycyBhIHNldCBudW1iZXIgb2YgdmFsdWVzIGFuZCB3aWxsIGVtaXQgdGhvc2UgdmFsdWVzIGltbWVkaWF0ZWx5IHRvXG4gKiBhbnkgbmV3IHN1YnNjcmliZXJzIGluIGFkZGl0aW9uIHRvIGVtaXR0aW5nIG5ldyB2YWx1ZXMgdG8gZXhpc3Rpbmcgc3Vic2NyaWJlcnMuXG4gKlxuICogQGNsYXNzIFJlcGxheVN1YmplY3Q8VD5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlcGxheVN1YmplY3Q8VD4gZXh0ZW5kcyBTdWJqZWN0PFQ+IHtcbiAgcHJpdmF0ZSBfZXZlbnRzOiAoUmVwbGF5RXZlbnQ8VD4gfCBUKVtdID0gW107XG4gIHByaXZhdGUgX2J1ZmZlclNpemU6IG51bWJlcjtcbiAgcHJpdmF0ZSBfd2luZG93VGltZTogbnVtYmVyO1xuICBwcml2YXRlIF9pbmZpbml0ZVRpbWVXaW5kb3c6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihidWZmZXJTaXplOiBudW1iZXIgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFksXG4gICAgICAgICAgICAgIHdpbmRvd1RpbWU6IG51bWJlciA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9idWZmZXJTaXplID0gYnVmZmVyU2l6ZSA8IDEgPyAxIDogYnVmZmVyU2l6ZTtcbiAgICB0aGlzLl93aW5kb3dUaW1lID0gd2luZG93VGltZSA8IDEgPyAxIDogd2luZG93VGltZTtcblxuICAgIGlmICh3aW5kb3dUaW1lID09PSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkpIHtcbiAgICAgIHRoaXMuX2luZmluaXRlVGltZVdpbmRvdyA9IHRydWU7XG4gICAgICB0aGlzLm5leHQgPSB0aGlzLm5leHRJbmZpbml0ZVRpbWVXaW5kb3c7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubmV4dCA9IHRoaXMubmV4dFRpbWVXaW5kb3c7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBuZXh0SW5maW5pdGVUaW1lV2luZG93KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgY29uc3QgX2V2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICBfZXZlbnRzLnB1c2godmFsdWUpO1xuICAgIC8vIFNpbmNlIHRoaXMgbWV0aG9kIGlzIGludm9rZWQgaW4gZXZlcnkgbmV4dCgpIGNhbGwgdGhhbiB0aGUgYnVmZmVyXG4gICAgLy8gY2FuIG92ZXJncm93IHRoZSBtYXggc2l6ZSBvbmx5IGJ5IG9uZSBpdGVtXG4gICAgaWYgKF9ldmVudHMubGVuZ3RoID4gdGhpcy5fYnVmZmVyU2l6ZSkge1xuICAgICAgX2V2ZW50cy5zaGlmdCgpO1xuICAgIH1cblxuICAgIHN1cGVyLm5leHQodmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBuZXh0VGltZVdpbmRvdyh2YWx1ZTogVCk6IHZvaWQge1xuICAgIHRoaXMuX2V2ZW50cy5wdXNoKG5ldyBSZXBsYXlFdmVudCh0aGlzLl9nZXROb3coKSwgdmFsdWUpKTtcbiAgICB0aGlzLl90cmltQnVmZmVyVGhlbkdldEV2ZW50cygpO1xuXG4gICAgc3VwZXIubmV4dCh2YWx1ZSk7XG4gIH1cblxuICAvKiogQGRlcHJlY2F0ZWQgVGhpcyBpcyBhbiBpbnRlcm5hbCBpbXBsZW1lbnRhdGlvbiBkZXRhaWwsIGRvIG5vdCB1c2UuICovXG4gIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPik6IFN1YnNjcmlwdGlvbiB7XG4gICAgLy8gV2hlbiBgX2luZmluaXRlVGltZVdpbmRvdyA9PT0gdHJ1ZWAgdGhlbiB0aGUgYnVmZmVyIGlzIGFscmVhZHkgdHJpbW1lZFxuICAgIGNvbnN0IF9pbmZpbml0ZVRpbWVXaW5kb3cgPSB0aGlzLl9pbmZpbml0ZVRpbWVXaW5kb3c7XG4gICAgY29uc3QgX2V2ZW50cyA9IF9pbmZpbml0ZVRpbWVXaW5kb3cgPyB0aGlzLl9ldmVudHMgOiB0aGlzLl90cmltQnVmZmVyVGhlbkdldEV2ZW50cygpO1xuICAgIGNvbnN0IHNjaGVkdWxlciA9IHRoaXMuc2NoZWR1bGVyO1xuICAgIGNvbnN0IGxlbiA9IF9ldmVudHMubGVuZ3RoO1xuICAgIGxldCBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgdGhyb3cgbmV3IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzU3RvcHBlZCB8fCB0aGlzLmhhc0Vycm9yKSB7XG4gICAgICBzdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub2JzZXJ2ZXJzLnB1c2goc3Vic2NyaWJlcik7XG4gICAgICBzdWJzY3JpcHRpb24gPSBuZXcgU3ViamVjdFN1YnNjcmlwdGlvbih0aGlzLCBzdWJzY3JpYmVyKTtcbiAgICB9XG5cbiAgICBpZiAoc2NoZWR1bGVyKSB7XG4gICAgICBzdWJzY3JpYmVyLmFkZChzdWJzY3JpYmVyID0gbmV3IE9ic2VydmVPblN1YnNjcmliZXI8VD4oc3Vic2NyaWJlciwgc2NoZWR1bGVyKSk7XG4gICAgfVxuXG4gICAgaWYgKF9pbmZpbml0ZVRpbWVXaW5kb3cpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuICYmICFzdWJzY3JpYmVyLmNsb3NlZDsgaSsrKSB7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dCg8VD5fZXZlbnRzW2ldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW4gJiYgIXN1YnNjcmliZXIuY2xvc2VkOyBpKyspIHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KCg8UmVwbGF5RXZlbnQ8VD4+X2V2ZW50c1tpXSkudmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmhhc0Vycm9yKSB7XG4gICAgICBzdWJzY3JpYmVyLmVycm9yKHRoaXMudGhyb3duRXJyb3IpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICB9XG5cbiAgX2dldE5vdygpOiBudW1iZXIge1xuICAgIHJldHVybiAodGhpcy5zY2hlZHVsZXIgfHwgcXVldWUpLm5vdygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdHJpbUJ1ZmZlclRoZW5HZXRFdmVudHMoKTogUmVwbGF5RXZlbnQ8VD5bXSB7XG4gICAgY29uc3Qgbm93ID0gdGhpcy5fZ2V0Tm93KCk7XG4gICAgY29uc3QgX2J1ZmZlclNpemUgPSB0aGlzLl9idWZmZXJTaXplO1xuICAgIGNvbnN0IF93aW5kb3dUaW1lID0gdGhpcy5fd2luZG93VGltZTtcbiAgICBjb25zdCBfZXZlbnRzID0gPFJlcGxheUV2ZW50PFQ+W10+dGhpcy5fZXZlbnRzO1xuXG4gICAgY29uc3QgZXZlbnRzQ291bnQgPSBfZXZlbnRzLmxlbmd0aDtcbiAgICBsZXQgc3BsaWNlQ291bnQgPSAwO1xuXG4gICAgLy8gVHJpbSBldmVudHMgdGhhdCBmYWxsIG91dCBvZiB0aGUgdGltZSB3aW5kb3cuXG4gICAgLy8gU3RhcnQgYXQgdGhlIGZyb250IG9mIHRoZSBsaXN0LiBCcmVhayBlYXJseSBvbmNlXG4gICAgLy8gd2UgZW5jb3VudGVyIGFuIGV2ZW50IHRoYXQgZmFsbHMgd2l0aGluIHRoZSB3aW5kb3cuXG4gICAgd2hpbGUgKHNwbGljZUNvdW50IDwgZXZlbnRzQ291bnQpIHtcbiAgICAgIGlmICgobm93IC0gX2V2ZW50c1tzcGxpY2VDb3VudF0udGltZSkgPCBfd2luZG93VGltZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHNwbGljZUNvdW50Kys7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50c0NvdW50ID4gX2J1ZmZlclNpemUpIHtcbiAgICAgIHNwbGljZUNvdW50ID0gTWF0aC5tYXgoc3BsaWNlQ291bnQsIGV2ZW50c0NvdW50IC0gX2J1ZmZlclNpemUpO1xuICAgIH1cblxuICAgIGlmIChzcGxpY2VDb3VudCA+IDApIHtcbiAgICAgIF9ldmVudHMuc3BsaWNlKDAsIHNwbGljZUNvdW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gX2V2ZW50cztcbiAgfVxuXG59XG5cbmNsYXNzIFJlcGxheUV2ZW50PFQ+IHtcbiAgY29uc3RydWN0b3IocHVibGljIHRpbWU6IG51bWJlciwgcHVibGljIHZhbHVlOiBUKSB7XG4gIH1cbn1cbiJdfQ==