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
import { ArgumentOutOfRangeError } from '../util/ArgumentOutOfRangeError';
export function skipLast(count) {
    return function (source) { return source.lift(new SkipLastOperator(count)); };
}
var SkipLastOperator = (function () {
    function SkipLastOperator(_skipCount) {
        this._skipCount = _skipCount;
        if (this._skipCount < 0) {
            throw new ArgumentOutOfRangeError;
        }
    }
    SkipLastOperator.prototype.call = function (subscriber, source) {
        if (this._skipCount === 0) {
            return source.subscribe(new Subscriber(subscriber));
        }
        else {
            return source.subscribe(new SkipLastSubscriber(subscriber, this._skipCount));
        }
    };
    return SkipLastOperator;
}());
var SkipLastSubscriber = (function (_super) {
    __extends(SkipLastSubscriber, _super);
    function SkipLastSubscriber(destination, _skipCount) {
        var _this = _super.call(this, destination) || this;
        _this._skipCount = _skipCount;
        _this._count = 0;
        _this._ring = new Array(_skipCount);
        return _this;
    }
    SkipLastSubscriber.prototype._next = function (value) {
        var skipCount = this._skipCount;
        var count = this._count++;
        if (count < skipCount) {
            this._ring[count] = value;
        }
        else {
            var currentIndex = count % skipCount;
            var ring = this._ring;
            var oldValue = ring[currentIndex];
            ring[currentIndex] = value;
            this.destination.next(oldValue);
        }
    };
    return SkipLastSubscriber;
}(Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpcExhc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9leHRlcm5hbC9yeGpzL2ludGVybmFsL29wZXJhdG9ycy9za2lwTGFzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQXVDMUUsTUFBTSxVQUFVLFFBQVEsQ0FBSSxLQUFhO0lBQ3ZDLE9BQU8sVUFBQyxNQUFxQixJQUFLLE9BQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQXhDLENBQXdDLENBQUM7QUFDN0UsQ0FBQztBQUVEO0lBQ0UsMEJBQW9CLFVBQWtCO1FBQWxCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDcEMsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRTtZQUN2QixNQUFNLElBQUksdUJBQXVCLENBQUM7U0FDbkM7SUFDSCxDQUFDO0lBRUQsK0JBQUksR0FBSixVQUFLLFVBQXlCLEVBQUUsTUFBVztRQUN6QyxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssQ0FBQyxFQUFFO1lBR3pCLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1NBQ3JEO2FBQU07WUFDTCxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7U0FDOUU7SUFDSCxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBaEJELElBZ0JDO0FBT0Q7SUFBb0Msc0NBQWE7SUFJL0MsNEJBQVksV0FBMEIsRUFBVSxVQUFrQjtRQUFsRSxZQUNFLGtCQUFNLFdBQVcsQ0FBQyxTQUVuQjtRQUgrQyxnQkFBVSxHQUFWLFVBQVUsQ0FBUTtRQUYxRCxZQUFNLEdBQVcsQ0FBQyxDQUFDO1FBSXpCLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUksVUFBVSxDQUFDLENBQUM7O0lBQ3hDLENBQUM7SUFFUyxrQ0FBSyxHQUFmLFVBQWdCLEtBQVE7UUFDdEIsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNsQyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFNUIsSUFBSSxLQUFLLEdBQUcsU0FBUyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQzNCO2FBQU07WUFDTCxJQUFNLFlBQVksR0FBRyxLQUFLLEdBQUcsU0FBUyxDQUFDO1lBQ3ZDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDeEIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRXBDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBeEJELENBQW9DLFVBQVUsR0F3QjdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBBcmd1bWVudE91dE9mUmFuZ2VFcnJvciB9IGZyb20gJy4uL3V0aWwvQXJndW1lbnRPdXRPZlJhbmdlRXJyb3InO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgTW9ub1R5cGVPcGVyYXRvckZ1bmN0aW9uLCBUZWFyZG93bkxvZ2ljIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vKipcbiAqIFNraXAgdGhlIGxhc3QgYGNvdW50YCB2YWx1ZXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKlxuICogIVtdKHNraXBMYXN0LnBuZylcbiAqXG4gKiBgc2tpcExhc3RgIHJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGFjY3VtdWxhdGVzIGEgcXVldWUgd2l0aCBhIGxlbmd0aFxuICogZW5vdWdoIHRvIHN0b3JlIHRoZSBmaXJzdCBgY291bnRgIHZhbHVlcy4gQXMgbW9yZSB2YWx1ZXMgYXJlIHJlY2VpdmVkLFxuICogdmFsdWVzIGFyZSB0YWtlbiBmcm9tIHRoZSBmcm9udCBvZiB0aGUgcXVldWUgYW5kIHByb2R1Y2VkIG9uIHRoZSByZXN1bHRcbiAqIHNlcXVlbmNlLiBUaGlzIGNhdXNlcyB2YWx1ZXMgdG8gYmUgZGVsYXllZC5cbiAqXG4gKiAjIyBFeGFtcGxlXG4gKiBTa2lwIHRoZSBsYXN0IDIgdmFsdWVzIG9mIGFuIE9ic2VydmFibGUgd2l0aCBtYW55IHZhbHVlc1xuICogYGBgamF2YXNjcmlwdFxuICogY29uc3QgbWFueSA9IHJhbmdlKDEsIDUpO1xuICogY29uc3Qgc2tpcExhc3RUd28gPSBtYW55LnBpcGUoc2tpcExhc3QoMikpO1xuICogc2tpcExhc3RUd28uc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIC8vIFJlc3VsdHMgaW46XG4gKiAvLyAxIDIgM1xuICogYGBgXG4gKlxuICogQHNlZSB7QGxpbmsgc2tpcH1cbiAqIEBzZWUge0BsaW5rIHNraXBVbnRpbH1cbiAqIEBzZWUge0BsaW5rIHNraXBXaGlsZX1cbiAqIEBzZWUge0BsaW5rIHRha2V9XG4gKlxuICogQHRocm93cyB7QXJndW1lbnRPdXRPZlJhbmdlRXJyb3J9IFdoZW4gdXNpbmcgYHNraXBMYXN0KGkpYCwgaXQgdGhyb3dzXG4gKiBBcmd1bWVudE91dE9yUmFuZ2VFcnJvciBpZiBgaSA8IDBgLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb3VudCBOdW1iZXIgb2YgZWxlbWVudHMgdG8gc2tpcCBmcm9tIHRoZSBlbmQgb2YgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICogQHJldHVybnMge09ic2VydmFibGU8VD59IEFuIE9ic2VydmFibGUgdGhhdCBza2lwcyB0aGUgbGFzdCBjb3VudCB2YWx1ZXNcbiAqIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICogQG1ldGhvZCBza2lwTGFzdFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNraXBMYXN0PFQ+KGNvdW50OiBudW1iZXIpOiBNb25vVHlwZU9wZXJhdG9yRnVuY3Rpb248VD4ge1xuICByZXR1cm4gKHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gc291cmNlLmxpZnQobmV3IFNraXBMYXN0T3BlcmF0b3IoY291bnQpKTtcbn1cblxuY2xhc3MgU2tpcExhc3RPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2tpcENvdW50OiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fc2tpcENvdW50IDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yO1xuICAgIH1cbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPiwgc291cmNlOiBhbnkpOiBUZWFyZG93bkxvZ2ljIHtcbiAgICBpZiAodGhpcy5fc2tpcENvdW50ID09PSAwKSB7XG4gICAgICAvLyBJZiB3ZSBkb24ndCB3YW50IHRvIHNraXAgYW55IHZhbHVlcyB0aGVuIGp1c3Qgc3Vic2NyaWJlXG4gICAgICAvLyB0byBTdWJzY3JpYmVyIHdpdGhvdXQgYW55IGZ1cnRoZXIgbG9naWMuXG4gICAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgU3Vic2NyaWJlcihzdWJzY3JpYmVyKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBTa2lwTGFzdFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5fc2tpcENvdW50KSk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBTa2lwTGFzdFN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgcHJpdmF0ZSBfcmluZzogVFtdO1xuICBwcml2YXRlIF9jb3VudDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUPiwgcHJpdmF0ZSBfc2tpcENvdW50OiBudW1iZXIpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gICAgdGhpcy5fcmluZyA9IG5ldyBBcnJheTxUPihfc2tpcENvdW50KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGNvbnN0IHNraXBDb3VudCA9IHRoaXMuX3NraXBDb3VudDtcbiAgICBjb25zdCBjb3VudCA9IHRoaXMuX2NvdW50Kys7XG5cbiAgICBpZiAoY291bnQgPCBza2lwQ291bnQpIHtcbiAgICAgIHRoaXMuX3JpbmdbY291bnRdID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IGNvdW50ICUgc2tpcENvdW50O1xuICAgICAgY29uc3QgcmluZyA9IHRoaXMuX3Jpbmc7XG4gICAgICBjb25zdCBvbGRWYWx1ZSA9IHJpbmdbY3VycmVudEluZGV4XTtcblxuICAgICAgcmluZ1tjdXJyZW50SW5kZXhdID0gdmFsdWU7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQob2xkVmFsdWUpO1xuICAgIH1cbiAgfVxufVxuIl19