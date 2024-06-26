// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

// Mock matchMedia
window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addEventListener: function () { },  // Make sure these are functions
        removeEventListener: function () { },
    };
};