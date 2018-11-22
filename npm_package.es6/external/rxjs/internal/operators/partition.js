import { not } from '../util/not';
import { filter } from './filter';
export function partition(predicate, thisArg) {
    return (source) => [
        filter(predicate, thisArg)(source),
        filter(not(predicate, thisArg))(source)
    ];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydGl0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZXh0ZXJuYWwvcnhqcy9pbnRlcm5hbC9vcGVyYXRvcnMvcGFydGl0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQWdEbEMsTUFBTSxVQUFVLFNBQVMsQ0FBSSxTQUErQyxFQUMvQyxPQUFhO0lBQ3hDLE9BQU8sQ0FBQyxNQUFxQixFQUFFLEVBQUUsQ0FBQztRQUNoQyxNQUFNLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNsQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQztLQUNiLENBQUM7QUFDdEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG5vdCB9IGZyb20gJy4uL3V0aWwvbm90JztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJy4vZmlsdGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFVuYXJ5RnVuY3Rpb24gfSBmcm9tICcuLi90eXBlcyc7XG5cbi8qKlxuICogU3BsaXRzIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBpbnRvIHR3bywgb25lIHdpdGggdmFsdWVzIHRoYXQgc2F0aXNmeSBhXG4gKiBwcmVkaWNhdGUsIGFuZCBhbm90aGVyIHdpdGggdmFsdWVzIHRoYXQgZG9uJ3Qgc2F0aXNmeSB0aGUgcHJlZGljYXRlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5JdCdzIGxpa2Uge0BsaW5rIGZpbHRlcn0sIGJ1dCByZXR1cm5zIHR3byBPYnNlcnZhYmxlczpcbiAqIG9uZSBsaWtlIHRoZSBvdXRwdXQgb2Yge0BsaW5rIGZpbHRlcn0sIGFuZCB0aGUgb3RoZXIgd2l0aCB2YWx1ZXMgdGhhdCBkaWQgbm90XG4gKiBwYXNzIHRoZSBjb25kaXRpb24uPC9zcGFuPlxuICpcbiAqICFbXShwYXJ0aXRpb24ucG5nKVxuICpcbiAqIGBwYXJ0aXRpb25gIG91dHB1dHMgYW4gYXJyYXkgd2l0aCB0d28gT2JzZXJ2YWJsZXMgdGhhdCBwYXJ0aXRpb24gdGhlIHZhbHVlc1xuICogZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUgdGhyb3VnaCB0aGUgZ2l2ZW4gYHByZWRpY2F0ZWAgZnVuY3Rpb24uIFRoZSBmaXJzdFxuICogT2JzZXJ2YWJsZSBpbiB0aGF0IGFycmF5IGVtaXRzIHNvdXJjZSB2YWx1ZXMgZm9yIHdoaWNoIHRoZSBwcmVkaWNhdGUgYXJndW1lbnRcbiAqIHJldHVybnMgdHJ1ZS4gVGhlIHNlY29uZCBPYnNlcnZhYmxlIGVtaXRzIHNvdXJjZSB2YWx1ZXMgZm9yIHdoaWNoIHRoZVxuICogcHJlZGljYXRlIHJldHVybnMgZmFsc2UuIFRoZSBmaXJzdCBiZWhhdmVzIGxpa2Uge0BsaW5rIGZpbHRlcn0gYW5kIHRoZSBzZWNvbmRcbiAqIGJlaGF2ZXMgbGlrZSB7QGxpbmsgZmlsdGVyfSB3aXRoIHRoZSBwcmVkaWNhdGUgbmVnYXRlZC5cbiAqXG4gKiAjIyBFeGFtcGxlXG4gKiBQYXJ0aXRpb24gY2xpY2sgZXZlbnRzIGludG8gdGhvc2Ugb24gRElWIGVsZW1lbnRzIGFuZCB0aG9zZSBlbHNld2hlcmVcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGNvbnN0IGNsaWNrcyA9IGZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiBjb25zdCBwYXJ0cyA9IGNsaWNrcy5waXBlKHBhcnRpdGlvbihldiA9PiBldi50YXJnZXQudGFnTmFtZSA9PT0gJ0RJVicpKTtcbiAqIGNvbnN0IGNsaWNrc09uRGl2cyA9IHBhcnRzWzBdO1xuICogY29uc3QgY2xpY2tzRWxzZXdoZXJlID0gcGFydHNbMV07XG4gKiBjbGlja3NPbkRpdnMuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coJ0RJViBjbGlja2VkOiAnLCB4KSk7XG4gKiBjbGlja3NFbHNld2hlcmUuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coJ090aGVyIGNsaWNrZWQ6ICcsIHgpKTtcbiAqIGBgYFxuICpcbiAqIEBzZWUge0BsaW5rIGZpbHRlcn1cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBULCBpbmRleDogbnVtYmVyKTogYm9vbGVhbn0gcHJlZGljYXRlIEEgZnVuY3Rpb24gdGhhdFxuICogZXZhbHVhdGVzIGVhY2ggdmFsdWUgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuIElmIGl0IHJldHVybnMgYHRydWVgLFxuICogdGhlIHZhbHVlIGlzIGVtaXR0ZWQgb24gdGhlIGZpcnN0IE9ic2VydmFibGUgaW4gdGhlIHJldHVybmVkIGFycmF5LCBpZlxuICogYGZhbHNlYCB0aGUgdmFsdWUgaXMgZW1pdHRlZCBvbiB0aGUgc2Vjb25kIE9ic2VydmFibGUgaW4gdGhlIGFycmF5LiBUaGVcbiAqIGBpbmRleGAgcGFyYW1ldGVyIGlzIHRoZSBudW1iZXIgYGlgIGZvciB0aGUgaS10aCBzb3VyY2UgZW1pc3Npb24gdGhhdCBoYXNcbiAqIGhhcHBlbmVkIHNpbmNlIHRoZSBzdWJzY3JpcHRpb24sIHN0YXJ0aW5nIGZyb20gdGhlIG51bWJlciBgMGAuXG4gKiBAcGFyYW0ge2FueX0gW3RoaXNBcmddIEFuIG9wdGlvbmFsIGFyZ3VtZW50IHRvIGRldGVybWluZSB0aGUgdmFsdWUgb2YgYHRoaXNgXG4gKiBpbiB0aGUgYHByZWRpY2F0ZWAgZnVuY3Rpb24uXG4gKiBAcmV0dXJuIHtbT2JzZXJ2YWJsZTxUPiwgT2JzZXJ2YWJsZTxUPl19IEFuIGFycmF5IHdpdGggdHdvIE9ic2VydmFibGVzOiBvbmVcbiAqIHdpdGggdmFsdWVzIHRoYXQgcGFzc2VkIHRoZSBwcmVkaWNhdGUsIGFuZCBhbm90aGVyIHdpdGggdmFsdWVzIHRoYXQgZGlkIG5vdFxuICogcGFzcyB0aGUgcHJlZGljYXRlLlxuICogQG1ldGhvZCBwYXJ0aXRpb25cbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJ0aXRpb248VD4ocHJlZGljYXRlOiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIpID0+IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNBcmc/OiBhbnkpOiBVbmFyeUZ1bmN0aW9uPE9ic2VydmFibGU8VD4sIFtPYnNlcnZhYmxlPFQ+LCBPYnNlcnZhYmxlPFQ+XT4ge1xuICByZXR1cm4gKHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gW1xuICAgIGZpbHRlcihwcmVkaWNhdGUsIHRoaXNBcmcpKHNvdXJjZSksXG4gICAgZmlsdGVyKG5vdChwcmVkaWNhdGUsIHRoaXNBcmcpIGFzIGFueSkoc291cmNlKVxuICBdIGFzIFtPYnNlcnZhYmxlPFQ+LCBPYnNlcnZhYmxlPFQ+XTtcbn1cbiJdfQ==