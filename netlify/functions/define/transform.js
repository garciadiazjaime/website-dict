const cheerio = require("cheerio");

const transform = function (html) {
  const $ = cheerio.load(html);

  const response = $("#article .entry li")
    .toArray()
    .map((item) => $(item).text());

  return response;
};

module.exports = {
  transform,
};
