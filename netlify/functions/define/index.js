const { spanishETL } = require("./spanish-etl");
const { englishETL } = require("./english-etl");

exports.handler = async function (event, context) {
  const { word, lang } = event.queryStringParameters;

  if (!word || !lang) {
    return {
      statusCode: 400,
      body: "EMPTY_PARAMS",
    };
  }

  let response;

  if (lang?.toUpperCase() === "ES") {
    response = await spanishETL(word).catch((error) => {
      console.log(error);
    });
  }

  if (lang?.toUpperCase() === "EN") {
    response = await englishETL(word)
      .then((response) => response)
      .catch((error) => {
        console.log(error);
      });
    console.log({ response });
  }

  if (!response) {
    return {
      statusCode: 400,
      body: "SERVICE_ERROR",
    };
  }

  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(response),
  };
};
