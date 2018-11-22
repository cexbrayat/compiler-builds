import { EmptyError } from '../util/EmptyError';
import { filter } from './filter';
import { takeLast } from './takeLast';
import { throwIfEmpty } from './throwIfEmpty';
import { defaultIfEmpty } from './defaultIfEmpty';
import { identity } from '../util/identity';
export function last(predicate, defaultValue) {
    const hasDefaultValue = arguments.length >= 2;
    return (source) => source.pipe(predicate ? filter((v, i) => predicate(v, i, source)) : identity, takeLast(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(() => new EmptyError()));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2V4dGVybmFsL3J4anMvaW50ZXJuYWwvb3BlcmF0b3JzL2xhc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWhELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQWtDNUMsTUFBTSxVQUFVLElBQUksQ0FDbEIsU0FBZ0YsRUFDaEYsWUFBZ0I7SUFFaEIsTUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7SUFDOUMsT0FBTyxDQUFDLE1BQXFCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQzNDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUNoRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQ1gsZUFBZSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQVEsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLFVBQVUsRUFBRSxDQUFDLENBQzdGLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBFbXB0eUVycm9yIH0gZnJvbSAnLi4vdXRpbC9FbXB0eUVycm9yJztcbmltcG9ydCB7IE9wZXJhdG9yRnVuY3Rpb24gfSBmcm9tICcuLi8uLi9pbnRlcm5hbC90eXBlcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICcuL2ZpbHRlcic7XG5pbXBvcnQgeyB0YWtlTGFzdCB9IGZyb20gJy4vdGFrZUxhc3QnO1xuaW1wb3J0IHsgdGhyb3dJZkVtcHR5IH0gZnJvbSAnLi90aHJvd0lmRW1wdHknO1xuaW1wb3J0IHsgZGVmYXVsdElmRW1wdHkgfSBmcm9tICcuL2RlZmF1bHRJZkVtcHR5JztcbmltcG9ydCB7IGlkZW50aXR5IH0gZnJvbSAnLi4vdXRpbC9pZGVudGl0eSc7XG5cbi8qIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxhc3Q8VCwgRCA9IFQ+KFxuICBwcmVkaWNhdGU/OiBudWxsLFxuICBkZWZhdWx0VmFsdWU/OiBEXG4pOiBPcGVyYXRvckZ1bmN0aW9uPFQsIFQgfCBEPjtcbmV4cG9ydCBmdW5jdGlvbiBsYXN0PFQsIFMgZXh0ZW5kcyBUPihcbiAgcHJlZGljYXRlOiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gdmFsdWUgaXMgUyxcbiAgZGVmYXVsdFZhbHVlPzogU1xuKTogT3BlcmF0b3JGdW5jdGlvbjxULCBTPjtcbmV4cG9ydCBmdW5jdGlvbiBsYXN0PFQsIEQgPSBUPihcbiAgcHJlZGljYXRlOiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gYm9vbGVhbixcbiAgZGVmYXVsdFZhbHVlPzogRFxuKTogT3BlcmF0b3JGdW5jdGlvbjxULCBUIHwgRD47XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuXG4vKipcbiAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIG9ubHkgdGhlIGxhc3QgaXRlbSBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqIEl0IG9wdGlvbmFsbHkgdGFrZXMgYSBwcmVkaWNhdGUgZnVuY3Rpb24gYXMgYSBwYXJhbWV0ZXIsIGluIHdoaWNoIGNhc2UsIHJhdGhlciB0aGFuIGVtaXR0aW5nXG4gKiB0aGUgbGFzdCBpdGVtIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCB0aGUgcmVzdWx0aW5nIE9ic2VydmFibGUgd2lsbCBlbWl0IHRoZSBsYXN0IGl0ZW1cbiAqIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHRoYXQgc2F0aXNmaWVzIHRoZSBwcmVkaWNhdGUuXG4gKlxuICogIVtdKGxhc3QucG5nKVxuICpcbiAqIEB0aHJvd3Mge0VtcHR5RXJyb3J9IERlbGl2ZXJzIGFuIEVtcHR5RXJyb3IgdG8gdGhlIE9ic2VydmVyJ3MgYGVycm9yYFxuICogY2FsbGJhY2sgaWYgdGhlIE9ic2VydmFibGUgY29tcGxldGVzIGJlZm9yZSBhbnkgYG5leHRgIG5vdGlmaWNhdGlvbiB3YXMgc2VudC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFtwcmVkaWNhdGVdIC0gVGhlIGNvbmRpdGlvbiBhbnkgc291cmNlIGVtaXR0ZWQgaXRlbSBoYXMgdG8gc2F0aXNmeS5cbiAqIEBwYXJhbSB7YW55fSBbZGVmYXVsdFZhbHVlXSAtIEFuIG9wdGlvbmFsIGRlZmF1bHQgdmFsdWUgdG8gcHJvdmlkZSBpZiBsYXN0XG4gKiBwcmVkaWNhdGUgaXNuJ3QgbWV0IG9yIG5vIHZhbHVlcyB3ZXJlIGVtaXR0ZWQuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgb25seSB0aGUgbGFzdCBpdGVtIHNhdGlzZnlpbmcgdGhlIGdpdmVuIGNvbmRpdGlvblxuICogZnJvbSB0aGUgc291cmNlLCBvciBhbiBOb1N1Y2hFbGVtZW50RXhjZXB0aW9uIGlmIG5vIHN1Y2ggaXRlbXMgYXJlIGVtaXR0ZWQuXG4gKiBAdGhyb3dzIC0gVGhyb3dzIGlmIG5vIGl0ZW1zIHRoYXQgbWF0Y2ggdGhlIHByZWRpY2F0ZSBhcmUgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsYXN0PFQsIEQ+KFxuICBwcmVkaWNhdGU/OiAoKHZhbHVlOiBULCBpbmRleDogbnVtYmVyLCBzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IGJvb2xlYW4pIHwgbnVsbCxcbiAgZGVmYXVsdFZhbHVlPzogRFxuKTogT3BlcmF0b3JGdW5jdGlvbjxULCBUIHwgRD4ge1xuICBjb25zdCBoYXNEZWZhdWx0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID49IDI7XG4gIHJldHVybiAoc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBzb3VyY2UucGlwZShcbiAgICBwcmVkaWNhdGUgPyBmaWx0ZXIoKHYsIGkpID0+IHByZWRpY2F0ZSh2LCBpLCBzb3VyY2UpKSA6IGlkZW50aXR5LFxuICAgIHRha2VMYXN0KDEpLFxuICAgIGhhc0RlZmF1bHRWYWx1ZSA/IGRlZmF1bHRJZkVtcHR5PFQgfCBEPihkZWZhdWx0VmFsdWUpIDogdGhyb3dJZkVtcHR5KCgpID0+IG5ldyBFbXB0eUVycm9yKCkpLFxuICApO1xufVxuIl19