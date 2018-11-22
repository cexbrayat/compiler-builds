import { reduce } from './reduce';
export function max(comparer) {
    const max = (typeof comparer === 'function')
        ? (x, y) => comparer(x, y) > 0 ? x : y
        : (x, y) => x > y ? x : y;
    return reduce(max);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZXh0ZXJuYWwvcnhqcy9pbnRlcm5hbC9vcGVyYXRvcnMvbWF4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxVQUFVLENBQUM7QUEwQ2xDLE1BQU0sVUFBVSxHQUFHLENBQUksUUFBaUM7SUFDdEQsTUFBTSxHQUFHLEdBQXNCLENBQUMsT0FBTyxRQUFRLEtBQUssVUFBVSxDQUFDO1FBQzdELENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFNUIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlZHVjZSB9IGZyb20gJy4vcmVkdWNlJztcbmltcG9ydCB7IE1vbm9UeXBlT3BlcmF0b3JGdW5jdGlvbiB9IGZyb20gJy4uL3R5cGVzJztcblxuLyoqXG4gKiBUaGUgTWF4IG9wZXJhdG9yIG9wZXJhdGVzIG9uIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBudW1iZXJzIChvciBpdGVtcyB0aGF0IGNhbiBiZSBjb21wYXJlZCB3aXRoIGEgcHJvdmlkZWQgZnVuY3Rpb24pLFxuICogYW5kIHdoZW4gc291cmNlIE9ic2VydmFibGUgY29tcGxldGVzIGl0IGVtaXRzIGEgc2luZ2xlIGl0ZW06IHRoZSBpdGVtIHdpdGggdGhlIGxhcmdlc3QgdmFsdWUuXG4gKlxuICogIVtdKG1heC5wbmcpXG4gKlxuICogIyMgRXhhbXBsZXNcbiAqIEdldCB0aGUgbWF4aW1hbCB2YWx1ZSBvZiBhIHNlcmllcyBvZiBudW1iZXJzXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBvZig1LCA0LCA3LCAyLCA4KS5waXBlKFxuICogICBtYXgoKSxcbiAqIClcbiAqIC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7IC8vIC0+IDhcbiAqIGBgYFxuICpcbiAqIFVzZSBhIGNvbXBhcmVyIGZ1bmN0aW9uIHRvIGdldCB0aGUgbWF4aW1hbCBpdGVtXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbnRlcmZhY2UgUGVyc29uIHtcbiAqICAgYWdlOiBudW1iZXIsXG4gKiAgIG5hbWU6IHN0cmluZ1xuICogfVxuICogb2Y8UGVyc29uPihcbiAqICAge2FnZTogNywgbmFtZTogJ0Zvbyd9LFxuICogICB7YWdlOiA1LCBuYW1lOiAnQmFyJ30sXG4gKiAgIHthZ2U6IDksIG5hbWU6ICdCZWVyJ30sXG4gKiApLnBpcGUoXG4gKiAgIG1heDxQZXJzb24+KChhOiBQZXJzb24sIGI6IFBlcnNvbikgPT4gYS5hZ2UgPCBiLmFnZSA/IC0xIDogMSksXG4gKiApXG4gKiAuc3Vic2NyaWJlKCh4OiBQZXJzb24pID0+IGNvbnNvbGUubG9nKHgubmFtZSkpOyAvLyAtPiAnQmVlcidcbiAqIGBgYFxuICpcbiAqIEBzZWUge0BsaW5rIG1pbn1cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29tcGFyZXJdIC0gT3B0aW9uYWwgY29tcGFyZXIgZnVuY3Rpb24gdGhhdCBpdCB3aWxsIHVzZSBpbnN0ZWFkIG9mIGl0cyBkZWZhdWx0IHRvIGNvbXBhcmUgdGhlXG4gKiB2YWx1ZSBvZiB0d28gaXRlbXMuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgaXRlbSB3aXRoIHRoZSBsYXJnZXN0IHZhbHVlLlxuICogQG1ldGhvZCBtYXhcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXg8VD4oY29tcGFyZXI/OiAoeDogVCwgeTogVCkgPT4gbnVtYmVyKTogTW9ub1R5cGVPcGVyYXRvckZ1bmN0aW9uPFQ+IHtcbiAgY29uc3QgbWF4OiAoeDogVCwgeTogVCkgPT4gVCA9ICh0eXBlb2YgY29tcGFyZXIgPT09ICdmdW5jdGlvbicpXG4gICAgPyAoeCwgeSkgPT4gY29tcGFyZXIoeCwgeSkgPiAwID8geCA6IHlcbiAgICA6ICh4LCB5KSA9PiB4ID4geSA/IHggOiB5O1xuXG4gIHJldHVybiByZWR1Y2UobWF4KTtcbn1cbiJdfQ==