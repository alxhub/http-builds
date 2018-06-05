/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
function paramParser(rawParams) {
    if (rawParams === void 0) { rawParams = ''; }
    var map = new Map();
    if (rawParams.length > 0) {
        var params = rawParams.split('&');
        params.forEach(function (param) {
            var eqIdx = param.indexOf('=');
            var _a = tslib_1.__read(eqIdx == -1 ? [param, ''] : [param.slice(0, eqIdx), param.slice(eqIdx + 1)], 2), key = _a[0], val = _a[1];
            var list = map.get(key) || [];
            list.push(val);
            map.set(key, list);
        });
    }
    return map;
}
/**
 * @deprecated see https://angular.io/guide/http
 **/
var /**
 * @deprecated see https://angular.io/guide/http
 **/
QueryEncoder = /** @class */ (function () {
    function QueryEncoder() {
    }
    QueryEncoder.prototype.encodeKey = function (k) { return standardEncoding(k); };
    QueryEncoder.prototype.encodeValue = function (v) { return standardEncoding(v); };
    return QueryEncoder;
}());
/**
 * @deprecated see https://angular.io/guide/http
 **/
export { QueryEncoder };
function standardEncoding(v) {
    return encodeURIComponent(v)
        .replace(/%40/gi, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/gi, '$')
        .replace(/%2C/gi, ',')
        .replace(/%3B/gi, ';')
        .replace(/%2B/gi, '+')
        .replace(/%3D/gi, '=')
        .replace(/%3F/gi, '?')
        .replace(/%2F/gi, '/');
}
/**
 * Map-like representation of url search parameters, based on
 * [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams) in the url living standard,
 * with several extensions for merging URLSearchParams objects:
 *   - setAll()
 *   - appendAll()
 *   - replaceAll()
 *
 * This class accepts an optional second parameter of ${@link QueryEncoder},
 * which is used to serialize parameters before making a request. By default,
 * `QueryEncoder` encodes keys and values of parameters using `encodeURIComponent`,
 * and then un-encodes certain characters that are allowed to be part of the query
 * according to IETF RFC 3986: https://tools.ietf.org/html/rfc3986.
 *
 * These are the characters that are not encoded: `! $ \' ( ) * + , ; A 9 - . _ ~ ? /`
 *
 * If the set of allowed query characters is not acceptable for a particular backend,
 * `QueryEncoder` can be subclassed and provided as the 2nd argument to URLSearchParams.
 *
 * ```
 * import {URLSearchParams, QueryEncoder} from '@angular/http';
 * class MyQueryEncoder extends QueryEncoder {
 *   encodeKey(k: string): string {
 *     return myEncodingFunction(k);
 *   }
 *
 *   encodeValue(v: string): string {
 *     return myEncodingFunction(v);
 *   }
 * }
 *
 * let params = new URLSearchParams('', new MyQueryEncoder());
 * ```
 * @deprecated see https://angular.io/guide/http
 */
var /**
 * Map-like representation of url search parameters, based on
 * [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams) in the url living standard,
 * with several extensions for merging URLSearchParams objects:
 *   - setAll()
 *   - appendAll()
 *   - replaceAll()
 *
 * This class accepts an optional second parameter of ${@link QueryEncoder},
 * which is used to serialize parameters before making a request. By default,
 * `QueryEncoder` encodes keys and values of parameters using `encodeURIComponent`,
 * and then un-encodes certain characters that are allowed to be part of the query
 * according to IETF RFC 3986: https://tools.ietf.org/html/rfc3986.
 *
 * These are the characters that are not encoded: `! $ \' ( ) * + , ; A 9 - . _ ~ ? /`
 *
 * If the set of allowed query characters is not acceptable for a particular backend,
 * `QueryEncoder` can be subclassed and provided as the 2nd argument to URLSearchParams.
 *
 * ```
 * import {URLSearchParams, QueryEncoder} from '@angular/http';
 * class MyQueryEncoder extends QueryEncoder {
 *   encodeKey(k: string): string {
 *     return myEncodingFunction(k);
 *   }
 *
 *   encodeValue(v: string): string {
 *     return myEncodingFunction(v);
 *   }
 * }
 *
 * let params = new URLSearchParams('', new MyQueryEncoder());
 * ```
 * @deprecated see https://angular.io/guide/http
 */
