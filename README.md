## NEST-JS PROJECT (TO LEARN AUTH + MIDDLE WARE + CICD AWS)

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="125" alt="Nest Logo" />
</p>


## Running the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## .env involving
1. Declare a list of string
```
LANGUAGES=["English","Vietnamese","Chinese"]
```
- String must be wrapped with **DOUBLE_QUOTES ("")**
- Every element of list **MUST BE WRITTEN IN THE SAME LINE**

2. Versioning
- By default, ```app.enableVersioning()``` will set default version with prefix **v**
```
app.enableVersioning({
  defaultVersion: 'abcxyz',
  type: VersioningType.URI,
})
```
then, the api route called will be ```HOST_NAME:8000/api/vabcxyz/hotel```
- Reference: [NestJS Versioning](https://docs.nestjs.com/techniques/versioning)

## Authentication
1. [Viblo Reference](https://viblo.asia/p/xac-thuc-nguoi-dung-trong-nestjs-su-dung-passport-jwt-924lJB7blPM)
2. [NestJS Official Reference](https://docs.nestjs.com/security/authentication#implementing-passport-local)
3. [Extract JWT from header](https://stackoverflow.com/questions/57833669/how-to-get-jwt-token-from-headers-in-controller)
4. [Custom with Prisma and GraphQL](https://github.com/vladwulf/nestjs-jwts/blob/main/src/prisma/prisma.service.ts)
5. [Destroy token when logging out](https://stackoverflow.com/questions/37959945/how-to-destroy-jwt-tokens-on-logout)
6. [Save token ReactJS](https://stackoverflow.com/questions/48983708/where-to-store-access-token-in-react-js)

## Github & Gitlab
1. Remove origin
```
$ git remote rm origin
```
2. Add remote repo for GitHub
```
$ git remote add github https://github.com/<user_name>/<repository_name>.git
```
3. Add remote repo for Gitlab
```
$ git remote add gitlab https://github.com/<user_name>/<repository_name>.git
```
4. Now you have multiple remotes in the project. Double check with git remote -v
```
github	https://github.com/tuanvu9981/travel_be_auth (fetch)
github	https://github.com/tuanvu9981/travel_be_auth (push)
gitlab	https://gitlab.com/tuanvu9981/travel_be_auth (fetch)
gitlab	https://gitlab.com/tuanvu9981/travel_be_auth (push)
```
5. Push code to remotes
```
$ git push github <branch_name>
$ git push gitlab <branch_name>
```

## CI/CD with Gitlab
1. [Config SSH & how to use as VARIABLE in config file](https://docs.gitlab.com/ee/ci/ssh_keys/)
2. [Fix bug: "Enter passphrase (stdin): "](https://techsparx.com/software-development/gitlab-ci-enter-passphrase.html)
3. [Fix bug: Cannot connect (publickey)](https://docs.gitlab.com/ee/ci/ssh_keys/?fbclid=IwAR39kBFl0Cma4ha_iioHgjO_p5SDwpFPKUIHEduI0i0FtAdzQee7C7Z6upU)
  - Using [echo command](https://www.cyberciti.biz/faq/linux-append-text-to-end-of-file/) to add new public key (paired to SSH_PRIVATE_KEY) to authorized_keys in .ssh folder of EC2 instance Ubuntu server
4. When running, bug named **ADDRESS IN USE** occurred. [Here](https://stackoverflow.com/questions/4075287/node-express-eaddrinuse-address-already-in-use-kill-server) lines the solutions