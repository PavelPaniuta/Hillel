import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const TodoSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    checked: {
        type: Boolean,
        required: true,
    },
}, { versionKey: false });

const TodoModel = model('Todos', TodoSchema);

export default TodoModel;
