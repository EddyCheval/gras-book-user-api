const { Op } = require('sequelize');
const AWS = require('aws-sdk');
const lodash = require('lodash');

const sortByKey = (array, key, order) => {
  return array.sort((a, b) => {
    const x = a[key];
    const y = b[key];
    if (order === 'ASC') {
      return x.localeCompare(y);
    }
    return y.localeCompare(x);
  });
};

const formatQueryiLike = (whereParams, inclusionList) => {
  const where = { ...whereParams };
  Object.keys(where).map(key => {
    if (key === 'keycloackUUID') {
      return 1;
    }
    if (inclusionList.find(value => key === value)) {
      const str = `%${where[key]}%`;
      where[key] = {
        [Op.iLike]: str
      };
      return 1;
    }
    return 0;
  });
  return where;
};

const indexOfEnd = (fullstring, string) => {
  const io = fullstring.indexOf(string);
  return io === -1 ? -1 : io + string.length;
};

const UploadBinaryToUri = async values => {
  const endpoint = process.env.SCALEWAY_ENDPOINT;
  const region = process.env.SCALEWAY_REGION;
  const accessKey = process.env.SCALEWAY_ACESS_KEY;
  const secretKey = process.env.SCALEWAY_SECRET_KEY;
  const bucketName = process.env.SCALEWAY_BUCKET_NAME;

  const client = new AWS.S3({
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    region,
    endpoint
  });
  console.log(values.pictureBlob);
  // eslint-disable-next-line new-cap
  const pictureBlob = new Buffer.from(
    values.pictureBlob.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  );
  const params = {
    Bucket: `${bucketName}`,
    Key: `userApi/${values.firstName}.${values.lastName}.${Date.now()}.${values.pictureType}`,
    Body: pictureBlob,
    ACL: 'public-read'
  };
  if (!lodash.isNull(pictureBlob) && !lodash.isUndefined(pictureBlob)) {
    const string = endpoint.substring(indexOfEnd(endpoint, 'https://'));
    await client.upload(params, err => {
      if (err) {
        throw err;
      }
    });
    return `https://${bucketName}.${string}${params.Key}`;
  }
  return values.pictureUrl;
};

module.exports = { sortByKey, formatQueryiLike, UploadBinaryToUri };
