const { findOneAndUpdate } = require('../models/Todo');
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
    deleteTodo: async (req, res) => {
        try {
            const deleteItem = await Todo.deleteOne({ _id: req.body.todoIdFromJSFile });
            console.log('Deleted item from database');
            res.json('Deleted item from database');
        } catch (error) {
            console.log(error);
        }
    }, 
    markComplete: async (req, res) => {
        try {
            const markComplete = await Todo.findOneAndUpdate({ _id: req.body.todoIdFromJSFile }, { completed: true });
            console.log('item marked completed on database');
            res.json('item marked completed');
        } catch(error) {
            console.log(error);
        }
    }, 
    markIncomplete: async (req, res) => {
        console.log(req.body);
        try {
            const markIncomplete = await Todo.findOneAndUpdate({ _id: req.body.todoIdFromJSFile}, { completed: false });
            console.log('item marked incompleted on database');
            res.json('item marked incompleted on database');
        } catch (error) {
            console.log(error);
        }
    }
}