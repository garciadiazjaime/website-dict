const { extract } = require("./extract");

const fetch = async (word) => {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  const response = await extract(url)
    .then((resp) => resp.json())
    .catch((error) => {
      console.log(error);
    });

  return response;
};

const transform = function (data) {
  if (
    !Array.isArray(data) ||
    !data.length ||
    !Array.isArray(data[0].meanings) ||
    !data[0].meanings.length
  ) {
    return;
  }

  return data[0].meanings[0].definitions.map((item) => item.definition);
};

const englishETL = async (word) => {
  const data = await fetch(word);

  const response = transform(data);

  return response;
};

module.exports = {
  englishETL,
};
