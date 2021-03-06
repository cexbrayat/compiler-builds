import { hostReportError } from './hostReportError';
export var subscribeToPromise = function (promise) { return function (subscriber) {
    promise.then(function (value) {
        if (!subscriber.closed) {
            subscriber.next(value);
            subscriber.complete();
        }
    }, function (err) { return subscriber.error(err); })
        .then(null, hostReportError);
    return subscriber;
}; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaWJlVG9Qcm9taXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZXh0ZXJuYWwvcnhqcy9pbnRlcm5hbC91dGlsL3N1YnNjcmliZVRvUHJvbWlzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFcEQsTUFBTSxDQUFDLElBQU0sa0JBQWtCLEdBQUcsVUFBSSxPQUF1QixJQUFLLE9BQUEsVUFBQyxVQUF5QjtJQUMxRixPQUFPLENBQUMsSUFBSSxDQUNWLFVBQUMsS0FBSztRQUNKLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO1lBQ3RCLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkIsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQyxFQUNELFVBQUMsR0FBUSxJQUFLLE9BQUEsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBckIsQ0FBcUIsQ0FDcEM7U0FDQSxJQUFJLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQzdCLE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUMsRUFaaUUsQ0FZakUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IGhvc3RSZXBvcnRFcnJvciB9IGZyb20gJy4vaG9zdFJlcG9ydEVycm9yJztcblxuZXhwb3J0IGNvbnN0IHN1YnNjcmliZVRvUHJvbWlzZSA9IDxUPihwcm9taXNlOiBQcm9taXNlTGlrZTxUPikgPT4gKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4pID0+IHtcbiAgcHJvbWlzZS50aGVuKFxuICAgICh2YWx1ZSkgPT4ge1xuICAgICAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICAoZXJyOiBhbnkpID0+IHN1YnNjcmliZXIuZXJyb3IoZXJyKVxuICApXG4gIC50aGVuKG51bGwsIGhvc3RSZXBvcnRFcnJvcik7XG4gIHJldHVybiBzdWJzY3JpYmVyO1xufTtcbiJdfQ==