const express = require('express')
const app = express();
const pool = require("./db") //this is the dbconfig file basically

app.use(express.json()) //gives access to req.body with JSON data

//ROUTES

//get all todo's
app.get('/todos', async (req, res) => {
    try{
        const allToDos = await pool.query("SELECT * FROM todo");
        res.json(allToDos.rows);
    } catch (err) {
        console.error(message);
    }
})

//get a todo

app.get('/todos/:id', async (req,res) => {
    const {id} = req.params;
    try{
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(message)
    }
});

//create a todo
app.post("/todos", async(req, res) => {
    try{
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]) //$1 is essentially a variable used to describe what the description is, only use returning star when doing updates and deletes
        res.json(newTodo.rows[0]);
        console.log(req.body);
    } catch (err) {
      console.error(message);  
    } 
})
//update a todo
app.put("/todos/:id", async (req, res) => {
    try{
        const {id} = req.params; //what we want WHERE
        const {description} = req.body; //what we want to change SET
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("Todo was updated") 
    } catch (err) {
        console.error(message)
    }
})
//delete a todo
app.delete("/todos/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
        res.json("Todo deleted successfully")
    } catch (err) {
        console.log(err.message)
    }
})

app.listen(8000, () => {
    console.log("Server is listening on port 8000")
})

