const { userSchema } = require('./users.validator');
const json = require('./user.json');

describe('users.validator.js', () => {
  describe('validate', () => {
    it('Validator Success', () => {
      expect(userSchema.validate(json).error).toBe(null);
    });

    it('Id fail: null value', () => {
      const falsejson = { ...json, id: undefined };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Id fail: not a UUID value', () => {
      const falsejson = { ...json, id: 'N0taUUID' };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });

    it('First name fail: null value', () => {
      const falsejson = { ...json, firstName: undefined };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });

    it('First name fail: not a string value', () => {
      const falsejson = { ...json, firstName: 10 };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });

    it('First name fail: 50 < value.length', () => {
      const falsejson = {
        ...json,
        firstName: 'azertyuiopqsdfghjklmwxcvbn123456789azertyuiopqsdfghjklmwxcvbn'
      };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });

    it('First name fail: not a alphanumeric value', () => {
      const falsejson = { ...json, firstName: '(-è_çà)=^$ù,;:!' };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Last name fail: null value', () => {
      const falsejson = { ...json, lastName: undefined };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Last name fail: not a string value', () => {
      const falsejson = { ...json, lastName: 666 };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Last name fail: 50 < value.length', () => {
      const falsejson = {
        ...json,
        lastName: 'azertyuiopqsdfghjklmwxcvbn123456789azertyuiopqsdfghjklmwxcvbn'
      };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Last name fail: not a alphanumeric value', () => {
      const falsejson = { ...json, lastName: '(-è_çà)=^$ù,;:!' };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Birth date Success: null value', () => {
      const falsejson = { ...json, birthDate: undefined };
      expect(userSchema.validate(falsejson).error).toBe(null);
    });

    it('Birth date Success: not a date value', () => {
      const falsejson = { ...json, birthDate: 42 };
      expect(userSchema.validate(falsejson).error).toBe(null);
    });

    it('Birth date fail: wrong format', () => {
      const falsejson = { ...json, birthDate: '1999-01-04T23:00:00.000Z' };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Email fail: null value', () => {
      const falsejson = { ...json, email: undefined };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Email fail: not a email value', () => {
      const falsejson = { ...json, email: 'notAnEmail' };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Email fail: not allowed email tlds value', () => {
      const falsejson = { ...json, email: 'notGoodEnoughEmail@grasbook.ninja' };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Login fail: null value', () => {
      const falsejson = { ...json, login: undefined };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Login fail: not a string value', () => {
      const falsejson = { ...json, login: 12 };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Login fail: 8 > value', () => {
      const falsejson = { ...json, login: 'test' };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Login fail: 30 < value', () => {
      const falsejson = { ...json, login: 'test'.repeat(8) };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Password fail: null value', () => {
      const falsejson = { ...json, password: undefined };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Password fail: a string value', () => {
      const falsejson = { ...json, password: 16 };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Password fail: 8 > value', () => {
      const falsejson = { ...json, password: 'test' };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Password fail: 250 < value', () => {
      const falsejson = { ...json, password: 'test'.repeat(75) };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Description Success: null value', () => {
      const falsejson = { ...json, description: undefined };
      expect(userSchema.validate(falsejson).error).toBe(null);
    });

    it('Description Success: not a string value', () => {
      const falsejson = { ...json, description: false };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Description Success: 250 < value', () => {
      const falsejson = { ...json, description: 'u'.repeat(255) };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Picture Url fail: null value', () => {
      const falsejson = { ...json, pictureUrl: undefined };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Picture Url fail: a string value', () => {
      const falsejson = { ...json, pictureUrl: true };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });

    it('Picture Url fail: not a URI value', () => {
      const falsejson = { ...json, pictureUrl: 'notUriValue' };
      expect(userSchema.validate(falsejson).error).not.toBe(null);
    });
  });
});
