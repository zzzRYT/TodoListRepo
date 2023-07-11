"use strict";

const express = require('express');
const router = express.Router();

const ctrl = require('./home.ctrl');

router.get("/todolist", ctrl.output.todolist); //ejs랜더
router.get("/loadtodo", ctrl.process.loadtodo); //db데이터 로드

router.post("/todolist", ctrl.process.todolist); //데이터 추가

router.patch("/checkTodo", ctrl.process.checktodo); //수정
router.patch("/reviseTodo", ctrl.process.revisetodo);

router.delete("/deleteTodo", ctrl.process.deltodo); //삭제


module.exports = router;