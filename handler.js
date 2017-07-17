'use strict';

module.exports.hello = (event, context, callback) => {
  if(event.httpMethod === "GET" && event.queryStringParameters && event.queryStringParameters.name) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Hola ' + event.queryStringParameters.name + ', Welcome to the Serverless Architecture Domain.',
      })
    });
  }

  if(event.httpMethod === "POST" && event.body) {
    let json = JSON.parse(event.body);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Hii, this is your supplied body',
        object: json
      })
    });
  }
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
