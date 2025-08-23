"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var errors_1 = require("./errors");
(0, vitest_1.describe)('Error Classes', function () {
    var mockDate = new Date('2023-01-01T00:00:00.000Z');
    var mockRequestId = 'req-123';
    var mockErrorId = 'err-456';
    var mockUserId = 'user-789';
    var mockIpAddress = '192.168.1.1';
    var mockUserAgent = 'Mozilla/5.0';
    var mockEndpoint = '/api/test';
    var mockMethod = 'POST';
    var mockQueryParameters = { page: '1', limit: '10' };
    var mockRequestBody = { name: 'Test User' };
    var mockResponseTime = 150;
    var mockServiceName = 'user-service';
    var mockErrorLocationCode = 'USER_SERVICE:CREATE_USER';
    var mockDatabaseErrorCode = '23505';
    var mockStack = 'Error: Test error\n    at Object.<anonymous> (test.js:10:15)';
    var mockCause = new Error('Root cause error');
    var mockContext = { additional: 'context' };
    (0, vitest_1.beforeEach)(function () {
        vitest_1.vi.useFakeTimers();
        vitest_1.vi.setSystemTime(mockDate);
    });
    (0, vitest_1.afterEach)(function () {
        vitest_1.vi.useRealTimers();
    });
    (0, vitest_1.describe)('BaseError', function () {
        (0, vitest_1.it)('should create a BaseError with all properties', function () {
            var error = new errors_1.BaseError({
                name: 'TestError',
                message: 'Test error message',
                stack: mockStack,
                cause: mockCause,
                action: 'Test action',
                statusCode: 400,
                errorId: mockErrorId,
                requestId: mockRequestId,
                context: mockContext,
                errorLocationCode: mockErrorLocationCode,
                key: 'test_key',
                type: 'validation',
                databaseErrorCode: mockDatabaseErrorCode,
                originalError: mockCause,
                timestamp: mockDate,
                userId: mockUserId,
                ipAddress: mockIpAddress,
                userAgent: mockUserAgent,
                endpoint: mockEndpoint,
                method: mockMethod,
                queryParameters: mockQueryParameters,
                requestBody: mockRequestBody,
                responseTime: mockResponseTime,
                serviceName: mockServiceName,
                severity: 'high',
            });
            (0, vitest_1.expect)(error.name).toBe('TestError');
            (0, vitest_1.expect)(error.message).toBe('Test error message');
            (0, vitest_1.expect)(error.stack).toBe(mockStack);
            (0, vitest_1.expect)(error.cause).toBe(mockCause);
            (0, vitest_1.expect)(error.action).toBe('Test action');
            (0, vitest_1.expect)(error.statusCode).toBe(400);
            (0, vitest_1.expect)(error.errorId).toBe(mockErrorId);
            (0, vitest_1.expect)(error.requestId).toBe(mockRequestId);
            (0, vitest_1.expect)(error.context).toBe(mockContext);
            (0, vitest_1.expect)(error.errorLocationCode).toBe(mockErrorLocationCode);
            (0, vitest_1.expect)(error.key).toBe('test_key');
            (0, vitest_1.expect)(error.type).toBe('validation');
            (0, vitest_1.expect)(error.databaseErrorCode).toBe(mockDatabaseErrorCode);
            (0, vitest_1.expect)(error.originalError).toBe(mockCause);
            (0, vitest_1.expect)(error.timestamp.getTime()).toBe(mockDate.getTime());
            (0, vitest_1.expect)(error.userId).toBe(mockUserId);
            (0, vitest_1.expect)(error.ipAddress).toBe(mockIpAddress);
            (0, vitest_1.expect)(error.userAgent).toBe(mockUserAgent);
            (0, vitest_1.expect)(error.endpoint).toBe(mockEndpoint);
            (0, vitest_1.expect)(error.method).toBe(mockMethod);
            (0, vitest_1.expect)(error.queryParameters).toBe(mockQueryParameters);
            (0, vitest_1.expect)(error.requestBody).toBe(mockRequestBody);
            (0, vitest_1.expect)(error.responseTime).toBe(mockResponseTime);
            (0, vitest_1.expect)(error.serviceName).toBe(mockServiceName);
            (0, vitest_1.expect)(error.severity).toBe('high');
        });
        (0, vitest_1.it)('should create a BaseError with default values', function () {
            var error = new errors_1.BaseError({
                name: 'TestError',
                message: 'Test error message',
            });
            (0, vitest_1.expect)(error.statusCode).toBe(500);
            (0, vitest_1.expect)(error.errorId).toBeDefined();
            (0, vitest_1.expect)(error.timestamp.getTime()).toBe(mockDate.getTime());
            (0, vitest_1.expect)(error.severity).toBe('medium');
        });
        (0, vitest_1.it)('should generate different error IDs for different instances', function () {
            var error1 = new errors_1.BaseError({
                name: 'TestError1',
                message: 'Test message 1',
            });
            var error2 = new errors_1.BaseError({
                name: 'TestError2',
                message: 'Test message 2',
            });
            (0, vitest_1.expect)(error1.errorId).not.toBe(error2.errorId);
        });
        (0, vitest_1.it)('should handle error with all optional properties undefined', function () {
            var error = new errors_1.BaseError({
                name: 'TestError',
                message: 'Test message',
            });
            (0, vitest_1.expect)(error.cause).toBeUndefined();
            (0, vitest_1.expect)(error.action).toBeUndefined();
            (0, vitest_1.expect)(error.requestId).toBeUndefined();
            (0, vitest_1.expect)(error.context).toBeUndefined();
            (0, vitest_1.expect)(error.errorLocationCode).toBeUndefined();
            (0, vitest_1.expect)(error.key).toBeUndefined();
            (0, vitest_1.expect)(error.type).toBeUndefined();
            (0, vitest_1.expect)(error.databaseErrorCode).toBeUndefined();
            (0, vitest_1.expect)(error.originalError).toBeUndefined();
            (0, vitest_1.expect)(error.userId).toBeUndefined();
            (0, vitest_1.expect)(error.ipAddress).toBeUndefined();
            (0, vitest_1.expect)(error.userAgent).toBeUndefined();
            (0, vitest_1.expect)(error.endpoint).toBeUndefined();
            (0, vitest_1.expect)(error.method).toBeUndefined();
            (0, vitest_1.expect)(error.queryParameters).toBeUndefined();
            (0, vitest_1.expect)(error.requestBody).toBeUndefined();
            (0, vitest_1.expect)(error.responseTime).toBeUndefined();
            (0, vitest_1.expect)(error.serviceName).toBeUndefined();
        });
        (0, vitest_1.it)('should preserve original error in originalError property', function () {
            var originalError = new Error('Original error');
            var error = new errors_1.BaseError({
                name: 'TestError',
                message: 'Test message',
                originalError: originalError,
            });
            (0, vitest_1.expect)(error.originalError).toBe(originalError);
        });
        (0, vitest_1.it)('should return correct log object from toLogObject method', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error, logObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = new errors_1.BaseError({
                            name: 'TestError',
                            message: 'Test error message',
                            errorId: mockErrorId,
                            requestId: mockRequestId,
                            userId: mockUserId,
                            ipAddress: mockIpAddress,
                            endpoint: mockEndpoint,
                            method: mockMethod,
                            severity: 'high',
                            serviceName: mockServiceName,
                            responseTime: mockResponseTime,
                            errorLocationCode: mockErrorLocationCode,
                            context: mockContext,
                            stack: mockStack,
                        });
                        return [4 /*yield*/, error.toLogObject()];
                    case 1:
                        logObject = _a.sent();
                        (0, vitest_1.expect)(logObject).toEqual({
                            errorId: mockErrorId,
                            name: 'TestError',
                            message: 'Test error message',
                            statusCode: 500,
                            timestamp: mockDate.toISOString(),
                            requestId: mockRequestId,
                            userId: mockUserId,
                            ipAddress: mockIpAddress,
                            endpoint: mockEndpoint,
                            method: mockMethod,
                            severity: 'high',
                            serviceName: mockServiceName,
                            responseTime: mockResponseTime,
                            errorLocationCode: mockErrorLocationCode,
                            context: mockContext,
                            stack: mockStack,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, vitest_1.describe)('Error Subclasses', function () {
        (0, vitest_1.it)('should create an InternalServerError with default values', function () {
            var error = new errors_1.InternalServerError();
            (0, vitest_1.expect)(error.name).toBe('InternalServerError');
            (0, vitest_1.expect)(error.message).toBe('An unexpected internal server error occurred.');
            (0, vitest_1.expect)(error.action).toBe("Please provide the support team with the value found in the 'error_id' field.");
            (0, vitest_1.expect)(error.statusCode).toBe(500);
            (0, vitest_1.expect)(error.severity).toBe('high');
        });
        (0, vitest_1.it)('should create an InternalServerError with custom values', function () {
            var error = new errors_1.InternalServerError({
                message: 'Custom internal error',
                action: 'Custom action',
                statusCode: 503,
                requestId: mockRequestId,
                severity: 'critical',
            });
            (0, vitest_1.expect)(error.message).toBe('Custom internal error');
            (0, vitest_1.expect)(error.action).toBe('Custom action');
            (0, vitest_1.expect)(error.statusCode).toBe(503);
            (0, vitest_1.expect)(error.requestId).toBe(mockRequestId);
            (0, vitest_1.expect)(error.severity).toBe('critical');
        });
        (0, vitest_1.it)('should create a NotFoundError with default values', function () {
            var error = new errors_1.NotFoundError();
            (0, vitest_1.expect)(error.name).toBe('NotFoundError');
            (0, vitest_1.expect)(error.message).toBe('The requested resource was not found.');
            (0, vitest_1.expect)(error.action).toBe('Please verify that the path is correct.');
            (0, vitest_1.expect)(error.statusCode).toBe(404);
            (0, vitest_1.expect)(error.severity).toBe('low');
        });
        (0, vitest_1.it)('should create a NotFoundError with key', function () {
            var error = new errors_1.NotFoundError({
                key: 'user_id',
            });
            (0, vitest_1.expect)(error.key).toBe('user_id');
        });
        (0, vitest_1.it)('should create a ValidationError with default values', function () {
            var error = new errors_1.ValidationError();
            (0, vitest_1.expect)(error.name).toBe('ValidationError');
            (0, vitest_1.expect)(error.message).toBe('A validation error occurred.');
            (0, vitest_1.expect)(error.action).toBe('Please adjust the submitted data and try again.');
            (0, vitest_1.expect)(error.statusCode).toBe(400);
            (0, vitest_1.expect)(error.severity).toBe('medium');
        });
        (0, vitest_1.it)('should create a ValidationError with key and type', function () {
            var error = new errors_1.ValidationError({
                key: 'email',
                type: 'format',
            });
            (0, vitest_1.expect)(error.key).toBe('email');
            (0, vitest_1.expect)(error.type).toBe('format');
        });
        (0, vitest_1.it)('should create a DatabaseError with databaseErrorCode', function () {
            var error = new errors_1.DatabaseError({
                databaseErrorCode: mockDatabaseErrorCode,
            });
            (0, vitest_1.expect)(error.databaseErrorCode).toBe(mockDatabaseErrorCode);
        });
        (0, vitest_1.it)('should create a ServiceError with cause', function () {
            var error = new errors_1.ServiceError({
                cause: mockCause,
            });
            (0, vitest_1.expect)(error.cause).toBe(mockCause);
        });
        (0, vitest_1.it)('should create a TimeoutError with responseTime', function () {
            var error = new errors_1.TimeoutError({
                responseTime: mockResponseTime,
            });
            (0, vitest_1.expect)(error.responseTime).toBe(mockResponseTime);
        });
        (0, vitest_1.it)('should create a DependencyError with serviceName', function () {
            var error = new errors_1.DependencyError({
                serviceName: mockServiceName,
            });
            (0, vitest_1.expect)(error.serviceName).toBe(mockServiceName);
        });
        (0, vitest_1.it)('should create all error types with correct status codes', function () {
            var errors = [
                new errors_1.BadRequestError(),
                new errors_1.UnauthorizedError(),
                new errors_1.ForbiddenError(),
                new errors_1.NotFoundError(),
                new errors_1.MethodNotAllowedError(),
                new errors_1.ConflictError(),
                new errors_1.UnprocessableEntityError(),
                new errors_1.TooManyRequestsError(),
                new errors_1.InternalServerError(),
                new errors_1.NotImplementedError(),
                new errors_1.BadGatewayError(),
                new errors_1.ServiceError(),
                new errors_1.GatewayTimeoutError(),
                new errors_1.NetworkError(),
                new errors_1.TimeoutError(),
                new errors_1.DatabaseError(),
                new errors_1.ConfigurationError(),
                new errors_1.ResourceExhaustedError(),
                new errors_1.DependencyError(),
            ];
            var expectedStatusCodes = [
                400, 401, 403, 404, 405, 409, 422, 429, 500, 501, 502, 503, 504, 503, 408, 500, 500, 429, 424,
            ];
            errors.forEach(function (error, index) {
                (0, vitest_1.expect)(error.statusCode).toBe(expectedStatusCodes[index]);
            });
        });
    });
    (0, vitest_1.describe)('Utility Functions', function () {
        (0, vitest_1.it)('should use createErrorLogObject utility function', function () { return __awaiter(void 0, void 0, void 0, function () {
            var error, logObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = new errors_1.InternalServerError({
                            errorId: mockErrorId,
                        });
                        return [4 /*yield*/, (0, errors_1.createErrorLogObject)(error)];
                    case 1:
                        logObject = _a.sent();
                        (0, vitest_1.expect)(logObject).toBeDefined();
                        (0, vitest_1.expect)(logObject).toHaveProperty('errorId');
                        (0, vitest_1.expect)(logObject).toHaveProperty('name', 'InternalServerError');
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.it)('should identify custom errors with isCustomError', function () {
            var customError = new errors_1.InternalServerError();
            var nativeError = new Error('Native error');
            (0, vitest_1.expect)((0, errors_1.isCustomError)(customError)).toBe(true);
            (0, vitest_1.expect)((0, errors_1.isCustomError)(nativeError)).toBe(false);
            (0, vitest_1.expect)((0, errors_1.isCustomError)(null)).toBe(false);
            (0, vitest_1.expect)((0, errors_1.isCustomError)(undefined)).toBe(false);
            (0, vitest_1.expect)((0, errors_1.isCustomError)({})).toBe(false);
        });
    });
    (0, vitest_1.describe)('Error with complex context object', function () {
        (0, vitest_1.it)('should handle error with complex context object', function () { return __awaiter(void 0, void 0, void 0, function () {
            var complexContext, error, logObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        complexContext = {
                            user: {
                                id: 'user-123',
                                roles: ['admin', 'user'],
                                preferences: { theme: 'dark', notifications: true },
                            },
                            request: {
                                headers: { 'user-agent': 'test-agent', authorization: 'Bearer token' },
                                body: { action: 'create', data: { name: 'Test' } },
                            },
                            environment: 'production',
                            timestamp: new Date().toISOString(),
                        };
                        error = new errors_1.ValidationError({
                            context: complexContext,
                        });
                        return [4 /*yield*/, error.toLogObject()];
                    case 1:
                        logObject = _a.sent();
                        (0, vitest_1.expect)(logObject.context).toEqual(complexContext);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
