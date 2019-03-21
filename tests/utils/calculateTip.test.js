const { calculateTip } = require('../../src/utils/playground/calculateTip');

test('Should calculate the total value with tip', () => {
    expect(calculateTip(100, 0.1)).toBe(110);
});

test('Should return the total value with default tip', () => {
    expect(calculateTip(100)).toBe(150);
});
