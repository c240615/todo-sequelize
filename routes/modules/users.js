const express = require("express");
const router = express.Router();

const passport = require("passport");
const bcrypt = require("bcryptjs");

const db = require("../../models");
const User = db.User;
// 取得登入頁
router.get("/login", (req, res) => {
  res.render("login");
});
// 提交登入表單
//router.post("/login", (req, res) => {});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true,
  })
);
/*
router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    req.flash('login_error', '請填寫所有欄位')
    return res.redirect('/users/login')
  }
  next()
},
passport.authenticate('local', {
  failureRedirect: '/users/login',
  failureFlash: true // 讓沒有密碼時錯誤訊息可以傳出來
}),
(req, res) => {
  res.redirect('/')
})
router.get('/register', (req, res) => {
  res.render('register')
})
*/

// 取得註冊頁
router.get("/register", (req, res) => {
  res.render("register");
});
// 提交註冊頁
router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const errors = [];

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: "所有欄位都是必填!" });
  }
  if (password !== confirmPassword) {
    errors.push({ message: "密碼與確認密碼不符！" });
  }
  if (errors.length) {
    return res.render("register", {
      errors,
      name,
      email,
      password,
      confirmPassword,
    });
  }

  User.findOne({ where: { email } }).then((user) => {
    if (user) {
      errors.push({ message: "此信箱已經註冊過了" });
      return res.render("register", {
        errors,
        name,
        email,
        password,
        confirmPassword,
      });
    }
    return bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) =>
        User.create({
          name,
          email,
          password: hash,
        })
      )
      .then(() => res.redirect("/"))
      .catch((err) => console.log(err));
  });
});
// 登出
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "恭喜!成功登出!");
  res.redirect("/users/login");
});

module.exports = router;
