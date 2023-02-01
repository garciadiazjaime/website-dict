const { saveWord } = require("../../support/dynamo-service");

exports.handler = async function (event, _context) {
  const { word, lang, definitions } = JSON.parse(event.body || "{}");

  const response = await saveWord(word, lang, definitions)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });

  const statusCode = !response || response.errorMessage ? 400 : 201;

  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  };
};
