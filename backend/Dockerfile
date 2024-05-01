FROM node:18.18.0
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
ENV POSTGRES_HOST=task-bd
ENV POSTGRES_PORT=5432
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=board_bd
EXPOSE 3030
CMD ["yarn", "dev"] 