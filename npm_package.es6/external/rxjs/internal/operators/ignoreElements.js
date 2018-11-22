import { Subscriber } from '../Subscriber';
export function ignoreElements() {
    return function ignoreElementsOperatorFunction(source) {
        return source.lift(new IgnoreElementsOperator());
    };
}
class IgnoreElementsOperator {
    call(subscriber, source) {
        return source.subscribe(new IgnoreElementsSubscriber(subscriber));
    }
}
class IgnoreElementsSubscriber extends Subscriber {
    _next(unused) {
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWdub3JlRWxlbWVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9leHRlcm5hbC9yeGpzL2ludGVybmFsL29wZXJhdG9ycy9pZ25vcmVFbGVtZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBMkIzQyxNQUFNLFVBQVUsY0FBYztJQUM1QixPQUFPLFNBQVMsOEJBQThCLENBQUMsTUFBdUI7UUFDcEUsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLHNCQUFzQjtJQUMxQixJQUFJLENBQUMsVUFBeUIsRUFBRSxNQUFXO1FBQ3pDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztDQUNGO0FBT0QsTUFBTSx3QkFBNEIsU0FBUSxVQUFhO0lBQzNDLEtBQUssQ0FBQyxNQUFTO0lBRXpCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgT3BlcmF0b3JGdW5jdGlvbiB9IGZyb20gJy4uL3R5cGVzJztcblxuLyoqXG4gKiBJZ25vcmVzIGFsbCBpdGVtcyBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBhbmQgb25seSBwYXNzZXMgY2FsbHMgb2YgYGNvbXBsZXRlYCBvciBgZXJyb3JgLlxuICpcbiAqICFbXShpZ25vcmVFbGVtZW50cy5wbmcpXG4gKlxuICogIyMgRXhhbXBsZXNcbiAqICMjIyBJZ25vcmVzIGVtaXR0ZWQgdmFsdWVzLCByZWFjdHMgdG8gb2JzZXJ2YWJsZSdzIGNvbXBsZXRpb24uXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBvZigneW91JywgJ3RhbGtpbmcnLCAndG8nLCAnbWUnKS5waXBlKFxuICogICBpZ25vcmVFbGVtZW50cygpLFxuICogKVxuICogLnN1YnNjcmliZShcbiAqICAgd29yZCA9PiBjb25zb2xlLmxvZyh3b3JkKSxcbiAqICAgZXJyID0+IGNvbnNvbGUubG9nKCdlcnJvcjonLCBlcnIpLFxuICogICAoKSA9PiBjb25zb2xlLmxvZygndGhlIGVuZCcpLFxuICogKTtcbiAqIC8vIHJlc3VsdDpcbiAqIC8vICd0aGUgZW5kJ1xuICogYGBgXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBlbXB0eSBPYnNlcnZhYmxlIHRoYXQgb25seSBjYWxscyBgY29tcGxldGVgXG4gKiBvciBgZXJyb3JgLCBiYXNlZCBvbiB3aGljaCBvbmUgaXMgY2FsbGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqIEBtZXRob2QgaWdub3JlRWxlbWVudHNcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpZ25vcmVFbGVtZW50cygpOiBPcGVyYXRvckZ1bmN0aW9uPGFueSwgbmV2ZXI+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGlnbm9yZUVsZW1lbnRzT3BlcmF0b3JGdW5jdGlvbihzb3VyY2U6IE9ic2VydmFibGU8YW55Pikge1xuICAgIHJldHVybiBzb3VyY2UubGlmdChuZXcgSWdub3JlRWxlbWVudHNPcGVyYXRvcigpKTtcbiAgfTtcbn1cblxuY2xhc3MgSWdub3JlRWxlbWVudHNPcGVyYXRvcjxULCBSPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFI+IHtcbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFI+LCBzb3VyY2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IElnbm9yZUVsZW1lbnRzU3Vic2NyaWJlcihzdWJzY3JpYmVyKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIElnbm9yZUVsZW1lbnRzU3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBwcm90ZWN0ZWQgX25leHQodW51c2VkOiBUKTogdm9pZCB7XG4gICAgLy8gRG8gbm90aGluZ1xuICB9XG59XG4iXX0=