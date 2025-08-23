'use server'

export async function parsed<T = unknown>(obj: T): Promise<T> {
  const seen = new WeakMap<object, unknown>();
  return _parsed(obj, seen) as T;
}

function _parsed(obj: unknown, seen: WeakMap<object, unknown>): unknown {

    if (obj === null || obj === undefined || typeof obj !== 'object') {
    return obj;
  }
  
  if (seen.has(obj as object)) {
    return seen.get(obj as object);
  }
  
  
  if (isDate(obj) || isRegex(obj) || isArrayBufferView(obj)) {
    return obj;
  }
  
 
  if (isBuiltInObject(obj)) {
    return obj;
  }
  
  
  if (isBuffer(obj)) {
    return obj;
  }
  
 
  if (Array.isArray(obj)) {
    const result: unknown[] = [];
    seen.set(obj, result);
    
    for (let i = 0; i < obj.length; i++) {
      result[i] = _parsed(obj[i], seen);
    }
    
    return result;
  }
  
  
  const result: Record<string, unknown> = {};
  seen.set(obj, result);
  
  
  for (const key of Object.keys(obj)) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      continue;
    }
    
    const parsedKey = toSnakeCase(key);
    const value = (obj as Record<string, unknown>)[key];
    result[parsedKey] = _parsed(value, seen);
  }
  
  
  const symbolKeys = Object.getOwnPropertySymbols(obj);
  for (const symbolKey of symbolKeys) {
    const value = (obj as Record<symbol, unknown>)[symbolKey];
    result[symbolKey as unknown as string] = _parsed(value, seen);
  }
  
  return result;
}


function isDate(obj: unknown): obj is Date {
  return Object.prototype.toString.call(obj) === '[object Date]';
}

function isRegex(obj: unknown): obj is RegExp {
  return Object.prototype.toString.call(obj) === '[object RegExp]';
}

function isArrayBufferView(obj: unknown): boolean {
  return ArrayBuffer.isView(obj);
}

function isBuffer(obj: unknown): obj is Buffer {
  return typeof Buffer !== 'undefined' && Buffer.isBuffer(obj);
}

function isBuiltInObject(obj: unknown): boolean {
  const builtInTypes = [
    '[object Map]', '[object Set]', '[object WeakMap]', '[object WeakSet]',
    '[object Promise]', '[object Error]', '[object Module]', '[object Blob]',
    '[object File]', '[object FormData]', '[object URLSearchParams]',
    '[object ArrayBuffer]'
  ];
  
  return builtInTypes.includes(Object.prototype.toString.call(obj));
}


function toSnakeCase(key: string): string {
  return key
    
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')
    .replace(/([0-9])([A-Za-z])/g, '$1_$2')
    .replace(/([0-9])([A-Za-z])/g, '$1_$2')
    .toLowerCase()
    .replace(/_{2,}/g, '_')
    .replace(/^_|_$/g, '');
}