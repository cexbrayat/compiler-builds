import { async } from '../scheduler/async';
import { isDate } from '../util/isDate';
import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
export function timeoutWith(due, withObservable, scheduler = async) {
    return (source) => {
        let absoluteTimeout = isDate(due);
        let waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(due);
        return source.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
    };
}
class TimeoutWithOperator {
    constructor(waitFor, absoluteTimeout, withObservable, scheduler) {
        this.waitFor = waitFor;
        this.absoluteTimeout = absoluteTimeout;
        this.withObservable = withObservable;
        this.scheduler = scheduler;
    }
    call(subscriber, source) {
        return source.subscribe(new TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler));
    }
}
class TimeoutWithSubscriber extends OuterSubscriber {
    constructor(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
        super(destination);
        this.absoluteTimeout = absoluteTimeout;
        this.waitFor = waitFor;
        this.withObservable = withObservable;
        this.scheduler = scheduler;
        this.action = null;
        this.scheduleTimeout();
    }
    static dispatchTimeout(subscriber) {
        const { withObservable } = subscriber;
        subscriber._unsubscribeAndRecycle();
        subscriber.add(subscribeToResult(subscriber, withObservable));
    }
    scheduleTimeout() {
        const { action } = this;
        if (action) {
            this.action = action.schedule(this, this.waitFor);
        }
        else {
            this.add(this.action = this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, this));
        }
    }
    _next(value) {
        if (!this.absoluteTimeout) {
            this.scheduleTimeout();
        }
        super._next(value);
    }
    _unsubscribe() {
        this.action = null;
        this.scheduler = null;
        this.withObservable = null;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZW91dFdpdGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9leHRlcm5hbC9yeGpzL2ludGVybmFsL29wZXJhdG9ycy90aW1lb3V0V2l0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQXlEOUQsTUFBTSxVQUFVLFdBQVcsQ0FBTyxHQUFrQixFQUNsQixjQUFrQyxFQUNsQyxZQUEyQixLQUFLO0lBQ2hFLE9BQU8sQ0FBQyxNQUFxQixFQUFFLEVBQUU7UUFDL0IsSUFBSSxlQUFlLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLElBQUksT0FBTyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBUyxHQUFHLENBQUMsQ0FBQztRQUNqRixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ25HLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLG1CQUFtQjtJQUN2QixZQUFvQixPQUFlLEVBQ2YsZUFBd0IsRUFDeEIsY0FBb0MsRUFDcEMsU0FBd0I7UUFIeEIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLG9CQUFlLEdBQWYsZUFBZSxDQUFTO1FBQ3hCLG1CQUFjLEdBQWQsY0FBYyxDQUFzQjtRQUNwQyxjQUFTLEdBQVQsU0FBUyxDQUFlO0lBQzVDLENBQUM7SUFFRCxJQUFJLENBQUMsVUFBeUIsRUFBRSxNQUFXO1FBQ3pDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLHFCQUFxQixDQUMvQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FDcEYsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBT0QsTUFBTSxxQkFBNEIsU0FBUSxlQUFxQjtJQUk3RCxZQUFZLFdBQTBCLEVBQ2xCLGVBQXdCLEVBQ3hCLE9BQWUsRUFDZixjQUFvQyxFQUNwQyxTQUF3QjtRQUMxQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFKRCxvQkFBZSxHQUFmLGVBQWUsQ0FBUztRQUN4QixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsbUJBQWMsR0FBZCxjQUFjLENBQXNCO1FBQ3BDLGNBQVMsR0FBVCxTQUFTLENBQWU7UUFOcEMsV0FBTSxHQUFpRCxJQUFJLENBQUM7UUFRbEUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFTyxNQUFNLENBQUMsZUFBZSxDQUFPLFVBQXVDO1FBQzFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsR0FBRyxVQUFVLENBQUM7UUFDL0IsVUFBVyxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDNUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRU8sZUFBZTtRQUNyQixNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksTUFBTSxFQUFFO1lBTVYsSUFBSSxDQUFDLE1BQU0sR0FBbUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBRSxDQUFDO1NBQ3BHO2FBQU07WUFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQW1ELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUM1RixxQkFBcUIsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQ3pELENBQUMsQ0FBQztTQUNMO0lBQ0gsQ0FBQztJQUVTLEtBQUssQ0FBQyxLQUFRO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN4QjtRQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUdELFlBQVk7UUFDVixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztJQUM3QixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IGFzeW5jIH0gZnJvbSAnLi4vc2NoZWR1bGVyL2FzeW5jJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGlzRGF0ZSB9IGZyb20gJy4uL3V0aWwvaXNEYXRlJztcbmltcG9ydCB7IE91dGVyU3Vic2NyaWJlciB9IGZyb20gJy4uL091dGVyU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBzdWJzY3JpYmVUb1Jlc3VsdCB9IGZyb20gJy4uL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUlucHV0LCBPcGVyYXRvckZ1bmN0aW9uLCBNb25vVHlwZU9wZXJhdG9yRnVuY3Rpb24sIFNjaGVkdWxlckFjdGlvbiwgU2NoZWR1bGVyTGlrZSwgVGVhcmRvd25Mb2dpYyB9IGZyb20gJy4uL3R5cGVzJztcblxuLyogdHNsaW50OmRpc2FibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5leHBvcnQgZnVuY3Rpb24gdGltZW91dFdpdGg8VCwgUj4oZHVlOiBudW1iZXIgfCBEYXRlLCB3aXRoT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZUlucHV0PFI+LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogT3BlcmF0b3JGdW5jdGlvbjxULCBUIHwgUj47XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuXG4vKipcbiAqXG4gKiBFcnJvcnMgaWYgT2JzZXJ2YWJsZSBkb2VzIG5vdCBlbWl0IGEgdmFsdWUgaW4gZ2l2ZW4gdGltZSBzcGFuLCBpbiBjYXNlIG9mIHdoaWNoXG4gKiBzdWJzY3JpYmVzIHRvIHRoZSBzZWNvbmQgT2JzZXJ2YWJsZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SXQncyBhIHZlcnNpb24gb2YgYHRpbWVvdXRgIG9wZXJhdG9yIHRoYXQgbGV0J3MgeW91IHNwZWNpZnkgZmFsbGJhY2sgT2JzZXJ2YWJsZS48L3NwYW4+XG4gKlxuICogIVtdKHRpbWVvdXRXaXRoLnBuZylcbiAqXG4gKiBgdGltZW91dFdpdGhgIGlzIGEgdmFyaWF0aW9uIG9mIGB0aW1lb3V0YCBvcGVyYXRvci4gSXQgYmVoYXZlcyBleGFjdGx5IHRoZSBzYW1lLFxuICogc3RpbGwgYWNjZXB0aW5nIGFzIGEgZmlyc3QgYXJndW1lbnQgZWl0aGVyIGEgbnVtYmVyIG9yIGEgRGF0ZSwgd2hpY2ggY29udHJvbCAtIHJlc3BlY3RpdmVseSAtXG4gKiB3aGVuIHZhbHVlcyBvZiBzb3VyY2UgT2JzZXJ2YWJsZSBzaG91bGQgYmUgZW1pdHRlZCBvciB3aGVuIGl0IHNob3VsZCBjb21wbGV0ZS5cbiAqXG4gKiBUaGUgb25seSBkaWZmZXJlbmNlIGlzIHRoYXQgaXQgYWNjZXB0cyBhIHNlY29uZCwgcmVxdWlyZWQgcGFyYW1ldGVyLiBUaGlzIHBhcmFtZXRlclxuICogc2hvdWxkIGJlIGFuIE9ic2VydmFibGUgd2hpY2ggd2lsbCBiZSBzdWJzY3JpYmVkIHdoZW4gc291cmNlIE9ic2VydmFibGUgZmFpbHMgYW55IHRpbWVvdXQgY2hlY2suXG4gKiBTbyB3aGVuZXZlciByZWd1bGFyIGB0aW1lb3V0YCB3b3VsZCBlbWl0IGFuIGVycm9yLCBgdGltZW91dFdpdGhgIHdpbGwgaW5zdGVhZCBzdGFydCByZS1lbWl0dGluZ1xuICogdmFsdWVzIGZyb20gc2Vjb25kIE9ic2VydmFibGUuIE5vdGUgdGhhdCB0aGlzIGZhbGxiYWNrIE9ic2VydmFibGUgaXMgbm90IGNoZWNrZWQgZm9yIHRpbWVvdXRzXG4gKiBpdHNlbGYsIHNvIGl0IGNhbiBlbWl0IHZhbHVlcyBhbmQgY29tcGxldGUgYXQgYXJiaXRyYXJ5IHBvaW50cyBpbiB0aW1lLiBGcm9tIHRoZSBtb21lbnQgb2YgYSBzZWNvbmRcbiAqIHN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSByZXR1cm5lZCBmcm9tIGB0aW1lb3V0V2l0aGAgc2ltcGx5IG1pcnJvcnMgZmFsbGJhY2sgc3RyZWFtLiBXaGVuIHRoYXRcbiAqIHN0cmVhbSBjb21wbGV0ZXMsIGl0IGNvbXBsZXRlcyBhcyB3ZWxsLlxuICpcbiAqIFNjaGVkdWxlciwgd2hpY2ggaW4gY2FzZSBvZiBgdGltZW91dGAgaXMgcHJvdmlkZWQgYXMgYXMgc2Vjb25kIGFyZ3VtZW50LCBjYW4gYmUgc3RpbGwgcHJvdmlkZWRcbiAqIGhlcmUgLSBhcyBhIHRoaXJkLCBvcHRpb25hbCBwYXJhbWV0ZXIuIEl0IHN0aWxsIGlzIHVzZWQgdG8gc2NoZWR1bGUgdGltZW91dCBjaGVja3MgYW5kIC1cbiAqIGFzIGEgY29uc2VxdWVuY2UgLSB3aGVuIHNlY29uZCBPYnNlcnZhYmxlIHdpbGwgYmUgc3Vic2NyaWJlZCwgc2luY2Ugc3Vic2NyaXB0aW9uIGhhcHBlbnNcbiAqIGltbWVkaWF0ZWx5IGFmdGVyIGZhaWxpbmcgY2hlY2suXG4gKlxuICogIyMgRXhhbXBsZVxuICogQWRkIGZhbGxiYWNrIG9ic2VydmFibGVcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGNvbnN0IHNlY29uZHMgPSBpbnRlcnZhbCgxMDAwKTtcbiAqIGNvbnN0IG1pbnV0ZXMgPSBpbnRlcnZhbCg2MCAqIDEwMDApO1xuICpcbiAqIHNlY29uZHMucGlwZSh0aW1lb3V0V2l0aCg5MDAsIG1pbnV0ZXMpKVxuICogICAuc3Vic2NyaWJlKFxuICogICAgIHZhbHVlID0+IGNvbnNvbGUubG9nKHZhbHVlKSwgLy8gQWZ0ZXIgOTAwbXMsIHdpbGwgc3RhcnQgZW1pdHRpbmcgYG1pbnV0ZXNgLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2luY2UgZmlyc3QgdmFsdWUgb2YgYHNlY29uZHNgIHdpbGwgbm90IGFycml2ZSBmYXN0IGVub3VnaC5cbiAqICAgICBlcnIgPT4gY29uc29sZS5sb2coZXJyKSwgICAgIC8vIFdvdWxkIGJlIGNhbGxlZCBhZnRlciA5MDBtcyBpbiBjYXNlIG9mIGB0aW1lb3V0YCxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJ1dCBoZXJlIHdpbGwgbmV2ZXIgYmUgY2FsbGVkLlxuICogICApO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtudW1iZXJ8RGF0ZX0gZHVlIE51bWJlciBzcGVjaWZ5aW5nIHBlcmlvZCB3aXRoaW4gd2hpY2ggT2JzZXJ2YWJsZSBtdXN0IGVtaXQgdmFsdWVzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgb3IgRGF0ZSBzcGVjaWZ5aW5nIGJlZm9yZSB3aGVuIE9ic2VydmFibGUgc2hvdWxkIGNvbXBsZXRlXG4gKiBAcGFyYW0ge09ic2VydmFibGU8VD59IHdpdGhPYnNlcnZhYmxlIE9ic2VydmFibGUgd2hpY2ggd2lsbCBiZSBzdWJzY3JpYmVkIGlmIHNvdXJjZSBmYWlscyB0aW1lb3V0IGNoZWNrLlxuICogQHBhcmFtIHtTY2hlZHVsZXJMaWtlfSBbc2NoZWR1bGVyXSBTY2hlZHVsZXIgY29udHJvbGxpbmcgd2hlbiB0aW1lb3V0IGNoZWNrcyBvY2N1ci5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8VD59IE9ic2VydmFibGUgdGhhdCBtaXJyb3JzIGJlaGF2aW91ciBvZiBzb3VyY2Ugb3IsIHdoZW4gdGltZW91dCBjaGVjayBmYWlscywgb2YgYW4gT2JzZXJ2YWJsZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgIHBhc3NlZCBhcyBhIHNlY29uZCBwYXJhbWV0ZXIuXG4gKiBAbWV0aG9kIHRpbWVvdXRXaXRoXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGltZW91dFdpdGg8VCwgUj4oZHVlOiBudW1iZXIgfCBEYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGhPYnNlcnZhYmxlOiBPYnNlcnZhYmxlSW5wdXQ8Uj4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVyOiBTY2hlZHVsZXJMaWtlID0gYXN5bmMpOiBPcGVyYXRvckZ1bmN0aW9uPFQsIFQgfCBSPiB7XG4gIHJldHVybiAoc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiB7XG4gICAgbGV0IGFic29sdXRlVGltZW91dCA9IGlzRGF0ZShkdWUpO1xuICAgIGxldCB3YWl0Rm9yID0gYWJzb2x1dGVUaW1lb3V0ID8gKCtkdWUgLSBzY2hlZHVsZXIubm93KCkpIDogTWF0aC5hYnMoPG51bWJlcj5kdWUpO1xuICAgIHJldHVybiBzb3VyY2UubGlmdChuZXcgVGltZW91dFdpdGhPcGVyYXRvcih3YWl0Rm9yLCBhYnNvbHV0ZVRpbWVvdXQsIHdpdGhPYnNlcnZhYmxlLCBzY2hlZHVsZXIpKTtcbiAgfTtcbn1cblxuY2xhc3MgVGltZW91dFdpdGhPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB3YWl0Rm9yOiBudW1iZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgYWJzb2x1dGVUaW1lb3V0OiBib29sZWFuLFxuICAgICAgICAgICAgICBwcml2YXRlIHdpdGhPYnNlcnZhYmxlOiBPYnNlcnZhYmxlSW5wdXQ8YW55PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IFNjaGVkdWxlckxpa2UpIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPiwgc291cmNlOiBhbnkpOiBUZWFyZG93bkxvZ2ljIHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgVGltZW91dFdpdGhTdWJzY3JpYmVyKFxuICAgICAgc3Vic2NyaWJlciwgdGhpcy5hYnNvbHV0ZVRpbWVvdXQsIHRoaXMud2FpdEZvciwgdGhpcy53aXRoT2JzZXJ2YWJsZSwgdGhpcy5zY2hlZHVsZXJcbiAgICApKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgVGltZW91dFdpdGhTdWJzY3JpYmVyPFQsIFI+IGV4dGVuZHMgT3V0ZXJTdWJzY3JpYmVyPFQsIFI+IHtcblxuICBwcml2YXRlIGFjdGlvbjogU2NoZWR1bGVyQWN0aW9uPFRpbWVvdXRXaXRoU3Vic2NyaWJlcjxULCBSPj4gPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGFic29sdXRlVGltZW91dDogYm9vbGVhbixcbiAgICAgICAgICAgICAgcHJpdmF0ZSB3YWl0Rm9yOiBudW1iZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgd2l0aE9ic2VydmFibGU6IE9ic2VydmFibGVJbnB1dDxhbnk+LFxuICAgICAgICAgICAgICBwcml2YXRlIHNjaGVkdWxlcjogU2NoZWR1bGVyTGlrZSkge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICB0aGlzLnNjaGVkdWxlVGltZW91dCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZGlzcGF0Y2hUaW1lb3V0PFQsIFI+KHN1YnNjcmliZXI6IFRpbWVvdXRXaXRoU3Vic2NyaWJlcjxULCBSPik6IHZvaWQge1xuICAgIGNvbnN0IHsgd2l0aE9ic2VydmFibGUgfSA9IHN1YnNjcmliZXI7XG4gICAgKDxhbnk+IHN1YnNjcmliZXIpLl91bnN1YnNjcmliZUFuZFJlY3ljbGUoKTtcbiAgICBzdWJzY3JpYmVyLmFkZChzdWJzY3JpYmVUb1Jlc3VsdChzdWJzY3JpYmVyLCB3aXRoT2JzZXJ2YWJsZSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzY2hlZHVsZVRpbWVvdXQoKTogdm9pZCB7XG4gICAgY29uc3QgeyBhY3Rpb24gfSA9IHRoaXM7XG4gICAgaWYgKGFjdGlvbikge1xuICAgICAgLy8gUmVjeWNsZSB0aGUgYWN0aW9uIGlmIHdlJ3ZlIGFscmVhZHkgc2NoZWR1bGVkIG9uZS4gQWxsIHRoZSBwcm9kdWN0aW9uXG4gICAgICAvLyBTY2hlZHVsZXIgQWN0aW9ucyBtdXRhdGUgdGhlaXIgc3RhdGUvZGVsYXkgdGltZSBhbmQgcmV0dXJuIHRoZW1lc2VsdmVzLlxuICAgICAgLy8gVmlydHVhbEFjdGlvbnMgYXJlIGltbXV0YWJsZSwgc28gdGhleSBjcmVhdGUgYW5kIHJldHVybiBhIGNsb25lLiBJbiB0aGlzXG4gICAgICAvLyBjYXNlLCB3ZSBuZWVkIHRvIHNldCB0aGUgYWN0aW9uIHJlZmVyZW5jZSB0byB0aGUgbW9zdCByZWNlbnQgVmlydHVhbEFjdGlvbixcbiAgICAgIC8vIHRvIGVuc3VyZSB0aGF0J3MgdGhlIG9uZSB3ZSBjbG9uZSBmcm9tIG5leHQgdGltZS5cbiAgICAgIHRoaXMuYWN0aW9uID0gKDxTY2hlZHVsZXJBY3Rpb248VGltZW91dFdpdGhTdWJzY3JpYmVyPFQsIFI+Pj4gYWN0aW9uLnNjaGVkdWxlKHRoaXMsIHRoaXMud2FpdEZvcikpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZCh0aGlzLmFjdGlvbiA9ICg8U2NoZWR1bGVyQWN0aW9uPFRpbWVvdXRXaXRoU3Vic2NyaWJlcjxULCBSPj4+IHRoaXMuc2NoZWR1bGVyLnNjaGVkdWxlPFRpbWVvdXRXaXRoU3Vic2NyaWJlcjxULCBSPj4oXG4gICAgICAgIFRpbWVvdXRXaXRoU3Vic2NyaWJlci5kaXNwYXRjaFRpbWVvdXQsIHRoaXMud2FpdEZvciwgdGhpc1xuICAgICAgKSkpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5hYnNvbHV0ZVRpbWVvdXQpIHtcbiAgICAgIHRoaXMuc2NoZWR1bGVUaW1lb3V0KCk7XG4gICAgfVxuICAgIHN1cGVyLl9uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIC8qKiBAZGVwcmVjYXRlZCBUaGlzIGlzIGFuIGludGVybmFsIGltcGxlbWVudGF0aW9uIGRldGFpbCwgZG8gbm90IHVzZS4gKi9cbiAgX3Vuc3Vic2NyaWJlKCkge1xuICAgIHRoaXMuYWN0aW9uID0gbnVsbDtcbiAgICB0aGlzLnNjaGVkdWxlciA9IG51bGw7XG4gICAgdGhpcy53aXRoT2JzZXJ2YWJsZSA9IG51bGw7XG4gIH1cbn1cbiJdfQ==