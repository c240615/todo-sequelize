const express = require("express");
const router = express.Router();

const db = require("../../models");
const Todo = db.Todo;
// 新增頁
router.get("/new", (req, res) => {
  return res.render("new");
});
// 新增資料功能
router.post("/", (req, res) => {
  //不能用 userId
  const UserId = req.user.id;
  const name = req.body.name;

  return Todo.create({ name, UserId })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});
// 特定 id 頁面
router.get("/:id", (req, res) => {
  const UserId = req.user.id;
  const id = req.params.id;

  return Todo.findOne({
    where: { id, UserId },
  })
    .then((todo) => res.render("detail", { todo: todo.toJSON() }))
    .catch((error) => console.log(error));
});
// 特定 id 編輯頁
router.get("/:id/edit", (req, res) => {
  const UserId = req.user.id;
  const id = req.params.id;

  return Todo.findOne({ where: { id, UserId } })
    .then((todo) => res.render("edit", { todo: todo.toJSON() })) // todo.get()
    .catch((error) => console.log(error));
});
// 修改
router.put("/:id", (req, res) => {
  const UserId = req.user.id;
  const id = req.params.id;
  const { name, isDone } = req.body;

  return Todo.findOne({ where: { id, UserId } })
    .then((todo) => {
      todo.name = name;
      // true/false      
      todo.isDone = isDone === "on";
      return todo.save();
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch((error) => console.log(error));
});

router.delete("/:id", (req, res) => {
  const UserId = req.user.id;
  const id = req.params.id;

  return Todo.findOne({ where: { id, UserId } })
  // remove()
    .then((todo) => todo.destroy())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router;
