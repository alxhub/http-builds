/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { RequestOptions } from './base_request_options';
import { RequestMethod } from './enums';
import { ConnectionBackend } from './interfaces';
import { Request } from './static_request';
function httpRequest(backend, request) {
    return backend.createConnection(request).response;
}
function mergeOptions(defaultOpts, providedOpts, method, url) {
    var newOptions = defaultOpts;
    if (providedOpts) {
        // Hack so Dart can used named parameters
        return newOptions.merge(new RequestOptions({
            method: providedOpts.method || method,
            url: providedOpts.url || url,
            search: providedOpts.search,
            params: providedOpts.params,
            headers: providedOpts.headers,
            body: providedOpts.body,
            withCredentials: providedOpts.withCredentials,
            responseType: providedOpts.responseType
        }));
    }
    return newOptions.merge(new RequestOptions({ method: method, url: url }));
}
/**
 * Performs http requests using `XMLHttpRequest` as the default backend.
 *
 * `Http` is available as an injectable class, with methods to perform http requests. Calling
 * `request` returns an `Observable` which will emit a single {@link Response} when a
 * response is received.
 *
 * ### Example
 *
 * ```typescript
 * import {Http, HTTP_PROVIDERS} from '@angular/http';
 * import {map} from 'rxjs/operators';
 *
 * @Component({
 *   selector: 'http-app',
 *   viewProviders: [HTTP_PROVIDERS],
 *   templateUrl: 'people.html'
 * })
 * class PeopleComponent {
 *   constructor(http: Http) {
 *     http.get('people.json')
 *       // Call map on the response observable to get the parsed people object
 *       .pipe(map(res => res.json()))
 *       // Subscribe to the observable to get the parsed people object and attach it to the
 *       // component
 *       .subscribe(people => this.people = people);
 *   }
 * }
 * ```
 *
 *
 * ### Example
 *
 * ```
 * http.get('people.json').subscribe((res:Response) => this.people = res.json());
 * ```
 *
 * The default construct used to perform requests, `XMLHttpRequest`, is abstracted as a "Backend" (
 * {@link XHRBackend} in this case), which could be mocked with dependency injection by replacing
 * the {@link XHRBackend} provider, as in the following example:
 *
 * ### Example
 *
 * ```typescript
 * import {BaseRequestOptions, Http} from '@angular/http';
 * import {MockBackend} from '@angular/http/testing';
 * var injector = Injector.resolveAndCreate([
 *   BaseRequestOptions,
 *   MockBackend,
 *   {provide: Http, useFactory:
 *       function(backend, defaultOptions) {
 *         return new Http(backend, defaultOptions);
 *       },
 *       deps: [MockBackend, BaseRequestOptions]}
 * ]);
 * var http = injector.get(Http);
 * http.get('request-from-mock-backend.json').subscribe((res:Response) => doSomething(res));
 * ```
 *
 * @deprecated see https://angular.io/guide/http
 */
