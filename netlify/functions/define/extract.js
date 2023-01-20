const https = require("https");
const fetch = require("node-fetch");
const base64 = require("base-64");

const cert = base64.decode(
  `${process.env.MINT_CERT_PART_A}${process.env.MINT_CERT_PART_B}${process.env.MINT_CERT_PART_C}`
);

const extract = async function (word) {
  const options = {
    cert,
    key: cert,
  };

  const sslConfiguredAgent = new https.Agent(options);

  const headers = {
    "Content-Type": "application/json",
  };
  const endpointURL = `https://www.wordreference.com/definicion/${word}`;

  const response = await fetch(endpointURL, {
    headers,
    agent: sslConfiguredAgent,
    method: "get",
  }).catch((error) => {
    console.log(error);
  });

  const responseBody = await response.text();

  return responseBody;
};

module.exports = {
  extract,
};
