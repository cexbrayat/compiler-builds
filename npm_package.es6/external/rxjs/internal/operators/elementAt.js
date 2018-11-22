import { ArgumentOutOfRangeError } from '../util/ArgumentOutOfRangeError';
import { filter } from './filter';
import { throwIfEmpty } from './throwIfEmpty';
import { defaultIfEmpty } from './defaultIfEmpty';
import { take } from './take';
export function elementAt(index, defaultValue) {
    if (index < 0) {
        throw new ArgumentOutOfRangeError();
    }
    const hasDefaultValue = arguments.length >= 2;
    return (source) => source.pipe(filter((v, i) => i === index), take(1), hasDefaultValue
        ? defaultIfEmpty(defaultValue)
        : throwIfEmpty(() => new ArgumentOutOfRangeError()));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudEF0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZXh0ZXJuYWwvcnhqcy9pbnRlcm5hbC9vcGVyYXRvcnMvZWxlbWVudEF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRzFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBK0M5QixNQUFNLFVBQVUsU0FBUyxDQUFJLEtBQWEsRUFBRSxZQUFnQjtJQUMxRCxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7UUFBRSxNQUFNLElBQUksdUJBQXVCLEVBQUUsQ0FBQztLQUFFO0lBQ3ZELE1BQU0sZUFBZSxHQUFHLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO0lBQzlDLE9BQU8sQ0FBQyxNQUFxQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUMzQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQzdCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxlQUFlO1FBQ2IsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUM7UUFDOUIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLHVCQUF1QixFQUFFLENBQUMsQ0FDdEQsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IEFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yIH0gZnJvbSAnLi4vdXRpbC9Bcmd1bWVudE91dE9mUmFuZ2VFcnJvcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBNb25vVHlwZU9wZXJhdG9yRnVuY3Rpb24sIFRlYXJkb3duTG9naWMgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICcuL2ZpbHRlcic7XG5pbXBvcnQgeyB0aHJvd0lmRW1wdHkgfSBmcm9tICcuL3Rocm93SWZFbXB0eSc7XG5pbXBvcnQgeyBkZWZhdWx0SWZFbXB0eSB9IGZyb20gJy4vZGVmYXVsdElmRW1wdHknO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJy4vdGFrZSc7XG5cbi8qKlxuICogRW1pdHMgdGhlIHNpbmdsZSB2YWx1ZSBhdCB0aGUgc3BlY2lmaWVkIGBpbmRleGAgaW4gYSBzZXF1ZW5jZSBvZiBlbWlzc2lvbnNcbiAqIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5FbWl0cyBvbmx5IHRoZSBpLXRoIHZhbHVlLCB0aGVuIGNvbXBsZXRlcy48L3NwYW4+XG4gKlxuICogIVtdKGVsZW1lbnRBdC5wbmcpXG4gKlxuICogYGVsZW1lbnRBdGAgcmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdGhlIGl0ZW0gYXQgdGhlIHNwZWNpZmllZFxuICogYGluZGV4YCBpbiB0aGUgc291cmNlIE9ic2VydmFibGUsIG9yIGEgZGVmYXVsdCB2YWx1ZSBpZiB0aGF0IGBpbmRleGAgaXMgb3V0XG4gKiBvZiByYW5nZSBhbmQgdGhlIGBkZWZhdWx0YCBhcmd1bWVudCBpcyBwcm92aWRlZC4gSWYgdGhlIGBkZWZhdWx0YCBhcmd1bWVudCBpc1xuICogbm90IGdpdmVuIGFuZCB0aGUgYGluZGV4YCBpcyBvdXQgb2YgcmFuZ2UsIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZSB3aWxsIGVtaXQgYW5cbiAqIGBBcmd1bWVudE91dE9mUmFuZ2VFcnJvcmAgZXJyb3IuXG4gKlxuICogIyMgRXhhbXBsZVxuICogRW1pdCBvbmx5IHRoZSB0aGlyZCBjbGljayBldmVudFxuICogYGBgamF2YXNjcmlwdFxuICogY29uc3QgY2xpY2tzID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIGNvbnN0IHJlc3VsdCA9IGNsaWNrcy5waXBlKGVsZW1lbnRBdCgyKSk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIC8vIFJlc3VsdHMgaW46XG4gKiAvLyBjbGljayAxID0gbm90aGluZ1xuICogLy8gY2xpY2sgMiA9IG5vdGhpbmdcbiAqIC8vIGNsaWNrIDMgPSBNb3VzZUV2ZW50IG9iamVjdCBsb2dnZWQgdG8gY29uc29sZVxuICogYGBgXG4gKlxuICogQHNlZSB7QGxpbmsgZmlyc3R9XG4gKiBAc2VlIHtAbGluayBsYXN0fVxuICogQHNlZSB7QGxpbmsgc2tpcH1cbiAqIEBzZWUge0BsaW5rIHNpbmdsZX1cbiAqIEBzZWUge0BsaW5rIHRha2V9XG4gKlxuICogQHRocm93cyB7QXJndW1lbnRPdXRPZlJhbmdlRXJyb3J9IFdoZW4gdXNpbmcgYGVsZW1lbnRBdChpKWAsIGl0IGRlbGl2ZXJzIGFuXG4gKiBBcmd1bWVudE91dE9yUmFuZ2VFcnJvciB0byB0aGUgT2JzZXJ2ZXIncyBgZXJyb3JgIGNhbGxiYWNrIGlmIGBpIDwgMGAgb3IgdGhlXG4gKiBPYnNlcnZhYmxlIGhhcyBjb21wbGV0ZWQgYmVmb3JlIGVtaXR0aW5nIHRoZSBpLXRoIGBuZXh0YCBub3RpZmljYXRpb24uXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IElzIHRoZSBudW1iZXIgYGlgIGZvciB0aGUgaS10aCBzb3VyY2UgZW1pc3Npb24gdGhhdCBoYXNcbiAqIGhhcHBlbmVkIHNpbmNlIHRoZSBzdWJzY3JpcHRpb24sIHN0YXJ0aW5nIGZyb20gdGhlIG51bWJlciBgMGAuXG4gKiBAcGFyYW0ge1R9IFtkZWZhdWx0VmFsdWVdIFRoZSBkZWZhdWx0IHZhbHVlIHJldHVybmVkIGZvciBtaXNzaW5nIGluZGljZXMuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgYSBzaW5nbGUgaXRlbSwgaWYgaXQgaXMgZm91bmQuXG4gKiBPdGhlcndpc2UsIHdpbGwgZW1pdCB0aGUgZGVmYXVsdCB2YWx1ZSBpZiBnaXZlbi4gSWYgbm90LCB0aGVuIGVtaXRzIGFuIGVycm9yLlxuICogQG1ldGhvZCBlbGVtZW50QXRcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50QXQ8VD4oaW5kZXg6IG51bWJlciwgZGVmYXVsdFZhbHVlPzogVCk6IE1vbm9UeXBlT3BlcmF0b3JGdW5jdGlvbjxUPiB7XG4gIGlmIChpbmRleCA8IDApIHsgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yKCk7IH1cbiAgY29uc3QgaGFzRGVmYXVsdFZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+PSAyO1xuICByZXR1cm4gKHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gc291cmNlLnBpcGUoXG4gICAgZmlsdGVyKCh2LCBpKSA9PiBpID09PSBpbmRleCksXG4gICAgdGFrZSgxKSxcbiAgICBoYXNEZWZhdWx0VmFsdWVcbiAgICAgID8gZGVmYXVsdElmRW1wdHkoZGVmYXVsdFZhbHVlKVxuICAgICAgOiB0aHJvd0lmRW1wdHkoKCkgPT4gbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yKCkpLFxuICApO1xufVxuIl19