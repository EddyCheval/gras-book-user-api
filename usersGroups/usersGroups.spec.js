/* eslint-disable no-undef */
const { userGroupSchema } = require('./usersGroups.validator');
const json = require('./userGroup.json');
const userJson = require('./users.json');
const groupJson = require('./groups.json');

test('Validator Success', () => {
  expect(userGroupSchema.validate(json).error).toBe(null);
});

test('userId fail: null value', () => {
  const falsejson = { ...json };
  falsejson.userId = undefined;
  expect(userGroupSchema.validate(falsejson).error).not.toBe(null);
});

test('userId fail: not a UUID value', () => {
  const falsejson = { ...json };
  falsejson.userId = 'N0taUUID';
  expect(userGroupSchema.validate(falsejson).error).not.toBe(null);
});

test('groupId fail: null value', () => {
  const falsejson = { ...json };
  falsejson.groupId = undefined;
  expect(userGroupSchema.validate(falsejson).error).not.toBe(null);
});

test('groupId fail: not a UUID value', () => {
  const falsejson = { ...json };
  falsejson.groupId = 'N0taUUID';
  expect(userGroupSchema.validate(falsejson).error).not.toBe(null);
});

test('roleId Success: null value', () => {
  const falsejson = { ...json };
  falsejson.roleId = undefined;
  expect(userGroupSchema.validate(falsejson).error).toBe(null);
});

test('roleId fail: not a UUID value', () => {
  const falsejson = { ...json };
  falsejson.roleId = 'N0taUUID';
  expect(userGroupSchema.validate(falsejson).error).not.toBe(null);
});

test('userGroups fail: not a UserGroup value', () => {
  const falsejson = { ...userJson };
  falsejson.userGroups = [userJson];
  expect(Array.isArray(falsejson.userGroups)).toBe(true);
  expect(userGroupSchema.validate(falsejson.userGroups[0]).error).not.toBe(null);
});

test('userGroups success: a UserGroup value', () => {
  const falsejson = { ...userJson };
  expect(Array.isArray(falsejson.userGroups)).toBe(true);
  delete falsejson.userGroups[0].role;
  expect(userGroupSchema.validate(falsejson.userGroups[0]).error).toBe(null);
});

test('userGroups fail: not a UserGroup value', () => {
  const falsejson = { ...groupJson };
  falsejson.userGroups = [userJson];
  expect(Array.isArray(falsejson.userGroups)).toBe(true);
  expect(userGroupSchema.validate(falsejson.userGroups[0]).error).not.toBe(null);
});

test('userGroups success: a UserGroup value', () => {
  const falsejson = { ...groupJson };
  expect(Array.isArray(falsejson.userGroups)).toBe(true);
  delete falsejson.userGroups[0].role;
  expect(userGroupSchema.validate(falsejson.userGroups[0]).error).toBe(null);
});
