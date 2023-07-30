const express = require("express");
const router = express.Router();

//const Todo = require("../../models/todo");
//const User = require("../../models/user");

const db = require("../../models");
const Todo = db.Todo;
/*
router.get("/", (req, res) => {
  const UserId = req.user.id;
  User.findByPk(UserId)
    .then((user) => {      
      return Todo.findAll({
        raw: true,
        nest: true,
        where: { UserId },
      });
    })
    .then((todos) => res.render("index", { todos }))
    .catch((error) => console.error(error));
});*/

router.get('/', (req, res) => {
  const UserId = req.user.id

  return Todo.findAll({
    raw: true,
    nest: true,
    where: { UserId }
  })
    .then(todos => res.render('index', { todos }))
    .catch(err => res.json(err))
})


module.exports = router;
