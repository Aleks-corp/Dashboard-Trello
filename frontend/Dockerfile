FROM node:18.18.0 as build
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
ENV BASE_URL=http://localhost:3000
EXPOSE 5173
CMD ["yarn", "dev"]
