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
import { subscribeToResult } from '../util/subscribeToResult';
export function distinct(keySelector, flushes) {
    return function (source) { return source.lift(new DistinctOperator(keySelector, flushes)); };
}
var DistinctOperator = (function () {
    function DistinctOperator(keySelector, flushes) {
        this.keySelector = keySelector;
        this.flushes = flushes;
    }
    DistinctOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DistinctSubscriber(subscriber, this.keySelector, this.flushes));
    };
    return DistinctOperator;
}());
var DistinctSubscriber = (function (_super) {
    __extends(DistinctSubscriber, _super);
    function DistinctSubscriber(destination, keySelector, flushes) {
        var _this = _super.call(this, destination) || this;
        _this.keySelector = keySelector;
        _this.values = new Set();
        if (flushes) {
            _this.add(subscribeToResult(_this, flushes));
        }
        return _this;
    }
    DistinctSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values.clear();
    };
    DistinctSubscriber.prototype.notifyError = function (error, innerSub) {
        this._error(error);
    };
    DistinctSubscriber.prototype._next = function (value) {
        if (this.keySelector) {
            this._useKeySelector(value);
        }
        else {
            this._finalizeNext(value, value);
        }
    };
    DistinctSubscriber.prototype._useKeySelector = function (value) {
        var key;
        var destination = this.destination;
        try {
            key = this.keySelector(value);
        }
        catch (err) {
            destination.error(err);
            return;
        }
        this._finalizeNext(key, value);
    };
    DistinctSubscriber.prototype._finalizeNext = function (key, value) {
        var values = this.values;
        if (!values.has(key)) {
            values.add(key);
            this.destination.next(value);
        }
    };
    return DistinctSubscriber;
}(OuterSubscriber));
export { DistinctSubscriber };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdGluY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9leHRlcm5hbC9yeGpzL2ludGVybmFsL29wZXJhdG9ycy9kaXN0aW5jdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBR0EsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXJELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBdUQ5RCxNQUFNLFVBQVUsUUFBUSxDQUFPLFdBQTZCLEVBQzdCLE9BQXlCO0lBQ3RELE9BQU8sVUFBQyxNQUFxQixJQUFLLE9BQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUF2RCxDQUF1RCxDQUFDO0FBQzVGLENBQUM7QUFFRDtJQUNFLDBCQUFvQixXQUE0QixFQUFVLE9BQXdCO1FBQTlELGdCQUFXLEdBQVgsV0FBVyxDQUFpQjtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQWlCO0lBQ2xGLENBQUM7SUFFRCwrQkFBSSxHQUFKLFVBQUssVUFBeUIsRUFBRSxNQUFXO1FBQ3pDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBT0Q7SUFBOEMsc0NBQXFCO0lBR2pFLDRCQUFZLFdBQTBCLEVBQVUsV0FBNEIsRUFBRSxPQUF3QjtRQUF0RyxZQUNFLGtCQUFNLFdBQVcsQ0FBQyxTQUtuQjtRQU4rQyxpQkFBVyxHQUFYLFdBQVcsQ0FBaUI7UUFGcEUsWUFBTSxHQUFHLElBQUksR0FBRyxFQUFLLENBQUM7UUFLNUIsSUFBSSxPQUFPLEVBQUU7WUFDWCxLQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEtBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQzVDOztJQUNILENBQUM7SUFFRCx1Q0FBVSxHQUFWLFVBQVcsVUFBYSxFQUFFLFVBQWEsRUFDNUIsVUFBa0IsRUFBRSxVQUFrQixFQUN0QyxRQUErQjtRQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCx3Q0FBVyxHQUFYLFVBQVksS0FBVSxFQUFFLFFBQStCO1FBQ3JELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVTLGtDQUFLLEdBQWYsVUFBZ0IsS0FBUTtRQUN0QixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDbEM7SUFDSCxDQUFDO0lBRU8sNENBQWUsR0FBdkIsVUFBd0IsS0FBUTtRQUM5QixJQUFJLEdBQU0sQ0FBQztRQUNILElBQUEsOEJBQVcsQ0FBVTtRQUM3QixJQUFJO1lBQ0YsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0I7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVPLDBDQUFhLEdBQXJCLFVBQXNCLEdBQVEsRUFBRSxLQUFRO1FBQzlCLElBQUEsb0JBQU0sQ0FBVTtRQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBSSxHQUFHLENBQUMsRUFBRTtZQUN2QixNQUFNLENBQUMsR0FBRyxDQUFJLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQUVILHlCQUFDO0FBQUQsQ0FBQyxBQWpERCxDQUE4QyxlQUFlLEdBaUQ1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgT3V0ZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vT3V0ZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IElubmVyU3Vic2NyaWJlciB9IGZyb20gJy4uL0lubmVyU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBzdWJzY3JpYmVUb1Jlc3VsdCB9IGZyb20gJy4uL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQnO1xuaW1wb3J0IHsgTW9ub1R5cGVPcGVyYXRvckZ1bmN0aW9uLCBUZWFyZG93bkxvZ2ljIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vKipcbiAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGFsbCBpdGVtcyBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB0aGF0IGFyZSBkaXN0aW5jdCBieSBjb21wYXJpc29uIGZyb20gcHJldmlvdXMgaXRlbXMuXG4gKlxuICogSWYgYSBrZXlTZWxlY3RvciBmdW5jdGlvbiBpcyBwcm92aWRlZCwgdGhlbiBpdCB3aWxsIHByb2plY3QgZWFjaCB2YWx1ZSBmcm9tIHRoZSBzb3VyY2Ugb2JzZXJ2YWJsZSBpbnRvIGEgbmV3IHZhbHVlIHRoYXQgaXQgd2lsbFxuICogY2hlY2sgZm9yIGVxdWFsaXR5IHdpdGggcHJldmlvdXNseSBwcm9qZWN0ZWQgdmFsdWVzLiBJZiBhIGtleVNlbGVjdG9yIGZ1bmN0aW9uIGlzIG5vdCBwcm92aWRlZCwgaXQgd2lsbCB1c2UgZWFjaCB2YWx1ZSBmcm9tIHRoZVxuICogc291cmNlIG9ic2VydmFibGUgZGlyZWN0bHkgd2l0aCBhbiBlcXVhbGl0eSBjaGVjayBhZ2FpbnN0IHByZXZpb3VzIHZhbHVlcy5cbiAqXG4gKiBJbiBKYXZhU2NyaXB0IHJ1bnRpbWVzIHRoYXQgc3VwcG9ydCBgU2V0YCwgdGhpcyBvcGVyYXRvciB3aWxsIHVzZSBhIGBTZXRgIHRvIGltcHJvdmUgcGVyZm9ybWFuY2Ugb2YgdGhlIGRpc3RpbmN0IHZhbHVlIGNoZWNraW5nLlxuICpcbiAqIEluIG90aGVyIHJ1bnRpbWVzLCB0aGlzIG9wZXJhdG9yIHdpbGwgdXNlIGEgbWluaW1hbCBpbXBsZW1lbnRhdGlvbiBvZiBgU2V0YCB0aGF0IHJlbGllcyBvbiBhbiBgQXJyYXlgIGFuZCBgaW5kZXhPZmAgdW5kZXIgdGhlXG4gKiBob29kLCBzbyBwZXJmb3JtYW5jZSB3aWxsIGRlZ3JhZGUgYXMgbW9yZSB2YWx1ZXMgYXJlIGNoZWNrZWQgZm9yIGRpc3RpbmN0aW9uLiBFdmVuIGluIG5ld2VyIGJyb3dzZXJzLCBhIGxvbmctcnVubmluZyBgZGlzdGluY3RgXG4gKiB1c2UgbWlnaHQgcmVzdWx0IGluIG1lbW9yeSBsZWFrcy4gVG8gaGVscCBhbGxldmlhdGUgdGhpcyBpbiBzb21lIHNjZW5hcmlvcywgYW4gb3B0aW9uYWwgYGZsdXNoZXNgIHBhcmFtZXRlciBpcyBhbHNvIHByb3ZpZGVkIHNvXG4gKiB0aGF0IHRoZSBpbnRlcm5hbCBgU2V0YCBjYW4gYmUgXCJmbHVzaGVkXCIsIGJhc2ljYWxseSBjbGVhcmluZyBpdCBvZiB2YWx1ZXMuXG4gKlxuICogIyMgRXhhbXBsZXNcbiAqIEEgc2ltcGxlIGV4YW1wbGUgd2l0aCBudW1iZXJzXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBvZigxLCAxLCAyLCAyLCAyLCAxLCAyLCAzLCA0LCAzLCAyLCAxKS5waXBlKFxuICogICAgIGRpc3RpbmN0KCksXG4gKiAgIClcbiAqICAgLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTsgLy8gMSwgMiwgMywgNFxuICogYGBgXG4gKlxuICogQW4gZXhhbXBsZSB1c2luZyBhIGtleVNlbGVjdG9yIGZ1bmN0aW9uXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbnRlcmZhY2UgUGVyc29uIHtcbiAqICAgIGFnZTogbnVtYmVyLFxuICogICAgbmFtZTogc3RyaW5nXG4gKiB9XG4gKlxuICogb2Y8UGVyc29uPihcbiAqICAgICB7IGFnZTogNCwgbmFtZTogJ0Zvbyd9LFxuICogICAgIHsgYWdlOiA3LCBuYW1lOiAnQmFyJ30sXG4gKiAgICAgeyBhZ2U6IDUsIG5hbWU6ICdGb28nfSxcbiAqICAgKS5waXBlKFxuICogICAgIGRpc3RpbmN0KChwOiBQZXJzb24pID0+IHAubmFtZSksXG4gKiAgIClcbiAqICAgLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiAvLyBkaXNwbGF5czpcbiAqIC8vIHsgYWdlOiA0LCBuYW1lOiAnRm9vJyB9XG4gKiAvLyB7IGFnZTogNywgbmFtZTogJ0JhcicgfVxuICogYGBgXG4gKiBAc2VlIHtAbGluayBkaXN0aW5jdFVudGlsQ2hhbmdlZH1cbiAqIEBzZWUge0BsaW5rIGRpc3RpbmN0VW50aWxLZXlDaGFuZ2VkfVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFtrZXlTZWxlY3Rvcl0gT3B0aW9uYWwgZnVuY3Rpb24gdG8gc2VsZWN0IHdoaWNoIHZhbHVlIHlvdSB3YW50IHRvIGNoZWNrIGFzIGRpc3RpbmN0LlxuICogQHBhcmFtIHtPYnNlcnZhYmxlfSBbZmx1c2hlc10gT3B0aW9uYWwgT2JzZXJ2YWJsZSBmb3IgZmx1c2hpbmcgdGhlIGludGVybmFsIEhhc2hTZXQgb2YgdGhlIG9wZXJhdG9yLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGl0ZW1zIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHdpdGggZGlzdGluY3QgdmFsdWVzLlxuICogQG1ldGhvZCBkaXN0aW5jdFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc3RpbmN0PFQsIEs+KGtleVNlbGVjdG9yPzogKHZhbHVlOiBUKSA9PiBLLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsdXNoZXM/OiBPYnNlcnZhYmxlPGFueT4pOiBNb25vVHlwZU9wZXJhdG9yRnVuY3Rpb248VD4ge1xuICByZXR1cm4gKHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gc291cmNlLmxpZnQobmV3IERpc3RpbmN0T3BlcmF0b3Ioa2V5U2VsZWN0b3IsIGZsdXNoZXMpKTtcbn1cblxuY2xhc3MgRGlzdGluY3RPcGVyYXRvcjxULCBLPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBrZXlTZWxlY3RvcjogKHZhbHVlOiBUKSA9PiBLLCBwcml2YXRlIGZsdXNoZXM6IE9ic2VydmFibGU8YW55Pikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IGFueSk6IFRlYXJkb3duTG9naWMge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBEaXN0aW5jdFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5rZXlTZWxlY3RvciwgdGhpcy5mbHVzaGVzKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmV4cG9ydCBjbGFzcyBEaXN0aW5jdFN1YnNjcmliZXI8VCwgSz4gZXh0ZW5kcyBPdXRlclN1YnNjcmliZXI8VCwgVD4ge1xuICBwcml2YXRlIHZhbHVlcyA9IG5ldyBTZXQ8Sz4oKTtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUPiwgcHJpdmF0ZSBrZXlTZWxlY3RvcjogKHZhbHVlOiBUKSA9PiBLLCBmbHVzaGVzOiBPYnNlcnZhYmxlPGFueT4pIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG5cbiAgICBpZiAoZmx1c2hlcykge1xuICAgICAgdGhpcy5hZGQoc3Vic2NyaWJlVG9SZXN1bHQodGhpcywgZmx1c2hlcykpO1xuICAgIH1cbiAgfVxuXG4gIG5vdGlmeU5leHQob3V0ZXJWYWx1ZTogVCwgaW5uZXJWYWx1ZTogVCxcbiAgICAgICAgICAgICBvdXRlckluZGV4OiBudW1iZXIsIGlubmVySW5kZXg6IG51bWJlcixcbiAgICAgICAgICAgICBpbm5lclN1YjogSW5uZXJTdWJzY3JpYmVyPFQsIFQ+KTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZXMuY2xlYXIoKTtcbiAgfVxuXG4gIG5vdGlmeUVycm9yKGVycm9yOiBhbnksIGlubmVyU3ViOiBJbm5lclN1YnNjcmliZXI8VCwgVD4pOiB2b2lkIHtcbiAgICB0aGlzLl9lcnJvcihlcnJvcik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5rZXlTZWxlY3Rvcikge1xuICAgICAgdGhpcy5fdXNlS2V5U2VsZWN0b3IodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9maW5hbGl6ZU5leHQodmFsdWUsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF91c2VLZXlTZWxlY3Rvcih2YWx1ZTogVCk6IHZvaWQge1xuICAgIGxldCBrZXk6IEs7XG4gICAgY29uc3QgeyBkZXN0aW5hdGlvbiB9ID0gdGhpcztcbiAgICB0cnkge1xuICAgICAga2V5ID0gdGhpcy5rZXlTZWxlY3Rvcih2YWx1ZSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBkZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9maW5hbGl6ZU5leHQoa2V5LCB2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9maW5hbGl6ZU5leHQoa2V5OiBLfFQsIHZhbHVlOiBUKSB7XG4gICAgY29uc3QgeyB2YWx1ZXMgfSA9IHRoaXM7XG4gICAgaWYgKCF2YWx1ZXMuaGFzKDxLPmtleSkpIHtcbiAgICAgIHZhbHVlcy5hZGQoPEs+a2V5KTtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==