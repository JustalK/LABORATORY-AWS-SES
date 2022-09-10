# LABORATORY-AWS-SES

#### Prerequisite

- the library aws-sdk

```bash
$ npm install aws-sdk
```

- the aws cli

#### Create a verified email

![./documentation/1.png](./documentation/1.png)

![./documentation/2.png](./documentation/2.png)

![./documentation/3.png](./documentation/3.png)

#### Create a user exclusively for SES

![./documentation/4.png](./documentation/4.png)

![./documentation/5.png](./documentation/5.png)

![./documentation/6.png](./documentation/6.png)

#### Create a template for your email


![./documentation/7.png](./documentation/7.png)

```bash
$ aws configure --profile ses-user
```

![./documentation/8.png](./documentation/8.png)

```bash
$ aws ses create-template --cli-input-json file://email.json --profile ses-user
```

![./documentation/9.png](./documentation/9.png)


