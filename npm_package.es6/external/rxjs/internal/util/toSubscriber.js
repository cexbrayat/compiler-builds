import { Subscriber } from '../Subscriber';
import { rxSubscriber as rxSubscriberSymbol } from '../symbol/rxSubscriber';
import { empty as emptyObserver } from '../Observer';
export function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriberSymbol]) {
            return nextOrObserver[rxSubscriberSymbol]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber(emptyObserver);
    }
    return new Subscriber(nextOrObserver, error, complete);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9TdWJzY3JpYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZXh0ZXJuYWwvcnhqcy9pbnRlcm5hbC91dGlsL3RvU3Vic2NyaWJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLElBQUksa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RSxPQUFPLEVBQUUsS0FBSyxJQUFJLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUdyRCxNQUFNLFVBQVUsWUFBWSxDQUMxQixjQUEwRCxFQUMxRCxLQUE0QixFQUM1QixRQUFxQjtJQUVyQixJQUFJLGNBQWMsRUFBRTtRQUNsQixJQUFJLGNBQWMsWUFBWSxVQUFVLEVBQUU7WUFDeEMsT0FBd0IsY0FBZSxDQUFDO1NBQ3pDO1FBRUQsSUFBSSxjQUFjLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUN0QyxPQUFPLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUM7U0FDN0M7S0FDRjtJQUVELElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDMUMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUN0QztJQUVELE9BQU8sSUFBSSxVQUFVLENBQUMsY0FBYyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN6RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgcnhTdWJzY3JpYmVyIGFzIHJ4U3Vic2NyaWJlclN5bWJvbCB9IGZyb20gJy4uL3N5bWJvbC9yeFN1YnNjcmliZXInO1xuaW1wb3J0IHsgZW1wdHkgYXMgZW1wdHlPYnNlcnZlciB9IGZyb20gJy4uL09ic2VydmVyJztcbmltcG9ydCB7IFBhcnRpYWxPYnNlcnZlciB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRvU3Vic2NyaWJlcjxUPihcbiAgbmV4dE9yT2JzZXJ2ZXI/OiBQYXJ0aWFsT2JzZXJ2ZXI8VD4gfCAoKHZhbHVlOiBUKSA9PiB2b2lkKSxcbiAgZXJyb3I/OiAoZXJyb3I6IGFueSkgPT4gdm9pZCxcbiAgY29tcGxldGU/OiAoKSA9PiB2b2lkKTogU3Vic2NyaWJlcjxUPiB7XG5cbiAgaWYgKG5leHRPck9ic2VydmVyKSB7XG4gICAgaWYgKG5leHRPck9ic2VydmVyIGluc3RhbmNlb2YgU3Vic2NyaWJlcikge1xuICAgICAgcmV0dXJuICg8U3Vic2NyaWJlcjxUPj4gbmV4dE9yT2JzZXJ2ZXIpO1xuICAgIH1cblxuICAgIGlmIChuZXh0T3JPYnNlcnZlcltyeFN1YnNjcmliZXJTeW1ib2xdKSB7XG4gICAgICByZXR1cm4gbmV4dE9yT2JzZXJ2ZXJbcnhTdWJzY3JpYmVyU3ltYm9sXSgpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghbmV4dE9yT2JzZXJ2ZXIgJiYgIWVycm9yICYmICFjb21wbGV0ZSkge1xuICAgIHJldHVybiBuZXcgU3Vic2NyaWJlcihlbXB0eU9ic2VydmVyKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgU3Vic2NyaWJlcihuZXh0T3JPYnNlcnZlciwgZXJyb3IsIGNvbXBsZXRlKTtcbn1cbiJdfQ==