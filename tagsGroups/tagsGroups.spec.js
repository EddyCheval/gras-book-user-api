const { tagGroupSchema } = require('./tagsGroups.validator');
const json = require('./tagGroup.json');
const tagJson = require('./tags.json');
const groupJson = require('./groups.json');

describe('tagGroups.validator.js', () => {
  describe('validate', () => {
    it('Validator Success', () => {
      expect(tagGroupSchema.validate(json).error).toBe(null);
    });

    it('tagId fail: null value', () => {
      const falsejson = { ...json };
      falsejson.tagId = undefined;
      expect(tagGroupSchema.validate(falsejson).error).not.toBe(null);
    });

    it('tagId fail: not a UUID value', () => {
      const falsejson = { ...json };
      falsejson.tagId = 'N0taUUID';
      expect(tagGroupSchema.validate(falsejson).error).not.toBe(null);
    });

    it('groupId fail: null value', () => {
      const falsejson = { ...json };
      falsejson.groupId = undefined;
      expect(tagGroupSchema.validate(falsejson).error).not.toBe(null);
    });

    it('groupId fail: not a UUID value', () => {
      const falsejson = { ...json, groupId: 'N0taUUID' };
      expect(tagGroupSchema.validate(falsejson).error).not.toBe(null);
    });

    it('tagGroups fail: not a TagGroup value', () => {
      const falsejson = { ...tagJson, tagGroup: [groupJson] };
      expect(tagGroupSchema.validate(falsejson.tagGroup).error).not.toBe(null);
    });

    it('tagGroups success: a TagGroup value', () => {
      const falsejson = { ...tagJson };
      expect(tagGroupSchema.validate(falsejson.tagGroup).error).toBe(null);
    });

    it('tagGroups fail: not a TagGroup value', () => {
      const falsejson = { ...groupJson, tagGroup: [tagJson] };
      expect(tagGroupSchema.validate(falsejson.tagGroup).error).not.toBe(null);
    });

    it('tagGroups success: a TagGroup value', () => {
      const falsejson = { ...groupJson };
      expect(tagGroupSchema.validate(falsejson.tagGroup).error).toBe(null);
    });
  });
});
