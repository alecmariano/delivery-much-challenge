FROM node:latest

RUN mkdir -p /usr/app

WORKDIR /app

COPY . .

ENV GIPHY_API_KEY=vAZWFoOLsCXSwpC9zf9UJVKObAhokJ6C

RUN yarn install

EXPOSE 3001

ENTRYPOINT ["node", "./src/app.js"]