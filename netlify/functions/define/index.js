const { extract } = require("./extract");
const { transform } = require("./transform");

exports.handler = async function (event, context) {
  const { word } = event.queryStringParameters;

  if (!word) {
    return {
      statusCode: 400,
      body: "EMPTY_WORD",
    };
  }

  const response = await extract(word)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });

  if (!response) {
    return {
      statusCode: 400,
      body: "SERVICE_ERROR",
    };
  }

  const definition = transform(response);

  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(definition),
  };
};
