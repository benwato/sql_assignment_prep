CREATE DATABASE todo_database;

--\c into todo_database

CREATE TABLE todo(
    todo_id serial PRIMARY KEY,
    description VARCHAR(255)
);