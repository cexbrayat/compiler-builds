import { mergeAll } from './mergeAll';
export function concatAll() {
    return mergeAll(1);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uY2F0QWxsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZXh0ZXJuYWwvcnhqcy9pbnRlcm5hbC9vcGVyYXRvcnMvY29uY2F0QWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxZQUFZLENBQUM7QUE2RHRDLE1BQU0sVUFBVSxTQUFTO0lBQ3ZCLE9BQU8sUUFBUSxDQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IG1lcmdlQWxsIH0gZnJvbSAnLi9tZXJnZUFsbCc7XG5pbXBvcnQgeyBPcGVyYXRvckZ1bmN0aW9uLCBPYnNlcnZhYmxlSW5wdXQgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25jYXRBbGw8VD4oKTogT3BlcmF0b3JGdW5jdGlvbjxPYnNlcnZhYmxlSW5wdXQ8VD4sIFQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNvbmNhdEFsbDxSPigpOiBPcGVyYXRvckZ1bmN0aW9uPGFueSwgUj47XG5cbi8qKlxuICogQ29udmVydHMgYSBoaWdoZXItb3JkZXIgT2JzZXJ2YWJsZSBpbnRvIGEgZmlyc3Qtb3JkZXIgT2JzZXJ2YWJsZSBieVxuICogY29uY2F0ZW5hdGluZyB0aGUgaW5uZXIgT2JzZXJ2YWJsZXMgaW4gb3JkZXIuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkZsYXR0ZW5zIGFuIE9ic2VydmFibGUtb2YtT2JzZXJ2YWJsZXMgYnkgcHV0dGluZyBvbmVcbiAqIGlubmVyIE9ic2VydmFibGUgYWZ0ZXIgdGhlIG90aGVyLjwvc3Bhbj5cbiAqXG4gKiAhW10oY29uY2F0QWxsLnBuZylcbiAqXG4gKiBKb2lucyBldmVyeSBPYnNlcnZhYmxlIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSAoYSBoaWdoZXItb3JkZXIgT2JzZXJ2YWJsZSksIGluXG4gKiBhIHNlcmlhbCBmYXNoaW9uLiBJdCBzdWJzY3JpYmVzIHRvIGVhY2ggaW5uZXIgT2JzZXJ2YWJsZSBvbmx5IGFmdGVyIHRoZVxuICogcHJldmlvdXMgaW5uZXIgT2JzZXJ2YWJsZSBoYXMgY29tcGxldGVkLCBhbmQgbWVyZ2VzIGFsbCBvZiB0aGVpciB2YWx1ZXMgaW50b1xuICogdGhlIHJldHVybmVkIG9ic2VydmFibGUuXG4gKlxuICogX19XYXJuaW5nOl9fIElmIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBlbWl0cyBPYnNlcnZhYmxlcyBxdWlja2x5IGFuZFxuICogZW5kbGVzc2x5LCBhbmQgdGhlIGlubmVyIE9ic2VydmFibGVzIGl0IGVtaXRzIGdlbmVyYWxseSBjb21wbGV0ZSBzbG93ZXIgdGhhblxuICogdGhlIHNvdXJjZSBlbWl0cywgeW91IGNhbiBydW4gaW50byBtZW1vcnkgaXNzdWVzIGFzIHRoZSBpbmNvbWluZyBPYnNlcnZhYmxlc1xuICogY29sbGVjdCBpbiBhbiB1bmJvdW5kZWQgYnVmZmVyLlxuICpcbiAqIE5vdGU6IGBjb25jYXRBbGxgIGlzIGVxdWl2YWxlbnQgdG8gYG1lcmdlQWxsYCB3aXRoIGNvbmN1cnJlbmN5IHBhcmFtZXRlciBzZXRcbiAqIHRvIGAxYC5cbiAqXG4gKiAjIyBFeGFtcGxlXG4gKlxuICogRm9yIGVhY2ggY2xpY2sgZXZlbnQsIHRpY2sgZXZlcnkgc2Vjb25kIGZyb20gMCB0byAzLCB3aXRoIG5vIGNvbmN1cnJlbmN5XG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBjb25zdCBjbGlja3MgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogY29uc3QgaGlnaGVyT3JkZXIgPSBjbGlja3MucGlwZShcbiAqICAgbWFwKGV2ID0+IGludGVydmFsKDEwMDApLnBpcGUodGFrZSg0KSkpLFxuICogKTtcbiAqIGNvbnN0IGZpcnN0T3JkZXIgPSBoaWdoZXJPcmRlci5waXBlKGNvbmNhdEFsbCgpKTtcbiAqIGZpcnN0T3JkZXIuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIC8vIFJlc3VsdHMgaW4gdGhlIGZvbGxvd2luZzpcbiAqIC8vIChyZXN1bHRzIGFyZSBub3QgY29uY3VycmVudClcbiAqIC8vIEZvciBldmVyeSBjbGljayBvbiB0aGUgXCJkb2N1bWVudFwiIGl0IHdpbGwgZW1pdCB2YWx1ZXMgMCB0byAzIHNwYWNlZFxuICogLy8gb24gYSAxMDAwbXMgaW50ZXJ2YWxcbiAqIC8vIG9uZSBjbGljayA9IDEwMDBtcy0+IDAgLTEwMDBtcy0+IDEgLTEwMDBtcy0+IDIgLTEwMDBtcy0+IDNcbiAqIGBgYFxuICpcbiAqIEBzZWUge0BsaW5rIGNvbWJpbmVBbGx9XG4gKiBAc2VlIHtAbGluayBjb25jYXR9XG4gKiBAc2VlIHtAbGluayBjb25jYXRNYXB9XG4gKiBAc2VlIHtAbGluayBjb25jYXRNYXBUb31cbiAqIEBzZWUge0BsaW5rIGV4aGF1c3R9XG4gKiBAc2VlIHtAbGluayBtZXJnZUFsbH1cbiAqIEBzZWUge0BsaW5rIHN3aXRjaEFsbH1cbiAqIEBzZWUge0BsaW5rIHN3aXRjaE1hcH1cbiAqIEBzZWUge0BsaW5rIHppcEFsbH1cbiAqXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIGVtaXR0aW5nIHZhbHVlcyBmcm9tIGFsbCB0aGUgaW5uZXJcbiAqIE9ic2VydmFibGVzIGNvbmNhdGVuYXRlZC5cbiAqIEBtZXRob2QgY29uY2F0QWxsXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29uY2F0QWxsPFQ+KCk6IE9wZXJhdG9yRnVuY3Rpb248T2JzZXJ2YWJsZUlucHV0PFQ+LCBUPiB7XG4gIHJldHVybiBtZXJnZUFsbDxUPigxKTtcbn1cbiJdfQ==