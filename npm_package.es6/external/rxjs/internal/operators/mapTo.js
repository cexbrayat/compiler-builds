import { Subscriber } from '../Subscriber';
export function mapTo(value) {
    return (source) => source.lift(new MapToOperator(value));
}
class MapToOperator {
    constructor(value) {
        this.value = value;
    }
    call(subscriber, source) {
        return source.subscribe(new MapToSubscriber(subscriber, this.value));
    }
}
class MapToSubscriber extends Subscriber {
    constructor(destination, value) {
        super(destination);
        this.value = value;
    }
    _next(x) {
        this.destination.next(this.value);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwVG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9leHRlcm5hbC9yeGpzL2ludGVybmFsL29wZXJhdG9ycy9tYXBUby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBaUMzQyxNQUFNLFVBQVUsS0FBSyxDQUFPLEtBQVE7SUFDbEMsT0FBTyxDQUFDLE1BQXFCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUMxRSxDQUFDO0FBRUQsTUFBTSxhQUFhO0lBSWpCLFlBQVksS0FBUTtRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSSxDQUFDLFVBQXlCLEVBQUUsTUFBVztRQUN6QyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxlQUFlLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7Q0FDRjtBQU9ELE1BQU0sZUFBc0IsU0FBUSxVQUFhO0lBSS9DLFlBQVksV0FBMEIsRUFBRSxLQUFRO1FBQzlDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRVMsS0FBSyxDQUFDLENBQUk7UUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgT3BlcmF0b3JGdW5jdGlvbiB9IGZyb20gJy4uL3R5cGVzJztcblxuLyoqXG4gKiBFbWl0cyB0aGUgZ2l2ZW4gY29uc3RhbnQgdmFsdWUgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlIGV2ZXJ5IHRpbWUgdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZSBlbWl0cyBhIHZhbHVlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5MaWtlIHtAbGluayBtYXB9LCBidXQgaXQgbWFwcyBldmVyeSBzb3VyY2UgdmFsdWUgdG9cbiAqIHRoZSBzYW1lIG91dHB1dCB2YWx1ZSBldmVyeSB0aW1lLjwvc3Bhbj5cbiAqXG4gKiAhW10obWFwVG8ucG5nKVxuICpcbiAqIFRha2VzIGEgY29uc3RhbnQgYHZhbHVlYCBhcyBhcmd1bWVudCwgYW5kIGVtaXRzIHRoYXQgd2hlbmV2ZXIgdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZSBlbWl0cyBhIHZhbHVlLiBJbiBvdGhlciB3b3JkcywgaWdub3JlcyB0aGUgYWN0dWFsIHNvdXJjZSB2YWx1ZSxcbiAqIGFuZCBzaW1wbHkgdXNlcyB0aGUgZW1pc3Npb24gbW9tZW50IHRvIGtub3cgd2hlbiB0byBlbWl0IHRoZSBnaXZlbiBgdmFsdWVgLlxuICpcbiAqICMjIEV4YW1wbGVcbiAqIE1hcCBldmVyeSBjbGljayB0byB0aGUgc3RyaW5nICdIaSdcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGNvbnN0IGNsaWNrcyA9IGZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiBjb25zdCBncmVldGluZ3MgPSBjbGlja3MucGlwZShtYXBUbygnSGknKSk7XG4gKiBncmVldGluZ3Muc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICogYGBgXG4gKlxuICogQHNlZSB7QGxpbmsgbWFwfVxuICpcbiAqIEBwYXJhbSB7YW55fSB2YWx1ZSBUaGUgdmFsdWUgdG8gbWFwIGVhY2ggc291cmNlIHZhbHVlIHRvLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHRoZSBnaXZlbiBgdmFsdWVgIGV2ZXJ5IHRpbWVcbiAqIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBlbWl0cyBzb21ldGhpbmcuXG4gKiBAbWV0aG9kIG1hcFRvXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwVG88VCwgUj4odmFsdWU6IFIpOiBPcGVyYXRvckZ1bmN0aW9uPFQsIFI+IHtcbiAgcmV0dXJuIChzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IHNvdXJjZS5saWZ0KG5ldyBNYXBUb09wZXJhdG9yKHZhbHVlKSk7XG59XG5cbmNsYXNzIE1hcFRvT3BlcmF0b3I8VCwgUj4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBSPiB7XG5cbiAgdmFsdWU6IFI7XG5cbiAgY29uc3RydWN0b3IodmFsdWU6IFIpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8Uj4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgTWFwVG9TdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMudmFsdWUpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgTWFwVG9TdWJzY3JpYmVyPFQsIFI+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG5cbiAgdmFsdWU6IFI7XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8Uj4sIHZhbHVlOiBSKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh4OiBUKSB7XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHRoaXMudmFsdWUpO1xuICB9XG59XG4iXX0=