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
export function pairwise() {
    return function (source) { return source.lift(new PairwiseOperator()); };
}
var PairwiseOperator = (function () {
    function PairwiseOperator() {
    }
    PairwiseOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new PairwiseSubscriber(subscriber));
    };
    return PairwiseOperator;
}());
var PairwiseSubscriber = (function (_super) {
    __extends(PairwiseSubscriber, _super);
    function PairwiseSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.hasPrev = false;
        return _this;
    }
    PairwiseSubscriber.prototype._next = function (value) {
        if (this.hasPrev) {
            this.destination.next([this.prev, value]);
        }
        else {
            this.hasPrev = true;
        }
        this.prev = value;
    };
    return PairwiseSubscriber;
}(Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFpcndpc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9leHRlcm5hbC9yeGpzL2ludGVybmFsL29wZXJhdG9ycy9wYWlyd2lzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBRUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQTJDM0MsTUFBTSxVQUFVLFFBQVE7SUFDdEIsT0FBTyxVQUFDLE1BQXFCLElBQUssT0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksZ0JBQWdCLEVBQUUsQ0FBQyxFQUFuQyxDQUFtQyxDQUFDO0FBQ3hFLENBQUM7QUFFRDtJQUFBO0lBSUEsQ0FBQztJQUhDLCtCQUFJLEdBQUosVUFBSyxVQUE4QixFQUFFLE1BQVc7UUFDOUMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQU9EO0lBQW9DLHNDQUFhO0lBSS9DLDRCQUFZLFdBQStCO1FBQTNDLFlBQ0Usa0JBQU0sV0FBVyxDQUFDLFNBQ25CO1FBSk8sYUFBTyxHQUFZLEtBQUssQ0FBQzs7SUFJakMsQ0FBQztJQUVELGtDQUFLLEdBQUwsVUFBTSxLQUFRO1FBQ1osSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzNDO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNyQjtRQUVELElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFqQkQsQ0FBb0MsVUFBVSxHQWlCN0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IE9wZXJhdG9yRnVuY3Rpb24gfSBmcm9tICcuLi90eXBlcyc7XG5cbi8qKlxuICogR3JvdXBzIHBhaXJzIG9mIGNvbnNlY3V0aXZlIGVtaXNzaW9ucyB0b2dldGhlciBhbmQgZW1pdHMgdGhlbSBhcyBhbiBhcnJheSBvZlxuICogdHdvIHZhbHVlcy5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+UHV0cyB0aGUgY3VycmVudCB2YWx1ZSBhbmQgcHJldmlvdXMgdmFsdWUgdG9nZXRoZXIgYXNcbiAqIGFuIGFycmF5LCBhbmQgZW1pdHMgdGhhdC48L3NwYW4+XG4gKlxuICogIVtdKHBhaXJ3aXNlLnBuZylcbiAqXG4gKiBUaGUgTnRoIGVtaXNzaW9uIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHdpbGwgY2F1c2UgdGhlIG91dHB1dCBPYnNlcnZhYmxlXG4gKiB0byBlbWl0IGFuIGFycmF5IFsoTi0xKXRoLCBOdGhdIG9mIHRoZSBwcmV2aW91cyBhbmQgdGhlIGN1cnJlbnQgdmFsdWUsIGFzIGFcbiAqIHBhaXIuIEZvciB0aGlzIHJlYXNvbiwgYHBhaXJ3aXNlYCBlbWl0cyBvbiB0aGUgc2Vjb25kIGFuZCBzdWJzZXF1ZW50XG4gKiBlbWlzc2lvbnMgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUsIGJ1dCBub3Qgb24gdGhlIGZpcnN0IGVtaXNzaW9uLCBiZWNhdXNlXG4gKiB0aGVyZSBpcyBubyBwcmV2aW91cyB2YWx1ZSBpbiB0aGF0IGNhc2UuXG4gKlxuICogIyMgRXhhbXBsZVxuICogT24gZXZlcnkgY2xpY2sgKHN0YXJ0aW5nIGZyb20gdGhlIHNlY29uZCksIGVtaXQgdGhlIHJlbGF0aXZlIGRpc3RhbmNlIHRvIHRoZSBwcmV2aW91cyBjbGlja1xuICogYGBgamF2YXNjcmlwdFxuICogY29uc3QgY2xpY2tzID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIGNvbnN0IHBhaXJzID0gY2xpY2tzLnBpcGUocGFpcndpc2UoKSk7XG4gKiBjb25zdCBkaXN0YW5jZSA9IHBhaXJzLnBpcGUoXG4gKiAgIG1hcChwYWlyID0+IHtcbiAqICAgICBjb25zdCB4MCA9IHBhaXJbMF0uY2xpZW50WDtcbiAqICAgICBjb25zdCB5MCA9IHBhaXJbMF0uY2xpZW50WTtcbiAqICAgICBjb25zdCB4MSA9IHBhaXJbMV0uY2xpZW50WDtcbiAqICAgICBjb25zdCB5MSA9IHBhaXJbMV0uY2xpZW50WTtcbiAqICAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHgwIC0geDEsIDIpICsgTWF0aC5wb3coeTAgLSB5MSwgMikpO1xuICogICB9KSxcbiAqICk7XG4gKiBkaXN0YW5jZS5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKiBgYGBcbiAqXG4gKiBAc2VlIHtAbGluayBidWZmZXJ9XG4gKiBAc2VlIHtAbGluayBidWZmZXJDb3VudH1cbiAqXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPEFycmF5PFQ+Pn0gQW4gT2JzZXJ2YWJsZSBvZiBwYWlycyAoYXMgYXJyYXlzKSBvZlxuICogY29uc2VjdXRpdmUgdmFsdWVzIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICogQG1ldGhvZCBwYWlyd2lzZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhaXJ3aXNlPFQ+KCk6IE9wZXJhdG9yRnVuY3Rpb248VCwgW1QsIFRdPiB7XG4gIHJldHVybiAoc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBzb3VyY2UubGlmdChuZXcgUGFpcndpc2VPcGVyYXRvcigpKTtcbn1cblxuY2xhc3MgUGFpcndpc2VPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFtULCBUXT4ge1xuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8W1QsIFRdPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBQYWlyd2lzZVN1YnNjcmliZXIoc3Vic2NyaWJlcikpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBQYWlyd2lzZVN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgcHJpdmF0ZSBwcmV2OiBUO1xuICBwcml2YXRlIGhhc1ByZXY6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxbVCwgVF0+KSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICB9XG5cbiAgX25leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5oYXNQcmV2KSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQoW3RoaXMucHJldiwgdmFsdWVdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oYXNQcmV2ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLnByZXYgPSB2YWx1ZTtcbiAgfVxufVxuIl19