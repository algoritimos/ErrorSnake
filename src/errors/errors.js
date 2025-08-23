'use server';
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyError = exports.NotImplementedError = exports.ResourceExhaustedError = exports.ConfigurationError = exports.TimeoutError = exports.NetworkError = exports.DatabaseError = exports.BadGatewayError = exports.GatewayTimeoutError = exports.ConflictError = exports.BadRequestError = exports.MethodNotAllowedError = exports.UnprocessableEntityError = exports.TooManyRequestsError = exports.ForbiddenError = exports.UnauthorizedError = exports.ValidationError = exports.ServiceError = exports.NotFoundError = exports.InternalServerError = exports.BaseError = void 0;
exports.createErrorLogObject = createErrorLogObject;
exports.isCustomError = isCustomError;
var BaseError = /** @class */ (function (_super) {
    __extends(BaseError, _super);
    function BaseError(_a) {
        var name = _a.name, message = _a.message, stack = _a.stack, cause = _a.cause, action = _a.action, statusCode = _a.statusCode, errorId = _a.errorId, requestId = _a.requestId, context = _a.context, errorLocationCode = _a.errorLocationCode, key = _a.key, type = _a.type, databaseErrorCode = _a.databaseErrorCode, originalError = _a.originalError, timestamp = _a.timestamp, userId = _a.userId, ipAddress = _a.ipAddress, userAgent = _a.userAgent, endpoint = _a.endpoint, method = _a.method, queryParameters = _a.queryParameters, requestBody = _a.requestBody, responseTime = _a.responseTime, serviceName = _a.serviceName, _b = _a.severity, severity = _b === void 0 ? 'medium' : _b;
        var _this = _super.call(this, message) || this;
        _this.name = name;
        _this.message = message;
        _this.stack = stack;
        _this.cause = cause;
        _this.action = action;
        _this.statusCode = statusCode !== null && statusCode !== void 0 ? statusCode : 500;
        _this.errorId = errorId !== null && errorId !== void 0 ? errorId : crypto.randomUUID();
        _this.requestId = requestId;
        _this.context = context;
        _this.errorLocationCode = errorLocationCode;
        _this.key = key;
        _this.type = type;
        _this.databaseErrorCode = databaseErrorCode;
        _this.originalError = originalError;
        _this.timestamp = timestamp !== null && timestamp !== void 0 ? timestamp : new Date();
        _this.userId = userId;
        _this.ipAddress = ipAddress;
        _this.userAgent = userAgent;
        _this.endpoint = endpoint;
        _this.method = method;
        _this.queryParameters = queryParameters;
        _this.requestBody = requestBody;
        _this.responseTime = responseTime;
        _this.serviceName = serviceName;
        _this.severity = severity;
        return _this;
    }
    BaseError.prototype.toLogObject = function () {
        var toLogObject = {
            errorId: this.errorId,
            name: this.name,
            message: this.message,
            statusCode: this.statusCode,
            timestamp: this.timestamp.toISOString(),
            requestId: this.requestId,
            userId: this.userId,
            ipAddress: this.ipAddress,
            endpoint: this.endpoint,
            method: this.method,
            severity: this.severity,
            serviceName: this.serviceName,
            responseTime: this.responseTime,
            errorLocationCode: this.errorLocationCode,
            context: this.context,
            stack: this.stack,
        };
        // test with function parsed
        // const logger = await parsed(toLogObject);
        return toLogObject;
    };
    return BaseError;
}(Error));
exports.BaseError = BaseError;
// Existing error classes translated to English
var InternalServerError = /** @class */ (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError(params) {
        if (params === void 0) { params = {}; }
        var _a, _b, _c, _d;
        return _super.call(this, __assign({ name: 'InternalServerError', message: (_a = params.message) !== null && _a !== void 0 ? _a : 'An unexpected internal server error occurred.', action: (_b = params.action) !== null && _b !== void 0 ? _b : "Please provide the support team with the value found in the 'error_id' field.", statusCode: (_c = params.statusCode) !== null && _c !== void 0 ? _c : 500, requestId: params.requestId, errorId: params.errorId, stack: params.stack, errorLocationCode: params.errorLocationCode, severity: (_d = params.severity) !== null && _d !== void 0 ? _d : 'high' }, params)) || this;
    }
    return InternalServerError;
}(BaseError));
exports.InternalServerError = InternalServerError;
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(params) {
        if (params === void 0) { params = {}; }
        var _a, _b, _c;
        return _super.call(this, __assign({ name: 'NotFoundError', message: (_a = params.message) !== null && _a !== void 0 ? _a : 'The requested resource was not found.', action: (_b = params.action) !== null && _b !== void 0 ? _b : 'Please verify that the path is correct.', statusCode: 404, requestId: params.requestId, errorId: params.errorId, stack: params.stack, errorLocationCode: params.errorLocationCode, key: params.key, severity: (_c = params.severity) !== null && _c !== void 0 ? _c : 'low' }, params)) || this;
    }
    return NotFoundError;
}(BaseError));
exports.NotFoundError = NotFoundError;
var ServiceError = /** @class */ (function (_super) {
    __extends(ServiceError, _super);
    function ServiceError(params) {
        if (params === void 0) { params = {}; }
        var _a, _b, _c, _d;
        return _super.call(this, __assign({ name: 'ServiceError', message: (_a = params.message) !== null && _a !== void 0 ? _a : 'Service is currently unavailable.', action: (_b = params.action) !== null && _b !== void 0 ? _b : 'Please check if the service is available.', statusCode: (_c = params.statusCode) !== null && _c !== void 0 ? _c : 503, stack: params.stack, context: params.context, errorLocationCode: params.errorLocationCode, databaseErrorCode: params.databaseErrorCode, cause: params.cause, severity: (_d = params.severity) !== null && _d !== void 0 ? _d : 'high' }, params)) || this;
    }
    return ServiceError;
}(BaseError));
exports.ServiceError = ServiceError;
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(params) {
        if (params === void 0) { params = {}; }
        var _a, _b, _c, _d;
        return _super.call(this, __assign({ name: 'ValidationError', message: (_a = params.message) !== null && _a !== void 0 ? _a : 'A validation error occurred.', action: (_b = params.action) !== null && _b !== void 0 ? _b : 'Please adjust the submitted data and try again.', statusCode: (_c = params.statusCode) !== null && _c !== void 0 ? _c : 400, stack: params.stack, context: params.context, errorLocationCode: params.errorLocationCode, key: params.key, type: params.type, severity: (_d = params.severity) !== null && _d !== void 0 ? _d : 'medium' }, params)) || this;
    }
    return ValidationError;
}(BaseError));
exports.ValidationError = ValidationError;
var UnauthorizedError = /** @class */ (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError(params) {
        if (params === void 0) { params = {}; }
        var _a, _b, _c;
        return _super.call(this, __assign({ name: 'UnauthorizedError', message: (_a = params.message) !== null && _a !== void 0 ? _a : 'User is not authenticated.', action: (_b = params.action) !== null && _b !== void 0 ? _b : 'Please verify that you are authenticated with an active session and try again.', statusCode: 401, requestId: params.requestId, stack: params.stack, errorLocationCode: params.errorLocationCode, severity: (_c = params.severity) !== null && _c !== void 0 ? _c : 'medium' }, params)) || this;
    }
    return UnauthorizedError;
}(BaseError));
exports.UnauthorizedError = UnauthorizedError;
var ForbiddenError = /** @class */ (function (_super) {
    __extends(ForbiddenError, _super);
    function ForbiddenError(params) {
        if (params === void 0) { params = {}; }
        var _a, _b, _c;
        return _super.call(this, __assign({ name: 'ForbiddenError', message: (_a = params.message) !== null && _a !== void 0 ? _a : 'You do not have permission to perform this action.', action: (_b = params.action) !== null && _b !== void 0 ? _b : 'Please verify that you have permission to perform this action.', statusCode: 403, requestId: params.requestId, stack: params.stack, errorLocationCode: params.errorLocationCode, severity: (_c = params.severity) !== null && _c !== void 0 ? _c : 'medium' }, params)) || this;
    }
    return ForbiddenError;
}(BaseError));
exports.ForbiddenError = ForbiddenError;
var TooManyRequestsError = /** @class */ (function (_super) {
    __extends(TooManyRequestsError, _super);
    function TooManyRequestsError(params) {
        if (params === void 0) { params = {}; }
        var _a, _b, _c;
        return _super.call(this, __assign({ name: 'TooManyRequestsError', message: (_a = params.message) !== null && _a !== void 0 ? _a : 'You have made too many requests recently.', action: (_b = params.action) !== null && _b !== void 0 ? _b : 'Please try again later or contact support if you believe this is an error.', statusCode: 429, context: params.context, stack: params.stack, errorLocationCode: params.errorLocationCode, severity: (_c = params.severity) !== null && _c !== void 0 ? _c : 'low' }, params)) || this;
    }
    return TooManyRequestsError;
}(BaseError));
exports.TooManyRequestsError = TooManyRequestsError;
var UnprocessableEntityError = /** @class */ (function (_super) {
    __extends(UnprocessableEntityError, _super);
    function UnprocessableEntityError(params) {
        if (params === void 0) { params = {}; }
        var _a, _b, _c;
        return _super.call(this, __assign({ name: 'UnprocessableEntityError', message: (_a = params.message) !== null && _a !== void 0 ? _a : 'Unable to process the request.', action: (_b = params.action) !== null && _b !== void 0 ? _b : 'The submitted data is correct, but the operation could not be completed.', statusCode: 422, stack: params.stack, errorLocationCode: params.errorLocationCode, severity: (_c = params.severity) !== null && _c !== void 0 ? _c : 'medium' }, params)) || this;
    }
    return UnprocessableEntityError;
}(BaseError));
exports.UnprocessableEntityError = UnprocessableEntityError;
var MethodNotAllowedError = /** @class */ (function (_super) {
    __extends(MethodNotAllowedError, _super);
    function MethodNotAllowedError(params) {
        if (params === void 0) { params = {}; }
        var _a, _b, _c;
        return _super.call(this, __assign({ name: 'MethodNotAllowedError', message: (_a = params.message) !== null && _a !== void 0 ? _a : 'Method not allowed for this resource.', action: (_b = params.action) !== null && _b !== void 0 ? _b : 'Please verify that the HTTP method used is valid for this resource.', statusCode: 405, requestId: params.requestId, errorId: params.errorId, stack: params.stack, errorLocationCode: params.errorLocationCode, severity: (_c = params.severity) !== null && _c !== void 0 ? _c : 'low' }, params)) || this;
    }
    return MethodNotAllowedError;
}(BaseError));
exports.MethodNotAllowedError = MethodNotAllowedError;
// Additional essential error classes
var BadRequestError = /** @class */ (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError(params) {
        if (params === void 0) { params = {}; }
        var _a, _b, _c;
        return _super.call(this, __assign({ name: 'BadRequestError', message: (_a = params.message) !== null && _a !== void 0 ? _a : 'The request is malformed or contains invalid parameters.', action: (_b = params.action) !== null && _b !== void 0 ? _b : 'Please check the request parameters and try again.', statusCode: 400, requestId: params.requestId, errorId: params.errorId, stack: params.stack, errorLocationCode: params.errorLocationCode, severity: (_c = params.severity) !== null && _c !== void 0 ? _c : 'medium' }, params)) || this;
    }
    return BadRequestError;
}(BaseError));
exports.BadRequestError = BadRequestError;
var ConflictError = /** @class */ (function (_super) {
    __extends(ConflictError, _super);
    function ConflictError(params) {
        if (params === void 0) { params = {}; }
        var _a, _b, _c;
        return _super.call(this, __assign({ name: 'ConflictError', message: (_a = params.message) !== null && _a !== void 0 ? _a : 'A conflict occurred while processing the request.', action: (_b = params.action) !== null && _b !== void 0 ? _b : 'Please resolve the conflict and try again.', statusCode: 409, requestId: params.requestId, errorId: params.errorId, stack: params.stack, errorLocationCode: params.errorLocationCode, severity: (_c = params.severity) !== null && _c !== void 0 ? _c : 'medium' }, params)) || this;
    }
    return ConflictError;
}(BaseError));
exports.ConflictError = ConflictError;
var GatewayTimeoutError = /** @class */ (function (_super) {
    __extends(GatewayTimeoutError, _super);
    function GatewayTimeoutError(params) {
        if (params === void 0) { params = {}; }
        var _a, _b, _c;
        return _super.call(this, __assign({ name: 'GatewayTimeoutError', message: (_a = params.message) !== null && _a !== void 0 ? _a : 'The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.', action: (_b = params.action) !== null && _b !== void 0 ? _b : 'Please try again later or contact support if the problem persists.', statusCode: 504, requestId: params.requestId, errorId: params.errorId, stack: params.stack, errorLocationCode: params.errorLocationCode, severity: (_c = params.severity) !== null && _c !== void 0 ? _c : 'medium' }, params)) || this;
    }
    return GatewayTimeoutError;
}(BaseError));
exports.GatewayTimeoutError = GatewayTimeoutError;
var BadGatewayError = /** @class */ (function (_super) {
    __extends(BadGatewayError, _super);
    function BadGatewayError(params) {
        if (params === void 0) { params = {}; }
        var _a, _b, _c;
        return _super.call(this, __assign({ name: 'BadGatewayError', message: (_a = params.message) !== null && _a !== void 0 ? _a : 'The server, while acting as a gateway or proxy, received an invalid response from the upstream server.', action: (_b = params.action) !== null && _b !== void 0 ? _b : 'Please try again later or contact support if the problem persists.', statusCode: 502, requestId: params.requestId, errorId: params.errorId, stack: params.stack, errorLocationCode: params.errorLocationCode, severity: (_c = params.severity) !== null && _c !== void 0 ? _c : 'high' }, params)) || this;
    }
    return BadGatewayError;
}(BaseError));
exports.BadGatewayError = BadGatewayError;
var DatabaseError = /** @class */ (function (_super) {
    __extends(DatabaseError, _super);
    function DatabaseError(params) {
        if (params === void 0) { params = {}; }
        var _a, _b, _c;
        return _super.call(this, __assign({ name: 'DatabaseError', message: (_a = params.message) !== null && _a !== void 0 ? _a : 'A database error occurred.', action: (_b = params.action) !== null && _b !== void 0 ? _b : 'Please try again later or contact support if the problem persists.', statusCode: 500, requestId: params.requestId, errorId: params.errorId, stack: params.stack, errorLocationCode: params.errorLocationCode, databaseErrorCode: params.databaseErrorCode, severity: (_c = params.severity) !== null && _c !== void 0 ? _c : 'high' }, params)) || this;
    }
    return DatabaseError;
}(BaseError));
exports.DatabaseError = DatabaseError;
var NetworkError = /** @class */ (function (_super) {
    __extends(NetworkError, _super);
    function NetworkError(params) {
        if (params === void 0) { params = {}; }
        var _a, _b, _c;
        return _super.call(this, __assign({ name: 'NetworkError', message: (_a = params.message) !== null && _a !== void 0 ? _a : 'A network error occurred.', action: (_b = params.action) !== null && _b !== void 0 ? _b : 'Please check your network connection and try again.', statusCode: 503, requestId: params.requestId, errorId: params.errorId, stack: params.stack, errorLocationCode: params.errorLocationCode, severity: (_c = params.severity) !== null && _c !== void 0 ? _c : 'medium' }, params)) || this;
    }
    return NetworkError;
}(BaseError));
exports.NetworkError = NetworkError;
var TimeoutError = /** @class */ (function (_super) {
    __extends(TimeoutError, _super);
    function TimeoutError(params) {
        if (params === void 0) { params = {}; }
        var _a, _b, _c;
        return _super.call(this, __assign({ name: 'TimeoutError', message: (_a = params.message) !== null && _a !== void 0 ? _a : 'The operation timed out.', action: (_b = params.action) !== null && _b !== void 0 ? _b : 'Please try again later or contact support if the problem persists.', statusCode: 408, requestId: params.requestId, errorId: params.errorId, stack: params.stack, errorLocationCode: params.errorLocationCode, severity: (_c = params.severity) !== null && _c !== void 0 ? _c : 'medium' }, params)) || this;
    }
    return TimeoutError;
}(BaseError));
exports.TimeoutError = TimeoutError;
var ConfigurationError = /** @class */ (function (_super) {
    __extends(ConfigurationError, _super);
    function ConfigurationError(params) {
        if (params === void 0) { params = {}; }
        var _a, _b, _c;
        return _super.call(this, __assign({ name: 'ConfigurationError', message: (_a = params.message) !== null && _a !== void 0 ? _a : 'A configuration error occurred.', action: (_b = params.action) !== null && _b !== void 0 ? _b : 'Please contact support as this indicates a server configuration issue.', statusCode: 500, requestId: params.requestId, errorId: params.errorId, stack: params.stack, errorLocationCode: params.errorLocationCode, severity: (_c = params.severity) !== null && _c !== void 0 ? _c : 'high' }, params)) || this;
    }
    return ConfigurationError;
}(BaseError));
exports.ConfigurationError = ConfigurationError;
var ResourceExhaustedError = /** @class */ (function (_super) {
    __extends(ResourceExhaustedError, _super);
    function ResourceExhaustedError(params) {
        if (params === void 0) { params = {}; }
        var _a, _b, _c;
        return _super.call(this, __assign({ name: 'ResourceExhaustedError', message: (_a = params.message) !== null && _a !== void 0 ? _a : 'Server resources have been exhausted.', action: (_b = params.action) !== null && _b !== void 0 ? _b : 'Please try again later or contact support if the problem persists.', statusCode: 429, requestId: params.requestId, errorId: params.errorId, stack: params.stack, errorLocationCode: params.errorLocationCode, severity: (_c = params.severity) !== null && _c !== void 0 ? _c : 'high' }, params)) || this;
    }
    return ResourceExhaustedError;
}(BaseError));
exports.ResourceExhaustedError = ResourceExhaustedError;
var NotImplementedError = /** @class */ (function (_super) {
    __extends(NotImplementedError, _super);
    function NotImplementedError(params) {
        if (params === void 0) { params = {}; }
        var _a, _b, _c;
        return _super.call(this, __assign({ name: 'NotImplementedError', message: (_a = params.message) !== null && _a !== void 0 ? _a : 'The requested functionality is not implemented.', action: (_b = params.action) !== null && _b !== void 0 ? _b : 'This feature is not available yet.', statusCode: 501, requestId: params.requestId, errorId: params.errorId, stack: params.stack, errorLocationCode: params.errorLocationCode, severity: (_c = params.severity) !== null && _c !== void 0 ? _c : 'low' }, params)) || this;
    }
    return NotImplementedError;
}(BaseError));
exports.NotImplementedError = NotImplementedError;
var DependencyError = /** @class */ (function (_super) {
    __extends(DependencyError, _super);
    function DependencyError(params) {
        if (params === void 0) { params = {}; }
        var _a, _b, _c;
        return _super.call(this, __assign({ name: 'DependencyError', message: (_a = params.message) !== null && _a !== void 0 ? _a : 'A dependency service is unavailable.', action: (_b = params.action) !== null && _b !== void 0 ? _b : 'Please try again later or contact support if the problem persists.', statusCode: 424, requestId: params.requestId, errorId: params.errorId, stack: params.stack, errorLocationCode: params.errorLocationCode, severity: (_c = params.severity) !== null && _c !== void 0 ? _c : 'high' }, params)) || this;
    }
    return DependencyError;
}(BaseError));
exports.DependencyError = DependencyError;
// Utility function to create error objects for logging
function createErrorLogObject(error) {
    return error.toLogObject();
}
// Utility function to determine if an error is a custom error
function isCustomError(error) {
    return error instanceof BaseError;
}
