/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Body } from './body';
import { ContentType } from './enums';
import { Headers } from './headers';
import { normalizeMethodName } from './http_utils';
import { URLSearchParams } from './url_search_params';
// TODO(jeffbcross): properly implement body accessors
/**
 * Creates `Request` instances from provided values.
 *
 * The Request's interface is inspired by the Request constructor defined in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#request-class),
 * but is considered a static value whose body can be accessed many times. There are other
 * differences in the implementation, but this is the most significant.
 *
 * `Request` instances are typically created by higher-level classes, like {@link Http} and
 * {@link Jsonp}, but it may occasionally be useful to explicitly create `Request` instances.
 * One such example is when creating services that wrap higher-level services, like {@link Http},
 * where it may be useful to generate a `Request` with arbitrary headers and search params.
 *
 * ```typescript
 * import {Injectable, Injector} from '@angular/core';
 * import {HTTP_PROVIDERS, Http, Request, RequestMethod} from '@angular/http';
 *
 * @Injectable()
 * class AutoAuthenticator {
 *   constructor(public http:Http) {}
 *   request(url:string) {
 *     return this.http.request(new Request({
 *       method: RequestMethod.Get,
 *       url: url,
 *       search: 'password=123'
 *     }));
 *   }
 * }
 *
 * var injector = Injector.resolveAndCreate([HTTP_PROVIDERS, AutoAuthenticator]);
 * var authenticator = injector.get(AutoAuthenticator);
 * authenticator.request('people.json').subscribe(res => {
 *   //URL should have included '?password=123'
 *   console.log('people', res.json());
 * });
 * ```
 *
 * @deprecated see https://angular.io/guide/http
 */
var 
// TODO(jeffbcross): properly implement body accessors
/**
 * Creates `Request` instances from provided values.
 *
 * The Request's interface is inspired by the Request constructor defined in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#request-class),
 * but is considered a static value whose body can be accessed many times. There are other
 * differences in the implementation, but this is the most significant.
 *
 * `Request` instances are typically created by higher-level classes, like {@link Http} and
 * {@link Jsonp}, but it may occasionally be useful to explicitly create `Request` instances.
 * One such example is when creating services that wrap higher-level services, like {@link Http},
 * where it may be useful to generate a `Request` with arbitrary headers and search params.
 *
 * ```typescript
 * import {Injectable, Injector} from '@angular/core';
 * import {HTTP_PROVIDERS, Http, Request, RequestMethod} from '@angular/http';
 *
 * @Injectable()
 * class AutoAuthenticator {
 *   constructor(public http:Http) {}
 *   request(url:string) {
 *     return this.http.request(new Request({
 *       method: RequestMethod.Get,
 *       url: url,
 *       search: 'password=123'
 *     }));
 *   }
 * }
 *
 * var injector = Injector.resolveAndCreate([HTTP_PROVIDERS, AutoAuthenticator]);
 * var authenticator = injector.get(AutoAuthenticator);
 * authenticator.request('people.json').subscribe(res => {
 *   //URL should have included '?password=123'
 *   console.log('people', res.json());
 * });
 * ```
 *
 * @deprecated see https://angular.io/guide/http
 */
