import { isScheduler } from '../util/isScheduler';
import { fromArray } from './fromArray';
import { empty } from './empty';
import { scalar } from './scalar';
export function of(...args) {
    let scheduler = args[args.length - 1];
    if (isScheduler(scheduler)) {
        args.pop();
    }
    else {
        scheduler = undefined;
    }
    switch (args.length) {
        case 0:
            return empty(scheduler);
        case 1:
            return scheduler ? fromArray(args, scheduler) : scalar(args[0]);
        default:
            return fromArray(args, scheduler);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2YuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9leHRlcm5hbC9yeGpzL2ludGVybmFsL29ic2VydmFibGUvb2YudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBc0VsQyxNQUFNLFVBQVUsRUFBRSxDQUFJLEdBQUcsSUFBOEI7SUFDckQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFrQixDQUFDO0lBQ3ZELElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQzFCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUNaO1NBQU07UUFDTCxTQUFTLEdBQUcsU0FBUyxDQUFDO0tBQ3ZCO0lBQ0QsUUFBUSxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ25CLEtBQUssQ0FBQztZQUNKLE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFCLEtBQUssQ0FBQztZQUNKLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBTSxDQUFDLENBQUM7UUFDOUU7WUFDRSxPQUFPLFNBQVMsQ0FBQyxJQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDNUM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2NoZWR1bGVyTGlrZSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGlzU2NoZWR1bGVyIH0gZnJvbSAnLi4vdXRpbC9pc1NjaGVkdWxlcic7XG5pbXBvcnQgeyBmcm9tQXJyYXkgfSBmcm9tICcuL2Zyb21BcnJheSc7XG5pbXBvcnQgeyBlbXB0eSB9IGZyb20gJy4vZW1wdHknO1xuaW1wb3J0IHsgc2NhbGFyIH0gZnJvbSAnLi9zY2FsYXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuXG4vKiB0c2xpbnQ6ZGlzYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbmV4cG9ydCBmdW5jdGlvbiBvZjxUPihhOiBULCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogT2JzZXJ2YWJsZTxUPjtcbmV4cG9ydCBmdW5jdGlvbiBvZjxULCBUMj4oYTogVCwgYjogVDIsIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiBPYnNlcnZhYmxlPFQgfCBUMj47XG5leHBvcnQgZnVuY3Rpb24gb2Y8VCwgVDIsIFQzPihhOiBULCBiOiBUMiwgYzogVDMsIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiBPYnNlcnZhYmxlPFQgfCBUMiB8IFQzPjtcbmV4cG9ydCBmdW5jdGlvbiBvZjxULCBUMiwgVDMsIFQ0PihhOiBULCBiOiBUMiwgYzogVDMsIGQ6IFQ0LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTogT2JzZXJ2YWJsZTxUIHwgVDIgfCBUMyB8IFQ0PjtcbmV4cG9ydCBmdW5jdGlvbiBvZjxULCBUMiwgVDMsIFQ0LCBUNT4oYTogVCwgYjogVDIsIGM6IFQzLCBkOiBUNCwgZTogVDUsIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiBPYnNlcnZhYmxlPFQgfCBUMiB8IFQzIHwgVDQgfCBUNT47XG5leHBvcnQgZnVuY3Rpb24gb2Y8VCwgVDIsIFQzLCBUNCwgVDUsIFQ2PihhOiBULCBiOiBUMiwgYzogVDMsIGQ6IFQ0LCBlOiBUNSwgZjogVDYsIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiBPYnNlcnZhYmxlPFQgfCBUMiB8IFQzIHwgVDQgfCBUNSB8IFQ2PjtcbmV4cG9ydCBmdW5jdGlvbiBvZjxULCBUMiwgVDMsIFQ0LCBUNSwgVDYsIFQ3PihhOiBULCBiOiBUMiwgYzogVDMsIGQ6IFQ0LCBlOiBUNSwgZjogVDYsIGc6IFQ3LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlKTpcbiAgT2JzZXJ2YWJsZTxUIHwgVDIgfCBUMyB8IFQ0IHwgVDUgfCBUNiB8IFQ3PjtcbmV4cG9ydCBmdW5jdGlvbiBvZjxULCBUMiwgVDMsIFQ0LCBUNSwgVDYsIFQ3LCBUOD4oYTogVCwgYjogVDIsIGM6IFQzLCBkOiBUNCwgZTogVDUsIGY6IFQ2LCBnOiBUNywgaDogVDgsIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOlxuICBPYnNlcnZhYmxlPFQgfCBUMiB8IFQzIHwgVDQgfCBUNSB8IFQ2IHwgVDcgfCBUOD47XG5leHBvcnQgZnVuY3Rpb24gb2Y8VCwgVDIsIFQzLCBUNCwgVDUsIFQ2LCBUNywgVDgsIFQ5PihhOiBULCBiOiBUMiwgYzogVDMsIGQ6IFQ0LCBlOiBUNSwgZjogVDYsIGc6IFQ3LCBoOiBUOCwgaTogVDksIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOlxuICBPYnNlcnZhYmxlPFQgfCBUMiB8IFQzIHwgVDQgfCBUNSB8IFQ2IHwgVDcgfCBUOCB8IFQ5PjtcbmV4cG9ydCBmdW5jdGlvbiBvZjxUPiguLi5hcmdzOiBBcnJheTxUIHwgU2NoZWR1bGVyTGlrZT4pOiBPYnNlcnZhYmxlPFQ+O1xuLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cblxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgYXJndW1lbnRzIHRvIGFuIG9ic2VydmFibGUgc2VxdWVuY2UuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkVhY2ggYXJndW1lbnQgYmVjb21lcyBhIGBuZXh0YCBub3RpZmljYXRpb24uPC9zcGFuPlxuICpcbiAqICFbXShvZi5wbmcpXG4gKlxuICogVW5saWtlIHtAbGluayBmcm9tfSwgaXQgZG9lcyBub3QgZG8gYW55IGZsYXR0ZW5pbmcgYW5kIGVtaXRzIGVhY2ggYXJndW1lbnQgaW4gd2hvbGVcbiAqIGFzIGEgc2VwYXJhdGUgYG5leHRgIG5vdGlmaWNhdGlvbi5cbiAqXG4gKiAjIyBFeGFtcGxlc1xuICpcbiAqIEVtaXQgdGhlIHZhbHVlcyBgMTAsIDIwLCAzMGBcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBvZigxMCwgMjAsIDMwKVxuICogLnN1YnNjcmliZShcbiAqICAgbmV4dCA9PiBjb25zb2xlLmxvZygnbmV4dDonLCBuZXh0KSxcbiAqICAgZXJyID0+IGNvbnNvbGUubG9nKCdlcnJvcjonLCBlcnIpLFxuICogICAoKSA9PiBjb25zb2xlLmxvZygndGhlIGVuZCcpLFxuICogKTtcbiAqIC8vIHJlc3VsdDpcbiAqIC8vICduZXh0OiAxMCdcbiAqIC8vICduZXh0OiAyMCdcbiAqIC8vICduZXh0OiAzMCdcbiAqXG4gKiBgYGBcbiAqXG4gKiBFbWl0IHRoZSBhcnJheSBgWzEsMiwzXWBcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBvZihbMSwyLDNdKVxuICogLnN1YnNjcmliZShcbiAqICAgbmV4dCA9PiBjb25zb2xlLmxvZygnbmV4dDonLCBuZXh0KSxcbiAqICAgZXJyID0+IGNvbnNvbGUubG9nKCdlcnJvcjonLCBlcnIpLFxuICogICAoKSA9PiBjb25zb2xlLmxvZygndGhlIGVuZCcpLFxuICogKTtcbiAqIC8vIHJlc3VsdDpcbiAqIC8vICduZXh0OiBbMSwyLDNdJ1xuICogYGBgXG4gKlxuICogQHNlZSB7QGxpbmsgZnJvbX1cbiAqIEBzZWUge0BsaW5rIHJhbmdlfVxuICpcbiAqIEBwYXJhbSB7Li4uVH0gdmFsdWVzIEEgY29tbWEgc2VwYXJhdGVkIGxpc3Qgb2YgYXJndW1lbnRzIHlvdSB3YW50IHRvIGJlIGVtaXR0ZWRcbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyB0aGUgYXJndW1lbnRzXG4gKiBkZXNjcmliZWQgYWJvdmUgYW5kIHRoZW4gY29tcGxldGVzLlxuICogQG1ldGhvZCBvZlxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gb2Y8VD4oLi4uYXJnczogQXJyYXk8VCB8IFNjaGVkdWxlckxpa2U+KTogT2JzZXJ2YWJsZTxUPiB7XG4gIGxldCBzY2hlZHVsZXIgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0gYXMgU2NoZWR1bGVyTGlrZTtcbiAgaWYgKGlzU2NoZWR1bGVyKHNjaGVkdWxlcikpIHtcbiAgICBhcmdzLnBvcCgpO1xuICB9IGVsc2Uge1xuICAgIHNjaGVkdWxlciA9IHVuZGVmaW5lZDtcbiAgfVxuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIGVtcHR5KHNjaGVkdWxlcik7XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIHNjaGVkdWxlciA/IGZyb21BcnJheShhcmdzIGFzIFRbXSwgc2NoZWR1bGVyKSA6IHNjYWxhcihhcmdzWzBdIGFzIFQpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZnJvbUFycmF5KGFyZ3MgYXMgVFtdLCBzY2hlZHVsZXIpO1xuICB9XG59XG4iXX0=