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
import { Subject } from '../Subject';
export function windowCount(windowSize, startWindowEvery) {
    if (startWindowEvery === void 0) { startWindowEvery = 0; }
    return function windowCountOperatorFunction(source) {
        return source.lift(new WindowCountOperator(windowSize, startWindowEvery));
    };
}
var WindowCountOperator = (function () {
    function WindowCountOperator(windowSize, startWindowEvery) {
        this.windowSize = windowSize;
        this.startWindowEvery = startWindowEvery;
    }
    WindowCountOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery));
    };
    return WindowCountOperator;
}());
var WindowCountSubscriber = (function (_super) {
    __extends(WindowCountSubscriber, _super);
    function WindowCountSubscriber(destination, windowSize, startWindowEvery) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        _this.windowSize = windowSize;
        _this.startWindowEvery = startWindowEvery;
        _this.windows = [new Subject()];
        _this.count = 0;
        destination.next(_this.windows[0]);
        return _this;
    }
    WindowCountSubscriber.prototype._next = function (value) {
        var startWindowEvery = (this.startWindowEvery > 0) ? this.startWindowEvery : this.windowSize;
        var destination = this.destination;
        var windowSize = this.windowSize;
        var windows = this.windows;
        var len = windows.length;
        for (var i = 0; i < len && !this.closed; i++) {
            windows[i].next(value);
        }
        var c = this.count - windowSize + 1;
        if (c >= 0 && c % startWindowEvery === 0 && !this.closed) {
            windows.shift().complete();
        }
        if (++this.count % startWindowEvery === 0 && !this.closed) {
            var window_1 = new Subject();
            windows.push(window_1);
            destination.next(window_1);
        }
    };
    WindowCountSubscriber.prototype._error = function (err) {
        var windows = this.windows;
        if (windows) {
            while (windows.length > 0 && !this.closed) {
                windows.shift().error(err);
            }
        }
        this.destination.error(err);
    };
    WindowCountSubscriber.prototype._complete = function () {
        var windows = this.windows;
        if (windows) {
            while (windows.length > 0 && !this.closed) {
                windows.shift().complete();
            }
        }
        this.destination.complete();
    };
    WindowCountSubscriber.prototype._unsubscribe = function () {
        this.count = 0;
        this.windows = null;
    };
    return WindowCountSubscriber;
}(Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93Q291bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9leHRlcm5hbC9yeGpzL2ludGVybmFsL29wZXJhdG9ycy93aW5kb3dDb3VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBNERyQyxNQUFNLFVBQVUsV0FBVyxDQUFJLFVBQWtCLEVBQ2xCLGdCQUE0QjtJQUE1QixpQ0FBQSxFQUFBLG9CQUE0QjtJQUN6RCxPQUFPLFNBQVMsMkJBQTJCLENBQUMsTUFBcUI7UUFDL0QsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksbUJBQW1CLENBQUksVUFBVSxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUMvRSxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQ7SUFFRSw2QkFBb0IsVUFBa0IsRUFDbEIsZ0JBQXdCO1FBRHhCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDbEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFRO0lBQzVDLENBQUM7SUFFRCxrQ0FBSSxHQUFKLFVBQUssVUFBcUMsRUFBRSxNQUFXO1FBQ3JELE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLHFCQUFxQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7SUFDekcsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7QUFPRDtJQUF1Qyx5Q0FBYTtJQUlsRCwrQkFBc0IsV0FBc0MsRUFDeEMsVUFBa0IsRUFDbEIsZ0JBQXdCO1FBRjVDLFlBR0Usa0JBQU0sV0FBVyxDQUFDLFNBRW5CO1FBTHFCLGlCQUFXLEdBQVgsV0FBVyxDQUEyQjtRQUN4QyxnQkFBVSxHQUFWLFVBQVUsQ0FBUTtRQUNsQixzQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVE7UUFMcEMsYUFBTyxHQUFpQixDQUFFLElBQUksT0FBTyxFQUFLLENBQUUsQ0FBQztRQUM3QyxXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBTXhCLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztJQUNwQyxDQUFDO0lBRVMscUNBQUssR0FBZixVQUFnQixLQUFRO1FBQ3RCLElBQU0sZ0JBQWdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMvRixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3JDLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDbkMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QixJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBRTNCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEI7UUFDRCxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxnQkFBZ0IsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3hELE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUM1QjtRQUNELElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLGdCQUFnQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDekQsSUFBTSxRQUFNLEdBQUcsSUFBSSxPQUFPLEVBQUssQ0FBQztZQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQU0sQ0FBQyxDQUFDO1lBQ3JCLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBTSxDQUFDLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBRVMsc0NBQU0sR0FBaEIsVUFBaUIsR0FBUTtRQUN2QixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdCLElBQUksT0FBTyxFQUFFO1lBQ1gsT0FBTyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ3pDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDNUI7U0FDRjtRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFUyx5Q0FBUyxHQUFuQjtRQUNFLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0IsSUFBSSxPQUFPLEVBQUU7WUFDWCxPQUFPLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDekMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQzVCO1NBQ0Y7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFUyw0Q0FBWSxHQUF0QjtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FBQyxBQXhERCxDQUF1QyxVQUFVLEdBd0RoRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJy4uL1N1YmplY3QnO1xuaW1wb3J0IHsgT3BlcmF0b3JGdW5jdGlvbiB9IGZyb20gJy4uL3R5cGVzJztcblxuLyoqXG4gKiBCcmFuY2ggb3V0IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB2YWx1ZXMgYXMgYSBuZXN0ZWQgT2JzZXJ2YWJsZSB3aXRoIGVhY2hcbiAqIG5lc3RlZCBPYnNlcnZhYmxlIGVtaXR0aW5nIGF0IG1vc3QgYHdpbmRvd1NpemVgIHZhbHVlcy5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SXQncyBsaWtlIHtAbGluayBidWZmZXJDb3VudH0sIGJ1dCBlbWl0cyBhIG5lc3RlZFxuICogT2JzZXJ2YWJsZSBpbnN0ZWFkIG9mIGFuIGFycmF5Ljwvc3Bhbj5cbiAqXG4gKiAhW10od2luZG93Q291bnQucG5nKVxuICpcbiAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHdpbmRvd3Mgb2YgaXRlbXMgaXQgY29sbGVjdHMgZnJvbSB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlLiBUaGUgb3V0cHV0IE9ic2VydmFibGUgZW1pdHMgd2luZG93cyBldmVyeSBgc3RhcnRXaW5kb3dFdmVyeWBcbiAqIGl0ZW1zLCBlYWNoIGNvbnRhaW5pbmcgbm8gbW9yZSB0aGFuIGB3aW5kb3dTaXplYCBpdGVtcy4gV2hlbiB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlIGNvbXBsZXRlcyBvciBlbmNvdW50ZXJzIGFuIGVycm9yLCB0aGUgb3V0cHV0IE9ic2VydmFibGUgZW1pdHNcbiAqIHRoZSBjdXJyZW50IHdpbmRvdyBhbmQgcHJvcGFnYXRlcyB0aGUgbm90aWZpY2F0aW9uIGZyb20gdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZS4gSWYgYHN0YXJ0V2luZG93RXZlcnlgIGlzIG5vdCBwcm92aWRlZCwgdGhlbiBuZXcgd2luZG93cyBhcmVcbiAqIHN0YXJ0ZWQgaW1tZWRpYXRlbHkgYXQgdGhlIHN0YXJ0IG9mIHRoZSBzb3VyY2UgYW5kIHdoZW4gZWFjaCB3aW5kb3cgY29tcGxldGVzXG4gKiB3aXRoIHNpemUgYHdpbmRvd1NpemVgLlxuICpcbiAqICMjIEV4YW1wbGVzXG4gKiBJZ25vcmUgZXZlcnkgM3JkIGNsaWNrIGV2ZW50LCBzdGFydGluZyBmcm9tIHRoZSBmaXJzdCBvbmVcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGNvbnN0IGNsaWNrcyA9IGZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiBjb25zdCByZXN1bHQgPSBjbGlja3MucGlwZShcbiAqICAgd2luZG93Q291bnQoMykpLFxuICogICBtYXAod2luID0+IHdpbi5za2lwKDEpKSwgLy8gc2tpcCBmaXJzdCBvZiBldmVyeSAzIGNsaWNrc1xuICogICBtZXJnZUFsbCgpLCAgICAgICAgICAgICAgLy8gZmxhdHRlbiB0aGUgT2JzZXJ2YWJsZS1vZi1PYnNlcnZhYmxlc1xuICogKTtcbiAqIHJlc3VsdC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKiBgYGBcbiAqXG4gKiBJZ25vcmUgZXZlcnkgM3JkIGNsaWNrIGV2ZW50LCBzdGFydGluZyBmcm9tIHRoZSB0aGlyZCBvbmVcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGNvbnN0IGNsaWNrcyA9IGZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiBjb25zdCByZXN1bHQgPSBjbGlja3MucGlwZShcbiAqICAgd2luZG93Q291bnQoMiwgMyksXG4gKiAgIG1lcmdlQWxsKCksICAgICAgICAgICAgICAvLyBmbGF0dGVuIHRoZSBPYnNlcnZhYmxlLW9mLU9ic2VydmFibGVzXG4gKiApO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqIGBgYFxuICpcbiAqIEBzZWUge0BsaW5rIHdpbmRvd31cbiAqIEBzZWUge0BsaW5rIHdpbmRvd1RpbWV9XG4gKiBAc2VlIHtAbGluayB3aW5kb3dUb2dnbGV9XG4gKiBAc2VlIHtAbGluayB3aW5kb3dXaGVufVxuICogQHNlZSB7QGxpbmsgYnVmZmVyQ291bnR9XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHdpbmRvd1NpemUgVGhlIG1heGltdW0gbnVtYmVyIG9mIHZhbHVlcyBlbWl0dGVkIGJ5IGVhY2hcbiAqIHdpbmRvdy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnRXaW5kb3dFdmVyeV0gSW50ZXJ2YWwgYXQgd2hpY2ggdG8gc3RhcnQgYSBuZXcgd2luZG93LlxuICogRm9yIGV4YW1wbGUgaWYgYHN0YXJ0V2luZG93RXZlcnlgIGlzIGAyYCwgdGhlbiBhIG5ldyB3aW5kb3cgd2lsbCBiZSBzdGFydGVkXG4gKiBvbiBldmVyeSBvdGhlciB2YWx1ZSBmcm9tIHRoZSBzb3VyY2UuIEEgbmV3IHdpbmRvdyBpcyBzdGFydGVkIGF0IHRoZVxuICogYmVnaW5uaW5nIG9mIHRoZSBzb3VyY2UgYnkgZGVmYXVsdC5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8T2JzZXJ2YWJsZTxUPj59IEFuIE9ic2VydmFibGUgb2Ygd2luZG93cywgd2hpY2ggaW4gdHVyblxuICogYXJlIE9ic2VydmFibGUgb2YgdmFsdWVzLlxuICogQG1ldGhvZCB3aW5kb3dDb3VudFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdpbmRvd0NvdW50PFQ+KHdpbmRvd1NpemU6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFdpbmRvd0V2ZXJ5OiBudW1iZXIgPSAwKTogT3BlcmF0b3JGdW5jdGlvbjxULCBPYnNlcnZhYmxlPFQ+PiB7XG4gIHJldHVybiBmdW5jdGlvbiB3aW5kb3dDb3VudE9wZXJhdG9yRnVuY3Rpb24oc291cmNlOiBPYnNlcnZhYmxlPFQ+KSB7XG4gICAgcmV0dXJuIHNvdXJjZS5saWZ0KG5ldyBXaW5kb3dDb3VudE9wZXJhdG9yPFQ+KHdpbmRvd1NpemUsIHN0YXJ0V2luZG93RXZlcnkpKTtcbiAgfTtcbn1cblxuY2xhc3MgV2luZG93Q291bnRPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIE9ic2VydmFibGU8VD4+IHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHdpbmRvd1NpemU6IG51bWJlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzdGFydFdpbmRvd0V2ZXJ5OiBudW1iZXIpIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxPYnNlcnZhYmxlPFQ+Piwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBXaW5kb3dDb3VudFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy53aW5kb3dTaXplLCB0aGlzLnN0YXJ0V2luZG93RXZlcnkpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgV2luZG93Q291bnRTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG4gIHByaXZhdGUgd2luZG93czogU3ViamVjdDxUPltdID0gWyBuZXcgU3ViamVjdDxUPigpIF07XG4gIHByaXZhdGUgY291bnQ6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPE9ic2VydmFibGU8VD4+LFxuICAgICAgICAgICAgICBwcml2YXRlIHdpbmRvd1NpemU6IG51bWJlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzdGFydFdpbmRvd0V2ZXJ5OiBudW1iZXIpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gICAgZGVzdGluYXRpb24ubmV4dCh0aGlzLndpbmRvd3NbMF0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKSB7XG4gICAgY29uc3Qgc3RhcnRXaW5kb3dFdmVyeSA9ICh0aGlzLnN0YXJ0V2luZG93RXZlcnkgPiAwKSA/IHRoaXMuc3RhcnRXaW5kb3dFdmVyeSA6IHRoaXMud2luZG93U2l6ZTtcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHRoaXMuZGVzdGluYXRpb247XG4gICAgY29uc3Qgd2luZG93U2l6ZSA9IHRoaXMud2luZG93U2l6ZTtcbiAgICBjb25zdCB3aW5kb3dzID0gdGhpcy53aW5kb3dzO1xuICAgIGNvbnN0IGxlbiA9IHdpbmRvd3MubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW4gJiYgIXRoaXMuY2xvc2VkOyBpKyspIHtcbiAgICAgIHdpbmRvd3NbaV0ubmV4dCh2YWx1ZSk7XG4gICAgfVxuICAgIGNvbnN0IGMgPSB0aGlzLmNvdW50IC0gd2luZG93U2l6ZSArIDE7XG4gICAgaWYgKGMgPj0gMCAmJiBjICUgc3RhcnRXaW5kb3dFdmVyeSA9PT0gMCAmJiAhdGhpcy5jbG9zZWQpIHtcbiAgICAgIHdpbmRvd3Muc2hpZnQoKS5jb21wbGV0ZSgpO1xuICAgIH1cbiAgICBpZiAoKyt0aGlzLmNvdW50ICUgc3RhcnRXaW5kb3dFdmVyeSA9PT0gMCAmJiAhdGhpcy5jbG9zZWQpIHtcbiAgICAgIGNvbnN0IHdpbmRvdyA9IG5ldyBTdWJqZWN0PFQ+KCk7XG4gICAgICB3aW5kb3dzLnB1c2god2luZG93KTtcbiAgICAgIGRlc3RpbmF0aW9uLm5leHQod2luZG93KTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2Vycm9yKGVycjogYW55KSB7XG4gICAgY29uc3Qgd2luZG93cyA9IHRoaXMud2luZG93cztcbiAgICBpZiAod2luZG93cykge1xuICAgICAgd2hpbGUgKHdpbmRvd3MubGVuZ3RoID4gMCAmJiAhdGhpcy5jbG9zZWQpIHtcbiAgICAgICAgd2luZG93cy5zaGlmdCgpLmVycm9yKGVycik7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY29tcGxldGUoKSB7XG4gICAgY29uc3Qgd2luZG93cyA9IHRoaXMud2luZG93cztcbiAgICBpZiAod2luZG93cykge1xuICAgICAgd2hpbGUgKHdpbmRvd3MubGVuZ3RoID4gMCAmJiAhdGhpcy5jbG9zZWQpIHtcbiAgICAgICAgd2luZG93cy5zaGlmdCgpLmNvbXBsZXRlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfdW5zdWJzY3JpYmUoKSB7XG4gICAgdGhpcy5jb3VudCA9IDA7XG4gICAgdGhpcy53aW5kb3dzID0gbnVsbDtcbiAgfVxufVxuIl19