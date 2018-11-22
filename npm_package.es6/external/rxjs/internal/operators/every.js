import { Subscriber } from '../Subscriber';
export function every(predicate, thisArg) {
    return (source) => source.lift(new EveryOperator(predicate, thisArg, source));
}
class EveryOperator {
    constructor(predicate, thisArg, source) {
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
    }
    call(observer, source) {
        return source.subscribe(new EverySubscriber(observer, this.predicate, this.thisArg, this.source));
    }
}
class EverySubscriber extends Subscriber {
    constructor(destination, predicate, thisArg, source) {
        super(destination);
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
        this.index = 0;
        this.thisArg = thisArg || this;
    }
    notifyComplete(everyValueMatch) {
        this.destination.next(everyValueMatch);
        this.destination.complete();
    }
    _next(value) {
        let result = false;
        try {
            result = this.predicate.call(this.thisArg, value, this.index++, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (!result) {
            this.notifyComplete(false);
        }
    }
    _complete() {
        this.notifyComplete(true);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9leHRlcm5hbC9yeGpzL2ludGVybmFsL29wZXJhdG9ycy9ldmVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBcUIzQyxNQUFNLFVBQVUsS0FBSyxDQUFJLFNBQXNFLEVBQ3RFLE9BQWE7SUFDcEMsT0FBTyxDQUFDLE1BQXFCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFhLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQy9GLENBQUM7QUFFRCxNQUFNLGFBQWE7SUFDakIsWUFBb0IsU0FBc0UsRUFDdEUsT0FBYSxFQUNiLE1BQXNCO1FBRnRCLGNBQVMsR0FBVCxTQUFTLENBQTZEO1FBQ3RFLFlBQU8sR0FBUCxPQUFPLENBQU07UUFDYixXQUFNLEdBQU4sTUFBTSxDQUFnQjtJQUMxQyxDQUFDO0lBRUQsSUFBSSxDQUFDLFFBQTZCLEVBQUUsTUFBVztRQUM3QyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxlQUFlLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNwRyxDQUFDO0NBQ0Y7QUFPRCxNQUFNLGVBQW1CLFNBQVEsVUFBYTtJQUc1QyxZQUFZLFdBQThCLEVBQ3RCLFNBQXNFLEVBQ3RFLE9BQVksRUFDWixNQUFzQjtRQUN4QyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFIRCxjQUFTLEdBQVQsU0FBUyxDQUE2RDtRQUN0RSxZQUFPLEdBQVAsT0FBTyxDQUFLO1FBQ1osV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFMbEMsVUFBSyxHQUFXLENBQUMsQ0FBQztRQU94QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sSUFBSSxJQUFJLENBQUM7SUFDakMsQ0FBQztJQUVPLGNBQWMsQ0FBQyxlQUF3QjtRQUM3QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFUyxLQUFLLENBQUMsS0FBUTtRQUN0QixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSTtZQUNGLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzlFO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1QixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM1QjtJQUNILENBQUM7SUFFUyxTQUFTO1FBQ2pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBPYnNlcnZlciwgT3BlcmF0b3JGdW5jdGlvbiB9IGZyb20gJy4uL3R5cGVzJztcblxuLyoqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyB3aGV0aGVyIG9yIG5vdCBldmVyeSBpdGVtIG9mIHRoZSBzb3VyY2Ugc2F0aXNmaWVzIHRoZSBjb25kaXRpb24gc3BlY2lmaWVkLlxuICpcbiAqICMjIEV4YW1wbGVcbiAqIEEgc2ltcGxlIGV4YW1wbGUgZW1pdHRpbmcgdHJ1ZSBpZiBhbGwgZWxlbWVudHMgYXJlIGxlc3MgdGhhbiA1LCBmYWxzZSBvdGhlcndpc2VcbiAqIGBgYGphdmFzY3JpcHRcbiAqICBvZigxLCAyLCAzLCA0LCA1LCA2KS5waXBlKFxuICogICAgIGV2ZXJ5KHggPT4geCA8IDUpLFxuICogKVxuICogLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTsgLy8gLT4gZmFsc2VcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHByZWRpY2F0ZSBBIGZ1bmN0aW9uIGZvciBkZXRlcm1pbmluZyBpZiBhbiBpdGVtIG1lZXRzIGEgc3BlY2lmaWVkIGNvbmRpdGlvbi5cbiAqIEBwYXJhbSB7YW55fSBbdGhpc0FyZ10gT3B0aW9uYWwgb2JqZWN0IHRvIHVzZSBmb3IgYHRoaXNgIGluIHRoZSBjYWxsYmFjay5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgb2YgYm9vbGVhbnMgdGhhdCBkZXRlcm1pbmVzIGlmIGFsbCBpdGVtcyBvZiB0aGUgc291cmNlIE9ic2VydmFibGUgbWVldCB0aGUgY29uZGl0aW9uIHNwZWNpZmllZC5cbiAqIEBtZXRob2QgZXZlcnlcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBldmVyeTxUPihwcmVkaWNhdGU6ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlciwgc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBib29sZWFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNBcmc/OiBhbnkpOiBPcGVyYXRvckZ1bmN0aW9uPFQsIGJvb2xlYW4+IHtcbiAgcmV0dXJuIChzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IHNvdXJjZS5saWZ0KG5ldyBFdmVyeU9wZXJhdG9yKHByZWRpY2F0ZSwgdGhpc0FyZywgc291cmNlKSk7XG59XG5cbmNsYXNzIEV2ZXJ5T3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBib29sZWFuPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcHJlZGljYXRlOiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gYm9vbGVhbixcbiAgICAgICAgICAgICAgcHJpdmF0ZSB0aGlzQXJnPzogYW55LFxuICAgICAgICAgICAgICBwcml2YXRlIHNvdXJjZT86IE9ic2VydmFibGU8VD4pIHtcbiAgfVxuXG4gIGNhbGwob2JzZXJ2ZXI6IFN1YnNjcmliZXI8Ym9vbGVhbj4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgRXZlcnlTdWJzY3JpYmVyKG9ic2VydmVyLCB0aGlzLnByZWRpY2F0ZSwgdGhpcy50aGlzQXJnLCB0aGlzLnNvdXJjZSkpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBFdmVyeVN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgcHJpdmF0ZSBpbmRleDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogT2JzZXJ2ZXI8Ym9vbGVhbj4sXG4gICAgICAgICAgICAgIHByaXZhdGUgcHJlZGljYXRlOiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gYm9vbGVhbixcbiAgICAgICAgICAgICAgcHJpdmF0ZSB0aGlzQXJnOiBhbnksXG4gICAgICAgICAgICAgIHByaXZhdGUgc291cmNlPzogT2JzZXJ2YWJsZTxUPikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICB0aGlzLnRoaXNBcmcgPSB0aGlzQXJnIHx8IHRoaXM7XG4gIH1cblxuICBwcml2YXRlIG5vdGlmeUNvbXBsZXRlKGV2ZXJ5VmFsdWVNYXRjaDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dChldmVyeVZhbHVlTWF0Y2gpO1xuICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5wcmVkaWNhdGUuY2FsbCh0aGlzLnRoaXNBcmcsIHZhbHVlLCB0aGlzLmluZGV4KyssIHRoaXMuc291cmNlKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgdGhpcy5ub3RpZnlDb21wbGV0ZShmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLm5vdGlmeUNvbXBsZXRlKHRydWUpO1xuICB9XG59XG4iXX0=