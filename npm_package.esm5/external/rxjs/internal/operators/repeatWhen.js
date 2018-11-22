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
import { tryCatch } from '../util/tryCatch';
import { errorObject } from '../util/errorObject';
import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
export function repeatWhen(notifier) {
    return function (source) { return source.lift(new RepeatWhenOperator(notifier)); };
}
var RepeatWhenOperator = (function () {
    function RepeatWhenOperator(notifier) {
        this.notifier = notifier;
    }
    RepeatWhenOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new RepeatWhenSubscriber(subscriber, this.notifier, source));
    };
    return RepeatWhenOperator;
}());
var RepeatWhenSubscriber = (function (_super) {
    __extends(RepeatWhenSubscriber, _super);
    function RepeatWhenSubscriber(destination, notifier, source) {
        var _this = _super.call(this, destination) || this;
        _this.notifier = notifier;
        _this.source = source;
        _this.sourceIsBeingSubscribedTo = true;
        return _this;
    }
    RepeatWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.sourceIsBeingSubscribedTo = true;
        this.source.subscribe(this);
    };
    RepeatWhenSubscriber.prototype.notifyComplete = function (innerSub) {
        if (this.sourceIsBeingSubscribedTo === false) {
            return _super.prototype.complete.call(this);
        }
    };
    RepeatWhenSubscriber.prototype.complete = function () {
        this.sourceIsBeingSubscribedTo = false;
        if (!this.isStopped) {
            if (!this.retries) {
                this.subscribeToRetries();
            }
            if (!this.retriesSubscription || this.retriesSubscription.closed) {
                return _super.prototype.complete.call(this);
            }
            this._unsubscribeAndRecycle();
            this.notifications.next();
        }
    };
    RepeatWhenSubscriber.prototype._unsubscribe = function () {
        var _a = this, notifications = _a.notifications, retriesSubscription = _a.retriesSubscription;
        if (notifications) {
            notifications.unsubscribe();
            this.notifications = null;
        }
        if (retriesSubscription) {
            retriesSubscription.unsubscribe();
            this.retriesSubscription = null;
        }
        this.retries = null;
    };
    RepeatWhenSubscriber.prototype._unsubscribeAndRecycle = function () {
        var _unsubscribe = this._unsubscribe;
        this._unsubscribe = null;
        _super.prototype._unsubscribeAndRecycle.call(this);
        this._unsubscribe = _unsubscribe;
        return this;
    };
    RepeatWhenSubscriber.prototype.subscribeToRetries = function () {
        this.notifications = new Subject();
        var retries = tryCatch(this.notifier)(this.notifications);
        if (retries === errorObject) {
            return _super.prototype.complete.call(this);
        }
        this.retries = retries;
        this.retriesSubscription = subscribeToResult(this, retries);
    };
    return RepeatWhenSubscriber;
}(OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwZWF0V2hlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2V4dGVybmFsL3J4anMvaW50ZXJuYWwvb3BlcmF0b3JzL3JlcGVhdFdoZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUdBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFckMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVsRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFckQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFrQjlELE1BQU0sVUFBVSxVQUFVLENBQUksUUFBNkQ7SUFDekYsT0FBTyxVQUFDLE1BQXFCLElBQUssT0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBN0MsQ0FBNkMsQ0FBQztBQUNsRixDQUFDO0FBRUQ7SUFDRSw0QkFBc0IsUUFBNkQ7UUFBN0QsYUFBUSxHQUFSLFFBQVEsQ0FBcUQ7SUFDbkYsQ0FBQztJQUVELGlDQUFJLEdBQUosVUFBSyxVQUF5QixFQUFFLE1BQVc7UUFDekMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksb0JBQW9CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBUEQsSUFPQztBQU9EO0lBQXlDLHdDQUFxQjtJQU81RCw4QkFBWSxXQUEwQixFQUNsQixRQUE2RCxFQUM3RCxNQUFxQjtRQUZ6QyxZQUdFLGtCQUFNLFdBQVcsQ0FBQyxTQUNuQjtRQUhtQixjQUFRLEdBQVIsUUFBUSxDQUFxRDtRQUM3RCxZQUFNLEdBQU4sTUFBTSxDQUFlO1FBSmpDLCtCQUF5QixHQUFZLElBQUksQ0FBQzs7SUFNbEQsQ0FBQztJQUVELHlDQUFVLEdBQVYsVUFBVyxVQUFhLEVBQUUsVUFBYSxFQUM1QixVQUFrQixFQUFFLFVBQWtCLEVBQ3RDLFFBQStCO1FBQ3hDLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUM7UUFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELDZDQUFjLEdBQWQsVUFBZSxRQUErQjtRQUM1QyxJQUFJLElBQUksQ0FBQyx5QkFBeUIsS0FBSyxLQUFLLEVBQUU7WUFDNUMsT0FBTyxpQkFBTSxRQUFRLFdBQUUsQ0FBQztTQUN6QjtJQUNILENBQUM7SUFFRCx1Q0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLHlCQUF5QixHQUFHLEtBQUssQ0FBQztRQUV2QyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDakIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7YUFDM0I7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hFLE9BQU8saUJBQU0sUUFBUSxXQUFFLENBQUM7YUFDekI7WUFFRCxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztJQUdELDJDQUFZLEdBQVo7UUFDUSxJQUFBLFNBQTZDLEVBQTNDLGdDQUFhLEVBQUUsNENBQTRCLENBQUM7UUFDcEQsSUFBSSxhQUFhLEVBQUU7WUFDakIsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxtQkFBbUIsRUFBRTtZQUN2QixtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUdELHFEQUFzQixHQUF0QjtRQUNVLElBQUEsZ0NBQVksQ0FBVTtRQUU5QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixpQkFBTSxzQkFBc0IsV0FBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBRWpDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVPLGlEQUFrQixHQUExQjtRQUNFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNuQyxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM1RCxJQUFJLE9BQU8sS0FBSyxXQUFXLEVBQUU7WUFDM0IsT0FBTyxpQkFBTSxRQUFRLFdBQUUsQ0FBQztTQUN6QjtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxBQTVFRCxDQUF5QyxlQUFlLEdBNEV2RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJy4uL1N1YmplY3QnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IHRyeUNhdGNoIH0gZnJvbSAnLi4vdXRpbC90cnlDYXRjaCc7XG5pbXBvcnQgeyBlcnJvck9iamVjdCB9IGZyb20gJy4uL3V0aWwvZXJyb3JPYmplY3QnO1xuXG5pbXBvcnQgeyBPdXRlclN1YnNjcmliZXIgfSBmcm9tICcuLi9PdXRlclN1YnNjcmliZXInO1xuaW1wb3J0IHsgSW5uZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vSW5uZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IHN1YnNjcmliZVRvUmVzdWx0IH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCc7XG5cbmltcG9ydCB7IE1vbm9UeXBlT3BlcmF0b3JGdW5jdGlvbiwgVGVhcmRvd25Mb2dpYyB9IGZyb20gJy4uL3R5cGVzJztcblxuLyoqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBtaXJyb3JzIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB3aXRoIHRoZSBleGNlcHRpb24gb2YgYSBgY29tcGxldGVgLiBJZiB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlIGNhbGxzIGBjb21wbGV0ZWAsIHRoaXMgbWV0aG9kIHdpbGwgZW1pdCB0byB0aGUgT2JzZXJ2YWJsZSByZXR1cm5lZCBmcm9tIGBub3RpZmllcmAuIElmIHRoYXQgT2JzZXJ2YWJsZVxuICogY2FsbHMgYGNvbXBsZXRlYCBvciBgZXJyb3JgLCB0aGVuIHRoaXMgbWV0aG9kIHdpbGwgY2FsbCBgY29tcGxldGVgIG9yIGBlcnJvcmAgb24gdGhlIGNoaWxkIHN1YnNjcmlwdGlvbi4gT3RoZXJ3aXNlXG4gKiB0aGlzIG1ldGhvZCB3aWxsIHJlc3Vic2NyaWJlIHRvIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqXG4gKiAhW10ocmVwZWF0V2hlbi5wbmcpXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbihub3RpZmljYXRpb25zOiBPYnNlcnZhYmxlKTogT2JzZXJ2YWJsZX0gbm90aWZpZXIgLSBSZWNlaXZlcyBhbiBPYnNlcnZhYmxlIG9mIG5vdGlmaWNhdGlvbnMgd2l0aFxuICogd2hpY2ggYSB1c2VyIGNhbiBgY29tcGxldGVgIG9yIGBlcnJvcmAsIGFib3J0aW5nIHRoZSByZXBldGl0aW9uLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gVGhlIHNvdXJjZSBPYnNlcnZhYmxlIG1vZGlmaWVkIHdpdGggcmVwZWF0IGxvZ2ljLlxuICogQG1ldGhvZCByZXBlYXRXaGVuXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVwZWF0V2hlbjxUPihub3RpZmllcjogKG5vdGlmaWNhdGlvbnM6IE9ic2VydmFibGU8YW55PikgPT4gT2JzZXJ2YWJsZTxhbnk+KTogTW9ub1R5cGVPcGVyYXRvckZ1bmN0aW9uPFQ+IHtcbiAgcmV0dXJuIChzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IHNvdXJjZS5saWZ0KG5ldyBSZXBlYXRXaGVuT3BlcmF0b3Iobm90aWZpZXIpKTtcbn1cblxuY2xhc3MgUmVwZWF0V2hlbk9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVD4ge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgbm90aWZpZXI6IChub3RpZmljYXRpb25zOiBPYnNlcnZhYmxlPGFueT4pID0+IE9ic2VydmFibGU8YW55Pikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IGFueSk6IFRlYXJkb3duTG9naWMge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBSZXBlYXRXaGVuU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLm5vdGlmaWVyLCBzb3VyY2UpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgUmVwZWF0V2hlblN1YnNjcmliZXI8VCwgUj4gZXh0ZW5kcyBPdXRlclN1YnNjcmliZXI8VCwgUj4ge1xuXG4gIHByaXZhdGUgbm90aWZpY2F0aW9uczogU3ViamVjdDxhbnk+O1xuICBwcml2YXRlIHJldHJpZXM6IE9ic2VydmFibGU8YW55PjtcbiAgcHJpdmF0ZSByZXRyaWVzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgc291cmNlSXNCZWluZ1N1YnNjcmliZWRUbzogYm9vbGVhbiA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8Uj4sXG4gICAgICAgICAgICAgIHByaXZhdGUgbm90aWZpZXI6IChub3RpZmljYXRpb25zOiBPYnNlcnZhYmxlPGFueT4pID0+IE9ic2VydmFibGU8YW55PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzb3VyY2U6IE9ic2VydmFibGU8VD4pIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBub3RpZnlOZXh0KG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IFIsXG4gICAgICAgICAgICAgb3V0ZXJJbmRleDogbnVtYmVyLCBpbm5lckluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgaW5uZXJTdWI6IElubmVyU3Vic2NyaWJlcjxULCBSPik6IHZvaWQge1xuICAgIHRoaXMuc291cmNlSXNCZWluZ1N1YnNjcmliZWRUbyA9IHRydWU7XG4gICAgdGhpcy5zb3VyY2Uuc3Vic2NyaWJlKHRoaXMpO1xuICB9XG5cbiAgbm90aWZ5Q29tcGxldGUoaW5uZXJTdWI6IElubmVyU3Vic2NyaWJlcjxULCBSPik6IHZvaWQge1xuICAgIGlmICh0aGlzLnNvdXJjZUlzQmVpbmdTdWJzY3JpYmVkVG8gPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gc3VwZXIuY29tcGxldGUoKTtcbiAgICB9XG4gIH1cblxuICBjb21wbGV0ZSgpIHtcbiAgICB0aGlzLnNvdXJjZUlzQmVpbmdTdWJzY3JpYmVkVG8gPSBmYWxzZTtcblxuICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgIGlmICghdGhpcy5yZXRyaWVzKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlVG9SZXRyaWVzKCk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMucmV0cmllc1N1YnNjcmlwdGlvbiB8fCB0aGlzLnJldHJpZXNTdWJzY3JpcHRpb24uY2xvc2VkKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5jb21wbGV0ZSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl91bnN1YnNjcmliZUFuZFJlY3ljbGUoKTtcbiAgICAgIHRoaXMubm90aWZpY2F0aW9ucy5uZXh0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBkZXByZWNhdGVkIFRoaXMgaXMgYW4gaW50ZXJuYWwgaW1wbGVtZW50YXRpb24gZGV0YWlsLCBkbyBub3QgdXNlLiAqL1xuICBfdW5zdWJzY3JpYmUoKSB7XG4gICAgY29uc3QgeyBub3RpZmljYXRpb25zLCByZXRyaWVzU3Vic2NyaXB0aW9uIH0gPSB0aGlzO1xuICAgIGlmIChub3RpZmljYXRpb25zKSB7XG4gICAgICBub3RpZmljYXRpb25zLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLm5vdGlmaWNhdGlvbnMgPSBudWxsO1xuICAgIH1cbiAgICBpZiAocmV0cmllc1N1YnNjcmlwdGlvbikge1xuICAgICAgcmV0cmllc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5yZXRyaWVzU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5yZXRyaWVzID0gbnVsbDtcbiAgfVxuXG4gIC8qKiBAZGVwcmVjYXRlZCBUaGlzIGlzIGFuIGludGVybmFsIGltcGxlbWVudGF0aW9uIGRldGFpbCwgZG8gbm90IHVzZS4gKi9cbiAgX3Vuc3Vic2NyaWJlQW5kUmVjeWNsZSgpOiBTdWJzY3JpYmVyPFQ+IHtcbiAgICBjb25zdCB7IF91bnN1YnNjcmliZSB9ID0gdGhpcztcblxuICAgIHRoaXMuX3Vuc3Vic2NyaWJlID0gbnVsbDtcbiAgICBzdXBlci5fdW5zdWJzY3JpYmVBbmRSZWN5Y2xlKCk7XG4gICAgdGhpcy5fdW5zdWJzY3JpYmUgPSBfdW5zdWJzY3JpYmU7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9SZXRyaWVzKCkge1xuICAgIHRoaXMubm90aWZpY2F0aW9ucyA9IG5ldyBTdWJqZWN0KCk7XG4gICAgY29uc3QgcmV0cmllcyA9IHRyeUNhdGNoKHRoaXMubm90aWZpZXIpKHRoaXMubm90aWZpY2F0aW9ucyk7XG4gICAgaWYgKHJldHJpZXMgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICByZXR1cm4gc3VwZXIuY29tcGxldGUoKTtcbiAgICB9XG4gICAgdGhpcy5yZXRyaWVzID0gcmV0cmllcztcbiAgICB0aGlzLnJldHJpZXNTdWJzY3JpcHRpb24gPSBzdWJzY3JpYmVUb1Jlc3VsdCh0aGlzLCByZXRyaWVzKTtcbiAgfVxufVxuIl19