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
import { SubscriptionLoggable } from './SubscriptionLoggable';
import { applyMixins } from '../util/applyMixins';
var HotObservable = (function (_super) {
    __extends(HotObservable, _super);
    function HotObservable(messages, scheduler) {
        var _this = _super.call(this) || this;
        _this.messages = messages;
        _this.subscriptions = [];
        _this.scheduler = scheduler;
        return _this;
    }
    HotObservable.prototype._subscribe = function (subscriber) {
        var subject = this;
        var index = subject.logSubscribedFrame();
        var subscription = new Subscription();
        subscription.add(new Subscription(function () {
            subject.logUnsubscribedFrame(index);
        }));
        subscription.add(_super.prototype._subscribe.call(this, subscriber));
        return subscription;
    };
    HotObservable.prototype.setup = function () {
        var subject = this;
        var messagesLength = subject.messages.length;
        for (var i = 0; i < messagesLength; i++) {
            (function () {
                var message = subject.messages[i];
                subject.scheduler.schedule(function () { message.notification.observe(subject); }, message.frame);
            })();
        }
    };
    return HotObservable;
}(Subject));
export { HotObservable };
applyMixins(HotObservable, [SubscriptionLoggable]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSG90T2JzZXJ2YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2V4dGVybmFsL3J4anMvaW50ZXJuYWwvdGVzdGluZy9Ib3RPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRXJDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUkvQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFPbEQ7SUFBc0MsaUNBQVU7SUFNOUMsdUJBQW1CLFFBQXVCLEVBQzlCLFNBQW9CO1FBRGhDLFlBRUUsaUJBQU8sU0FFUjtRQUprQixjQUFRLEdBQVIsUUFBUSxDQUFlO1FBTG5DLG1CQUFhLEdBQXNCLEVBQUUsQ0FBQztRQVEzQyxLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQzs7SUFDN0IsQ0FBQztJQUdELGtDQUFVLEdBQVYsVUFBVyxVQUEyQjtRQUNwQyxJQUFNLE9BQU8sR0FBcUIsSUFBSSxDQUFDO1FBQ3ZDLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzNDLElBQU0sWUFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFlBQVksQ0FBQztZQUNoQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNKLFlBQVksQ0FBQyxHQUFHLENBQUMsaUJBQU0sVUFBVSxZQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDL0MsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUVELDZCQUFLLEdBQUw7UUFDRSxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFFL0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2QyxDQUFDO2dCQUNDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRWxDLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUN4QixjQUFRLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNoRCxPQUFPLENBQUMsS0FBSyxDQUNkLENBQUM7WUFDSixDQUFDLENBQUMsRUFBRSxDQUFDO1NBQ047SUFDSCxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBdkNELENBQXNDLE9BQU8sR0F1QzVDOztBQUNELFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAnLi4vU3ViamVjdCc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgU2NoZWR1bGVyIH0gZnJvbSAnLi4vU2NoZWR1bGVyJztcbmltcG9ydCB7IFRlc3RNZXNzYWdlIH0gZnJvbSAnLi9UZXN0TWVzc2FnZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25Mb2cgfSBmcm9tICcuL1N1YnNjcmlwdGlvbkxvZyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25Mb2dnYWJsZSB9IGZyb20gJy4vU3Vic2NyaXB0aW9uTG9nZ2FibGUnO1xuaW1wb3J0IHsgYXBwbHlNaXhpbnMgfSBmcm9tICcuLi91dGlsL2FwcGx5TWl4aW5zJztcblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmV4cG9ydCBjbGFzcyBIb3RPYnNlcnZhYmxlPFQ+IGV4dGVuZHMgU3ViamVjdDxUPiBpbXBsZW1lbnRzIFN1YnNjcmlwdGlvbkxvZ2dhYmxlIHtcbiAgcHVibGljIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbkxvZ1tdID0gW107XG4gIHNjaGVkdWxlcjogU2NoZWR1bGVyO1xuICBsb2dTdWJzY3JpYmVkRnJhbWU6ICgpID0+IG51bWJlcjtcbiAgbG9nVW5zdWJzY3JpYmVkRnJhbWU6IChpbmRleDogbnVtYmVyKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtZXNzYWdlczogVGVzdE1lc3NhZ2VbXSxcbiAgICAgICAgICAgICAgc2NoZWR1bGVyOiBTY2hlZHVsZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICB9XG5cbiAgLyoqIEBkZXByZWNhdGVkIFRoaXMgaXMgYW4gaW50ZXJuYWwgaW1wbGVtZW50YXRpb24gZGV0YWlsLCBkbyBub3QgdXNlLiAqL1xuICBfc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8YW55Pik6IFN1YnNjcmlwdGlvbiB7XG4gICAgY29uc3Qgc3ViamVjdDogSG90T2JzZXJ2YWJsZTxUPiA9IHRoaXM7XG4gICAgY29uc3QgaW5kZXggPSBzdWJqZWN0LmxvZ1N1YnNjcmliZWRGcmFtZSgpO1xuICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICBzdWJzY3JpcHRpb24uYWRkKG5ldyBTdWJzY3JpcHRpb24oKCkgPT4ge1xuICAgICAgc3ViamVjdC5sb2dVbnN1YnNjcmliZWRGcmFtZShpbmRleCk7XG4gICAgfSkpO1xuICAgIHN1YnNjcmlwdGlvbi5hZGQoc3VwZXIuX3N1YnNjcmliZShzdWJzY3JpYmVyKSk7XG4gICAgcmV0dXJuIHN1YnNjcmlwdGlvbjtcbiAgfVxuXG4gIHNldHVwKCkge1xuICAgIGNvbnN0IHN1YmplY3QgPSB0aGlzO1xuICAgIGNvbnN0IG1lc3NhZ2VzTGVuZ3RoID0gc3ViamVjdC5tZXNzYWdlcy5sZW5ndGg7XG4gICAgLyogdHNsaW50OmRpc2FibGU6bm8tdmFyLWtleXdvcmQgKi9cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1lc3NhZ2VzTGVuZ3RoOyBpKyspIHtcbiAgICAgICgoKSA9PiB7XG4gICAgICAgIHZhciBtZXNzYWdlID0gc3ViamVjdC5tZXNzYWdlc1tpXTtcbiAgIC8qIHRzbGludDplbmFibGUgKi9cbiAgICAgICAgc3ViamVjdC5zY2hlZHVsZXIuc2NoZWR1bGUoXG4gICAgICAgICAgKCkgPT4geyBtZXNzYWdlLm5vdGlmaWNhdGlvbi5vYnNlcnZlKHN1YmplY3QpOyB9LFxuICAgICAgICAgIG1lc3NhZ2UuZnJhbWVcbiAgICAgICAgKTtcbiAgICAgIH0pKCk7XG4gICAgfVxuICB9XG59XG5hcHBseU1peGlucyhIb3RPYnNlcnZhYmxlLCBbU3Vic2NyaXB0aW9uTG9nZ2FibGVdKTtcbiJdfQ==