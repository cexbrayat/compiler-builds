import { BehaviorSubject } from '../BehaviorSubject';
import { multicast } from './multicast';
export function publishBehavior(value) {
    return function (source) { return multicast(new BehaviorSubject(value))(source); };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGlzaEJlaGF2aW9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZXh0ZXJuYWwvcnhqcy9pbnRlcm5hbC9vcGVyYXRvcnMvcHVibGlzaEJlaGF2aW9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBVXhDLE1BQU0sVUFBVSxlQUFlLENBQUksS0FBUTtJQUN6QyxPQUFPLFVBQUMsTUFBcUIsSUFBSyxPQUFBLFNBQVMsQ0FBQyxJQUFJLGVBQWUsQ0FBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBNkIsRUFBNUUsQ0FBNEUsQ0FBQztBQUNqSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAnLi4vQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IG11bHRpY2FzdCB9IGZyb20gJy4vbXVsdGljYXN0JztcbmltcG9ydCB7IENvbm5lY3RhYmxlT2JzZXJ2YWJsZSB9IGZyb20gJy4uL29ic2VydmFibGUvQ29ubmVjdGFibGVPYnNlcnZhYmxlJztcbmltcG9ydCB7IFVuYXJ5RnVuY3Rpb24gfSBmcm9tICcuLi90eXBlcyc7XG5cbi8qKlxuICogQHBhcmFtIHZhbHVlXG4gKiBAcmV0dXJuIHtDb25uZWN0YWJsZU9ic2VydmFibGU8VD59XG4gKiBAbWV0aG9kIHB1Ymxpc2hCZWhhdmlvclxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHB1Ymxpc2hCZWhhdmlvcjxUPih2YWx1ZTogVCk6ICBVbmFyeUZ1bmN0aW9uPE9ic2VydmFibGU8VD4sIENvbm5lY3RhYmxlT2JzZXJ2YWJsZTxUPj4ge1xuICByZXR1cm4gKHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gbXVsdGljYXN0KG5ldyBCZWhhdmlvclN1YmplY3Q8VD4odmFsdWUpKShzb3VyY2UpIGFzIENvbm5lY3RhYmxlT2JzZXJ2YWJsZTxUPjtcbn1cbiJdfQ==