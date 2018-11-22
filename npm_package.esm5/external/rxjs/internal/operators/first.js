import { EmptyError } from '../util/EmptyError';
import { filter } from './filter';
import { take } from './take';
import { defaultIfEmpty } from './defaultIfEmpty';
import { throwIfEmpty } from './throwIfEmpty';
import { identity } from '../util/identity';
export function first(predicate, defaultValue) {
    var hasDefaultValue = arguments.length >= 2;
    return function (source) { return source.pipe(predicate ? filter(function (v, i) { return predicate(v, i, source); }) : identity, take(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(function () { return new EmptyError(); })); };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9leHRlcm5hbC9yeGpzL2ludGVybmFsL29wZXJhdG9ycy9maXJzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFaEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNsQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzlCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBaUU1QyxNQUFNLFVBQVUsS0FBSyxDQUNuQixTQUFnRixFQUNoRixZQUFnQjtJQUVoQixJQUFNLGVBQWUsR0FBRyxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztJQUM5QyxPQUFPLFVBQUMsTUFBcUIsSUFBSyxPQUFBLE1BQU0sQ0FBQyxJQUFJLENBQzNDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxFQUF2QixDQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFDaEUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLGVBQWUsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFRLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsY0FBTSxPQUFBLElBQUksVUFBVSxFQUFFLEVBQWhCLENBQWdCLENBQUMsQ0FDN0YsRUFKaUMsQ0FJakMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IEVtcHR5RXJyb3IgfSBmcm9tICcuLi91dGlsL0VtcHR5RXJyb3InO1xuaW1wb3J0IHsgT3BlcmF0b3JGdW5jdGlvbiB9IGZyb20gJy4uLy4uL2ludGVybmFsL3R5cGVzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJy4vZmlsdGVyJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICcuL3Rha2UnO1xuaW1wb3J0IHsgZGVmYXVsdElmRW1wdHkgfSBmcm9tICcuL2RlZmF1bHRJZkVtcHR5JztcbmltcG9ydCB7IHRocm93SWZFbXB0eSB9IGZyb20gJy4vdGhyb3dJZkVtcHR5JztcbmltcG9ydCB7IGlkZW50aXR5IH0gZnJvbSAnLi4vdXRpbC9pZGVudGl0eSc7XG5cbi8qIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpcnN0PFQsIEQgPSBUPihcbiAgcHJlZGljYXRlPzogbnVsbCxcbiAgZGVmYXVsdFZhbHVlPzogRFxuKTogT3BlcmF0b3JGdW5jdGlvbjxULCBUIHwgRD47XG5leHBvcnQgZnVuY3Rpb24gZmlyc3Q8VCwgUyBleHRlbmRzIFQ+KFxuICBwcmVkaWNhdGU6ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlciwgc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiB2YWx1ZSBpcyBTLFxuICBkZWZhdWx0VmFsdWU/OiBTXG4pOiBPcGVyYXRvckZ1bmN0aW9uPFQsIFM+O1xuZXhwb3J0IGZ1bmN0aW9uIGZpcnN0PFQsIEQgPSBUPihcbiAgcHJlZGljYXRlOiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gYm9vbGVhbixcbiAgZGVmYXVsdFZhbHVlPzogRFxuKTogT3BlcmF0b3JGdW5jdGlvbjxULCBUIHwgRD47XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuXG4vKipcbiAqIEVtaXRzIG9ubHkgdGhlIGZpcnN0IHZhbHVlIChvciB0aGUgZmlyc3QgdmFsdWUgdGhhdCBtZWV0cyBzb21lIGNvbmRpdGlvbilcbiAqIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5FbWl0cyBvbmx5IHRoZSBmaXJzdCB2YWx1ZS4gT3IgZW1pdHMgb25seSB0aGUgZmlyc3RcbiAqIHZhbHVlIHRoYXQgcGFzc2VzIHNvbWUgdGVzdC48L3NwYW4+XG4gKlxuICogIVtdKGZpcnN0LnBuZylcbiAqXG4gKiBJZiBjYWxsZWQgd2l0aCBubyBhcmd1bWVudHMsIGBmaXJzdGAgZW1pdHMgdGhlIGZpcnN0IHZhbHVlIG9mIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUsIHRoZW4gY29tcGxldGVzLiBJZiBjYWxsZWQgd2l0aCBhIGBwcmVkaWNhdGVgIGZ1bmN0aW9uLCBgZmlyc3RgXG4gKiBlbWl0cyB0aGUgZmlyc3QgdmFsdWUgb2YgdGhlIHNvdXJjZSB0aGF0IG1hdGNoZXMgdGhlIHNwZWNpZmllZCBjb25kaXRpb24uIEl0XG4gKiBtYXkgYWxzbyB0YWtlIGEgZGVwcmVjYXRlZCBgcmVzdWx0U2VsZWN0b3JgIGZ1bmN0aW9uIHRvIHByb2R1Y2UgdGhlIG91dHB1dFxuICogdmFsdWUgZnJvbSB0aGUgaW5wdXQgdmFsdWUsIGFuZCBhIGBkZWZhdWx0VmFsdWVgIHRvIGVtaXQgaW4gY2FzZSB0aGUgc291cmNlXG4gKiBjb21wbGV0ZXMgYmVmb3JlIGl0IGlzIGFibGUgdG8gZW1pdCBhIHZhbGlkIHZhbHVlLiBUaHJvd3MgYW4gZXJyb3IgaWZcbiAqIGBkZWZhdWx0VmFsdWVgIHdhcyBub3QgcHJvdmlkZWQgYW5kIGEgbWF0Y2hpbmcgZWxlbWVudCBpcyBub3QgZm91bmQuXG4gKlxuICogIyMgRXhhbXBsZXNcbiAqIEVtaXQgb25seSB0aGUgZmlyc3QgY2xpY2sgdGhhdCBoYXBwZW5zIG9uIHRoZSBET01cbiAqIGBgYGphdmFzY3JpcHRcbiAqIGNvbnN0IGNsaWNrcyA9IGZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiBjb25zdCByZXN1bHQgPSBjbGlja3MucGlwZShmaXJzdCgpKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKiBgYGBcbiAqXG4gKiBFbWl0cyB0aGUgZmlyc3QgY2xpY2sgdGhhdCBoYXBwZW5zIG9uIGEgRElWXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBjb25zdCBjbGlja3MgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogY29uc3QgcmVzdWx0ID0gY2xpY2tzLnBpcGUoZmlyc3QoZXYgPT4gZXYudGFyZ2V0LnRhZ05hbWUgPT09ICdESVYnKSk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICogYGBgXG4gKlxuICogQHNlZSB7QGxpbmsgZmlsdGVyfVxuICogQHNlZSB7QGxpbmsgZmluZH1cbiAqIEBzZWUge0BsaW5rIHRha2V9XG4gKlxuICogQHRocm93cyB7RW1wdHlFcnJvcn0gRGVsaXZlcnMgYW4gRW1wdHlFcnJvciB0byB0aGUgT2JzZXJ2ZXIncyBgZXJyb3JgXG4gKiBjYWxsYmFjayBpZiB0aGUgT2JzZXJ2YWJsZSBjb21wbGV0ZXMgYmVmb3JlIGFueSBgbmV4dGAgbm90aWZpY2F0aW9uIHdhcyBzZW50LlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPik6IGJvb2xlYW59IFtwcmVkaWNhdGVdXG4gKiBBbiBvcHRpb25hbCBmdW5jdGlvbiBjYWxsZWQgd2l0aCBlYWNoIGl0ZW0gdG8gdGVzdCBmb3IgY29uZGl0aW9uIG1hdGNoaW5nLlxuICogQHBhcmFtIHtSfSBbZGVmYXVsdFZhbHVlXSBUaGUgZGVmYXVsdCB2YWx1ZSBlbWl0dGVkIGluIGNhc2Ugbm8gdmFsaWQgdmFsdWVcbiAqIHdhcyBmb3VuZCBvbiB0aGUgc291cmNlLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxUfFI+fSBBbiBPYnNlcnZhYmxlIG9mIHRoZSBmaXJzdCBpdGVtIHRoYXQgbWF0Y2hlcyB0aGVcbiAqIGNvbmRpdGlvbi5cbiAqIEBtZXRob2QgZmlyc3RcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaXJzdDxULCBEPihcbiAgcHJlZGljYXRlPzogKCh2YWx1ZTogVCwgaW5kZXg6IG51bWJlciwgc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBib29sZWFuKSB8IG51bGwsXG4gIGRlZmF1bHRWYWx1ZT86IERcbik6IE9wZXJhdG9yRnVuY3Rpb248VCwgVCB8IEQ+IHtcbiAgY29uc3QgaGFzRGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+PSAyO1xuICByZXR1cm4gKHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gc291cmNlLnBpcGUoXG4gICAgcHJlZGljYXRlID8gZmlsdGVyKCh2LCBpKSA9PiBwcmVkaWNhdGUodiwgaSwgc291cmNlKSkgOiBpZGVudGl0eSxcbiAgICB0YWtlKDEpLFxuICAgIGhhc0RlZmF1bHRWYWx1ZSA/IGRlZmF1bHRJZkVtcHR5PFQgfCBEPihkZWZhdWx0VmFsdWUpIDogdGhyb3dJZkVtcHR5KCgpID0+IG5ldyBFbXB0eUVycm9yKCkpLFxuICApO1xufVxuIl19