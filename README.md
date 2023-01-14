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