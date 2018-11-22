import { async } from '../scheduler/async';
import { scan } from './scan';
import { defer } from '../observable/defer';
import { map } from './map';
export function timeInterval(scheduler) {
    if (scheduler === void 0) { scheduler = async; }
    return function (source) { return defer(function () {
        return source.pipe(scan(function (_a, value) {
            var current = _a.current;
            return ({ value: value, current: scheduler.now(), last: current });
        }, { current: scheduler.now(), value: undefined, last: undefined }), map(function (_a) {
            var current = _a.current, last = _a.last, value = _a.value;
            return new TimeInterval(value, current - last);
        }));
    }); };
}
var TimeInterval = (function () {
    function TimeInterval(value, interval) {
        this.value = value;
        this.interval = interval;
    }
    return TimeInterval;
}());
export { TimeInterval };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZUludGVydmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZXh0ZXJuYWwvcnhqcy9pbnRlcm5hbC9vcGVyYXRvcnMvdGltZUludGVydmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzlCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM1QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBRTVCLE1BQU0sVUFBVSxZQUFZLENBQUksU0FBZ0M7SUFBaEMsMEJBQUEsRUFBQSxpQkFBZ0M7SUFDOUQsT0FBTyxVQUFDLE1BQXFCLElBQUssT0FBQSxLQUFLLENBQUM7UUFDdEMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUVoQixJQUFJLENBQ0YsVUFBQyxFQUFXLEVBQUUsS0FBSztnQkFBaEIsb0JBQU87WUFBYyxPQUFBLENBQUMsRUFBRSxLQUFLLE9BQUEsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQztRQUFwRCxDQUFvRCxFQUM1RSxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRyxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQzFELEVBQ1IsR0FBRyxDQUF1QixVQUFDLEVBQXdCO2dCQUF0QixvQkFBTyxFQUFFLGNBQUksRUFBRSxnQkFBSztZQUFPLE9BQUEsSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFBdkMsQ0FBdUMsQ0FBQyxDQUNqRyxDQUFDO0lBQ0osQ0FBQyxDQUFDLEVBVGdDLENBU2hDLENBQUM7QUFDTCxDQUFDO0FBRUQ7SUFDRSxzQkFBbUIsS0FBUSxFQUFTLFFBQWdCO1FBQWpDLFVBQUssR0FBTCxLQUFLLENBQUc7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFRO0lBQUcsQ0FBQztJQUMxRCxtQkFBQztBQUFELENBQUMsQUFGRCxJQUVDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBhc3luYyB9IGZyb20gJy4uL3NjaGVkdWxlci9hc3luYyc7XG5pbXBvcnQgeyBTY2hlZHVsZXJMaWtlLCBPcGVyYXRvckZ1bmN0aW9uIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgc2NhbiB9IGZyb20gJy4vc2Nhbic7XG5pbXBvcnQgeyBkZWZlciB9IGZyb20gJy4uL29ic2VydmFibGUvZGVmZXInO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAnLi9tYXAnO1xuXG5leHBvcnQgZnVuY3Rpb24gdGltZUludGVydmFsPFQ+KHNjaGVkdWxlcjogU2NoZWR1bGVyTGlrZSA9IGFzeW5jKTogT3BlcmF0b3JGdW5jdGlvbjxULCBUaW1lSW50ZXJ2YWw8VD4+IHtcbiAgcmV0dXJuIChzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IGRlZmVyKCgpID0+IHtcbiAgICByZXR1cm4gc291cmNlLnBpcGUoXG4gICAgICAvLyBIQUNLOiB0aGUgdHlwaW5ncyBzZWVtIG9mZiB3aXRoIHNjYW5cbiAgICAgIHNjYW4oXG4gICAgICAgICh7IGN1cnJlbnQgfSwgdmFsdWUpID0+ICh7IHZhbHVlLCBjdXJyZW50OiBzY2hlZHVsZXIubm93KCksIGxhc3Q6IGN1cnJlbnQgfSksXG4gICAgICAgIHsgY3VycmVudDogc2NoZWR1bGVyLm5vdygpLCB2YWx1ZTogdW5kZWZpbmVkLCAgbGFzdDogdW5kZWZpbmVkIH1cbiAgICAgICkgYXMgYW55LFxuICAgICAgbWFwPGFueSwgVGltZUludGVydmFsPFQ+PigoeyBjdXJyZW50LCBsYXN0LCB2YWx1ZSB9KSA9PiBuZXcgVGltZUludGVydmFsKHZhbHVlLCBjdXJyZW50IC0gbGFzdCkpLFxuICAgICk7XG4gIH0pO1xufVxuXG5leHBvcnQgY2xhc3MgVGltZUludGVydmFsPFQ+IHtcbiAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBULCBwdWJsaWMgaW50ZXJ2YWw6IG51bWJlcikge31cbn1cbiJdfQ==