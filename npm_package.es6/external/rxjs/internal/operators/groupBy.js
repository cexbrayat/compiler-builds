import { Subscriber } from '../Subscriber';
import { Subscription } from '../Subscription';
import { Observable } from '../Observable';
import { Subject } from '../Subject';
export function groupBy(keySelector, elementSelector, durationSelector, subjectSelector) {
    return (source) => source.lift(new GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector));
}
class GroupByOperator {
    constructor(keySelector, elementSelector, durationSelector, subjectSelector) {
        this.keySelector = keySelector;
        this.elementSelector = elementSelector;
        this.durationSelector = durationSelector;
        this.subjectSelector = subjectSelector;
    }
    call(subscriber, source) {
        return source.subscribe(new GroupBySubscriber(subscriber, this.keySelector, this.elementSelector, this.durationSelector, this.subjectSelector));
    }
}
class GroupBySubscriber extends Subscriber {
    constructor(destination, keySelector, elementSelector, durationSelector, subjectSelector) {
        super(destination);
        this.keySelector = keySelector;
        this.elementSelector = elementSelector;
        this.durationSelector = durationSelector;
        this.subjectSelector = subjectSelector;
        this.groups = null;
        this.attemptedToUnsubscribe = false;
        this.count = 0;
    }
    _next(value) {
        let key;
        try {
            key = this.keySelector(value);
        }
        catch (err) {
            this.error(err);
            return;
        }
        this._group(value, key);
    }
    _group(value, key) {
        let groups = this.groups;
        if (!groups) {
            groups = this.groups = new Map();
        }
        let group = groups.get(key);
        let element;
        if (this.elementSelector) {
            try {
                element = this.elementSelector(value);
            }
            catch (err) {
                this.error(err);
            }
        }
        else {
            element = value;
        }
        if (!group) {
            group = (this.subjectSelector ? this.subjectSelector() : new Subject());
            groups.set(key, group);
            const groupedObservable = new GroupedObservable(key, group, this);
            this.destination.next(groupedObservable);
            if (this.durationSelector) {
                let duration;
                try {
                    duration = this.durationSelector(new GroupedObservable(key, group));
                }
                catch (err) {
                    this.error(err);
                    return;
                }
                this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
            }
        }
        if (!group.closed) {
            group.next(element);
        }
    }
    _error(err) {
        const groups = this.groups;
        if (groups) {
            groups.forEach((group, key) => {
                group.error(err);
            });
            groups.clear();
        }
        this.destination.error(err);
    }
    _complete() {
        const groups = this.groups;
        if (groups) {
            groups.forEach((group, key) => {
                group.complete();
            });
            groups.clear();
        }
        this.destination.complete();
    }
    removeGroup(key) {
        this.groups.delete(key);
    }
    unsubscribe() {
        if (!this.closed) {
            this.attemptedToUnsubscribe = true;
            if (this.count === 0) {
                super.unsubscribe();
            }
        }
    }
}
class GroupDurationSubscriber extends Subscriber {
    constructor(key, group, parent) {
        super(group);
        this.key = key;
        this.group = group;
        this.parent = parent;
    }
    _next(value) {
        this.complete();
    }
    _unsubscribe() {
        const { parent, key } = this;
        this.key = this.parent = null;
        if (parent) {
            parent.removeGroup(key);
        }
    }
}
export class GroupedObservable extends Observable {
    constructor(key, groupSubject, refCountSubscription) {
        super();
        this.key = key;
        this.groupSubject = groupSubject;
        this.refCountSubscription = refCountSubscription;
    }
    _subscribe(subscriber) {
        const subscription = new Subscription();
        const { refCountSubscription, groupSubject } = this;
        if (refCountSubscription && !refCountSubscription.closed) {
            subscription.add(new InnerRefCountSubscription(refCountSubscription));
        }
        subscription.add(groupSubject.subscribe(subscriber));
        return subscription;
    }
}
class InnerRefCountSubscription extends Subscription {
    constructor(parent) {
        super();
        this.parent = parent;
        parent.count++;
    }
    unsubscribe() {
        const parent = this.parent;
        if (!parent.closed && !this.closed) {
            super.unsubscribe();
            parent.count -= 1;
            if (parent.count === 0 && parent.attemptedToUnsubscribe) {
                parent.unsubscribe();
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBCeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2V4dGVybmFsL3J4anMvaW50ZXJuYWwvb3BlcmF0b3JzL2dyb3VwQnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBbUdyQyxNQUFNLFVBQVUsT0FBTyxDQUFVLFdBQTRCLEVBQzVCLGVBQTBDLEVBQzFDLGdCQUF3RSxFQUN4RSxlQUFrQztJQUNqRSxPQUFPLENBQUMsTUFBcUIsRUFBRSxFQUFFLENBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsV0FBVyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDO0FBQ3RHLENBQUM7QUFTRCxNQUFNLGVBQWU7SUFDbkIsWUFBb0IsV0FBNEIsRUFDNUIsZUFBMEMsRUFDMUMsZ0JBQXdFLEVBQ3hFLGVBQWtDO1FBSGxDLGdCQUFXLEdBQVgsV0FBVyxDQUFpQjtRQUM1QixvQkFBZSxHQUFmLGVBQWUsQ0FBMkI7UUFDMUMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUF3RDtRQUN4RSxvQkFBZSxHQUFmLGVBQWUsQ0FBbUI7SUFDdEQsQ0FBQztJQUVELElBQUksQ0FBQyxVQUErQyxFQUFFLE1BQVc7UUFDL0QsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksaUJBQWlCLENBQzNDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxlQUFlLENBQ2hHLENBQUMsQ0FB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T0QsTUFBTSx5QkFBMEIsU0FBUSxZQUFZO0lBQ2xELFlBQW9CLE1BQTRCO1FBQzlDLEtBQUssRUFBRSxDQUFDO1FBRFUsV0FBTSxHQUFOLE1BQU0sQ0FBc0I7UUFFOUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxXQUFXO1FBQ1QsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDbEMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1lBQ2xCLElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLHNCQUFzQixFQUFFO2dCQUN2RCxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDdEI7U0FDRjtJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICcuLi9TdWJqZWN0JztcbmltcG9ydCB7IE9wZXJhdG9yRnVuY3Rpb24gfSBmcm9tICcuLi90eXBlcyc7XG5cbi8qIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdyb3VwQnk8VCwgSz4oa2V5U2VsZWN0b3I6ICh2YWx1ZTogVCkgPT4gSyk6IE9wZXJhdG9yRnVuY3Rpb248VCwgR3JvdXBlZE9ic2VydmFibGU8SywgVD4+O1xuZXhwb3J0IGZ1bmN0aW9uIGdyb3VwQnk8VCwgSz4oa2V5U2VsZWN0b3I6ICh2YWx1ZTogVCkgPT4gSywgZWxlbWVudFNlbGVjdG9yOiB2b2lkLCBkdXJhdGlvblNlbGVjdG9yOiAoZ3JvdXBlZDogR3JvdXBlZE9ic2VydmFibGU8SywgVD4pID0+IE9ic2VydmFibGU8YW55Pik6IE9wZXJhdG9yRnVuY3Rpb248VCwgR3JvdXBlZE9ic2VydmFibGU8SywgVD4+O1xuZXhwb3J0IGZ1bmN0aW9uIGdyb3VwQnk8VCwgSywgUj4oa2V5U2VsZWN0b3I6ICh2YWx1ZTogVCkgPT4gSywgZWxlbWVudFNlbGVjdG9yPzogKHZhbHVlOiBUKSA9PiBSLCBkdXJhdGlvblNlbGVjdG9yPzogKGdyb3VwZWQ6IEdyb3VwZWRPYnNlcnZhYmxlPEssIFI+KSA9PiBPYnNlcnZhYmxlPGFueT4pOiBPcGVyYXRvckZ1bmN0aW9uPFQsIEdyb3VwZWRPYnNlcnZhYmxlPEssIFI+PjtcbmV4cG9ydCBmdW5jdGlvbiBncm91cEJ5PFQsIEssIFI+KGtleVNlbGVjdG9yOiAodmFsdWU6IFQpID0+IEssIGVsZW1lbnRTZWxlY3Rvcj86ICh2YWx1ZTogVCkgPT4gUiwgZHVyYXRpb25TZWxlY3Rvcj86IChncm91cGVkOiBHcm91cGVkT2JzZXJ2YWJsZTxLLCBSPikgPT4gT2JzZXJ2YWJsZTxhbnk+LCBzdWJqZWN0U2VsZWN0b3I/OiAoKSA9PiBTdWJqZWN0PFI+KTogT3BlcmF0b3JGdW5jdGlvbjxULCBHcm91cGVkT2JzZXJ2YWJsZTxLLCBSPj47XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuXG4vKipcbiAqIEdyb3VwcyB0aGUgaXRlbXMgZW1pdHRlZCBieSBhbiBPYnNlcnZhYmxlIGFjY29yZGluZyB0byBhIHNwZWNpZmllZCBjcml0ZXJpb24sXG4gKiBhbmQgZW1pdHMgdGhlc2UgZ3JvdXBlZCBpdGVtcyBhcyBgR3JvdXBlZE9ic2VydmFibGVzYCwgb25lXG4gKiB7QGxpbmsgR3JvdXBlZE9ic2VydmFibGV9IHBlciBncm91cC5cbiAqXG4gKiAhW10oZ3JvdXBCeS5wbmcpXG4gKlxuICogV2hlbiB0aGUgT2JzZXJ2YWJsZSBlbWl0cyBhbiBpdGVtLCBhIGtleSBpcyBjb21wdXRlZCBmb3IgdGhpcyBpdGVtIHdpdGggdGhlIGtleVNlbGVjdG9yIGZ1bmN0aW9uLlxuICpcbiAqIElmIGEge0BsaW5rIEdyb3VwZWRPYnNlcnZhYmxlfSBmb3IgdGhpcyBrZXkgZXhpc3RzLCB0aGlzIHtAbGluayBHcm91cGVkT2JzZXJ2YWJsZX0gZW1pdHMuIEVsc2V3aGVyZSwgYSBuZXdcbiAqIHtAbGluayBHcm91cGVkT2JzZXJ2YWJsZX0gZm9yIHRoaXMga2V5IGlzIGNyZWF0ZWQgYW5kIGVtaXRzLlxuICpcbiAqIEEge0BsaW5rIEdyb3VwZWRPYnNlcnZhYmxlfSByZXByZXNlbnRzIHZhbHVlcyBiZWxvbmdpbmcgdG8gdGhlIHNhbWUgZ3JvdXAgcmVwcmVzZW50ZWQgYnkgYSBjb21tb24ga2V5LiBUaGUgY29tbW9uXG4gKiBrZXkgaXMgYXZhaWxhYmxlIGFzIHRoZSBrZXkgZmllbGQgb2YgYSB7QGxpbmsgR3JvdXBlZE9ic2VydmFibGV9IGluc3RhbmNlLlxuICpcbiAqIFRoZSBlbGVtZW50cyBlbWl0dGVkIGJ5IHtAbGluayBHcm91cGVkT2JzZXJ2YWJsZX1zIGFyZSBieSBkZWZhdWx0IHRoZSBpdGVtcyBlbWl0dGVkIGJ5IHRoZSBPYnNlcnZhYmxlLCBvciBlbGVtZW50c1xuICogcmV0dXJuZWQgYnkgdGhlIGVsZW1lbnRTZWxlY3RvciBmdW5jdGlvbi5cbiAqXG4gKiAjIyBFeGFtcGxlc1xuICogIyMjIEdyb3VwIG9iamVjdHMgYnkgaWQgYW5kIHJldHVybiBhcyBhcnJheVxuICogYGBgamF2YXNjcmlwdFxuICogaW1wb3J0IHsgbWVyZ2VNYXAsIGdyb3VwQnkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG4gKiBpbXBvcnQgeyBvZiB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9vZic7XG4gKlxuICogaW50ZXJmYWNlIE9iaiB7XG4gKiAgICBpZDogbnVtYmVyLFxuICogICAgbmFtZTogc3RyaW5nLFxuICogfVxuICpcbiAqIG9mPE9iaj4oXG4gKiAgIHtpZDogMSwgbmFtZTogJ2phdmFzY3JpcHQnfSxcbiAqICAge2lkOiAyLCBuYW1lOiAncGFyY2VsJ30sXG4gKiAgIHtpZDogMiwgbmFtZTogJ3dlYnBhY2snfSxcbiAqICAge2lkOiAxLCBuYW1lOiAndHlwZXNjcmlwdCd9LFxuICogICB7aWQ6IDMsIG5hbWU6ICd0c2xpbnQnfVxuICogKS5waXBlKFxuICogICBncm91cEJ5KHAgPT4gcC5pZCksXG4gKiAgIG1lcmdlTWFwKChncm91cCQpID0+IGdyb3VwJC5waXBlKHJlZHVjZSgoYWNjLCBjdXIpID0+IFsuLi5hY2MsIGN1cl0sIFtdKSkpLFxuICogKVxuICogLnN1YnNjcmliZShwID0+IGNvbnNvbGUubG9nKHApKTtcbiAqXG4gKiAvLyBkaXNwbGF5czpcbiAqIC8vIFsgeyBpZDogMSwgbmFtZTogJ2phdmFzY3JpcHQnfSxcbiAqIC8vICAgeyBpZDogMSwgbmFtZTogJ3R5cGVzY3JpcHQnfSBdXG4gKiAvL1xuICogLy8gWyB7IGlkOiAyLCBuYW1lOiAncGFyY2VsJ30sXG4gKiAvLyAgIHsgaWQ6IDIsIG5hbWU6ICd3ZWJwYWNrJ30gXVxuICogLy9cbiAqIC8vIFsgeyBpZDogMywgbmFtZTogJ3RzbGludCd9IF1cbiAqIGBgYFxuICpcbiAqICMjIyBQaXZvdCBkYXRhIG9uIHRoZSBpZCBmaWVsZFxuICogYGBgamF2YXNjcmlwdFxuICogaW1wb3J0IHsgbWVyZ2VNYXAsIGdyb3VwQnksIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbiAqIGltcG9ydCB7IG9mIH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL29mJztcbiAqXG4gKiBvZjxPYmo+KFxuICogICB7aWQ6IDEsIG5hbWU6ICdqYXZhc2NyaXB0J30sXG4gKiAgIHtpZDogMiwgbmFtZTogJ3BhcmNlbCd9LFxuICogICB7aWQ6IDIsIG5hbWU6ICd3ZWJwYWNrJ30sXG4gKiAgIHtpZDogMSwgbmFtZTogJ3R5cGVzY3JpcHQnfVxuICogICB7aWQ6IDMsIG5hbWU6ICd0c2xpbnQnfVxuICogKS5waXBlKFxuICogICBncm91cEJ5KHAgPT4gcC5pZCwgcCA9PiBwLm5hbWUpLFxuICogICBtZXJnZU1hcCggKGdyb3VwJCkgPT4gZ3JvdXAkLnBpcGUocmVkdWNlKChhY2MsIGN1cikgPT4gWy4uLmFjYywgY3VyXSwgW1wiXCIgKyBncm91cCQua2V5XSkpKSxcbiAqICAgbWFwKGFyciA9PiAoeydpZCc6IHBhcnNlSW50KGFyclswXSksICd2YWx1ZXMnOiBhcnIuc2xpY2UoMSl9KSksXG4gKiApXG4gKiAuc3Vic2NyaWJlKHAgPT4gY29uc29sZS5sb2cocCkpO1xuICpcbiAqIC8vIGRpc3BsYXlzOlxuICogLy8geyBpZDogMSwgdmFsdWVzOiBbICdqYXZhc2NyaXB0JywgJ3R5cGVzY3JpcHQnIF0gfVxuICogLy8geyBpZDogMiwgdmFsdWVzOiBbICdwYXJjZWwnLCAnd2VicGFjaycgXSB9XG4gKiAvLyB7IGlkOiAzLCB2YWx1ZXM6IFsgJ3RzbGludCcgXSB9XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBUKTogS30ga2V5U2VsZWN0b3IgQSBmdW5jdGlvbiB0aGF0IGV4dHJhY3RzIHRoZSBrZXlcbiAqIGZvciBlYWNoIGl0ZW0uXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKHZhbHVlOiBUKTogUn0gW2VsZW1lbnRTZWxlY3Rvcl0gQSBmdW5jdGlvbiB0aGF0IGV4dHJhY3RzIHRoZVxuICogcmV0dXJuIGVsZW1lbnQgZm9yIGVhY2ggaXRlbS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oZ3JvdXBlZDogR3JvdXBlZE9ic2VydmFibGU8SyxSPik6IE9ic2VydmFibGU8YW55Pn0gW2R1cmF0aW9uU2VsZWN0b3JdXG4gKiBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBPYnNlcnZhYmxlIHRvIGRldGVybWluZSBob3cgbG9uZyBlYWNoIGdyb3VwIHNob3VsZFxuICogZXhpc3QuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPEdyb3VwZWRPYnNlcnZhYmxlPEssUj4+fSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHNcbiAqIEdyb3VwZWRPYnNlcnZhYmxlcywgZWFjaCBvZiB3aGljaCBjb3JyZXNwb25kcyB0byBhIHVuaXF1ZSBrZXkgdmFsdWUgYW5kIGVhY2hcbiAqIG9mIHdoaWNoIGVtaXRzIHRob3NlIGl0ZW1zIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHRoYXQgc2hhcmUgdGhhdCBrZXlcbiAqIHZhbHVlLlxuICogQG1ldGhvZCBncm91cEJ5XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ3JvdXBCeTxULCBLLCBSPihrZXlTZWxlY3RvcjogKHZhbHVlOiBUKSA9PiBLLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudFNlbGVjdG9yPzogKCh2YWx1ZTogVCkgPT4gUikgfCB2b2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb25TZWxlY3Rvcj86IChncm91cGVkOiBHcm91cGVkT2JzZXJ2YWJsZTxLLCBSPikgPT4gT2JzZXJ2YWJsZTxhbnk+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdFNlbGVjdG9yPzogKCkgPT4gU3ViamVjdDxSPik6IE9wZXJhdG9yRnVuY3Rpb248VCwgR3JvdXBlZE9ic2VydmFibGU8SywgUj4+IHtcbiAgcmV0dXJuIChzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+XG4gICAgc291cmNlLmxpZnQobmV3IEdyb3VwQnlPcGVyYXRvcihrZXlTZWxlY3RvciwgZWxlbWVudFNlbGVjdG9yLCBkdXJhdGlvblNlbGVjdG9yLCBzdWJqZWN0U2VsZWN0b3IpKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWZDb3VudFN1YnNjcmlwdGlvbiB7XG4gIGNvdW50OiBudW1iZXI7XG4gIHVuc3Vic2NyaWJlOiAoKSA9PiB2b2lkO1xuICBjbG9zZWQ6IGJvb2xlYW47XG4gIGF0dGVtcHRlZFRvVW5zdWJzY3JpYmU6IGJvb2xlYW47XG59XG5cbmNsYXNzIEdyb3VwQnlPcGVyYXRvcjxULCBLLCBSPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIEdyb3VwZWRPYnNlcnZhYmxlPEssIFI+PiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUga2V5U2VsZWN0b3I6ICh2YWx1ZTogVCkgPT4gSyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlbGVtZW50U2VsZWN0b3I/OiAoKHZhbHVlOiBUKSA9PiBSKSB8IHZvaWQsXG4gICAgICAgICAgICAgIHByaXZhdGUgZHVyYXRpb25TZWxlY3Rvcj86IChncm91cGVkOiBHcm91cGVkT2JzZXJ2YWJsZTxLLCBSPikgPT4gT2JzZXJ2YWJsZTxhbnk+LFxuICAgICAgICAgICAgICBwcml2YXRlIHN1YmplY3RTZWxlY3Rvcj86ICgpID0+IFN1YmplY3Q8Uj4pIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxHcm91cGVkT2JzZXJ2YWJsZTxLLCBSPj4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgR3JvdXBCeVN1YnNjcmliZXIoXG4gICAgICBzdWJzY3JpYmVyLCB0aGlzLmtleVNlbGVjdG9yLCB0aGlzLmVsZW1lbnRTZWxlY3RvciwgdGhpcy5kdXJhdGlvblNlbGVjdG9yLCB0aGlzLnN1YmplY3RTZWxlY3RvclxuICAgICkpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBHcm91cEJ5U3Vic2NyaWJlcjxULCBLLCBSPiBleHRlbmRzIFN1YnNjcmliZXI8VD4gaW1wbGVtZW50cyBSZWZDb3VudFN1YnNjcmlwdGlvbiB7XG4gIHByaXZhdGUgZ3JvdXBzOiBNYXA8SywgU3ViamVjdDxUIHwgUj4+ID0gbnVsbDtcbiAgcHVibGljIGF0dGVtcHRlZFRvVW5zdWJzY3JpYmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGNvdW50OiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPEdyb3VwZWRPYnNlcnZhYmxlPEssIFI+PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBrZXlTZWxlY3RvcjogKHZhbHVlOiBUKSA9PiBLLFxuICAgICAgICAgICAgICBwcml2YXRlIGVsZW1lbnRTZWxlY3Rvcj86ICgodmFsdWU6IFQpID0+IFIpIHwgdm9pZCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBkdXJhdGlvblNlbGVjdG9yPzogKGdyb3VwZWQ6IEdyb3VwZWRPYnNlcnZhYmxlPEssIFI+KSA9PiBPYnNlcnZhYmxlPGFueT4sXG4gICAgICAgICAgICAgIHByaXZhdGUgc3ViamVjdFNlbGVjdG9yPzogKCkgPT4gU3ViamVjdDxSPikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGxldCBrZXk6IEs7XG4gICAgdHJ5IHtcbiAgICAgIGtleSA9IHRoaXMua2V5U2VsZWN0b3IodmFsdWUpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5lcnJvcihlcnIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2dyb3VwKHZhbHVlLCBrZXkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ3JvdXAodmFsdWU6IFQsIGtleTogSykge1xuICAgIGxldCBncm91cHMgPSB0aGlzLmdyb3VwcztcblxuICAgIGlmICghZ3JvdXBzKSB7XG4gICAgICBncm91cHMgPSB0aGlzLmdyb3VwcyA9IG5ldyBNYXA8SywgU3ViamVjdDxUIHwgUj4+KCk7XG4gICAgfVxuXG4gICAgbGV0IGdyb3VwID0gZ3JvdXBzLmdldChrZXkpO1xuXG4gICAgbGV0IGVsZW1lbnQ6IFI7XG4gICAgaWYgKHRoaXMuZWxlbWVudFNlbGVjdG9yKSB7XG4gICAgICB0cnkge1xuICAgICAgICBlbGVtZW50ID0gdGhpcy5lbGVtZW50U2VsZWN0b3IodmFsdWUpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHRoaXMuZXJyb3IoZXJyKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudCA9IDxhbnk+dmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKCFncm91cCkge1xuICAgICAgZ3JvdXAgPSAodGhpcy5zdWJqZWN0U2VsZWN0b3IgPyB0aGlzLnN1YmplY3RTZWxlY3RvcigpIDogbmV3IFN1YmplY3Q8Uj4oKSkgYXMgU3ViamVjdDxUIHwgUj47XG4gICAgICBncm91cHMuc2V0KGtleSwgZ3JvdXApO1xuICAgICAgY29uc3QgZ3JvdXBlZE9ic2VydmFibGUgPSBuZXcgR3JvdXBlZE9ic2VydmFibGUoa2V5LCBncm91cCwgdGhpcyk7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQoZ3JvdXBlZE9ic2VydmFibGUpO1xuICAgICAgaWYgKHRoaXMuZHVyYXRpb25TZWxlY3Rvcikge1xuICAgICAgICBsZXQgZHVyYXRpb246IGFueTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkdXJhdGlvbiA9IHRoaXMuZHVyYXRpb25TZWxlY3RvcihuZXcgR3JvdXBlZE9ic2VydmFibGU8SywgUj4oa2V5LCA8U3ViamVjdDxSPj5ncm91cCkpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICB0aGlzLmVycm9yKGVycik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWRkKGR1cmF0aW9uLnN1YnNjcmliZShuZXcgR3JvdXBEdXJhdGlvblN1YnNjcmliZXIoa2V5LCBncm91cCwgdGhpcykpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWdyb3VwLmNsb3NlZCkge1xuICAgICAgZ3JvdXAubmV4dChlbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX2Vycm9yKGVycjogYW55KTogdm9pZCB7XG4gICAgY29uc3QgZ3JvdXBzID0gdGhpcy5ncm91cHM7XG4gICAgaWYgKGdyb3Vwcykge1xuICAgICAgZ3JvdXBzLmZvckVhY2goKGdyb3VwLCBrZXkpID0+IHtcbiAgICAgICAgZ3JvdXAuZXJyb3IoZXJyKTtcbiAgICAgIH0pO1xuXG4gICAgICBncm91cHMuY2xlYXIoKTtcbiAgICB9XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBncm91cHMgPSB0aGlzLmdyb3VwcztcbiAgICBpZiAoZ3JvdXBzKSB7XG4gICAgICBncm91cHMuZm9yRWFjaCgoZ3JvdXAsIGtleSkgPT4ge1xuICAgICAgICBncm91cC5jb21wbGV0ZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIGdyb3Vwcy5jbGVhcigpO1xuICAgIH1cbiAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gIH1cblxuICByZW1vdmVHcm91cChrZXk6IEspOiB2b2lkIHtcbiAgICB0aGlzLmdyb3Vwcy5kZWxldGUoa2V5KTtcbiAgfVxuXG4gIHVuc3Vic2NyaWJlKCkge1xuICAgIGlmICghdGhpcy5jbG9zZWQpIHtcbiAgICAgIHRoaXMuYXR0ZW1wdGVkVG9VbnN1YnNjcmliZSA9IHRydWU7XG4gICAgICBpZiAodGhpcy5jb3VudCA9PT0gMCkge1xuICAgICAgICBzdXBlci51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgR3JvdXBEdXJhdGlvblN1YnNjcmliZXI8SywgVD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBrZXk6IEssXG4gICAgICAgICAgICAgIHByaXZhdGUgZ3JvdXA6IFN1YmplY3Q8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgcGFyZW50OiBHcm91cEJ5U3Vic2NyaWJlcjxhbnksIEssIFQgfCBhbnk+KSB7XG4gICAgc3VwZXIoZ3JvdXApO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgdGhpcy5jb21wbGV0ZSgpO1xuICB9XG5cbiAgLyoqIEBkZXByZWNhdGVkIFRoaXMgaXMgYW4gaW50ZXJuYWwgaW1wbGVtZW50YXRpb24gZGV0YWlsLCBkbyBub3QgdXNlLiAqL1xuICBfdW5zdWJzY3JpYmUoKSB7XG4gICAgY29uc3QgeyBwYXJlbnQsIGtleSB9ID0gdGhpcztcbiAgICB0aGlzLmtleSA9IHRoaXMucGFyZW50ID0gbnVsbDtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBwYXJlbnQucmVtb3ZlR3JvdXAoa2V5KTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBbiBPYnNlcnZhYmxlIHJlcHJlc2VudGluZyB2YWx1ZXMgYmVsb25naW5nIHRvIHRoZSBzYW1lIGdyb3VwIHJlcHJlc2VudGVkIGJ5XG4gKiBhIGNvbW1vbiBrZXkuIFRoZSB2YWx1ZXMgZW1pdHRlZCBieSBhIEdyb3VwZWRPYnNlcnZhYmxlIGNvbWUgZnJvbSB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlLiBUaGUgY29tbW9uIGtleSBpcyBhdmFpbGFibGUgYXMgdGhlIGZpZWxkIGBrZXlgIG9uIGFcbiAqIEdyb3VwZWRPYnNlcnZhYmxlIGluc3RhbmNlLlxuICpcbiAqIEBjbGFzcyBHcm91cGVkT2JzZXJ2YWJsZTxLLCBUPlxuICovXG5leHBvcnQgY2xhc3MgR3JvdXBlZE9ic2VydmFibGU8SywgVD4gZXh0ZW5kcyBPYnNlcnZhYmxlPFQ+IHtcbiAgLyoqIEBkZXByZWNhdGVkIERvIG5vdCBjb25zdHJ1Y3QgdGhpcyB0eXBlLiBJbnRlcm5hbCB1c2Ugb25seSAqL1xuICBjb25zdHJ1Y3RvcihwdWJsaWMga2V5OiBLLFxuICAgICAgICAgICAgICBwcml2YXRlIGdyb3VwU3ViamVjdDogU3ViamVjdDxUPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZWZDb3VudFN1YnNjcmlwdGlvbj86IFJlZkNvdW50U3Vic2NyaXB0aW9uKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8qKiBAZGVwcmVjYXRlZCBUaGlzIGlzIGFuIGludGVybmFsIGltcGxlbWVudGF0aW9uIGRldGFpbCwgZG8gbm90IHVzZS4gKi9cbiAgX3N1YnNjcmliZShzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+KSB7XG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgIGNvbnN0IHsgcmVmQ291bnRTdWJzY3JpcHRpb24sIGdyb3VwU3ViamVjdCB9ID0gdGhpcztcbiAgICBpZiAocmVmQ291bnRTdWJzY3JpcHRpb24gJiYgIXJlZkNvdW50U3Vic2NyaXB0aW9uLmNsb3NlZCkge1xuICAgICAgc3Vic2NyaXB0aW9uLmFkZChuZXcgSW5uZXJSZWZDb3VudFN1YnNjcmlwdGlvbihyZWZDb3VudFN1YnNjcmlwdGlvbikpO1xuICAgIH1cbiAgICBzdWJzY3JpcHRpb24uYWRkKGdyb3VwU3ViamVjdC5zdWJzY3JpYmUoc3Vic2NyaWJlcikpO1xuICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIElubmVyUmVmQ291bnRTdWJzY3JpcHRpb24gZXh0ZW5kcyBTdWJzY3JpcHRpb24ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhcmVudDogUmVmQ291bnRTdWJzY3JpcHRpb24pIHtcbiAgICBzdXBlcigpO1xuICAgIHBhcmVudC5jb3VudCsrO1xuICB9XG5cbiAgdW5zdWJzY3JpYmUoKSB7XG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnQ7XG4gICAgaWYgKCFwYXJlbnQuY2xvc2VkICYmICF0aGlzLmNsb3NlZCkge1xuICAgICAgc3VwZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgIHBhcmVudC5jb3VudCAtPSAxO1xuICAgICAgaWYgKHBhcmVudC5jb3VudCA9PT0gMCAmJiBwYXJlbnQuYXR0ZW1wdGVkVG9VbnN1YnNjcmliZSkge1xuICAgICAgICBwYXJlbnQudW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==