var Http = /** @class */ (function () {
    function Http(_backend, _defaultOptions) {
        this._backend = _backend;
        this._defaultOptions = _defaultOptions;
    }
    /**
     * Performs any type of http request. First argument is required, and can either be a url or
     * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
     * object can be provided as the 2nd argument. The options object will be merged with the values
     * of {@link BaseRequestOptions} before performing the request.
     */
    /**
       * Performs any type of http request. First argument is required, and can either be a url or
       * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
       * object can be provided as the 2nd argument. The options object will be merged with the values
       * of {@link BaseRequestOptions} before performing the request.
       */
    Http.prototype.request = /**
       * Performs any type of http request. First argument is required, and can either be a url or
       * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
       * object can be provided as the 2nd argument. The options object will be merged with the values
       * of {@link BaseRequestOptions} before performing the request.
       */
    function (url, options) {
        var responseObservable;
        if (typeof url === 'string') {
            responseObservable = httpRequest(this._backend, new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Get, url)));
        }
        else if (url instanceof Request) {
            responseObservable = httpRequest(this._backend, url);
        }
        else {
            throw new Error('First argument must be a url string or Request instance.');
        }
        return responseObservable;
    };
    /**
     * Performs a request with `get` http method.
     */
    /**
       * Performs a request with `get` http method.
       */
    Http.prototype.get = /**
       * Performs a request with `get` http method.
       */
    function (url, options) {
        return this.request(new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Get, url)));
    };
    /**
     * Performs a request with `post` http method.
     */
    /**
       * Performs a request with `post` http method.
       */
    Http.prototype.post = /**
       * Performs a request with `post` http method.
       */
    function (url, body, options) {
        return this.request(new Request(mergeOptions(this._defaultOptions.merge(new RequestOptions({ body: body })), options, RequestMethod.Post, url)));
    };
    /**
     * Performs a request with `put` http method.
     */
    /**
       * Performs a request with `put` http method.
       */
    Http.prototype.put = /**
       * Performs a request with `put` http method.
       */
    function (url, body, options) {
        return this.request(new Request(mergeOptions(this._defaultOptions.merge(new RequestOptions({ body: body })), options, RequestMethod.Put, url)));
    };
    /**
     * Performs a request with `delete` http method.
     */
    /**
       * Performs a request with `delete` http method.
       */
    Http.prototype.delete = /**
       * Performs a request with `delete` http method.
       */
    function (url, options) {
        return this.request(new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Delete, url)));
    };
    /**
     * Performs a request with `patch` http method.
     */
    /**
       * Performs a request with `patch` http method.
       */
    Http.prototype.patch = /**
       * Performs a request with `patch` http method.
       */
    function (url, body, options) {
        return this.request(new Request(mergeOptions(this._defaultOptions.merge(new RequestOptions({ body: body })), options, RequestMethod.Patch, url)));
    };
    /**
     * Performs a request with `head` http method.
     */
    /**
       * Performs a request with `head` http method.
       */
    Http.prototype.head = /**
       * Performs a request with `head` http method.
       */
    function (url, options) {
        return this.request(new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Head, url)));
    };
    /**
     * Performs a request with `options` http method.
     */
    /**
       * Performs a request with `options` http method.
       */
    Http.prototype.options = /**
       * Performs a request with `options` http method.
       */
    function (url, options) {
        return this.request(new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Options, url)));
    };
    Http.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Http.ctorParameters = function () { return [
        { type: ConnectionBackend, },
        { type: RequestOptions, },
    ]; };
    return Http;
}());
export { Http };
/**
 * @deprecated see https://angular.io/guide/http
 */
