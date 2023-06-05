function trimUrl(url, maxLen) {
    if (url.length <= maxLen) {
      return url;
    } else {
      url.slice(0, maxLen) + '...';
    }
}

module.exports = { trimUrl };