Request = /** @class */ (function (_super) {
    tslib_1.__extends(Request, _super);
    function Request(requestOptions) {
        var _this = _super.call(this) || this;
        // TODO: assert that url is present
        var url = requestOptions.url;
        _this.url = (requestOptions.url);
        var paramsArg = requestOptions.params || requestOptions.search;
        if (paramsArg) {
            var params = void 0;
            if (typeof paramsArg === 'object' && !(paramsArg instanceof URLSearchParams)) {
                params = urlEncodeParams(paramsArg).toString();
            }
            else {
                params = paramsArg.toString();
            }
            if (params.length > 0) {
                var prefix = '?';
                if (_this.url.indexOf('?') != -1) {
                    prefix = (_this.url[_this.url.length - 1] == '&') ? '' : '&';
                }
                // TODO: just delete search-query-looking string in url?
                // TODO: just delete search-query-looking string in url?
                _this.url = url + prefix + params;
            }
        }
        _this._body = requestOptions.body;
        _this.method = normalizeMethodName((requestOptions.method));
        // TODO(jeffbcross): implement behavior
        // Defaults to 'omit', consistent with browser
        // TODO(jeffbcross): implement behavior
        // Defaults to 'omit', consistent with browser
        _this.headers = new Headers(requestOptions.headers);
        _this.contentType = _this.detectContentType();
        _this.withCredentials = (requestOptions.withCredentials);
        _this.responseType = (requestOptions.responseType);
        return _this;
    }
    /**
     * Returns the content type enum based on header options.
     */
    /**
       * Returns the content type enum based on header options.
       */
    Request.prototype.detectContentType = /**
       * Returns the content type enum based on header options.
       */
    function () {
        switch (this.headers.get('content-type')) {
            case 'application/json':
                return ContentType.JSON;
            case 'application/x-www-form-urlencoded':
                return ContentType.FORM;
            case 'multipart/form-data':
                return ContentType.FORM_DATA;
            case 'text/plain':
            case 'text/html':
                return ContentType.TEXT;
            case 'application/octet-stream':
                return this._body instanceof ArrayBuffer ? ContentType.ARRAY_BUFFER : ContentType.BLOB;
            default:
                return this.detectContentTypeFromBody();
        }
    };
    /**
     * Returns the content type of request's body based on its type.
     */
    /**
       * Returns the content type of request's body based on its type.
       */
    Request.prototype.detectContentTypeFromBody = /**
       * Returns the content type of request's body based on its type.
       */
    function () {
        if (this._body == null) {
            return ContentType.NONE;
        }
        else if (this._body instanceof URLSearchParams) {
            return ContentType.FORM;
        }
        else if (this._body instanceof FormData) {
            return ContentType.FORM_DATA;
        }
        else if (this._body instanceof Blob) {
            return ContentType.BLOB;
        }
        else if (this._body instanceof ArrayBuffer) {
            return ContentType.ARRAY_BUFFER;
        }
        else if (this._body && typeof this._body === 'object') {
            return ContentType.JSON;
        }
        else {
            return ContentType.TEXT;
        }
    };
    /**
     * Returns the request's body according to its type. If body is undefined, return
     * null.
     */
    /**
       * Returns the request's body according to its type. If body is undefined, return
       * null.
       */
    Request.prototype.getBody = /**
       * Returns the request's body according to its type. If body is undefined, return
       * null.
       */
    function () {
        switch (this.contentType) {
            case ContentType.JSON:
                return this.text();
            case ContentType.FORM:
                return this.text();
            case ContentType.FORM_DATA:
                return this._body;
            case ContentType.TEXT:
                return this.text();
            case ContentType.BLOB:
                return this.blob();
            case ContentType.ARRAY_BUFFER:
                return this.arrayBuffer();
            default:
                return null;
        }
    };
    return Request;
}(Body));
// TODO(jeffbcross): properly implement body accessors
/**
 * Creates `Request` instances from provided values.
 *
 * The Request's interface is inspired by the Request constructor defined in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#request-class),
 * but is considered a static value whose body can be accessed many times. There are other
 * differences in the implementation, but this is the most significant.
 *
 * `Request` instances are typically created by higher-level classes, like {@link Http} and
 * {@link Jsonp}, but it may occasionally be useful to explicitly create `Request` instances.
 * One such example is when creating services that wrap higher-level services, like {@link Http},
 * where it may be useful to generate a `Request` with arbitrary headers and search params.
 *
 * ```typescript
 * import {Injectable, Injector} from '@angular/core';
 * import {HTTP_PROVIDERS, Http, Request, RequestMethod} from '@angular/http';
 *
 * @Injectable()
 * class AutoAuthenticator {
 *   constructor(public http:Http) {}
 *   request(url:string) {
 *     return this.http.request(new Request({
 *       method: RequestMethod.Get,
 *       url: url,
 *       search: 'password=123'
 *     }));
 *   }
 * }
 *
 * var injector = Injector.resolveAndCreate([HTTP_PROVIDERS, AutoAuthenticator]);
 * var authenticator = injector.get(AutoAuthenticator);
 * authenticator.request('people.json').subscribe(res => {
 *   //URL should have included '?password=123'
 *   console.log('people', res.json());
 * });
 * ```
 *
 * @deprecated see https://angular.io/guide/http
 */
