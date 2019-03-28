const checkRequiredsFields = require('../../src/utils/checkRequiredsFields');

const body = {
    name: 'Dummy',
    user: 'dummy.@email.com',
    password: 'dummy'
};

const requireds = ['name', 'user', 'password'];

describe('utils => checkRequiredsFields', () => {
  it('Should returns true', () => {
      expect(checkRequiredsFields(body, requireds, null)).toBeTruthy();
  });

  it("Should returns 'The requireds fields are missing: 'password'.'", () => {
      const wrongBody = {
          name: body.name,
          user: body.user
      };
      expect(checkRequiredsFields(wrongBody, requireds, (requiredFields) => {
          return `The requireds fields are missing: ${requiredFields.join(', ')}.`;
      })).toBe('The requireds fields are missing: password.')
  });

  it("Should returns 'The requireds fields are missing: 'user, password'.'", () => {
    const wrongBody = {
        name: body.name
    };
    expect(checkRequiredsFields(wrongBody, requireds, (requiredFields) => {
        return `The requireds fields are missing: ${requiredFields.join(', ')}.`;
    })).toBe('The requireds fields are missing: user, password.')
  });

  it("Should returns 'The requireds fields are missing: 'user, password'.'", () => {
    const wrongBody = {};
    const changedRequireds = ['user', 'password'];
    expect(checkRequiredsFields(wrongBody, changedRequireds, (requiredFields) => {
        return `The requireds fields are missing: ${requiredFields.join(', ')}.`;
    })).toBe('The requireds fields are missing: user, password.')
  });
});
