"use strict";

const TodolistStorage = require('./TodolistStorage');

class Todo {
    constructor(body) {
        this.body = body;
    }

    //db데이터 로드
    async loadtodo() {
        const {load} = await this.body;
        return TodolistStorage.loadTodo(load);
    }

    //체크박스 동작시
    async checktodo() {
        const {id, is_check} = await this.body;
        return TodolistStorage.reviseTodo(parseInt(id), is_check);
    }

    async revisetodo() {
        const {id, description} = await this.body;
        return TodolistStorage.editTodo(id ,description);
    }

    async deltodo() {
        const {id} = await this.body;
        return TodolistStorage.deleteTodo(id);
    }

    //todo생성시
    async todolist() {
        const {id, description} = await this.body;
        return TodolistStorage.plusTodo(id ,description);
    }
}

module.exports = Todo;