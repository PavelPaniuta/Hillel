const { Schema, model } = require('mongoose');

const TodoSchema = Schema({
    text: {
        type: String,
        require: true,
    },
    checked: {
        type: Boolean,
        require: true,
    }
}, { versionKey: false })

module.exports = model('Todos', TodoSchema);