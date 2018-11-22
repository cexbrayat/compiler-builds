import { config } from './config';
import { hostReportError } from './util/hostReportError';
export var empty = {
    closed: true,
    next: function (value) { },
    error: function (err) {
        if (config.useDeprecatedSynchronousErrorHandling) {
            throw err;
        }
        else {
            hostReportError(err);
        }
    },
    complete: function () { }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2JzZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9leHRlcm5hbC9yeGpzL2ludGVybmFsL09ic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXpELE1BQU0sQ0FBQyxJQUFNLEtBQUssR0FBa0I7SUFDbEMsTUFBTSxFQUFFLElBQUk7SUFDWixJQUFJLEVBQUosVUFBSyxLQUFVLElBQW9CLENBQUM7SUFDcEMsS0FBSyxFQUFMLFVBQU0sR0FBUTtRQUNaLElBQUksTUFBTSxDQUFDLHFDQUFxQyxFQUFFO1lBQ2hELE1BQU0sR0FBRyxDQUFDO1NBQ1g7YUFBTTtZQUNMLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN0QjtJQUNILENBQUM7SUFDRCxRQUFRLEVBQVIsY0FBNEIsQ0FBQztDQUM5QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IGhvc3RSZXBvcnRFcnJvciB9IGZyb20gJy4vdXRpbC9ob3N0UmVwb3J0RXJyb3InO1xuXG5leHBvcnQgY29uc3QgZW1wdHk6IE9ic2VydmVyPGFueT4gPSB7XG4gIGNsb3NlZDogdHJ1ZSxcbiAgbmV4dCh2YWx1ZTogYW55KTogdm9pZCB7IC8qIG5vb3AgKi99LFxuICBlcnJvcihlcnI6IGFueSk6IHZvaWQge1xuICAgIGlmIChjb25maWcudXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZykge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH0gZWxzZSB7XG4gICAgICBob3N0UmVwb3J0RXJyb3IoZXJyKTtcbiAgICB9XG4gIH0sXG4gIGNvbXBsZXRlKCk6IHZvaWQgeyAvKm5vb3AqLyB9XG59O1xuIl19