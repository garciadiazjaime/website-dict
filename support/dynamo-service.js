const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
});

const documentClient = new AWS.DynamoDB.DocumentClient();

const getWords = () => {
  const params = {
    TableName: "word",
    Limit: 97,
  };

  return documentClient.scan(params).promise();
};

const getWord = async (word) => {
  const params = {
    TableName: "word",
    ExpressionAttributeValues: {
      ":word": word,
    },
    FilterExpression: "word = :word",
  };

  return documentClient.scan(params).promise();
};

const saveWord = async (word, lang, definitions) => {
  if (!word || !lang || !Array.isArray(definitions) || !definitions.length) {
    return;
  }

  const newWord = `${word}_${lang}`;
  const response = await getWord(newWord);

  if (Array.isArray(response.Items) && response.Items.length > 0) {
    return response;
  }

  const batch = [
    {
      PutRequest: {
        Item: {
          word: newWord,
          meaning: JSON.stringify(definitions),
          created: new Date().getTime(),
        },
      },
    },
  ];

  const params = {
    RequestItems: {
      word: batch,
    },
  };

  return documentClient.batchWrite(params).promise();
};

module.exports = {
  saveWord,
  getWords,
};
