const routes = require("express").Router();

const UserController = require("./Controller/UserController");
const sql = require("./connec-sql.js");

const { UserInSession } = require("./Middleware/UserMiddle");

routes.get("/", (req, res) => {
  res.render("screen.html");
});
// routes.post('/validate',UserController.show);

routes.get("/mobile", (req, res) => {
  res.render("controller.html", {
    user: req.session.user,
    name: req.session.name,
    photo: req.session.photo
  });
});

routes.get("/login", UserInSession, (req, res) => {
  res.render("pages/login.html");
});

routes.get("/user/creator", UserController.store);

// routes.get('/login/:uid',UserController.show);

module.exports = routes;
