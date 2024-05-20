FROM node:lts-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3456

CMD ["npm", "run", "dev"]