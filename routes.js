const routes = require("express").Router();

const UserController = require("./Controller/UserController");
const sql = require("./connec-sql.js");

const { UserInSession } = require("./Middleware/UserMiddle");

routes.get("/", (req, res) => {
  res.render("screen.html");
});
// routes.post('/validate',UserController.show);

routes.get("/mobile",UserInSession, (req, res) => {
  res.render("controller.html", {
    fb: req.session.fb,
    name: req.session.email,
    photo: req.session.picture
  });
});

routes.get("/login", (req, res) => {
  res.render("pages/login.html");
});

routes.post("/user/creator", UserController.store);

// routes.get('/login/:uid',UserController.show);

module.exports = routes;
