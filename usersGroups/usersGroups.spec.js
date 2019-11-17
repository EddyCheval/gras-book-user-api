/* eslint-disable no-undef */
const { userGroupSchema } = require('./usersGroups.validator');
const json = require('./userGroup.json');

test('Validator Success', () => {
  expect(userGroupSchema.validate(json).error).toBe(null);
});
