export {};
('use strict');

const express = require('express');
const AWS = require('aws-sdk');
const router = express.Router();

const SES_CONFIG = {
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
};

const AWS_SES = new AWS.SES(SES_CONFIG);

interface MESSAGE {
  // The unique id of the message
  MessageId: String;
  // The metadata of the object
  ResponseMetadata: { RequestId: String };
}

/**
 * Send an email without a template
 * @param to The email address to who we will send the email
 * @param name The name of the receiver
 * @returns The object from AWS
 */
let sendEmail = async (to: string, name: string): Promise<MESSAGE> => {
  let params = {
    Source: process.env.VERIFIED_EMAIL,
    Destination: {
      ToAddresses: [to],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: 'Sending an email without template!',
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Hello World for ${name}!`,
      },
    },
  };
  return AWS_SES.sendEmail(params).promise();
};

router.post('/send/email', async (req, res) => {
  const { to, name } = req.body;
  try {
    const result = await sendEmail(to, name);
    res.send(result);
  } catch (error) {
    throw error;
  }
});

/**
 * Send an email with a template located on AWS
 * @param to The email address to who we will send the email
 * @param name The name of the receiver
 * @returns The object from AWS
 */
let sendTemplateEmail = async (to: string, name: string): Promise<MESSAGE> => {
  let params = {
    Source: process.env.VERIFIED_EMAIL,
    Template: 'ExampleTemplate',
    Destination: {
      ToAddresses: [to],
    },
    TemplateData: JSON.stringify({ name }),
  };
  return AWS_SES.sendTemplatedEmail(params).promise();
};

router.post('/send/email/template', async (req, res) => {
  const { to, name } = req.body;
  try {
    const result = sendTemplateEmail(to, name);
    res.send(result);
  } catch (error) {
    throw error;
  }
});

router.get('/health', (req, res) => {
  res.send({ status: 'working' });
});

module.exports = router;
