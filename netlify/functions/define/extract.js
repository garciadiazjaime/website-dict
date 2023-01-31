const https = require("https");
const fetch = require("node-fetch");
const base64 = require("base-64");

const getSpanisDefinition = async (word) => {
  const MINT_CERT_B =
    "0KTUlJRXZ3SUJBREFOQmdrcWhraUc5dzBCQVFFRkFBU0NCS2t3Z2dTbEFnRUFBb0lCQVFEU0JxMnFZNTJ3OTdJMQp1Mm1VdlorV3FwMW0wVWpZQmdIaWRQdVpNWVpZNTVEUkhqbDFFRXhMQVlyUXZTZlF4Y0FsU3pYOXlrR1RhWVZNClhZTDB1cWRaWXlPZDhBcktHZmxUY2VHRXFHbWpwNS9WVy9hUmNhMTlQR2pvT1NtYmVQbFE1bXN0SE4ycGY5cVMKcEYxeG1RZGkyYjVrRDJNMDY4QThNVTYwM0VFeUVFN1ZmcjlNU1ozRExyYlZiUnlJc3lZYXA5N1l6SWVQQXNqYwpLb3ZhNkNzZTJEMk5UZjhPYmExSGd6bGRJY0JYcVc0aTNuY0xKWTJUZHo4SFNzYU91R0luNnJLeHozYVpseFRQCkpOWTFNQ2ZiT0gzMjBmeFdsQmFselRuTmVCa0U2ODNMMFkzdUVjc1duMTdFOUQwTE9SbGVPOTBRYXJKSmphQU4Kdm5qYW5PZlJBZ01CQUFFQ2dnRUJBTWh2TnkxMUEvanZhbE45RjdXcmdiSDRBVjh1TzZadGxUN1pCWU9kaitrbwpsVHY4N0RpYjVUTnZ0VnFnS205RFNheE5xcWtaYkp1U0NIUm9pYUdrd0RDK1BDOXQ5ZDRLQzdkbTV5SUMxMDRuCm1wR3p3Z3Zyd1BYVHdRcGVBeWNzdkVKSW85L1p2SEVXWXpHdlNyNHVuSzNwdjVrZVZqOGEvY3AwQS9qMmVnR2IKYys4QzBRU2Fia21uNWczaTBia2FQbFFuTDJ4SVVaZWJ5TlhRUDhRdWFPcjk3dlBLa1lkaGVadThGY2wxZVRWNwpZM3RuQkhVZ010Z1V2Vk8rRVhlSWZscVRnTmlBVUdsR29MSGpyVEhaUHlIOUppeHNxUFlzN005Zkk0a2sxK1BkCmw4cXhYMnMzckgyU2RuSTlkbFYrMU9ZaXJoZ0dvUUluYlVkakxyOC9NMEVDZ1lFQTdTK2d3Rk5ybFpoYmVRajMKdlJKcmV6VVNpcGZseHNERENXaGhMaWg3WFRFRVIwMG51MXVydUhVOTJTNG1DYzFqdVV1UnZXY25sKzZEZ0N1YgppTEdWY3Z4YWZoS20zcGFwUjFBS3QzOGpXMnlIK3dhVG5CR05rQ3A2RHVDeS9nZUdNcFMrZ1NHVXdCNGFRQVkrCkhRM0xqOEVZNUtCWFlpdkRWU1ZFMys1Ulp2OENnWUVBNHErSU5FQWprZ0c4MkZURnFrU250ZmllU1Y0MWk5TWIKSXg4U0t2MWFXUjgrcTNROWpweFpDWmZVcVZBaitubEtwWjZicEJ3MllSUlJ4Rk1YYWkxenFNR0hEa0xRSlYxbwpPbDhQUUp5K21ZQXd4ZFIyM3kxc3p1M0FsdUpCM0FTMWxsWEFiUVIwQ2doT3JubmRsSXpEblQyT1NvU3ZlQ2tGCkd0Zm5kdHU4QVM4Q2dZRUExb2ZHd1U1eXQ4c25xWEVZQ3ZhM0txaVZUYkFZVDg0WVd0RURYU21XYzNNYmFKWjcKd25ZbSt0OW9ncURBSFF1ZUVJSXVudjdIakI5YTU3b0pvdmprc1MxWmVFRE1sL1h6eEtHOEg3NnFMMDRhTEU0RgpneHRKVE1WdXd6Z3dEWjZtbmVkMTYveUF1OGcrZS94cGdBUHpRK0ltN3R1c1RncEJVaWswZzhyZDYrY0NnWUJNClhuU1ZuZElkKzJYaXY5U0VBM000OUJSbmhVeW0yYTAzek56ekRMMm1ic2RQUGU4TEg1TkRqeG8vSEZleXA3QkYKVWNUL3FkMk1JU3RXNStOb2l2MS9LZ3ZVK3g5aXB6QlpFZk55Z2h3WVhMNlJ0MzJBdkszK25NeVlTSXVGa3pTVgovRGZDd3BCUlhQRWRDTU5rcTNPdmdyQndYSGs5RXh5OEtXYTZmVmErVXdLQmdRRFZPTlpUaTd3WlZZc0Z0eWZYCms1WDY1ZFkyR3c0Q0FJYlFUL1lJT3IvZzk2NTBEbVZrckxiUS93VGp1Z1hBNjFMSDJrSS95OTBITUhJZXRYYm8KZ2FtL0FmR1NLWFQ2eHJVbjNJL1BoMElQbFJFUDQ2S2c2aWd2eHJrTkcxVEVUdDVpK3o0c2krMHlmdDE3TUFKawpiUWlLK3NuaUp6SjFINEd3Z2NJNVJJUmdLZz09Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K";
  const cert = base64.decode(`${process.env.MINT_CERT_A}${MINT_CERT_B}`);
  console.log({ cert });

  const options = {
    cert,
    key: cert,
  };

  const sslConfiguredAgent = new https.Agent(options);

  const headers = {};
  const endpointURL = `https://www.wordreference.com/definicion/${word}`;
  console.log({ endpointURL });
  const response = await fetch(endpointURL, {
    headers,
    agent: sslConfiguredAgent,
    method: "get",
  })
    .then((resp) => resp.text())
    .catch((error) => {
      console.log("fail", error);
    });

  console.log("response found", !!response);

  return response;
};

const extract = function (word, lang) {
  if (lang.toUpperCase() === "ES") {
    return getSpanisDefinition(word);
  }

  return "";
};

module.exports = {
  extract,
};
