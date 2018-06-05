/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
/**
 * Polyfill for [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers), as
 * specified in the [Fetch Spec](https://fetch.spec.whatwg.org/#headers-class).
 *
 * The only known difference between this `Headers` implementation and the spec is the
 * lack of an `entries` method.
 *
 * ### Example
 *
 * ```
 * import {Headers} from '@angular/http';
 *
 * var firstHeaders = new Headers();
 * firstHeaders.append('Content-Type', 'image/jpeg');
 * console.log(firstHeaders.get('Content-Type')) //'image/jpeg'
 *
 * // Create headers from Plain Old JavaScript Object
 * var secondHeaders = new Headers({
 *   'X-My-Custom-Header': 'Angular'
 * });
 * console.log(secondHeaders.get('X-My-Custom-Header')); //'Angular'
 *
 * var thirdHeaders = new Headers(secondHeaders);
 * console.log(thirdHeaders.get('X-My-Custom-Header')); //'Angular'
 * ```
 *
 * @deprecated see https://angular.io/guide/http
 */
var /**
 * Polyfill for [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers), as
 * specified in the [Fetch Spec](https://fetch.spec.whatwg.org/#headers-class).
 *
 * The only known difference between this `Headers` implementation and the spec is the
 * lack of an `entries` method.
 *
 * ### Example
 *
 * ```
 * import {Headers} from '@angular/http';
 *
 * var firstHeaders = new Headers();
 * firstHeaders.append('Content-Type', 'image/jpeg');
 * console.log(firstHeaders.get('Content-Type')) //'image/jpeg'
 *
 * // Create headers from Plain Old JavaScript Object
 * var secondHeaders = new Headers({
 *   'X-My-Custom-Header': 'Angular'
 * });
 * console.log(secondHeaders.get('X-My-Custom-Header')); //'Angular'
 *
 * var thirdHeaders = new Headers(secondHeaders);
 * console.log(thirdHeaders.get('X-My-Custom-Header')); //'Angular'
 * ```
 *
 * @deprecated see https://angular.io/guide/http
 */
