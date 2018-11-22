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
import { Subscriber } from '../Subscriber';
export function ignoreElements() {
    return function ignoreElementsOperatorFunction(source) {
        return source.lift(new IgnoreElementsOperator());
    };
}
var IgnoreElementsOperator = (function () {
    function IgnoreElementsOperator() {
    }
    IgnoreElementsOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new IgnoreElementsSubscriber(subscriber));
    };
    return IgnoreElementsOperator;
}());
var IgnoreElementsSubscriber = (function (_super) {
    __extends(IgnoreElementsSubscriber, _super);
    function IgnoreElementsSubscriber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IgnoreElementsSubscriber.prototype._next = function (unused) {
    };
    return IgnoreElementsSubscriber;
}(Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWdub3JlRWxlbWVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9leHRlcm5hbC9yeGpzL2ludGVybmFsL29wZXJhdG9ycy9pZ25vcmVFbGVtZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBRUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQTJCM0MsTUFBTSxVQUFVLGNBQWM7SUFDNUIsT0FBTyxTQUFTLDhCQUE4QixDQUFDLE1BQXVCO1FBQ3BFLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLHNCQUFzQixFQUFFLENBQUMsQ0FBQztJQUNuRCxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQ7SUFBQTtJQUlBLENBQUM7SUFIQyxxQ0FBSSxHQUFKLFVBQUssVUFBeUIsRUFBRSxNQUFXO1FBQ3pDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUNILDZCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7QUFPRDtJQUEwQyw0Q0FBYTtJQUF2RDs7SUFJQSxDQUFDO0lBSFcsd0NBQUssR0FBZixVQUFnQixNQUFTO0lBRXpCLENBQUM7SUFDSCwrQkFBQztBQUFELENBQUMsQUFKRCxDQUEwQyxVQUFVLEdBSW5EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBPcGVyYXRvckZ1bmN0aW9uIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vKipcbiAqIElnbm9yZXMgYWxsIGl0ZW1zIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGFuZCBvbmx5IHBhc3NlcyBjYWxscyBvZiBgY29tcGxldGVgIG9yIGBlcnJvcmAuXG4gKlxuICogIVtdKGlnbm9yZUVsZW1lbnRzLnBuZylcbiAqXG4gKiAjIyBFeGFtcGxlc1xuICogIyMjIElnbm9yZXMgZW1pdHRlZCB2YWx1ZXMsIHJlYWN0cyB0byBvYnNlcnZhYmxlJ3MgY29tcGxldGlvbi5cbiAqIGBgYGphdmFzY3JpcHRcbiAqIG9mKCd5b3UnLCAndGFsa2luZycsICd0bycsICdtZScpLnBpcGUoXG4gKiAgIGlnbm9yZUVsZW1lbnRzKCksXG4gKiApXG4gKiAuc3Vic2NyaWJlKFxuICogICB3b3JkID0+IGNvbnNvbGUubG9nKHdvcmQpLFxuICogICBlcnIgPT4gY29uc29sZS5sb2coJ2Vycm9yOicsIGVyciksXG4gKiAgICgpID0+IGNvbnNvbGUubG9nKCd0aGUgZW5kJyksXG4gKiApO1xuICogLy8gcmVzdWx0OlxuICogLy8gJ3RoZSBlbmQnXG4gKiBgYGBcbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIGVtcHR5IE9ic2VydmFibGUgdGhhdCBvbmx5IGNhbGxzIGBjb21wbGV0ZWBcbiAqIG9yIGBlcnJvcmAsIGJhc2VkIG9uIHdoaWNoIG9uZSBpcyBjYWxsZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICogQG1ldGhvZCBpZ25vcmVFbGVtZW50c1xuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlnbm9yZUVsZW1lbnRzKCk6IE9wZXJhdG9yRnVuY3Rpb248YW55LCBuZXZlcj4ge1xuICByZXR1cm4gZnVuY3Rpb24gaWdub3JlRWxlbWVudHNPcGVyYXRvckZ1bmN0aW9uKHNvdXJjZTogT2JzZXJ2YWJsZTxhbnk+KSB7XG4gICAgcmV0dXJuIHNvdXJjZS5saWZ0KG5ldyBJZ25vcmVFbGVtZW50c09wZXJhdG9yKCkpO1xuICB9O1xufVxuXG5jbGFzcyBJZ25vcmVFbGVtZW50c09wZXJhdG9yPFQsIFI+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgUj4ge1xuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8Uj4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgSWdub3JlRWxlbWVudHNTdWJzY3JpYmVyKHN1YnNjcmliZXIpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgSWdub3JlRWxlbWVudHNTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG4gIHByb3RlY3RlZCBfbmV4dCh1bnVzZWQ6IFQpOiB2b2lkIHtcbiAgICAvLyBEbyBub3RoaW5nXG4gIH1cbn1cbiJdfQ==