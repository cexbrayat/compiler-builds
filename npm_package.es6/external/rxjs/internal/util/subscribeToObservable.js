import { observable as Symbol_observable } from '../symbol/observable';
export const subscribeToObservable = (obj) => (subscriber) => {
    const obs = obj[Symbol_observable]();
    if (typeof obs.subscribe !== 'function') {
        throw new TypeError('Provided object does not correctly implement Symbol.observable');
    }
    else {
        return obs.subscribe(subscriber);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaWJlVG9PYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZXh0ZXJuYWwvcnhqcy9pbnRlcm5hbC91dGlsL3N1YnNjcmliZVRvT2JzZXJ2YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsVUFBVSxJQUFJLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFPdkUsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsQ0FBSSxHQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsVUFBeUIsRUFBRSxFQUFFO0lBQ2xGLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUM7SUFDckMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxTQUFTLEtBQUssVUFBVSxFQUFFO1FBRXZDLE1BQU0sSUFBSSxTQUFTLENBQUMsZ0VBQWdFLENBQUMsQ0FBQztLQUN2RjtTQUFNO1FBQ0wsT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ2xDO0FBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgb2JzZXJ2YWJsZSBhcyBTeW1ib2xfb2JzZXJ2YWJsZSB9IGZyb20gJy4uL3N5bWJvbC9vYnNlcnZhYmxlJztcblxuLyoqXG4gKiBTdWJzY3JpYmVzIHRvIGFuIG9iamVjdCB0aGF0IGltcGxlbWVudHMgU3ltYm9sLm9ic2VydmFibGUgd2l0aCB0aGUgZ2l2ZW5cbiAqIFN1YnNjcmliZXIuXG4gKiBAcGFyYW0gb2JqIEFuIG9iamVjdCB0aGF0IGltcGxlbWVudHMgU3ltYm9sLm9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGNvbnN0IHN1YnNjcmliZVRvT2JzZXJ2YWJsZSA9IDxUPihvYmo6IGFueSkgPT4gKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4pID0+IHtcbiAgY29uc3Qgb2JzID0gb2JqW1N5bWJvbF9vYnNlcnZhYmxlXSgpO1xuICBpZiAodHlwZW9mIG9icy5zdWJzY3JpYmUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBTaG91bGQgYmUgY2F1Z2h0IGJ5IG9ic2VydmFibGUgc3Vic2NyaWJlIGZ1bmN0aW9uIGVycm9yIGhhbmRsaW5nLlxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb3ZpZGVkIG9iamVjdCBkb2VzIG5vdCBjb3JyZWN0bHkgaW1wbGVtZW50IFN5bWJvbC5vYnNlcnZhYmxlJyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9icy5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gIH1cbn07XG4iXX0=