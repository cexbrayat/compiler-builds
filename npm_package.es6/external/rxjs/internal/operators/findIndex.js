import { FindValueOperator } from '../operators/find';
export function findIndex(predicate, thisArg) {
    return (source) => source.lift(new FindValueOperator(predicate, source, true, thisArg));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZEluZGV4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZXh0ZXJuYWwvcnhqcy9pbnRlcm5hbC9vcGVyYXRvcnMvZmluZEluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBdUN0RCxNQUFNLFVBQVUsU0FBUyxDQUFJLFNBQXNFLEVBQ3RFLE9BQWE7SUFDeEMsT0FBTyxDQUFDLE1BQXFCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBb0IsQ0FBQztBQUM1SCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgRmluZFZhbHVlT3BlcmF0b3IgfSBmcm9tICcuLi9vcGVyYXRvcnMvZmluZCc7XG5pbXBvcnQgeyBPcGVyYXRvckZ1bmN0aW9uIH0gZnJvbSAnLi4vdHlwZXMnO1xuLyoqXG4gKiBFbWl0cyBvbmx5IHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgdmFsdWUgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUgdGhhdFxuICogbWVldHMgc29tZSBjb25kaXRpb24uXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkl0J3MgbGlrZSB7QGxpbmsgZmluZH0sIGJ1dCBlbWl0cyB0aGUgaW5kZXggb2YgdGhlXG4gKiBmb3VuZCB2YWx1ZSwgbm90IHRoZSB2YWx1ZSBpdHNlbGYuPC9zcGFuPlxuICpcbiAqICFbXShmaW5kSW5kZXgucG5nKVxuICpcbiAqIGBmaW5kSW5kZXhgIHNlYXJjaGVzIGZvciB0aGUgZmlyc3QgaXRlbSBpbiB0aGUgc291cmNlIE9ic2VydmFibGUgdGhhdCBtYXRjaGVzXG4gKiB0aGUgc3BlY2lmaWVkIGNvbmRpdGlvbiBlbWJvZGllZCBieSB0aGUgYHByZWRpY2F0ZWAsIGFuZCByZXR1cm5zIHRoZVxuICogKHplcm8tYmFzZWQpIGluZGV4IG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIGluIHRoZSBzb3VyY2UuIFVubGlrZVxuICoge0BsaW5rIGZpcnN0fSwgdGhlIGBwcmVkaWNhdGVgIGlzIHJlcXVpcmVkIGluIGBmaW5kSW5kZXhgLCBhbmQgZG9lcyBub3QgZW1pdFxuICogYW4gZXJyb3IgaWYgYSB2YWxpZCB2YWx1ZSBpcyBub3QgZm91bmQuXG4gKlxuICogIyMgRXhhbXBsZVxuICogRW1pdCB0aGUgaW5kZXggb2YgZmlyc3QgY2xpY2sgdGhhdCBoYXBwZW5zIG9uIGEgRElWIGVsZW1lbnRcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGNvbnN0IGNsaWNrcyA9IGZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiBjb25zdCByZXN1bHQgPSBjbGlja3MucGlwZShmaW5kSW5kZXgoZXYgPT4gZXYudGFyZ2V0LnRhZ05hbWUgPT09ICdESVYnKSk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICogYGBgXG4gKlxuICogQHNlZSB7QGxpbmsgZmlsdGVyfVxuICogQHNlZSB7QGxpbmsgZmluZH1cbiAqIEBzZWUge0BsaW5rIGZpcnN0fVxuICogQHNlZSB7QGxpbmsgdGFrZX1cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBULCBpbmRleDogbnVtYmVyLCBzb3VyY2U6IE9ic2VydmFibGU8VD4pOiBib29sZWFufSBwcmVkaWNhdGVcbiAqIEEgZnVuY3Rpb24gY2FsbGVkIHdpdGggZWFjaCBpdGVtIHRvIHRlc3QgZm9yIGNvbmRpdGlvbiBtYXRjaGluZy5cbiAqIEBwYXJhbSB7YW55fSBbdGhpc0FyZ10gQW4gb3B0aW9uYWwgYXJndW1lbnQgdG8gZGV0ZXJtaW5lIHRoZSB2YWx1ZSBvZiBgdGhpc2BcbiAqIGluIHRoZSBgcHJlZGljYXRlYCBmdW5jdGlvbi5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgb2YgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBpdGVtIHRoYXRcbiAqIG1hdGNoZXMgdGhlIGNvbmRpdGlvbi5cbiAqIEBtZXRob2QgZmluZFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRJbmRleDxUPihwcmVkaWNhdGU6ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlciwgc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBib29sZWFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzQXJnPzogYW55KTogT3BlcmF0b3JGdW5jdGlvbjxULCBudW1iZXI+IHtcbiAgcmV0dXJuIChzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IHNvdXJjZS5saWZ0KG5ldyBGaW5kVmFsdWVPcGVyYXRvcihwcmVkaWNhdGUsIHNvdXJjZSwgdHJ1ZSwgdGhpc0FyZykpIGFzIE9ic2VydmFibGU8YW55Pjtcbn1cbiJdfQ==