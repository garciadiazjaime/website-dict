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
  let response;

  try {
    response = await extract(word);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error),
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
