const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const TodoModel = require('../mongo/todo.mondel');

const app = express();
const PORT = 8080;
const URI = "mongodb+srv://hillel:hillel@cluster0.ichus.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(URI).then(() => console.log('MongoDB connected!'));

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/todos', (req, res) => {
    TodoModel.find().then(todos => res.send(todos));
});

app.post('/todos', (req, res) => {
    const todo = new TodoModel(req.body);
    todo.save().then(newTodo => res.send(newTodo));
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    TodoModel.deleteOne({ _id: id }).then(response => {
        if (response.deletedCount === 0) {
            res.status(404).send({ message: 'Todo not found' });
        } else {
            res.send(response);
        }
    });
});

app.put('/todos/:id', (req, res) => {
    const id = req.params.id;
    TodoModel.updateOne({ _id: id }, req.body)
        .then(() => TodoModel.findById(id))
        .then(updatedTodo => res.send(updatedTodo));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
