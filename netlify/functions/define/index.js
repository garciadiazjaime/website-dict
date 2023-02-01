const { spanishETL } = require("./spanish-etl");
const { englishETL } = require("./english-etl");
const { frenchETL } = require("./french-etl");

const getDefinition = (word, lang) => {
  if (lang === "ES") {
    return spanishETL(word);
  }

  if (lang === "EN") {
    return englishETL(word);
  }

  if (lang === "FR") {
    return frenchETL(word);
  }
};

exports.handler = async function (event, context) {
  const { word, lang } = event.queryStringParameters;

  if (!word || !lang) {
    return {
      statusCode: 400,
      body: "EMPTY_PARAMS",
    };
  }

  const definition = await getDefinition(word, lang.toUpperCase()).catch(
    (error) => {
      console.log(error);
    }
  );

  if (!definition) {
    return {
      statusCode: 400,
      body: "DEFINITION_NOT_FOUND",
    };
  }

  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(definition),
  };
};
