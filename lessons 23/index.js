const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const port = 8080;
const mongoose = require('mongoose');
const uri = "mongodb+srv://hillel:hillel@cluster0.ichus.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const TodoModel = require('./mongo/todo.mondel');

const connect = mongoose.connect(uri);
connect.then(() => console.log('Connected!'));

app.use(cors());
app.use(express.json())

app.use(express.static(path.join(__dirname, './')));

app.get('/', (req, res) => {
  res.send({ status: 'Hello' });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

app.get('/todos', (req, res) => {
    TodoModel.find().then(
        response => res.send(response)
    )
})

app.post('/todos', (req, res) => {
    const todo = new TodoModel(req.body);
    todo.save().then(
        response => res.send(response)
    )
})

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    TodoModel.deleteOne({ _id: id }).then(
        response => {
            if(response.deleteCount === 0) {
                res.status(404).send({ message: 'Todo were not found'})
            } else {
                res.status(404).send(response)
            }
        }
    )
})

app.put('/todos/:id', (req, res) => {
    const id = req.params.id;
    TodoModel.updateOne({ _id: id }, req.body)
        .then(() => TodoModel.findById(id))
        .then(response => res.status(200).send(response))
})