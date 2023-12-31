module.exports = {
  authenticator: (req, res, next) => {    
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("warning_msg", "請完成登入");
    res.redirect("/users/login");
  },
};
