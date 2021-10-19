const {Pool} = require('pg');

//allows to set configuration to what and where we want to connect the database

const pool = new Pool({
    user: "postgres",
    password: "tiggerpooh13",
    database: "todo_database",
    host: "localhost",
    port: 5432

});

module.exports = pool