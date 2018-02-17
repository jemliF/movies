FROM node:alpine

RUN mkdir /src

#RUN npm install nodemon -g
#RUN npm install pm2 -g

WORKDIR /src
ADD package.json /src/package.json

RUN npm install

EXPOSE 4000
HEALTHCHECK CMD curl --interval=5m --timeout=1m --fail http://localhost:4000/
CMD npm run dev