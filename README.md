# NGX-AWS-DEPLOY

Deploy your Angular app to Amazon S3 directly from the Angular CLI.

![npm](https://img.shields.io/npm/dw/@jefiozie/ngx-aws-deploy)
![npm (scoped)](https://img.shields.io/npm/v/@jefiozie/ngx-aws-deploy)
![GitHub issues](https://img.shields.io/github/issues/jefiozie/ngx-aws-deploy)
<a href="https://twitter.com/jefiozie">
<img src="https://img.shields.io/badge/say-thanks-ff69b4.svg"/>
</a>

  <a href="https://twitter.com/jefiozie">  
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/jefiozie?style=social">
  </a>

## Installation

We can install `ngx-aws-deploy` on by using the Angular CLI.

    ```bash
    ng add @jefiozie/ngx-aws-deploy
    ```

You will be prompted for a couple of questions:

1. Your AWS Region
2. The bucket you would like the files to be uploaded.
3. The Secret Acces Key
4. The Access key Id

After these step your `angular.json` is update with a new builder:

```json
 "deploy": {
    "builder": "@jefiozie/ngx-aws-deploy:deploy",
    "options": {
    "region": "YOUR REGION",
    "bucket": "YOUR BUCKET",
    "secretAccessKey": "YOUR SECRET ACCESSKEY",
    "accessKeyId": "YOUR ACCES KEY ID"
    }
}
```

Happy deploying! 🚀

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

The builder is located in the `builder`folder.
The sample app is located in the `builder-test` folder.

Please make sure to update tests as appropriate.

## License

[MIT](./LICENSE)
