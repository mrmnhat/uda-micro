FROM node:14
RUN sudo apt install -y cmake build-essential wget

SHELL ["/bin/bash", "--login", "-c"]ENV NODE_VERSION=14.17.3
ENV NVM_DIR /tmp/nvm
WORKDIR $NVM_DIR

ENV NODE_VERSION=20
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version
RUN npm install -g typescript@3.4.5

### Build
FROM beevelop/ionic:latest AS ionic
## Create app directory
WORKDIR /usr/src/app
## Install app dependencies
RUN apt-get update || : && apt-get install python -y
## A wildcard is used to ensure both package.json AND package-lock.json are copied
RUN npm cache verify
RUN npm i -g npm
COPY package*.json ./
RUN npm install

## Bundle app source
ENV NODE_OPTIONS="--openssl-legacy-provider"
COPY . .
RUN npm install typescript@3.5.3
RUN ionic build
### Run 
FROM nginx:alpine
#COPY www /usr/share/nginx/html
COPY --from=ionic  /usr/src/app/www /usr/share/nginx/html