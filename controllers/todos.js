const Todo = require('../models/Todo');

module.exports = {
    getTodos: async (req ,res) => {
        console.log(req.user);
        try {
            const todoItems = await Todo.find({ userId: req.user.id });
            const itemsLeft = await Todo.countDocuments({ userId: req.user.id, completed: false });
            res.render('todos.ejs', { todos: todoItems, left: itemsLeft, user: req.user });
        } catch(err) {
            console.log(err)
        }
    }, 
    createTodo: async (req, res) => {
        console.log(req.body);
        console.log(req.user);
        try {
            const posted = await Todo.create({ todo: req.body.todoItem, completed: false, userId: req.user.id });
            console.log('Todo added');
            res.redirect('/todos');
        } catch(err) {
            console.log(err);
        }
    },
}