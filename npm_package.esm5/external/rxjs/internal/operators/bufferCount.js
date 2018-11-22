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
export function bufferCount(bufferSize, startBufferEvery) {
    if (startBufferEvery === void 0) { startBufferEvery = null; }
    return function bufferCountOperatorFunction(source) {
        return source.lift(new BufferCountOperator(bufferSize, startBufferEvery));
    };
}
var BufferCountOperator = (function () {
    function BufferCountOperator(bufferSize, startBufferEvery) {
        this.bufferSize = bufferSize;
        this.startBufferEvery = startBufferEvery;
        if (!startBufferEvery || bufferSize === startBufferEvery) {
            this.subscriberClass = BufferCountSubscriber;
        }
        else {
            this.subscriberClass = BufferSkipCountSubscriber;
        }
    }
    BufferCountOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new this.subscriberClass(subscriber, this.bufferSize, this.startBufferEvery));
    };
    return BufferCountOperator;
}());
var BufferCountSubscriber = (function (_super) {
    __extends(BufferCountSubscriber, _super);
    function BufferCountSubscriber(destination, bufferSize) {
        var _this = _super.call(this, destination) || this;
        _this.bufferSize = bufferSize;
        _this.buffer = [];
        return _this;
    }
    BufferCountSubscriber.prototype._next = function (value) {
        var buffer = this.buffer;
        buffer.push(value);
        if (buffer.length == this.bufferSize) {
            this.destination.next(buffer);
            this.buffer = [];
        }
    };
    BufferCountSubscriber.prototype._complete = function () {
        var buffer = this.buffer;
        if (buffer.length > 0) {
            this.destination.next(buffer);
        }
        _super.prototype._complete.call(this);
    };
    return BufferCountSubscriber;
}(Subscriber));
var BufferSkipCountSubscriber = (function (_super) {
    __extends(BufferSkipCountSubscriber, _super);
    function BufferSkipCountSubscriber(destination, bufferSize, startBufferEvery) {
        var _this = _super.call(this, destination) || this;
        _this.bufferSize = bufferSize;
        _this.startBufferEvery = startBufferEvery;
        _this.buffers = [];
        _this.count = 0;
        return _this;
    }
    BufferSkipCountSubscriber.prototype._next = function (value) {
        var _a = this, bufferSize = _a.bufferSize, startBufferEvery = _a.startBufferEvery, buffers = _a.buffers, count = _a.count;
        this.count++;
        if (count % startBufferEvery === 0) {
            buffers.push([]);
        }
        for (var i = buffers.length; i--;) {
            var buffer = buffers[i];
            buffer.push(value);
            if (buffer.length === bufferSize) {
                buffers.splice(i, 1);
                this.destination.next(buffer);
            }
        }
    };
    BufferSkipCountSubscriber.prototype._complete = function () {
        var _a = this, buffers = _a.buffers, destination = _a.destination;
        while (buffers.length > 0) {
            var buffer = buffers.shift();
            if (buffer.length > 0) {
                destination.next(buffer);
            }
        }
        _super.prototype._complete.call(this);
    };
    return BufferSkipCountSubscriber;
}(Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVmZmVyQ291bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9leHRlcm5hbC9yeGpzL2ludGVybmFsL29wZXJhdG9ycy9idWZmZXJDb3VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXFEM0MsTUFBTSxVQUFVLFdBQVcsQ0FBSSxVQUFrQixFQUFFLGdCQUErQjtJQUEvQixpQ0FBQSxFQUFBLHVCQUErQjtJQUNoRixPQUFPLFNBQVMsMkJBQTJCLENBQUMsTUFBcUI7UUFDL0QsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksbUJBQW1CLENBQUksVUFBVSxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUMvRSxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQ7SUFHRSw2QkFBb0IsVUFBa0IsRUFBVSxnQkFBd0I7UUFBcEQsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBUTtRQUN0RSxJQUFJLENBQUMsZ0JBQWdCLElBQUksVUFBVSxLQUFLLGdCQUFnQixFQUFFO1lBQ3hELElBQUksQ0FBQyxlQUFlLEdBQUcscUJBQXFCLENBQUM7U0FDOUM7YUFBTTtZQUNMLElBQUksQ0FBQyxlQUFlLEdBQUcseUJBQXlCLENBQUM7U0FDbEQ7SUFDSCxDQUFDO0lBRUQsa0NBQUksR0FBSixVQUFLLFVBQTJCLEVBQUUsTUFBVztRQUMzQyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7SUFDeEcsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQWRELElBY0M7QUFPRDtJQUF1Qyx5Q0FBYTtJQUdsRCwrQkFBWSxXQUE0QixFQUFVLFVBQWtCO1FBQXBFLFlBQ0Usa0JBQU0sV0FBVyxDQUFDLFNBQ25CO1FBRmlELGdCQUFVLEdBQVYsVUFBVSxDQUFRO1FBRjVELFlBQU0sR0FBUSxFQUFFLENBQUM7O0lBSXpCLENBQUM7SUFFUyxxQ0FBSyxHQUFmLFVBQWdCLEtBQVE7UUFDdEIsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUUzQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRW5CLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztJQUVTLHlDQUFTLEdBQW5CO1FBQ0UsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsaUJBQU0sU0FBUyxXQUFFLENBQUM7SUFDcEIsQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FBQyxBQXpCRCxDQUF1QyxVQUFVLEdBeUJoRDtBQU9EO0lBQTJDLDZDQUFhO0lBSXRELG1DQUFZLFdBQTRCLEVBQVUsVUFBa0IsRUFBVSxnQkFBd0I7UUFBdEcsWUFDRSxrQkFBTSxXQUFXLENBQUMsU0FDbkI7UUFGaUQsZ0JBQVUsR0FBVixVQUFVLENBQVE7UUFBVSxzQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVE7UUFIOUYsYUFBTyxHQUFlLEVBQUUsQ0FBQztRQUN6QixXQUFLLEdBQVcsQ0FBQyxDQUFDOztJQUkxQixDQUFDO0lBRVMseUNBQUssR0FBZixVQUFnQixLQUFRO1FBQ2hCLElBQUEsU0FBdUQsRUFBckQsMEJBQVUsRUFBRSxzQ0FBZ0IsRUFBRSxvQkFBTyxFQUFFLGdCQUFjLENBQUM7UUFFOUQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxLQUFLLEdBQUcsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFO1lBQ2xDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDbEI7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUk7WUFDbEMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLFVBQVUsRUFBRTtnQkFDaEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQy9CO1NBQ0Y7SUFDSCxDQUFDO0lBRVMsNkNBQVMsR0FBbkI7UUFDUSxJQUFBLFNBQStCLEVBQTdCLG9CQUFPLEVBQUUsNEJBQW9CLENBQUM7UUFFdEMsT0FBTyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN6QixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDN0IsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDckIsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMxQjtTQUNGO1FBQ0QsaUJBQU0sU0FBUyxXQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVILGdDQUFDO0FBQUQsQ0FBQyxBQXRDRCxDQUEyQyxVQUFVLEdBc0NwRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgT3BlcmF0b3JGdW5jdGlvbiwgVGVhcmRvd25Mb2dpYyB9IGZyb20gJy4uL3R5cGVzJztcblxuLyoqXG4gKiBCdWZmZXJzIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB2YWx1ZXMgdW50aWwgdGhlIHNpemUgaGl0cyB0aGUgbWF4aW11bVxuICogYGJ1ZmZlclNpemVgIGdpdmVuLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5Db2xsZWN0cyB2YWx1ZXMgZnJvbSB0aGUgcGFzdCBhcyBhbiBhcnJheSwgYW5kIGVtaXRzXG4gKiB0aGF0IGFycmF5IG9ubHkgd2hlbiBpdHMgc2l6ZSByZWFjaGVzIGBidWZmZXJTaXplYC48L3NwYW4+XG4gKlxuICogIVtdKGJ1ZmZlckNvdW50LnBuZylcbiAqXG4gKiBCdWZmZXJzIGEgbnVtYmVyIG9mIHZhbHVlcyBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBieSBgYnVmZmVyU2l6ZWAgdGhlblxuICogZW1pdHMgdGhlIGJ1ZmZlciBhbmQgY2xlYXJzIGl0LCBhbmQgc3RhcnRzIGEgbmV3IGJ1ZmZlciBlYWNoXG4gKiBgc3RhcnRCdWZmZXJFdmVyeWAgdmFsdWVzLiBJZiBgc3RhcnRCdWZmZXJFdmVyeWAgaXMgbm90IHByb3ZpZGVkIG9yIGlzXG4gKiBgbnVsbGAsIHRoZW4gbmV3IGJ1ZmZlcnMgYXJlIHN0YXJ0ZWQgaW1tZWRpYXRlbHkgYXQgdGhlIHN0YXJ0IG9mIHRoZSBzb3VyY2VcbiAqIGFuZCB3aGVuIGVhY2ggYnVmZmVyIGNsb3NlcyBhbmQgaXMgZW1pdHRlZC5cbiAqXG4gKiAjIyBFeGFtcGxlc1xuICpcbiAqIEVtaXQgdGhlIGxhc3QgdHdvIGNsaWNrIGV2ZW50cyBhcyBhbiBhcnJheVxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGNvbnN0IGNsaWNrcyA9IGZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiBjb25zdCBidWZmZXJlZCA9IGNsaWNrcy5waXBlKGJ1ZmZlckNvdW50KDIpKTtcbiAqIGJ1ZmZlcmVkLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqIGBgYFxuICpcbiAqIE9uIGV2ZXJ5IGNsaWNrLCBlbWl0IHRoZSBsYXN0IHR3byBjbGljayBldmVudHMgYXMgYW4gYXJyYXlcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBjb25zdCBjbGlja3MgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogY29uc3QgYnVmZmVyZWQgPSBjbGlja3MucGlwZShidWZmZXJDb3VudCgyLCAxKSk7XG4gKiBidWZmZXJlZC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKiBgYGBcbiAqXG4gKiBAc2VlIHtAbGluayBidWZmZXJ9XG4gKiBAc2VlIHtAbGluayBidWZmZXJUaW1lfVxuICogQHNlZSB7QGxpbmsgYnVmZmVyVG9nZ2xlfVxuICogQHNlZSB7QGxpbmsgYnVmZmVyV2hlbn1cbiAqIEBzZWUge0BsaW5rIHBhaXJ3aXNlfVxuICogQHNlZSB7QGxpbmsgd2luZG93Q291bnR9XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGJ1ZmZlclNpemUgVGhlIG1heGltdW0gc2l6ZSBvZiB0aGUgYnVmZmVyIGVtaXR0ZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0QnVmZmVyRXZlcnldIEludGVydmFsIGF0IHdoaWNoIHRvIHN0YXJ0IGEgbmV3IGJ1ZmZlci5cbiAqIEZvciBleGFtcGxlIGlmIGBzdGFydEJ1ZmZlckV2ZXJ5YCBpcyBgMmAsIHRoZW4gYSBuZXcgYnVmZmVyIHdpbGwgYmUgc3RhcnRlZFxuICogb24gZXZlcnkgb3RoZXIgdmFsdWUgZnJvbSB0aGUgc291cmNlLiBBIG5ldyBidWZmZXIgaXMgc3RhcnRlZCBhdCB0aGVcbiAqIGJlZ2lubmluZyBvZiB0aGUgc291cmNlIGJ5IGRlZmF1bHQuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFRbXT59IEFuIE9ic2VydmFibGUgb2YgYXJyYXlzIG9mIGJ1ZmZlcmVkIHZhbHVlcy5cbiAqIEBtZXRob2QgYnVmZmVyQ291bnRcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWZmZXJDb3VudDxUPihidWZmZXJTaXplOiBudW1iZXIsIHN0YXJ0QnVmZmVyRXZlcnk6IG51bWJlciA9IG51bGwpOiBPcGVyYXRvckZ1bmN0aW9uPFQsIFRbXT4ge1xuICByZXR1cm4gZnVuY3Rpb24gYnVmZmVyQ291bnRPcGVyYXRvckZ1bmN0aW9uKHNvdXJjZTogT2JzZXJ2YWJsZTxUPikge1xuICAgIHJldHVybiBzb3VyY2UubGlmdChuZXcgQnVmZmVyQ291bnRPcGVyYXRvcjxUPihidWZmZXJTaXplLCBzdGFydEJ1ZmZlckV2ZXJ5KSk7XG4gIH07XG59XG5cbmNsYXNzIEJ1ZmZlckNvdW50T3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUW10+IHtcbiAgcHJpdmF0ZSBzdWJzY3JpYmVyQ2xhc3M6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJ1ZmZlclNpemU6IG51bWJlciwgcHJpdmF0ZSBzdGFydEJ1ZmZlckV2ZXJ5OiBudW1iZXIpIHtcbiAgICBpZiAoIXN0YXJ0QnVmZmVyRXZlcnkgfHwgYnVmZmVyU2l6ZSA9PT0gc3RhcnRCdWZmZXJFdmVyeSkge1xuICAgICAgdGhpcy5zdWJzY3JpYmVyQ2xhc3MgPSBCdWZmZXJDb3VudFN1YnNjcmliZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3Vic2NyaWJlckNsYXNzID0gQnVmZmVyU2tpcENvdW50U3Vic2NyaWJlcjtcbiAgICB9XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VFtdPiwgc291cmNlOiBhbnkpOiBUZWFyZG93bkxvZ2ljIHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgdGhpcy5zdWJzY3JpYmVyQ2xhc3Moc3Vic2NyaWJlciwgdGhpcy5idWZmZXJTaXplLCB0aGlzLnN0YXJ0QnVmZmVyRXZlcnkpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgQnVmZmVyQ291bnRTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG4gIHByaXZhdGUgYnVmZmVyOiBUW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUW10+LCBwcml2YXRlIGJ1ZmZlclNpemU6IG51bWJlcikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuXG4gICAgYnVmZmVyLnB1c2godmFsdWUpO1xuXG4gICAgaWYgKGJ1ZmZlci5sZW5ndGggPT0gdGhpcy5idWZmZXJTaXplKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQoYnVmZmVyKTtcbiAgICAgIHRoaXMuYnVmZmVyID0gW107XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBidWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICBpZiAoYnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dChidWZmZXIpO1xuICAgIH1cbiAgICBzdXBlci5fY29tcGxldGUoKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgQnVmZmVyU2tpcENvdW50U3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBwcml2YXRlIGJ1ZmZlcnM6IEFycmF5PFRbXT4gPSBbXTtcbiAgcHJpdmF0ZSBjb3VudDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUW10+LCBwcml2YXRlIGJ1ZmZlclNpemU6IG51bWJlciwgcHJpdmF0ZSBzdGFydEJ1ZmZlckV2ZXJ5OiBudW1iZXIpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICBjb25zdCB7IGJ1ZmZlclNpemUsIHN0YXJ0QnVmZmVyRXZlcnksIGJ1ZmZlcnMsIGNvdW50IH0gPSB0aGlzO1xuXG4gICAgdGhpcy5jb3VudCsrO1xuICAgIGlmIChjb3VudCAlIHN0YXJ0QnVmZmVyRXZlcnkgPT09IDApIHtcbiAgICAgIGJ1ZmZlcnMucHVzaChbXSk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IGJ1ZmZlcnMubGVuZ3RoOyBpLS07ICkge1xuICAgICAgY29uc3QgYnVmZmVyID0gYnVmZmVyc1tpXTtcbiAgICAgIGJ1ZmZlci5wdXNoKHZhbHVlKTtcbiAgICAgIGlmIChidWZmZXIubGVuZ3RoID09PSBidWZmZXJTaXplKSB7XG4gICAgICAgIGJ1ZmZlcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQoYnVmZmVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgYnVmZmVycywgZGVzdGluYXRpb24gfSA9IHRoaXM7XG5cbiAgICB3aGlsZSAoYnVmZmVycy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgYnVmZmVyID0gYnVmZmVycy5zaGlmdCgpO1xuICAgICAgaWYgKGJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgIGRlc3RpbmF0aW9uLm5leHQoYnVmZmVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc3VwZXIuX2NvbXBsZXRlKCk7XG4gIH1cblxufVxuIl19