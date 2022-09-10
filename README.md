# LABORATORY-AWS-SES


```bash
$ aws configure --profile ses-user
```

```bash
$ aws ses create-template --cli-input-json file://email.json --profile ses-user
```