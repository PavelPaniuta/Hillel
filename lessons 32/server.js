import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import TodoModel from './src/mongo/todo.mondel.js';

const app = express();
const PORT = 8080;

const URI = "mongodb+srv://hillel:hillel@cluster0.ichus.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(URI)
    .then(() => console.log('MongoDB connected!'))
    .catch((error) => console.log('Error connecting to MongoDB:', error));

app.use(cors());
app.use(express.json());

app.get('/todos', (req, res) => {
    TodoModel.find()
        .then(todos => res.send(todos))
        .catch(error => res.status(500).send({ message: error.message }));
});

app.post('/todos', (req, res) => {
    const todo = new TodoModel(req.body);
    todo.save()
        .then(newTodo => res.send(newTodo))
        .catch(error => res.status(500).send({ message: error.message }));
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    TodoModel.deleteOne({ _id: id })
        .then(response => {
            if (response.deletedCount === 0) {
                res.status(404).send({ message: 'Todo not found' });
            } else {
                res.send({ message: 'Todo deleted successfully' });
            }
        })
        .catch(error => res.status(500).send({ message: error.message }));
});

app.put('/todos/:id', async (req, res) => {
    try {
        const updatedTodo = await TodoModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // Возвращаем обновленную задачу
        );
        if (!updatedTodo) {
            return res.status(404).send({ message: 'Todo not found' });
        }
        res.send(updatedTodo);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

app.delete('/todos', async (req, res) => {
    try {
        await TodoModel.deleteMany({});
        res.send({ message: 'All todos deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});