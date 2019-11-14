/* eslint-disable no-undef */
const { groupSchema } = require('./groups.validator');
const json = require('./group.json');

test('Validator Success', () => {
  expect(groupSchema.validate(json).error).toBe(null);
});

test('Id fail: null value', () => {
  const falsejson = { ...json };
  falsejson.id = undefined;
  expect(groupSchema.validate(falsejson).error).not.toBe(null);
});

test('Id fail: not a UUID value', () => {
  const falsejson = { ...json };
  falsejson.id = 'N0taUUID';
  expect(groupSchema.validate(falsejson).error).not.toBe(null);
});

test('Name fail: null value', () => {
  const falsejson = { ...json };
  falsejson.name = undefined;
  expect(groupSchema.validate(falsejson).error).not.toBe(null);
});

test('Name fail: not a string value', () => {
  const falsejson = { ...json };
  falsejson.name = 10;
  expect(groupSchema.validate(falsejson).error).not.toBe(null);
});

test('Name fail: 50 < value.length', () => {
  const falsejson = { ...json };
  falsejson.name = 'azertyuiopqsdfghjklmwxcvbn123456789azertyuiopqsdfghjklmwxcvbn';
  expect(groupSchema.validate(falsejson).error).not.toBe(null);
});

test('Name fail: not a alphanumeric value', () => {
  const falsejson = { ...json };
  falsejson.name = '(-è_çà)=^$ù,;:!';
  expect(groupSchema.validate(falsejson).error).not.toBe(null);
});

test('Birth date Success: null value', () => {
  const falsejson = { ...json };
  falsejson.creationDate = undefined;
  expect(groupSchema.validate(falsejson).error).toBe(null);
});

test('Birth date Success: not a date value', () => {
  const falsejson = { ...json };
  falsejson.creationDate = 42;
  expect(groupSchema.validate(falsejson).error).toBe(null);
});

test('Creation date fail: wrong format', () => {
  const falsejson = { ...json };
  falsejson.creationDate = '1999-01-04T23:00:00.000Z';
  expect(groupSchema.validate(falsejson).error).not.toBe(null);
});

test('Description Success: null value', () => {
  const falsejson = { ...json };
  falsejson.description = undefined;
  expect(groupSchema.validate(falsejson).error).toBe(null);
});

test('Description Success: not a string value', () => {
  const falsejson = { ...json };
  falsejson.description = false;
  expect(groupSchema.validate(falsejson).error).not.toBe(null);
});

test('Description Success: 250 < value', () => {
  const falsejson = { ...json };
  falsejson.description = 'u'.repeat(255);
  expect(groupSchema.validate(falsejson).error).not.toBe(null);
});
