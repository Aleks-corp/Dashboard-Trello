[Back](../README.md)

<div style="display: flex; justify-content: center;">
  <img src="./assets/logo-node-js.svg" width="100" alt="Node Logo" />                   
  <img style="margin-left: 30px" src="./assets/logo-nest.svg" width="60" alt="Nest Logo" />  
</div>

  <p align="center">For building Dashboard App backend use <strong>Node.js</strong>, <strong>Nest.js</strong>, <strong>TypeORM</strong> and <strong>PostgreSQL</strong>.</p>

## Description

Dashboard App backend have 4 entities (Board, List, Task and Action Log). For each there is a controller with the requests to find, create, update, delete in postgresql database.

- GET /boards - will return an array of boards</br>
- GET /boards:id - selected board with nested lists and tasks</br>
- POST /boards - create new board</br>
- PATCH /boards:id - edit board name</br>
- DELETE /boards:id - delete board by id</br>
  </br>
- POST /lists - create new list</br>
- PATCH /lists:id - edit list name</br>
- DELETE /lists:id - delete list by id</br>
  </br>
- GET /tasks:id - selected tasks by id</br>
- POST /tasks - create new task</br>
- PATCH /tasks:id - edit task</br>
- DELETE /tasks:id - delete task by id</br>