var Jsonp = /** @class */ (function (_super) {
    tslib_1.__extends(Jsonp, _super);
    function Jsonp(backend, defaultOptions) {
        return _super.call(this, backend, defaultOptions) || this;
    }
    /**
     * Performs any type of http request. First argument is required, and can either be a url or
     * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
     * object can be provided as the 2nd argument. The options object will be merged with the values
     * of {@link BaseRequestOptions} before performing the request.
     *
     * @security Regular XHR is the safest alternative to JSONP for most applications, and is
     * supported by all current browsers. Because JSONP creates a `<script>` element with
     * contents retrieved from a remote source, attacker-controlled data introduced by an untrusted
     * source could expose your application to XSS risks. Data exposed by JSONP may also be
     * readable by malicious third-party websites. In addition, JSONP introduces potential risk for
     * future security issues (e.g. content sniffing).  For more detail, see the
     * [Security Guide](http://g.co/ng/security).
     */
    /**
       * Performs any type of http request. First argument is required, and can either be a url or
       * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
       * object can be provided as the 2nd argument. The options object will be merged with the values
       * of {@link BaseRequestOptions} before performing the request.
       *
       * @security Regular XHR is the safest alternative to JSONP for most applications, and is
       * supported by all current browsers. Because JSONP creates a `<script>` element with
       * contents retrieved from a remote source, attacker-controlled data introduced by an untrusted
       * source could expose your application to XSS risks. Data exposed by JSONP may also be
       * readable by malicious third-party websites. In addition, JSONP introduces potential risk for
       * future security issues (e.g. content sniffing).  For more detail, see the
       * [Security Guide](http://g.co/ng/security).
       */
    Jsonp.prototype.request = /**
       * Performs any type of http request. First argument is required, and can either be a url or
       * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
       * object can be provided as the 2nd argument. The options object will be merged with the values
       * of {@link BaseRequestOptions} before performing the request.
       *
       * @security Regular XHR is the safest alternative to JSONP for most applications, and is
       * supported by all current browsers. Because JSONP creates a `<script>` element with
       * contents retrieved from a remote source, attacker-controlled data introduced by an untrusted
       * source could expose your application to XSS risks. Data exposed by JSONP may also be
       * readable by malicious third-party websites. In addition, JSONP introduces potential risk for
       * future security issues (e.g. content sniffing).  For more detail, see the
       * [Security Guide](http://g.co/ng/security).
       */
    function (url, options) {
        var responseObservable;
        if (typeof url === 'string') {
            url =
                new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Get, url));
        }
        if (url instanceof Request) {
            if (url.method !== RequestMethod.Get) {
                throw new Error('JSONP requests must use GET request method.');
            }
            responseObservable = httpRequest(this._backend, url);
        }
        else {
            throw new Error('First argument must be a url string or Request instance.');
        }
        return responseObservable;
    };
    Jsonp.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Jsonp.ctorParameters = function () { return [
        { type: ConnectionBackend, },
        { type: RequestOptions, },
    ]; };
    return Jsonp;
}(Http));
export { Jsonp };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2h0dHAvc3JjL2h0dHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBR3pDLE9BQU8sRUFBcUIsY0FBYyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDMUUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUN0QyxPQUFPLEVBQUMsaUJBQWlCLEVBQWtDLE1BQU0sY0FBYyxDQUFDO0FBQ2hGLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUd6QyxxQkFBcUIsT0FBMEIsRUFBRSxPQUFnQjtJQUMvRCxPQUFPLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUM7Q0FDbkQ7QUFFRCxzQkFDSSxXQUErQixFQUFFLFlBQTRDLEVBQzdFLE1BQXFCLEVBQUUsR0FBVztJQUNwQyxJQUFNLFVBQVUsR0FBRyxXQUFXLENBQUM7SUFDL0IsSUFBSSxZQUFZLEVBQUU7O1FBRWhCLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLGNBQWMsQ0FBQztZQUN6QyxNQUFNLEVBQUUsWUFBWSxDQUFDLE1BQU0sSUFBSSxNQUFNO1lBQ3JDLEdBQUcsRUFBRSxZQUFZLENBQUMsR0FBRyxJQUFJLEdBQUc7WUFDNUIsTUFBTSxFQUFFLFlBQVksQ0FBQyxNQUFNO1lBQzNCLE1BQU0sRUFBRSxZQUFZLENBQUMsTUFBTTtZQUMzQixPQUFPLEVBQUUsWUFBWSxDQUFDLE9BQU87WUFDN0IsSUFBSSxFQUFFLFlBQVksQ0FBQyxJQUFJO1lBQ3ZCLGVBQWUsRUFBRSxZQUFZLENBQUMsZUFBZTtZQUM3QyxZQUFZLEVBQUUsWUFBWSxDQUFDLFlBQVk7U0FDeEMsQ0FBQyxDQUFnQixDQUFDO0tBQ3BCO0lBRUQs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QUMxQixJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssYUFBYSxDQUFDLEdBQUcsRUFBRTtnQkFDcEMsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO2FBQ2hFO1lBQ0Qsa0JBQWtCLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDdEQ7YUFBTTtZQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsMERBQTBELENBQUMsQ0FBQztTQUM3RTtRQUNELE9BQU8sa0JBQWtCLENBQUM7S0FDM0I7O2dCQW5DRixVQUFVOzs7O2dCQWxMSCxpQkFBaUI7Z0JBRkcsY0FBYzs7Z0JBWDFDO0VBZ00yQixJQUFJO1NBQWxCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0Jhc2VSZXF1ZXN0T3B0aW9ucywgUmVxdWVzdE9wdGlvbnN9IGZyb20gJy4vYmFzZV9yZXF1ZXN0X29wdGlvbnMnO1xuaW1wb3J0IHtSZXF1ZXN0TWV0aG9kfSBmcm9tICcuL2VudW1zJztcbmltcG9ydCB7Q29ubmVjdGlvbkJhY2tlbmQsIFJlcXVlc3RBcmdzLCBSZXF1ZXN0T3B0aW9uc0FyZ3N9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQge1JlcXVlc3R9IGZyb20gJy4vc3RhdGljX3JlcXVlc3QnO1xuaW1wb3J0IHtSZXNwb25zZX0gZnJvbSAnLi9zdGF0aWNfcmVzcG9uc2UnO1xuXG5mdW5jdGlvbiBodHRwUmVxdWVzdChiYWNrZW5kOiBDb25uZWN0aW9uQmFja2VuZCwgcmVxdWVzdDogUmVxdWVzdCk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgcmV0dXJuIGJhY2tlbmQuY3JlYXRlQ29ubmVjdGlvbihyZXF1ZXN0KS5yZXNwb25zZTtcbn1cblxuZnVuY3Rpb24gbWVyZ2VPcHRpb25zKFxuICAgIGRlZmF1bHRPcHRzOiBCYXNlUmVxdWVzdE9wdGlvbnMsIHByb3ZpZGVkT3B0czogUmVxdWVzdE9wdGlvbnNBcmdzIHwgdW5kZWZpbmVkLFxuICAgIG1ldGhvZDogUmVxdWVzdE1ldGhvZCwgdXJsOiBzdHJpbmcpOiBSZXF1ZXN0QXJncyB7XG4gIGNvbnN0IG5ld09wdGlvbnMgPSBkZWZhdWx0T3B0cztcbiAgaWYgKHByb3ZpZGVkT3B0cykge1xuICAgIC8vIEhhY2sgc28gRGFydCBjYW4gdXNlZCBuYW1lZCBwYXJhbWV0ZXJzXG4gICAgcmV0dXJuIG5ld09wdGlvbnMubWVyZ2UobmV3IFJlcXVlc3RPcHRpb25zKHtcbiAgICAgIG1ldGhvZDogcHJvdmlkZWRPcHRzLm1ldGhvZCB8fCBtZXRob2QsXG4gICAgICB1cmw6IHByb3ZpZGVkT3B0cy51cmwgfHwgdXJsLFxuICAgICAgc2VhcmNoOiBwcm92aWRlZE9wdHMuc2VhcmNoLFxuICAgICAgcGFyYW1zOiBwcm92aWRlZE9wdHMucGFyYW1zLFxuICAgICAgaGVhZGVyczogcHJvdmlkZWRPcHRzLmhlYWRlcnMsXG4gICAgICBib2R5OiBwcm92aWRlZE9wdHMuYm9keSxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogcHJvdmlkZWRPcHRzLndpdGhDcmVkZW50aWFscyxcbiAgICAgIHJlc3BvbnNlVHlwZTogcHJvdmlkZWRPcHRzLnJlc3BvbnNlVHlwZVxuICAgIH0pKSBhcyBSZXF1ZXN0QXJncztcbiAgfVxuXG4gIHJldHVybiBuZXdPcHRpb25zLm1lcmdlKG5ldyBSZXF1ZXN0T3B0aW9ucyh7bWV0aG9kLCB1cmx9KSkgYXMgUmVxdWVzdEFyZ3M7XG59XG5cbi8qKlxuICogUGVyZm9ybXMgaHR0cCByZXF1ZXN0cyB1c2luZyBgWE1MSHR0cFJlcXVlc3RgIGFzIHRoZSBkZWZhdWx0IGJhY2tlbmQuXG4gKlxuICogYEh0dHBgIGlzIGF2YWlsYWJsZSBhcyBhbiBpbmplY3RhYmxlIGNsYXNzLCB3aXRoIG1ldGhvZHMgdG8gcGVyZm9ybSBodHRwIHJlcXVlc3RzLiBDYWxsaW5nXG4gKiBgcmVxdWVzdGAgcmV0dXJucyBhbiBgT2JzZXJ2YWJsZWAgd2hpY2ggd2lsbCBlbWl0IGEgc2luZ2xlIHtAbGluayBSZXNwb25zZX0gd2hlbiBhXG4gKiByZXNwb25zZSBpcyByZWNlaXZlZC5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7SHR0cCwgSFRUUF9QUk9WSURFUlN9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuICogaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6ICdodHRwLWFwcCcsXG4gKiAgIHZpZXdQcm92aWRlcnM6IFtIVFRQX1BST1ZJREVSU10sXG4gKiAgIHRlbXBsYXRlVXJsOiAncGVvcGxlLmh0bWwnXG4gKiB9KVxuICogY2xhc3MgUGVvcGxlQ29tcG9uZW50IHtcbiAqICAgY29uc3RydWN0b3IoaHR0cDogSHR0cCkge1xuICogICAgIGh0dHAuZ2V0KCdwZW9wbGUuanNvbicpXG4gKiAgICAgICAvLyBDYWxsIG1hcCBvbiB0aGUgcmVzcG9uc2Ugb2JzZXJ2YWJsZSB0byBnZXQgdGhlIHBhcnNlZCBwZW9wbGUgb2JqZWN0XG4gKiAgICAgICAucGlwZShtYXAocmVzID0+IHJlcy5qc29uKCkpKVxuICogICAgICAgLy8gU3Vic2NyaWJlIHRvIHRoZSBvYnNlcnZhYmxlIHRvIGdldCB0aGUgcGFyc2VkIHBlb3BsZSBvYmplY3QgYW5kIGF0dGFjaCBpdCB0byB0aGVcbiAqICAgICAgIC8vIGNvbXBvbmVudFxuICogICAgICAgLnN1YnNjcmliZShwZW9wbGUgPT4gdGhpcy5wZW9wbGUgPSBwZW9wbGUpO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBcbiAqIGh0dHAuZ2V0KCdwZW9wbGUuanNvbicpLnN1YnNjcmliZSgocmVzOlJlc3BvbnNlKSA9PiB0aGlzLnBlb3BsZSA9IHJlcy5qc29uKCkpO1xuICogYGBgXG4gKlxuICogVGhlIGRlZmF1bHQgY29uc3RydWN0IHVzZWQgdG8gcGVyZm9ybSByZXF1ZXN0cywgYFhNTEh0dHBSZXF1ZXN0YCwgaXMgYWJzdHJhY3RlZCBhcyBhIFwiQmFja2VuZFwiIChcbiAqIHtAbGluayBYSFJCYWNrZW5kfSBpbiB0aGlzIGNhc2UpLCB3aGljaCBjb3VsZCBiZSBtb2NrZWQgd2l0aCBkZXBlbmRlbmN5IGluamVjdGlvbiBieSByZXBsYWNpbmdcbiAqIHRoZSB7QGxpbmsgWEhSQmFja2VuZH0gcHJvdmlkZXIsIGFzIGluIHRoZSBmb2xsb3dpbmcgZXhhbXBsZTpcbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7QmFzZVJlcXVlc3RPcHRpb25zLCBIdHRwfSBmcm9tICdAYW5ndWxhci9odHRwJztcbiAqIGltcG9ydCB7TW9ja0JhY2tlbmR9IGZyb20gJ0Bhbmd1bGFyL2h0dHAvdGVzdGluZyc7XG4gKiB2YXIgaW5qZWN0b3IgPSBJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKFtcbiAqICAgQmFzZVJlcXVlc3RPcHRpb25zLFxuICogICBNb2NrQmFja2VuZCxcbiAqICAge3Byb3ZpZGU6IEh0dHAsIHVzZUZhY3Rvcnk6XG4gKiAgICAgICBmdW5jdGlvbihiYWNrZW5kLCBkZWZhdWx0T3B0aW9ucykge1xuICogICAgICAgICByZXR1cm4gbmV3IEh0dHAoYmFja2VuZCwgZGVmYXVsdE9wdGlvbnMpO1xuICogICAgICAgfSxcbiAqICAgICAgIGRlcHM6IFtNb2NrQmFja2VuZCwgQmFzZVJlcXVlc3RPcHRpb25zXX1cbiAqIF0pO1xuICogdmFyIGh0dHAgPSBpbmplY3Rvci5nZXQoSHR0cCk7XG4gKiBodHRwLmdldCgncmVxdWVzdC1mcm9tLW1vY2stYmFja2VuZC5qc29uJykuc3Vic2NyaWJlKChyZXM6UmVzcG9uc2UpID0+IGRvU29tZXRoaW5nKHJlcykpO1xuICogYGBgXG4gKlxuICogQGRlcHJlY2F0ZWQgc2VlIGh0dHBzOi8vYW5ndWxhci5pby9ndWlkZS9odHRwXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIdHRwIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9iYWNrZW5kOiBDb25uZWN0aW9uQmFja2VuZCwgcHJvdGVjdGVkIF9kZWZhdWx0T3B0aW9uczogUmVxdWVzdE9wdGlvbnMpIHt9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGFueSB0eXBlIG9mIGh0dHAgcmVxdWVzdC4gRmlyc3QgYXJndW1lbnQgaXMgcmVxdWlyZWQsIGFuZCBjYW4gZWl0aGVyIGJlIGEgdXJsIG9yXG4gICAqIGEge0BsaW5rIFJlcXVlc3R9IGluc3RhbmNlLiBJZiB0aGUgZmlyc3QgYXJndW1lbnQgaXMgYSB1cmwsIGFuIG9wdGlvbmFsIHtAbGluayBSZXF1ZXN0T3B0aW9uc31cbiAgICogb2JqZWN0IGNhbiBiZSBwcm92aWRlZCBhcyB0aGUgMm5kIGFyZ3VtZW50LiBUaGUgb3B0aW9ucyBvYmplY3Qgd2lsbCBiZSBtZXJnZWQgd2l0aCB0aGUgdmFsdWVzXG4gICAqIG9mIHtAbGluayBCYXNlUmVxdWVzdE9wdGlvbnN9IGJlZm9yZSBwZXJmb3JtaW5nIHRoZSByZXF1ZXN0LlxuICAgKi9cbiAgcmVxdWVzdCh1cmw6IHN0cmluZ3xSZXF1ZXN0LCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnNBcmdzKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICAgIGxldCByZXNwb25zZU9ic2VydmFibGU6IGFueTtcbiAgICBpZiAodHlwZW9mIHVybCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJlc3BvbnNlT2JzZXJ2YWJsZSA9IGh0dHBSZXF1ZXN0KFxuICAgICAgICAgIHRoaXMuX2JhY2tlbmQsXG4gICAgICAgICAgbmV3IFJlcXVlc3QobWVyZ2VPcHRpb25zKHRoaXMuX2RlZmF1bHRPcHRpb25zLCBvcHRpb25zLCBSZXF1ZXN0TWV0aG9kLkdldCwgPHN0cmluZz51cmwpKSk7XG4gICAgfSBlbHNlIGlmICh1cmwgaW5zdGFuY2VvZiBSZXF1ZXN0KSB7XG4gICAgICByZXNwb25zZU9ic2VydmFibGUgPSBodHRwUmVxdWVzdCh0aGlzLl9iYWNrZW5kLCB1cmwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSB1cmwgc3RyaW5nIG9yIFJlcXVlc3QgaW5zdGFuY2UuJyk7XG4gICAgfVxuICAgIHJldHVybiByZXNwb25zZU9ic2VydmFibGU7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSByZXF1ZXN0IHdpdGggYGdldGAgaHR0cCBtZXRob2QuXG4gICAqL1xuICBnZXQodXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9uc0FyZ3MpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChcbiAgICAgICAgbmV3IFJlcXVlc3QobWVyZ2VPcHRpb25zKHRoaXMuX2RlZmF1bHRPcHRpb25zLCBvcHRpb25zLCBSZXF1ZXN0TWV0aG9kLkdldCwgdXJsKSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgcmVxdWVzdCB3aXRoIGBwb3N0YCBodHRwIG1ldGhvZC5cbiAgICovXG4gIHBvc3QodXJsOiBzdHJpbmcsIGJvZHk6IGFueSwgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG5ldyBSZXF1ZXN0KG1lcmdlT3B0aW9ucyhcbiAgICAgICAgdGhpcy5fZGVmYXVsdE9wdGlvbnMubWVyZ2UobmV3IFJlcXVlc3RPcHRpb25zKHtib2R5OiBib2R5fSkpLCBvcHRpb25zLCBSZXF1ZXN0TWV0aG9kLlBvc3QsXG4gICAgICAgIHVybCkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIHJlcXVlc3Qgd2l0aCBgcHV0YCBodHRwIG1ldGhvZC5cbiAgICovXG4gIHB1dCh1cmw6IHN0cmluZywgYm9keTogYW55LCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnNBcmdzKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobmV3IFJlcXVlc3QobWVyZ2VPcHRpb25zKFxuICAgICAgICB0aGlzLl9kZWZhdWx0T3B0aW9ucy5tZXJnZShuZXcgUmVxdWVzdE9wdGlvbnMoe2JvZHk6IGJvZHl9KSksIG9wdGlvbnMsIFJlcXVlc3RNZXRob2QuUHV0LFxuICAgICAgICB1cmwpKSk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSByZXF1ZXN0IHdpdGggYGRlbGV0ZWAgaHR0cCBtZXRob2QuXG4gICAqL1xuICBkZWxldGUgKHVybDogc3RyaW5nLCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnNBcmdzKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXG4gICAgICAgIG5ldyBSZXF1ZXN0KG1lcmdlT3B0aW9ucyh0aGlzLl9kZWZhdWx0T3B0aW9ucywgb3B0aW9ucywgUmVxdWVzdE1ldGhvZC5EZWxldGUsIHVybCkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIHJlcXVlc3Qgd2l0aCBgcGF0Y2hgIGh0dHAgbWV0aG9kLlxuICAgKi9cbiAgcGF0Y2godXJsOiBzdHJpbmcsIGJvZHk6IGFueSwgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG5ldyBSZXF1ZXN0KG1lcmdlT3B0aW9ucyhcbiAgICAgICAgdGhpcy5fZGVmYXVsdE9wdGlvbnMubWVyZ2UobmV3IFJlcXVlc3RPcHRpb25zKHtib2R5OiBib2R5fSkpLCBvcHRpb25zLCBSZXF1ZXN0TWV0aG9kLlBhdGNoLFxuICAgICAgICB1cmwpKSk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSByZXF1ZXN0IHdpdGggYGhlYWRgIGh0dHAgbWV0aG9kLlxuICAgKi9cbiAgaGVhZCh1cmw6IHN0cmluZywgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFxuICAgICAgICBuZXcgUmVxdWVzdChtZXJnZU9wdGlvbnModGhpcy5fZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMsIFJlcXVlc3RNZXRob2QuSGVhZCwgdXJsKSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgcmVxdWVzdCB3aXRoIGBvcHRpb25zYCBodHRwIG1ldGhvZC5cbiAgICovXG4gIG9wdGlvbnModXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9uc0FyZ3MpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChcbiAgICAgICAgbmV3IFJlcXVlc3QobWVyZ2VPcHRpb25zKHRoaXMuX2RlZmF1bHRPcHRpb25zLCBvcHRpb25zLCBSZXF1ZXN0TWV0aG9kLk9wdGlvbnMsIHVybCkpKTtcbiAgfVxufVxuXG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgc2VlIGh0dHBzOi8vYW5ndWxhci5pby9ndWlkZS9odHRwXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKc29ucCBleHRlbmRzIEh0dHAge1xuICBjb25zdHJ1Y3RvcihiYWNrZW5kOiBDb25uZWN0aW9uQmFja2VuZCwgZGVmYXVsdE9wdGlvbnM6IFJlcXVlc3RPcHRpb25zKSB7XG4gICAgc3VwZXIoYmFja2VuZCwgZGVmYXVsdE9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGFueSB0eXBlIG9mIGh0dHAgcmVxdWVzdC4gRmlyc3QgYXJndW1lbnQgaXMgcmVxdWlyZWQsIGFuZCBjYW4gZWl0aGVyIGJlIGEgdXJsIG9yXG4gICAqIGEge0BsaW5rIFJlcXVlc3R9IGluc3RhbmNlLiBJZiB0aGUgZmlyc3QgYXJndW1lbnQgaXMgYSB1cmwsIGFuIG9wdGlvbmFsIHtAbGluayBSZXF1ZXN0T3B0aW9uc31cbiAgICogb2JqZWN0IGNhbiBiZSBwcm92aWRlZCBhcyB0aGUgMm5kIGFyZ3VtZW50LiBUaGUgb3B0aW9ucyBvYmplY3Qgd2lsbCBiZSBtZXJnZWQgd2l0aCB0aGUgdmFsdWVzXG4gICAqIG9mIHtAbGluayBCYXNlUmVxdWVzdE9wdGlvbnN9IGJlZm9yZSBwZXJmb3JtaW5nIHRoZSByZXF1ZXN0LlxuICAgKlxuICAgKiBAc2VjdXJpdHkgUmVndWxhciBYSFIgaXMgdGhlIHNhZmVzdCBhbHRlcm5hdGl2ZSB0byBKU09OUCBmb3IgbW9zdCBhcHBsaWNhdGlvbnMsIGFuZCBpc1xuICAgKiBzdXBwb3J0ZWQgYnkgYWxsIGN1cnJlbnQgYnJvd3NlcnMuIEJlY2F1c2UgSlNPTlAgY3JlYXRlcyBhIGA8c2NyaXB0PmAgZWxlbWVudCB3aXRoXG4gICAqIGNvbnRlbnRzIHJldHJpZXZlZCBmcm9tIGEgcmVtb3RlIHNvdXJjZSwgYXR0YWNrZXItY29udHJvbGxlZCBkYXRhIGludHJvZHVjZWQgYnkgYW4gdW50cnVzdGVkXG4gICAqIHNvdXJjZSBjb3VsZCBleHBvc2UgeW91ciBhcHBsaWNhdGlvbiB0byBYU1Mgcmlza3MuIERhdGEgZXhwb3NlZCBieSBKU09OUCBtYXkgYWxzbyBiZVxuICAgKiByZWFkYWJsZSBieSBtYWxpY2lvdXMgdGhpcmQtcGFydHkgd2Vic2l0ZXMuIEluIGFkZGl0aW9uLCBKU09OUCBpbnRyb2R1Y2VzIHBvdGVudGlhbCByaXNrIGZvclxuICAgKiBmdXR1cmUgc2VjdXJpdHkgaXNzdWVzIChlLmcuIGNvbnRlbnQgc25pZmZpbmcpLiAgRm9yIG1vcmUgZGV0YWlsLCBzZWUgdGhlXG4gICAqIFtTZWN1cml0eSBHdWlkZV0oaHR0cDovL2cuY28vbmcvc2VjdXJpdHkpLlxuICAgKi9cbiAgcmVxdWVzdCh1cmw6IHN0cmluZ3xSZXF1ZXN0LCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnNBcmdzKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICAgIGxldCByZXNwb25zZU9ic2VydmFibGU6IGFueTtcbiAgICBpZiAodHlwZW9mIHVybCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHVybCA9XG4gICAgICAgICAgbmV3IFJlcXVlc3QobWVyZ2VPcHRpb25zKHRoaXMuX2RlZmF1bHRPcHRpb25zLCBvcHRpb25zLCBSZXF1ZXN0TWV0aG9kLkdldCwgPHN0cmluZz51cmwpKTtcbiAgICB9XG4gICAgaWYgKHVybCBpbnN0YW5jZW9mIFJlcXVlc3QpIHtcbiAgICAgIGlmICh1cmwubWV0aG9kICE9PSBSZXF1ZXN0TWV0aG9kLkdldCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0pTT05QIHJlcXVlc3RzIG11c3QgdXNlIEdFVCByZXF1ZXN0IG1ldGhvZC4nKTtcbiAgICAgIH1cbiAgICAgIHJlc3BvbnNlT2JzZXJ2YWJsZSA9IGh0dHBSZXF1ZXN0KHRoaXMuX2JhY2tlbmQsIHVybCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHVybCBzdHJpbmcgb3IgUmVxdWVzdCBpbnN0YW5jZS4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3BvbnNlT2JzZXJ2YWJsZTtcbiAgfVxufVxuIl19