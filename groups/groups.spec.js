const { groupSchema } = require('./groups.validator');
const json = require('./group.json');

describe('groups.validator.js', () => {
  describe('validate', () => {
    it('Validator Success', () => {
      expect(groupSchema.validate(json).error).toBe(null);
    });

    it('Id fail: null value', () => {
      const falsejson = { ...json };
      falsejson.id = undefined;
      expect(groupSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Id fail: not a UUID value', () => {
      const falsejson = { ...json, id: 'N0taUUID' };
      expect(groupSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Name fail: null value', () => {
      const falsejson = { ...json, name: undefined };
      expect(groupSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Name fail: not a string value', () => {
      const falsejson = { ...json, name: 10 };
      expect(groupSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Name fail: 50 < value.length', () => {
      const falsejson = {
        ...json,
        name: 'azertyuiopqsdfghjklmwxcvbn123456789azertyuiopqsdfghjklmwxcvbn'
      };
      expect(groupSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Name fail: not a alphanumeric value', () => {
      const falsejson = { ...json, name: '(-è_çà)=^$ù,;:!' };
      expect(groupSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Birth date Success: null value', () => {
      const falsejson = { ...json, creationDate: undefined };
      expect(groupSchema.validate(falsejson).error).toBe(null);
    });

    it('Birth date Success: not a date value', () => {
      const falsejson = { ...json, creationDate: 42 };
      expect(groupSchema.validate(falsejson).error).toBe(null);
    });

    it('Creation date fail: wrong format', () => {
      const falsejson = { ...json, creationDate: '1999-01-04T23:00:00.000Z' };
      expect(groupSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Description Success: null value', () => {
      const falsejson = { ...json, description: undefined };
      expect(groupSchema.validate(falsejson).error).toBe(null);
    });

    it('Description Success: not a string value', () => {
      const falsejson = { ...json, description: false };
      expect(groupSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Description Success: 250 < value', () => {
      const falsejson = { ...json, description: 'u'.repeat(255) };
      expect(groupSchema.validate(falsejson).error).not.toBe(null);
    });
  });
});
