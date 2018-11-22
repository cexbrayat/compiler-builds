import { zip as zipStatic } from '../observable/zip';
export function zip(...observables) {
    return function zipOperatorFunction(source) {
        return source.lift.call(zipStatic(source, ...observables));
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiemlwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZXh0ZXJuYWwvcnhqcy9pbnRlcm5hbC9vcGVyYXRvcnMvemlwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLElBQUksU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFzQ3JELE1BQU0sVUFBVSxHQUFHLENBQU8sR0FBRyxXQUF5RTtJQUNwRyxPQUFPLFNBQVMsbUJBQW1CLENBQUMsTUFBcUI7UUFDdkQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUksTUFBTSxFQUFFLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgemlwIGFzIHppcFN0YXRpYyB9IGZyb20gJy4uL29ic2VydmFibGUvemlwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE9ic2VydmFibGVJbnB1dCwgT3BlcmF0b3JGdW5jdGlvbiB9IGZyb20gJy4uL3R5cGVzJztcblxuLyogdHNsaW50OmRpc2FibGU6bWF4LWxpbmUtbGVuZ3RoICovXG4vKiogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZCBpbiBmYXZvciBvZiBzdGF0aWMgemlwLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHppcDxULCBSPihwcm9qZWN0OiAodjE6IFQpID0+IFIpOiBPcGVyYXRvckZ1bmN0aW9uPFQsIFI+O1xuLyoqIEBkZXByZWNhdGVkIERlcHJlY2F0ZWQgaW4gZmF2b3Igb2Ygc3RhdGljIHppcC4gKi9cbmV4cG9ydCBmdW5jdGlvbiB6aXA8VCwgVDIsIFI+KHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCBwcm9qZWN0OiAodjE6IFQsIHYyOiBUMikgPT4gUik6IE9wZXJhdG9yRnVuY3Rpb248VCwgUj47XG4vKiogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZCBpbiBmYXZvciBvZiBzdGF0aWMgemlwLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHppcDxULCBUMiwgVDMsIFI+KHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgcHJvamVjdDogKHYxOiBULCB2MjogVDIsIHYzOiBUMykgPT4gUik6IE9wZXJhdG9yRnVuY3Rpb248VCwgUj47XG4vKiogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZCBpbiBmYXZvciBvZiBzdGF0aWMgemlwLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHppcDxULCBUMiwgVDMsIFQ0LCBSPih2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4sIHY0OiBPYnNlcnZhYmxlSW5wdXQ8VDQ+LCBwcm9qZWN0OiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQpID0+IFIpOiBPcGVyYXRvckZ1bmN0aW9uPFQsIFI+O1xuLyoqIEBkZXByZWNhdGVkIERlcHJlY2F0ZWQgaW4gZmF2b3Igb2Ygc3RhdGljIHppcC4gKi9cbmV4cG9ydCBmdW5jdGlvbiB6aXA8VCwgVDIsIFQzLCBUNCwgVDUsIFI+KHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4sIHY1OiBPYnNlcnZhYmxlSW5wdXQ8VDU+LCBwcm9qZWN0OiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQsIHY1OiBUNSkgPT4gUik6IE9wZXJhdG9yRnVuY3Rpb248VCwgUj47XG4vKiogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZCBpbiBmYXZvciBvZiBzdGF0aWMgemlwLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHppcDxULCBUMiwgVDMsIFQ0LCBUNSwgVDYsIFI+KHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4sIHY1OiBPYnNlcnZhYmxlSW5wdXQ8VDU+LCB2NjogT2JzZXJ2YWJsZUlucHV0PFQ2PiwgcHJvamVjdDogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgdjQ6IFQ0LCB2NTogVDUsIHY2OiBUNikgPT4gUik6IE9wZXJhdG9yRnVuY3Rpb248VCwgUj4gO1xuLyoqIEBkZXByZWNhdGVkIERlcHJlY2F0ZWQgaW4gZmF2b3Igb2Ygc3RhdGljIHppcC4gKi9cbmV4cG9ydCBmdW5jdGlvbiB6aXA8VCwgVDI+KHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+KTogT3BlcmF0b3JGdW5jdGlvbjxULCBbVCwgVDJdPjtcbi8qKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkIGluIGZhdm9yIG9mIHN0YXRpYyB6aXAuICovXG5leHBvcnQgZnVuY3Rpb24gemlwPFQsIFQyLCBUMz4odjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+KTogT3BlcmF0b3JGdW5jdGlvbjxULCBbVCwgVDIsIFQzXT47XG4vKiogQGRlcHJlY2F0ZWQgRGVwcmVjYXRlZCBpbiBmYXZvciBvZiBzdGF0aWMgemlwLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHppcDxULCBUMiwgVDMsIFQ0Pih2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4sIHY0OiBPYnNlcnZhYmxlSW5wdXQ8VDQ+KTogT3BlcmF0b3JGdW5jdGlvbjxULCBbVCwgVDIsIFQzLCBUNF0+O1xuLyoqIEBkZXByZWNhdGVkIERlcHJlY2F0ZWQgaW4gZmF2b3Igb2Ygc3RhdGljIHppcC4gKi9cbmV4cG9ydCBmdW5jdGlvbiB6aXA8VCwgVDIsIFQzLCBUNCwgVDU+KHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4sIHY1OiBPYnNlcnZhYmxlSW5wdXQ8VDU+KTogT3BlcmF0b3JGdW5jdGlvbjxULCBbVCwgVDIsIFQzLCBUNCwgVDVdPjtcbi8qKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkIGluIGZhdm9yIG9mIHN0YXRpYyB6aXAuICovXG5leHBvcnQgZnVuY3Rpb24gemlwPFQsIFQyLCBUMywgVDQsIFQ1LCBUNj4odjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0PiwgdjU6IE9ic2VydmFibGVJbnB1dDxUNT4sIHY2OiBPYnNlcnZhYmxlSW5wdXQ8VDY+KTogT3BlcmF0b3JGdW5jdGlvbjxULCBbVCwgVDIsIFQzLCBUNCwgVDUsIFQ2XT4gO1xuLyoqIEBkZXByZWNhdGVkIERlcHJlY2F0ZWQgaW4gZmF2b3Igb2Ygc3RhdGljIHppcC4gKi9cbmV4cG9ydCBmdW5jdGlvbiB6aXA8VCwgUj4oLi4ub2JzZXJ2YWJsZXM6IEFycmF5PE9ic2VydmFibGVJbnB1dDxUPiB8ICgoLi4udmFsdWVzOiBBcnJheTxUPikgPT4gUik+KTogT3BlcmF0b3JGdW5jdGlvbjxULCBSPjtcbi8qKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkIGluIGZhdm9yIG9mIHN0YXRpYyB6aXAuICovXG5leHBvcnQgZnVuY3Rpb24gemlwPFQsIFI+KGFycmF5OiBBcnJheTxPYnNlcnZhYmxlSW5wdXQ8VD4+KTogT3BlcmF0b3JGdW5jdGlvbjxULCBSPjtcbi8qKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkIGluIGZhdm9yIG9mIHN0YXRpYyB6aXAuICovXG5leHBvcnQgZnVuY3Rpb24gemlwPFQsIFRPdGhlciwgUj4oYXJyYXk6IEFycmF5PE9ic2VydmFibGVJbnB1dDxUT3RoZXI+PiwgcHJvamVjdDogKHYxOiBULCAuLi52YWx1ZXM6IEFycmF5PFRPdGhlcj4pID0+IFIpOiBPcGVyYXRvckZ1bmN0aW9uPFQsIFI+O1xuLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBEZXByZWNhdGVkIGluIGZhdm9yIG9mIHN0YXRpYyB7QGxpbmsgemlwfS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHppcDxULCBSPiguLi5vYnNlcnZhYmxlczogQXJyYXk8T2JzZXJ2YWJsZUlucHV0PGFueT4gfCAoKC4uLnZhbHVlczogQXJyYXk8YW55PikgPT4gUik+KTogT3BlcmF0b3JGdW5jdGlvbjxULCBSPiB7XG4gIHJldHVybiBmdW5jdGlvbiB6aXBPcGVyYXRvckZ1bmN0aW9uKHNvdXJjZTogT2JzZXJ2YWJsZTxUPikge1xuICAgIHJldHVybiBzb3VyY2UubGlmdC5jYWxsKHppcFN0YXRpYzxSPihzb3VyY2UsIC4uLm9ic2VydmFibGVzKSk7XG4gIH07XG59Il19