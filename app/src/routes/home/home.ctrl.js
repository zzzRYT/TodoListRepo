"use strict";

//model을 불러온다.
const Todo = require('../../models/Todo');

const output = {
    todolist: (req, res)=> {
        res.render('home/todolist');
    }
};

const process = {
    todolist: async (req, res) => {
        const todo = new Todo(req.body);
        const response = await todo.todolist();
        return res.json(response);
    },

    loadtodo: async (req, res) => {
        const todo = new Todo(req.body);
        const response = await todo.loadtodo();
        return res.json(response);
    },

    checktodo: async (req, res) => {
        const todo = new Todo(req.body);
        const response = await todo.checktodo();
        return res.json(response);
    },

    revisetodo: async (req, res) => {
        const todo = new Todo(req.body);
        const response = await todo.revisetodo();
        return res.json(response);
    },

    deltodo: async (req, res) => {
        const todo = new Todo(req.body);
        const response = await todo.deltodo();
        return res.json(response);
    },

};

module.exports = {
    output,
    process,
};