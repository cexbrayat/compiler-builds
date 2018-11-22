import { Observable } from '../Observable';
export function throwError(error, scheduler) {
    if (!scheduler) {
        return new Observable(function (subscriber) { return subscriber.error(error); });
    }
    else {
        return new Observable(function (subscriber) { return scheduler.schedule(dispatch, 0, { error: error, subscriber: subscriber }); });
    }
}
function dispatch(_a) {
    var error = _a.error, subscriber = _a.subscriber;
    subscriber.error(error);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyb3dFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2V4dGVybmFsL3J4anMvaW50ZXJuYWwvb2JzZXJ2YWJsZS90aHJvd0Vycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFvRTNDLE1BQU0sVUFBVSxVQUFVLENBQUMsS0FBVSxFQUFFLFNBQXlCO0lBQzlELElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDZCxPQUFPLElBQUksVUFBVSxDQUFDLFVBQUEsVUFBVSxJQUFJLE9BQUEsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO0tBQzlEO1NBQU07UUFDTCxPQUFPLElBQUksVUFBVSxDQUFDLFVBQUEsVUFBVSxJQUFJLE9BQUEsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxPQUFBLEVBQUUsVUFBVSxZQUFBLEVBQUUsQ0FBQyxFQUF0RCxDQUFzRCxDQUFDLENBQUM7S0FDN0Y7QUFDSCxDQUFDO0FBT0QsU0FBUyxRQUFRLENBQUMsRUFBa0M7UUFBaEMsZ0JBQUssRUFBRSwwQkFBVTtJQUNuQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTY2hlZHVsZXJMaWtlIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIG5vIGl0ZW1zIHRvIHRoZSBPYnNlcnZlciBhbmQgaW1tZWRpYXRlbHlcbiAqIGVtaXRzIGFuIGVycm9yIG5vdGlmaWNhdGlvbi5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SnVzdCBlbWl0cyAnZXJyb3InLCBhbmQgbm90aGluZyBlbHNlLlxuICogPC9zcGFuPlxuICpcbiAqICFbXSh0aHJvdy5wbmcpXG4gKlxuICogVGhpcyBzdGF0aWMgb3BlcmF0b3IgaXMgdXNlZnVsIGZvciBjcmVhdGluZyBhIHNpbXBsZSBPYnNlcnZhYmxlIHRoYXQgb25seVxuICogZW1pdHMgdGhlIGVycm9yIG5vdGlmaWNhdGlvbi4gSXQgY2FuIGJlIHVzZWQgZm9yIGNvbXBvc2luZyB3aXRoIG90aGVyXG4gKiBPYnNlcnZhYmxlcywgc3VjaCBhcyBpbiBhIHtAbGluayBtZXJnZU1hcH0uXG4gKlxuICogIyMgRXhhbXBsZXNcbiAqICMjIyBFbWl0IHRoZSBudW1iZXIgNywgdGhlbiBlbWl0IGFuIGVycm9yXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBpbXBvcnQgeyB0aHJvd0Vycm9yLCBjb25jYXQsIG9mIH0gZnJvbSAncnhqcyc7XG4gKlxuICogY29uc3QgcmVzdWx0ID0gY29uY2F0KG9mKDcpLCB0aHJvd0Vycm9yKG5ldyBFcnJvcignb29wcyEnKSkpO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpLCBlID0+IGNvbnNvbGUuZXJyb3IoZSkpO1xuICpcbiAqIC8vIExvZ3M6XG4gKiAvLyA3XG4gKiAvLyBFcnJvcjogb29wcyFcbiAqIGBgYFxuICpcbiAqIC0tLVxuICpcbiAqICMjIyBNYXAgYW5kIGZsYXR0ZW4gbnVtYmVycyB0byB0aGUgc2VxdWVuY2UgJ2EnLCAnYicsICdjJywgYnV0IHRocm93IGFuIGVycm9yIGZvciAxM1xuICogYGBgamF2YXNjcmlwdFxuICogaW1wb3J0IHsgdGhyb3dFcnJvciwgaW50ZXJ2YWwsIG9mIH0gZnJvbSAncnhqcyc7XG4gKiBpbXBvcnQgeyBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbiAqXG4gKiBpbnRlcnZhbCgxMDAwKS5waXBlKFxuICogICBtZXJnZU1hcCh4ID0+IHggPT09IDJcbiAqICAgICA/IHRocm93RXJyb3IoJ1R3b3MgYXJlIGJhZCcpXG4gKiAgICAgOiBvZignYScsICdiJywgJ2MnKVxuICogICApLFxuICogKS5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSwgZSA9PiBjb25zb2xlLmVycm9yKGUpKTtcbiAqXG4gKiAvLyBMb2dzOlxuICogLy8gYVxuICogLy8gYlxuICogLy8gY1xuICogLy8gYVxuICogLy8gYlxuICogLy8gY1xuICogLy8gVHdvcyBhcmUgYmFkXG4gKiBgYGBcbiAqXG4gKiBAc2VlIHtAbGluayBPYnNlcnZhYmxlfVxuICogQHNlZSB7QGxpbmsgZW1wdHl9XG4gKiBAc2VlIHtAbGluayBuZXZlcn1cbiAqIEBzZWUge0BsaW5rIG9mfVxuICpcbiAqIEBwYXJhbSB7YW55fSBlcnJvciBUaGUgcGFydGljdWxhciBFcnJvciB0byBwYXNzIHRvIHRoZSBlcnJvciBub3RpZmljYXRpb24uXG4gKiBAcGFyYW0ge1NjaGVkdWxlckxpa2V9IFtzY2hlZHVsZXJdIEEge0BsaW5rIFNjaGVkdWxlckxpa2V9IHRvIHVzZSBmb3Igc2NoZWR1bGluZ1xuICogdGhlIGVtaXNzaW9uIG9mIHRoZSBlcnJvciBub3RpZmljYXRpb24uXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBlcnJvciBPYnNlcnZhYmxlOiBlbWl0cyBvbmx5IHRoZSBlcnJvciBub3RpZmljYXRpb25cbiAqIHVzaW5nIHRoZSBnaXZlbiBlcnJvciBhcmd1bWVudC5cbiAqIEBzdGF0aWMgdHJ1ZVxuICogQG5hbWUgdGhyb3dFcnJvclxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRocm93RXJyb3IoZXJyb3I6IGFueSwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IE9ic2VydmFibGU8bmV2ZXI+IHtcbiAgaWYgKCFzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoc3Vic2NyaWJlciA9PiBzdWJzY3JpYmVyLmVycm9yKGVycm9yKSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZXIgPT4gc2NoZWR1bGVyLnNjaGVkdWxlKGRpc3BhdGNoLCAwLCB7IGVycm9yLCBzdWJzY3JpYmVyIH0pKTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgRGlzcGF0Y2hBcmcge1xuICBlcnJvcjogYW55O1xuICBzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPGFueT47XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoKHsgZXJyb3IsIHN1YnNjcmliZXIgfTogRGlzcGF0Y2hBcmcpIHtcbiAgc3Vic2NyaWJlci5lcnJvcihlcnJvcik7XG59XG4iXX0=