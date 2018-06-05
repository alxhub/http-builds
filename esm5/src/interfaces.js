/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Abstract class from which real backends are derived.
 *
 * The primary purpose of a `ConnectionBackend` is to create new connections to fulfill a given
 * {@link Request}.
 *
 * @deprecated see https://angular.io/guide/http
 */
var /**
 * Abstract class from which real backends are derived.
 *
 * The primary purpose of a `ConnectionBackend` is to create new connections to fulfill a given
 * {@link Request}.
 *
 * @deprecated see https://angular.io/guide/http
 */
ConnectionBackend = /** @class */ (function () {
    function ConnectionBackend() {
    }
    return ConnectionBackend;
}());
/**
 * Abstract class from which real backends are derived.
 *
 * The primary purpose of a `ConnectionBackend` is to create new connections to fulfill a given
 * {@link Request}.
 *
 * @deprecated see https://angular.io/guide/http
 */
export { ConnectionBackend };
/**
 * Abstract class from which real connections are derived.
 *
 * @deprecated see https://angular.io/guide/http
 */
var /**
 * Abstract class from which real connections are derived.
 *
 * @deprecated see https://angular.io/guide/http
 */
Connection = /** @class */ (function () {
    function Connection() {
    }
    return Connection;
}());
/**
 * Abstract class from which real connections are derived.
 *
 * @deprecated see https://angular.io/guide/http
 */
export { Connection };
/**
 * An XSRFStrategy configures XSRF protection (e.g. via headers) on an HTTP request.
 *
 * @deprecated see https://angular.io/guide/http
 */
var /**
 * An XSRFStrategy configures XSRF protection (e.g. via headers) on an HTTP request.
 *
 * @deprecated see https://angular.io/guide/http
 */
XSRFStrategy = /** @class */ (function () {
    function XSRFStrategy() {
    }
    return XSRFStrategy;
}());
/**
 * An XSRFStrategy configures XSRF protection (e.g. via headers) on an HTTP request.
 *
 * @deprecated see https://angular.io/guide/http
 */
