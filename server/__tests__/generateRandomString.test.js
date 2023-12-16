// 5 unit tests
const { generateRandomString } = require('../utils/genRandomString');
const request = require('supertest');

describe('generateRandomString', () => {
    test('should generate a string of the specified length', () => {
        const length = 10;
        const result = generateRandomString(length);

        expect(result).toHaveLength(length);
    });

    test('should generate a non-empty string', () => {
        const result = generateRandomString(5);

        expect(result).not.toBeNull();
        expect(result).not.toBeUndefined();
        expect(result).not.toBe('');
    });

    test('should handle null or undefined input', () => {
        const resultNull = generateRandomString(null);
        const resultUndefined = generateRandomString(undefined);

        expect(resultNull).toBe('');
        expect(resultUndefined).toBe('');
    });

    test('should generate a string containing only valid characters', () => {
        const result = generateRandomString(15);
        const validCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (const char of result) {
            expect(validCharacters).toContain(char);
        }
    });

    test('should handle zero length', () => {
        const result = generateRandomString(0);

        expect(result).toBe('');
    });
});