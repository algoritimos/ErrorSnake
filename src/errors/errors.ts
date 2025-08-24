type BaseErrorParams = {
  name: string;
  message: string;
  stack?: string;
  cause?: unknown;
  action?: string;
  statusCode?: number;
  errorId?: string;
  requestId?: string;
  context?: unknown;
  errorLocationCode?: string;
  key?: string;
  type?: string;
  databaseErrorCode?: string;
  originalError?: unknown;
  timestamp?: Date;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  endpoint?: string;
  method?: string;
  queryParameters?: Record<string, unknown>;
  requestBody?: unknown;
  responseTime?: number;
  serviceName?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
};

export class BaseError extends Error {
  public cause?: unknown;
  public action?: string;
  public statusCode: number;
  public errorId: string;
  public requestId?: string;
  public context?: unknown;
  public errorLocationCode?: string;
  public key?: string;
  public type?: string;
  public databaseErrorCode?: string;
  public originalError?: unknown;
  public timestamp: Date;
  public userId?: string;
  public ipAddress?: string;
  public userAgent?: string;
  public endpoint?: string;
  public method?: string;
  public queryParameters?: Record<string, unknown>;
  public requestBody?: unknown;
  public responseTime?: number;
  public serviceName?: string;
  public severity: 'low' | 'medium' | 'high' | 'critical';

  constructor({
    name,
    message,
    stack,
    cause,
    action,
    statusCode,
    errorId,
    requestId,
    context,
    errorLocationCode,
    key,
    type,
    databaseErrorCode,
    originalError,
    timestamp,
    userId,
    ipAddress,
    userAgent,
    endpoint,
    method,
    queryParameters,
    requestBody,
    responseTime,
    serviceName,
    severity = 'medium',
  }: BaseErrorParams) {
    super(message);
    this.name = name;
    this.message = message;
    this.stack = stack;
    this.cause = cause;
    this.action = action;
    this.statusCode = statusCode ?? 500;
    this.errorId = errorId ?? crypto.randomUUID();
    this.requestId = requestId;
    this.context = context;
    this.errorLocationCode = errorLocationCode;
    this.key = key;
    this.type = type;
    this.databaseErrorCode = databaseErrorCode;
    this.originalError = originalError;
    this.timestamp = timestamp ?? new Date();
    this.userId = userId;
    this.ipAddress = ipAddress;
    this.userAgent = userAgent;
    this.endpoint = endpoint;
    this.method = method;
    this.queryParameters = queryParameters;
    this.requestBody = requestBody;
    this.responseTime = responseTime;
    this.serviceName = serviceName;
    this.severity = severity;
  }

  