Headers = /** @class */ (function () {
    // TODO(vicb): any -> string|string[]
    function Headers(headers) {
        var _this = this;
        /** @internal header names are lower case */
        this._headers = new Map();
        /** @internal map lower case names to actual names */
        this._normalizedNames = new Map();
        if (!headers) {
            return;
        }
        if (headers instanceof Headers) {
            headers.forEach(function (values, name) {
                values.forEach(function (value) { return _this.append(name, value); });
            });
            return;
        }
        Object.keys(headers).forEach(function (name) {
            var values = Array.isArray(headers[name]) ? headers[name] : [headers[name]];
            _this.delete(name);
            values.forEach(function (value) { return _this.append(name, value); });
        });
    }
    /**
     * Returns a new Headers instance from the given DOMString of Response Headers
     */
    /**
       * Returns a new Headers instance from the given DOMString of Response Headers
       */
    Headers.fromResponseHeaderString = /**
       * Returns a new Headers instance from the given DOMString of Response Headers
       */
    function (headersString) {
        var headers = new Headers();
        headersString.split('\n').forEach(function (line) {
            var index = line.indexOf(':');
            if (index > 0) {
                var name_1 = line.slice(0, index);
                var value = line.slice(index + 1).trim();
                headers.set(name_1, value);
            }
        });
        return headers;
    };
    /**
     * Appends a header to existing list of header values for a given header name.
     */
    /**
       * Appends a header to existing list of header values for a given header name.
       */
    Headers.prototype.append = /**
       * Appends a header to existing list of header values for a given header name.
       */
    function (name, value) {
        var values = this.getAll(name);
        if (values === null) {
            this.set(name, value);
        }
        else {
            values.push(value);
        }
    };
    /**
     * Deletes all header values for the given name.
     */
    /**
       * Deletes all header values for the given name.
       */
    Headers.prototype.delete = /**
       * Deletes all header values for the given name.
       */
    function (name) {
        var lcName = name.toLowerCase();
        this._normalizedNames.delete(lcName);
        this._headers.delete(lcName);
    };
    Headers.prototype.forEach = function (fn) {
        var _this = this;
        this._headers.forEach(function (values, lcName) { return fn(values, _this._normalizedNames.get(lcName), _this._headers); });
    };
    /**
     * Returns first header that matches given name.
     */
    /**
       * Returns first header that matches given name.
       */
    Headers.prototype.get = /**
       * Returns first header that matches given name.
       */
    function (name) {
        var values = this.getAll(name);
        if (values === null) {
            return null;
        }
        return values.length > 0 ? values[0] : null;
    };
    /**
     * Checks for existence of header by given name.
     */
    /**
       * Checks for existence of header by given name.
       */
    Headers.prototype.has = /**
       * Checks for existence of header by given name.
       */
    function (name) { return this._headers.has(name.toLowerCase()); };
    /**
     * Returns the names of the headers
     */
    /**
       * Returns the names of the headers
       */
    Headers.prototype.keys = /**
       * Returns the names of the headers
       */
    function () { return Array.from(this._normalizedNames.values()); };
    /**
     * Sets or overrides header value for given name.
     */
    /**
       * Sets or overrides header value for given name.
       */
    Headers.prototype.set = /**
       * Sets or overrides header value for given name.
       */
    function (name, value) {
        if (Array.isArray(value)) {
            if (value.length) {
                this._headers.set(name.toLowerCase(), [value.join(',')]);
            }
        }
        else {
            this._headers.set(name.toLowerCase(), [value]);
        }
        this.mayBeSetNormalizedName(name);
    };
    /**
     * Returns values of all headers.
     */
    /**
       * Returns values of all headers.
       */
    Headers.prototype.values = /**
       * Returns values of all headers.
       */
    function () { return Array.from(this._headers.values()); };
    /**
     * Returns string of all headers.
     */
    // TODO(vicb): returns {[name: string]: string[]}
    /**
       * Returns string of all headers.
       */
    // TODO(vicb): returns {[name: string]: string[]}
    Headers.prototype.toJSON = /**
       * Returns string of all headers.
       */
    // TODO(vicb): returns {[name: string]: string[]}
    function () {
        var _this = this;
        var serialized = {};
        this._headers.forEach(function (values, name) {
            var split = [];
            values.forEach(function (v) { return split.push.apply(split, tslib_1.__spread(v.split(','))); });
            serialized[_this._normalizedNames.get(name)] = split;
        });
        return serialized;
    };
    /**
     * Returns list of header values for a given name.
     */
    /**
       * Returns list of header values for a given name.
       */
    Headers.prototype.getAll = /**
       * Returns list of header values for a given name.
       */
    function (name) {
        return this.has(name) ? this._headers.get(name.toLowerCase()) || null : null;
    };
    /**
     * This method is not implemented.
     */
    /**
       * This method is not implemented.
       */
    Headers.prototype.entries = /**
       * This method is not implemented.
       */
    function () { throw new Error('"entries" method is not implemented on Headers class'); };
    Headers.prototype.mayBeSetNormalizedName = function (name) {
        var lcName = name.toLowerCase();
        if (!this._normalizedNames.has(lcName)) {
            this._normalizedNames.set(lcName, name);
        }
    };
    return Headers;
}());
/**
 * Polyfill for [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers), as
 * specified in the [Fetch Spec](https://fetch.spec.whatwg.org/#headers-class).
 *
 * The only known difference between this `Headers` implementation and the spec is the
 * lack of an `entries` method.
 *
 * ### Example
 *
 * ```
 * import {Headers} from '@angular/http';
 *
 * var firstHeaders = new Headers();
 * firstHeaders.append('Content-Type', 'image/jpeg');
 * console.log(firstHeaders.get('Content-Type')) //'image/jpeg'
 *
 * // Create headers from Plain Old JavaScript Object
 * var secondHeaders = new Headers({
 *   'X-My-Custom-Header': 'Angular'
 * });
 * console.log(secondHeaders.get('X-My-Custom-Header')); //'Angular'
 *
 * var thirdHeaders = new Headers(secondHeaders);
 * console.log(thirdHeaders.get('X-My-Custom-Header')); //'Angular'
 * ```
 *
 * @deprecated see https://angular.io/guide/http
 */
