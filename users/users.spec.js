/* eslint-disable no-undef */
const { userSchema } = require('./users.validator');
const json = require('./user.json');

test('Validator Success', () => {
  expect(userSchema.validate(json).error).toBe(null);
});

test('Id fail: null value', () => {
  const falsejson = { ...json };
  falsejson.id = undefined;
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});

test('Id fail: not a UUID value', () => {
  const falsejson = { ...json };
  falsejson.id = 'N0taUUID';
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});

test('First name fail: null value', () => {
  const falsejson = { ...json };
  falsejson.firstName = undefined;
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});

test('First name fail: not a string value', () => {
  const falsejson = { ...json };
  falsejson.firstName = 10;
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});

test('First name fail: 50 < value.length', () => {
  const falsejson = { ...json };
  falsejson.firstName = 'azertyuiopqsdfghjklmwxcvbn123456789azertyuiopqsdfghjklmwxcvbn';
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});

test('First name fail: not a alphanumeric value', () => {
  const falsejson = { ...json };
  falsejson.firstName = '(-è_çà)=^$ù,;:!';
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});

test('Last name fail: null value', () => {
  const falsejson = { ...json };
  falsejson.lastName = undefined;
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});

test('Last name fail: not a string value', () => {
  const falsejson = { ...json };
  falsejson.lastName = 666;
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});

test('Last name fail: 50 < value.length', () => {
  const falsejson = { ...json };
  falsejson.lastName = 'azertyuiopqsdfghjklmwxcvbn123456789azertyuiopqsdfghjklmwxcvbn';
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});

test('Last name fail: not a alphanumeric value', () => {
  const falsejson = { ...json };
  falsejson.lastName = '(-è_çà)=^$ù,;:!';
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});

test('Birth date Success: null value', () => {
  const falsejson = { ...json };
  falsejson.birthDate = undefined;
  expect(userSchema.validate(falsejson).error).toBe(null);
});

test('Birth date Success: not a date value', () => {
  const falsejson = { ...json };
  falsejson.birthDate = 42;
  expect(userSchema.validate(falsejson).error).toBe(null);
});

test('Birth date fail: wrong format', () => {
  const falsejson = { ...json };
  falsejson.birthDate = '1999-01-04T23:00:00.000Z';
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});

test('Email fail: null value', () => {
  const falsejson = { ...json };
  falsejson.email = undefined;
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});

test('Email fail: not a email value', () => {
  const falsejson = { ...json };
  falsejson.email = 'notAnEmail';
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});

test('Email fail: not allowed email tlds value', () => {
  const falsejson = { ...json };
  falsejson.email = 'notGoodEnoughEmail@grasbook.ninja';
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});

test('Login fail: null value', () => {
  const falsejson = { ...json };
  falsejson.login = undefined;
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});

test('Login fail: not a string value', () => {
  const falsejson = { ...json };
  falsejson.login = 12;
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});

test('Login fail: 8 > value', () => {
  const falsejson = { ...json };
  falsejson.login = 'test';
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});

test('Login fail: 30 < value', () => {
  const falsejson = { ...json };
  falsejson.login = 'test'.repeat(8);
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});

test('Password fail: null value', () => {
  const falsejson = { ...json };
  falsejson.password = undefined;
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});

test('Password fail: a string value', () => {
  const falsejson = { ...json };
  falsejson.password = 16;
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});

test('Password fail: 8 > value', () => {
  const falsejson = { ...json };
  falsejson.password = 'test';
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});

test('Password fail: 250 < value', () => {
  const falsejson = { ...json };
  falsejson.password = 'test'.repeat(75);
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});

test('Description Success: null value', () => {
  const falsejson = { ...json };
  falsejson.description = undefined;
  expect(userSchema.validate(falsejson).error).toBe(null);
});

test('Description Success: not a string value', () => {
  const falsejson = { ...json };
  falsejson.description = false;
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});

test('Description Success: 250 < value', () => {
  const falsejson = { ...json };
  falsejson.description = 'u'.repeat(255);
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});

test('Picture Url fail: null value', () => {
  const falsejson = { ...json };
  falsejson.pictureUrl = undefined;
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});

test('Picture Url fail: a string value', () => {
  const falsejson = { ...json };
  falsejson.pictureUrl = true;
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});

test('Picture Url fail: not a URI value', () => {
  const falsejson = { ...json };
  falsejson.pictureUrl = 'notUriValue';
  expect(userSchema.validate(falsejson).error).not.toBe(null);
});
