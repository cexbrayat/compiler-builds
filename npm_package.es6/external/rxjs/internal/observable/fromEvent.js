import { Observable } from '../Observable';
import { isArray } from '../util/isArray';
import { isFunction } from '../util/isFunction';
import { map } from '../operators/map';
const toString = Object.prototype.toString;
export function fromEvent(target, eventName, options, resultSelector) {
    if (isFunction(options)) {
        resultSelector = options;
        options = undefined;
    }
    if (resultSelector) {
        return fromEvent(target, eventName, options).pipe(map(args => isArray(args) ? resultSelector(...args) : resultSelector(args)));
    }
    return new Observable(subscriber => {
        function handler(e) {
            if (arguments.length > 1) {
                subscriber.next(Array.prototype.slice.call(arguments));
            }
            else {
                subscriber.next(e);
            }
        }
        setupSubscription(target, eventName, handler, subscriber, options);
    });
}
function setupSubscription(sourceObj, eventName, handler, subscriber, options) {
    let unsubscribe;
    if (isEventTarget(sourceObj)) {
        const source = sourceObj;
        sourceObj.addEventListener(eventName, handler, options);
        unsubscribe = () => source.removeEventListener(eventName, handler, options);
    }
    else if (isJQueryStyleEventEmitter(sourceObj)) {
        const source = sourceObj;
        sourceObj.on(eventName, handler);
        unsubscribe = () => source.off(eventName, handler);
    }
    else if (isNodeStyleEventEmitter(sourceObj)) {
        const source = sourceObj;
        sourceObj.addListener(eventName, handler);
        unsubscribe = () => source.removeListener(eventName, handler);
    }
    else if (sourceObj && sourceObj.length) {
        for (let i = 0, len = sourceObj.length; i < len; i++) {
            setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
        }
    }
    else {
        throw new TypeError('Invalid event target');
    }
    subscriber.add(unsubscribe);
}
function isNodeStyleEventEmitter(sourceObj) {
    return sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
}
function isJQueryStyleEventEmitter(sourceObj) {
    return sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
}
function isEventTarget(sourceObj) {
    return sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbUV2ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZXh0ZXJuYWwvcnhqcy9pbnRlcm5hbC9vYnNlcnZhYmxlL2Zyb21FdmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMxQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFaEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXZDLE1BQU0sUUFBUSxHQUFhLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO0FBc0tyRCxNQUFNLFVBQVUsU0FBUyxDQUN2QixNQUEwQixFQUMxQixTQUFpQixFQUNqQixPQUF3RCxFQUN4RCxjQUF3QztJQUd4QyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUV2QixjQUFjLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLE9BQU8sR0FBRyxTQUFTLENBQUM7S0FDckI7SUFDRCxJQUFJLGNBQWMsRUFBRTtRQUVsQixPQUFPLFNBQVMsQ0FBSSxNQUFNLEVBQUUsU0FBUyxFQUFvQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ3BGLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUM1RSxDQUFDO0tBQ0g7SUFFRCxPQUFPLElBQUksVUFBVSxDQUFJLFVBQVUsQ0FBQyxFQUFFO1FBQ3BDLFNBQVMsT0FBTyxDQUFDLENBQUk7WUFDbkIsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDeEIsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUN4RDtpQkFBTTtnQkFDTCxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3BCO1FBQ0gsQ0FBQztRQUNELGlCQUFpQixDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUErQixDQUFDLENBQUM7SUFDN0YsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsU0FBUyxpQkFBaUIsQ0FBSSxTQUE2QixFQUFFLFNBQWlCLEVBQ2hELE9BQWlDLEVBQUUsVUFBeUIsRUFDNUQsT0FBOEI7SUFDMUQsSUFBSSxXQUF1QixDQUFDO0lBQzVCLElBQUksYUFBYSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQzVCLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQztRQUN6QixTQUFTLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN4RCxXQUFXLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDN0U7U0FBTSxJQUFJLHlCQUF5QixDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQy9DLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQztRQUN6QixTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqQyxXQUFXLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDcEQ7U0FBTSxJQUFJLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQzdDLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQztRQUN6QixTQUFTLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxPQUEyQixDQUFDLENBQUM7UUFDOUQsV0FBVyxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLE9BQTJCLENBQUMsQ0FBQztLQUNuRjtTQUFNLElBQUksU0FBUyxJQUFLLFNBQWlCLENBQUMsTUFBTSxFQUFFO1FBQ2pELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBSSxTQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdELGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUMxRTtLQUNGO1NBQU07UUFDTCxNQUFNLElBQUksU0FBUyxDQUFDLHNCQUFzQixDQUFDLENBQUM7S0FDN0M7SUFFRCxVQUFVLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzlCLENBQUM7QUFFRCxTQUFTLHVCQUF1QixDQUFDLFNBQWM7SUFDN0MsT0FBTyxTQUFTLElBQUksT0FBTyxTQUFTLENBQUMsV0FBVyxLQUFLLFVBQVUsSUFBSSxPQUFPLFNBQVMsQ0FBQyxjQUFjLEtBQUssVUFBVSxDQUFDO0FBQ3BILENBQUM7QUFFRCxTQUFTLHlCQUF5QixDQUFDLFNBQWM7SUFDL0MsT0FBTyxTQUFTLElBQUksT0FBTyxTQUFTLENBQUMsRUFBRSxLQUFLLFVBQVUsSUFBSSxPQUFPLFNBQVMsQ0FBQyxHQUFHLEtBQUssVUFBVSxDQUFDO0FBQ2hHLENBQUM7QUFFRCxTQUFTLGFBQWEsQ0FBQyxTQUFjO0lBQ25DLE9BQU8sU0FBUyxJQUFJLE9BQU8sU0FBUyxDQUFDLGdCQUFnQixLQUFLLFVBQVUsSUFBSSxPQUFPLFNBQVMsQ0FBQyxtQkFBbUIsS0FBSyxVQUFVLENBQUM7QUFDOUgsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuLi91dGlsL2lzQXJyYXknO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL3V0aWwvaXNGdW5jdGlvbic7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICcuLi9vcGVyYXRvcnMvbWFwJztcblxuY29uc3QgdG9TdHJpbmc6IEZ1bmN0aW9uID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuZXhwb3J0IGludGVyZmFjZSBOb2RlU3R5bGVFdmVudEVtaXR0ZXIge1xuICBhZGRMaXN0ZW5lcjogKGV2ZW50TmFtZTogc3RyaW5nIHwgc3ltYm9sLCBoYW5kbGVyOiBOb2RlRXZlbnRIYW5kbGVyKSA9PiB0aGlzO1xuICByZW1vdmVMaXN0ZW5lcjogKGV2ZW50TmFtZTogc3RyaW5nIHwgc3ltYm9sLCBoYW5kbGVyOiBOb2RlRXZlbnRIYW5kbGVyKSA9PiB0aGlzO1xufVxuXG5leHBvcnQgdHlwZSBOb2RlRXZlbnRIYW5kbGVyID0gKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkO1xuXG4vLyBGb3IgQVBJcyB0aGF0IGltcGxlbWVudCBgYWRkTGlzdGVuZXJgIGFuZCBgcmVtb3ZlTGlzdGVuZXJgIG1ldGhvZHMgdGhhdCBtYXlcbi8vIG5vdCB1c2UgdGhlIHNhbWUgYXJndW1lbnRzIG9yIHJldHVybiBFdmVudEVtaXR0ZXIgdmFsdWVzXG4vLyBzdWNoIGFzIFJlYWN0IE5hdGl2ZVxuZXhwb3J0IGludGVyZmFjZSBOb2RlQ29tcGF0aWJsZUV2ZW50RW1pdHRlciB7XG4gIGFkZExpc3RlbmVyOiAoZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IE5vZGVFdmVudEhhbmRsZXIpID0+IHZvaWQgfCB7fTtcbiAgcmVtb3ZlTGlzdGVuZXI6IChldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogTm9kZUV2ZW50SGFuZGxlcikgPT4gdm9pZCB8IHt9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEpRdWVyeVN0eWxlRXZlbnRFbWl0dGVyIHtcbiAgb246IChldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pID0+IHZvaWQ7XG4gIG9mZjogKGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbikgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBIYXNFdmVudFRhcmdldEFkZFJlbW92ZTxFPiB7XG4gIGFkZEV2ZW50TGlzdGVuZXIodHlwZTogc3RyaW5nLCBsaXN0ZW5lcjogKChldnQ6IEUpID0+IHZvaWQpIHwgbnVsbCwgb3B0aW9ucz86IGJvb2xlYW4gfCBBZGRFdmVudExpc3RlbmVyT3B0aW9ucyk6IHZvaWQ7XG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZTogc3RyaW5nLCBsaXN0ZW5lcj86ICgoZXZ0OiBFKSA9PiB2b2lkKSB8IG51bGwsIG9wdGlvbnM/OiBFdmVudExpc3RlbmVyT3B0aW9ucyB8IGJvb2xlYW4pOiB2b2lkO1xufVxuXG5leHBvcnQgdHlwZSBFdmVudFRhcmdldExpa2U8VD4gPSBIYXNFdmVudFRhcmdldEFkZFJlbW92ZTxUPiB8IE5vZGVTdHlsZUV2ZW50RW1pdHRlciB8IE5vZGVDb21wYXRpYmxlRXZlbnRFbWl0dGVyIHwgSlF1ZXJ5U3R5bGVFdmVudEVtaXR0ZXI7XG5cbmV4cG9ydCB0eXBlIEZyb21FdmVudFRhcmdldDxUPiA9IEV2ZW50VGFyZ2V0TGlrZTxUPiB8IEFycmF5TGlrZTxFdmVudFRhcmdldExpa2U8VD4+O1xuXG5leHBvcnQgaW50ZXJmYWNlIEV2ZW50TGlzdGVuZXJPcHRpb25zIHtcbiAgY2FwdHVyZT86IGJvb2xlYW47XG4gIHBhc3NpdmU/OiBib29sZWFuO1xuICBvbmNlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBZGRFdmVudExpc3RlbmVyT3B0aW9ucyBleHRlbmRzIEV2ZW50TGlzdGVuZXJPcHRpb25zIHtcbiAgb25jZT86IGJvb2xlYW47XG4gIHBhc3NpdmU/OiBib29sZWFuO1xufVxuXG4vKiB0c2xpbnQ6ZGlzYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbmV4cG9ydCBmdW5jdGlvbiBmcm9tRXZlbnQ8VD4odGFyZ2V0OiBGcm9tRXZlbnRUYXJnZXQ8VD4sIGV2ZW50TmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPjtcbi8qKiBAZGVwcmVjYXRlZCByZXN1bHRTZWxlY3RvciBubyBsb25nZXIgc3VwcG9ydGVkLCBwaXBlIHRvIG1hcCBpbnN0ZWFkICovXG5leHBvcnQgZnVuY3Rpb24gZnJvbUV2ZW50PFQ+KHRhcmdldDogRnJvbUV2ZW50VGFyZ2V0PFQ+LCBldmVudE5hbWU6IHN0cmluZywgcmVzdWx0U2VsZWN0b3I6ICguLi5hcmdzOiBhbnlbXSkgPT4gVCk6IE9ic2VydmFibGU8VD47XG5leHBvcnQgZnVuY3Rpb24gZnJvbUV2ZW50PFQ+KHRhcmdldDogRnJvbUV2ZW50VGFyZ2V0PFQ+LCBldmVudE5hbWU6IHN0cmluZywgb3B0aW9uczogRXZlbnRMaXN0ZW5lck9wdGlvbnMpOiBPYnNlcnZhYmxlPFQ+O1xuLyoqIEBkZXByZWNhdGVkIHJlc3VsdFNlbGVjdG9yIG5vIGxvbmdlciBzdXBwb3J0ZWQsIHBpcGUgdG8gbWFwIGluc3RlYWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBmcm9tRXZlbnQ8VD4odGFyZ2V0OiBGcm9tRXZlbnRUYXJnZXQ8VD4sIGV2ZW50TmFtZTogc3RyaW5nLCBvcHRpb25zOiBFdmVudExpc3RlbmVyT3B0aW9ucywgcmVzdWx0U2VsZWN0b3I6ICguLi5hcmdzOiBhbnlbXSkgPT4gVCk6IE9ic2VydmFibGU8VD47XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGV2ZW50cyBvZiBhIHNwZWNpZmljIHR5cGUgY29taW5nIGZyb20gdGhlXG4gKiBnaXZlbiBldmVudCB0YXJnZXQuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkNyZWF0ZXMgYW4gT2JzZXJ2YWJsZSBmcm9tIERPTSBldmVudHMsIG9yIE5vZGUuanNcbiAqIEV2ZW50RW1pdHRlciBldmVudHMgb3Igb3RoZXJzLjwvc3Bhbj5cbiAqXG4gKiAhW10oZnJvbUV2ZW50LnBuZylcbiAqXG4gKiBgZnJvbUV2ZW50YCBhY2NlcHRzIGFzIGEgZmlyc3QgYXJndW1lbnQgZXZlbnQgdGFyZ2V0LCB3aGljaCBpcyBhbiBvYmplY3Qgd2l0aCBtZXRob2RzXG4gKiBmb3IgcmVnaXN0ZXJpbmcgZXZlbnQgaGFuZGxlciBmdW5jdGlvbnMuIEFzIGEgc2Vjb25kIGFyZ3VtZW50IGl0IHRha2VzIHN0cmluZyB0aGF0IGluZGljYXRlc1xuICogdHlwZSBvZiBldmVudCB3ZSB3YW50IHRvIGxpc3RlbiBmb3IuIGBmcm9tRXZlbnRgIHN1cHBvcnRzIHNlbGVjdGVkIHR5cGVzIG9mIGV2ZW50IHRhcmdldHMsXG4gKiB3aGljaCBhcmUgZGVzY3JpYmVkIGluIGRldGFpbCBiZWxvdy4gSWYgeW91ciBldmVudCB0YXJnZXQgZG9lcyBub3QgbWF0Y2ggYW55IG9mIHRoZSBvbmVzIGxpc3RlZCxcbiAqIHlvdSBzaG91bGQgdXNlIHtAbGluayBmcm9tRXZlbnRQYXR0ZXJufSwgd2hpY2ggY2FuIGJlIHVzZWQgb24gYXJiaXRyYXJ5IEFQSXMuXG4gKiBXaGVuIGl0IGNvbWVzIHRvIEFQSXMgc3VwcG9ydGVkIGJ5IGBmcm9tRXZlbnRgLCB0aGVpciBtZXRob2RzIGZvciBhZGRpbmcgYW5kIHJlbW92aW5nIGV2ZW50XG4gKiBoYW5kbGVyIGZ1bmN0aW9ucyBoYXZlIGRpZmZlcmVudCBuYW1lcywgYnV0IHRoZXkgYWxsIGFjY2VwdCBhIHN0cmluZyBkZXNjcmliaW5nIGV2ZW50IHR5cGVcbiAqIGFuZCBmdW5jdGlvbiBpdHNlbGYsIHdoaWNoIHdpbGwgYmUgY2FsbGVkIHdoZW5ldmVyIHNhaWQgZXZlbnQgaGFwcGVucy5cbiAqXG4gKiBFdmVyeSB0aW1lIHJlc3VsdGluZyBPYnNlcnZhYmxlIGlzIHN1YnNjcmliZWQsIGV2ZW50IGhhbmRsZXIgZnVuY3Rpb24gd2lsbCBiZSByZWdpc3RlcmVkXG4gKiB0byBldmVudCB0YXJnZXQgb24gZ2l2ZW4gZXZlbnQgdHlwZS4gV2hlbiB0aGF0IGV2ZW50IGZpcmVzLCB2YWx1ZVxuICogcGFzc2VkIGFzIGEgZmlyc3QgYXJndW1lbnQgdG8gcmVnaXN0ZXJlZCBmdW5jdGlvbiB3aWxsIGJlIGVtaXR0ZWQgYnkgb3V0cHV0IE9ic2VydmFibGUuXG4gKiBXaGVuIE9ic2VydmFibGUgaXMgdW5zdWJzY3JpYmVkLCBmdW5jdGlvbiB3aWxsIGJlIHVucmVnaXN0ZXJlZCBmcm9tIGV2ZW50IHRhcmdldC5cbiAqXG4gKiBOb3RlIHRoYXQgaWYgZXZlbnQgdGFyZ2V0IGNhbGxzIHJlZ2lzdGVyZWQgZnVuY3Rpb24gd2l0aCBtb3JlIHRoYW4gb25lIGFyZ3VtZW50LCBzZWNvbmRcbiAqIGFuZCBmb2xsb3dpbmcgYXJndW1lbnRzIHdpbGwgbm90IGFwcGVhciBpbiByZXN1bHRpbmcgc3RyZWFtLiBJbiBvcmRlciB0byBnZXQgYWNjZXNzIHRvIHRoZW0sXG4gKiB5b3UgY2FuIHBhc3MgdG8gYGZyb21FdmVudGAgb3B0aW9uYWwgcHJvamVjdCBmdW5jdGlvbiwgd2hpY2ggd2lsbCBiZSBjYWxsZWQgd2l0aCBhbGwgYXJndW1lbnRzXG4gKiBwYXNzZWQgdG8gZXZlbnQgaGFuZGxlci4gT3V0cHV0IE9ic2VydmFibGUgd2lsbCB0aGVuIGVtaXQgdmFsdWUgcmV0dXJuZWQgYnkgcHJvamVjdCBmdW5jdGlvbixcbiAqIGluc3RlYWQgb2YgdGhlIHVzdWFsIHZhbHVlLlxuICpcbiAqIFJlbWVtYmVyIHRoYXQgZXZlbnQgdGFyZ2V0cyBsaXN0ZWQgYmVsb3cgYXJlIGNoZWNrZWQgdmlhIGR1Y2sgdHlwaW5nLiBJdCBtZWFucyB0aGF0XG4gKiBubyBtYXR0ZXIgd2hhdCBraW5kIG9mIG9iamVjdCB5b3UgaGF2ZSBhbmQgbm8gbWF0dGVyIHdoYXQgZW52aXJvbm1lbnQgeW91IHdvcmsgaW4sXG4gKiB5b3UgY2FuIHNhZmVseSB1c2UgYGZyb21FdmVudGAgb24gdGhhdCBvYmplY3QgaWYgaXQgZXhwb3NlcyBkZXNjcmliZWQgbWV0aG9kcyAocHJvdmlkZWRcbiAqIG9mIGNvdXJzZSB0aGV5IGJlaGF2ZSBhcyB3YXMgZGVzY3JpYmVkIGFib3ZlKS4gU28gZm9yIGV4YW1wbGUgaWYgTm9kZS5qcyBsaWJyYXJ5IGV4cG9zZXNcbiAqIGV2ZW50IHRhcmdldCB3aGljaCBoYXMgdGhlIHNhbWUgbWV0aG9kIG5hbWVzIGFzIERPTSBFdmVudFRhcmdldCwgYGZyb21FdmVudGAgaXMgc3RpbGxcbiAqIGEgZ29vZCBjaG9pY2UuXG4gKlxuICogSWYgdGhlIEFQSSB5b3UgdXNlIGlzIG1vcmUgY2FsbGJhY2sgdGhlbiBldmVudCBoYW5kbGVyIG9yaWVudGVkIChzdWJzY3JpYmVkXG4gKiBjYWxsYmFjayBmdW5jdGlvbiBmaXJlcyBvbmx5IG9uY2UgYW5kIHRodXMgdGhlcmUgaXMgbm8gbmVlZCB0byBtYW51YWxseVxuICogdW5yZWdpc3RlciBpdCksIHlvdSBzaG91bGQgdXNlIHtAbGluayBiaW5kQ2FsbGJhY2t9IG9yIHtAbGluayBiaW5kTm9kZUNhbGxiYWNrfVxuICogaW5zdGVhZC5cbiAqXG4gKiBgZnJvbUV2ZW50YCBzdXBwb3J0cyBmb2xsb3dpbmcgdHlwZXMgb2YgZXZlbnQgdGFyZ2V0czpcbiAqXG4gKiAqKkRPTSBFdmVudFRhcmdldCoqXG4gKlxuICogVGhpcyBpcyBhbiBvYmplY3Qgd2l0aCBgYWRkRXZlbnRMaXN0ZW5lcmAgYW5kIGByZW1vdmVFdmVudExpc3RlbmVyYCBtZXRob2RzLlxuICpcbiAqIEluIHRoZSBicm93c2VyLCBgYWRkRXZlbnRMaXN0ZW5lcmAgYWNjZXB0cyAtIGFwYXJ0IGZyb20gZXZlbnQgdHlwZSBzdHJpbmcgYW5kIGV2ZW50XG4gKiBoYW5kbGVyIGZ1bmN0aW9uIGFyZ3VtZW50cyAtIG9wdGlvbmFsIHRoaXJkIHBhcmFtZXRlciwgd2hpY2ggaXMgZWl0aGVyIGFuIG9iamVjdCBvciBib29sZWFuLFxuICogYm90aCB1c2VkIGZvciBhZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gaG93IGFuZCB3aGVuIHBhc3NlZCBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZC4gV2hlblxuICogYGZyb21FdmVudGAgaXMgdXNlZCB3aXRoIGV2ZW50IHRhcmdldCBvZiB0aGF0IHR5cGUsIHlvdSBjYW4gcHJvdmlkZSB0aGlzIHZhbHVlc1xuICogYXMgdGhpcmQgcGFyYW1ldGVyIGFzIHdlbGwuXG4gKlxuICogKipOb2RlLmpzIEV2ZW50RW1pdHRlcioqXG4gKlxuICogQW4gb2JqZWN0IHdpdGggYGFkZExpc3RlbmVyYCBhbmQgYHJlbW92ZUxpc3RlbmVyYCBtZXRob2RzLlxuICpcbiAqICoqSlF1ZXJ5LXN0eWxlIGV2ZW50IHRhcmdldCoqXG4gKlxuICogQW4gb2JqZWN0IHdpdGggYG9uYCBhbmQgYG9mZmAgbWV0aG9kc1xuICpcbiAqICoqRE9NIE5vZGVMaXN0KipcbiAqXG4gKiBMaXN0IG9mIERPTSBOb2RlcywgcmV0dXJuZWQgZm9yIGV4YW1wbGUgYnkgYGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGxgIG9yIGBOb2RlLmNoaWxkTm9kZXNgLlxuICpcbiAqIEFsdGhvdWdoIHRoaXMgY29sbGVjdGlvbiBpcyBub3QgZXZlbnQgdGFyZ2V0IGluIGl0c2VsZiwgYGZyb21FdmVudGAgd2lsbCBpdGVyYXRlIG92ZXIgYWxsIE5vZGVzXG4gKiBpdCBjb250YWlucyBhbmQgaW5zdGFsbCBldmVudCBoYW5kbGVyIGZ1bmN0aW9uIGluIGV2ZXJ5IG9mIHRoZW0uIFdoZW4gcmV0dXJuZWQgT2JzZXJ2YWJsZVxuICogaXMgdW5zdWJzY3JpYmVkLCBmdW5jdGlvbiB3aWxsIGJlIHJlbW92ZWQgZnJvbSBhbGwgTm9kZXMuXG4gKlxuICogKipET00gSHRtbENvbGxlY3Rpb24qKlxuICpcbiAqIEp1c3QgYXMgaW4gY2FzZSBvZiBOb2RlTGlzdCBpdCBpcyBhIGNvbGxlY3Rpb24gb2YgRE9NIG5vZGVzLiBIZXJlIGFzIHdlbGwgZXZlbnQgaGFuZGxlciBmdW5jdGlvbiBpc1xuICogaW5zdGFsbGVkIGFuZCByZW1vdmVkIGluIGVhY2ggb2YgZWxlbWVudHMuXG4gKlxuICpcbiAqICMjIEV4YW1wbGVzXG4gKiAjIyMgRW1pdHMgY2xpY2tzIGhhcHBlbmluZyBvbiB0aGUgRE9NIGRvY3VtZW50XG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBjb25zdCBjbGlja3MgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogY2xpY2tzLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiAvLyBSZXN1bHRzIGluOlxuICogLy8gTW91c2VFdmVudCBvYmplY3QgbG9nZ2VkIHRvIGNvbnNvbGUgZXZlcnkgdGltZSBhIGNsaWNrXG4gKiAvLyBvY2N1cnMgb24gdGhlIGRvY3VtZW50LlxuICogYGBgXG4gKlxuICogIyMjIFVzZSBhZGRFdmVudExpc3RlbmVyIHdpdGggY2FwdHVyZSBvcHRpb25cbiAqIGBgYGphdmFzY3JpcHRcbiAqIGNvbnN0IGNsaWNrc0luRG9jdW1lbnQgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycsIHRydWUpOyAvLyBub3RlIG9wdGlvbmFsIGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2hpY2ggd2lsbCBiZSBwYXNzZWQgdG8gYWRkRXZlbnRMaXN0ZW5lclxuICogY29uc3QgY2xpY2tzSW5EaXYgPSBmcm9tRXZlbnQoc29tZURpdkluRG9jdW1lbnQsICdjbGljaycpO1xuICpcbiAqIGNsaWNrc0luRG9jdW1lbnQuc3Vic2NyaWJlKCgpID0+IGNvbnNvbGUubG9nKCdkb2N1bWVudCcpKTtcbiAqIGNsaWNrc0luRGl2LnN1YnNjcmliZSgoKSA9PiBjb25zb2xlLmxvZygnZGl2JykpO1xuICpcbiAqIC8vIEJ5IGRlZmF1bHQgZXZlbnRzIGJ1YmJsZSBVUCBpbiBET00gdHJlZSwgc28gbm9ybWFsbHlcbiAqIC8vIHdoZW4gd2Ugd291bGQgY2xpY2sgb24gZGl2IGluIGRvY3VtZW50XG4gKiAvLyBcImRpdlwiIHdvdWxkIGJlIGxvZ2dlZCBmaXJzdCBhbmQgdGhlbiBcImRvY3VtZW50XCIuXG4gKiAvLyBTaW5jZSB3ZSBzcGVjaWZpZWQgb3B0aW9uYWwgYGNhcHR1cmVgIG9wdGlvbiwgZG9jdW1lbnRcbiAqIC8vIHdpbGwgY2F0Y2ggZXZlbnQgd2hlbiBpdCBnb2VzIERPV04gRE9NIHRyZWUsIHNvIGNvbnNvbGVcbiAqIC8vIHdpbGwgbG9nIFwiZG9jdW1lbnRcIiBhbmQgdGhlbiBcImRpdlwiLlxuICogYGBgXG4gKlxuICogQHNlZSB7QGxpbmsgYmluZENhbGxiYWNrfVxuICogQHNlZSB7QGxpbmsgYmluZE5vZGVDYWxsYmFja31cbiAqIEBzZWUge0BsaW5rIGZyb21FdmVudFBhdHRlcm59XG4gKlxuICogQHBhcmFtIHtGcm9tRXZlbnRUYXJnZXQ8VD59IHRhcmdldCBUaGUgRE9NIEV2ZW50VGFyZ2V0LCBOb2RlLmpzXG4gKiBFdmVudEVtaXR0ZXIsIEpRdWVyeS1saWtlIGV2ZW50IHRhcmdldCwgTm9kZUxpc3Qgb3IgSFRNTENvbGxlY3Rpb24gdG8gYXR0YWNoIHRoZSBldmVudCBoYW5kbGVyIHRvLlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSBUaGUgZXZlbnQgbmFtZSBvZiBpbnRlcmVzdCwgYmVpbmcgZW1pdHRlZCBieSB0aGVcbiAqIGB0YXJnZXRgLlxuICogQHBhcmFtIHtFdmVudExpc3RlbmVyT3B0aW9uc30gW29wdGlvbnNdIE9wdGlvbnMgdG8gcGFzcyB0aHJvdWdoIHRvIGFkZEV2ZW50TGlzdGVuZXJcbiAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XG4gKiBAbmFtZSBmcm9tRXZlbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21FdmVudDxUPihcbiAgdGFyZ2V0OiBGcm9tRXZlbnRUYXJnZXQ8VD4sXG4gIGV2ZW50TmFtZTogc3RyaW5nLFxuICBvcHRpb25zPzogRXZlbnRMaXN0ZW5lck9wdGlvbnMgfCAoKC4uLmFyZ3M6IGFueVtdKSA9PiBUKSxcbiAgcmVzdWx0U2VsZWN0b3I/OiAoKC4uLmFyZ3M6IGFueVtdKSA9PiBUKVxuKTogT2JzZXJ2YWJsZTxUPiB7XG5cbiAgaWYgKGlzRnVuY3Rpb24ob3B0aW9ucykpIHtcbiAgICAvLyBERVBSRUNBVEVEIFBBVEhcbiAgICByZXN1bHRTZWxlY3RvciA9IG9wdGlvbnM7XG4gICAgb3B0aW9ucyA9IHVuZGVmaW5lZDtcbiAgfVxuICBpZiAocmVzdWx0U2VsZWN0b3IpIHtcbiAgICAvLyBERVBSRUNBVEVEIFBBVEhcbiAgICByZXR1cm4gZnJvbUV2ZW50PFQ+KHRhcmdldCwgZXZlbnROYW1lLCA8RXZlbnRMaXN0ZW5lck9wdGlvbnMgfCB1bmRlZmluZWQ+b3B0aW9ucykucGlwZShcbiAgICAgIG1hcChhcmdzID0+IGlzQXJyYXkoYXJncykgPyByZXN1bHRTZWxlY3RvciguLi5hcmdzKSA6IHJlc3VsdFNlbGVjdG9yKGFyZ3MpKVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gbmV3IE9ic2VydmFibGU8VD4oc3Vic2NyaWJlciA9PiB7XG4gICAgZnVuY3Rpb24gaGFuZGxlcihlOiBUKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBzZXR1cFN1YnNjcmlwdGlvbih0YXJnZXQsIGV2ZW50TmFtZSwgaGFuZGxlciwgc3Vic2NyaWJlciwgb3B0aW9ucyBhcyBFdmVudExpc3RlbmVyT3B0aW9ucyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXR1cFN1YnNjcmlwdGlvbjxUPihzb3VyY2VPYmo6IEZyb21FdmVudFRhcmdldDxUPiwgZXZlbnROYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyOiAoLi4uYXJnczogYW55W10pID0+IHZvaWQsIHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zPzogRXZlbnRMaXN0ZW5lck9wdGlvbnMpIHtcbiAgbGV0IHVuc3Vic2NyaWJlOiAoKSA9PiB2b2lkO1xuICBpZiAoaXNFdmVudFRhcmdldChzb3VyY2VPYmopKSB7XG4gICAgY29uc3Qgc291cmNlID0gc291cmNlT2JqO1xuICAgIHNvdXJjZU9iai5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlciwgb3B0aW9ucyk7XG4gICAgdW5zdWJzY3JpYmUgPSAoKSA9PiBzb3VyY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICB9IGVsc2UgaWYgKGlzSlF1ZXJ5U3R5bGVFdmVudEVtaXR0ZXIoc291cmNlT2JqKSkge1xuICAgIGNvbnN0IHNvdXJjZSA9IHNvdXJjZU9iajtcbiAgICBzb3VyY2VPYmoub24oZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICB1bnN1YnNjcmliZSA9ICgpID0+IHNvdXJjZS5vZmYoZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgfSBlbHNlIGlmIChpc05vZGVTdHlsZUV2ZW50RW1pdHRlcihzb3VyY2VPYmopKSB7XG4gICAgY29uc3Qgc291cmNlID0gc291cmNlT2JqO1xuICAgIHNvdXJjZU9iai5hZGRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIgYXMgTm9kZUV2ZW50SGFuZGxlcik7XG4gICAgdW5zdWJzY3JpYmUgPSAoKSA9PiBzb3VyY2UucmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyIGFzIE5vZGVFdmVudEhhbmRsZXIpO1xuICB9IGVsc2UgaWYgKHNvdXJjZU9iaiAmJiAoc291cmNlT2JqIGFzIGFueSkubGVuZ3RoKSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IChzb3VyY2VPYmogYXMgYW55KS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgc2V0dXBTdWJzY3JpcHRpb24oc291cmNlT2JqW2ldLCBldmVudE5hbWUsIGhhbmRsZXIsIHN1YnNjcmliZXIsIG9wdGlvbnMpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGV2ZW50IHRhcmdldCcpO1xuICB9XG5cbiAgc3Vic2NyaWJlci5hZGQodW5zdWJzY3JpYmUpO1xufVxuXG5mdW5jdGlvbiBpc05vZGVTdHlsZUV2ZW50RW1pdHRlcihzb3VyY2VPYmo6IGFueSk6IHNvdXJjZU9iaiBpcyBOb2RlU3R5bGVFdmVudEVtaXR0ZXIge1xuICByZXR1cm4gc291cmNlT2JqICYmIHR5cGVvZiBzb3VyY2VPYmouYWRkTGlzdGVuZXIgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHNvdXJjZU9iai5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNKUXVlcnlTdHlsZUV2ZW50RW1pdHRlcihzb3VyY2VPYmo6IGFueSk6IHNvdXJjZU9iaiBpcyBKUXVlcnlTdHlsZUV2ZW50RW1pdHRlciB7XG4gIHJldHVybiBzb3VyY2VPYmogJiYgdHlwZW9mIHNvdXJjZU9iai5vbiA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygc291cmNlT2JqLm9mZiA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNFdmVudFRhcmdldChzb3VyY2VPYmo6IGFueSk6IHNvdXJjZU9iaiBpcyBIYXNFdmVudFRhcmdldEFkZFJlbW92ZTxhbnk+IHtcbiAgcmV0dXJuIHNvdXJjZU9iaiAmJiB0eXBlb2Ygc291cmNlT2JqLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHNvdXJjZU9iai5yZW1vdmVFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nO1xufVxuIl19