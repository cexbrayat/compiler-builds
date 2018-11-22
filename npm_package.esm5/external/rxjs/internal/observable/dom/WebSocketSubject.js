var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { Subject, AnonymousSubject } from '../../Subject';
import { Subscriber } from '../../Subscriber';
import { Observable } from '../../Observable';
import { Subscription } from '../../Subscription';
import { ReplaySubject } from '../../ReplaySubject';
import { tryCatch } from '../../util/tryCatch';
import { errorObject } from '../../util/errorObject';
var DEFAULT_WEBSOCKET_CONFIG = {
    url: '',
    deserializer: function (e) { return JSON.parse(e.data); },
    serializer: function (value) { return JSON.stringify(value); },
};
var WEBSOCKETSUBJECT_INVALID_ERROR_OBJECT = 'WebSocketSubject.error must be called with an object with an error code, and an optional reason: { code: number, reason: string }';
var WebSocketSubject = (function (_super) {
    __extends(WebSocketSubject, _super);
    function WebSocketSubject(urlConfigOrSource, destination) {
        var _this = _super.call(this) || this;
        if (urlConfigOrSource instanceof Observable) {
            _this.destination = destination;
            _this.source = urlConfigOrSource;
        }
        else {
            var config = _this._config = __assign({}, DEFAULT_WEBSOCKET_CONFIG);
            _this._output = new Subject();
            if (typeof urlConfigOrSource === 'string') {
                config.url = urlConfigOrSource;
            }
            else {
                for (var key in urlConfigOrSource) {
                    if (urlConfigOrSource.hasOwnProperty(key)) {
                        config[key] = urlConfigOrSource[key];
                    }
                }
            }
            if (!config.WebSocketCtor && WebSocket) {
                config.WebSocketCtor = WebSocket;
            }
            else if (!config.WebSocketCtor) {
                throw new Error('no WebSocket constructor can be found');
            }
            _this.destination = new ReplaySubject();
        }
        return _this;
    }
    WebSocketSubject.prototype.lift = function (operator) {
        var sock = new WebSocketSubject(this._config, this.destination);
        sock.operator = operator;
        sock.source = this;
        return sock;
    };
    WebSocketSubject.prototype._resetState = function () {
        this._socket = null;
        if (!this.source) {
            this.destination = new ReplaySubject();
        }
        this._output = new Subject();
    };
    WebSocketSubject.prototype.multiplex = function (subMsg, unsubMsg, messageFilter) {
        var self = this;
        return new Observable(function (observer) {
            var result = tryCatch(subMsg)();
            if (result === errorObject) {
                observer.error(errorObject.e);
            }
            else {
                self.next(result);
            }
            var subscription = self.subscribe(function (x) {
                var result = tryCatch(messageFilter)(x);
                if (result === errorObject) {
                    observer.error(errorObject.e);
                }
                else if (result) {
                    observer.next(x);
                }
            }, function (err) { return observer.error(err); }, function () { return observer.complete(); });
            return function () {
                var result = tryCatch(unsubMsg)();
                if (result === errorObject) {
                    observer.error(errorObject.e);
                }
                else {
                    self.next(result);
                }
                subscription.unsubscribe();
            };
        });
    };
    WebSocketSubject.prototype._connectSocket = function () {
        var _this = this;
        var _a = this._config, WebSocketCtor = _a.WebSocketCtor, protocol = _a.protocol, url = _a.url, binaryType = _a.binaryType;
        var observer = this._output;
        var socket = null;
        try {
            socket = protocol ?
                new WebSocketCtor(url, protocol) :
                new WebSocketCtor(url);
            this._socket = socket;
            if (binaryType) {
                this._socket.binaryType = binaryType;
            }
        }
        catch (e) {
            observer.error(e);
            return;
        }
        var subscription = new Subscription(function () {
            _this._socket = null;
            if (socket && socket.readyState === 1) {
                socket.close();
            }
        });
        socket.onopen = function (e) {
            var openObserver = _this._config.openObserver;
            if (openObserver) {
                openObserver.next(e);
            }
            var queue = _this.destination;
            _this.destination = Subscriber.create(function (x) {
                if (socket.readyState === 1) {
                    var serializer = _this._config.serializer;
                    var msg = tryCatch(serializer)(x);
                    if (msg === errorObject) {
                        _this.destination.error(errorObject.e);
                        return;
                    }
                    socket.send(msg);
                }
            }, function (e) {
                var closingObserver = _this._config.closingObserver;
                if (closingObserver) {
                    closingObserver.next(undefined);
                }
                if (e && e.code) {
                    socket.close(e.code, e.reason);
                }
                else {
                    observer.error(new TypeError(WEBSOCKETSUBJECT_INVALID_ERROR_OBJECT));
                }
                _this._resetState();
            }, function () {
                var closingObserver = _this._config.closingObserver;
                if (closingObserver) {
                    closingObserver.next(undefined);
                }
                socket.close();
                _this._resetState();
            });
            if (queue && queue instanceof ReplaySubject) {
                subscription.add(queue.subscribe(_this.destination));
            }
        };
        socket.onerror = function (e) {
            _this._resetState();
            observer.error(e);
        };
        socket.onclose = function (e) {
            _this._resetState();
            var closeObserver = _this._config.closeObserver;
            if (closeObserver) {
                closeObserver.next(e);
            }
            if (e.wasClean) {
                observer.complete();
            }
            else {
                observer.error(e);
            }
        };
        socket.onmessage = function (e) {
            var deserializer = _this._config.deserializer;
            var result = tryCatch(deserializer)(e);
            if (result === errorObject) {
                observer.error(errorObject.e);
            }
            else {
                observer.next(result);
            }
        };
    };
    WebSocketSubject.prototype._subscribe = function (subscriber) {
        var _this = this;
        var source = this.source;
        if (source) {
            return source.subscribe(subscriber);
        }
        if (!this._socket) {
            this._connectSocket();
        }
        this._output.subscribe(subscriber);
        subscriber.add(function () {
            var _socket = _this._socket;
            if (_this._output.observers.length === 0) {
                if (_socket && _socket.readyState === 1) {
                    _socket.close();
                }
                _this._resetState();
            }
        });
        return subscriber;
    };
    WebSocketSubject.prototype.unsubscribe = function () {
        var _a = this, source = _a.source, _socket = _a._socket;
        if (_socket && _socket.readyState === 1) {
            _socket.close();
            this._resetState();
        }
        _super.prototype.unsubscribe.call(this);
        if (!source) {
            this.destination = new ReplaySubject();
        }
    };
    return WebSocketSubject;
}(AnonymousSubject));
export { WebSocketSubject };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2ViU29ja2V0U3ViamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2V4dGVybmFsL3J4anMvaW50ZXJuYWwvb2JzZXJ2YWJsZS9kb20vV2ViU29ja2V0U3ViamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWxELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBMENyRCxJQUFNLHdCQUF3QixHQUFnQztJQUM1RCxHQUFHLEVBQUUsRUFBRTtJQUNQLFlBQVksRUFBRSxVQUFDLENBQWUsSUFBSyxPQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFsQixDQUFrQjtJQUNyRCxVQUFVLEVBQUUsVUFBQyxLQUFVLElBQUssT0FBQSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFyQixDQUFxQjtDQUNsRCxDQUFDO0FBRUYsSUFBTSxxQ0FBcUMsR0FDekMsbUlBQW1JLENBQUM7QUFTdEk7SUFBeUMsb0NBQW1CO0lBUzFELDBCQUFZLGlCQUFxRSxFQUFFLFdBQXlCO1FBQTVHLFlBQ0UsaUJBQU8sU0F3QlI7UUF2QkMsSUFBSSxpQkFBaUIsWUFBWSxVQUFVLEVBQUU7WUFDM0MsS0FBSSxDQUFDLFdB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TSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1NBQ3hDO0lBQ0gsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQTVPRCxDQUF5QyxnQkFBZ0IsR0E0T3hEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViamVjdCwgQW5vbnltb3VzU3ViamVjdCB9IGZyb20gJy4uLy4uL1N1YmplY3QnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uLy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uLy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi4vLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCB9IGZyb20gJy4uLy4uL1JlcGxheVN1YmplY3QnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIsIE5leHRPYnNlcnZlciB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IHRyeUNhdGNoIH0gZnJvbSAnLi4vLi4vdXRpbC90cnlDYXRjaCc7XG5pbXBvcnQgeyBlcnJvck9iamVjdCB9IGZyb20gJy4uLy4uL3V0aWwvZXJyb3JPYmplY3QnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFdlYlNvY2tldFN1YmplY3RDb25maWc8VD4ge1xuICAvKiogVGhlIHVybCBvZiB0aGUgc29ja2V0IHNlcnZlciB0byBjb25uZWN0IHRvICovXG4gIHVybDogc3RyaW5nO1xuICAvKiogVGhlIHByb3RvY29sIHRvIHVzZSB0byBjb25uZWN0ICovXG4gIHByb3RvY29sPzogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPjtcbiAgLyoqIEBkZXByZWNhdGVkIHVzZSB7QGxpbmsgZGVzZXJpYWxpemVyfSAqL1xuICByZXN1bHRTZWxlY3Rvcj86IChlOiBNZXNzYWdlRXZlbnQpID0+IFQ7XG4gIC8qKlxuICAgKiBBIHNlcmlhbGl6ZXIgdXNlZCB0byBjcmVhdGUgbWVzc2FnZXMgZnJvbSBwYXNzZWQgdmFsdWVzIGJlZm9yZSB0aGVcbiAgICogbWVzc2FnZXMgYXJlIHNlbnQgdG8gdGhlIHNlcnZlci4gRGVmYXVsdHMgdG8gSlNPTi5zdHJpbmdpZnkuXG4gICAqL1xuICBzZXJpYWxpemVyPzogKHZhbHVlOiBUKSA9PiBXZWJTb2NrZXRNZXNzYWdlO1xuICAvKipcbiAgICogQSBkZXNlcmlhbGl6ZXIgdXNlZCBmb3IgbWVzc2FnZXMgYXJyaXZpbmcgb24gdGhlIHNvY2tldCBmcm9tIHRoZVxuICAgKiBzZXJ2ZXIuIERlZmF1bHRzIHRvIEpTT04ucGFyc2UuXG4gICAqL1xuICBkZXNlcmlhbGl6ZXI/OiAoZTogTWVzc2FnZUV2ZW50KSA9PiBUO1xuICAvKipcbiAgICogQW4gT2JzZXJ2ZXIgdGhhdCB3YXRjaGVzIHdoZW4gb3BlbiBldmVudHMgb2NjdXIgb24gdGhlIHVuZGVybHlpbmcgd2ViIHNvY2tldC5cbiAgICovXG4gIG9wZW5PYnNlcnZlcj86IE5leHRPYnNlcnZlcjxFdmVudD47XG4gIC8qKlxuICAgKiBBbiBPYnNlcnZlciB0aGFuIHdhdGNoZXMgd2hlbiBjbG9zZSBldmVudHMgb2NjdXIgb24gdGhlIHVuZGVybHlpbmcgd2ViU29ja2V0XG4gICAqL1xuICBjbG9zZU9ic2VydmVyPzogTmV4dE9ic2VydmVyPENsb3NlRXZlbnQ+O1xuICAvKipcbiAgICogQW4gT2JzZXJ2ZXIgdGhhdCB3YXRjaGVzIHdoZW4gYSBjbG9zZSBpcyBhYm91dCB0byBvY2N1ciBkdWUgdG9cbiAgICogdW5zdWJzY3JpcHRpb24uXG4gICAqL1xuICBjbG9zaW5nT2JzZXJ2ZXI/OiBOZXh0T2JzZXJ2ZXI8dm9pZD47XG4gIC8qKlxuICAgKiBBIFdlYlNvY2tldCBjb25zdHJ1Y3RvciB0byB1c2UuIFRoaXMgaXMgdXNlZnVsIGZvciBzaXR1YXRpb25zIGxpa2UgdXNpbmcgYVxuICAgKiBXZWJTb2NrZXQgaW1wbCBpbiBOb2RlIChXZWJTb2NrZXQgaXMgYSBET00gQVBJKSwgb3IgZm9yIG1vY2tpbmcgYSBXZWJTb2NrZXRcbiAgICogZm9yIHRlc3RpbmcgcHVycG9zZXNcbiAgICovXG4gIFdlYlNvY2tldEN0b3I/OiB7IG5ldyh1cmw6IHN0cmluZywgcHJvdG9jb2xzPzogc3RyaW5nfHN0cmluZ1tdKTogV2ViU29ja2V0IH07XG4gIC8qKiBTZXRzIHRoZSBgYmluYXJ5VHlwZWAgcHJvcGVydHkgb2YgdGhlIHVuZGVybHlpbmcgV2ViU29ja2V0LiAqL1xuICBiaW5hcnlUeXBlPzogJ2Jsb2InIHwgJ2FycmF5YnVmZmVyJztcbn1cblxuY29uc3QgREVGQVVMVF9XRUJTT0NLRVRfQ09ORklHOiBXZWJTb2NrZXRTdWJqZWN0Q29uZmlnPGFueT4gPSB7XG4gIHVybDogJycsXG4gIGRlc2VyaWFsaXplcjogKGU6IE1lc3NhZ2VFdmVudCkgPT4gSlNPTi5wYXJzZShlLmRhdGEpLFxuICBzZXJpYWxpemVyOiAodmFsdWU6IGFueSkgPT4gSlNPTi5zdHJpbmdpZnkodmFsdWUpLFxufTtcblxuY29uc3QgV0VCU09DS0VUU1VCSkVDVF9JTlZBTElEX0VSUk9SX09CSkVDVCA9XG4gICdXZWJTb2NrZXRTdWJqZWN0LmVycm9yIG11c3QgYmUgY2FsbGVkIHdpdGggYW4gb2JqZWN0IHdpdGggYW4gZXJyb3IgY29kZSwgYW5kIGFuIG9wdGlvbmFsIHJlYXNvbjogeyBjb2RlOiBudW1iZXIsIHJlYXNvbjogc3RyaW5nIH0nO1xuXG5leHBvcnQgdHlwZSBXZWJTb2NrZXRNZXNzYWdlID0gc3RyaW5nIHwgQXJyYXlCdWZmZXIgfCBCbG9iIHwgQXJyYXlCdWZmZXJWaWV3O1xuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqIEBoaWRlIHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIFdlYlNvY2tldFN1YmplY3Q8VD4gZXh0ZW5kcyBBbm9ueW1vdXNTdWJqZWN0PFQ+IHtcblxuICBwcml2YXRlIF9jb25maWc6IFdlYlNvY2tldFN1YmplY3RDb25maWc8VD47XG5cbiAgLyoqIEBkZXByZWNhdGVkIFRoaXMgaXMgYW4gaW50ZXJuYWwgaW1wbGVtZW50YXRpb24gZGV0YWlsLCBkbyBub3QgdXNlLiAqL1xuICBfb3V0cHV0OiBTdWJqZWN0PFQ+O1xuXG4gIHByaXZhdGUgX3NvY2tldDogV2ViU29ja2V0O1xuXG4gIGNvbnN0cnVjdG9yKHVybENvbmZpZ09yU291cmNlOiBzdHJpbmcgfCBXZWJTb2NrZXRTdWJqZWN0Q29uZmlnPFQ+IHwgT2JzZXJ2YWJsZTxUPiwgZGVzdGluYXRpb24/OiBPYnNlcnZlcjxUPikge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKHVybENvbmZpZ09yU291cmNlIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uO1xuICAgICAgdGhpcy5zb3VyY2UgPSB1cmxDb25maWdPclNvdXJjZSBhcyBPYnNlcnZhYmxlPFQ+O1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb25maWcgPSB0aGlzLl9jb25maWcgPSB7IC4uLkRFRkFVTFRfV0VCU09DS0VUX0NPTkZJRyB9O1xuICAgICAgdGhpcy5fb3V0cHV0ID0gbmV3IFN1YmplY3Q8VD4oKTtcbiAgICAgIGlmICh0eXBlb2YgdXJsQ29uZmlnT3JTb3VyY2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbmZpZy51cmwgPSB1cmxDb25maWdPclNvdXJjZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiB1cmxDb25maWdPclNvdXJjZSkge1xuICAgICAgICAgIGlmICh1cmxDb25maWdPclNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICBjb25maWdba2V5XSA9IHVybENvbmZpZ09yU291cmNlW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghY29uZmlnLldlYlNvY2tldEN0b3IgJiYgV2ViU29ja2V0KSB7XG4gICAgICAgIGNvbmZpZy5XZWJTb2NrZXRDdG9yID0gV2ViU29ja2V0O1xuICAgICAgfSBlbHNlIGlmICghY29uZmlnLldlYlNvY2tldEN0b3IpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBXZWJTb2NrZXQgY29uc3RydWN0b3IgY2FuIGJlIGZvdW5kJyk7XG4gICAgICB9XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uID0gbmV3IFJlcGxheVN1YmplY3QoKTtcbiAgICB9XG4gIH1cblxuICBsaWZ0PFI+KG9wZXJhdG9yOiBPcGVyYXRvcjxULCBSPik6IFdlYlNvY2tldFN1YmplY3Q8Uj4ge1xuICAgIGNvbnN0IHNvY2sgPSBuZXcgV2ViU29ja2V0U3ViamVjdDxSPih0aGlzLl9jb25maWcgYXMgV2ViU29ja2V0U3ViamVjdENvbmZpZzxhbnk+LCA8YW55PiB0aGlzLmRlc3RpbmF0aW9uKTtcbiAgICBzb2NrLm9wZXJhdG9yID0gb3BlcmF0b3I7XG4gICAgc29jay5zb3VyY2UgPSB0aGlzO1xuICAgIHJldHVybiBzb2NrO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVzZXRTdGF0ZSgpIHtcbiAgICB0aGlzLl9zb2NrZXQgPSBudWxsO1xuICAgIGlmICghdGhpcy5zb3VyY2UpIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24gPSBuZXcgUmVwbGF5U3ViamVjdCgpO1xuICAgIH1cbiAgICB0aGlzLl9vdXRwdXQgPSBuZXcgU3ViamVjdDxUPigpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4ge0BsaW5rIE9ic2VydmFibGV9LCB0aGF0IHdoZW4gc3Vic2NyaWJlZCB0bywgc2VuZHMgYSBtZXNzYWdlLFxuICAgKiBkZWZpbmVkIGJ5IHRoZSBgc3ViTXNnYCBmdW5jdGlvbiwgdG8gdGhlIHNlcnZlciBvdmVyIHRoZSBzb2NrZXQgdG8gYmVnaW4gYVxuICAgKiBzdWJzY3JpcHRpb24gdG8gZGF0YSBvdmVyIHRoYXQgc29ja2V0LiBPbmNlIGRhdGEgYXJyaXZlcywgdGhlXG4gICAqIGBtZXNzYWdlRmlsdGVyYCBhcmd1bWVudCB3aWxsIGJlIHVzZWQgdG8gc2VsZWN0IHRoZSBhcHByb3ByaWF0ZSBkYXRhIGZvclxuICAgKiB0aGUgcmVzdWx0aW5nIE9ic2VydmFibGUuIFdoZW4gdGVhcmRvd24gb2NjdXJzLCBlaXRoZXIgZHVlIHRvXG4gICAqIHVuc3Vic2NyaXB0aW9uLCBjb21wbGV0aW9uIG9yIGVycm9yLCBhIG1lc3NhZ2UgZGVmaW5lZCBieSB0aGUgYHVuc3ViTXNnYFxuICAgKiBhcmd1bWVudCB3aWxsIGJlIHNlbmQgdG8gdGhlIHNlcnZlciBvdmVyIHRoZSBXZWJTb2NrZXRTdWJqZWN0LlxuICAgKlxuICAgKiBAcGFyYW0gc3ViTXNnIEEgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgdGhlIHN1YnNjcmlwdGlvbiBtZXNzYWdlIHRvIGJlIHNlbnQgdG9cbiAgICogdGhlIHNlcnZlci4gVGhpcyB3aWxsIHN0aWxsIGJlIHByb2Nlc3NlZCBieSB0aGUgc2VyaWFsaXplciBpbiB0aGVcbiAgICogV2ViU29ja2V0U3ViamVjdCdzIGNvbmZpZy4gKFdoaWNoIGRlZmF1bHRzIHRvIEpTT04gc2VyaWFsaXphdGlvbilcbiAgICogQHBhcmFtIHVuc3ViTXNnIEEgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgdGhlIHVuc3Vic2NyaXB0aW9uIG1lc3NhZ2UgdG8gYmVcbiAgICogc2VudCB0byB0aGUgc2VydmVyIGF0IHRlYXJkb3duLiBUaGlzIHdpbGwgc3RpbGwgYmUgcHJvY2Vzc2VkIGJ5IHRoZVxuICAgKiBzZXJpYWxpemVyIGluIHRoZSBXZWJTb2NrZXRTdWJqZWN0J3MgY29uZmlnLlxuICAgKiBAcGFyYW0gbWVzc2FnZUZpbHRlciBBIHByZWRpY2F0ZSBmb3Igc2VsZWN0aW5nIHRoZSBhcHByb3ByaWF0ZSBtZXNzYWdlc1xuICAgKiBmcm9tIHRoZSBzZXJ2ZXIgZm9yIHRoZSBvdXRwdXQgc3RyZWFtLlxuICAgKi9cbiAgbXVsdGlwbGV4KHN1Yk1zZzogKCkgPT4gYW55LCB1bnN1Yk1zZzogKCkgPT4gYW55LCBtZXNzYWdlRmlsdGVyOiAodmFsdWU6IFQpID0+IGJvb2xlYW4pIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBPYnNlcnZlcjxhbnk+KSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSB0cnlDYXRjaChzdWJNc2cpKCk7XG4gICAgICBpZiAocmVzdWx0ID09PSBlcnJvck9iamVjdCkge1xuICAgICAgICBvYnNlcnZlci5lcnJvcihlcnJvck9iamVjdC5lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYubmV4dChyZXN1bHQpO1xuICAgICAgfVxuXG4gICAgICBsZXQgc3Vic2NyaXB0aW9uID0gc2VsZi5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRyeUNhdGNoKG1lc3NhZ2VGaWx0ZXIpKHgpO1xuICAgICAgICBpZiAocmVzdWx0ID09PSBlcnJvck9iamVjdCkge1xuICAgICAgICAgIG9ic2VydmVyLmVycm9yKGVycm9yT2JqZWN0LmUpO1xuICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIG9ic2VydmVyLm5leHQoeCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAgIGVyciA9PiBvYnNlcnZlci5lcnJvcihlcnIpLFxuICAgICAgICAoKSA9PiBvYnNlcnZlci5jb21wbGV0ZSgpKTtcblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdHJ5Q2F0Y2godW5zdWJNc2cpKCk7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZXJyb3JPYmplY3QuZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZi5uZXh0KHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29ubmVjdFNvY2tldCgpIHtcbiAgICBjb25zdCB7IFdlYlNvY2tldEN0b3IsIHByb3RvY29sLCB1cmwsIGJpbmFyeVR5cGUgfSA9IHRoaXMuX2NvbmZpZztcbiAgICBjb25zdCBvYnNlcnZlciA9IHRoaXMuX291dHB1dDtcblxuICAgIGxldCBzb2NrZXQ6IFdlYlNvY2tldCA9IG51bGw7XG4gICAgdHJ5IHtcbiAgICAgIHNvY2tldCA9IHByb3RvY29sID9cbiAgICAgICAgbmV3IFdlYlNvY2tldEN0b3IodXJsLCBwcm90b2NvbCkgOlxuICAgICAgICBuZXcgV2ViU29ja2V0Q3Rvcih1cmwpO1xuICAgICAgdGhpcy5fc29ja2V0ID0gc29ja2V0O1xuICAgICAgaWYgKGJpbmFyeVR5cGUpIHtcbiAgICAgICAgdGhpcy5fc29ja2V0LmJpbmFyeVR5cGUgPSBiaW5hcnlUeXBlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIG9ic2VydmVyLmVycm9yKGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKCkgPT4ge1xuICAgICAgdGhpcy5fc29ja2V0ID0gbnVsbDtcbiAgICAgIGlmIChzb2NrZXQgJiYgc29ja2V0LnJlYWR5U3RhdGUgPT09IDEpIHtcbiAgICAgICAgc29ja2V0LmNsb3NlKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBzb2NrZXQub25vcGVuID0gKGU6IEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB7IG9wZW5PYnNlcnZlciB9ID0gdGhpcy5fY29uZmlnO1xuICAgICAgaWYgKG9wZW5PYnNlcnZlcikge1xuICAgICAgICBvcGVuT2JzZXJ2ZXIubmV4dChlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcXVldWUgPSB0aGlzLmRlc3RpbmF0aW9uO1xuXG4gICAgICB0aGlzLmRlc3RpbmF0aW9uID0gU3Vic2NyaWJlci5jcmVhdGU8VD4oXG4gICAgICAgICh4KSA9PiB7XG4gICAgICAgICAgaWYgKHNvY2tldC5yZWFkeVN0YXRlID09PSAxKSB7XG4gICAgICAgICAgICBjb25zdCB7IHNlcmlhbGl6ZXIgfSA9IHRoaXMuX2NvbmZpZztcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IHRyeUNhdGNoKHNlcmlhbGl6ZXIpKHgpO1xuICAgICAgICAgICAgaWYgKG1zZyA9PT0gZXJyb3JPYmplY3QpIHtcbiAgICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnJvck9iamVjdC5lKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc29ja2V0LnNlbmQobXNnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIChlKSA9PiB7XG4gICAgICAgICAgY29uc3QgeyBjbG9zaW5nT2JzZXJ2ZXIgfSA9IHRoaXMuX2NvbmZpZztcbiAgICAgICAgICBpZiAoY2xvc2luZ09ic2VydmVyKSB7XG4gICAgICAgICAgICBjbG9zaW5nT2JzZXJ2ZXIubmV4dCh1bmRlZmluZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZSAmJiBlLmNvZGUpIHtcbiAgICAgICAgICAgIHNvY2tldC5jbG9zZShlLmNvZGUsIGUucmVhc29uKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IobmV3IFR5cGVFcnJvcihXRUJTT0NLRVRTVUJKRUNUX0lOVkFMSURfRVJST1JfT0JKRUNUKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX3Jlc2V0U3RhdGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgY2xvc2luZ09ic2VydmVyIH0gPSB0aGlzLl9jb25maWc7XG4gICAgICAgICAgaWYgKGNsb3NpbmdPYnNlcnZlcikge1xuICAgICAgICAgICAgY2xvc2luZ09ic2VydmVyLm5leHQodW5kZWZpbmVkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc29ja2V0LmNsb3NlKCk7XG4gICAgICAgICAgdGhpcy5fcmVzZXRTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgICApIGFzIFN1YnNjcmliZXI8YW55PjtcblxuICAgICAgaWYgKHF1ZXVlICYmIHF1ZXVlIGluc3RhbmNlb2YgUmVwbGF5U3ViamVjdCkge1xuICAgICAgICBzdWJzY3JpcHRpb24uYWRkKCg8UmVwbGF5U3ViamVjdDxUPj5xdWV1ZSkuc3Vic2NyaWJlKHRoaXMuZGVzdGluYXRpb24pKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc29ja2V0Lm9uZXJyb3IgPSAoZTogRXZlbnQpID0+IHtcbiAgICAgIHRoaXMuX3Jlc2V0U3RhdGUoKTtcbiAgICAgIG9ic2VydmVyLmVycm9yKGUpO1xuICAgIH07XG5cbiAgICBzb2NrZXQub25jbG9zZSA9IChlOiBDbG9zZUV2ZW50KSA9PiB7XG4gICAgICB0aGlzLl9yZXNldFN0YXRlKCk7XG4gICAgICBjb25zdCB7IGNsb3NlT2JzZXJ2ZXIgfSA9IHRoaXMuX2NvbmZpZztcbiAgICAgIGlmIChjbG9zZU9ic2VydmVyKSB7XG4gICAgICAgIGNsb3NlT2JzZXJ2ZXIubmV4dChlKTtcbiAgICAgIH1cbiAgICAgIGlmIChlLndhc0NsZWFuKSB7XG4gICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYnNlcnZlci5lcnJvcihlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc29ja2V0Lm9ubWVzc2FnZSA9IChlOiBNZXNzYWdlRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHsgZGVzZXJpYWxpemVyIH0gPSB0aGlzLl9jb25maWc7XG4gICAgICBjb25zdCByZXN1bHQgPSB0cnlDYXRjaChkZXNlcmlhbGl6ZXIpKGUpO1xuICAgICAgaWYgKHJlc3VsdCA9PT0gZXJyb3JPYmplY3QpIHtcbiAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZXJyb3JPYmplY3QuZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYnNlcnZlci5uZXh0KHJlc3VsdCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qKiBAZGVwcmVjYXRlZCBUaGlzIGlzIGFuIGludGVybmFsIGltcGxlbWVudGF0aW9uIGRldGFpbCwgZG8gbm90IHVzZS4gKi9cbiAgX3N1YnNjcmliZShzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+KTogU3Vic2NyaXB0aW9uIHtcbiAgICBjb25zdCB7IHNvdXJjZSB9ID0gdGhpcztcbiAgICBpZiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLl9zb2NrZXQpIHtcbiAgICAgIHRoaXMuX2Nvbm5lY3RTb2NrZXQoKTtcbiAgICB9XG4gICAgdGhpcy5fb3V0cHV0LnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICBzdWJzY3JpYmVyLmFkZCgoKSA9PiB7XG4gICAgICBjb25zdCB7IF9zb2NrZXQgfSA9IHRoaXM7XG4gICAgICBpZiAodGhpcy5fb3V0cHV0Lm9ic2VydmVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaWYgKF9zb2NrZXQgJiYgX3NvY2tldC5yZWFkeVN0YXRlID09PSAxKSB7XG4gICAgICAgICAgX3NvY2tldC5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Jlc2V0U3RhdGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gc3Vic2NyaWJlcjtcbiAgfVxuXG4gIHVuc3Vic2NyaWJlKCkge1xuICAgIGNvbnN0IHsgc291cmNlLCBfc29ja2V0IH0gPSB0aGlzO1xuICAgIGlmIChfc29ja2V0ICYmIF9zb2NrZXQucmVhZHlTdGF0ZSA9PT0gMSkge1xuICAgICAgX3NvY2tldC5jbG9zZSgpO1xuICAgICAgdGhpcy5fcmVzZXRTdGF0ZSgpO1xuICAgIH1cbiAgICBzdXBlci51bnN1YnNjcmliZSgpO1xuICAgIGlmICghc291cmNlKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uID0gbmV3IFJlcGxheVN1YmplY3QoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==