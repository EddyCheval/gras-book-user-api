const { roleSchema } = require('./roles.validator');
const json = require('./role.json');

describe('roles.validator.js', () => {
  describe('validate', () => {
    it('Validator Success', () => {
      expect(roleSchema.validate(json).error).toBe(null);
    });

    it('Id fail: null value', () => {
      const falsejson = { ...json };
      falsejson.id = undefined;
      expect(roleSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Id fail: not a UUID value', () => {
      const falsejson = { ...json, id: 'N0taUUID' };
      expect(roleSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Name fail: null value', () => {
      const falsejson = { ...json, name: undefined };
      expect(roleSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Name fail: not a string value', () => {
      const falsejson = { ...json, name: 10 };
      expect(roleSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Name fail: 50 < value.length', () => {
      const falsejson = {
        ...json,
        name: 'azertyuiopqsdfghjklmwxcvbn123456789azertyuiopqsdfghjklmwxcvbn'
      };
      expect(roleSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Name fail: not a alphanumeric value', () => {
      const falsejson = { ...json, name: '(-è_çà)=^$ù,;:!' };
      expect(roleSchema.validate(falsejson).error).not.toBe(null);
    });
  });
});
