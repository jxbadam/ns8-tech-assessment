import 'mocha';
import { expect } from 'chai';

import { User } from '../../../src/model/user';
import { UserValidator } from '../../../src/validator/user-validator';

describe('(unit) User Validation', () => {

  it('should not throw an error for a valid user with no phone', () => {
    const validator = new UserValidator();
    const user = new User('test@ns8.com', 'password');

    const result = validator.validate(user);

    expect(result).to.equal(null);
  });

  it('should not throw an error for a valid user with a valid phone', () => {
    const validator = new UserValidator();
    const user = new User('test@ns8.com', 'password', '702-555-1234');

    const result = validator.validate(user);

    expect(result).to.equal(null);
  });

  it('should throw an error attempting to validate a NULL user', () => {
    const validator = new UserValidator();

    expect(validator.validate(null)).to.equal("null_user");
  });


  it('should throw an error attempting to validate an UNDEFINED user', () => {
    const validator = new UserValidator();

    expect(validator.validate(undefined)).to.equal("null_user");
  });

  it('should throw an error attempting to validate an user with a NULL email', () => {
    const validator = new UserValidator();
    const user = new User(null, 'password');
    expect(validator.validate(user)).to.equal("email_required");
  });

  it('should throw an error attempting to validate an user with an EMPTY email', () => {
    const validator = new UserValidator();
    const user = new User('', 'password');
    expect(validator.validate(user)).to.equal("email_empty");
  });

  it('should throw an error attempting to validate an user with an invalid email', () => {
    const cases = [
      "@",
      "1@2.3",
      "a1@",
      "a1@b",
      "a1@b.",
      "a1@b.c"
    ]
    const validator = new UserValidator();

    for (let i = 0; i < cases.length; i ++) {
      const user = new User(cases[i], 'password');
      expect(validator.validate(user)).to.equal("invalid_email");
    }
  });

  it('should throw an error attempting to validate an user with an INVALID phone', () => {
    const validator = new UserValidator();
    const user = new User('test@ns8.com', 'password', 'invalid');
    expect(validator.validate(user)).to.equal("invalid_phone_format");
  });
});
