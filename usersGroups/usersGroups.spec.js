const { userGroupSchema } = require('./usersGroups.validator');
const json = require('./userGroup.json');
const userJson = require('./users.json');
const groupJson = require('./groups.json');

describe('userGroups.validator.js', () => {
  describe('validate', () => {
    it('Validator Success', () => {
      expect(userGroupSchema.validate(json).error).toBe(null);
    });

    it('userId fail: null value', () => {
      const falsejson = { ...json, userId: undefined };
      expect(userGroupSchema.validate(falsejson).error).not.toBe(null);
    });

    it('userId fail: not a UUID value', () => {
      const falsejson = { ...json, userId: 'N0taUUID' };
      expect(userGroupSchema.validate(falsejson).error).not.toBe(null);
    });

    it('groupId fail: null value', () => {
      const falsejson = { ...json, groupId: undefined };
      expect(userGroupSchema.validate(falsejson).error).not.toBe(null);
    });

    it('groupId fail: not a UUID value', () => {
      const falsejson = { ...json, groupId: 'N0taUUID' };
      expect(userGroupSchema.validate(falsejson).error).not.toBe(null);
    });

    it('roleId Success: null value', () => {
      const falsejson = { ...json, roleId: undefined };
      expect(userGroupSchema.validate(falsejson).error).toBe(null);
    });

    it('roleId fail: not a UUID value', () => {
      const falsejson = { ...json, roleId: 'N0taUUID' };
      expect(userGroupSchema.validate(falsejson).error).not.toBe(null);
    });

    it('userGroups fail: not a UserGroup value', () => {
      const falsejson = { ...userJson, userGroups: [userJson] };
      expect(Array.isArray(falsejson.userGroups)).toBe(true);
      expect(userGroupSchema.validate(falsejson.userGroups[0]).error).not.toBe(null);
    });

    it('userGroups success: a UserGroup value', () => {
      const falsejson = { ...userJson };
      expect(Array.isArray(falsejson.userGroups)).toBe(true);
      delete falsejson.userGroups[0].role;
      expect(userGroupSchema.validate(falsejson.userGroups[0]).error).toBe(null);
    });

    it('userGroups fail: not a UserGroup value', () => {
      const falsejson = { ...groupJson, userGroups: [userJson] };
      expect(Array.isArray(falsejson.userGroups)).toBe(true);
      expect(userGroupSchema.validate(falsejson.userGroups[0]).error).not.toBe(null);
    });

    it('userGroups success: a UserGroup value', () => {
      const falsejson = { ...groupJson };
      expect(Array.isArray(falsejson.userGroups)).toBe(true);
      delete falsejson.userGroups[0].role;
      expect(userGroupSchema.validate(falsejson.userGroups[0]).error).toBe(null);
    });
  });
});
