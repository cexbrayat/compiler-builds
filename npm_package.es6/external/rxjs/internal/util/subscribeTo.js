import { Observable } from '../Observable';
import { subscribeToArray } from './subscribeToArray';
import { subscribeToPromise } from './subscribeToPromise';
import { subscribeToIterable } from './subscribeToIterable';
import { subscribeToObservable } from './subscribeToObservable';
import { isArrayLike } from './isArrayLike';
import { isPromise } from './isPromise';
import { isObject } from './isObject';
import { iterator as Symbol_iterator } from '../symbol/iterator';
import { observable as Symbol_observable } from '../symbol/observable';
export const subscribeTo = (result) => {
    if (result instanceof Observable) {
        return (subscriber) => {
            if (result._isScalar) {
                subscriber.next(result.value);
                subscriber.complete();
                return undefined;
            }
            else {
                return result.subscribe(subscriber);
            }
        };
    }
    else if (result && typeof result[Symbol_observable] === 'function') {
        return subscribeToObservable(result);
    }
    else if (isArrayLike(result)) {
        return subscribeToArray(result);
    }
    else if (isPromise(result)) {
        return subscribeToPromise(result);
    }
    else if (result && typeof result[Symbol_iterator] === 'function') {
        return subscribeToIterable(result);
    }
    else {
        const value = isObject(result) ? 'an invalid object' : `'${result}'`;
        const msg = `You provided ${value} where a stream was expected.`
            + ' You can provide an Observable, Promise, Array, or Iterable.';
        throw new TypeError(msg);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaWJlVG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9leHRlcm5hbC9yeGpzL2ludGVybmFsL3V0aWwvc3Vic2NyaWJlVG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLEVBQUUsUUFBUSxJQUFJLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxVQUFVLElBQUksaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUd2RSxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsQ0FBSSxNQUEwQixFQUFFLEVBQUU7SUFDM0QsSUFBSSxNQUFNLFlBQVksVUFBVSxFQUFFO1FBQ2hDLE9BQU8sQ0FBQyxVQUF5QixFQUFFLEVBQUU7WUFDakMsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFO2dCQUN0QixVQUFVLENBQUMsSUFBSSxDQUFFLE1BQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdkMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUN0QixPQUFPLFNBQVMsQ0FBQzthQUNsQjtpQkFBTTtnQkFDTCxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDckM7UUFDSCxDQUFDLENBQUM7S0FDSDtTQUFNLElBQUksTUFBTSxJQUFJLE9BQU8sTUFBTSxDQUFDLGlCQUFpQixDQUFDLEtBQUssVUFBVSxFQUFFO1FBQ3BFLE9BQU8scUJBQXFCLENBQUMsTUFBYSxDQUFDLENBQUM7S0FDN0M7U0FBTSxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUM5QixPQUFPLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2pDO1NBQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDNUIsT0FBTyxrQkFBa0IsQ0FBQyxNQUFzQixDQUFDLENBQUM7S0FDbkQ7U0FBTSxJQUFJLE1BQU0sSUFBSSxPQUFPLE1BQU0sQ0FBQyxlQUFlLENBQUMsS0FBSyxVQUFVLEVBQUU7UUFDbEUsT0FBTyxtQkFBbUIsQ0FBQyxNQUFhLENBQUMsQ0FBQztLQUMzQztTQUFNO1FBQ0wsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLEdBQUcsQ0FBQztRQUNyRSxNQUFNLEdBQUcsR0FBRyxnQkFBZ0IsS0FBSywrQkFBK0I7Y0FDNUQsOERBQThELENBQUM7UUFDbkUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMxQjtBQUNILENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE9ic2VydmFibGVJbnB1dCB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IHN1YnNjcmliZVRvQXJyYXkgfSBmcm9tICcuL3N1YnNjcmliZVRvQXJyYXknO1xuaW1wb3J0IHsgc3Vic2NyaWJlVG9Qcm9taXNlIH0gZnJvbSAnLi9zdWJzY3JpYmVUb1Byb21pc2UnO1xuaW1wb3J0IHsgc3Vic2NyaWJlVG9JdGVyYWJsZSB9IGZyb20gJy4vc3Vic2NyaWJlVG9JdGVyYWJsZSc7XG5pbXBvcnQgeyBzdWJzY3JpYmVUb09ic2VydmFibGUgfSBmcm9tICcuL3N1YnNjcmliZVRvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBpc0FycmF5TGlrZSB9IGZyb20gJy4vaXNBcnJheUxpa2UnO1xuaW1wb3J0IHsgaXNQcm9taXNlIH0gZnJvbSAnLi9pc1Byb21pc2UnO1xuaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICcuL2lzT2JqZWN0JztcbmltcG9ydCB7IGl0ZXJhdG9yIGFzIFN5bWJvbF9pdGVyYXRvciB9IGZyb20gJy4uL3N5bWJvbC9pdGVyYXRvcic7XG5pbXBvcnQgeyBvYnNlcnZhYmxlIGFzIFN5bWJvbF9vYnNlcnZhYmxlIH0gZnJvbSAnLi4vc3ltYm9sL29ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuXG5leHBvcnQgY29uc3Qgc3Vic2NyaWJlVG8gPSA8VD4ocmVzdWx0OiBPYnNlcnZhYmxlSW5wdXQ8VD4pID0+IHtcbiAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcbiAgICByZXR1cm4gKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4pID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdC5faXNTY2FsYXIpIHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KChyZXN1bHQgYXMgYW55KS52YWx1ZSk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXN1bHQuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgICAgfVxuICAgIH07XG4gIH0gZWxzZSBpZiAocmVzdWx0ICYmIHR5cGVvZiByZXN1bHRbU3ltYm9sX29ic2VydmFibGVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHN1YnNjcmliZVRvT2JzZXJ2YWJsZShyZXN1bHQgYXMgYW55KTtcbiAgfSBlbHNlIGlmIChpc0FycmF5TGlrZShyZXN1bHQpKSB7XG4gICAgcmV0dXJuIHN1YnNjcmliZVRvQXJyYXkocmVzdWx0KTtcbiAgfSBlbHNlIGlmIChpc1Byb21pc2UocmVzdWx0KSkge1xuICAgIHJldHVybiBzdWJzY3JpYmVUb1Byb21pc2UocmVzdWx0IGFzIFByb21pc2U8YW55Pik7XG4gIH0gZWxzZSBpZiAocmVzdWx0ICYmIHR5cGVvZiByZXN1bHRbU3ltYm9sX2l0ZXJhdG9yXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBzdWJzY3JpYmVUb0l0ZXJhYmxlKHJlc3VsdCBhcyBhbnkpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHZhbHVlID0gaXNPYmplY3QocmVzdWx0KSA/ICdhbiBpbnZhbGlkIG9iamVjdCcgOiBgJyR7cmVzdWx0fSdgO1xuICAgIGNvbnN0IG1zZyA9IGBZb3UgcHJvdmlkZWQgJHt2YWx1ZX0gd2hlcmUgYSBzdHJlYW0gd2FzIGV4cGVjdGVkLmBcbiAgICAgICsgJyBZb3UgY2FuIHByb3ZpZGUgYW4gT2JzZXJ2YWJsZSwgUHJvbWlzZSwgQXJyYXksIG9yIEl0ZXJhYmxlLic7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihtc2cpO1xuICB9XG59O1xuIl19