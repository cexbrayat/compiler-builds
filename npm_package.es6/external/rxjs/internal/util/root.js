const __window = typeof window !== 'undefined' && window;
const __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope && self;
const __global = typeof global !== 'undefined' && global;
const _root = __window || __global || __self;
(function () {
    if (!_root) {
        throw new Error('RxJS could not find any global context (window, self, global)');
    }
})();
export { _root as root };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2V4dGVybmFsL3J4anMvaW50ZXJuYWwvdXRpbC9yb290LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWVBLE1BQU0sUUFBUSxHQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUM7QUFDekQsTUFBTSxNQUFNLEdBQUcsT0FBTyxJQUFJLEtBQUssV0FBVyxJQUFJLE9BQU8saUJBQWlCLEtBQUssV0FBVztJQUNsRixJQUFJLFlBQVksaUJBQWlCLElBQUksSUFBSSxDQUFDO0FBQzlDLE1BQU0sUUFBUSxHQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUM7QUFDekQsTUFBTSxLQUFLLEdBQVEsUUFBUSxJQUFJLFFBQVEsSUFBSSxNQUFNLENBQUM7QUFLbEQsQ0FBQztJQUNDLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDVixNQUFNLElBQUksS0FBSyxDQUFDLCtEQUErRCxDQUFDLENBQUM7S0FDbEY7QUFDSCxDQUFDLENBQUMsRUFBRSxDQUFDO0FBRUwsT0FBTyxFQUFFLEtBQUssSUFBSSxJQUFJLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImRlY2xhcmUgbGV0IGdsb2JhbDogYW55O1xuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmRlY2xhcmUgdmFyIFdvcmtlckdsb2JhbFNjb3BlOiBhbnk7XG4vLyBDb21tb25KUyAvIE5vZGUgaGF2ZSBnbG9iYWwgY29udGV4dCBleHBvc2VkIGFzIFwiZ2xvYmFsXCIgdmFyaWFibGUuXG4vLyBXZSBkb24ndCB3YW50IHRvIGluY2x1ZGUgdGhlIHdob2xlIG5vZGUuZC50cyB0aGlzIHRoaXMgY29tcGlsYXRpb24gdW5pdCBzbyB3ZSdsbCBqdXN0IGZha2Vcbi8vIHRoZSBnbG9iYWwgXCJnbG9iYWxcIiB2YXIgZm9yIG5vdy5cblxuY29uc3QgX193aW5kb3cgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3c7XG5jb25zdCBfX3NlbGYgPSB0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSAmJiBzZWxmO1xuY29uc3QgX19nbG9iYWwgPSB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWw7XG5jb25zdCBfcm9vdDogYW55ID0gX193aW5kb3cgfHwgX19nbG9iYWwgfHwgX19zZWxmO1xuXG4vLyBXb3JrYXJvdW5kIENsb3N1cmUgQ29tcGlsZXIgcmVzdHJpY3Rpb246IFRoZSBib2R5IG9mIGEgZ29vZy5tb2R1bGUgY2Fubm90IHVzZSB0aHJvdy5cbi8vIFRoaXMgaXMgbmVlZGVkIHdoZW4gdXNlZCB3aXRoIGFuZ3VsYXIvdHNpY2tsZSB3aGljaCBpbnNlcnRzIGEgZ29vZy5tb2R1bGUgc3RhdGVtZW50LlxuLy8gV3JhcCBpbiBJSUZFXG4oZnVuY3Rpb24gKCkge1xuICBpZiAoIV9yb290KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdSeEpTIGNvdWxkIG5vdCBmaW5kIGFueSBnbG9iYWwgY29udGV4dCAod2luZG93LCBzZWxmLCBnbG9iYWwpJyk7XG4gIH1cbn0pKCk7XG5cbmV4cG9ydCB7IF9yb290IGFzIHJvb3QgfTsiXX0=