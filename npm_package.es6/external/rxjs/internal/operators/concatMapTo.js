import { concatMap } from './concatMap';
export function concatMapTo(innerObservable, resultSelector) {
    return concatMap(() => innerObservable, resultSelector);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uY2F0TWFwVG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9leHRlcm5hbC9yeGpzL2ludGVybmFsL29wZXJhdG9ycy9jb25jYXRNYXBUby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBZ0V4QyxNQUFNLFVBQVUsV0FBVyxDQUN6QixlQUFtQyxFQUNuQyxjQUE0RjtJQUU1RixPQUFPLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxlQUFlLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDMUQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbmNhdE1hcCB9IGZyb20gJy4vY29uY2F0TWFwJztcbmltcG9ydCB7IE9ic2VydmFibGVJbnB1dCwgT3BlcmF0b3JGdW5jdGlvbiB9IGZyb20gJy4uL3R5cGVzJztcblxuLyogdHNsaW50OmRpc2FibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5leHBvcnQgZnVuY3Rpb24gY29uY2F0TWFwVG88VD4ob2JzZXJ2YWJsZTogT2JzZXJ2YWJsZUlucHV0PFQ+KTogT3BlcmF0b3JGdW5jdGlvbjxhbnksIFQ+O1xuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnQgZnVuY3Rpb24gY29uY2F0TWFwVG88VD4ob2JzZXJ2YWJsZTogT2JzZXJ2YWJsZUlucHV0PFQ+LCByZXN1bHRTZWxlY3RvcjogdW5kZWZpbmVkKTogT3BlcmF0b3JGdW5jdGlvbjxhbnksIFQ+O1xuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnQgZnVuY3Rpb24gY29uY2F0TWFwVG88VCwgSSwgUj4ob2JzZXJ2YWJsZTogT2JzZXJ2YWJsZUlucHV0PEk+LCByZXN1bHRTZWxlY3RvcjogKG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IEksIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyKSA9PiBSKTogT3BlcmF0b3JGdW5jdGlvbjxULCBSPjtcbi8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5cbi8qKlxuICogUHJvamVjdHMgZWFjaCBzb3VyY2UgdmFsdWUgdG8gdGhlIHNhbWUgT2JzZXJ2YWJsZSB3aGljaCBpcyBtZXJnZWQgbXVsdGlwbGVcbiAqIHRpbWVzIGluIGEgc2VyaWFsaXplZCBmYXNoaW9uIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SXQncyBsaWtlIHtAbGluayBjb25jYXRNYXB9LCBidXQgbWFwcyBlYWNoIHZhbHVlXG4gKiBhbHdheXMgdG8gdGhlIHNhbWUgaW5uZXIgT2JzZXJ2YWJsZS48L3NwYW4+XG4gKlxuICogIVtdKGNvbmNhdE1hcFRvLnBuZylcbiAqXG4gKiBNYXBzIGVhY2ggc291cmNlIHZhbHVlIHRvIHRoZSBnaXZlbiBPYnNlcnZhYmxlIGBpbm5lck9ic2VydmFibGVgIHJlZ2FyZGxlc3NcbiAqIG9mIHRoZSBzb3VyY2UgdmFsdWUsIGFuZCB0aGVuIGZsYXR0ZW5zIHRob3NlIHJlc3VsdGluZyBPYnNlcnZhYmxlcyBpbnRvIG9uZVxuICogc2luZ2xlIE9ic2VydmFibGUsIHdoaWNoIGlzIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZS4gRWFjaCBuZXcgYGlubmVyT2JzZXJ2YWJsZWBcbiAqIGluc3RhbmNlIGVtaXR0ZWQgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlIGlzIGNvbmNhdGVuYXRlZCB3aXRoIHRoZSBwcmV2aW91c1xuICogYGlubmVyT2JzZXJ2YWJsZWAgaW5zdGFuY2UuXG4gKlxuICogX19XYXJuaW5nOl9fIGlmIHNvdXJjZSB2YWx1ZXMgYXJyaXZlIGVuZGxlc3NseSBhbmQgZmFzdGVyIHRoYW4gdGhlaXJcbiAqIGNvcnJlc3BvbmRpbmcgaW5uZXIgT2JzZXJ2YWJsZXMgY2FuIGNvbXBsZXRlLCBpdCB3aWxsIHJlc3VsdCBpbiBtZW1vcnkgaXNzdWVzXG4gKiBhcyBpbm5lciBPYnNlcnZhYmxlcyBhbWFzcyBpbiBhbiB1bmJvdW5kZWQgYnVmZmVyIHdhaXRpbmcgZm9yIHRoZWlyIHR1cm4gdG9cbiAqIGJlIHN1YnNjcmliZWQgdG8uXG4gKlxuICogTm90ZTogYGNvbmNhdE1hcFRvYCBpcyBlcXVpdmFsZW50IHRvIGBtZXJnZU1hcFRvYCB3aXRoIGNvbmN1cnJlbmN5IHBhcmFtZXRlclxuICogc2V0IHRvIGAxYC5cbiAqXG4gKiAjIyBFeGFtcGxlXG4gKiBGb3IgZWFjaCBjbGljayBldmVudCwgdGljayBldmVyeSBzZWNvbmQgZnJvbSAwIHRvIDMsIHdpdGggbm8gY29uY3VycmVuY3lcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGNvbnN0IGNsaWNrcyA9IGZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiBjb25zdCByZXN1bHQgPSBjbGlja3MucGlwZShcbiAqICAgY29uY2F0TWFwVG8oaW50ZXJ2YWwoMTAwMCkucGlwZSh0YWtlKDQpKSksXG4gKiApO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiAvLyBSZXN1bHRzIGluIHRoZSBmb2xsb3dpbmc6XG4gKiAvLyAocmVzdWx0cyBhcmUgbm90IGNvbmN1cnJlbnQpXG4gKiAvLyBGb3IgZXZlcnkgY2xpY2sgb24gdGhlIFwiZG9jdW1lbnRcIiBpdCB3aWxsIGVtaXQgdmFsdWVzIDAgdG8gMyBzcGFjZWRcbiAqIC8vIG9uIGEgMTAwMG1zIGludGVydmFsXG4gKiAvLyBvbmUgY2xpY2sgPSAxMDAwbXMtPiAwIC0xMDAwbXMtPiAxIC0xMDAwbXMtPiAyIC0xMDAwbXMtPiAzXG4gKiBgYGBcbiAqXG4gKiBAc2VlIHtAbGluayBjb25jYXR9XG4gKiBAc2VlIHtAbGluayBjb25jYXRBbGx9XG4gKiBAc2VlIHtAbGluayBjb25jYXRNYXB9XG4gKiBAc2VlIHtAbGluayBtZXJnZU1hcFRvfVxuICogQHNlZSB7QGxpbmsgc3dpdGNoTWFwVG99XG4gKlxuICogQHBhcmFtIHtPYnNlcnZhYmxlSW5wdXR9IGlubmVyT2JzZXJ2YWJsZSBBbiBPYnNlcnZhYmxlIHRvIHJlcGxhY2UgZWFjaCB2YWx1ZSBmcm9tXG4gKiB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBvYnNlcnZhYmxlIG9mIHZhbHVlcyBtZXJnZWQgdG9nZXRoZXIgYnkgam9pbmluZyB0aGVcbiAqIHBhc3NlZCBvYnNlcnZhYmxlIHdpdGggaXRzZWxmLCBvbmUgYWZ0ZXIgdGhlIG90aGVyLCBmb3IgZWFjaCB2YWx1ZSBlbWl0dGVkXG4gKiBmcm9tIHRoZSBzb3VyY2UuXG4gKiBAbWV0aG9kIGNvbmNhdE1hcFRvXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29uY2F0TWFwVG88VCwgSSwgUj4oXG4gIGlubmVyT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZUlucHV0PEk+LFxuICByZXN1bHRTZWxlY3Rvcj86IChvdXRlclZhbHVlOiBULCBpbm5lclZhbHVlOiBJLCBvdXRlckluZGV4OiBudW1iZXIsIGlubmVySW5kZXg6IG51bWJlcikgPT4gUlxuKTogT3BlcmF0b3JGdW5jdGlvbjxULCBSPiB7XG4gIHJldHVybiBjb25jYXRNYXAoKCkgPT4gaW5uZXJPYnNlcnZhYmxlLCByZXN1bHRTZWxlY3Rvcik7XG59XG4iXX0=