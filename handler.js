'use strict';

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region : 'us-east-1'});

module.exports.hello = (event, context, callback) => {
  if(event.httpMethod === "GET") {
    if(event.pathParameters && event.pathParameters.userId) {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: 'GET Request with path param',
          input: event
        })
      });
    }
    if(event.queryStringParameters && event.queryStringParameters.name) {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Hola ' + event.queryStringParameters.name + ', Welcome to the Serverless Architecture Domain.',
        })
      });
    }
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Invalid GET Request',
      })
    });
  }

  if(event.httpMethod === "POST" && event.body) {
    let json = JSON.parse(event.body);
    let params = {
      Items : json,
      TableName : 'user'
    }
    docClient.put(params, function(err, data) {
      if(err)
      callback(err, null)
      if(data)
      callback(null, data)
    })
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Inserting of data was unsuccessful.',
        object: json
      })
    });
  }

  if(event.httpMethod === "DELETE") {
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
