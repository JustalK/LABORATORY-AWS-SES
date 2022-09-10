/**
 * The endpoint of the express app
 * @module routes/app
 */
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

let sendEmail = (to, name) => {
    let params = {
      Source: process.env.VERIFIED_EMAIL,
      Destination: {
        ToAddresses: [
          to
        ],
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
        }
      },
    };
    return AWS_SES.sendEmail(params).promise();
};

let sendTemplateEmail = (to, name) => {
    let params = {
      Source: process.env.VERIFIED_EMAIL,
      Template: 'ExampleTemplate',
      Destination: {
        'ToAddresse': [ 
          to
        ]
      },
      TemplateData: `{ \"name\':\'${name}\'}`
    };
    return AWS_SES.sendTemplatedEmail(params).promise();
};

router.get('/api', (req, res) => {
    res.send({ message: 'Welcome to api!' });
});

router.get('/send/email', (req, res) => {
    const { to, name } = req.body;
    sendEmail(to, name);
    res.send(true);
});

router.post('/send/email/template', (req, res) => {
    const { to, name } = req.body;
    sendTemplateEmail(to, name);
    res.send(true);
});

module.exports = router;