var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { OuterSubscriber } from '../OuterSubscriber';
import { InnerSubscriber } from '../InnerSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
export function catchError(selector) {
    return function catchErrorOperatorFunction(source) {
        var operator = new CatchOperator(selector);
        var caught = source.lift(operator);
        return (operator.caught = caught);
    };
}
var CatchOperator = (function () {
    function CatchOperator(selector) {
        this.selector = selector;
    }
    CatchOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
    };
    return CatchOperator;
}());
var CatchSubscriber = (function (_super) {
    __extends(CatchSubscriber, _super);
    function CatchSubscriber(destination, selector, caught) {
        var _this = _super.call(this, destination) || this;
        _this.selector = selector;
        _this.caught = caught;
        return _this;
    }
    CatchSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var result = void 0;
            try {
                result = this.selector(err, this.caught);
            }
            catch (err2) {
                _super.prototype.error.call(this, err2);
                return;
            }
            this._unsubscribeAndRecycle();
            var innerSubscriber = new InnerSubscriber(this, undefined, undefined);
            this.add(innerSubscriber);
            subscribeToResult(this, result, undefined, undefined, innerSubscriber);
        }
    };
    return CatchSubscriber;
}(OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0Y2hFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2V4dGVybmFsL3J4anMvaW50ZXJuYWwvb3BlcmF0b3JzL2NhdGNoRXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUlBLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUF3RTVELE1BQU0sVUFBVSxVQUFVLENBQU8sUUFBaUU7SUFDaEcsT0FBTyxTQUFTLDBCQUEwQixDQUFDLE1BQXFCO1FBQzlELElBQU0sUUFBUSxHQUFHLElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBdUIsQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRDtJQUdFLHVCQUFvQixRQUFxRTtRQUFyRSxhQUFRLEdBQVIsUUFBUSxDQUE2RDtJQUN6RixDQUFDO0lBRUQsNEJBQUksR0FBSixVQUFLLFVBQXlCLEVBQUUsTUFBVztRQUN6QyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxlQUFlLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7QUFPRDtJQUFvQyxtQ0FBeUI7SUFDM0QseUJBQVksV0FBNEIsRUFDcEIsUUFBcUUsRUFDckUsTUFBcUI7UUFGekMsWUFHRSxrQkFBTSxXQUFXLENBQUMsU0FDbkI7UUFIbUIsY0FBUSxHQUFSLFFBQVEsQ0FBNkQ7UUFDckUsWUFBTSxHQUFOLE1BQU0sQ0FBZTs7SUFFekMsQ0FBQztJQU9ELCtCQUFLLEdBQUwsVUFBTSxHQUFRO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsSUFBSSxNQUFNLFNBQUssQ0FBQztZQUNoQixJQUFJO2dCQUNGLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDMUM7WUFBQyxPQUFPLElBQUksRUFBRTtnQkFDYixpQkFBTSxLQUFLLFlBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLE9BQU87YUFDUjtZQUNELElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQzlCLElBQU0sZUFBZSxHQUFHLElBQUksZUFBZSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMxQixpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDeEU7SUFDSCxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBM0JELENBQW9DLGVBQWUsR0EyQmxEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPcGVyYXRvcn0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHtTdWJzY3JpYmVyfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7T3V0ZXJTdWJzY3JpYmVyfSBmcm9tICcuLi9PdXRlclN1YnNjcmliZXInO1xuaW1wb3J0IHsgSW5uZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vSW5uZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7c3Vic2NyaWJlVG9SZXN1bHR9IGZyb20gJy4uL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQnO1xuaW1wb3J0IHtPYnNlcnZhYmxlSW5wdXQsIE9wZXJhdG9yRnVuY3Rpb24sIE1vbm9UeXBlT3BlcmF0b3JGdW5jdGlvbn0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vKipcbiAqIENhdGNoZXMgZXJyb3JzIG9uIHRoZSBvYnNlcnZhYmxlIHRvIGJlIGhhbmRsZWQgYnkgcmV0dXJuaW5nIGEgbmV3IG9ic2VydmFibGUgb3IgdGhyb3dpbmcgYW4gZXJyb3IuXG4gKlxuICogIVtdKGNhdGNoLnBuZylcbiAqXG4gKiAjIyBFeGFtcGxlc1xuICogQ29udGludWVzIHdpdGggYSBkaWZmZXJlbnQgT2JzZXJ2YWJsZSB3aGVuIHRoZXJlJ3MgYW4gZXJyb3JcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBvZigxLCAyLCAzLCA0LCA1KS5waXBlKFxuICogICAgIG1hcChuID0+IHtcbiAqICAgXHQgICBpZiAobiA9PSA0KSB7XG4gKiBcdCAgICAgICB0aHJvdyAnZm91ciEnO1xuICogICAgICAgfVxuICpcdCAgICAgcmV0dXJuIG47XG4gKiAgICAgfSksXG4gKiAgICAgY2F0Y2hFcnJvcihlcnIgPT4gb2YoJ0knLCAnSUknLCAnSUlJJywgJ0lWJywgJ1YnKSksXG4gKiAgIClcbiAqICAgLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqICAgLy8gMSwgMiwgMywgSSwgSUksIElJSSwgSVYsIFZcbiAqIGBgYFxuICpcbiAqIFJldHJpZXMgdGhlIGNhdWdodCBzb3VyY2UgT2JzZXJ2YWJsZSBhZ2FpbiBpbiBjYXNlIG9mIGVycm9yLCBzaW1pbGFyIHRvIHJldHJ5KCkgb3BlcmF0b3JcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBvZigxLCAyLCAzLCA0LCA1KS5waXBlKFxuICogICAgIG1hcChuID0+IHtcbiAqICAgXHQgICBpZiAobiA9PT0gNCkge1xuICogICBcdCAgICAgdGhyb3cgJ2ZvdXIhJztcbiAqICAgICAgIH1cbiAqIFx0ICAgICByZXR1cm4gbjtcbiAqICAgICB9KSxcbiAqICAgICBjYXRjaEVycm9yKChlcnIsIGNhdWdodCkgPT4gY2F1Z2h0KSxcbiAqICAgICB0YWtlKDMwKSxcbiAqICAgKVxuICogICAuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICogICAvLyAxLCAyLCAzLCAxLCAyLCAzLCAuLi5cbiAqIGBgYFxuICpcbiAqIFRocm93cyBhIG5ldyBlcnJvciB3aGVuIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB0aHJvd3MgYW4gZXJyb3JcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBvZigxLCAyLCAzLCA0LCA1KS5waXBlKFxuICogICAgIG1hcChuID0+IHtcbiAqICAgICAgIGlmIChuID09IDQpIHtcbiAqICAgICAgICAgdGhyb3cgJ2ZvdXIhJztcbiAqICAgICAgIH1cbiAqICAgICAgIHJldHVybiBuO1xuICogICAgIH0pLFxuICogICAgIGNhdGNoRXJyb3IoZXJyID0+IHtcbiAqICAgICAgIHRocm93ICdlcnJvciBpbiBzb3VyY2UuIERldGFpbHM6ICcgKyBlcnI7XG4gKiAgICAgfSksXG4gKiAgIClcbiAqICAgLnN1YnNjcmliZShcbiAqICAgICB4ID0+IGNvbnNvbGUubG9nKHgpLFxuICogICAgIGVyciA9PiBjb25zb2xlLmxvZyhlcnIpXG4gKiAgICk7XG4gKiAgIC8vIDEsIDIsIDMsIGVycm9yIGluIHNvdXJjZS4gRGV0YWlsczogZm91ciFcbiAqIGBgYFxuICpcbiAqICBAcGFyYW0ge2Z1bmN0aW9ufSBzZWxlY3RvciBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYXMgYXJndW1lbnRzIGBlcnJgLCB3aGljaCBpcyB0aGUgZXJyb3IsIGFuZCBgY2F1Z2h0YCwgd2hpY2hcbiAqICBpcyB0aGUgc291cmNlIG9ic2VydmFibGUsIGluIGNhc2UgeW91J2QgbGlrZSB0byBcInJldHJ5XCIgdGhhdCBvYnNlcnZhYmxlIGJ5IHJldHVybmluZyBpdCBhZ2Fpbi4gV2hhdGV2ZXIgb2JzZXJ2YWJsZVxuICogIGlzIHJldHVybmVkIGJ5IHRoZSBgc2VsZWN0b3JgIHdpbGwgYmUgdXNlZCB0byBjb250aW51ZSB0aGUgb2JzZXJ2YWJsZSBjaGFpbi5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIG9ic2VydmFibGUgdGhhdCBvcmlnaW5hdGVzIGZyb20gZWl0aGVyIHRoZSBzb3VyY2Ugb3IgdGhlIG9ic2VydmFibGUgcmV0dXJuZWQgYnkgdGhlXG4gKiAgY2F0Y2ggYHNlbGVjdG9yYCBmdW5jdGlvbi5cbiAqIEBuYW1lIGNhdGNoRXJyb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhdGNoRXJyb3I8VD4oc2VsZWN0b3I6IChlcnI6IGFueSwgY2F1Z2h0OiBPYnNlcnZhYmxlPFQ+KSA9PiBuZXZlcik6IE1vbm9UeXBlT3BlcmF0b3JGdW5jdGlvbjxUPjtcbmV4cG9ydCBmdW5jdGlvbiBjYXRjaEVycm9yPFQsIFI+KHNlbGVjdG9yOiAoZXJyOiBhbnksIGNhdWdodDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZUlucHV0PFI+KTogT3BlcmF0b3JGdW5jdGlvbjxULCBUIHwgUj47XG5leHBvcnQgZnVuY3Rpb24gY2F0Y2hFcnJvcjxULCBSPihzZWxlY3RvcjogKGVycjogYW55LCBjYXVnaHQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGVJbnB1dDxSPik6IE9wZXJhdG9yRnVuY3Rpb248VCwgVCB8IFI+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGNhdGNoRXJyb3JPcGVyYXRvckZ1bmN0aW9uKHNvdXJjZTogT2JzZXJ2YWJsZTxUPik6IE9ic2VydmFibGU8VCB8IFI+IHtcbiAgICBjb25zdCBvcGVyYXRvciA9IG5ldyBDYXRjaE9wZXJhdG9yKHNlbGVjdG9yKTtcbiAgICBjb25zdCBjYXVnaHQgPSBzb3VyY2UubGlmdChvcGVyYXRvcik7XG4gICAgcmV0dXJuIChvcGVyYXRvci5jYXVnaHQgPSBjYXVnaHQgYXMgT2JzZXJ2YWJsZTxUPik7XG4gIH07XG59XG5cbmNsYXNzIENhdGNoT3BlcmF0b3I8VCwgUj4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUIHwgUj4ge1xuICBjYXVnaHQ6IE9ic2VydmFibGU8VD47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZWxlY3RvcjogKGVycjogYW55LCBjYXVnaHQ6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGVJbnB1dDxUIHwgUj4pIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxSPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBDYXRjaFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5zZWxlY3RvciwgdGhpcy5jYXVnaHQpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgQ2F0Y2hTdWJzY3JpYmVyPFQsIFI+IGV4dGVuZHMgT3V0ZXJTdWJzY3JpYmVyPFQsIFQgfCBSPiB7XG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPGFueT4sXG4gICAgICAgICAgICAgIHByaXZhdGUgc2VsZWN0b3I6IChlcnI6IGFueSwgY2F1Z2h0OiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlSW5wdXQ8VCB8IFI+LFxuICAgICAgICAgICAgICBwcml2YXRlIGNhdWdodDogT2JzZXJ2YWJsZTxUPikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIC8vIE5PVEU6IG92ZXJyaWRpbmcgYGVycm9yYCBpbnN0ZWFkIG9mIGBfZXJyb3JgIGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudFxuICAvLyB0byBoYXZlIHRoaXMgZmxhZyB0aGlzIHN1YnNjcmliZXIgYXMgYGlzU3RvcHBlZGAuIFdlIGNhbiBtaW1pYyB0aGVcbiAgLy8gYmVoYXZpb3Igb2YgdGhlIFJldHJ5U3Vic2NyaWJlciAoZnJvbSB0aGUgYHJldHJ5YCBvcGVyYXRvciksIHdoZXJlXG4gIC8vIHdlIHVuc3Vic2NyaWJlIGZyb20gb3VyIHNvdXJjZSBjaGFpbiwgcmVzZXQgb3VyIFN1YnNjcmliZXIgZmxhZ3MsXG4gIC8vIHRoZW4gc3Vic2NyaWJlIHRvIHRoZSBzZWxlY3RvciByZXN1bHQuXG4gIGVycm9yKGVycjogYW55KSB7XG4gICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgbGV0IHJlc3VsdDogYW55O1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5zZWxlY3RvcihlcnIsIHRoaXMuY2F1Z2h0KTtcbiAgICAgIH0gY2F0Y2ggKGVycjIpIHtcbiAgICAgICAgc3VwZXIuZXJyb3IoZXJyMik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlQW5kUmVjeWNsZSgpO1xuICAgICAgY29uc3QgaW5uZXJTdWJzY3JpYmVyID0gbmV3IElubmVyU3Vic2NyaWJlcih0aGlzLCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7XG4gICAgICB0aGlzLmFkZChpbm5lclN1YnNjcmliZXIpO1xuICAgICAgc3Vic2NyaWJlVG9SZXN1bHQodGhpcywgcmVzdWx0LCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgaW5uZXJTdWJzY3JpYmVyKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==