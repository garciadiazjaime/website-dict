const cheerio = require("cheerio");

const { extract } = require("./extract");

const fetch = async (word) => {
  const url = `https://www.wordreference.com/definicion/${word}`;
  const proxyUrl = `${process.env.PROXY_URL}/proxy?url=${decodeURIComponent(
    url
  )}`;
  const response = await extract(proxyUrl)
    .then((resp) => resp.text())
    .catch((error) => {
      console.log(error);
    });

  return response;
};

const transform = function (html) {
  const $ = cheerio.load(html);

  const response = $("#article .entry li")
    .toArray()
    .map((item) => $(item).text());

  return response;
};

const spanishETL = async (word) => {
  const html = await fetch(word);

  const response = transform(html);

  return response;
};

module.exports = {
  spanishETL,
};
