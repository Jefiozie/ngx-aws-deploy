# NGX-AWS-DEPLOY

Deploy your Angular app to Amazon S3 directly from the Angular CLI.

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

![npm](https://img.shields.io/npm/dw/@jefiozie/ngx-aws-deploy)
![npm (scoped)](https://img.shields.io/npm/v/@jefiozie/ngx-aws-deploy)
![GitHub issues](https://img.shields.io/github/issues/jefiozie/ngx-aws-deploy)
<a href="https://twitter.com/jefiozie">
<img src="https://img.shields.io/badge/say-thanks-ff69b4.svg"/>
</a>

  <a href="https://twitter.com/jefiozie">  
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/jefiozie?style=social">
  </a>

## Quick Start

1. Install the latest version of Angular cli

   ```sh
   yarn global add @angular/cli
   ```

2. Create a new Angular project

   ```sh
   ng new hello-world --defaults
   cd hello-world
   ```
3. Add `@jefiozie/ngx-aws-deploy` to your project 

    ```sh
    ng add @jefiozie/ngx-aws-deploy
    ```

4. You will be prompted for a couple of questions:

    1. Your AWS Region
    2. The bucket you would like the files to be uploaded.
    3. The Secret Acces Key
    4. The Access key Id

5. After these step your `angular.json` is update with a new builder:

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
6. Run `ng-deploy` to deploy your application to Amazon S3.


## Security

Keep in mind that **with the default config, everybody that has access to the angular.json will have your aws secret**.

If you want more security, you can also use environment variable with `NG_DEPLOY_AWS_ACCESS_KEY_ID`, `NG_DEPLOY_AWS_SECRET_ACCESS_KEY`, `NG_DEPLOY_AWS_BUCKET` and `NG_DEPLOY_AWS_REGION`.


🚀***Happy deploying!*** 🚀

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

The builder is located in the `builder`folder.
The sample app is located in the `builder-test` folder.

Please make sure to update tests as appropriate.

## License

[MIT](./LICENSE)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://jefiozie.github.io"><img src="https://avatars0.githubusercontent.com/u/17835373?v=4" width="100px;" alt=""/><br /><sub><b>Jeffrey Bosch</b></sub></a><br /><a href="https://github.com/Jefiozie/ngx-aws-deploy/commits?author=Jefiozie" title="Code">💻</a> <a href="#content-Jefiozie" title="Content">🖋</a> <a href="https://github.com/Jefiozie/ngx-aws-deploy/pulls?q=is%3Apr+reviewed-by%3AJefiozie" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://www.santoshyadav.dev"><img src="https://avatars3.githubusercontent.com/u/11923975?v=4" width="100px;" alt=""/><br /><sub><b>Santosh Yadav</b></sub></a><br /><a href="https://github.com/Jefiozie/ngx-aws-deploy/commits?author=santoshyadav198613" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
