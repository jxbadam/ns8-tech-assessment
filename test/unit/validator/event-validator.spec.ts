import 'mocha';
import { expect } from 'chai';

import { Event } from '../../../src/model/event';
import { EventValidator } from '../../../src/validator/event-validator';

describe('(unit) Event Validation', () => {

  it('should not throw an error for a valid event', () => {
    const validator = new EventValidator();
    const event = new Event('ValidationEvent', 1);

    const result = validator.validate(event);

    expect(result).to.equal(null);
  });

  it('should throw an error attempting to validate a NULL event', () => {
    const validator = new EventValidator();

    expect(validator.validate(null)).to.equal("null_event");
  });


  it('should throw an error attempting to validate an UNDEFINED event', () => {
    const validator = new EventValidator();

    expect(validator.validate(undefined)).to.equal("null_event");
  });


  it('should throw an error attempting to validate an event with a NULL or UNDEFINED type', () => {
    const validator = new EventValidator();
    const event = new Event(null, null);

    expect(validator.validate(event)).to.equal("invalid_event_type");
  });

  it('should throw an error attempting to validate an event with a type that is an empty string', () => {
    const validator = new EventValidator();
    const event = new Event('', null);

    expect(validator.validate(event)).to.equal("empty_event_type");
  });
});
