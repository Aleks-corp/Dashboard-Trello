# ReactApp(Dashboard-Trello)

### More information

[Backend Readme](./backend/README.md)

[Frontend Readme](./frontend/README.md)

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
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=board_bd
```

### # config env file for frontend

```
VITE_BASE_URL=http://localhost:3030
```

### # Then run backend

```
 yarn server
```

### # And run frontend

```
 yarn dev
```
