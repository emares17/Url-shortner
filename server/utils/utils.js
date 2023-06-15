const Url = require('../models/Url');

const getShortUrls = async (page, limit) => {
  const skip = page * limit;
  const totalUrls = await Url.countDocuments();
  const shortUrl = await Url.find().sort({ _id: -1 }).skip(skip).limit(limit).exec();

  return {
    shortUrl: shortUrl,
    currentPage: page,
    totalPages: Math.ceil(totalUrls / limit)
  };
};

module.exports = { getShortUrls };