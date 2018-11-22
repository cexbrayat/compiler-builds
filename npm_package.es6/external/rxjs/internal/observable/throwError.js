import { Observable } from '../Observable';
export function throwError(error, scheduler) {
    if (!scheduler) {
        return new Observable(subscriber => subscriber.error(error));
    }
    else {
        return new Observable(subscriber => scheduler.schedule(dispatch, 0, { error, subscriber }));
    }
}
function dispatch({ error, subscriber }) {
    subscriber.error(error);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyb3dFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2V4dGVybmFsL3J4anMvaW50ZXJuYWwvb2JzZXJ2YWJsZS90aHJvd0Vycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFvRTNDLE1BQU0sVUFBVSxVQUFVLENBQUMsS0FBVSxFQUFFLFNBQXlCO0lBQzlELElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDZCxPQUFPLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQzlEO1NBQU07UUFDTCxPQUFPLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUM3RjtBQUNILENBQUM7QUFPRCxTQUFTLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQWU7SUFDbEQsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU2NoZWR1bGVyTGlrZSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBubyBpdGVtcyB0byB0aGUgT2JzZXJ2ZXIgYW5kIGltbWVkaWF0ZWx5XG4gKiBlbWl0cyBhbiBlcnJvciBub3RpZmljYXRpb24uXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkp1c3QgZW1pdHMgJ2Vycm9yJywgYW5kIG5vdGhpbmcgZWxzZS5cbiAqIDwvc3Bhbj5cbiAqXG4gKiAhW10odGhyb3cucG5nKVxuICpcbiAqIFRoaXMgc3RhdGljIG9wZXJhdG9yIGlzIHVzZWZ1bCBmb3IgY3JlYXRpbmcgYSBzaW1wbGUgT2JzZXJ2YWJsZSB0aGF0IG9ubHlcbiAqIGVtaXRzIHRoZSBlcnJvciBub3RpZmljYXRpb24uIEl0IGNhbiBiZSB1c2VkIGZvciBjb21wb3Npbmcgd2l0aCBvdGhlclxuICogT2JzZXJ2YWJsZXMsIHN1Y2ggYXMgaW4gYSB7QGxpbmsgbWVyZ2VNYXB9LlxuICpcbiAqICMjIEV4YW1wbGVzXG4gKiAjIyMgRW1pdCB0aGUgbnVtYmVyIDcsIHRoZW4gZW1pdCBhbiBlcnJvclxuICogYGBgamF2YXNjcmlwdFxuICogaW1wb3J0IHsgdGhyb3dFcnJvciwgY29uY2F0LCBvZiB9IGZyb20gJ3J4anMnO1xuICpcbiAqIGNvbnN0IHJlc3VsdCA9IGNvbmNhdChvZig3KSwgdGhyb3dFcnJvcihuZXcgRXJyb3IoJ29vcHMhJykpKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSwgZSA9PiBjb25zb2xlLmVycm9yKGUpKTtcbiAqXG4gKiAvLyBMb2dzOlxuICogLy8gN1xuICogLy8gRXJyb3I6IG9vcHMhXG4gKiBgYGBcbiAqXG4gKiAtLS1cbiAqXG4gKiAjIyMgTWFwIGFuZCBmbGF0dGVuIG51bWJlcnMgdG8gdGhlIHNlcXVlbmNlICdhJywgJ2InLCAnYycsIGJ1dCB0aHJvdyBhbiBlcnJvciBmb3IgMTNcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGltcG9ydCB7IHRocm93RXJyb3IsIGludGVydmFsLCBvZiB9IGZyb20gJ3J4anMnO1xuICogaW1wb3J0IHsgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG4gKlxuICogaW50ZXJ2YWwoMTAwMCkucGlwZShcbiAqICAgbWVyZ2VNYXAoeCA9PiB4ID09PSAyXG4gKiAgICAgPyB0aHJvd0Vycm9yKCdUd29zIGFyZSBiYWQnKVxuICogICAgIDogb2YoJ2EnLCAnYicsICdjJylcbiAqICAgKSxcbiAqICkuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCksIGUgPT4gY29uc29sZS5lcnJvcihlKSk7XG4gKlxuICogLy8gTG9nczpcbiAqIC8vIGFcbiAqIC8vIGJcbiAqIC8vIGNcbiAqIC8vIGFcbiAqIC8vIGJcbiAqIC8vIGNcbiAqIC8vIFR3b3MgYXJlIGJhZFxuICogYGBgXG4gKlxuICogQHNlZSB7QGxpbmsgT2JzZXJ2YWJsZX1cbiAqIEBzZWUge0BsaW5rIGVtcHR5fVxuICogQHNlZSB7QGxpbmsgbmV2ZXJ9XG4gKiBAc2VlIHtAbGluayBvZn1cbiAqXG4gKiBAcGFyYW0ge2FueX0gZXJyb3IgVGhlIHBhcnRpY3VsYXIgRXJyb3IgdG8gcGFzcyB0byB0aGUgZXJyb3Igbm90aWZpY2F0aW9uLlxuICogQHBhcmFtIHtTY2hlZHVsZXJMaWtlfSBbc2NoZWR1bGVyXSBBIHtAbGluayBTY2hlZHVsZXJMaWtlfSB0byB1c2UgZm9yIHNjaGVkdWxpbmdcbiAqIHRoZSBlbWlzc2lvbiBvZiB0aGUgZXJyb3Igbm90aWZpY2F0aW9uLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gZXJyb3IgT2JzZXJ2YWJsZTogZW1pdHMgb25seSB0aGUgZXJyb3Igbm90aWZpY2F0aW9uXG4gKiB1c2luZyB0aGUgZ2l2ZW4gZXJyb3IgYXJndW1lbnQuXG4gKiBAc3RhdGljIHRydWVcbiAqIEBuYW1lIHRocm93RXJyb3JcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0aHJvd0Vycm9yKGVycm9yOiBhbnksIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiBPYnNlcnZhYmxlPG5ldmVyPiB7XG4gIGlmICghc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZXIgPT4gc3Vic2NyaWJlci5lcnJvcihlcnJvcikpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShzdWJzY3JpYmVyID0+IHNjaGVkdWxlci5zY2hlZHVsZShkaXNwYXRjaCwgMCwgeyBlcnJvciwgc3Vic2NyaWJlciB9KSk7XG4gIH1cbn1cblxuaW50ZXJmYWNlIERpc3BhdGNoQXJnIHtcbiAgZXJyb3I6IGFueTtcbiAgc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxhbnk+O1xufVxuXG5mdW5jdGlvbiBkaXNwYXRjaCh7IGVycm9yLCBzdWJzY3JpYmVyIH06IERpc3BhdGNoQXJnKSB7XG4gIHN1YnNjcmliZXIuZXJyb3IoZXJyb3IpO1xufVxuIl19