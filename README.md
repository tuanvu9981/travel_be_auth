## NEST-JS PROJECT (TO LEARN AUTH + MIDDLE WARE + CICD AWS)


### Running the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### .env involving
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

### Authentication
1. [NestJs password JWT with User module Mongoose - Viblo](https://viblo.asia/p/xac-thuc-nguoi-dung-trong-nestjs-su-dung-passport-jwt-924lJB7blPM)

2. [NestJS Official Documentation](https://docs.nestjs.com/security/authentication#implementing-passport-local)

3. [Extract JWT from header](https://stackoverflow.com/questions/57833669/how-to-get-jwt-token-from-headers-in-controller)

4. [Custom with Prisma and GraphQL](https://github.com/vladwulf/nestjs-jwts/blob/main/src/prisma/prisma.service.ts)

5. [Destroy token when logging out](https://stackoverflow.com/questions/37959945/how-to-destroy-jwt-tokens-on-logout)

6. [Save token ReactJS in which local storage](https://stackoverflow.com/questions/48983708/where-to-store-access-token-in-react-js)

### Github & Gitlab
1. List all existing origin
```
$ git remote -v
```

2. Remove origin
```
$ git remote rm origin
```

3. Add remote repo for GitHub
```
$ git remote add github https://github.com/<user_name>/<repository_name>.git
```

4. Add remote repo for Gitlab
```
$ git remote add gitlab https://github.com/<user_name>/<repository_name>.git
```

5. Now you have multiple remotes in the project. Double check with git remote -v
```
github	https://github.com/tuanvu9981/travel_be_auth (fetch)
github	https://github.com/tuanvu9981/travel_be_auth (push)
gitlab	https://gitlab.com/tuanvu9981/travel_be_auth (fetch)
gitlab	https://gitlab.com/tuanvu9981/travel_be_auth (push)
```

6. Push code to remotes
```
$ git push github <branch_name>
$ git push gitlab <branch_name>
```

### CI/CD with Gitlab
1. [Setup Gitlab CICD for a Reactjs App to AWS EC2](https://viblo.asia/p/setup-gitlab-cicd-reactjs-app-len-aws-ec2-6J3ZgRPqKmB)

2. [Config SSH & how to use as VARIABLE in config file](https://docs.gitlab.com/ee/ci/ssh_keys/)

3. [Fix bug: "Enter passphrase (stdin): "](https://techsparx.com/software-development/gitlab-ci-enter-passphrase.html)
  - Keyword: When using ssh keygen, please enter passphrase --> Press enter, no input

4. [Fix bug: Cannot connect (publickey)](https://docs.gitlab.com/ee/ci/ssh_keys/?fbclid=IwAR39kBFl0Cma4ha_iioHgjO_p5SDwpFPKUIHEduI0i0FtAdzQee7C7Z6upU)
  - Using [echo command](https://www.cyberciti.biz/faq/linux-append-text-to-end-of-file/) to add new public key (paired to SSH_PRIVATE_KEY) to file called **authorized_keys** in **.ssh folder** of EC2 instance Ubuntu server. **authorized_keys** will be like: 
    ```
    <public-key 1>

    <public-key 2>
    ```

5. When running, bug named **ADDRESS IN USE** occurred. 
  - Solution: using **npx kill-port 8000** command

6. Use bash file to avoid writing **ssh -i Hostkey ... ubuntu@$EC2_IP_ADDRESS** many times, see **[this](https://dev.to/atdigitals/deploy-node-js-using-gitlab-ci-pipeline-2jod)**

7. When error **Dont know username** occurs, connect to EC2 instance, cd to repository, using this command, then EC2 wont ask you about username connection anymore. 
  ```
  ubuntu@$EC2_IP_ADDRESS:~/travel_be_auth: git remote set-url origin https://[username]:[access_token_or_password]@gitlab.com/[path_to_your_repo.git]
  ```

* Note: When [access_token_or_password] expired, your process involving git will also be blocked or denied by Gitlab. You need to create another access token and reset remote.

* Note: In bash file, if you write: 
```
git pull gitlab-origin master
```
then when set git remote, you'll also have to name it **gitlab-origin** too. If not, Gitlab will inform you: "Remote name not found"

8. The bash command, which stops logging of nestjs application
  - Hint: [Follow StackOverflow instruction](https://stackoverflow.com/questions/51438086/make-nodejs-script-run-in-background-in-gitlab-ci)
  - Bash code (remember to install bash)
  ```bash
  ## Inside .gitlab-ci.yml
  before_script:
  - apk add openssh-client bash

  ## Inside run_server.sh
  npm run serve > nestjs_server_running.log 2>&1 &
  while ! grep -q "Server is listening to PORT: 8000" nestjs_server_running.log
  do
    sleep .1
  done
  ```
  - Explanation: 
    - 0 == **STDIN**, 1 == **STDOUT**, 2 == **STDERR**
    - This command redirect both 2 (STDERR) and 1 (STDOUT) to log file. And **&** between 2>&1 is to distinguish from file name "1" and "2".
    - The **&** at the end is how you tell the shell to run the command as a job in the background. This causes the prompt to return immediately while the command is run asynchronously behind the scenes.

### About AWS
1. **[Calculate money and service fee AWS](https://viblo.asia/p/cach-tinh-chi-phi-dich-vu-aws-maGK70BBZj2#_cac-lua-chon-thay-the-aws-3)**