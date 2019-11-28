const { subscriptionSchema } = require('./subscriptions.validator');
const json = require('./subscription.json');

describe('subscriptions.validator.js', () => {
  describe('validate', () => {
    it('Validator Success', () => {
      expect(subscriptionSchema.validate(json).error).toBe(null);
    });

    it('userId fail: null value', () => {
      const falsejson = { ...json, userId: undefined };
      expect(subscriptionSchema.validate(falsejson).error).not.toBe(null);
    });

    it('userId fail: not a UUID value', () => {
      const falsejson = { ...json, userId: 'N0taUUID' };
      expect(subscriptionSchema.validate(falsejson).error).not.toBe(null);
    });

    it('followerId fail: null value', () => {
      const falsejson = { ...json, followerId: undefined };
      expect(subscriptionSchema.validate(falsejson).error).not.toBe(null);
    });

    it('followerId fail: not a UUID value', () => {
      const falsejson = { ...json, followerId: 'N0taUUID' };
      expect(subscriptionSchema.validate(falsejson).error).not.toBe(null);
    });
  });
});