export { XSRFStrategy };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2h0dHAvc3JjL2ludGVyZmFjZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBOzs7Ozs7OztBQUFBOzs7NEJBckJBO0lBcUJnRyxDQUFBOzs7Ozs7Ozs7QUFBaEcsNkJBQWdHOzs7Ozs7QUFPaEc7Ozs7O0FBQUE7OztxQkE1QkE7SUFnQ0MsQ0FBQTs7Ozs7O0FBSkQsc0JBSUM7Ozs7OztBQU9EOzs7OztBQUFBOzs7dUJBdkNBO0lBdUNxRixDQUFBOzs7Ozs7QUFBckYsd0JBQXFGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1JlYWR5U3RhdGUsIFJlcXVlc3RNZXRob2QsIFJlc3BvbnNlQ29udGVudFR5cGUsIFJlc3BvbnNlVHlwZX0gZnJvbSAnLi9lbnVtcyc7XG5pbXBvcnQge0hlYWRlcnN9IGZyb20gJy4vaGVhZGVycyc7XG5pbXBvcnQge1JlcXVlc3R9IGZyb20gJy4vc3RhdGljX3JlcXVlc3QnO1xuaW1wb3J0IHtVUkxTZWFyY2hQYXJhbXN9IGZyb20gJy4vdXJsX3NlYXJjaF9wYXJhbXMnO1xuXG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIGZyb20gd2hpY2ggcmVhbCBiYWNrZW5kcyBhcmUgZGVyaXZlZC5cbiAqXG4gKiBUaGUgcHJpbWFyeSBwdXJwb3NlIG9mIGEgYENvbm5lY3Rpb25CYWNrZW5kYCBpcyB0byBjcmVhdGUgbmV3IGNvbm5lY3Rpb25zIHRvIGZ1bGZpbGwgYSBnaXZlblxuICoge0BsaW5rIFJlcXVlc3R9LlxuICpcbiAqIEBkZXByZWNhdGVkIHNlZSBodHRwczovL2FuZ3VsYXIuaW8vZ3VpZGUvaHR0cFxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29ubmVjdGlvbkJhY2tlbmQgeyBhYnN0cmFjdCBjcmVhdGVDb25uZWN0aW9uKHJlcXVlc3Q6IGFueSk6IENvbm5lY3Rpb247IH1cblxuLyoqXG4gKiBBYnN0cmFjdCBjbGFzcyBmcm9tIHdoaWNoIHJlYWwgY29ubmVjdGlvbnMgYXJlIGRlcml2ZWQuXG4gKlxuICogQGRlcHJlY2F0ZWQgc2VlIGh0dHBzOi8vYW5ndWxhci5pby9ndWlkZS9odHRwXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb25uZWN0aW9uIHtcbiAgcmVhZHlTdGF0ZTogUmVhZHlTdGF0ZTtcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgcmVzcG9uc2U6IGFueTsgIC8vIFRPRE86IGdlbmVyaWMgb2YgPFJlc3BvbnNlPjtcbn1cblxuLyoqXG4gKiBBbiBYU1JGU3RyYXRlZ3kgY29uZmlndXJlcyBYU1JGIHByb3RlY3Rpb24gKGUuZy4gdmlhIGhlYWRlcnMpIG9uIGFuIEhUVFAgcmVxdWVzdC5cbiAqXG4gKiBAZGVwcmVjYXRlZCBzZWUgaHR0cHM6Ly9hbmd1bGFyLmlvL2d1aWRlL2h0dHBcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFhTUkZTdHJhdGVneSB7IGFic3RyYWN0IGNvbmZpZ3VyZVJlcXVlc3QocmVxOiBSZXF1ZXN0KTogdm9pZDsgfVxuXG4vKipcbiAqIEludGVyZmFjZSBmb3Igb3B0aW9ucyB0byBjb25zdHJ1Y3QgYSBSZXF1ZXN0T3B0aW9ucywgYmFzZWQgb25cbiAqIFtSZXF1ZXN0SW5pdF0oaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI3JlcXVlc3Rpbml0KSBmcm9tIHRoZSBGZXRjaCBzcGVjLlxuICpcbiAqIEBkZXByZWNhdGVkIHNlZSBodHRwczovL2FuZ3VsYXIuaW8vZ3VpZGUvaHR0cFxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RPcHRpb25zQXJncyB7XG4gIHVybD86IHN0cmluZ3xudWxsO1xuICBtZXRob2Q/OiBzdHJpbmd8UmVxdWVzdE1ldGhvZHxudWxsO1xuICAvKiogQGRlcHJlY2F0ZWQgZnJvbSA0LjAuMC4gVXNlIHBhcmFtcyBpbnN0ZWFkLiAqL1xuICBzZWFyY2g/OiBzdHJpbmd8VVJMU2VhcmNoUGFyYW1zfHtba2V5OiBzdHJpbmddOiBhbnkgfCBhbnlbXX18bnVsbDtcbiAgcGFyYW1zPzogc3RyaW5nfFVSTFNlYXJjaFBhcmFtc3x7W2tleTogc3RyaW5nXTogYW55IHwgYW55W119fG51bGw7XG4gIGhlYWRlcnM/OiBIZWFkZXJzfG51bGw7XG4gIGJvZHk/OiBhbnk7XG4gIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW58bnVsbDtcbiAgcmVzcG9uc2VUeXBlPzogUmVzcG9uc2VDb250ZW50VHlwZXxudWxsO1xufVxuXG4vKipcbiAqIFJlcXVpcmVkIHN0cnVjdHVyZSB3aGVuIGNvbnN0cnVjdGluZyBuZXcgUmVxdWVzdCgpO1xuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RBcmdzIGV4dGVuZHMgUmVxdWVzdE9wdGlvbnNBcmdzIHsgdXJsOiBzdHJpbmd8bnVsbDsgfVxuXG4vKipcbiAqIEludGVyZmFjZSBmb3Igb3B0aW9ucyB0byBjb25zdHJ1Y3QgYSBSZXNwb25zZSwgYmFzZWQgb25cbiAqIFtSZXNwb25zZUluaXRdKGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNyZXNwb25zZWluaXQpIGZyb20gdGhlIEZldGNoIHNwZWMuXG4gKlxuICogQGRlcHJlY2F0ZWQgc2VlIGh0dHBzOi8vYW5ndWxhci5pby9ndWlkZS9odHRwXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVzcG9uc2VPcHRpb25zQXJncyB7XG4gIGJvZHk/OiBzdHJpbmd8T2JqZWN0fEZvcm1EYXRhfEFycmF5QnVmZmVyfEJsb2J8bnVsbDtcbiAgc3RhdHVzPzogbnVtYmVyfG51bGw7XG4gIHN0YXR1c1RleHQ/OiBzdHJpbmd8bnVsbDtcbiAgaGVhZGVycz86IEhlYWRlcnN8bnVsbDtcbiAgdHlwZT86IFJlc3BvbnNlVHlwZXxudWxsO1xuICB1cmw/OiBzdHJpbmd8bnVsbDtcbn1cbiJdfQ==