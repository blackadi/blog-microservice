FROM node

WORKDIR /usr/blog

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD [ "npm", "start" ]