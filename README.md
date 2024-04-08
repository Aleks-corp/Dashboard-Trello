# ReactApp(boards)

## Run application using docker

If you use docker - run command:

```
 docker-compose up --build
```

This command create postgres-bd, backend and frontend.

## Installation by clone repository

If you clone this repositiry - run this command:

```
 yarn
```

## Running application

### # config env file for backend

```
ENV POSTGRES_HOST=localhost
ENV POSTGRES_PORT=5432
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=board_bd
```

### # config env file for frontend

```
ENV BASE_URL=http://localhost:3000
```

### # Then run backend

```
 yarn server
```

### # And run frontend

```
 yarn dev
```
