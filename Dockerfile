FROM node:alpine

RUN mkdir /code
WORKDIR /code
COPY package.json .
RUN npm install
COPY . .
RUN npm run prestart
EXPOSE 8080
ENV PORT=8080
CMD ["npm", "run", "ssr"]
