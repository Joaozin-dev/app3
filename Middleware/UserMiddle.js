module.exports = {
  UserNotSession(req, res, next) {
    if (req.session.fb) {
      next();
    } else {
      res.redirect("/login");
    }
  },
  UserInSession(req,res,next){
    if(req.session.fb){
      res.redirect("/mobile");
    } else {
      next();
    }
  }
};
