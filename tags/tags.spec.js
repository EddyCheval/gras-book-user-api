const { tagSchema } = require('./tags.validator');
const json = require('./tag.json');

delete json.id;
describe('tagGroups.validator.js', () => {
  describe('validate', () => {
    it('Validator Success', () => {
      expect(tagSchema.validate(json).error).toBe(null);
    });

    it('Id fail: null value', () => {
      const falsejson = { ...json, id: undefined };
      expect(tagSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Id fail: not a UUID value', () => {
      const falsejson = { ...json, id: 'N0taUUID' };
      expect(tagSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Name fail: null value', () => {
      const falsejson = { ...json, name: undefined };
      expect(tagSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Name fail: not a string value', () => {
      const falsejson = { ...json, name: 10 };
      expect(tagSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Name fail: 50 < value.length', () => {
      const falsejson = {
        ...json,
        name: 'azertyuiopqsdfghjklmwxcvbn123456789azertyuiopqsdfghjklmwxcvbn'
      };
      expect(tagSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Name fail: not a alphanumeric value', () => {
      const falsejson = { ...json, name: '(-è_çà)=^$ù,;:!' };
      expect(tagSchema.validate(falsejson).error).not.toBe(null);
    });
  });
});
