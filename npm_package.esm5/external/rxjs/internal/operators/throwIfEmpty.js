import { tap } from './tap';
import { EmptyError } from '../util/EmptyError';
export var throwIfEmpty = function (errorFactory) {
    if (errorFactory === void 0) { errorFactory = defaultErrorFactory; }
    return tap({
        hasValue: false,
        next: function () { this.hasValue = true; },
        complete: function () {
            if (!this.hasValue) {
                throw errorFactory();
            }
        }
    });
};
function defaultErrorFactory() {
    return new EmptyError();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyb3dJZkVtcHR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZXh0ZXJuYWwvcnhqcy9pbnRlcm5hbC9vcGVyYXRvcnMvdGhyb3dJZkVtcHR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDNUIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBOEJoRCxNQUFNLENBQUMsSUFBTSxZQUFZLEdBQ3ZCLFVBQUksWUFBK0M7SUFBL0MsNkJBQUEsRUFBQSxrQ0FBK0M7SUFBSyxPQUFBLEdBQUcsQ0FBSTtRQUM3RCxRQUFRLEVBQUUsS0FBSztRQUNmLElBQUksZ0JBQUssSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLFFBQVE7WUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDbEIsTUFBTSxZQUFZLEVBQUUsQ0FBQzthQUN0QjtRQUNILENBQUM7S0FDSyxDQUFDO0FBUitDLENBUS9DLENBQUM7QUFFWixTQUFTLG1CQUFtQjtJQUMxQixPQUFPLElBQUksVUFBVSxFQUFFLENBQUM7QUFDMUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRhcCB9IGZyb20gJy4vdGFwJztcbmltcG9ydCB7IEVtcHR5RXJyb3IgfSBmcm9tICcuLi91dGlsL0VtcHR5RXJyb3InO1xuaW1wb3J0IHsgTW9ub1R5cGVPcGVyYXRvckZ1bmN0aW9uIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vKipcbiAqIElmIHRoZSBzb3VyY2Ugb2JzZXJ2YWJsZSBjb21wbGV0ZXMgd2l0aG91dCBlbWl0dGluZyBhIHZhbHVlLCBpdCB3aWxsIGVtaXRcbiAqIGFuIGVycm9yLiBUaGUgZXJyb3Igd2lsbCBiZSBjcmVhdGVkIGF0IHRoYXQgdGltZSBieSB0aGUgb3B0aW9uYWxcbiAqIGBlcnJvckZhY3RvcnlgIGFyZ3VtZW50LCBvdGhlcndpc2UsIHRoZSBlcnJvciB3aWxsIGJlIHtAbGluayBFbXB0eUVycm9yfS5cbiAqXG4gKiAhW10odGhyb3dJZkVtcHR5LnBuZylcbiAqXG4gKiAjIyBFeGFtcGxlXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBjb25zdCBjbGljayQgPSBmcm9tRXZlbnQoYnV0dG9uLCAnY2xpY2snKTtcbiAqXG4gKiBjbGlja3MkLnBpcGUoXG4gKiAgIHRha2VVbnRpbCh0aW1lcigxMDAwKSksXG4gKiAgIHRocm93SWZFbXB0eShcbiAqICAgICAoKSA9PiBuZXcgRXJyb3IoJ3RoZSBidXR0b24gd2FzIG5vdCBjbGlja2VkIHdpdGhpbiAxIHNlY29uZCcpXG4gKiAgICksXG4gKiApXG4gKiAuc3Vic2NyaWJlKHtcbiAqICAgbmV4dCgpIHsgY29uc29sZS5sb2coJ1RoZSBidXR0b24gd2FzIGNsaWNrZWQnKTsgfSxcbiAqICAgZXJyb3IoZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgfSxcbiAqIH0pO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2Vycm9yRmFjdG9yeV0gQSBmYWN0b3J5IGZ1bmN0aW9uIGNhbGxlZCB0byBwcm9kdWNlIHRoZVxuICogZXJyb3IgdG8gYmUgdGhyb3duIHdoZW4gdGhlIHNvdXJjZSBvYnNlcnZhYmxlIGNvbXBsZXRlcyB3aXRob3V0IGVtaXR0aW5nIGFcbiAqIHZhbHVlLlxuICovXG5leHBvcnQgY29uc3QgdGhyb3dJZkVtcHR5ID1cbiAgPFQ+KGVycm9yRmFjdG9yeTogKCgpID0+IGFueSkgPSBkZWZhdWx0RXJyb3JGYWN0b3J5KSA9PiB0YXA8VD4oe1xuICAgIGhhc1ZhbHVlOiBmYWxzZSxcbiAgICBuZXh0KCkgeyB0aGlzLmhhc1ZhbHVlID0gdHJ1ZTsgfSxcbiAgICBjb21wbGV0ZSgpIHtcbiAgICAgIGlmICghdGhpcy5oYXNWYWx1ZSkge1xuICAgICAgICB0aHJvdyBlcnJvckZhY3RvcnkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gYXMgYW55KTtcblxuZnVuY3Rpb24gZGVmYXVsdEVycm9yRmFjdG9yeSgpIHtcbiAgcmV0dXJuIG5ldyBFbXB0eUVycm9yKCk7XG59XG4iXX0=