import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
export function exhaust() {
    return (source) => source.lift(new SwitchFirstOperator());
}
class SwitchFirstOperator {
    call(subscriber, source) {
        return source.subscribe(new SwitchFirstSubscriber(subscriber));
    }
}
class SwitchFirstSubscriber extends OuterSubscriber {
    constructor(destination) {
        super(destination);
        this.hasCompleted = false;
        this.hasSubscription = false;
    }
    _next(value) {
        if (!this.hasSubscription) {
            this.hasSubscription = true;
            this.add(subscribeToResult(this, value));
        }
    }
    _complete() {
        this.hasCompleted = true;
        if (!this.hasSubscription) {
            this.destination.complete();
        }
    }
    notifyComplete(innerSub) {
        this.remove(innerSub);
        this.hasSubscription = false;
        if (this.hasCompleted) {
            this.destination.complete();
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhoYXVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2V4dGVybmFsL3J4anMvaW50ZXJuYWwvb3BlcmF0b3JzL2V4aGF1c3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBK0M5RCxNQUFNLFVBQVUsT0FBTztJQUNyQixPQUFPLENBQUMsTUFBcUIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLG1CQUFtQixFQUFLLENBQUMsQ0FBQztBQUM5RSxDQUFDO0FBRUQsTUFBTSxtQkFBbUI7SUFDdkIsSUFBSSxDQUFDLFVBQXlCLEVBQUUsTUFBVztRQUN6QyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Q0FDRjtBQU9ELE1BQU0scUJBQXlCLFNBQVEsZUFBcUI7SUFJMUQsWUFBWSxXQUEwQjtRQUNwQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFKYixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUM5QixvQkFBZSxHQUFZLEtBQUssQ0FBQztJQUl6QyxDQUFDO0lBRVMsS0FBSyxDQUFDLEtBQVE7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDekIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7WUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUMxQztJQUNILENBQUM7SUFFUyxTQUFTO1FBQ2pCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBRUQsY0FBYyxDQUFDLFFBQXNCO1FBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDN0I7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBPdXRlclN1YnNjcmliZXIgfSBmcm9tICcuLi9PdXRlclN1YnNjcmliZXInO1xuaW1wb3J0IHsgc3Vic2NyaWJlVG9SZXN1bHQgfSBmcm9tICcuLi91dGlsL3N1YnNjcmliZVRvUmVzdWx0JztcbmltcG9ydCB7IE9ic2VydmFibGVJbnB1dCwgT3BlcmF0b3JGdW5jdGlvbiwgVGVhcmRvd25Mb2dpYyB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGV4aGF1c3Q8VD4oKTogT3BlcmF0b3JGdW5jdGlvbjxPYnNlcnZhYmxlSW5wdXQ8VD4sIFQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGV4aGF1c3Q8Uj4oKTogT3BlcmF0b3JGdW5jdGlvbjxhbnksIFI+O1xuXG4vKipcbiAqIENvbnZlcnRzIGEgaGlnaGVyLW9yZGVyIE9ic2VydmFibGUgaW50byBhIGZpcnN0LW9yZGVyIE9ic2VydmFibGUgYnkgZHJvcHBpbmdcbiAqIGlubmVyIE9ic2VydmFibGVzIHdoaWxlIHRoZSBwcmV2aW91cyBpbm5lciBPYnNlcnZhYmxlIGhhcyBub3QgeWV0IGNvbXBsZXRlZC5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+RmxhdHRlbnMgYW4gT2JzZXJ2YWJsZS1vZi1PYnNlcnZhYmxlcyBieSBkcm9wcGluZyB0aGVcbiAqIG5leHQgaW5uZXIgT2JzZXJ2YWJsZXMgd2hpbGUgdGhlIGN1cnJlbnQgaW5uZXIgaXMgc3RpbGwgZXhlY3V0aW5nLjwvc3Bhbj5cbiAqXG4gKiAhW10oZXhoYXVzdC5wbmcpXG4gKlxuICogYGV4aGF1c3RgIHN1YnNjcmliZXMgdG8gYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIE9ic2VydmFibGVzLCBhbHNvIGtub3duIGFzIGFcbiAqIGhpZ2hlci1vcmRlciBPYnNlcnZhYmxlLiBFYWNoIHRpbWUgaXQgb2JzZXJ2ZXMgb25lIG9mIHRoZXNlIGVtaXR0ZWQgaW5uZXJcbiAqIE9ic2VydmFibGVzLCB0aGUgb3V0cHV0IE9ic2VydmFibGUgYmVnaW5zIGVtaXR0aW5nIHRoZSBpdGVtcyBlbWl0dGVkIGJ5IHRoYXRcbiAqIGlubmVyIE9ic2VydmFibGUuIFNvIGZhciwgaXQgYmVoYXZlcyBsaWtlIHtAbGluayBtZXJnZUFsbH0uIEhvd2V2ZXIsXG4gKiBgZXhoYXVzdGAgaWdub3JlcyBldmVyeSBuZXcgaW5uZXIgT2JzZXJ2YWJsZSBpZiB0aGUgcHJldmlvdXMgT2JzZXJ2YWJsZSBoYXNcbiAqIG5vdCB5ZXQgY29tcGxldGVkLiBPbmNlIHRoYXQgb25lIGNvbXBsZXRlcywgaXQgd2lsbCBhY2NlcHQgYW5kIGZsYXR0ZW4gdGhlXG4gKiBuZXh0IGlubmVyIE9ic2VydmFibGUgYW5kIHJlcGVhdCB0aGlzIHByb2Nlc3MuXG4gKlxuICogIyMgRXhhbXBsZVxuICogUnVuIGEgZmluaXRlIHRpbWVyIGZvciBlYWNoIGNsaWNrLCBvbmx5IGlmIHRoZXJlIGlzIG5vIGN1cnJlbnRseSBhY3RpdmUgdGltZXJcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGNvbnN0IGNsaWNrcyA9IGZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiBjb25zdCBoaWdoZXJPcmRlciA9IGNsaWNrcy5waXBlKFxuICogICBtYXAoKGV2KSA9PiBpbnRlcnZhbCgxMDAwKS5waXBlKHRha2UoNSkpKSxcbiAqICk7XG4gKiBjb25zdCByZXN1bHQgPSBoaWdoZXJPcmRlci5waXBlKGV4aGF1c3QoKSk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICogYGBgXG4gKlxuICogQHNlZSB7QGxpbmsgY29tYmluZUFsbH1cbiAqIEBzZWUge0BsaW5rIGNvbmNhdEFsbH1cbiAqIEBzZWUge0BsaW5rIHN3aXRjaEFsbH1cbiAqIEBzZWUge0BsaW5rIHN3aXRjaE1hcH1cbiAqIEBzZWUge0BsaW5rIG1lcmdlQWxsfVxuICogQHNlZSB7QGxpbmsgZXhoYXVzdE1hcH1cbiAqIEBzZWUge0BsaW5rIHppcEFsbH1cbiAqXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgdGFrZXMgYSBzb3VyY2Ugb2YgT2JzZXJ2YWJsZXMgYW5kIHByb3BhZ2F0ZXMgdGhlIGZpcnN0IG9ic2VydmFibGVcbiAqIGV4Y2x1c2l2ZWx5IHVudGlsIGl0IGNvbXBsZXRlcyBiZWZvcmUgc3Vic2NyaWJpbmcgdG8gdGhlIG5leHQuXG4gKiBAbWV0aG9kIGV4aGF1c3RcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleGhhdXN0PFQ+KCk6IE9wZXJhdG9yRnVuY3Rpb248YW55LCBUPiB7XG4gIHJldHVybiAoc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBzb3VyY2UubGlmdChuZXcgU3dpdGNoRmlyc3RPcGVyYXRvcjxUPigpKTtcbn1cblxuY2xhc3MgU3dpdGNoRmlyc3RPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFQ+IHtcbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IGFueSk6IFRlYXJkb3duTG9naWMge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBTd2l0Y2hGaXJzdFN1YnNjcmliZXIoc3Vic2NyaWJlcikpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBTd2l0Y2hGaXJzdFN1YnNjcmliZXI8VD4gZXh0ZW5kcyBPdXRlclN1YnNjcmliZXI8VCwgVD4ge1xuICBwcml2YXRlIGhhc0NvbXBsZXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGhhc1N1YnNjcmlwdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFQ+KSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmhhc1N1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5oYXNTdWJzY3JpcHRpb24gPSB0cnVlO1xuICAgICAgdGhpcy5hZGQoc3Vic2NyaWJlVG9SZXN1bHQodGhpcywgdmFsdWUpKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCk6IHZvaWQge1xuICAgIHRoaXMuaGFzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICBpZiAoIXRoaXMuaGFzU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG5cbiAgbm90aWZ5Q29tcGxldGUoaW5uZXJTdWI6IFN1YnNjcmlwdGlvbik6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlKGlubmVyU3ViKTtcbiAgICB0aGlzLmhhc1N1YnNjcmlwdGlvbiA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmhhc0NvbXBsZXRlZCkge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgIH1cbiAgfVxufVxuIl19