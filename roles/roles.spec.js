/* eslint-disable no-undef */
const { roleSchema } = require('./roles.validator');
const json = require('./role.json');

test('Validator Success', () => {
  expect(roleSchema.validate(json).error).toBe(null);
});

test('Id fail: null value', () => {
  const falsejson = { ...json };
  falsejson.id = undefined;
  expect(roleSchema.validate(falsejson).error).not.toBe(null);
});

test('Id fail: not a UUID value', () => {
  const falsejson = { ...json };
  falsejson.id = 'N0taUUID';
  expect(roleSchema.validate(falsejson).error).not.toBe(null);
});

test('Name fail: null value', () => {
  const falsejson = { ...json };
  falsejson.name = undefined;
  expect(roleSchema.validate(falsejson).error).not.toBe(null);
});

test('Name fail: not a string value', () => {
  const falsejson = { ...json };
  falsejson.name = 10;
  expect(roleSchema.validate(falsejson).error).not.toBe(null);
});

test('Name fail: 50 < value.length', () => {
  const falsejson = { ...json };
  falsejson.name = 'azertyuiopqsdfghjklmwxcvbn123456789azertyuiopqsdfghjklmwxcvbn';
  expect(roleSchema.validate(falsejson).error).not.toBe(null);
});

test('Name fail: not a alphanumeric value', () => {
  const falsejson = { ...json };
  falsejson.name = '(-è_çà)=^$ù,;:!';
  expect(roleSchema.validate(falsejson).error).not.toBe(null);
});
