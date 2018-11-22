export function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
export const iterator = getSymbolIterator();
export const $$iterator = iterator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9leHRlcm5hbC9yeGpzL2ludGVybmFsL3N5bWJvbC9pdGVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFVBQVUsaUJBQWlCO0lBQy9CLElBQUksT0FBTyxNQUFNLEtBQUssVUFBVSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtRQUNwRCxPQUFPLFlBQW1CLENBQUM7S0FDNUI7SUFFRCxPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUM7QUFDekIsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBRyxpQkFBaUIsRUFBRSxDQUFDO0FBSzVDLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZ2V0U3ltYm9sSXRlcmF0b3IoKTogc3ltYm9sIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICdmdW5jdGlvbicgfHwgIVN5bWJvbC5pdGVyYXRvcikge1xuICAgIHJldHVybiAnQEBpdGVyYXRvcicgYXMgYW55O1xuICB9XG5cbiAgcmV0dXJuIFN5bWJvbC5pdGVyYXRvcjtcbn1cblxuZXhwb3J0IGNvbnN0IGl0ZXJhdG9yID0gZ2V0U3ltYm9sSXRlcmF0b3IoKTtcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCB1c2Uge0BsaW5rIGl0ZXJhdG9yfSBpbnN0ZWFkXG4gKi9cbmV4cG9ydCBjb25zdCAkJGl0ZXJhdG9yID0gaXRlcmF0b3I7XG4iXX0=