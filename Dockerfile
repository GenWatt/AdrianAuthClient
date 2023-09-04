FROM node:alpine AS Development

EXPOSE 3000
WORKDIR /adrianauth
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i

CMD ["npm", "run", "dev"]