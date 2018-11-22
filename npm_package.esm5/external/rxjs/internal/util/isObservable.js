import { Observable } from '../Observable';
export function isObservable(obj) {
    return !!obj && (obj instanceof Observable || (typeof obj.lift === 'function' && typeof obj.subscribe === 'function'));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNPYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZXh0ZXJuYWwvcnhqcy9pbnRlcm5hbC91dGlsL2lzT2JzZXJ2YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTzNDLE1BQU0sVUFBVSxZQUFZLENBQUksR0FBUTtJQUN0QyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLFlBQVksVUFBVSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxLQUFLLFVBQVUsSUFBSSxPQUFPLEdBQUcsQ0FBQyxTQUFTLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztBQUN6SCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUlucHV0IH0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vKipcbiAqIFRlc3RzIHRvIHNlZSBpZiB0aGUgb2JqZWN0IGlzIGFuIFJ4SlMge0BsaW5rIE9ic2VydmFibGV9XG4gKiBAcGFyYW0gb2JqIHRoZSBvYmplY3QgdG8gdGVzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYnNlcnZhYmxlPFQ+KG9iajogYW55KTogb2JqIGlzIE9ic2VydmFibGU8VD4ge1xuICByZXR1cm4gISFvYmogJiYgKG9iaiBpbnN0YW5jZW9mIE9ic2VydmFibGUgfHwgKHR5cGVvZiBvYmoubGlmdCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnN1YnNjcmliZSA9PT0gJ2Z1bmN0aW9uJykpO1xufVxuIl19