import { describe, it, expect } from 'vitest';
import { parsed } from './parsed';

describe('parsed function (consolidated)', () => {
  it('should handle all case conversion patterns correctly', async () => {
    const input = {
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

    const expected = {
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

    expect(await parsed(input)).toEqual(expected);
  });

  it('should handle complex nested structures', async () => {
    const input = {
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

    const expected = {
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

    expect(await parsed(input)).toEqual(expected);
  });

  it('should preserve special objects', async () => {
    const date = new Date();
    const regex = /test/g;
    const map = new Map([['key', 'value']]);
    const set = new Set([1, 2, 3]);
    const buffer = typeof Buffer !== 'undefined' ? Buffer.from('test') : new Uint8Array([1, 2, 3]);
    
    expect(await parsed(date)).toBe(date);
    expect(await parsed(regex)).toBe(regex);
    expect(await parsed(map)).toBe(map);
    expect(await parsed(set)).toBe(set);
    expect(await parsed(buffer)).toBe(buffer);
  });

  it('should handle circular references', async () => {
    const obj: any = { normalProp: 'value' };
    obj.self = obj;
    
    const result: any = await parsed(obj);
    expect(result.normal_prop).toBe('value');
    expect(result.self).toBe(result);
  });

  it('should handle symbol keys', async () => {
    const symbolKey = Symbol('symbolKey');
    const input = {
      [symbolKey]: 'symbolValue',
      normalKey: 'normalValue'
    };

    const result: any = await parsed(input);
    expect(result[symbolKey as unknown as string]).toBe('symbolValue');
    expect(result.normal_key).toBe('normalValue');
  });

  it('should handle null and undefined values', async () => {
    expect(await parsed(null)).toBeNull();
    expect(await parsed(undefined)).toBeUndefined();
  });

  it('should handle primitive values', async () => {
    expect(await parsed('string')).toBe('string');
    expect(await parsed(42)).toBe(42);
    expect(await parsed(true)).toBe(true);
  });

  it('should handle arrays with mixed types', async () => {
    const input = [
      'string',
      42,
      true,
      { objectProp: 'value' },
      [1, 2, 3],
      new Date(),
      /regex/
    ];

    const result = await parsed(input);
    
    expect(result[0]).toBe('string');
    expect(result[1]).toBe(42);
    expect(result[2]).toBe(true);
    expect((result[3] as any).object_prop).toBe('value');
    expect(result[4]).toEqual([1, 2, 3]);
    expect(result[5]).toBe(input[5]);
    expect(result[6]).toBe(input[6]);
  });
});