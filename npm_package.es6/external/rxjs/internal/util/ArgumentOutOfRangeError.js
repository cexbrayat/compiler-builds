function ArgumentOutOfRangeErrorImpl() {
    Error.call(this);
    this.message = 'argument out of range';
    this.name = 'ArgumentOutOfRangeError';
    return this;
}
ArgumentOutOfRangeErrorImpl.prototype = Object.create(Error.prototype);
export const ArgumentOutOfRangeError = ArgumentOutOfRangeErrorImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJndW1lbnRPdXRPZlJhbmdlRXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9leHRlcm5hbC9yeGpzL2ludGVybmFsL3V0aWwvQXJndW1lbnRPdXRPZlJhbmdlRXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsU0FBUywyQkFBMkI7SUFDbEMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDO0lBQ3ZDLElBQUksQ0FBQyxJQUFJLEdBQUcseUJBQXlCLENBQUM7SUFDdEMsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQsMkJBQTJCLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBWXZFLE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFnQywyQkFBa0MsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgQXJndW1lbnRPdXRPZlJhbmdlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXJndW1lbnRPdXRPZlJhbmdlRXJyb3JDdG9yIHtcbiAgbmV3KCk6IEFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yO1xufVxuXG5mdW5jdGlvbiBBcmd1bWVudE91dE9mUmFuZ2VFcnJvckltcGwodGhpczogYW55KSB7XG4gIEVycm9yLmNhbGwodGhpcyk7XG4gIHRoaXMubWVzc2FnZSA9ICdhcmd1bWVudCBvdXQgb2YgcmFuZ2UnO1xuICB0aGlzLm5hbWUgPSAnQXJndW1lbnRPdXRPZlJhbmdlRXJyb3InO1xuICByZXR1cm4gdGhpcztcbn1cblxuQXJndW1lbnRPdXRPZlJhbmdlRXJyb3JJbXBsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlKTtcblxuLyoqXG4gKiBBbiBlcnJvciB0aHJvd24gd2hlbiBhbiBlbGVtZW50IHdhcyBxdWVyaWVkIGF0IGEgY2VydGFpbiBpbmRleCBvZiBhblxuICogT2JzZXJ2YWJsZSwgYnV0IG5vIHN1Y2ggaW5kZXggb3IgcG9zaXRpb24gZXhpc3RzIGluIHRoYXQgc2VxdWVuY2UuXG4gKlxuICogQHNlZSB7QGxpbmsgZWxlbWVudEF0fVxuICogQHNlZSB7QGxpbmsgdGFrZX1cbiAqIEBzZWUge0BsaW5rIHRha2VMYXN0fVxuICpcbiAqIEBjbGFzcyBBcmd1bWVudE91dE9mUmFuZ2VFcnJvclxuICovXG5leHBvcnQgY29uc3QgQXJndW1lbnRPdXRPZlJhbmdlRXJyb3I6IEFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yQ3RvciA9IEFyZ3VtZW50T3V0T2ZSYW5nZUVycm9ySW1wbCBhcyBhbnk7Il19