export { Headers };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2h0dHAvc3JjL2hlYWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0NBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFNRSxxQ0FBcUM7SUFDckMsaUJBQVksT0FBNEM7UUFBeEQsaUJBaUJDOzt3QkF0QmlDLElBQUksR0FBRyxFQUFFOztnQ0FFSCxJQUFJLEdBQUcsRUFBRTtRQUkvQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osT0FBTztTQUNSO1FBRUQsSUFBSSxPQUFPLFlBQVksT0FBTyxFQUFFO1lBQzlCLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFnQixFQUFFLElBQVk7Z0JBQzdDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO2FBQ25ELENBQUMsQ0FBQztZQUNILE9BQU87U0FDUjtRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBWTtZQUN4QyxJQUFNLE1BQU0sR0FBYSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEYsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFD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Q0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0tBQzlFO0lBRUQ7O09BRUc7Ozs7SUFDSCx5QkFBTzs7O0lBQVAsY0FBWSxNQUFNLElBQUksS0FBSyxDQUFDLHNEQUFzRCxDQUFDLENBQUMsRUFBRTtJQUU5RSx3Q0FBc0IsR0FBOUIsVUFBK0IsSUFBWTtRQUN6QyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDekM7S0FDRjtrQkF4TEg7SUF5TEMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFySkQsbUJBcUpDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIFBvbHlmaWxsIGZvciBbSGVhZGVyc10oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0hlYWRlcnMvSGVhZGVycyksIGFzXG4gKiBzcGVjaWZpZWQgaW4gdGhlIFtGZXRjaCBTcGVjXShodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jaGVhZGVycy1jbGFzcykuXG4gKlxuICogVGhlIG9ubHkga25vd24gZGlmZmVyZW5jZSBiZXR3ZWVuIHRoaXMgYEhlYWRlcnNgIGltcGxlbWVudGF0aW9uIGFuZCB0aGUgc3BlYyBpcyB0aGVcbiAqIGxhY2sgb2YgYW4gYGVudHJpZXNgIG1ldGhvZC5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYFxuICogaW1wb3J0IHtIZWFkZXJzfSBmcm9tICdAYW5ndWxhci9odHRwJztcbiAqXG4gKiB2YXIgZmlyc3RIZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAqIGZpcnN0SGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdpbWFnZS9qcGVnJyk7XG4gKiBjb25zb2xlLmxvZyhmaXJzdEhlYWRlcnMuZ2V0KCdDb250ZW50LVR5cGUnKSkgLy8naW1hZ2UvanBlZydcbiAqXG4gKiAvLyBDcmVhdGUgaGVhZGVycyBmcm9tIFBsYWluIE9sZCBKYXZhU2NyaXB0IE9iamVjdFxuICogdmFyIHNlY29uZEhlYWRlcnMgPSBuZXcgSGVhZGVycyh7XG4gKiAgICdYLU15LUN1c3RvbS1IZWFkZXInOiAnQW5ndWxhcidcbiAqIH0pO1xuICogY29uc29sZS5sb2coc2Vjb25kSGVhZGVycy5nZXQoJ1gtTXktQ3VzdG9tLUhlYWRlcicpKTsgLy8nQW5ndWxhcidcbiAqXG4gKiB2YXIgdGhpcmRIZWFkZXJzID0gbmV3IEhlYWRlcnMoc2Vjb25kSGVhZGVycyk7XG4gKiBjb25zb2xlLmxvZyh0aGlyZEhlYWRlcnMuZ2V0KCdYLU15LUN1c3RvbS1IZWFkZXInKSk7IC8vJ0FuZ3VsYXInXG4gKiBgYGBcbiAqXG4gKiBAZGVwcmVjYXRlZCBzZWUgaHR0cHM6Ly9hbmd1bGFyLmlvL2d1aWRlL2h0dHBcbiAqL1xuZXhwb3J0IGNsYXNzIEhlYWRlcnMge1xuICAvKiogQGludGVybmFsIGhlYWRlciBuYW1lcyBhcmUgbG93ZXIgY2FzZSAqL1xuICBfaGVhZGVyczogTWFwPHN0cmluZywgc3RyaW5nW10+ID0gbmV3IE1hcCgpO1xuICAvKiogQGludGVybmFsIG1hcCBsb3dlciBjYXNlIG5hbWVzIHRvIGFjdHVhbCBuYW1lcyAqL1xuICBfbm9ybWFsaXplZE5hbWVzOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xuXG4gIC8vIFRPRE8odmljYik6IGFueSAtPiBzdHJpbmd8c3RyaW5nW11cbiAgY29uc3RydWN0b3IoaGVhZGVycz86IEhlYWRlcnN8e1tuYW1lOiBzdHJpbmddOiBhbnl9fG51bGwpIHtcbiAgICBpZiAoIWhlYWRlcnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaCgodmFsdWVzOiBzdHJpbmdbXSwgbmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgIHZhbHVlcy5mb3JFYWNoKHZhbHVlID0+IHRoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyhoZWFkZXJzKS5mb3JFYWNoKChuYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlczogc3RyaW5nW10gPSBBcnJheS5pc0FycmF5KGhlYWRlcnNbbmFtZV0pID8gaGVhZGVyc1tuYW1lXSA6IFtoZWFkZXJzW25hbWVdXTtcbiAgICAgIHRoaXMuZGVsZXRlKG5hbWUpO1xuICAgICAgdmFsdWVzLmZvckVhY2godmFsdWUgPT4gdGhpcy5hcHBlbmQobmFtZSwgdmFsdWUpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbmV3IEhlYWRlcnMgaW5zdGFuY2UgZnJvbSB0aGUgZ2l2ZW4gRE9NU3RyaW5nIG9mIFJlc3BvbnNlIEhlYWRlcnNcbiAgICovXG4gIHN0YXRpYyBmcm9tUmVzcG9uc2VIZWFkZXJTdHJpbmcoaGVhZGVyc1N0cmluZzogc3RyaW5nKTogSGVhZGVycyB7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG5cbiAgICBoZWFkZXJzU3RyaW5nLnNwbGl0KCdcXG4nKS5mb3JFYWNoKGxpbmUgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IGxpbmUuc2xpY2UoMCwgaW5kZXgpO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGxpbmUuc2xpY2UoaW5kZXggKyAxKS50cmltKCk7XG4gICAgICAgIGhlYWRlcnMuc2V0KG5hbWUsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBoZWFkZXJzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgYSBoZWFkZXIgdG8gZXhpc3RpbmcgbGlzdCBvZiBoZWFkZXIgdmFsdWVzIGZvciBhIGdpdmVuIGhlYWRlciBuYW1lLlxuICAgKi9cbiAgYXBwZW5kKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlcyA9IHRoaXMuZ2V0QWxsKG5hbWUpO1xuXG4gICAgaWYgKHZhbHVlcyA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zZXQobmFtZSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYWxsIGhlYWRlciB2YWx1ZXMgZm9yIHRoZSBnaXZlbiBuYW1lLlxuICAgKi9cbiAgZGVsZXRlIChuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBsY05hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgdGhpcy5fbm9ybWFsaXplZE5hbWVzLmRlbGV0ZShsY05hbWUpO1xuICAgIHRoaXMuX2hlYWRlcnMuZGVsZXRlKGxjTmFtZSk7XG4gIH1cblxuICBmb3JFYWNoKGZuOiAodmFsdWVzOiBzdHJpbmdbXSwgbmFtZTogc3RyaW5nfHVuZGVmaW5lZCwgaGVhZGVyczogTWFwPHN0cmluZywgc3RyaW5nW10+KSA9PiB2b2lkKTpcbiAgICAgIHZvaWQge1xuICAgIHRoaXMuX2hlYWRlcnMuZm9yRWFjaChcbiAgICAgICAgKHZhbHVlcywgbGNOYW1lKSA9PiBmbih2YWx1ZXMsIHRoaXMuX25vcm1hbGl6ZWROYW1lcy5nZXQobGNOYW1lKSwgdGhpcy5faGVhZGVycykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgZmlyc3QgaGVhZGVyIHRoYXQgbWF0Y2hlcyBnaXZlbiBuYW1lLlxuICAgKi9cbiAgZ2V0KG5hbWU6IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLmdldEFsbChuYW1lKTtcblxuICAgIGlmICh2YWx1ZXMgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXMubGVuZ3RoID4gMCA/IHZhbHVlc1swXSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGZvciBleGlzdGVuY2Ugb2YgaGVhZGVyIGJ5IGdpdmVuIG5hbWUuXG4gICAqL1xuICBoYXMobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9oZWFkZXJzLmhhcyhuYW1lLnRvTG93ZXJDYXNlKCkpOyB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG5hbWVzIG9mIHRoZSBoZWFkZXJzXG4gICAqL1xuICBrZXlzKCk6IHN0cmluZ1tdIHsgcmV0dXJuIEFycmF5LmZyb20odGhpcy5fbm9ybWFsaXplZE5hbWVzLnZhbHVlcygpKTsgfVxuXG4gIC8qKlxuICAgKiBTZXRzIG9yIG92ZXJyaWRlcyBoZWFkZXIgdmFsdWUgZm9yIGdpdmVuIG5hbWUuXG4gICAqL1xuICBzZXQobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nfHN0cmluZ1tdKTogdm9pZCB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBpZiAodmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuX2hlYWRlcnMuc2V0KG5hbWUudG9Mb3dlckNhc2UoKSwgW3ZhbHVlLmpvaW4oJywnKV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oZWFkZXJzLnNldChuYW1lLnRvTG93ZXJDYXNlKCksIFt2YWx1ZV0pO1xuICAgIH1cbiAgICB0aGlzLm1heUJlU2V0Tm9ybWFsaXplZE5hbWUobmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB2YWx1ZXMgb2YgYWxsIGhlYWRlcnMuXG4gICAqL1xuICB2YWx1ZXMoKTogc3RyaW5nW11bXSB7IHJldHVybiBBcnJheS5mcm9tKHRoaXMuX2hlYWRlcnMudmFsdWVzKCkpOyB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgc3RyaW5nIG9mIGFsbCBoZWFkZXJzLlxuICAgKi9cbiAgLy8gVE9ETyh2aWNiKTogcmV0dXJucyB7W25hbWU6IHN0cmluZ106IHN0cmluZ1tdfVxuICB0b0pTT04oKToge1tuYW1lOiBzdHJpbmddOiBhbnl9IHtcbiAgICBjb25zdCBzZXJpYWxpemVkOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ1tdfSA9IHt9O1xuXG4gICAgdGhpcy5faGVhZGVycy5mb3JFYWNoKCh2YWx1ZXM6IHN0cmluZ1tdLCBuYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHNwbGl0OiBzdHJpbmdbXSA9IFtdO1xuICAgICAgdmFsdWVzLmZvckVhY2godiA9PiBzcGxpdC5wdXNoKC4uLnYuc3BsaXQoJywnKSkpO1xuICAgICAgc2VyaWFsaXplZFt0aGlzLl9ub3JtYWxpemVkTmFtZXMuZ2V0KG5hbWUpICFdID0gc3BsaXQ7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2VyaWFsaXplZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGxpc3Qgb2YgaGVhZGVyIHZhbHVlcyBmb3IgYSBnaXZlbiBuYW1lLlxuICAgKi9cbiAgZ2V0QWxsKG5hbWU6IHN0cmluZyk6IHN0cmluZ1tdfG51bGwge1xuICAgIHJldHVybiB0aGlzLmhhcyhuYW1lKSA/IHRoaXMuX2hlYWRlcnMuZ2V0KG5hbWUudG9Mb3dlckNhc2UoKSkgfHwgbnVsbCA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlxuICAgKi9cbiAgZW50cmllcygpIHsgdGhyb3cgbmV3IEVycm9yKCdcImVudHJpZXNcIiBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkIG9uIEhlYWRlcnMgY2xhc3MnKTsgfVxuXG4gIHByaXZhdGUgbWF5QmVTZXROb3JtYWxpemVkTmFtZShuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBsY05hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBpZiAoIXRoaXMuX25vcm1hbGl6ZWROYW1lcy5oYXMobGNOYW1lKSkge1xuICAgICAgdGhpcy5fbm9ybWFsaXplZE5hbWVzLnNldChsY05hbWUsIG5hbWUpO1xuICAgIH1cbiAgfVxufVxuIl19