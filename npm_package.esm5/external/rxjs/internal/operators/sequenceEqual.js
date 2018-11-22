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
import { tryCatch } from '../util/tryCatch';
import { errorObject } from '../util/errorObject';
export function sequenceEqual(compareTo, comparor) {
    return function (source) { return source.lift(new SequenceEqualOperator(compareTo, comparor)); };
}
var SequenceEqualOperator = (function () {
    function SequenceEqualOperator(compareTo, comparor) {
        this.compareTo = compareTo;
        this.comparor = comparor;
    }
    SequenceEqualOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new SequenceEqualSubscriber(subscriber, this.compareTo, this.comparor));
    };
    return SequenceEqualOperator;
}());
export { SequenceEqualOperator };
var SequenceEqualSubscriber = (function (_super) {
    __extends(SequenceEqualSubscriber, _super);
    function SequenceEqualSubscriber(destination, compareTo, comparor) {
        var _this = _super.call(this, destination) || this;
        _this.compareTo = compareTo;
        _this.comparor = comparor;
        _this._a = [];
        _this._b = [];
        _this._oneComplete = false;
        _this.destination.add(compareTo.subscribe(new SequenceEqualCompareToSubscriber(destination, _this)));
        return _this;
    }
    SequenceEqualSubscriber.prototype._next = function (value) {
        if (this._oneComplete && this._b.length === 0) {
            this.emit(false);
        }
        else {
            this._a.push(value);
            this.checkValues();
        }
    };
    SequenceEqualSubscriber.prototype._complete = function () {
        if (this._oneComplete) {
            this.emit(this._a.length === 0 && this._b.length === 0);
        }
        else {
            this._oneComplete = true;
        }
        this.unsubscribe();
    };
    SequenceEqualSubscriber.prototype.checkValues = function () {
        var _c = this, _a = _c._a, _b = _c._b, comparor = _c.comparor;
        while (_a.length > 0 && _b.length > 0) {
            var a = _a.shift();
            var b = _b.shift();
            var areEqual = false;
            if (comparor) {
                areEqual = tryCatch(comparor)(a, b);
                if (areEqual === errorObject) {
                    this.destination.error(errorObject.e);
                }
            }
            else {
                areEqual = a === b;
            }
            if (!areEqual) {
                this.emit(false);
            }
        }
    };
    SequenceEqualSubscriber.prototype.emit = function (value) {
        var destination = this.destination;
        destination.next(value);
        destination.complete();
    };
    SequenceEqualSubscriber.prototype.nextB = function (value) {
        if (this._oneComplete && this._a.length === 0) {
            this.emit(false);
        }
        else {
            this._b.push(value);
            this.checkValues();
        }
    };
    SequenceEqualSubscriber.prototype.completeB = function () {
        if (this._oneComplete) {
            this.emit(this._a.length === 0 && this._b.length === 0);
        }
        else {
            this._oneComplete = true;
        }
    };
    return SequenceEqualSubscriber;
}(Subscriber));
export { SequenceEqualSubscriber };
var SequenceEqualCompareToSubscriber = (function (_super) {
    __extends(SequenceEqualCompareToSubscriber, _super);
    function SequenceEqualCompareToSubscriber(destination, parent) {
        var _this = _super.call(this, destination) || this;
        _this.parent = parent;
        return _this;
    }
    SequenceEqualCompareToSubscriber.prototype._next = function (value) {
        this.parent.nextB(value);
    };
    SequenceEqualCompareToSubscriber.prototype._error = function (err) {
        this.parent.error(err);
        this.unsubscribe();
    };
    SequenceEqualCompareToSubscriber.prototype._complete = function () {
        this.parent.completeB();
        this.unsubscribe();
    };
    return SequenceEqualCompareToSubscriber;
}(Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VxdWVuY2VFcXVhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2V4dGVybmFsL3J4anMvaW50ZXJuYWwvb3BlcmF0b3JzL3NlcXVlbmNlRXF1YWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUVBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQTBEbEQsTUFBTSxVQUFVLGFBQWEsQ0FBSSxTQUF3QixFQUN4QixRQUFrQztJQUNqRSxPQUFPLFVBQUMsTUFBcUIsSUFBSyxPQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxxQkFBcUIsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBM0QsQ0FBMkQsQ0FBQztBQUNoRyxDQUFDO0FBRUQ7SUFDRSwrQkFBb0IsU0FBd0IsRUFDeEIsUUFBaUM7UUFEakMsY0FBUyxHQUFULFNBQVMsQ0FBZTtRQUN4QixhQUFRLEdBQVIsUUFBUSxDQUF5QjtJQUNyRCxDQUFDO0lBRUQsb0NBQUksR0FBSixVQUFLLFVBQStCLEVBQUUsTUFBVztRQUMvQyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSx1QkFBdUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNsRyxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBUkQsSUFRQzs7QUFPRDtJQUFtRCwyQ0FBYTtJQUs5RCxpQ0FBWSxXQUF3QixFQUNoQixTQUF3QixFQUN4QixRQUFpQztRQUZyRCxZQUdFLGtCQUFNLFdBQVcsQ0FBQyxTQUVuQjtRQUptQixlQUFTLEdBQVQsU0FBUyxDQUFlO1FBQ3hCLGNBQVEsR0FBUixR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Q0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDekQ7YUFBTTtZQUNMLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUNILDhCQUFDO0FBQUQsQ0FBQyxBQXhFRCxDQUFtRCxVQUFVLEdBd0U1RDs7QUFFRDtJQUFxRCxvREFBYTtJQUNoRSwwQ0FBWSxXQUF3QixFQUFVLE1BQXFDO1FBQW5GLFlBQ0Usa0JBQU0sV0FBVyxDQUFDLFNBQ25CO1FBRjZDLFlBQU0sR0FBTixNQUFNLENBQStCOztJQUVuRixDQUFDO0lBRVMsZ0RBQUssR0FBZixVQUFnQixLQUFRO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFUyxpREFBTSxHQUFoQixVQUFpQixHQUFRO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRVMsb0RBQVMsR0FBbkI7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBQ0gsdUNBQUM7QUFBRCxDQUFDLEFBbEJELENBQXFELFVBQVUsR0FrQjlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgdHJ5Q2F0Y2ggfSBmcm9tICcuLi91dGlsL3RyeUNhdGNoJztcbmltcG9ydCB7IGVycm9yT2JqZWN0IH0gZnJvbSAnLi4vdXRpbC9lcnJvck9iamVjdCc7XG5cbmltcG9ydCB7IE9ic2VydmVyLCBPcGVyYXRvckZ1bmN0aW9uIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vKipcbiAqIENvbXBhcmVzIGFsbCB2YWx1ZXMgb2YgdHdvIG9ic2VydmFibGVzIGluIHNlcXVlbmNlIHVzaW5nIGFuIG9wdGlvbmFsIGNvbXBhcm9yIGZ1bmN0aW9uXG4gKiBhbmQgcmV0dXJucyBhbiBvYnNlcnZhYmxlIG9mIGEgc2luZ2xlIGJvb2xlYW4gdmFsdWUgcmVwcmVzZW50aW5nIHdoZXRoZXIgb3Igbm90IHRoZSB0d28gc2VxdWVuY2VzXG4gKiBhcmUgZXF1YWwuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkNoZWNrcyB0byBzZWUgb2YgYWxsIHZhbHVlcyBlbWl0dGVkIGJ5IGJvdGggb2JzZXJ2YWJsZXMgYXJlIGVxdWFsLCBpbiBvcmRlci48L3NwYW4+XG4gKlxuICogIVtdKHNlcXVlbmNlRXF1YWwucG5nKVxuICpcbiAqIGBzZXF1ZW5jZUVxdWFsYCBzdWJzY3JpYmVzIHRvIHR3byBvYnNlcnZhYmxlcyBhbmQgYnVmZmVycyBpbmNvbWluZyB2YWx1ZXMgZnJvbSBlYWNoIG9ic2VydmFibGUuIFdoZW5ldmVyIGVpdGhlclxuICogb2JzZXJ2YWJsZSBlbWl0cyBhIHZhbHVlLCB0aGUgdmFsdWUgaXMgYnVmZmVyZWQgYW5kIHRoZSBidWZmZXJzIGFyZSBzaGlmdGVkIGFuZCBjb21wYXJlZCBmcm9tIHRoZSBib3R0b21cbiAqIHVwOyBJZiBhbnkgdmFsdWUgcGFpciBkb2Vzbid0IG1hdGNoLCB0aGUgcmV0dXJuZWQgb2JzZXJ2YWJsZSB3aWxsIGVtaXQgYGZhbHNlYCBhbmQgY29tcGxldGUuIElmIG9uZSBvZiB0aGVcbiAqIG9ic2VydmFibGVzIGNvbXBsZXRlcywgdGhlIG9wZXJhdG9yIHdpbGwgd2FpdCBmb3IgdGhlIG90aGVyIG9ic2VydmFibGUgdG8gY29tcGxldGU7IElmIHRoZSBvdGhlclxuICogb2JzZXJ2YWJsZSBlbWl0cyBiZWZvcmUgY29tcGxldGluZywgdGhlIHJldHVybmVkIG9ic2VydmFibGUgd2lsbCBlbWl0IGBmYWxzZWAgYW5kIGNvbXBsZXRlLiBJZiBvbmUgb2JzZXJ2YWJsZSBuZXZlclxuICogY29tcGxldGVzIG9yIGVtaXRzIGFmdGVyIHRoZSBvdGhlciBjb21wbGV0cywgdGhlIHJldHVybmVkIG9ic2VydmFibGUgd2lsbCBuZXZlciBjb21wbGV0ZS5cbiAqXG4gKiAjIyBFeGFtcGxlXG4gKiBmaWd1cmUgb3V0IGlmIHRoZSBLb25hbWkgY29kZSBtYXRjaGVzXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBjb25zdCBjb2RlcyA9IGZyb20oW1xuICogICAnQXJyb3dVcCcsXG4gKiAgICdBcnJvd1VwJyxcbiAqICAgJ0Fycm93RG93bicsXG4gKiAgICdBcnJvd0Rvd24nLFxuICogICAnQXJyb3dMZWZ0JyxcbiAqICAgJ0Fycm93UmlnaHQnLFxuICogICAnQXJyb3dMZWZ0JyxcbiAqICAgJ0Fycm93UmlnaHQnLFxuICogICAnS2V5QicsXG4gKiAgICdLZXlBJyxcbiAqICAgJ0VudGVyJywgLy8gbm8gc3RhcnQga2V5LCBjbGVhcmx5LlxuICogXSk7XG4gKlxuICogY29uc3Qga2V5cyA9IGZyb21FdmVudChkb2N1bWVudCwgJ2tleXVwJykucGlwZShtYXAoZSA9PiBlLmNvZGUpKTtcbiAqIGNvbnN0IG1hdGNoZXMgPSBrZXlzLnBpcGUoXG4gKiAgIGJ1ZmZlckNvdW50KDExLCAxKSxcbiAqICAgbWVyZ2VNYXAoXG4gKiAgICAgbGFzdDExID0+IGZyb20obGFzdDExKS5waXBlKHNlcXVlbmNlRXF1YWwoY29kZXMpKSxcbiAqICAgKSxcbiAqICk7XG4gKiBtYXRjaGVzLnN1YnNjcmliZShtYXRjaGVkID0+IGNvbnNvbGUubG9nKCdTdWNjZXNzZnVsIGNoZWF0IGF0IENvbnRyYT8gJywgbWF0Y2hlZCkpO1xuICogYGBgXG4gKlxuICogQHNlZSB7QGxpbmsgY29tYmluZUxhdGVzdH1cbiAqIEBzZWUge0BsaW5rIHppcH1cbiAqIEBzZWUge0BsaW5rIHdpdGhMYXRlc3RGcm9tfVxuICpcbiAqIEBwYXJhbSB7T2JzZXJ2YWJsZX0gY29tcGFyZVRvIFRoZSBvYnNlcnZhYmxlIHNlcXVlbmNlIHRvIGNvbXBhcmUgdGhlIHNvdXJjZSBzZXF1ZW5jZSB0by5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFtjb21wYXJvcl0gQW4gb3B0aW9uYWwgZnVuY3Rpb24gdG8gY29tcGFyZSBlYWNoIHZhbHVlIHBhaXJcbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgb2YgYSBzaW5nbGUgYm9vbGVhbiB2YWx1ZSByZXByZXNlbnRpbmcgd2hldGhlciBvciBub3RcbiAqIHRoZSB2YWx1ZXMgZW1pdHRlZCBieSBib3RoIG9ic2VydmFibGVzIHdlcmUgZXF1YWwgaW4gc2VxdWVuY2UuXG4gKiBAbWV0aG9kIHNlcXVlbmNlRXF1YWxcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXF1ZW5jZUVxdWFsPFQ+KGNvbXBhcmVUbzogT2JzZXJ2YWJsZTxUPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBhcm9yPzogKGE6IFQsIGI6IFQpID0+IGJvb2xlYW4pOiBPcGVyYXRvckZ1bmN0aW9uPFQsIGJvb2xlYW4+IHtcbiAgcmV0dXJuIChzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IHNvdXJjZS5saWZ0KG5ldyBTZXF1ZW5jZUVxdWFsT3BlcmF0b3IoY29tcGFyZVRvLCBjb21wYXJvcikpO1xufVxuXG5leHBvcnQgY2xhc3MgU2VxdWVuY2VFcXVhbE9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgYm9vbGVhbj4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBhcmVUbzogT2JzZXJ2YWJsZTxUPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjb21wYXJvcjogKGE6IFQsIGI6IFQpID0+IGJvb2xlYW4pIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxib29sZWFuPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBTZXF1ZW5jZUVxdWFsU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLmNvbXBhcmVUbywgdGhpcy5jb21wYXJvcikpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5leHBvcnQgY2xhc3MgU2VxdWVuY2VFcXVhbFN1YnNjcmliZXI8VCwgUj4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgcHJpdmF0ZSBfYTogVFtdID0gW107XG4gIHByaXZhdGUgX2I6IFRbXSA9IFtdO1xuICBwcml2YXRlIF9vbmVDb21wbGV0ZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBPYnNlcnZlcjxSPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjb21wYXJlVG86IE9ic2VydmFibGU8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgY29tcGFyb3I6IChhOiBULCBiOiBUKSA9PiBib29sZWFuKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICAgICh0aGlzLmRlc3RpbmF0aW9uIGFzIFN1YnNjcmlwdGlvbikuYWRkKGNvbXBhcmVUby5zdWJzY3JpYmUobmV3IFNlcXVlbmNlRXF1YWxDb21wYXJlVG9TdWJzY3JpYmVyKGRlc3RpbmF0aW9uLCB0aGlzKSkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX29uZUNvbXBsZXRlICYmIHRoaXMuX2IubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLmVtaXQoZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9hLnB1c2godmFsdWUpO1xuICAgICAgdGhpcy5jaGVja1ZhbHVlcygpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBfY29tcGxldGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX29uZUNvbXBsZXRlKSB7XG4gICAgICB0aGlzLmVtaXQodGhpcy5fYS5sZW5ndGggPT09IDAgJiYgdGhpcy5fYi5sZW5ndGggPT09IDApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9vbmVDb21wbGV0ZSA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIGNoZWNrVmFsdWVzKCkge1xuICAgIGNvbnN0IHsgX2EsIF9iLCBjb21wYXJvciB9ID0gdGhpcztcbiAgICB3aGlsZSAoX2EubGVuZ3RoID4gMCAmJiBfYi5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgYSA9IF9hLnNoaWZ0KCk7XG4gICAgICBsZXQgYiA9IF9iLnNoaWZ0KCk7XG4gICAgICBsZXQgYXJlRXF1YWwgPSBmYWxzZTtcbiAgICAgIGlmIChjb21wYXJvcikge1xuICAgICAgICBhcmVFcXVhbCA9IHRyeUNhdGNoKGNvbXBhcm9yKShhLCBiKTtcbiAgICAgICAgaWYgKGFyZUVxdWFsID09PSBlcnJvck9iamVjdCkge1xuICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyb3JPYmplY3QuZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFyZUVxdWFsID0gYSA9PT0gYjtcbiAgICAgIH1cbiAgICAgIGlmICghYXJlRXF1YWwpIHtcbiAgICAgICAgdGhpcy5lbWl0KGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBlbWl0KHZhbHVlOiBib29sZWFuKSB7XG4gICAgY29uc3QgeyBkZXN0aW5hdGlvbiB9ID0gdGhpcztcbiAgICBkZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICBkZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICB9XG5cbiAgbmV4dEIodmFsdWU6IFQpIHtcbiAgICBpZiAodGhpcy5fb25lQ29tcGxldGUgJiYgdGhpcy5fYS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuZW1pdChmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2IucHVzaCh2YWx1ZSk7XG4gICAgICB0aGlzLmNoZWNrVmFsdWVzKCk7XG4gICAgfVxuICB9XG5cbiAgY29tcGxldGVCKCkge1xuICAgIGlmICh0aGlzLl9vbmVDb21wbGV0ZSkge1xuICAgICAgdGhpcy5lbWl0KHRoaXMuX2EubGVuZ3RoID09PSAwICYmIHRoaXMuX2IubGVuZ3RoID09PSAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fb25lQ29tcGxldGUgPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBTZXF1ZW5jZUVxdWFsQ29tcGFyZVRvU3Vic2NyaWJlcjxULCBSPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogT2JzZXJ2ZXI8Uj4sIHByaXZhdGUgcGFyZW50OiBTZXF1ZW5jZUVxdWFsU3Vic2NyaWJlcjxULCBSPikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIHRoaXMucGFyZW50Lm5leHRCKHZhbHVlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfZXJyb3IoZXJyOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnBhcmVudC5lcnJvcihlcnIpO1xuICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY29tcGxldGUoKTogdm9pZCB7XG4gICAgdGhpcy5wYXJlbnQuY29tcGxldGVCKCk7XG4gICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=