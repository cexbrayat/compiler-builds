import { multicast } from './multicast';
import { refCount } from './refCount';
import { Subject } from '../Subject';
function shareSubjectFactory() {
    return new Subject();
}
export function share() {
    return (source) => refCount()(multicast(shareSubjectFactory)(source));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9leHRlcm5hbC9yeGpzL2ludGVybmFsL29wZXJhdG9ycy9zaGFyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDdEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFlBQVksQ0FBQztBQUlyQyxTQUFTLG1CQUFtQjtJQUMxQixPQUFPLElBQUksT0FBTyxFQUFFLENBQUM7QUFDdkIsQ0FBQztBQWNELE1BQU0sVUFBVSxLQUFLO0lBQ25CLE9BQU8sQ0FBQyxNQUFxQixFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBa0IsQ0FBQztBQUN4RyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgbXVsdGljYXN0IH0gZnJvbSAnLi9tdWx0aWNhc3QnO1xuaW1wb3J0IHsgcmVmQ291bnQgfSBmcm9tICcuL3JlZkNvdW50JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICcuLi9TdWJqZWN0JztcblxuaW1wb3J0IHsgTW9ub1R5cGVPcGVyYXRvckZ1bmN0aW9uIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5mdW5jdGlvbiBzaGFyZVN1YmplY3RGYWN0b3J5KCkge1xuICByZXR1cm4gbmV3IFN1YmplY3QoKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IE9ic2VydmFibGUgdGhhdCBtdWx0aWNhc3RzIChzaGFyZXMpIHRoZSBvcmlnaW5hbCBPYnNlcnZhYmxlLiBBcyBsb25nIGFzIHRoZXJlIGlzIGF0IGxlYXN0IG9uZVxuICogU3Vic2NyaWJlciB0aGlzIE9ic2VydmFibGUgd2lsbCBiZSBzdWJzY3JpYmVkIGFuZCBlbWl0dGluZyBkYXRhLiBXaGVuIGFsbCBzdWJzY3JpYmVycyBoYXZlIHVuc3Vic2NyaWJlZCBpdCB3aWxsXG4gKiB1bnN1YnNjcmliZSBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZS4gQmVjYXVzZSB0aGUgT2JzZXJ2YWJsZSBpcyBtdWx0aWNhc3RpbmcgaXQgbWFrZXMgdGhlIHN0cmVhbSBgaG90YC5cbiAqIFRoaXMgaXMgYW4gYWxpYXMgZm9yIGBtdWx0aWNhc3QoKCkgPT4gbmV3IFN1YmplY3QoKSksIHJlZkNvdW50KClgLlxuICpcbiAqICFbXShzaGFyZS5wbmcpXG4gKlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn0gQW4gT2JzZXJ2YWJsZSB0aGF0IHVwb24gY29ubmVjdGlvbiBjYXVzZXMgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHRvIGVtaXQgaXRlbXMgdG8gaXRzIE9ic2VydmVycy5cbiAqIEBtZXRob2Qgc2hhcmVcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaGFyZTxUPigpOiBNb25vVHlwZU9wZXJhdG9yRnVuY3Rpb248VD4ge1xuICByZXR1cm4gKHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gcmVmQ291bnQoKShtdWx0aWNhc3Qoc2hhcmVTdWJqZWN0RmFjdG9yeSkoc291cmNlKSkgYXMgT2JzZXJ2YWJsZTxUPjtcbn1cbiJdfQ==