URLSearchParams = /** @class */ (function () {
    function URLSearchParams(rawParams, queryEncoder) {
        if (rawParams === void 0) { rawParams = ''; }
        if (queryEncoder === void 0) { queryEncoder = new QueryEncoder(); }
        this.rawParams = rawParams;
        this.queryEncoder = queryEncoder;
        this.paramsMap = paramParser(rawParams);
    }
    URLSearchParams.prototype.clone = function () {
        var clone = new URLSearchParams('', this.queryEncoder);
        clone.appendAll(this);
        return clone;
    };
    URLSearchParams.prototype.has = function (param) { return this.paramsMap.has(param); };
    URLSearchParams.prototype.get = function (param) {
        var storedParam = this.paramsMap.get(param);
        return Array.isArray(storedParam) ? storedParam[0] : null;
    };
    URLSearchParams.prototype.getAll = function (param) { return this.paramsMap.get(param) || []; };
    URLSearchParams.prototype.set = function (param, val) {
        if (val === void 0 || val === null) {
            this.delete(param);
            return;
        }
        var list = this.paramsMap.get(param) || [];
        list.length = 0;
        list.push(val);
        this.paramsMap.set(param, list);
    };
    // A merge operation
    // For each name-values pair in `searchParams`, perform `set(name, values[0])`
    //
    // E.g: "a=[1,2,3], c=[8]" + "a=[4,5,6], b=[7]" = "a=[4], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    // A merge operation
    // For each name-values pair in `searchParams`, perform `set(name, values[0])`
    //
    // E.g: "a=[1,2,3], c=[8]" + "a=[4,5,6], b=[7]" = "a=[4], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    URLSearchParams.prototype.setAll = 
    // A merge operation
    // For each name-values pair in `searchParams`, perform `set(name, values[0])`
    //
    // E.g: "a=[1,2,3], c=[8]" + "a=[4,5,6], b=[7]" = "a=[4], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    function (searchParams) {
        var _this = this;
        searchParams.paramsMap.forEach(function (value, param) {
            var list = _this.paramsMap.get(param) || [];
            list.length = 0;
            list.push(value[0]);
            _this.paramsMap.set(param, list);
        });
    };
    URLSearchParams.prototype.append = function (param, val) {
        if (val === void 0 || val === null)
            return;
        var list = this.paramsMap.get(param) || [];
        list.push(val);
        this.paramsMap.set(param, list);
    };
    // A merge operation
    // For each name-values pair in `searchParams`, perform `append(name, value)`
    // for each value in `values`.
    //
    // E.g: "a=[1,2], c=[8]" + "a=[3,4], b=[7]" = "a=[1,2,3,4], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    // A merge operation
    // For each name-values pair in `searchParams`, perform `append(name, value)`
    // for each value in `values`.
    //
    // E.g: "a=[1,2], c=[8]" + "a=[3,4], b=[7]" = "a=[1,2,3,4], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    URLSearchParams.prototype.appendAll = 
    // A merge operation
    // For each name-values pair in `searchParams`, perform `append(name, value)`
    // for each value in `values`.
    //
    // E.g: "a=[1,2], c=[8]" + "a=[3,4], b=[7]" = "a=[1,2,3,4], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    function (searchParams) {
        var _this = this;
        searchParams.paramsMap.forEach(function (value, param) {
            var list = _this.paramsMap.get(param) || [];
            for (var i = 0; i < value.length; ++i) {
                list.push(value[i]);
            }
            _this.paramsMap.set(param, list);
        });
    };
    // A merge operation
    // For each name-values pair in `searchParams`, perform `delete(name)`,
    // followed by `set(name, values)`
    //
    // E.g: "a=[1,2,3], c=[8]" + "a=[4,5,6], b=[7]" = "a=[4,5,6], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    // A merge operation
    // For each name-values pair in `searchParams`, perform `delete(name)`,
    // followed by `set(name, values)`
    //
    // E.g: "a=[1,2,3], c=[8]" + "a=[4,5,6], b=[7]" = "a=[4,5,6], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    URLSearchParams.prototype.replaceAll = 
    // A merge operation
    // For each name-values pair in `searchParams`, perform `delete(name)`,
    // followed by `set(name, values)`
    //
    // E.g: "a=[1,2,3], c=[8]" + "a=[4,5,6], b=[7]" = "a=[4,5,6], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    function (searchParams) {
        var _this = this;
        searchParams.paramsMap.forEach(function (value, param) {
            var list = _this.paramsMap.get(param) || [];
            list.length = 0;
            for (var i = 0; i < value.length; ++i) {
                list.push(value[i]);
            }
            _this.paramsMap.set(param, list);
        });
    };
    URLSearchParams.prototype.toString = function () {
        var _this = this;
        var paramsList = [];
        this.paramsMap.forEach(function (values, k) {
            values.forEach(function (v) {
                return paramsList.push(_this.queryEncoder.encodeKey(k) + '=' + _this.queryEncoder.encodeValue(v));
            });
        });
        return paramsList.join('&');
    };
    URLSearchParams.prototype.delete = function (param) { this.paramsMap.delete(param); };
    return URLSearchParams;
}());
/**
 * Map-like representation of url search parameters, based on
 * [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams) in the url living standard,
 * with several extensions for merging URLSearchParams objects:
 *   - setAll()
 *   - appendAll()
 *   - replaceAll()
 *
 * This class accepts an optional second parameter of ${@link QueryEncoder},
 * which is used to serialize parameters before making a request. By default,
 * `QueryEncoder` encodes keys and values of parameters using `encodeURIComponent`,
 * and then un-encodes certain characters that are allowed to be part of the query
 * according to IETF RFC 3986: https://tools.ietf.org/html/rfc3986.
 *
 * These are the characters that are not encoded: `! $ \' ( ) * + , ; A 9 - . _ ~ ? /`
 *
 * If the set of allowed query characters is not acceptable for a particular backend,
 * `QueryEncoder` can be subclassed and provided as the 2nd argument to URLSearchParams.
 *
 * ```
 * import {URLSearchParams, QueryEncoder} from '@angular/http';
 * class MyQueryEncoder extends QueryEncoder {
 *   encodeKey(k: string): string {
 *     return myEncodingFunction(k);
 *   }
 *
 *   encodeValue(v: string): string {
 *     return myEncodingFunction(v);
 *   }
 * }
 *
 * let params = new URLSearchParams('', new MyQueryEncoder());
 * ```
 * @deprecated see https://angular.io/guide/http
 */
