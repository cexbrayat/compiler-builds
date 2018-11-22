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
export function count(predicate) {
    return function (source) { return source.lift(new CountOperator(predicate, source)); };
}
var CountOperator = (function () {
    function CountOperator(predicate, source) {
        this.predicate = predicate;
        this.source = source;
    }
    CountOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new CountSubscriber(subscriber, this.predicate, this.source));
    };
    return CountOperator;
}());
var CountSubscriber = (function (_super) {
    __extends(CountSubscriber, _super);
    function CountSubscriber(destination, predicate, source) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.source = source;
        _this.count = 0;
        _this.index = 0;
        return _this;
    }
    CountSubscriber.prototype._next = function (value) {
        if (this.predicate) {
            this._tryPredicate(value);
        }
        else {
            this.count++;
        }
    };
    CountSubscriber.prototype._tryPredicate = function (value) {
        var result;
        try {
            result = this.predicate(value, this.index++, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.count++;
        }
    };
    CountSubscriber.prototype._complete = function () {
        this.destination.next(this.count);
        this.destination.complete();
    };
    return CountSubscriber;
}(Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9leHRlcm5hbC9yeGpzL2ludGVybmFsL29wZXJhdG9ycy9jb3VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBR0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXVEM0MsTUFBTSxVQUFVLEtBQUssQ0FBSSxTQUF1RTtJQUM5RixPQUFPLFVBQUMsTUFBcUIsSUFBSyxPQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFhLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQWpELENBQWlELENBQUM7QUFDdEYsQ0FBQztBQUVEO0lBQ0UsdUJBQW9CLFNBQXVFLEVBQ3ZFLE1BQXNCO1FBRHRCLGNBQVMsR0FBVCxTQUFTLENBQThEO1FBQ3ZFLFdBQU0sR0FBTixNQUFNLENBQWdCO0lBQzFDLENBQUM7SUFFRCw0QkFBSSxHQUFKLFVBQUssVUFBOEIsRUFBRSxNQUFXO1FBQzlDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLGVBQWUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBUkQsSUFRQztBQU9EO0lBQWlDLG1DQUFhO0lBSTVDLHlCQUFZLFdBQTZCLEVBQ3JCLFNBQXVFLEVBQ3ZFLE1BQXNCO1FBRjFDLFlBR0Usa0JBQU0sV0FBVyxDQUFDLFNBQ25CO1FBSG1CLGVBQVMsR0FBVCxTQUFTLENBQThEO1FBQ3ZFLFlBQU0sR0FBTixNQUFNLENBQWdCO1FBTGxDLFdBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsV0FBSyxHQUFXLENBQUMsQ0FBQzs7SUFNMUIsQ0FBQztJQUVTLCtCQUFLLEdBQWYsVUFBZ0IsS0FBUTtRQUN0QixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzQjthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0lBRU8sdUNBQWEsR0FBckIsVUFBc0IsS0FBUTtRQUM1QixJQUFJLE1BQVcsQ0FBQztRQUVoQixJQUFJO1lBQ0YsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDM0Q7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLE9BQU87U0FDUjtRQUVELElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0lBRVMsbUNBQVMsR0FBbkI7UUFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBckNELENBQWlDLFVBQVUsR0FxQzFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBPYnNlcnZlciwgT3BlcmF0b3JGdW5jdGlvbiB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbi8qKlxuICogQ291bnRzIHRoZSBudW1iZXIgb2YgZW1pc3Npb25zIG9uIHRoZSBzb3VyY2UgYW5kIGVtaXRzIHRoYXQgbnVtYmVyIHdoZW4gdGhlXG4gKiBzb3VyY2UgY29tcGxldGVzLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5UZWxscyBob3cgbWFueSB2YWx1ZXMgd2VyZSBlbWl0dGVkLCB3aGVuIHRoZSBzb3VyY2VcbiAqIGNvbXBsZXRlcy48L3NwYW4+XG4gKlxuICogIVtdKGNvdW50LnBuZylcbiAqXG4gKiBgY291bnRgIHRyYW5zZm9ybXMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHZhbHVlcyBpbnRvIGFuIE9ic2VydmFibGUgdGhhdFxuICogZW1pdHMgYSBzaW5nbGUgdmFsdWUgdGhhdCByZXByZXNlbnRzIHRoZSBudW1iZXIgb2YgdmFsdWVzIGVtaXR0ZWQgYnkgdGhlXG4gKiBzb3VyY2UgT2JzZXJ2YWJsZS4gSWYgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHRlcm1pbmF0ZXMgd2l0aCBhbiBlcnJvciwgYGNvdW50YFxuICogd2lsbCBwYXNzIHRoaXMgZXJyb3Igbm90aWZpY2F0aW9uIGFsb25nIHdpdGhvdXQgZW1pdHRpbmcgYSB2YWx1ZSBmaXJzdC4gSWZcbiAqIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBkb2VzIG5vdCB0ZXJtaW5hdGUgYXQgYWxsLCBgY291bnRgIHdpbGwgbmVpdGhlciBlbWl0XG4gKiBhIHZhbHVlIG5vciB0ZXJtaW5hdGUuIFRoaXMgb3BlcmF0b3IgdGFrZXMgYW4gb3B0aW9uYWwgYHByZWRpY2F0ZWAgZnVuY3Rpb25cbiAqIGFzIGFyZ3VtZW50LCBpbiB3aGljaCBjYXNlIHRoZSBvdXRwdXQgZW1pc3Npb24gd2lsbCByZXByZXNlbnQgdGhlIG51bWJlciBvZlxuICogc291cmNlIHZhbHVlcyB0aGF0IG1hdGNoZWQgYHRydWVgIHdpdGggdGhlIGBwcmVkaWNhdGVgLlxuICpcbiAqICMjIEV4YW1wbGVzXG4gKlxuICogQ291bnRzIGhvdyBtYW55IHNlY29uZHMgaGF2ZSBwYXNzZWQgYmVmb3JlIHRoZSBmaXJzdCBjbGljayBoYXBwZW5lZFxuICogYGBgamF2YXNjcmlwdFxuICogY29uc3Qgc2Vjb25kcyA9IGludGVydmFsKDEwMDApO1xuICogY29uc3QgY2xpY2tzID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIGNvbnN0IHNlY29uZHNCZWZvcmVDbGljayA9IHNlY29uZHMucGlwZSh0YWtlVW50aWwoY2xpY2tzKSk7XG4gKiBjb25zdCByZXN1bHQgPSBzZWNvbmRzQmVmb3JlQ2xpY2sucGlwZShjb3VudCgpKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKiBgYGBcbiAqXG4gKiBDb3VudHMgaG93IG1hbnkgb2RkIG51bWJlcnMgYXJlIHRoZXJlIGJldHdlZW4gMSBhbmQgN1xuICogYGBgamF2YXNjcmlwdFxuICogY29uc3QgbnVtYmVycyA9IHJhbmdlKDEsIDcpO1xuICogY29uc3QgcmVzdWx0ID0gbnVtYmVycy5waXBlKGNvdW50KGkgPT4gaSAlIDIgPT09IDEpKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKiAvLyBSZXN1bHRzIGluOlxuICogLy8gNFxuICogYGBgXG4gKlxuICogQHNlZSB7QGxpbmsgbWF4fVxuICogQHNlZSB7QGxpbmsgbWlufVxuICogQHNlZSB7QGxpbmsgcmVkdWNlfVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQsIGk6IG51bWJlciwgc291cmNlOiBPYnNlcnZhYmxlPFQ+KTogYm9vbGVhbn0gW3ByZWRpY2F0ZV0gQVxuICogYm9vbGVhbiBmdW5jdGlvbiB0byBzZWxlY3Qgd2hhdCB2YWx1ZXMgYXJlIHRvIGJlIGNvdW50ZWQuIEl0IGlzIHByb3ZpZGVkIHdpdGhcbiAqIGFyZ3VtZW50cyBvZjpcbiAqIC0gYHZhbHVlYDogdGhlIHZhbHVlIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLlxuICogLSBgaW5kZXhgOiB0aGUgKHplcm8tYmFzZWQpIFwiaW5kZXhcIiBvZiB0aGUgdmFsdWUgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiAtIGBzb3VyY2VgOiB0aGUgc291cmNlIE9ic2VydmFibGUgaW5zdGFuY2UgaXRzZWxmLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gT2JzZXJ2YWJsZSBvZiBvbmUgbnVtYmVyIHRoYXQgcmVwcmVzZW50cyB0aGUgY291bnQgYXNcbiAqIGRlc2NyaWJlZCBhYm92ZS5cbiAqIEBtZXRob2QgY291bnRcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNvdW50PFQ+KHByZWRpY2F0ZT86ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlciwgc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBib29sZWFuKTogT3BlcmF0b3JGdW5jdGlvbjxULCBudW1iZXI+IHtcbiAgcmV0dXJuIChzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IHNvdXJjZS5saWZ0KG5ldyBDb3VudE9wZXJhdG9yKHByZWRpY2F0ZSwgc291cmNlKSk7XG59XG5cbmNsYXNzIENvdW50T3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBudW1iZXI+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwcmVkaWNhdGU/OiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gYm9vbGVhbixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzb3VyY2U/OiBPYnNlcnZhYmxlPFQ+KSB7XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8bnVtYmVyPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBDb3VudFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5wcmVkaWNhdGUsIHRoaXMuc291cmNlKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIENvdW50U3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBwcml2YXRlIGNvdW50OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIGluZGV4OiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBPYnNlcnZlcjxudW1iZXI+LFxuICAgICAgICAgICAgICBwcml2YXRlIHByZWRpY2F0ZT86ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlciwgc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBib29sZWFuLFxuICAgICAgICAgICAgICBwcml2YXRlIHNvdXJjZT86IE9ic2VydmFibGU8VD4pIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wcmVkaWNhdGUpIHtcbiAgICAgIHRoaXMuX3RyeVByZWRpY2F0ZSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY291bnQrKztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF90cnlQcmVkaWNhdGUodmFsdWU6IFQpIHtcbiAgICBsZXQgcmVzdWx0OiBhbnk7XG5cbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5wcmVkaWNhdGUodmFsdWUsIHRoaXMuaW5kZXgrKywgdGhpcy5zb3VyY2UpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHRoaXMuY291bnQrKztcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh0aGlzLmNvdW50KTtcbiAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==