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
import { Subscription } from '../Subscription';
import { SubscriptionLoggable } from './SubscriptionLoggable';
import { applyMixins } from '../util/applyMixins';
var ColdObservable = (function (_super) {
    __extends(ColdObservable, _super);
    function ColdObservable(messages, scheduler) {
        var _this = _super.call(this, function (subscriber) {
            var observable = this;
            var index = observable.logSubscribedFrame();
            var subscription = new Subscription();
            subscription.add(new Subscription(function () {
                observable.logUnsubscribedFrame(index);
            }));
            observable.scheduleMessages(subscriber);
            return subscription;
        }) || this;
        _this.messages = messages;
        _this.subscriptions = [];
        _this.scheduler = scheduler;
        return _this;
    }
    ColdObservable.prototype.scheduleMessages = function (subscriber) {
        var messagesLength = this.messages.length;
        for (var i = 0; i < messagesLength; i++) {
            var message = this.messages[i];
            subscriber.add(this.scheduler.schedule(function (_a) {
                var message = _a.message, subscriber = _a.subscriber;
                message.notification.observe(subscriber);
            }, message.frame, { message: message, subscriber: subscriber }));
        }
    };
    return ColdObservable;
}(Observable));
export { ColdObservable };
applyMixins(ColdObservable, [SubscriptionLoggable]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sZE9ic2VydmFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9leHRlcm5hbC9yeGpzL2ludGVybmFsL3Rlc3RpbmcvQ29sZE9ic2VydmFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBSS9DLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQVFsRDtJQUF1QyxrQ0FBYTtJQU1sRCx3QkFBbUIsUUFBdUIsRUFDOUIsU0FBb0I7UUFEaEMsWUFFRSxrQkFBTSxVQUErQixVQUEyQjtZQUM5RCxJQUFNLFVBQVUsR0FBc0IsSUFBVyxDQUFDO1lBQ2xELElBQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzlDLElBQU0sWUFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7WUFDeEMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFlBQVksQ0FBQztnQkFDaEMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDSixVQUFVLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDeEMsT0FBTyxZQUFZLENBQUM7UUFDdEIsQ0FBQyxDQUFDLFNBRUg7UUFia0IsY0FBUSxHQUFSLFFBQVEsQ0FBZTtRQUxuQyxtQkFBYSxHQUFzQixFQUFFLENBQUM7UUFpQjNDLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDOztJQUM3QixDQUFDO0lBRUQseUNBQWdCLEdBQWhCLFVBQWlCLFVBQTJCO1FBQzFDLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQzVDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxjQUFjLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxVQUFVLENBQUMsR0FBRyxDQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQUMsRUFBdUI7b0JBQXJCLG9CQUFPLEVBQUUsMEJBQVU7Z0JBQVMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFBQyxDQUFDLEVBQ2hHLE9BQU8sQ0FBQyxLQUFLLEVBQ2IsRUFBRSxPQUFPLFNBQUEsRUFBRSxVQUFVLFlBQUEsRUFBRSxDQUFDLENBQzNCLENBQUM7U0FDSDtJQUNILENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUFoQ0QsQ0FBdUMsVUFBVSxHQWdDaEQ7O0FBQ0QsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBTY2hlZHVsZXIgfSBmcm9tICcuLi9TY2hlZHVsZXInO1xuaW1wb3J0IHsgVGVzdE1lc3NhZ2UgfSBmcm9tICcuL1Rlc3RNZXNzYWdlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbkxvZyB9IGZyb20gJy4vU3Vic2NyaXB0aW9uTG9nJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbkxvZ2dhYmxlIH0gZnJvbSAnLi9TdWJzY3JpcHRpb25Mb2dnYWJsZSc7XG5pbXBvcnQgeyBhcHBseU1peGlucyB9IGZyb20gJy4uL3V0aWwvYXBwbHlNaXhpbnMnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuZXhwb3J0IGNsYXNzIENvbGRPYnNlcnZhYmxlPFQ+IGV4dGVuZHMgT2JzZXJ2YWJsZTxUPiBpbXBsZW1lbnRzIFN1YnNjcmlwdGlvbkxvZ2dhYmxlIHtcbiAgcHVibGljIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbkxvZ1tdID0gW107XG4gIHNjaGVkdWxlcjogU2NoZWR1bGVyO1xuICBsb2dTdWJzY3JpYmVkRnJhbWU6ICgpID0+IG51bWJlcjtcbiAgbG9nVW5zdWJzY3JpYmVkRnJhbWU6IChpbmRleDogbnVtYmVyKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtZXNzYWdlczogVGVzdE1lc3NhZ2VbXSxcbiAgICAgICAgICAgICAgc2NoZWR1bGVyOiBTY2hlZHVsZXIpIHtcbiAgICBzdXBlcihmdW5jdGlvbiAodGhpczogT2JzZXJ2YWJsZTxUPiwgc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxhbnk+KSB7XG4gICAgICBjb25zdCBvYnNlcnZhYmxlOiBDb2xkT2JzZXJ2YWJsZTxUPiA9IHRoaXMgYXMgYW55O1xuICAgICAgY29uc3QgaW5kZXggPSBvYnNlcnZhYmxlLmxvZ1N1YnNjcmliZWRGcmFtZSgpO1xuICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgICAgc3Vic2NyaXB0aW9uLmFkZChuZXcgU3Vic2NyaXB0aW9uKCgpID0+IHtcbiAgICAgICAgb2JzZXJ2YWJsZS5sb2dVbnN1YnNjcmliZWRGcmFtZShpbmRleCk7XG4gICAgICB9KSk7XG4gICAgICBvYnNlcnZhYmxlLnNjaGVkdWxlTWVzc2FnZXMoc3Vic2NyaWJlcik7XG4gICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgIH0pO1xuICAgIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICB9XG5cbiAgc2NoZWR1bGVNZXNzYWdlcyhzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPGFueT4pIHtcbiAgICBjb25zdCBtZXNzYWdlc0xlbmd0aCA9IHRoaXMubWVzc2FnZXMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVzc2FnZXNMZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IHRoaXMubWVzc2FnZXNbaV07XG4gICAgICBzdWJzY3JpYmVyLmFkZChcbiAgICAgICAgdGhpcy5zY2hlZHVsZXIuc2NoZWR1bGUoKHsgbWVzc2FnZSwgc3Vic2NyaWJlciB9KSA9PiB7IG1lc3NhZ2Uubm90aWZpY2F0aW9uLm9ic2VydmUoc3Vic2NyaWJlcik7IH0sXG4gICAgICAgICAgbWVzc2FnZS5mcmFtZSxcbiAgICAgICAgICB7IG1lc3NhZ2UsIHN1YnNjcmliZXIgfSlcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5hcHBseU1peGlucyhDb2xkT2JzZXJ2YWJsZSwgW1N1YnNjcmlwdGlvbkxvZ2dhYmxlXSk7XG4iXX0=