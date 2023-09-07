FROM node:14.15.4-slim AS Development

WORKDIR /app
EXPOSE 5173

COPY package.json ./
COPY package-lock.json ./

RUN npm i

COPY ./ ./

CMD ["npm", "run", "dev"]