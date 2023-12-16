// 8 unit tests
import { render } from "@testing-library/react";
import { truncateString } from "../components/partials/dynamic/userPlaylists";

// Test with a string that is shorter than the maximum length
test('truncateString should return the original string if it is shorter than the maximum length', () => {
    const result = truncateString('Short string', 20);
    expect(result).toBe('Short string');
});

// Test with a string that is exactly the maximum length
test('truncateString should return the original string if it is exactly the maximum length', () => {
    const result = truncateString('Exactly 20 characters!', 20);
    expect(result).toBe('Exactly 20 charac...');
});

// Test with a string that is longer than the maximum length
test('truncateString should truncate the string and append "..." if it is longer than the maximum length', () => {
    const result = truncateString('This is a longer string that needs to be truncated', 20);
    expect(result).toBe('This is a longer ...');
});

// Test with a string that is equal to the maximum length minus 3 characters
test('truncateString should return the original string if it is equal to the maximum length minus 3 characters', () => {
    const result = truncateString('Exactly 17 characters!', 20);
    expect(result).toBe('Exactly 17 charac...');
});

// Test with a null string
test('truncateString should return an empty string if the input string is null', () => {
    const result = truncateString(null, 20);
    expect(result).toBe('');
});

// Test with a number instead of a string
test('truncateString should return the original value if the input is not a string', () => {
    const result = truncateString(123, 20);
    expect(result).toBe(123);
});

// Test with an undefined string
test('truncateString should return an empty string if the input string is undefined', () => {
    const result = truncateString(undefined, 20);
    expect(result).toBe('');
});

// Test with a boolean value instead of a string
test('truncateString should return the original value if the input is a boolean', () => {
    const result = truncateString(true, 20);
    expect(result).toBe(true);
});