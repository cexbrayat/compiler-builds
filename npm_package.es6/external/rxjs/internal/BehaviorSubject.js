import { Subject } from './Subject';
import { ObjectUnsubscribedError } from './util/ObjectUnsubscribedError';
export class BehaviorSubject extends Subject {
    constructor(_value) {
        super();
        this._value = _value;
    }
    get value() {
        return this.getValue();
    }
    _subscribe(subscriber) {
        const subscription = super._subscribe(subscriber);
        if (subscription && !subscription.closed) {
            subscriber.next(this._value);
        }
        return subscription;
    }
    getValue() {
        if (this.hasError) {
            throw this.thrownError;
        }
        else if (this.closed) {
            throw new ObjectUnsubscribedError();
        }
        else {
            return this._value;
        }
    }
    next(value) {
        super.next(this._value = value);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmVoYXZpb3JTdWJqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZXh0ZXJuYWwvcnhqcy9pbnRlcm5hbC9CZWhhdmlvclN1YmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUlwQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQVF6RSxNQUFNLE9BQU8sZUFBbUIsU0FBUSxPQUFVO0lBRWhELFlBQW9CLE1BQVM7UUFDM0IsS0FBSyxFQUFFLENBQUM7UUFEVSxXQUFNLEdBQU4sTUFBTSxDQUFHO0lBRTdCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBR0QsVUFBVSxDQUFDLFVBQXlCO1FBQ2xDLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEQsSUFBSSxZQUFZLElBQUksQ0FBb0IsWUFBYSxDQUFDLE1BQU0sRUFBRTtZQUM1RCxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM5QjtRQUNELE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUN4QjthQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN0QixNQUFNLElBQUksdUJBQXVCLEVBQUUsQ0FBQztTQUNyQzthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztJQUVELElBQUksQ0FBQyxLQUFRO1FBQ1gsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YmplY3QgfSBmcm9tICcuL1N1YmplY3QnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25MaWtlIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBPYmplY3RVbnN1YnNjcmliZWRFcnJvciB9IGZyb20gJy4vdXRpbC9PYmplY3RVbnN1YnNjcmliZWRFcnJvcic7XG5cbi8qKlxuICogQSB2YXJpYW50IG9mIFN1YmplY3QgdGhhdCByZXF1aXJlcyBhbiBpbml0aWFsIHZhbHVlIGFuZCBlbWl0cyBpdHMgY3VycmVudFxuICogdmFsdWUgd2hlbmV2ZXIgaXQgaXMgc3Vic2NyaWJlZCB0by5cbiAqXG4gKiBAY2xhc3MgQmVoYXZpb3JTdWJqZWN0PFQ+XG4gKi9cbmV4cG9ydCBjbGFzcyBCZWhhdmlvclN1YmplY3Q8VD4gZXh0ZW5kcyBTdWJqZWN0PFQ+IHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF92YWx1ZTogVCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBnZXQgdmFsdWUoKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIC8qKiBAZGVwcmVjYXRlZCBUaGlzIGlzIGFuIGludGVybmFsIGltcGxlbWVudGF0aW9uIGRldGFpbCwgZG8gbm90IHVzZS4gKi9cbiAgX3N1YnNjcmliZShzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+KTogU3Vic2NyaXB0aW9uIHtcbiAgICBjb25zdCBzdWJzY3JpcHRpb24gPSBzdXBlci5fc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIGlmIChzdWJzY3JpcHRpb24gJiYgISg8U3Vic2NyaXB0aW9uTGlrZT5zdWJzY3JpcHRpb24pLmNsb3NlZCkge1xuICAgICAgc3Vic2NyaWJlci5uZXh0KHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHN1YnNjcmlwdGlvbjtcbiAgfVxuXG4gIGdldFZhbHVlKCk6IFQge1xuICAgIGlmICh0aGlzLmhhc0Vycm9yKSB7XG4gICAgICB0aHJvdyB0aGlzLnRocm93bkVycm9yO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgIHRocm93IG5ldyBPYmplY3RVbnN1YnNjcmliZWRFcnJvcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIHN1cGVyLm5leHQodGhpcy5fdmFsdWUgPSB2YWx1ZSk7XG4gIH1cbn1cbiJdfQ==