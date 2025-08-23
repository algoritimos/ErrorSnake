'use server';
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
exports.parsed = parsed;
function parsed(obj) {
    return __awaiter(this, void 0, void 0, function () {
        var seen;
        return __generator(this, function (_a) {
            seen = new WeakMap();
            return [2 /*return*/, _parsed(obj, seen)];
        });
    });
}
function _parsed(obj, seen) {
    if (obj === null || obj === undefined || typeof obj !== 'object') {
        return obj;
    }
    if (seen.has(obj)) {
        return seen.get(obj);
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
        var result_1 = [];
        seen.set(obj, result_1);
        for (var i = 0; i < obj.length; i++) {
            result_1[i] = _parsed(obj[i], seen);
        }
        return result_1;
    }
    var result = {};
    seen.set(obj, result);
    for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
        var key = _a[_i];
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
            continue;
        }
        var parsedKey = toSnakeCase(key);
        var value = obj[key];
        result[parsedKey] = _parsed(value, seen);
    }
    var symbolKeys = Object.getOwnPropertySymbols(obj);
    for (var _b = 0, symbolKeys_1 = symbolKeys; _b < symbolKeys_1.length; _b++) {
        var symbolKey = symbolKeys_1[_b];
        var value = obj[symbolKey];
        result[symbolKey] = _parsed(value, seen);
    }
    return result;
}
function isDate(obj) {
    return Object.prototype.toString.call(obj) === '[object Date]';
}
function isRegex(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
}
function isArrayBufferView(obj) {
    return ArrayBuffer.isView(obj);
}
function isBuffer(obj) {
    return typeof Buffer !== 'undefined' && Buffer.isBuffer(obj);
}
function isBuiltInObject(obj) {
    var builtInTypes = [
        '[object Map]', '[object Set]', '[object WeakMap]', '[object WeakSet]',
        '[object Promise]', '[object Error]', '[object Module]', '[object Blob]',
        '[object File]', '[object FormData]', '[object URLSearchParams]',
        '[object ArrayBuffer]'
    ];
    return builtInTypes.includes(Object.prototype.toString.call(obj));
}
function toSnakeCase(key) {
    return key
        .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')
        .replace(/([0-9])([A-Za-z])/g, '$1_$2')
        .replace(/([0-9])([A-Za-z])/g, '$1_$2')
        .toLowerCase()
        .replace(/_{2,}/g, '_')
        .replace(/^_|_$/g, '');
}
