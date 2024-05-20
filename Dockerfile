FROM node:lts-alpine

ENV PORT=${PORT}

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3456

CMD ["npm", "run", "dev"]