export { URLSearchParams };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsX3NlYXJjaF9wYXJhbXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9odHRwL3NyYy91cmxfc2VhcmNoX3BhcmFtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQVFBLHFCQUFxQixTQUFzQjtJQUF0QiwwQkFBQSxFQUFBLGNBQXNCO0lBQ3pDLElBQU0sR0FBRyxHQUFHLElBQUksR0FBRyxFQUFvQixDQUFDO0lBQ3hDLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDeEIsSUFBTSxNQUFNLEdBQWEsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBYTtZQUMzQixJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLHlHQUFPLFdBQUcsRUFBRSxXQUFHLENBQ2lFO1lBQ2hGLElBQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNwQixDQUFDLENBQUM7S0FDSjtJQUNELE9BQU8sR0FBRyxDQUFDO0NBQ1o7Ozs7QUFJRDs7O0FBQUE7OztJQUNFLGdDQUFTLEdBQVQsVUFBVSxDQUFTLElBQVksT0FBTyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBRTVELGtDQUFXLEdBQVgsVUFBWSxDQUFTLElBQVksT0FBTyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO3VCQTdCaEU7SUE4QkMsQ0FBQTs7OztBQUpELHdCQUlDO0FBRUQsMEJBQTBCLENBQVM7SUFDakMsT0FBTyxrQkFBa0Is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LGdDQUFNLEdBQU4sVUFBUSxLQUFhLElBQVUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTswQkF0TGhFO0lBdUxDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXZHRCwyQkF1R0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmZ1bmN0aW9uIHBhcmFtUGFyc2VyKHJhd1BhcmFtczogc3RyaW5nID0gJycpOiBNYXA8c3RyaW5nLCBzdHJpbmdbXT4ge1xuICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nW10+KCk7XG4gIGlmIChyYXdQYXJhbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHBhcmFtczogc3RyaW5nW10gPSByYXdQYXJhbXMuc3BsaXQoJyYnKTtcbiAgICBwYXJhbXMuZm9yRWFjaCgocGFyYW06IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgZXFJZHggPSBwYXJhbS5pbmRleE9mKCc9Jyk7XG4gICAgICBjb25zdCBba2V5LCB2YWxdOiBzdHJpbmdbXSA9XG4gICAgICAgICAgZXFJZHggPT0gLTEgPyBbcGFyYW0sICcnXSA6IFtwYXJhbS5zbGljZSgwLCBlcUlkeCksIHBhcmFtLnNsaWNlKGVxSWR4ICsgMSldO1xuICAgICAgY29uc3QgbGlzdCA9IG1hcC5nZXQoa2V5KSB8fCBbXTtcbiAgICAgIGxpc3QucHVzaCh2YWwpO1xuICAgICAgbWFwLnNldChrZXksIGxpc3QpO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBtYXA7XG59XG4vKipcbiAqIEBkZXByZWNhdGVkIHNlZSBodHRwczovL2FuZ3VsYXIuaW8vZ3VpZGUvaHR0cFxuICoqL1xuZXhwb3J0IGNsYXNzIFF1ZXJ5RW5jb2RlciB7XG4gIGVuY29kZUtleShrOiBzdHJpbmcpOiBzdHJpbmcgeyByZXR1cm4gc3RhbmRhcmRFbmNvZGluZyhrKTsgfVxuXG4gIGVuY29kZVZhbHVlKHY6IHN0cmluZyk6IHN0cmluZyB7IHJldHVybiBzdGFuZGFyZEVuY29kaW5nKHYpOyB9XG59XG5cbmZ1bmN0aW9uIHN0YW5kYXJkRW5jb2Rpbmcodjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2KVxuICAgICAgLnJlcGxhY2UoLyU0MC9naSwgJ0AnKVxuICAgICAgLnJlcGxhY2UoLyUzQS9naSwgJzonKVxuICAgICAgLnJlcGxhY2UoLyUyNC9naSwgJyQnKVxuICAgICAgLnJlcGxhY2UoLyUyQy9naSwgJywnKVxuICAgICAgLnJlcGxhY2UoLyUzQi9naSwgJzsnKVxuICAgICAgLnJlcGxhY2UoLyUyQi9naSwgJysnKVxuICAgICAgLnJlcGxhY2UoLyUzRC9naSwgJz0nKVxuICAgICAgLnJlcGxhY2UoLyUzRi9naSwgJz8nKVxuICAgICAgLnJlcGxhY2UoLyUyRi9naSwgJy8nKTtcbn1cblxuLyoqXG4gKiBNYXAtbGlrZSByZXByZXNlbnRhdGlvbiBvZiB1cmwgc2VhcmNoIHBhcmFtZXRlcnMsIGJhc2VkIG9uXG4gKiBbVVJMU2VhcmNoUGFyYW1zXShodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHNlYXJjaHBhcmFtcykgaW4gdGhlIHVybCBsaXZpbmcgc3RhbmRhcmQsXG4gKiB3aXRoIHNldmVyYWwgZXh0ZW5zaW9ucyBmb3IgbWVyZ2luZyBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0czpcbiAqICAgLSBzZXRBbGwoKVxuICogICAtIGFwcGVuZEFsbCgpXG4gKiAgIC0gcmVwbGFjZUFsbCgpXG4gKlxuICogVGhpcyBjbGFzcyBhY2NlcHRzIGFuIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXIgb2YgJHtAbGluayBRdWVyeUVuY29kZXJ9LFxuICogd2hpY2ggaXMgdXNlZCB0byBzZXJpYWxpemUgcGFyYW1ldGVycyBiZWZvcmUgbWFraW5nIGEgcmVxdWVzdC4gQnkgZGVmYXVsdCxcbiAqIGBRdWVyeUVuY29kZXJgIGVuY29kZXMga2V5cyBhbmQgdmFsdWVzIG9mIHBhcmFtZXRlcnMgdXNpbmcgYGVuY29kZVVSSUNvbXBvbmVudGAsXG4gKiBhbmQgdGhlbiB1bi1lbmNvZGVzIGNlcnRhaW4gY2hhcmFjdGVycyB0aGF0IGFyZSBhbGxvd2VkIHRvIGJlIHBhcnQgb2YgdGhlIHF1ZXJ5XG4gKiBhY2NvcmRpbmcgdG8gSUVURiBSRkMgMzk4NjogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM5ODYuXG4gKlxuICogVGhlc2UgYXJlIHRoZSBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBlbmNvZGVkOiBgISAkIFxcJyAoICkgKiArICwgOyBBIDkgLSAuIF8gfiA/IC9gXG4gKlxuICogSWYgdGhlIHNldCBvZiBhbGxvd2VkIHF1ZXJ5IGNoYXJhY3RlcnMgaXMgbm90IGFjY2VwdGFibGUgZm9yIGEgcGFydGljdWxhciBiYWNrZW5kLFxuICogYFF1ZXJ5RW5jb2RlcmAgY2FuIGJlIHN1YmNsYXNzZWQgYW5kIHByb3ZpZGVkIGFzIHRoZSAybmQgYXJndW1lbnQgdG8gVVJMU2VhcmNoUGFyYW1zLlxuICpcbiAqIGBgYFxuICogaW1wb3J0IHtVUkxTZWFyY2hQYXJhbXMsIFF1ZXJ5RW5jb2Rlcn0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG4gKiBjbGFzcyBNeVF1ZXJ5RW5jb2RlciBleHRlbmRzIFF1ZXJ5RW5jb2RlciB7XG4gKiAgIGVuY29kZUtleShrOiBzdHJpbmcpOiBzdHJpbmcge1xuICogICAgIHJldHVybiBteUVuY29kaW5nRnVuY3Rpb24oayk7XG4gKiAgIH1cbiAqXG4gKiAgIGVuY29kZVZhbHVlKHY6IHN0cmluZyk6IHN0cmluZyB7XG4gKiAgICAgcmV0dXJuIG15RW5jb2RpbmdGdW5jdGlvbih2KTtcbiAqICAgfVxuICogfVxuICpcbiAqIGxldCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCcnLCBuZXcgTXlRdWVyeUVuY29kZXIoKSk7XG4gKiBgYGBcbiAqIEBkZXByZWNhdGVkIHNlZSBodHRwczovL2FuZ3VsYXIuaW8vZ3VpZGUvaHR0cFxuICovXG5leHBvcnQgY2xhc3MgVVJMU2VhcmNoUGFyYW1zIHtcbiAgcGFyYW1zTWFwOiBNYXA8c3RyaW5nLCBzdHJpbmdbXT47XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHJhd1BhcmFtczogc3RyaW5nID0gJycsIHByaXZhdGUgcXVlcnlFbmNvZGVyOiBRdWVyeUVuY29kZXIgPSBuZXcgUXVlcnlFbmNvZGVyKCkpIHtcbiAgICB0aGlzLnBhcmFtc01hcCA9IHBhcmFtUGFyc2VyKHJhd1BhcmFtcyk7XG4gIH1cblxuICBjbG9uZSgpOiBVUkxTZWFyY2hQYXJhbXMge1xuICAgIGNvbnN0IGNsb25lID0gbmV3IFVSTFNlYXJjaFBhcmFtcygnJywgdGhpcy5xdWVyeUVuY29kZXIpO1xuICAgIGNsb25lLmFwcGVuZEFsbCh0aGlzKTtcbiAgICByZXR1cm4gY2xvbmU7XG4gIH1cblxuICBoYXMocGFyYW06IHN0cmluZyk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5wYXJhbXNNYXAuaGFzKHBhcmFtKTsgfVxuXG4gIGdldChwYXJhbTogc3RyaW5nKTogc3RyaW5nfG51bGwge1xuICAgIGNvbnN0IHN0b3JlZFBhcmFtID0gdGhpcy5wYXJhbXNNYXAuZ2V0KHBhcmFtKTtcblxuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHN0b3JlZFBhcmFtKSA/IHN0b3JlZFBhcmFtWzBdIDogbnVsbDtcbiAgfVxuXG4gIGdldEFsbChwYXJhbTogc3RyaW5nKTogc3RyaW5nW10geyByZXR1cm4gdGhpcy5wYXJhbXNNYXAuZ2V0KHBhcmFtKSB8fCBbXTsgfVxuXG4gIHNldChwYXJhbTogc3RyaW5nLCB2YWw6IHN0cmluZykge1xuICAgIGlmICh2YWwgPT09IHZvaWQgMCB8fCB2YWwgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuZGVsZXRlKHBhcmFtKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbGlzdCA9IHRoaXMucGFyYW1zTWFwLmdldChwYXJhbSkgfHwgW107XG4gICAgbGlzdC5sZW5ndGggPSAwO1xuICAgIGxpc3QucHVzaCh2YWwpO1xuICAgIHRoaXMucGFyYW1zTWFwLnNldChwYXJhbSwgbGlzdCk7XG4gIH1cblxuICAvLyBBIG1lcmdlIG9wZXJhdGlvblxuICAvLyBGb3IgZWFjaCBuYW1lLXZhbHVlcyBwYWlyIGluIGBzZWFyY2hQYXJhbXNgLCBwZXJmb3JtIGBzZXQobmFtZSwgdmFsdWVzWzBdKWBcbiAgLy9cbiAgLy8gRS5nOiBcImE9WzEsMiwzXSwgYz1bOF1cIiArIFwiYT1bNCw1LDZdLCBiPVs3XVwiID0gXCJhPVs0XSwgYz1bOF0sIGI9WzddXCJcbiAgLy9cbiAgLy8gVE9ETyhAY2FpdHApOiBkb2N1bWVudCB0aGlzIGJldHRlclxuICBzZXRBbGwoc2VhcmNoUGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMpIHtcbiAgICBzZWFyY2hQYXJhbXMucGFyYW1zTWFwLmZvckVhY2goKHZhbHVlLCBwYXJhbSkgPT4ge1xuICAgICAgY29uc3QgbGlzdCA9IHRoaXMucGFyYW1zTWFwLmdldChwYXJhbSkgfHwgW107XG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBsaXN0LnB1c2godmFsdWVbMF0pO1xuICAgICAgdGhpcy5wYXJhbXNNYXAuc2V0KHBhcmFtLCBsaXN0KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFwcGVuZChwYXJhbTogc3RyaW5nLCB2YWw6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh2YWwgPT09IHZvaWQgMCB8fCB2YWwgPT09IG51bGwpIHJldHVybjtcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5wYXJhbXNNYXAuZ2V0KHBhcmFtKSB8fCBbXTtcbiAgICBsaXN0LnB1c2godmFsKTtcbiAgICB0aGlzLnBhcmFtc01hcC5zZXQocGFyYW0sIGxpc3QpO1xuICB9XG5cbiAgLy8gQSBtZXJnZSBvcGVyYXRpb25cbiAgLy8gRm9yIGVhY2ggbmFtZS12YWx1ZXMgcGFpciBpbiBgc2VhcmNoUGFyYW1zYCwgcGVyZm9ybSBgYXBwZW5kKG5hbWUsIHZhbHVlKWBcbiAgLy8gZm9yIGVhY2ggdmFsdWUgaW4gYHZhbHVlc2AuXG4gIC8vXG4gIC8vIEUuZzogXCJhPVsxLDJdLCBjPVs4XVwiICsgXCJhPVszLDRdLCBiPVs3XVwiID0gXCJhPVsxLDIsMyw0XSwgYz1bOF0sIGI9WzddXCJcbiAgLy9cbiAgLy8gVE9ETyhAY2FpdHApOiBkb2N1bWVudCB0aGlzIGJldHRlclxuICBhcHBlbmRBbGwoc2VhcmNoUGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMpIHtcbiAgICBzZWFyY2hQYXJhbXMucGFyYW1zTWFwLmZvckVhY2goKHZhbHVlLCBwYXJhbSkgPT4ge1xuICAgICAgY29uc3QgbGlzdCA9IHRoaXMucGFyYW1zTWFwLmdldChwYXJhbSkgfHwgW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGxpc3QucHVzaCh2YWx1ZVtpXSk7XG4gICAgICB9XG4gICAgICB0aGlzLnBhcmFtc01hcC5zZXQocGFyYW0sIGxpc3QpO1xuICAgIH0pO1xuICB9XG5cblxuICAvLyBBIG1lcmdlIG9wZXJhdGlvblxuICAvLyBGb3IgZWFjaCBuYW1lLXZhbHVlcyBwYWlyIGluIGBzZWFyY2hQYXJhbXNgLCBwZXJmb3JtIGBkZWxldGUobmFtZSlgLFxuICAvLyBmb2xsb3dlZCBieSBgc2V0KG5hbWUsIHZhbHVlcylgXG4gIC8vXG4gIC8vIEUuZzogXCJhPVsxLDIsM10sIGM9WzhdXCIgKyBcImE9WzQsNSw2XSwgYj1bN11cIiA9IFwiYT1bNCw1LDZdLCBjPVs4XSwgYj1bN11cIlxuICAvL1xuICAvLyBUT0RPKEBjYWl0cCk6IGRvY3VtZW50IHRoaXMgYmV0dGVyXG4gIHJlcGxhY2VBbGwoc2VhcmNoUGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMpIHtcbiAgICBzZWFyY2hQYXJhbXMucGFyYW1zTWFwLmZvckVhY2goKHZhbHVlLCBwYXJhbSkgPT4ge1xuICAgICAgY29uc3QgbGlzdCA9IHRoaXMucGFyYW1zTWFwLmdldChwYXJhbSkgfHwgW107XG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGxpc3QucHVzaCh2YWx1ZVtpXSk7XG4gICAgICB9XG4gICAgICB0aGlzLnBhcmFtc01hcC5zZXQocGFyYW0sIGxpc3QpO1xuICAgIH0pO1xuICB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICBjb25zdCBwYXJhbXNMaXN0OiBzdHJpbmdbXSA9IFtdO1xuICAgIHRoaXMucGFyYW1zTWFwLmZvckVhY2goKHZhbHVlcywgaykgPT4ge1xuICAgICAgdmFsdWVzLmZvckVhY2goXG4gICAgICAgICAgdiA9PiBwYXJhbXNMaXN0LnB1c2goXG4gICAgICAgICAgICAgIHRoaXMucXVlcnlFbmNvZGVyLmVuY29kZUtleShrKSArICc9JyArIHRoaXMucXVlcnlFbmNvZGVyLmVuY29kZVZhbHVlKHYpKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhcmFtc0xpc3Quam9pbignJicpO1xuICB9XG5cbiAgZGVsZXRlIChwYXJhbTogc3RyaW5nKTogdm9pZCB7IHRoaXMucGFyYW1zTWFwLmRlbGV0ZShwYXJhbSk7IH1cbn1cbiJdfQ==