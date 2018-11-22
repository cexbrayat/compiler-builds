import { AsyncSubject } from '../AsyncSubject';
import { multicast } from './multicast';
export function publishLast() {
    return (source) => multicast(new AsyncSubject())(source);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGlzaExhc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9leHRlcm5hbC9yeGpzL2ludGVybmFsL29wZXJhdG9ycy9wdWJsaXNoTGFzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQTJEeEMsTUFBTSxVQUFVLFdBQVc7SUFDekIsT0FBTyxDQUFDLE1BQXFCLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFlBQVksRUFBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDN0UsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEFzeW5jU3ViamVjdCB9IGZyb20gJy4uL0FzeW5jU3ViamVjdCc7XG5pbXBvcnQgeyBtdWx0aWNhc3QgfSBmcm9tICcuL211bHRpY2FzdCc7XG5pbXBvcnQgeyBDb25uZWN0YWJsZU9ic2VydmFibGUgfSBmcm9tICcuLi9vYnNlcnZhYmxlL0Nvbm5lY3RhYmxlT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBVbmFyeUZ1bmN0aW9uIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vKipcbiAqIFJldHVybnMgYSBjb25uZWN0YWJsZSBvYnNlcnZhYmxlIHNlcXVlbmNlIHRoYXQgc2hhcmVzIGEgc2luZ2xlIHN1YnNjcmlwdGlvbiB0byB0aGVcbiAqIHVuZGVybHlpbmcgc2VxdWVuY2UgY29udGFpbmluZyBvbmx5IHRoZSBsYXN0IG5vdGlmaWNhdGlvbi5cbiAqXG4gKiAhW10ocHVibGlzaExhc3QucG5nKVxuICpcbiAqIFNpbWlsYXIgdG8ge0BsaW5rIHB1Ymxpc2h9LCBidXQgaXQgd2FpdHMgdW50aWwgdGhlIHNvdXJjZSBvYnNlcnZhYmxlIGNvbXBsZXRlcyBhbmQgc3RvcmVzXG4gKiB0aGUgbGFzdCBlbWl0dGVkIHZhbHVlLlxuICogU2ltaWxhcmx5IHRvIHtAbGluayBwdWJsaXNoUmVwbGF5fSBhbmQge0BsaW5rIHB1Ymxpc2hCZWhhdmlvcn0sIHRoaXMga2VlcHMgc3RvcmluZyB0aGUgbGFzdFxuICogdmFsdWUgZXZlbiBpZiBpdCBoYXMgbm8gbW9yZSBzdWJzY3JpYmVycy4gSWYgc3Vic2VxdWVudCBzdWJzY3JpcHRpb25zIGhhcHBlbiwgdGhleSB3aWxsXG4gKiBpbW1lZGlhdGVseSBnZXQgdGhhdCBsYXN0IHN0b3JlZCB2YWx1ZSBhbmQgY29tcGxldGUuXG4gKlxuICogIyMgRXhhbXBsZVxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBjb25uZWN0YWJsZSA9XG4gKiAgIGludGVydmFsKDEwMDApXG4gKiAgICAgLnBpcGUoXG4gKiAgICAgICB0YXAoeCA9PiBjb25zb2xlLmxvZyhcInNpZGUgZWZmZWN0XCIsIHgpKSxcbiAqICAgICAgIHRha2UoMyksXG4gKiAgICAgICBwdWJsaXNoTGFzdCgpKTtcbiAqXG4gKiBjb25uZWN0YWJsZS5zdWJzY3JpYmUoXG4gKiAgIHggPT4gY29uc29sZS5sb2coICBcIlN1Yi4gQVwiLCB4KSxcbiAqICAgZXJyID0+IGNvbnNvbGUubG9nKFwiU3ViLiBBIEVycm9yXCIsIGVyciksXG4gKiAgICgpID0+IGNvbnNvbGUubG9nKCBcIlN1Yi4gQSBDb21wbGV0ZVwiKSk7XG4gKlxuICogY29ubmVjdGFibGUuc3Vic2NyaWJlKFxuICogICB4ID0+IGNvbnNvbGUubG9nKCAgXCJTdWIuIEJcIiwgeCksXG4gKiAgIGVyciA9PiBjb25zb2xlLmxvZyhcIlN1Yi4gQiBFcnJvclwiLCBlcnIpLFxuICogICAoKSA9PiBjb25zb2xlLmxvZyggXCJTdWIuIEIgQ29tcGxldGVcIikpO1xuICpcbiAqIGNvbm5lY3RhYmxlLmNvbm5lY3QoKTtcbiAqXG4gKiAvLyBSZXN1bHRzOlxuICogLy8gICAgXCJzaWRlIGVmZmVjdCAwXCJcbiAqIC8vICAgIFwic2lkZSBlZmZlY3QgMVwiXG4gKiAvLyAgICBcInNpZGUgZWZmZWN0IDJcIlxuICogLy8gICAgXCJTdWIuIEEgMlwiXG4gKiAvLyAgICBcIlN1Yi4gQiAyXCJcbiAqIC8vICAgIFwiU3ViLiBBIENvbXBsZXRlXCJcbiAqIC8vICAgIFwiU3ViLiBCIENvbXBsZXRlXCJcbiAqIGBgYFxuICpcbiAqIEBzZWUge0BsaW5rIENvbm5lY3RhYmxlT2JzZXJ2YWJsZX1cbiAqIEBzZWUge0BsaW5rIHB1Ymxpc2h9XG4gKiBAc2VlIHtAbGluayBwdWJsaXNoUmVwbGF5fVxuICogQHNlZSB7QGxpbmsgcHVibGlzaEJlaGF2aW9yfVxuICpcbiAqIEByZXR1cm4ge0Nvbm5lY3RhYmxlT2JzZXJ2YWJsZX0gQW4gb2JzZXJ2YWJsZSBzZXF1ZW5jZSB0aGF0IGNvbnRhaW5zIHRoZSBlbGVtZW50cyBvZiBhXG4gKiBzZXF1ZW5jZSBwcm9kdWNlZCBieSBtdWx0aWNhc3RpbmcgdGhlIHNvdXJjZSBzZXF1ZW5jZS5cbiAqIEBtZXRob2QgcHVibGlzaExhc3RcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHB1Ymxpc2hMYXN0PFQ+KCk6IFVuYXJ5RnVuY3Rpb248T2JzZXJ2YWJsZTxUPiwgQ29ubmVjdGFibGVPYnNlcnZhYmxlPFQ+PiB7XG4gIHJldHVybiAoc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBtdWx0aWNhc3QobmV3IEFzeW5jU3ViamVjdDxUPigpKShzb3VyY2UpO1xufVxuIl19