export { Request };
function urlEncodeParams(params) {
    var searchParams = new URLSearchParams();
    Object.keys(params).forEach(function (key) {
        var value = params[key];
        if (value && Array.isArray(value)) {
            value.forEach(function (element) { return searchParams.append(key, element.toString()); });
        }
        else {
            searchParams.append(key, value.toString());
        }
    });
    return searchParams;
}
var noop = function () { };
var ɵ0 = noop;
var w = typeof window == 'object' ? window : noop;
var FormData = w /** TODO #9100 */['FormData'] || noop;
var Blob = w /** TODO #9100 */['Blob'] || noop;
export var ArrayBuffer = w /** TODO #9100 */['ArrayBuffer'] || noop;
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljX3JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9odHRwL3NyYy9zdGF0aWNfcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQVFBLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFDLFdBQVcsRUFBcUMsTUFBTSxTQUFTLENBQUM7QUFDeEUsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUNsQyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFakQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJDcEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBNkIsbUNBQUk7SUFpQi9CLGlCQUFZLGNBQTJCO1FBQXZDLFlBQ0UsaUJBQU8sU0E2QlI7O1FBM0JDLElBQU0sR0FBRyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUM7UUFDL0IsS0FBSSxDQUFDLEdBQUcsSUFBRyxjQUFjLENBQUMsR0FBSyxDQUFBLENBQUM7UUFDaEMsSUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLE1BQU0sSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDO1FBQ2pFLElBQUksU0FBUyxFQUFFO1lBQ2IsSUFBSSxNQUFNLFNBQVEsQ0FBQztZQUNuQixJQUFJLE9BQU8sU0FBUyxLQUFLLFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxZQUFZLGVBQWUsQ0FBQyxFQUFFO2dCQUM1RSxNQUFNLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ2hEO2lCQUFNO2dCQUNMLE1BQU0sR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7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NUMsQ0FBNEMsQ0FBQyxDQUFDO1NBQ3hFO2FBQU07WUFDTCxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUM1QztLQUNGLENBQUMsQ0FBQztJQUNILE9BQU8sWUFBWSxDQUFDO0NBQ3JCO0FBRUQsSUFBTSxJQUFJLEdBQUcsZUFBYSxDQUFDOztBQUMzQixJQUFNLENBQUMsR0FBRyxPQUFPLE1BQU0sSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3BELElBQU0sUUFBUSxHQUFJLENBQVEsQ0FBQyxpQkFBa0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUM7QUFDbEUsSUFBTSxJQUFJLEdBQUksQ0FBUSxDQUFDLGlCQUFrQixDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQztBQUMxRCxNQUFNLENBQUMsSUFBTSxXQUFXLEdBQ25CLENBQVEsQ0FBQyxpQkFBa0IsQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Qm9keX0gZnJvbSAnLi9ib2R5JztcbmltcG9ydCB7Q29udGVudFR5cGUsIFJlcXVlc3RNZXRob2QsIFJlc3BvbnNlQ29udGVudFR5cGV9IGZyb20gJy4vZW51bXMnO1xuaW1wb3J0IHtIZWFkZXJzfSBmcm9tICcuL2hlYWRlcnMnO1xuaW1wb3J0IHtub3JtYWxpemVNZXRob2ROYW1lfSBmcm9tICcuL2h0dHBfdXRpbHMnO1xuaW1wb3J0IHtSZXF1ZXN0QXJnc30gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7VVJMU2VhcmNoUGFyYW1zfSBmcm9tICcuL3VybF9zZWFyY2hfcGFyYW1zJztcblxuXG4vLyBUT0RPKGplZmZiY3Jvc3MpOiBwcm9wZXJseSBpbXBsZW1lbnQgYm9keSBhY2Nlc3NvcnNcbi8qKlxuICogQ3JlYXRlcyBgUmVxdWVzdGAgaW5zdGFuY2VzIGZyb20gcHJvdmlkZWQgdmFsdWVzLlxuICpcbiAqIFRoZSBSZXF1ZXN0J3MgaW50ZXJmYWNlIGlzIGluc3BpcmVkIGJ5IHRoZSBSZXF1ZXN0IGNvbnN0cnVjdG9yIGRlZmluZWQgaW4gdGhlIFtGZXRjaFxuICogU3BlY10oaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI3JlcXVlc3QtY2xhc3MpLFxuICogYnV0IGlzIGNvbnNpZGVyZWQgYSBzdGF0aWMgdmFsdWUgd2hvc2UgYm9keSBjYW4gYmUgYWNjZXNzZWQgbWFueSB0aW1lcy4gVGhlcmUgYXJlIG90aGVyXG4gKiBkaWZmZXJlbmNlcyBpbiB0aGUgaW1wbGVtZW50YXRpb24sIGJ1dCB0aGlzIGlzIHRoZSBtb3N0IHNpZ25pZmljYW50LlxuICpcbiAqIGBSZXF1ZXN0YCBpbnN0YW5jZXMgYXJlIHR5cGljYWxseSBjcmVhdGVkIGJ5IGhpZ2hlci1sZXZlbCBjbGFzc2VzLCBsaWtlIHtAbGluayBIdHRwfSBhbmRcbiAqIHtAbGluayBKc29ucH0sIGJ1dCBpdCBtYXkgb2NjYXNpb25hbGx5IGJlIHVzZWZ1bCB0byBleHBsaWNpdGx5IGNyZWF0ZSBgUmVxdWVzdGAgaW5zdGFuY2VzLlxuICogT25lIHN1Y2ggZXhhbXBsZSBpcyB3aGVuIGNyZWF0aW5nIHNlcnZpY2VzIHRoYXQgd3JhcCBoaWdoZXItbGV2ZWwgc2VydmljZXMsIGxpa2Uge0BsaW5rIEh0dHB9LFxuICogd2hlcmUgaXQgbWF5IGJlIHVzZWZ1bCB0byBnZW5lcmF0ZSBhIGBSZXF1ZXN0YCB3aXRoIGFyYml0cmFyeSBoZWFkZXJzIGFuZCBzZWFyY2ggcGFyYW1zLlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0b3J9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICogaW1wb3J0IHtIVFRQX1BST1ZJREVSUywgSHR0cCwgUmVxdWVzdCwgUmVxdWVzdE1ldGhvZH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG4gKlxuICogQEluamVjdGFibGUoKVxuICogY2xhc3MgQXV0b0F1dGhlbnRpY2F0b3Ige1xuICogICBjb25zdHJ1Y3RvcihwdWJsaWMgaHR0cDpIdHRwKSB7fVxuICogICByZXF1ZXN0KHVybDpzdHJpbmcpIHtcbiAqICAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3QobmV3IFJlcXVlc3Qoe1xuICogICAgICAgbWV0aG9kOiBSZXF1ZXN0TWV0aG9kLkdldCxcbiAqICAgICAgIHVybDogdXJsLFxuICogICAgICAgc2VhcmNoOiAncGFzc3dvcmQ9MTIzJ1xuICogICAgIH0pKTtcbiAqICAgfVxuICogfVxuICpcbiAqIHZhciBpbmplY3RvciA9IEluamVjdG9yLnJlc29sdmVBbmRDcmVhdGUoW0hUVFBfUFJPVklERVJTLCBBdXRvQXV0aGVudGljYXRvcl0pO1xuICogdmFyIGF1dGhlbnRpY2F0b3IgPSBpbmplY3Rvci5nZXQoQXV0b0F1dGhlbnRpY2F0b3IpO1xuICogYXV0aGVudGljYXRvci5yZXF1ZXN0KCdwZW9wbGUuanNvbicpLnN1YnNjcmliZShyZXMgPT4ge1xuICogICAvL1VSTCBzaG91bGQgaGF2ZSBpbmNsdWRlZCAnP3Bhc3N3b3JkPTEyMydcbiAqICAgY29uc29sZS5sb2coJ3Blb3BsZScsIHJlcy5qc29uKCkpO1xuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBAZGVwcmVjYXRlZCBzZWUgaHR0cHM6Ly9hbmd1bGFyLmlvL2d1aWRlL2h0dHBcbiAqL1xuZXhwb3J0IGNsYXNzIFJlcXVlc3QgZXh0ZW5kcyBCb2R5IHtcbiAgLyoqXG4gICAqIEh0dHAgbWV0aG9kIHdpdGggd2hpY2ggdG8gcGVyZm9ybSB0aGUgcmVxdWVzdC5cbiAgICovXG4gIG1ldGhvZDogUmVxdWVzdE1ldGhvZDtcbiAgLyoqXG4gICAqIHtAbGluayBIZWFkZXJzfSBpbnN0YW5jZVxuICAgKi9cbiAgaGVhZGVyczogSGVhZGVycztcbiAgLyoqIFVybCBvZiB0aGUgcmVtb3RlIHJlc291cmNlICovXG4gIHVybDogc3RyaW5nO1xuICAvKiogVHlwZSBvZiB0aGUgcmVxdWVzdCBib2R5ICoqL1xuICBwcml2YXRlIGNvbnRlbnRUeXBlOiBDb250ZW50VHlwZTtcbiAgLyoqIEVuYWJsZSB1c2UgY3JlZGVudGlhbHMgKi9cbiAgd2l0aENyZWRlbnRpYWxzOiBib29sZWFuO1xuICAvKiogQnVmZmVyIHRvIHN0b3JlIHRoZSByZXNwb25zZSAqL1xuICByZXNwb25zZVR5cGU6IFJlc3BvbnNlQ29udGVudFR5cGU7XG4gIGNvbnN0cnVjdG9yKHJlcXVlc3RPcHRpb25zOiBSZXF1ZXN0QXJncykge1xuICAgIHN1cGVyKCk7XG4gICAgLy8gVE9ETzogYXNzZXJ0IHRoYXQgdXJsIGlzIHByZXNlbnRcbiAgICBjb25zdCB1cmwgPSByZXF1ZXN0T3B0aW9ucy51cmw7XG4gICAgdGhpcy51cmwgPSByZXF1ZXN0T3B0aW9ucy51cmwgITtcbiAgICBjb25zdCBwYXJhbXNBcmcgPSByZXF1ZXN0T3B0aW9ucy5wYXJhbXMgfHwgcmVxdWVzdE9wdGlvbnMuc2VhcmNoO1xuICAgIGlmIChwYXJhbXNBcmcpIHtcbiAgICAgIGxldCBwYXJhbXM6IHN0cmluZztcbiAgICAgIGlmICh0eXBlb2YgcGFyYW1zQXJnID09PSAnb2JqZWN0JyAmJiAhKHBhcmFtc0FyZyBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcykpIHtcbiAgICAgICAgcGFyYW1zID0gdXJsRW5jb2RlUGFyYW1zKHBhcmFtc0FyZykudG9TdHJpbmcoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFtcyA9IHBhcmFtc0FyZy50b1N0cmluZygpO1xuICAgICAgfVxuICAgICAgaWYgKHBhcmFtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBwcmVmaXggPSAnPyc7XG4gICAgICAgIGlmICh0aGlzLnVybC5pbmRleE9mKCc/JykgIT0gLTEpIHtcbiAgICAgICAgICBwcmVmaXggPSAodGhpcy51cmxbdGhpcy51cmwubGVuZ3RoIC0gMV0gPT0gJyYnKSA/ICcnIDogJyYnO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE86IGp1c3QgZGVsZXRlIHNlYXJjaC1xdWVyeS1sb29raW5nIHN0cmluZyBpbiB1cmw/XG4gICAgICAgIHRoaXMudXJsID0gdXJsICsgcHJlZml4ICsgcGFyYW1zO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9ib2R5ID0gcmVxdWVzdE9wdGlvbnMuYm9keTtcbiAgICB0aGlzLm1ldGhvZCA9IG5vcm1hbGl6ZU1ldGhvZE5hbWUocmVxdWVzdE9wdGlvbnMubWV0aG9kICEpO1xuICAgIC8vIFRPRE8oamVmZmJjcm9zcyk6IGltcGxlbWVudCBiZWhhdmlvclxuICAgIC8vIERlZmF1bHRzIHRvICdvbWl0JywgY29uc2lzdGVudCB3aXRoIGJyb3dzZXJcbiAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhyZXF1ZXN0T3B0aW9ucy5oZWFkZXJzKTtcbiAgICB0aGlzLmNvbnRlbnRUeXBlID0gdGhpcy5kZXRlY3RDb250ZW50VHlwZSgpO1xuICAgIHRoaXMud2l0aENyZWRlbnRpYWxzID0gcmVxdWVzdE9wdGlvbnMud2l0aENyZWRlbnRpYWxzICE7XG4gICAgdGhpcy5yZXNwb25zZVR5cGUgPSByZXF1ZXN0T3B0aW9ucy5yZXNwb25zZVR5cGUgITtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjb250ZW50IHR5cGUgZW51bSBiYXNlZCBvbiBoZWFkZXIgb3B0aW9ucy5cbiAgICovXG4gIGRldGVjdENvbnRlbnRUeXBlKCk6IENvbnRlbnRUeXBlIHtcbiAgICBzd2l0Y2ggKHRoaXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSB7XG4gICAgICBjYXNlICdhcHBsaWNhdGlvbi9qc29uJzpcbiAgICAgICAgcmV0dXJuIENvbnRlbnRUeXBlLkpTT047XG4gICAgICBjYXNlICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnOlxuICAgICAgICByZXR1cm4gQ29udGVudFR5cGUuRk9STTtcbiAgICAgIGNhc2UgJ211bHRpcGFydC9mb3JtLWRhdGEnOlxuICAgICAgICByZXR1cm4gQ29udGVudFR5cGUuRk9STV9EQVRBO1xuICAgICAgY2FzZSAndGV4dC9wbGFpbic6XG4gICAgICBjYXNlICd0ZXh0L2h0bWwnOlxuICAgICAgICByZXR1cm4gQ29udGVudFR5cGUuVEVYVDtcbiAgICAgIGNhc2UgJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSc6XG4gICAgICAgIHJldHVybiB0aGlzLl9ib2R5IGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgPyBDb250ZW50VHlwZS5BUlJBWV9CVUZGRVIgOiBDb250ZW50VHlwZS5CTE9CO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHRoaXMuZGV0ZWN0Q29udGVudFR5cGVGcm9tQm9keSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjb250ZW50IHR5cGUgb2YgcmVxdWVzdCdzIGJvZHkgYmFzZWQgb24gaXRzIHR5cGUuXG4gICAqL1xuICBkZXRlY3RDb250ZW50VHlwZUZyb21Cb2R5KCk6IENvbnRlbnRUeXBlIHtcbiAgICBpZiAodGhpcy5fYm9keSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gQ29udGVudFR5cGUuTk9ORTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHkgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXMpIHtcbiAgICAgIHJldHVybiBDb250ZW50VHlwZS5GT1JNO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keSBpbnN0YW5jZW9mIEZvcm1EYXRhKSB7XG4gICAgICByZXR1cm4gQ29udGVudFR5cGUuRk9STV9EQVRBO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgIHJldHVybiBDb250ZW50VHlwZS5CTE9CO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICByZXR1cm4gQ29udGVudFR5cGUuQVJSQVlfQlVGRkVSO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keSAmJiB0eXBlb2YgdGhpcy5fYm9keSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBDb250ZW50VHlwZS5KU09OO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gQ29udGVudFR5cGUuVEVYVDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcmVxdWVzdCdzIGJvZHkgYWNjb3JkaW5nIHRvIGl0cyB0eXBlLiBJZiBib2R5IGlzIHVuZGVmaW5lZCwgcmV0dXJuXG4gICAqIG51bGwuXG4gICAqL1xuICBnZXRCb2R5KCk6IGFueSB7XG4gICAgc3dpdGNoICh0aGlzLmNvbnRlbnRUeXBlKSB7XG4gICAgICBjYXNlIENvbnRlbnRUeXBlLkpTT046XG4gICAgICAgIHJldHVybiB0aGlzLnRleHQoKTtcbiAgICAgIGNhc2UgQ29udGVudFR5cGUuRk9STTpcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dCgpO1xuICAgICAgY2FzZSBDb250ZW50VHlwZS5GT1JNX0RBVEE6XG4gICAgICAgIHJldHVybiB0aGlzLl9ib2R5O1xuICAgICAgY2FzZSBDb250ZW50VHlwZS5URVhUOlxuICAgICAgICByZXR1cm4gdGhpcy50ZXh0KCk7XG4gICAgICBjYXNlIENvbnRlbnRUeXBlLkJMT0I6XG4gICAgICAgIHJldHVybiB0aGlzLmJsb2IoKTtcbiAgICAgIGNhc2UgQ29udGVudFR5cGUuQVJSQVlfQlVGRkVSOlxuICAgICAgICByZXR1cm4gdGhpcy5hcnJheUJ1ZmZlcigpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHVybEVuY29kZVBhcmFtcyhwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogVVJMU2VhcmNoUGFyYW1zIHtcbiAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICBPYmplY3Qua2V5cyhwYXJhbXMpLmZvckVhY2goa2V5ID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IHBhcmFtc1trZXldO1xuICAgIGlmICh2YWx1ZSAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgdmFsdWUuZm9yRWFjaChlbGVtZW50ID0+IHNlYXJjaFBhcmFtcy5hcHBlbmQoa2V5LCBlbGVtZW50LnRvU3RyaW5nKCkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VhcmNoUGFyYW1zLmFwcGVuZChrZXksIHZhbHVlLnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBzZWFyY2hQYXJhbXM7XG59XG5cbmNvbnN0IG5vb3AgPSBmdW5jdGlvbigpIHt9O1xuY29uc3QgdyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgPyB3aW5kb3cgOiBub29wO1xuY29uc3QgRm9ybURhdGEgPSAodyBhcyBhbnkgLyoqIFRPRE8gIzkxMDAgKi8pWydGb3JtRGF0YSddIHx8IG5vb3A7XG5jb25zdCBCbG9iID0gKHcgYXMgYW55IC8qKiBUT0RPICM5MTAwICovKVsnQmxvYiddIHx8IG5vb3A7XG5leHBvcnQgY29uc3QgQXJyYXlCdWZmZXI6IEFycmF5QnVmZmVyQ29uc3RydWN0b3IgPVxuICAgICh3IGFzIGFueSAvKiogVE9ETyAjOTEwMCAqLylbJ0FycmF5QnVmZmVyJ10gfHwgbm9vcDtcbiJdfQ==