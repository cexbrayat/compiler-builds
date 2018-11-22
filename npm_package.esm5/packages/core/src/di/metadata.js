/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { makeParamDecorator } from '../util/decorators';
/**
 * Inject decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export var Inject = makeParamDecorator('Inject', function (token) { return ({ token: token }); });
/**
 * Optional decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export var Optional = makeParamDecorator('Optional');
/**
 * Self decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export var Self = makeParamDecorator('Self');
/**
 * SkipSelf decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export var SkipSelf = makeParamDecorator('SkipSelf');
/**
 * Host decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export var Host = makeParamDecorator('Host');

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9kaS9tZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFLSCxPQUFPLEVBQWdCLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUEyQ3JFOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLElBQU0sTUFBTSxHQUFvQixrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsVUFBQyxLQUFVLElBQUssT0FBQSxDQUFDLEVBQUMsS0FBSyxPQUFBLEVBQUMsQ0FBQyxFQUFULENBQVMsQ0FBQyxDQUFDO0FBOEIvRjs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxJQUFNLFFBQVEsR0FBc0Isa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7QUFpQzFFOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLElBQU0sSUFBSSxHQUFrQixrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQWlDOUQ7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsSUFBTSxRQUFRLEdBQXNCLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBOEIxRTs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxJQUFNLElBQUksR0FBa0Isa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q2xhc3NTYW5zUHJvdmlkZXIsIENvbnN0cnVjdG9yUHJvdmlkZXIsIENvbnN0cnVjdG9yU2Fuc1Byb3ZpZGVyLCBFeGlzdGluZ1Byb3ZpZGVyLCBFeGlzdGluZ1NhbnNQcm92aWRlciwgRmFjdG9yeVByb3ZpZGVyLCBGYWN0b3J5U2Fuc1Byb3ZpZGVyLCBTdGF0aWNDbGFzc1Byb3ZpZGVyLCBTdGF0aWNDbGFzc1NhbnNQcm92aWRlciwgVmFsdWVQcm92aWRlciwgVmFsdWVTYW5zUHJvdmlkZXJ9IGZyb20gJy4uL2RpL3Byb3ZpZGVyJztcbmltcG9ydCB7UmVmbGVjdGlvbkNhcGFiaWxpdGllc30gZnJvbSAnLi4vcmVmbGVjdGlvbi9yZWZsZWN0aW9uX2NhcGFiaWxpdGllcyc7XG5pbXBvcnQge1R5cGV9IGZyb20gJy4uL3R5cGUnO1xuaW1wb3J0IHttYWtlRGVjb3JhdG9yLCBtYWtlUGFyYW1EZWNvcmF0b3J9IGZyb20gJy4uL3V0aWwvZGVjb3JhdG9ycyc7XG5pbXBvcnQge0VNUFRZX0FSUkFZfSBmcm9tICcuLi92aWV3L3V0aWwnO1xuXG5cbi8qKlxuICogVHlwZSBvZiB0aGUgSW5qZWN0IGRlY29yYXRvciAvIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbmplY3REZWNvcmF0b3Ige1xuICAvKipcbiAgICogQSBjb25zdHJ1Y3RvciBwYXJhbWV0ZXIgZGVjb3JhdG9yIHRoYXQgc3BlY2lmaWVzIGFcbiAgICogY3VzdG9tIHByb3ZpZGVyIG9mIGEgZGVwZW5kZW5jeS5cbiAgICpcbiAgICogQHNlZSBbXCJEZXBlbmRlbmN5IEluamVjdGlvbiBHdWlkZVwiXShndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbikuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSBzaG93cyBhIGNsYXNzIGNvbnN0cnVjdG9yIHRoYXQgc3BlY2lmaWVzIGFcbiAgICogY3VzdG9tIHByb3ZpZGVyIG9mIGEgZGVwZW5kZW5jeSB1c2luZyB0aGUgcGFyYW1ldGVyIGRlY29yYXRvci5cbiAgICpcbiAgICoge0BleGFtcGxlIGNvcmUvZGkvdHMvbWV0YWRhdGFfc3BlYy50cyByZWdpb249J0luamVjdCd9XG4gICAqXG4gICAqIFdoZW4gYEBJbmplY3QoKWAgaXMgbm90IHByZXNlbnQsIHRoZSBgSW5qZWN0b3JgIHVzZXMgdGhlIHR5cGUgYW5ub3RhdGlvbiBvZiB0aGVcbiAgICogcGFyYW1ldGVyIGFzIHRoZSBwcm92aWRlci5cbiAgICpcbiAgICoge0BleGFtcGxlIGNvcmUvZGkvdHMvbWV0YWRhdGFfc3BlYy50cyByZWdpb249J0luamVjdFdpdGhvdXREZWNvcmF0b3InfVxuICAgKi9cbiAgKHRva2VuOiBhbnkpOiBhbnk7XG4gIG5ldyAodG9rZW46IGFueSk6IEluamVjdDtcbn1cblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBJbmplY3QgbWV0YWRhdGEuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEluamVjdCB7XG4gIC8qKlxuICAgKiBJbmplY3RvciB0b2tlbiB0aGF0IG1hcHMgdG8gdGhlIGRlcGVuZGVuY3kgdG8gYmUgaW5qZWN0ZWQuXG4gICAqL1xuICB0b2tlbjogYW55O1xufVxuXG4vKipcbiAqIEluamVjdCBkZWNvcmF0b3IgYW5kIG1ldGFkYXRhLlxuICpcbiAqIEBBbm5vdGF0aW9uXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBJbmplY3Q6IEluamVjdERlY29yYXRvciA9IG1ha2VQYXJhbURlY29yYXRvcignSW5qZWN0JywgKHRva2VuOiBhbnkpID0+ICh7dG9rZW59KSk7XG5cblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBPcHRpb25hbCBkZWNvcmF0b3IgLyBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uYWxEZWNvcmF0b3Ige1xuICAvKipcbiAgICogQSBjb25zdHJ1Y3RvciBwYXJhbWV0ZXIgZGVjb3JhdG9yIHRoYXQgbWFya3MgYSBkZXBlbmRlbmN5IGFzIG9wdGlvbmFsLlxuICAgKlxuICAgKiBUaGUgREkgZnJhbWV3b3JrIHByb3ZpZGVzIG51bGwgaWYgdGhlIGRlcGVuZGVuY3kgaXMgbm90IGZvdW5kLlxuICAgKiBGb3IgZXhhbXBsZSwgdGhlIGZvbGxvd2luZyBjb2RlIGFsbG93cyB0aGUgcG9zc2liaWxpdHkgb2YgYSBudWxsIHJlc3VsdDpcbiAgICpcbiAgICoge0BleGFtcGxlIGNvcmUvZGkvdHMvbWV0YWRhdGFfc3BlYy50cyByZWdpb249J09wdGlvbmFsJ31cbiAgICpcbiAgICogQHNlZSBbXCJEZXBlbmRlbmN5IEluamVjdGlvbiBHdWlkZVwiXShndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbikuXG4gICAqL1xuICAoKTogYW55O1xuICBuZXcgKCk6IE9wdGlvbmFsO1xufVxuXG4vKipcbiAqIFR5cGUgb2YgdGhlIE9wdGlvbmFsIG1ldGFkYXRhLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBPcHRpb25hbCB7fVxuXG4vKipcbiAqIE9wdGlvbmFsIGRlY29yYXRvciBhbmQgbWV0YWRhdGEuXG4gKlxuICogQEFubm90YXRpb25cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IE9wdGlvbmFsOiBPcHRpb25hbERlY29yYXRvciA9IG1ha2VQYXJhbURlY29yYXRvcignT3B0aW9uYWwnKTtcblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBTZWxmIGRlY29yYXRvciAvIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTZWxmRGVjb3JhdG9yIHtcbiAgLyoqXG4gICAqIEEgY29uc3RydWN0b3IgcGFyYW1ldGVyIGRlY29yYXRvciB0aGF0IHRlbGxzIHRoZSBESSBmcmFtZXdvcmtcbiAgICogdG8gcmV0cmlldmUgYSBkZXBlbmRlbmN5IG9ubHkgZnJvbSB0aGUgbG9jYWwgaW5qZWN0b3IuXG4gICAqXG4gICAqIEluIHRoZSBmb2xsb3dpbmcgZXhhbXBsZSwgdGhlIGRlcGVuZGVuY3kgY2FuIGJlIHJlc29sdmVkXG4gICAqIGJ5IHRoZSBsb2NhbCBpbmplY3RvciB3aGVuIGluc3RhbnRpYXRpbmcgdGhlIGNsYXNzIGl0c2VsZiwgYnV0IG5vdFxuICAgKiB3aGVuIGluc3RhbnRpYXRpbmcgYSBjaGlsZC5cbiAgICpcbiAgICoge0BleGFtcGxlIGNvcmUvZGkvdHMvbWV0YWRhdGFfc3BlYy50cyByZWdpb249J1NlbGYnfVxuICAgKlxuICAgKiBAc2VlIFtcIkRlcGVuZGVuY3kgSW5qZWN0aW9uIEd1aWRlXCJdKGd1aWRlL2RlcGVuZGVuY3ktaW5qZWN0aW9uKS5cbiAgICpcbiAgICpcbiAgICovXG4gICgpOiBhbnk7XG4gIG5ldyAoKTogU2VsZjtcbn1cblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBTZWxmIG1ldGFkYXRhLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTZWxmIHt9XG5cbi8qKlxuICogU2VsZiBkZWNvcmF0b3IgYW5kIG1ldGFkYXRhLlxuICpcbiAqIEBBbm5vdGF0aW9uXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBTZWxmOiBTZWxmRGVjb3JhdG9yID0gbWFrZVBhcmFtRGVjb3JhdG9yKCdTZWxmJyk7XG5cblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBTa2lwU2VsZiBkZWNvcmF0b3IgLyBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2tpcFNlbGZEZWNvcmF0b3Ige1xuICAvKipcbiAgICogQSBjb25zdHJ1Y3RvciBwYXJhbWV0ZXIgZGVjb3JhdG9yIHRoYXQgdGVsbHMgdGhlIERJIGZyYW1ld29ya1xuICAgKiB0aGF0IGRlcGVuZGVuY3kgcmVzb2x1dGlvbiBzaG91bGQgc3RhcnQgZnJvbSB0aGUgcGFyZW50IGluamVjdG9yLlxuICAgKlxuICAgKiBJbiB0aGUgZm9sbG93aW5nIGV4YW1wbGUsIHRoZSBkZXBlbmRlbmN5IGNhbiBiZSByZXNvbHZlZCB3aGVuXG4gICAqIGluc3RhbnRpYXRpbmcgYSBjaGlsZCwgYnV0IG5vdCB3aGVuIGluc3RhbnRpYXRpbmcgdGhlIGNsYXNzIGl0c2VsZi5cbiAgICpcbiAgICoge0BleGFtcGxlIGNvcmUvZGkvdHMvbWV0YWRhdGFfc3BlYy50cyByZWdpb249J1NraXBTZWxmJ31cbiAgICpcbiAgICogQHNlZSBbXCJEZXBlbmRlbmN5IEluamVjdGlvbiBHdWlkZVwiXShndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbikuXG4gICAqXG4gICAqXG4gICAqL1xuICAoKTogYW55O1xuICBuZXcgKCk6IFNraXBTZWxmO1xufVxuXG4vKipcbiAqIFR5cGUgb2YgdGhlIFNraXBTZWxmIG1ldGFkYXRhLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTa2lwU2VsZiB7fVxuXG4vKipcbiAqIFNraXBTZWxmIGRlY29yYXRvciBhbmQgbWV0YWRhdGEuXG4gKlxuICogQEFubm90YXRpb25cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IFNraXBTZWxmOiBTa2lwU2VsZkRlY29yYXRvciA9IG1ha2VQYXJhbURlY29yYXRvcignU2tpcFNlbGYnKTtcblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBIb3N0IGRlY29yYXRvciAvIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBIb3N0RGVjb3JhdG9yIHtcbiAgLyoqXG4gICAqIEEgY29uc3RydWN0b3IgcGFyYW1ldGVyIGRlY29yYXRvciB0aGF0IHRlbGxzIHRoZSBESSBmcmFtZXdvcmtcbiAgICogdG8gcmV0cmlldmUgYSBkZXBlbmRlbmN5IGZyb20gYW55IGluamVjdG9yIHVudGlsXG4gICAqIHJlYWNoaW5nIHRoZSBob3N0IGVsZW1lbnQgb2YgdGhlIGN1cnJlbnQgY29tcG9uZW50LlxuICAgKlxuICAgKiBAc2VlIFtcIkRlcGVuZGVuY3kgSW5qZWN0aW9uIEd1aWRlXCJdKGd1aWRlL2RlcGVuZGVuY3ktaW5qZWN0aW9uKS5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICpcbiAgICoge0BleGFtcGxlIGNvcmUvZGkvdHMvbWV0YWRhdGFfc3BlYy50cyByZWdpb249J0hvc3QnfVxuICAgKi9cbiAgKCk6IGFueTtcbiAgbmV3ICgpOiBIb3N0O1xufVxuXG4vKipcbiAqIFR5cGUgb2YgdGhlIEhvc3QgbWV0YWRhdGEuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEhvc3Qge31cblxuLyoqXG4gKiBIb3N0IGRlY29yYXRvciBhbmQgbWV0YWRhdGEuXG4gKlxuICogQEFubm90YXRpb25cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IEhvc3Q6IEhvc3REZWNvcmF0b3IgPSBtYWtlUGFyYW1EZWNvcmF0b3IoJ0hvc3QnKTtcbiJdfQ==