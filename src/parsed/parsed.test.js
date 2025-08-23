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
var parsed_1 = require("./parsed");
(0, vitest_1.describe)('parsed function (consolidated)', function () {
    (0, vitest_1.it)('should handle all case conversion patterns correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var input, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = {
                        camelCase: 'camel',
                        PascalCase: 'pascal',
                        HTTPRequest: 'http',
                        XMLParser: 'xml',
                        ID: 'id',
                        userID: 'user_id',
                        HTMLContent: 'html',
                        UTF8Encoding: 'encoding',
                        already_snake: 'snake',
                        _leadingUnderscore: 'leading',
                        trailingUnderscore_: 'trailing',
                        multiple___underscores: 'multiple',
                        item2: 'second',
                        test3D: '3d',
                        uuid4: 'id',
                        MP3Player: 'player',
                        KR4esolution: 'resolution'
                    };
                    expected = {
                        camel_case: 'camel',
                        pascal_case: 'pascal',
                        http_request: 'http',
                        xml_parser: 'xml',
                        id: 'id',
                        user_id: 'user_id',
                        html_content: 'html',
                        utf8_encoding: 'encoding',
                        already_snake: 'snake',
                        leading_underscore: 'leading',
                        trailing_underscore: 'trailing',
                        multiple_underscores: 'multiple',
                        item2: 'second',
                        test3_d: '3d',
                        uuid4: 'id',
                        mp3_player: 'player',
                        'kr4_esolution': 'resolution'
                    };
                    _a = vitest_1.expect;
                    return [4 /*yield*/, (0, parsed_1.parsed)(input)];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toEqual(expected);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('should handle complex nested structures', function () { return __awaiter(void 0, void 0, void 0, function () {
        var input, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = {
                        userData: {
                            firstName: 'John',
                            lastName: 'Doe',
                            contactInfo: {
                                emailAddress: 'john.doe@example.com',
                                phoneNumbers: [
                                    { homePhone: '123-456-7890' },
                                    { workPhone: '098-765-4321' }
                                ]
                            },
                            preferences: {
                                emailNotifications: true,
                                smsNotifications: false
                            }
                        },
                        accountSettings: {
                            twoFactorAuth: true,
                            privacyLevel: 'high'
                        }
                    };
                    expected = {
                        user_data: {
                            first_name: 'John',
                            last_name: 'Doe',
                            contact_info: {
                                email_address: 'john.doe@example.com',
                                phone_numbers: [
                                    { home_phone: '123-456-7890' },
                                    { work_phone: '098-765-4321' }
                                ]
                            },
                            preferences: {
                                email_notifications: true,
                                sms_notifications: false
                            }
                        },
                        account_settings: {
                            two_factor_auth: true,
                            privacy_level: 'high'
                        }
                    };
                    _a = vitest_1.expect;
                    return [4 /*yield*/, (0, parsed_1.parsed)(input)];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toEqual(expected);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('should preserve special objects', function () { return __awaiter(void 0, void 0, void 0, function () {
        var date, regex, map, set, buffer, _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    date = new Date();
                    regex = /test/g;
                    map = new Map([['key', 'value']]);
                    set = new Set([1, 2, 3]);
                    buffer = typeof Buffer !== 'undefined' ? Buffer.from('test') : new Uint8Array([1, 2, 3]);
                    _a = vitest_1.expect;
                    return [4 /*yield*/, (0, parsed_1.parsed)(date)];
                case 1:
                    _a.apply(void 0, [_f.sent()]).toBe(date);
                    _b = vitest_1.expect;
                    return [4 /*yield*/, (0, parsed_1.parsed)(regex)];
                case 2:
                    _b.apply(void 0, [_f.sent()]).toBe(regex);
                    _c = vitest_1.expect;
                    return [4 /*yield*/, (0, parsed_1.parsed)(map)];
                case 3:
                    _c.apply(void 0, [_f.sent()]).toBe(map);
                    _d = vitest_1.expect;
                    return [4 /*yield*/, (0, parsed_1.parsed)(set)];
                case 4:
                    _d.apply(void 0, [_f.sent()]).toBe(set);
                    _e = vitest_1.expect;
                    return [4 /*yield*/, (0, parsed_1.parsed)(buffer)];
                case 5:
                    _e.apply(void 0, [_f.sent()]).toBe(buffer);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('should handle circular references', function () { return __awaiter(void 0, void 0, void 0, function () {
        var obj, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    obj = { normalProp: 'value' };
                    obj.self = obj;
                    return [4 /*yield*/, (0, parsed_1.parsed)(obj)];
                case 1:
                    result = _a.sent();
                    (0, vitest_1.expect)(result.normal_prop).toBe('value');
                    (0, vitest_1.expect)(result.self).toBe(result);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('should handle symbol keys', function () { return __awaiter(void 0, void 0, void 0, function () {
        var symbolKey, input, result;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    symbolKey = Symbol('symbolKey');
                    input = (_a = {},
                        _a[symbolKey] = 'symbolValue',
                        _a.normalKey = 'normalValue',
                        _a);
                    return [4 /*yield*/, (0, parsed_1.parsed)(input)];
                case 1:
                    result = _b.sent();
                    (0, vitest_1.expect)(result[symbolKey]).toBe('symbolValue');
                    (0, vitest_1.expect)(result.normal_key).toBe('normalValue');
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('should handle null and undefined values', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = vitest_1.expect;
                    return [4 /*yield*/, (0, parsed_1.parsed)(null)];
                case 1:
                    _a.apply(void 0, [_c.sent()]).toBeNull();
                    _b = vitest_1.expect;
                    return [4 /*yield*/, (0, parsed_1.parsed)(undefined)];
                case 2:
                    _b.apply(void 0, [_c.sent()]).toBeUndefined();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('should handle primitive values', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = vitest_1.expect;
                    return [4 /*yield*/, (0, parsed_1.parsed)('string')];
                case 1:
                    _a.apply(void 0, [_d.sent()]).toBe('string');
                    _b = vitest_1.expect;
                    return [4 /*yield*/, (0, parsed_1.parsed)(42)];
                case 2:
                    _b.apply(void 0, [_d.sent()]).toBe(42);
                    _c = vitest_1.expect;
                    return [4 /*yield*/, (0, parsed_1.parsed)(true)];
                case 3:
                    _c.apply(void 0, [_d.sent()]).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)('should handle arrays with mixed types', function () { return __awaiter(void 0, void 0, void 0, function () {
        var input, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    input = [
                        'string',
                        42,
                        true,
                        { objectProp: 'value' },
                        [1, 2, 3],
                        new Date(),
                        /regex/
                    ];
                    return [4 /*yield*/, (0, parsed_1.parsed)(input)];
                case 1:
                    result = _a.sent();
                    (0, vitest_1.expect)(result[0]).toBe('string');
                    (0, vitest_1.expect)(result[1]).toBe(42);
                    (0, vitest_1.expect)(result[2]).toBe(true);
                    (0, vitest_1.expect)(result[3].object_prop).toBe('value');
                    (0, vitest_1.expect)(result[4]).toEqual([1, 2, 3]);
                    (0, vitest_1.expect)(result[5]).toBe(input[5]);
                    (0, vitest_1.expect)(result[6]).toBe(input[6]);
                    return [2 /*return*/];
            }
        });
    }); });
});
