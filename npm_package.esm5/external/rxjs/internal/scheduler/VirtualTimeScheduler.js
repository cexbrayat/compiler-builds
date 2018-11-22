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
import { AsyncAction } from './AsyncAction';
import { AsyncScheduler } from './AsyncScheduler';
var VirtualTimeScheduler = (function (_super) {
    __extends(VirtualTimeScheduler, _super);
    function VirtualTimeScheduler(SchedulerAction, maxFrames) {
        if (SchedulerAction === void 0) { SchedulerAction = VirtualAction; }
        if (maxFrames === void 0) { maxFrames = Number.POSITIVE_INFINITY; }
        var _this = _super.call(this, SchedulerAction, function () { return _this.frame; }) || this;
        _this.maxFrames = maxFrames;
        _this.frame = 0;
        _this.index = -1;
        return _this;
    }
    VirtualTimeScheduler.prototype.flush = function () {
        var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
        var error, action;
        while ((action = actions.shift()) && (this.frame = action.delay) <= maxFrames) {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        }
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    VirtualTimeScheduler.frameTimeFactor = 10;
    return VirtualTimeScheduler;
}(AsyncScheduler));
export { VirtualTimeScheduler };
var VirtualAction = (function (_super) {
    __extends(VirtualAction, _super);
    function VirtualAction(scheduler, work, index) {
        if (index === void 0) { index = scheduler.index += 1; }
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.index = index;
        _this.active = true;
        _this.index = scheduler.index = index;
        return _this;
    }
    VirtualAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) { delay = 0; }
        if (!this.id) {
            return _super.prototype.schedule.call(this, state, delay);
        }
        this.active = false;
        var action = new VirtualAction(this.scheduler, this.work);
        this.add(action);
        return action.schedule(state, delay);
    };
    VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        this.delay = scheduler.frame + delay;
        var actions = scheduler.actions;
        actions.push(this);
        actions.sort(VirtualAction.sortActions);
        return true;
    };
    VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) { delay = 0; }
        return undefined;
    };
    VirtualAction.prototype._execute = function (state, delay) {
        if (this.active === true) {
            return _super.prototype._execute.call(this, state, delay);
        }
    };
    VirtualAction.sortActions = function (a, b) {
        if (a.delay === b.delay) {
            if (a.index === b.index) {
                return 0;
            }
            else if (a.index > b.index) {
                return 1;
            }
            else {
                return -1;
            }
        }
        else if (a.delay > b.delay) {
            return 1;
        }
        else {
            return -1;
        }
    };
    return VirtualAction;
}(AsyncAction));
export { VirtualAction };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlydHVhbFRpbWVTY2hlZHVsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9leHRlcm5hbC9yeGpzL2ludGVybmFsL3NjaGVkdWxlci9WaXJ0dWFsVGltZVNjaGVkdWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFHbEQ7SUFBMEMsd0NBQWM7SUFPdEQsOEJBQVksZUFBMEQsRUFDbkQsU0FBNEM7UUFEbkQsZ0NBQUEsRUFBQSxrQkFBc0MsYUFBb0I7UUFDbkQsMEJBQUEsRUFBQSxZQUFvQixNQUFNLENBQUMsaUJBQWlCO1FBRC9ELFlBRUUsa0JBQU0sZUFBZSxFQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsS0FBSyxFQUFWLENBQVUsQ0FBQyxTQUN6QztRQUZrQixlQUFTLEdBQVQsU0FBUyxDQUFtQztRQUp4RCxXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLFdBQUssR0FBVyxDQUFDLENBQUMsQ0FBQzs7SUFLMUIsQ0FBQztJQU9NLG9DQUFLLEdBQVo7UUFFUSxJQUFBLFNBQTJCLEVBQTFCLG9CQUFPLEVBQUUsd0JBQWlCLENBQUM7UUFDbEMsSUFBSSxLQUFVLEVBQUUsTUFBd0IsQ0FBQztRQUV6QyxPQUFPLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksU0FBUyxFQUFFO1lBQzdFLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3RELE1BQU07YUFDUDtTQUNGO1FBRUQsSUFBSSxLQUFL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U0FDVjthQUFNO1lBQ0wsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNYO0lBQ0gsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQTFERCxDQUFzQyxXQUFXLEdBMERoRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzeW5jQWN0aW9uIH0gZnJvbSAnLi9Bc3luY0FjdGlvbic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgQXN5bmNTY2hlZHVsZXIgfSBmcm9tICcuL0FzeW5jU2NoZWR1bGVyJztcbmltcG9ydCB7IFNjaGVkdWxlckFjdGlvbiB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGNsYXNzIFZpcnR1YWxUaW1lU2NoZWR1bGVyIGV4dGVuZHMgQXN5bmNTY2hlZHVsZXIge1xuXG4gIHByb3RlY3RlZCBzdGF0aWMgZnJhbWVUaW1lRmFjdG9yOiBudW1iZXIgPSAxMDtcblxuICBwdWJsaWMgZnJhbWU6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBpbmRleDogbnVtYmVyID0gLTE7XG5cbiAgY29uc3RydWN0b3IoU2NoZWR1bGVyQWN0aW9uOiB0eXBlb2YgQXN5bmNBY3Rpb24gPSBWaXJ0dWFsQWN0aW9uIGFzIGFueSxcbiAgICAgICAgICAgICAgcHVibGljIG1heEZyYW1lczogbnVtYmVyID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZKSB7XG4gICAgc3VwZXIoU2NoZWR1bGVyQWN0aW9uLCAoKSA9PiB0aGlzLmZyYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9tcHQgdGhlIFNjaGVkdWxlciB0byBleGVjdXRlIGFsbCBvZiBpdHMgcXVldWVkIGFjdGlvbnMsIHRoZXJlZm9yZVxuICAgKiBjbGVhcmluZyBpdHMgcXVldWUuXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBwdWJsaWMgZmx1c2goKTogdm9pZCB7XG5cbiAgICBjb25zdCB7YWN0aW9ucywgbWF4RnJhbWVzfSA9IHRoaXM7XG4gICAgbGV0IGVycm9yOiBhbnksIGFjdGlvbjogQXN5bmNBY3Rpb248YW55PjtcblxuICAgIHdoaWxlICgoYWN0aW9uID0gYWN0aW9ucy5zaGlmdCgpKSAmJiAodGhpcy5mcmFtZSA9IGFjdGlvbi5kZWxheSkgPD0gbWF4RnJhbWVzKSB7XG4gICAgICBpZiAoZXJyb3IgPSBhY3Rpb24uZXhlY3V0ZShhY3Rpb24uc3RhdGUsIGFjdGlvbi5kZWxheSkpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGVycm9yKSB7XG4gICAgICB3aGlsZSAoYWN0aW9uID0gYWN0aW9ucy5zaGlmdCgpKSB7XG4gICAgICAgIGFjdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBub2RvY1xuICovXG5leHBvcnQgY2xhc3MgVmlydHVhbEFjdGlvbjxUPiBleHRlbmRzIEFzeW5jQWN0aW9uPFQ+IHtcblxuICBwcm90ZWN0ZWQgYWN0aXZlOiBib29sZWFuID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgc2NoZWR1bGVyOiBWaXJ0dWFsVGltZVNjaGVkdWxlcixcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIHdvcms6ICh0aGlzOiBTY2hlZHVsZXJBY3Rpb248VD4sIHN0YXRlPzogVCkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIGluZGV4OiBudW1iZXIgPSBzY2hlZHVsZXIuaW5kZXggKz0gMSkge1xuICAgIHN1cGVyKHNjaGVkdWxlciwgd29yayk7XG4gICAgdGhpcy5pbmRleCA9IHNjaGVkdWxlci5pbmRleCA9IGluZGV4O1xuICB9XG5cbiAgcHVibGljIHNjaGVkdWxlKHN0YXRlPzogVCwgZGVsYXk6IG51bWJlciA9IDApOiBTdWJzY3JpcHRpb24ge1xuICAgIGlmICghdGhpcy5pZCkge1xuICAgICAgcmV0dXJuIHN1cGVyLnNjaGVkdWxlKHN0YXRlLCBkZWxheSk7XG4gICAgfVxuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgLy8gSWYgYW4gYWN0aW9uIGlzIHJlc2NoZWR1bGVkLCB3ZSBzYXZlIGFsbG9jYXRpb25zIGJ5IG11dGF0aW5nIGl0cyBzdGF0ZSxcbiAgICAvLyBwdXNoaW5nIGl0IHRvIHRoZSBlbmQgb2YgdGhlIHNjaGVkdWxlciBxdWV1ZSwgYW5kIHJlY3ljbGluZyB0aGUgYWN0aW9uLlxuICAgIC8vIEJ1dCBzaW5jZSB0aGUgVmlydHVhbFRpbWVTY2hlZHVsZXIgaXMgdXNlZCBmb3IgdGVzdGluZywgVmlydHVhbEFjdGlvbnNcbiAgICAvLyBtdXN0IGJlIGltbXV0YWJsZSBzbyB0aGV5IGNhbiBiZSBpbnNwZWN0ZWQgbGF0ZXIuXG4gICAgY29uc3QgYWN0aW9uID0gbmV3IFZpcnR1YWxBY3Rpb24odGhpcy5zY2hlZHVsZXIsIHRoaXMud29yayk7XG4gICAgdGhpcy5hZGQoYWN0aW9uKTtcbiAgICByZXR1cm4gYWN0aW9uLnNjaGVkdWxlKHN0YXRlLCBkZWxheSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVxdWVzdEFzeW5jSWQoc2NoZWR1bGVyOiBWaXJ0dWFsVGltZVNjaGVkdWxlciwgaWQ/OiBhbnksIGRlbGF5OiBudW1iZXIgPSAwKTogYW55IHtcbiAgICB0aGlzLmRlbGF5ID0gc2NoZWR1bGVyLmZyYW1lICsgZGVsYXk7XG4gICAgY29uc3Qge2FjdGlvbnN9ID0gc2NoZWR1bGVyO1xuICAgIGFjdGlvbnMucHVzaCh0aGlzKTtcbiAgICAoYWN0aW9ucyBhcyBBcnJheTxWaXJ0dWFsQWN0aW9uPFQ+Pikuc29ydChWaXJ0dWFsQWN0aW9uLnNvcnRBY3Rpb25zKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZWN5Y2xlQXN5bmNJZChzY2hlZHVsZXI6IFZpcnR1YWxUaW1lU2NoZWR1bGVyLCBpZD86IGFueSwgZGVsYXk6IG51bWJlciA9IDApOiBhbnkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2V4ZWN1dGUoc3RhdGU6IFQsIGRlbGF5OiBudW1iZXIpOiBhbnkge1xuICAgIGlmICh0aGlzLmFjdGl2ZSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIHN1cGVyLl9leGVjdXRlKHN0YXRlLCBkZWxheSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBzb3J0QWN0aW9uczxUPihhOiBWaXJ0dWFsQWN0aW9uPFQ+LCBiOiBWaXJ0dWFsQWN0aW9uPFQ+KSB7XG4gICAgaWYgKGEuZGVsYXkgPT09IGIuZGVsYXkpIHtcbiAgICAgIGlmIChhLmluZGV4ID09PSBiLmluZGV4KSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfSBlbHNlIGlmIChhLmluZGV4ID4gYi5pbmRleCkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGEuZGVsYXkgPiBiLmRlbGF5KSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgfVxufVxuIl19