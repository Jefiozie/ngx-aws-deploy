# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [5.3.0](https://github.com/Jefiozie/ngx-aws-deploy/compare/v5.2.0...v5.3.0) (2023-08-06)


### Features

* **#104:** add options to delete files before/after upload ([#429](https://github.com/Jefiozie/ngx-aws-deploy/issues/429)) ([7d3457e](https://github.com/Jefiozie/ngx-aws-deploy/commit/7d3457e680a96f02e53c97b114e2e131a759d6c4))
* add support for default aws variables ([#381](https://github.com/Jefiozie/ngx-aws-deploy/issues/381)) ([32b121a](https://github.com/Jefiozie/ngx-aws-deploy/commit/32b121ac3c40c11a9d1c430bc3544b5244df92f4))
* simple implementation to trigger an optional AWS CloudFront invalidation after files have been uploaded to AWS S3. ([#393](https://github.com/Jefiozie/ngx-aws-deploy/issues/393)) ([6192a19](https://github.com/Jefiozie/ngx-aws-deploy/commit/6192a19579727d965a10ef100769d667a9adff92)), closes [#392](https://github.com/Jefiozie/ngx-aws-deploy/issues/392)
* support Angular 11 ([#349](https://github.com/Jefiozie/ngx-aws-deploy/issues/349)) ([1ff8803](https://github.com/Jefiozie/ngx-aws-deploy/commit/1ff88038132ffe1faeec2faaa1efb18b8b237e93))
* Support for AWS Temporal Credentials Authentication via AWS_SESSION_TOKEN env variable ([#385](https://github.com/Jefiozie/ngx-aws-deploy/issues/385)) ([171e167](https://github.com/Jefiozie/ngx-aws-deploy/commit/171e1674b5d3788c80ac74656f6c6f020fb05100))
* update lib to only support from v14 ([#421](https://github.com/Jefiozie/ngx-aws-deploy/issues/421)) ([e25e1be](https://github.com/Jefiozie/ngx-aws-deploy/commit/e25e1be7ea66419fb3ec15f86659fff56d3a65d9))
* update to latest version of nx ([d26fdcb](https://github.com/Jefiozie/ngx-aws-deploy/commit/d26fdcb522433c61e3a4c89a61516ebe684280fd))


### Bug Fixes

* handle build target correctly ([28f7679](https://github.com/Jefiozie/ngx-aws-deploy/commit/28f767985580a6842008f857f42063a2800387a9))
* handle the tests correctly ([e68d677](https://github.com/Jefiozie/ngx-aws-deploy/commit/e68d677ab4a23bac58765d9191d7d72cbbf84298))
* remove default value ([c58cd6a](https://github.com/Jefiozie/ngx-aws-deploy/commit/c58cd6afe342bddbad3a602a08dac98d64667d46))
* remove direct workspace access ([#346](https://github.com/Jefiozie/ngx-aws-deploy/issues/346)) ([f1f49ac](https://github.com/Jefiozie/ngx-aws-deploy/commit/f1f49ac0fc7dded5c7a3c0d3e4c94a235ae4d1f8))
* remove the `production` configuration from `ng deploy` command ([#345](https://github.com/Jefiozie/ngx-aws-deploy/issues/345)) ([7f113ee](https://github.com/Jefiozie/ngx-aws-deploy/commit/7f113ee89410bbace017ee02883dc4204d06241a))
* take into account folders and files with a dot in the name ([#347](https://github.com/Jefiozie/ngx-aws-deploy/issues/347)) ([ab42851](https://github.com/Jefiozie/ngx-aws-deploy/commit/ab42851dec9ae83e86ae6a0437cfc438b3f32823))
* use  for schema ID ([#402](https://github.com/Jefiozie/ngx-aws-deploy/issues/402)) ([2ba003b](https://github.com/Jefiozie/ngx-aws-deploy/commit/2ba003b0a402fe975aa9d498087d50067b632a7f))

## 5.1.0 (2023-02-26)


### Features

* add support for default aws variables ([#381](https://github.com/Jefiozie/ngx-aws-deploy/issues/381)) ([32b121a](https://github.com/Jefiozie/ngx-aws-deploy/commit/32b121ac3c40c11a9d1c430bc3544b5244df92f4)), closes [#372](https://github.com/Jefiozie/ngx-aws-deploy/issues/372)
* simple implementation to trigger an optional AWS CloudFront invalidation after files have been uploaded to AWS S3. ([#393](https://github.com/Jefiozie/ngx-aws-deploy/issues/393)) ([6192a19](https://github.com/Jefiozie/ngx-aws-deploy/commit/6192a19579727d965a10ef100769d667a9adff92)), closes [#392](https://github.com/Jefiozie/ngx-aws-deploy/issues/392)
* support Angular 11 ([#349](https://github.com/Jefiozie/ngx-aws-deploy/issues/349)) ([1ff8803](https://github.com/Jefiozie/ngx-aws-deploy/commit/1ff88038132ffe1faeec2faaa1efb18b8b237e93))
* Support for AWS Temporal Credentials Authentication via AWS_SESSION_TOKEN env variable ([#385](https://github.com/Jefiozie/ngx-aws-deploy/issues/385)) ([171e167](https://github.com/Jefiozie/ngx-aws-deploy/commit/171e1674b5d3788c80ac74656f6c6f020fb05100))
* update lib to only support from v14 ([#421](https://github.com/Jefiozie/ngx-aws-deploy/issues/421)) ([e25e1be](https://github.com/Jefiozie/ngx-aws-deploy/commit/e25e1be7ea66419fb3ec15f86659fff56d3a65d9))
* update to latest version of nx ([d26fdcb](https://github.com/Jefiozie/ngx-aws-deploy/commit/d26fdcb522433c61e3a4c89a61516ebe684280fd))


### Bug Fixes

* handle build target correctly ([28f7679](https://github.com/Jefiozie/ngx-aws-deploy/commit/28f767985580a6842008f857f42063a2800387a9))
* handle the tests correctly ([e68d677](https://github.com/Jefiozie/ngx-aws-deploy/commit/e68d677ab4a23bac58765d9191d7d72cbbf84298))
* remove default value ([c58cd6a](https://github.com/Jefiozie/ngx-aws-deploy/commit/c58cd6afe342bddbad3a602a08dac98d64667d46))
* remove direct workspace access ([#346](https://github.com/Jefiozie/ngx-aws-deploy/issues/346)) ([f1f49ac](https://github.com/Jefiozie/ngx-aws-deploy/commit/f1f49ac0fc7dded5c7a3c0d3e4c94a235ae4d1f8))
* remove the `production` configuration from `ng deploy` command ([#345](https://github.com/Jefiozie/ngx-aws-deploy/issues/345)) ([7f113ee](https://github.com/Jefiozie/ngx-aws-deploy/commit/7f113ee89410bbace017ee02883dc4204d06241a))
* take into account folders and files with a dot in the name ([#347](https://github.com/Jefiozie/ngx-aws-deploy/issues/347)) ([ab42851](https://github.com/Jefiozie/ngx-aws-deploy/commit/ab42851dec9ae83e86ae6a0437cfc438b3f32823))
* use  for schema ID ([#402](https://github.com/Jefiozie/ngx-aws-deploy/issues/402)) ([2ba003b](https://github.com/Jefiozie/ngx-aws-deploy/commit/2ba003b0a402fe975aa9d498087d50067b632a7f))

## 5.1.0 (2023-02-26)


### Features

* add support for default aws variables ([#381](https://github.com/Jefiozie/ngx-aws-deploy/issues/381)) ([32b121a](https://github.com/Jefiozie/ngx-aws-deploy/commit/32b121ac3c40c11a9d1c430bc3544b5244df92f4)), closes [#372](https://github.com/Jefiozie/ngx-aws-deploy/issues/372)
* simple implementation to trigger an optional AWS CloudFront invalidation after files have been uploaded to AWS S3. ([#393](https://github.com/Jefiozie/ngx-aws-deploy/issues/393)) ([6192a19](https://github.com/Jefiozie/ngx-aws-deploy/commit/6192a19579727d965a10ef100769d667a9adff92)), closes [#392](https://github.com/Jefiozie/ngx-aws-deploy/issues/392)
* support Angular 11 ([#349](https://github.com/Jefiozie/ngx-aws-deploy/issues/349)) ([1ff8803](https://github.com/Jefiozie/ngx-aws-deploy/commit/1ff88038132ffe1faeec2faaa1efb18b8b237e93))
* Support for AWS Temporal Credentials Authentication via AWS_SESSION_TOKEN env variable ([#385](https://github.com/Jefiozie/ngx-aws-deploy/issues/385)) ([171e167](https://github.com/Jefiozie/ngx-aws-deploy/commit/171e1674b5d3788c80ac74656f6c6f020fb05100))
* update lib to only support from v14 ([#421](https://github.com/Jefiozie/ngx-aws-deploy/issues/421)) ([e25e1be](https://github.com/Jefiozie/ngx-aws-deploy/commit/e25e1be7ea66419fb3ec15f86659fff56d3a65d9))
* update to latest version of nx ([d26fdcb](https://github.com/Jefiozie/ngx-aws-deploy/commit/d26fdcb522433c61e3a4c89a61516ebe684280fd))


### Bug Fixes

* handle build target correctly ([28f7679](https://github.com/Jefiozie/ngx-aws-deploy/commit/28f767985580a6842008f857f42063a2800387a9))
* handle the tests correctly ([e68d677](https://github.com/Jefiozie/ngx-aws-deploy/commit/e68d677ab4a23bac58765d9191d7d72cbbf84298))
* remove default value ([c58cd6a](https://github.com/Jefiozie/ngx-aws-deploy/commit/c58cd6afe342bddbad3a602a08dac98d64667d46))
* remove direct workspace access ([#346](https://github.com/Jefiozie/ngx-aws-deploy/issues/346)) ([f1f49ac](https://github.com/Jefiozie/ngx-aws-deploy/commit/f1f49ac0fc7dded5c7a3c0d3e4c94a235ae4d1f8))
* remove the `production` configuration from `ng deploy` command ([#345](https://github.com/Jefiozie/ngx-aws-deploy/issues/345)) ([7f113ee](https://github.com/Jefiozie/ngx-aws-deploy/commit/7f113ee89410bbace017ee02883dc4204d06241a))
* take into account folders and files with a dot in the name ([#347](https://github.com/Jefiozie/ngx-aws-deploy/issues/347)) ([ab42851](https://github.com/Jefiozie/ngx-aws-deploy/commit/ab42851dec9ae83e86ae6a0437cfc438b3f32823))
* use  for schema ID ([#402](https://github.com/Jefiozie/ngx-aws-deploy/issues/402)) ([2ba003b](https://github.com/Jefiozie/ngx-aws-deploy/commit/2ba003b0a402fe975aa9d498087d50067b632a7f))

## 5.0.0 (2023-02-26)


### Features

* add support for default aws variables ([#381](https://github.com/Jefiozie/ngx-aws-deploy/issues/381)) ([32b121a](https://github.com/Jefiozie/ngx-aws-deploy/commit/32b121ac3c40c11a9d1c430bc3544b5244df92f4)), closes [#372](https://github.com/Jefiozie/ngx-aws-deploy/issues/372)
* simple implementation to trigger an optional AWS CloudFront invalidation after files have been uploaded to AWS S3. ([#393](https://github.com/Jefiozie/ngx-aws-deploy/issues/393)) ([6192a19](https://github.com/Jefiozie/ngx-aws-deploy/commit/6192a19579727d965a10ef100769d667a9adff92)), closes [#392](https://github.com/Jefiozie/ngx-aws-deploy/issues/392)
* support Angular 11 ([#349](https://github.com/Jefiozie/ngx-aws-deploy/issues/349)) ([1ff8803](https://github.com/Jefiozie/ngx-aws-deploy/commit/1ff88038132ffe1faeec2faaa1efb18b8b237e93))
* Support for AWS Temporal Credentials Authentication via AWS_SESSION_TOKEN env variable ([#385](https://github.com/Jefiozie/ngx-aws-deploy/issues/385)) ([171e167](https://github.com/Jefiozie/ngx-aws-deploy/commit/171e1674b5d3788c80ac74656f6c6f020fb05100))
* update lib to only support from v14 ([#421](https://github.com/Jefiozie/ngx-aws-deploy/issues/421)) ([e25e1be](https://github.com/Jefiozie/ngx-aws-deploy/commit/e25e1be7ea66419fb3ec15f86659fff56d3a65d9))
* update to latest version of nx ([d26fdcb](https://github.com/Jefiozie/ngx-aws-deploy/commit/d26fdcb522433c61e3a4c89a61516ebe684280fd))


### Bug Fixes

* handle build target correctly ([28f7679](https://github.com/Jefiozie/ngx-aws-deploy/commit/28f767985580a6842008f857f42063a2800387a9))
* handle the tests correctly ([e68d677](https://github.com/Jefiozie/ngx-aws-deploy/commit/e68d677ab4a23bac58765d9191d7d72cbbf84298))
* remove default value ([c58cd6a](https://github.com/Jefiozie/ngx-aws-deploy/commit/c58cd6afe342bddbad3a602a08dac98d64667d46))
* remove direct workspace access ([#346](https://github.com/Jefiozie/ngx-aws-deploy/issues/346)) ([f1f49ac](https://github.com/Jefiozie/ngx-aws-deploy/commit/f1f49ac0fc7dded5c7a3c0d3e4c94a235ae4d1f8))
* remove the `production` configuration from `ng deploy` command ([#345](https://github.com/Jefiozie/ngx-aws-deploy/issues/345)) ([7f113ee](https://github.com/Jefiozie/ngx-aws-deploy/commit/7f113ee89410bbace017ee02883dc4204d06241a))
* take into account folders and files with a dot in the name ([#347](https://github.com/Jefiozie/ngx-aws-deploy/issues/347)) ([ab42851](https://github.com/Jefiozie/ngx-aws-deploy/commit/ab42851dec9ae83e86ae6a0437cfc438b3f32823))
* use  for schema ID ([#402](https://github.com/Jefiozie/ngx-aws-deploy/issues/402)) ([2ba003b](https://github.com/Jefiozie/ngx-aws-deploy/commit/2ba003b0a402fe975aa9d498087d50067b632a7f))

## 5.0.0 (2022-10-24)


### Features

* add support for default aws variables ([#381](https://github.com/Jefiozie/ngx-aws-deploy/issues/381)) ([32b121a](https://github.com/Jefiozie/ngx-aws-deploy/commit/32b121ac3c40c11a9d1c430bc3544b5244df92f4)), closes [#372](https://github.com/Jefiozie/ngx-aws-deploy/issues/372)
* simple implementation to trigger an optional AWS CloudFront invalidation after files have been uploaded to AWS S3. ([#393](https://github.com/Jefiozie/ngx-aws-deploy/issues/393)) ([6192a19](https://github.com/Jefiozie/ngx-aws-deploy/commit/6192a19579727d965a10ef100769d667a9adff92)), closes [#392](https://github.com/Jefiozie/ngx-aws-deploy/issues/392)
* support Angular 11 ([#349](https://github.com/Jefiozie/ngx-aws-deploy/issues/349)) ([1ff8803](https://github.com/Jefiozie/ngx-aws-deploy/commit/1ff88038132ffe1faeec2faaa1efb18b8b237e93))
* Support for AWS Temporal Credentials Authentication via AWS_SESSION_TOKEN env variable ([#385](https://github.com/Jefiozie/ngx-aws-deploy/issues/385)) ([171e167](https://github.com/Jefiozie/ngx-aws-deploy/commit/171e1674b5d3788c80ac74656f6c6f020fb05100))
* update lib to only support from v14 ([#421](https://github.com/Jefiozie/ngx-aws-deploy/issues/421)) ([e25e1be](https://github.com/Jefiozie/ngx-aws-deploy/commit/e25e1be7ea66419fb3ec15f86659fff56d3a65d9))
* update to latest version of nx ([d26fdcb](https://github.com/Jefiozie/ngx-aws-deploy/commit/d26fdcb522433c61e3a4c89a61516ebe684280fd))


### Bug Fixes

* handle build target correctly ([28f7679](https://github.com/Jefiozie/ngx-aws-deploy/commit/28f767985580a6842008f857f42063a2800387a9))
* handle the tests correctly ([e68d677](https://github.com/Jefiozie/ngx-aws-deploy/commit/e68d677ab4a23bac58765d9191d7d72cbbf84298))
* remove default value ([c58cd6a](https://github.com/Jefiozie/ngx-aws-deploy/commit/c58cd6afe342bddbad3a602a08dac98d64667d46))
* remove direct workspace access ([#346](https://github.com/Jefiozie/ngx-aws-deploy/issues/346)) ([f1f49ac](https://github.com/Jefiozie/ngx-aws-deploy/commit/f1f49ac0fc7dded5c7a3c0d3e4c94a235ae4d1f8))
* remove the `production` configuration from `ng deploy` command ([#345](https://github.com/Jefiozie/ngx-aws-deploy/issues/345)) ([7f113ee](https://github.com/Jefiozie/ngx-aws-deploy/commit/7f113ee89410bbace017ee02883dc4204d06241a))
* take into account folders and files with a dot in the name ([#347](https://github.com/Jefiozie/ngx-aws-deploy/issues/347)) ([ab42851](https://github.com/Jefiozie/ngx-aws-deploy/commit/ab42851dec9ae83e86ae6a0437cfc438b3f32823))
* use  for schema ID ([#402](https://github.com/Jefiozie/ngx-aws-deploy/issues/402)) ([2ba003b](https://github.com/Jefiozie/ngx-aws-deploy/commit/2ba003b0a402fe975aa9d498087d50067b632a7f))

## 5.0.0 (2022-10-24)


### Features

* add support for default aws variables ([#381](https://github.com/Jefiozie/ngx-aws-deploy/issues/381)) ([32b121a](https://github.com/Jefiozie/ngx-aws-deploy/commit/32b121ac3c40c11a9d1c430bc3544b5244df92f4)), closes [#372](https://github.com/Jefiozie/ngx-aws-deploy/issues/372)
* simple implementation to trigger an optional AWS CloudFront invalidation after files have been uploaded to AWS S3. ([#393](https://github.com/Jefiozie/ngx-aws-deploy/issues/393)) ([6192a19](https://github.com/Jefiozie/ngx-aws-deploy/commit/6192a19579727d965a10ef100769d667a9adff92)), closes [#392](https://github.com/Jefiozie/ngx-aws-deploy/issues/392)
* support Angular 11 ([#349](https://github.com/Jefiozie/ngx-aws-deploy/issues/349)) ([1ff8803](https://github.com/Jefiozie/ngx-aws-deploy/commit/1ff88038132ffe1faeec2faaa1efb18b8b237e93))
* Support for AWS Temporal Credentials Authentication via AWS_SESSION_TOKEN env variable ([#385](https://github.com/Jefiozie/ngx-aws-deploy/issues/385)) ([171e167](https://github.com/Jefiozie/ngx-aws-deploy/commit/171e1674b5d3788c80ac74656f6c6f020fb05100))


### Bug Fixes

* handle build target correctly ([28f7679](https://github.com/Jefiozie/ngx-aws-deploy/commit/28f767985580a6842008f857f42063a2800387a9))
* handle the tests correctly ([e68d677](https://github.com/Jefiozie/ngx-aws-deploy/commit/e68d677ab4a23bac58765d9191d7d72cbbf84298))
* remove default value ([c58cd6a](https://github.com/Jefiozie/ngx-aws-deploy/commit/c58cd6afe342bddbad3a602a08dac98d64667d46))
* remove direct workspace access ([#346](https://github.com/Jefiozie/ngx-aws-deploy/issues/346)) ([f1f49ac](https://github.com/Jefiozie/ngx-aws-deploy/commit/f1f49ac0fc7dded5c7a3c0d3e4c94a235ae4d1f8))
* remove the `production` configuration from `ng deploy` command ([#345](https://github.com/Jefiozie/ngx-aws-deploy/issues/345)) ([7f113ee](https://github.com/Jefiozie/ngx-aws-deploy/commit/7f113ee89410bbace017ee02883dc4204d06241a))
* take into account folders and files with a dot in the name ([#347](https://github.com/Jefiozie/ngx-aws-deploy/issues/347)) ([ab42851](https://github.com/Jefiozie/ngx-aws-deploy/commit/ab42851dec9ae83e86ae6a0437cfc438b3f32823))
* use  for schema ID ([#402](https://github.com/Jefiozie/ngx-aws-deploy/issues/402)) ([2ba003b](https://github.com/Jefiozie/ngx-aws-deploy/commit/2ba003b0a402fe975aa9d498087d50067b632a7f))

## 4.1.0 (2022-02-09)


### Features

* simple implementation to trigger an optional AWS CloudFront invalidation after files have been uploaded to AWS S3. ([#393](https://github.com/Jefiozie/ngx-aws-deploy/issues/393)) ([6192a19](https://github.com/Jefiozie/ngx-aws-deploy/commit/6192a19579727d965a10ef100769d667a9adff92)), closes [#392](https://github.com/Jefiozie/ngx-aws-deploy/issues/392)

### Bug Fixes

* use  for schema ID ([#402](https://github.com/Jefiozie/ngx-aws-deploy/issues/402)) ([2ba003b](https://github.com/Jefiozie/ngx-aws-deploy/commit/2ba003b0a402fe975aa9d498087d50067b632a7f))

## 4.0.0 (2021-05-30)


### Features

* add support for default aws variables ([#381](https://github.com/Jefiozie/ngx-aws-deploy/issues/381)) ([32b121a](https://github.com/Jefiozie/ngx-aws-deploy/commit/32b121ac3c40c11a9d1c430bc3544b5244df92f4)), closes [#372](https://github.com/Jefiozie/ngx-aws-deploy/issues/372)
* support Angular 11 ([#349](https://github.com/Jefiozie/ngx-aws-deploy/issues/349)) ([1ff8803](https://github.com/Jefiozie/ngx-aws-deploy/commit/1ff88038132ffe1faeec2faaa1efb18b8b237e93))


### Bug Fixes

* handle build target correctly ([28f7679](https://github.com/Jefiozie/ngx-aws-deploy/commit/28f767985580a6842008f857f42063a2800387a9))
* handle the tests correctly ([e68d677](https://github.com/Jefiozie/ngx-aws-deploy/commit/e68d677ab4a23bac58765d9191d7d72cbbf84298))
* remove default value ([c58cd6a](https://github.com/Jefiozie/ngx-aws-deploy/commit/c58cd6afe342bddbad3a602a08dac98d64667d46))
* remove direct workspace access ([#346](https://github.com/Jefiozie/ngx-aws-deploy/issues/346)) ([f1f49ac](https://github.com/Jefiozie/ngx-aws-deploy/commit/f1f49ac0fc7dded5c7a3c0d3e4c94a235ae4d1f8))
* remove the `production` configuration from `ng deploy` command ([#345](https://github.com/Jefiozie/ngx-aws-deploy/issues/345)) ([7f113ee](https://github.com/Jefiozie/ngx-aws-deploy/commit/7f113ee89410bbace017ee02883dc4204d06241a))
* take into account folders and files with a dot in the name ([#347](https://github.com/Jefiozie/ngx-aws-deploy/issues/347)) ([ab42851](https://github.com/Jefiozie/ngx-aws-deploy/commit/ab42851dec9ae83e86ae6a0437cfc438b3f32823))

### 3.0.1 (2021-05-30)


### Features

* add support for default aws variables ([#381](https://github.com/Jefiozie/ngx-aws-deploy/issues/381)) ([32b121a](https://github.com/Jefiozie/ngx-aws-deploy/commit/32b121ac3c40c11a9d1c430bc3544b5244df92f4)), closes [#372](https://github.com/Jefiozie/ngx-aws-deploy/issues/372)
* support Angular 11 ([#349](https://github.com/Jefiozie/ngx-aws-deploy/issues/349)) ([1ff8803](https://github.com/Jefiozie/ngx-aws-deploy/commit/1ff88038132ffe1faeec2faaa1efb18b8b237e93))


### Bug Fixes

* handle build target correctly ([28f7679](https://github.com/Jefiozie/ngx-aws-deploy/commit/28f767985580a6842008f857f42063a2800387a9))
* handle the tests correctly ([e68d677](https://github.com/Jefiozie/ngx-aws-deploy/commit/e68d677ab4a23bac58765d9191d7d72cbbf84298))
* remove default value ([c58cd6a](https://github.com/Jefiozie/ngx-aws-deploy/commit/c58cd6afe342bddbad3a602a08dac98d64667d46))
* remove direct workspace access ([#346](https://github.com/Jefiozie/ngx-aws-deploy/issues/346)) ([f1f49ac](https://github.com/Jefiozie/ngx-aws-deploy/commit/f1f49ac0fc7dded5c7a3c0d3e4c94a235ae4d1f8))
* remove the `production` configuration from `ng deploy` command ([#345](https://github.com/Jefiozie/ngx-aws-deploy/issues/345)) ([7f113ee](https://github.com/Jefiozie/ngx-aws-deploy/commit/7f113ee89410bbace017ee02883dc4204d06241a))
* take into account folders and files with a dot in the name ([#347](https://github.com/Jefiozie/ngx-aws-deploy/issues/347)) ([ab42851](https://github.com/Jefiozie/ngx-aws-deploy/commit/ab42851dec9ae83e86ae6a0437cfc438b3f32823))
