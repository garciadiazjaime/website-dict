const cheerio = require("cheerio");

const { extract } = require("./extract");

const fetch = async (word) => {
  const url = `https://www.le-dictionnaire.com/definition/${word}`;
  const response = await extract(url)
    .then((resp) => resp.text())
    .catch((error) => {
      console.log(error);
    });

  return response;
};

const transform = function (html) {
  const $ = cheerio.load(html);

  const response = $(".defbox ul li")
    .toArray()
    .map((item) => $(item).text());

  return response;
};

const frenchETL = async (word) => {
  const html = await fetch(word);

  const response = transform(html);

  return response;
};

module.exports = {
  frenchETL,
};