  toLogObject(){
    
    const toLogObject = {
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
  }
}

// Reusable types
type CommonErrorParams = {
  message?: string;
  action?: string;
  requestId?: string;
  errorId?: string;
  stack?: string;
  errorLocationCode?: string;
  context?: unknown;
  key?: string;
  type?: string;
  statusCode?: number;
  databaseErrorCode?: string;
  cause?: unknown;
  originalError?: unknown;
  timestamp?: Date;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  endpoint?: string;
  method?: string;
  queryParameters?: Record<string, unknown>;
  requestBody?: unknown;
  responseTime?: number;
  serviceName?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
};

// Existing error classes translated to English
export class InternalServerError extends BaseError {
  constructor(params: CommonErrorParams = {}) {
    super({
      name: 'InternalServerError',
      message: params.message ?? 'An unexpected internal server error occurred.',
      action: params.action ?? "Please provide the support team with the value found in the 'error_id' field.",
      statusCode: params.statusCode ?? 500,
      requestId: params.requestId,
      errorId: params.errorId,
      stack: params.stack,
      errorLocationCode: params.errorLocationCode,
      severity: params.severity ?? 'high',
      ...params,
    });
  }
}

export class NotFoundError extends BaseError {
  constructor(params: CommonErrorParams = {}) {
    super({
      name: 'NotFoundError',
      message: params.message ?? 'The requested resource was not found.',
      action: params.action ?? 'Please verify that the path is correct.',
      statusCode: 404,
      requestId: params.requestId,
      errorId: params.errorId,
      stack: params.stack,
      errorLocationCode: params.errorLocationCode,
      key: params.key,
      severity: params.severity ?? 'low',
      ...params,
    });
  }
}

export class ServiceError extends BaseError {
  constructor(params: CommonErrorParams = {}) {
    super({
      name: 'ServiceError',
      message: params.message ?? 'Service is currently unavailable.',
      action: params.action ?? 'Please check if the service is available.',
      statusCode: params.statusCode ?? 503,
      stack: params.stack,
      context: params.context,
      errorLocationCode: params.errorLocationCode,
      databaseErrorCode: params.databaseErrorCode,
      cause: params.cause,
      severity: params.severity ?? 'high',
      ...params,
    });
  }
}

export class ValidationError extends BaseError {
  constructor(params: CommonErrorParams = {}) {
    super({
      name: 'ValidationError',
      message: params.message ?? 'A validation error occurred.',
      action: params.action ?? 'Please adjust the submitted data and try again.',
      statusCode: params.statusCode ?? 400,
      stack: params.stack,
      context: params.context,
      errorLocationCode: params.errorLocationCode,
      key: params.key,
      type: params.type,
      severity: params.severity ?? 'medium',
      ...params,
    });
  }
}

export class UnauthorizedError extends BaseError {
  constructor(params: CommonErrorParams = {}) {
    super({
      name: 'UnauthorizedError',
      message: params.message ?? 'User is not authenticated.',
      action: params.action ?? 'Please verify that you are authenticated with an active session and try again.',
      statusCode: 401,
      requestId: params.requestId,
      stack: params.stack,
      errorLocationCode: params.errorLocationCode,
      severity: params.severity ?? 'medium',
      ...params,
    });
  }
}

export class ForbiddenError extends BaseError {
  constructor(params: CommonErrorParams = {}) {
    super({
      name: 'ForbiddenError',
      message: params.message ?? 'You do not have permission to perform this action.',
      action: params.action ?? 'Please verify that you have permission to perform this action.',
      statusCode: 403,
      requestId: params.requestId,
      stack: params.stack,
      errorLocationCode: params.errorLocationCode,
      severity: params.severity ?? 'medium',
      ...params,
    });
  }
}

export class TooManyRequestsError extends BaseError {
  constructor(params: CommonErrorParams = {}) {
    super({
      name: 'TooManyRequestsError',
      message: params.message ?? 'You have made too many requests recently.',
      action: params.action ?? 'Please try again later or contact support if you believe this is an error.',
      statusCode: 429,
      context: params.context,
      stack: params.stack,
      errorLocationCode: params.errorLocationCode,
      severity: params.severity ?? 'low',
      ...params,
    });
  }
}

export class UnprocessableEntityError extends BaseError {
  constructor(params: CommonErrorParams = {}) {
    super({
      name: 'UnprocessableEntityError',
      message: params.message ?? 'Unable to process the request.',
      action: params.action ?? 'The submitted data is correct, but the operation could not be completed.',
      statusCode: 422,
      stack: params.stack,
      errorLocationCode: params.errorLocationCode,
      severity: params.severity ?? 'medium',
      ...params,
    });
  }
}

export class MethodNotAllowedError extends BaseError {
  constructor(params: CommonErrorParams = {}) {
    super({
      name: 'MethodNotAllowedError',
      message: params.message ?? 'Method not allowed for this resource.',
      action: params.action ?? 'Please verify that the HTTP method used is valid for this resource.',
      statusCode: 405,
      requestId: params.requestId,
      errorId: params.errorId,
      stack: params.stack,
      errorLocationCode: params.errorLocationCode,
      severity: params.severity ?? 'low',
      ...params,
    });
  }
}

// Additional essential error classes
export class BadRequestError extends BaseError {
  constructor(params: CommonErrorParams = {}) {
    super({
      name: 'BadRequestError',
      message: params.message ?? 'The request is malformed or contains invalid parameters.',
      action: params.action ?? 'Please check the request parameters and try again.',
      statusCode: 400,
      requestId: params.requestId,
      errorId: params.errorId,
      stack: params.stack,
      errorLocationCode: params.errorLocationCode,
      severity: params.severity ?? 'medium',
      ...params,
    });
  }
}

export class ConflictError extends BaseError {
  constructor(params: CommonErrorParams = {}) {
    super({
      name: 'ConflictError',
      message: params.message ?? 'A conflict occurred while processing the request.',
      action: params.action ?? 'Please resolve the conflict and try again.',
      statusCode: 409,
      requestId: params.requestId,
      errorId: params.errorId,
      stack: params.stack,
      errorLocationCode: params.errorLocationCode,
      severity: params.severity ?? 'medium',
      ...params,
    });
  }
}

export class GatewayTimeoutError extends BaseError {
  constructor(params: CommonErrorParams = {}) {
    super({
      name: 'GatewayTimeoutError',
      message: params.message ?? 'The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.',
      action: params.action ?? 'Please try again later or contact support if the problem persists.',
      statusCode: 504,
      requestId: params.requestId,
      errorId: params.errorId,
      stack: params.stack,
      errorLocationCode: params.errorLocationCode,
      severity: params.severity ?? 'medium',
      ...params,
    });
  }
}

export class BadGatewayError extends BaseError {
  constructor(params: CommonErrorParams = {}) {
    super({
      name: 'BadGatewayError',
      message: params.message ?? 'The server, while acting as a gateway or proxy, received an invalid response from the upstream server.',
      action: params.action ?? 'Please try again later or contact support if the problem persists.',
      statusCode: 502,
      requestId: params.requestId,
      errorId: params.errorId,
      stack: params.stack,
      errorLocationCode: params.errorLocationCode,
      severity: params.severity ?? 'high',
      ...params,
    });
  }
}

export class DatabaseError extends BaseError {
  constructor(params: CommonErrorParams = {}) {
    super({
      name: 'DatabaseError',
      message: params.message ?? 'A database error occurred.',
      action: params.action ?? 'Please try again later or contact support if the problem persists.',
      statusCode: 500,
      requestId: params.requestId,
      errorId: params.errorId,
      stack: params.stack,
      errorLocationCode: params.errorLocationCode,
      databaseErrorCode: params.databaseErrorCode,
      severity: params.severity ?? 'high',
      ...params,
    });
  }
}

export class NetworkError extends BaseError {
  constructor(params: CommonErrorParams = {}) {
    super({
      name: 'NetworkError',
      message: params.message ?? 'A network error occurred.',
      action: params.action ?? 'Please check your network connection and try again.',
      statusCode: 503,
      requestId: params.requestId,
      errorId: params.errorId,
      stack: params.stack,
      errorLocationCode: params.errorLocationCode,
      severity: params.severity ?? 'medium',
      ...params, 
    });
  }
}

export class TimeoutError extends BaseError {
  constructor(params: CommonErrorParams = {}) {
    super({
      name: 'TimeoutError',
      message: params.message ?? 'The operation timed out.',
      action: params.action ?? 'Please try again later or contact support if the problem persists.',
      statusCode: 408,
      requestId: params.requestId,
      errorId: params.errorId,
      stack: params.stack,
      errorLocationCode: params.errorLocationCode,
      severity: params.severity ?? 'medium',
      ...params,
    });
  }
}

export class ConfigurationError extends BaseError {
  constructor(params: CommonErrorParams = {}) {
    super({
      name: 'ConfigurationError',
      message: params.message ?? 'A configuration error occurred.',
      action: params.action ?? 'Please contact support as this indicates a server configuration issue.',
      statusCode: 500,
      requestId: params.requestId,
      errorId: params.errorId,
      stack: params.stack,
      errorLocationCode: params.errorLocationCode,
      severity: params.severity ?? 'high',
      ...params,
    });
  }
}

export class ResourceExhaustedError extends BaseError {
  constructor(params: CommonErrorParams = {}) {
    super({
      name: 'ResourceExhaustedError',
      message: params.message ?? 'Server resources have been exhausted.',
      action: params.action ?? 'Please try again later or contact support if the problem persists.',
      statusCode: 429,
      requestId: params.requestId,
      errorId: params.errorId,
      stack: params.stack,
      errorLocationCode: params.errorLocationCode,
      severity: params.severity ?? 'high',
      ...params,
    });
  }
}

export class NotImplementedError extends BaseError {
  constructor(params: CommonErrorParams = {}) {
    super({
      name: 'NotImplementedError',
      message: params.message ?? 'The requested functionality is not implemented.',
      action: params.action ?? 'This feature is not available yet.',
      statusCode: 501,
      requestId: params.requestId,
      errorId: params.errorId,
      stack: params.stack,
      errorLocationCode: params.errorLocationCode,
      severity: params.severity ?? 'low',
      ...params,
    });
  }
}

export class DependencyError extends BaseError {
  constructor(params: CommonErrorParams = {}) {
    super({
      name: 'DependencyError',
      message: params.message ?? 'A dependency service is unavailable.',
      action: params.action ?? 'Please try again later or contact support if the problem persists.',
      statusCode: 424,
      requestId: params.requestId,
      errorId: params.errorId,
      stack: params.stack,
      errorLocationCode: params.errorLocationCode,
      severity: params.severity ?? 'high',
      ...params,
    });
  }
}

// Utility function to create error objects for logging
export function createErrorLogObject(error: BaseError) {
  return error.toLogObject();
}

// Utility function to determine if an error is a custom error
export function isCustomError(error: unknown): error is BaseError {
  return error instanceof BaseError;
}