# ReactApp(boards)

## Run application using docker

```
$ docker-compose up --build
```

## Installation

```
$ yarn
```

## Running application

### # config env file

```
ENV POSTGRES_HOST=localhost
ENV POSTGRES_PORT=5432
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=board_bd
```

### # run frontend

```
$ yarn dev
```

### # run backend

```
$ yarn server
```

### # run both(frontend + backend)

```
$ yarn start:dev
```
