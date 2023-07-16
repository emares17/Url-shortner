const Url = require('../models/Url');

const getShortUrls = async (page, limit, query = {}) => {
  const skip = page * limit;
  const totalUrls = await Url.countDocuments(query);
  const shortUrl = await Url.find(query).sort({ _id: -1 }).skip(skip).limit(limit).exec();

  return {
    shortUrl: shortUrl,
    currentPage: page,
    totalPages: Math.ceil(totalUrls / limit),
  };
};

module.exports = { getShortUrls };