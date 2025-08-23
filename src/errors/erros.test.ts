import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  BaseError,
  InternalServerError,
  NotFoundError,
  ServiceError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  TooManyRequestsError,
  UnprocessableEntityError,
  MethodNotAllowedError,
  BadRequestError,
  ConflictError,
  GatewayTimeoutError,
  BadGatewayError,
  DatabaseError,
  NetworkError,
  TimeoutError,
  ConfigurationError,
  ResourceExhaustedError,
  NotImplementedError,
  DependencyError,
  createErrorLogObject,
  isCustomError,
} from './errors';

describe('Error Classes', () => {
  const mockDate = new Date('2023-01-01T00:00:00.000Z');
  const mockRequestId = 'req-123';
  const mockErrorId = 'err-456';
  const mockUserId = 'user-789';
  const mockIpAddress = '192.168.1.1';
  const mockUserAgent = 'Mozilla/5.0';
  const mockEndpoint = '/api/test';
  const mockMethod = 'POST';
  const mockQueryParameters = { page: '1', limit: '10' };
  const mockRequestBody = { name: 'Test User' };
  const mockResponseTime = 150;
  const mockServiceName = 'user-service';
  const mockErrorLocationCode = 'USER_SERVICE:CREATE_USER';
  const mockDatabaseErrorCode = '23505';
  const mockStack = 'Error: Test error\n    at Object.<anonymous> (test.js:10:15)';
  const mockCause = new Error('Root cause error');
  const mockContext = { additional: 'context' };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('BaseError', () => {
    it('should create a BaseError with all properties', () => {
      const error = new BaseError({
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

      expect(error.name).toBe('TestError');
      expect(error.message).toBe('Test error message');
      expect(error.stack).toBe(mockStack);
      expect(error.cause).toBe(mockCause);
      expect(error.action).toBe('Test action');
      expect(error.statusCode).toBe(400);
      expect(error.errorId).toBe(mockErrorId);
      expect(error.requestId).toBe(mockRequestId);
      expect(error.context).toBe(mockContext);
      expect(error.errorLocationCode).toBe(mockErrorLocationCode);
      expect(error.key).toBe('test_key');
      expect(error.type).toBe('validation');
      expect(error.databaseErrorCode).toBe(mockDatabaseErrorCode);
      expect(error.originalError).toBe(mockCause);
      expect(error.timestamp.getTime()).toBe(mockDate.getTime());
      expect(error.userId).toBe(mockUserId);
      expect(error.ipAddress).toBe(mockIpAddress);
      expect(error.userAgent).toBe(mockUserAgent);
      expect(error.endpoint).toBe(mockEndpoint);
      expect(error.method).toBe(mockMethod);
      expect(error.queryParameters).toBe(mockQueryParameters);
      expect(error.requestBody).toBe(mockRequestBody);
      expect(error.responseTime).toBe(mockResponseTime);
      expect(error.serviceName).toBe(mockServiceName);
      expect(error.severity).toBe('high');
    });

    it('should create a BaseError with default values', () => {
      const error = new BaseError({
        name: 'TestError',
        message: 'Test error message',
      });

      expect(error.statusCode).toBe(500);
      expect(error.errorId).toBeDefined();
      expect(error.timestamp.getTime()).toBe(mockDate.getTime());
      expect(error.severity).toBe('medium');
    });

    it('should generate different error IDs for different instances', () => {
      const error1 = new BaseError({
        name: 'TestError1',
        message: 'Test message 1',
      });

      const error2 = new BaseError({
        name: 'TestError2',
        message: 'Test message 2',
      });

      expect(error1.errorId).not.toBe(error2.errorId);
    });

    it('should handle error with all optional properties undefined', () => {
      const error = new BaseError({
        name: 'TestError',
        message: 'Test message',
      });

      expect(error.cause).toBeUndefined();
      expect(error.action).toBeUndefined();
      expect(error.requestId).toBeUndefined();
      expect(error.context).toBeUndefined();
      expect(error.errorLocationCode).toBeUndefined();
      expect(error.key).toBeUndefined();
      expect(error.type).toBeUndefined();
      expect(error.databaseErrorCode).toBeUndefined();
      expect(error.originalError).toBeUndefined();
      expect(error.userId).toBeUndefined();
      expect(error.ipAddress).toBeUndefined();
      expect(error.userAgent).toBeUndefined();
      expect(error.endpoint).toBeUndefined();
      expect(error.method).toBeUndefined();
      expect(error.queryParameters).toBeUndefined();
      expect(error.requestBody).toBeUndefined();
      expect(error.responseTime).toBeUndefined();
      expect(error.serviceName).toBeUndefined();
    });

    it('should preserve original error in originalError property', () => {
      const originalError = new Error('Original error');
      const error = new BaseError({
        name: 'TestError',
        message: 'Test message',
        originalError,
      });

      expect(error.originalError).toBe(originalError);
    });

    it('should return correct log object from toLogObject method', async () => {
      const error = new BaseError({
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

      const logObject = await error.toLogObject();
      expect(logObject).toEqual({
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
    });
  });

  describe('Error Subclasses', () => {
    it('should create an InternalServerError with default values', () => {
      const error = new InternalServerError();

      expect(error.name).toBe('InternalServerError');
      expect(error.message).toBe('An unexpected internal server error occurred.');
      expect(error.action).toBe("Please provide the support team with the value found in the 'error_id' field.");
      expect(error.statusCode).toBe(500);
      expect(error.severity).toBe('high');
    });

    it('should create an InternalServerError with custom values', () => {
      const error = new InternalServerError({
        message: 'Custom internal error',
        action: 'Custom action',
        statusCode: 503,
        requestId: mockRequestId,
        severity: 'critical',
      });

      expect(error.message).toBe('Custom internal error');
      expect(error.action).toBe('Custom action');
      expect(error.statusCode).toBe(503);
      expect(error.requestId).toBe(mockRequestId);
      expect(error.severity).toBe('critical');
    });

    it('should create a NotFoundError with default values', () => {
      const error = new NotFoundError();

      expect(error.name).toBe('NotFoundError');
      expect(error.message).toBe('The requested resource was not found.');
      expect(error.action).toBe('Please verify that the path is correct.');
      expect(error.statusCode).toBe(404);
      expect(error.severity).toBe('low');
    });

    it('should create a NotFoundError with key', () => {
      const error = new NotFoundError({
        key: 'user_id',
      });

      expect(error.key).toBe('user_id');
    });

    it('should create a ValidationError with default values', () => {
      const error = new ValidationError();

      expect(error.name).toBe('ValidationError');
      expect(error.message).toBe('A validation error occurred.');
      expect(error.action).toBe('Please adjust the submitted data and try again.');
      expect(error.statusCode).toBe(400);
      expect(error.severity).toBe('medium');
    });

    it('should create a ValidationError with key and type', () => {
      const error = new ValidationError({
        key: 'email',
        type: 'format',
      });

      expect(error.key).toBe('email');
      expect(error.type).toBe('format');
    });

    it('should create a DatabaseError with databaseErrorCode', () => {
      const error = new DatabaseError({
        databaseErrorCode: mockDatabaseErrorCode,
      });

      expect(error.databaseErrorCode).toBe(mockDatabaseErrorCode);
    });

    it('should create a ServiceError with cause', () => {
      const error = new ServiceError({
        cause: mockCause,
      });

      expect(error.cause).toBe(mockCause);
    });

    it('should create a TimeoutError with responseTime', () => {
      const error = new TimeoutError({
        responseTime: mockResponseTime,
      });

      expect(error.responseTime).toBe(mockResponseTime);
    });

    it('should create a DependencyError with serviceName', () => {
      const error = new DependencyError({
        serviceName: mockServiceName,
      });

      expect(error.serviceName).toBe(mockServiceName);
    });

    it('should create all error types with correct status codes', () => {
      const errors = [
        new BadRequestError(),
        new UnauthorizedError(),
        new ForbiddenError(),
        new NotFoundError(),
        new MethodNotAllowedError(),
        new ConflictError(),
        new UnprocessableEntityError(),
        new TooManyRequestsError(),
        new InternalServerError(),
        new NotImplementedError(),
        new BadGatewayError(),
        new ServiceError(),
        new GatewayTimeoutError(),
        new NetworkError(),
        new TimeoutError(),
        new DatabaseError(),
        new ConfigurationError(),
        new ResourceExhaustedError(),
        new DependencyError(),
      ];

      const expectedStatusCodes = [
        400, 401, 403, 404, 405, 409, 422, 429, 500, 501, 502, 503, 504, 503, 408, 500, 500, 429, 424,
      ];

      errors.forEach((error, index) => {
        expect(error.statusCode).toBe(expectedStatusCodes[index]);
      });
    });
  });

  describe('Utility Functions', () => {
    it('should use createErrorLogObject utility function', async () => {
      const error = new InternalServerError({
        errorId: mockErrorId,
      });

      const logObject = await createErrorLogObject(error);
      expect(logObject).toBeDefined();
      expect(logObject).toHaveProperty('errorId');
      expect(logObject).toHaveProperty('name', 'InternalServerError');
    });

    it('should identify custom errors with isCustomError', () => {
      const customError = new InternalServerError();
      const nativeError = new Error('Native error');

      expect(isCustomError(customError)).toBe(true);
      expect(isCustomError(nativeError)).toBe(false);
      expect(isCustomError(null)).toBe(false);
      expect(isCustomError(undefined)).toBe(false);
      expect(isCustomError({})).toBe(false);
    });
  });

  describe('Error with complex context object', () => {
    it('should handle error with complex context object', async () => {
      const complexContext = {
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

      const error = new ValidationError({
        context: complexContext,
      });

      const logObject = await error.toLogObject();
      expect(logObject.context).toEqual(complexContext);
    });
  });
});