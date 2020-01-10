const routes = require("express").Router();
const sql = require("./connec-sql.js");

const UserController = require("./Controller/UserController");
const GameController = require("./Controller/GameController");

const { UserInSession , UserNotSession } = require("./Middleware/UserMiddle");

routes.get("/", (req, res) => {
  res.render("screen.html");
});
// routes.post('/validate',UserController.show);

routes.get("/privacidade",(req,res)=>{
  res.send("TUDO SEU, MEU")
})

routes.get("/game/info",(req,res)=>{
  res.render("pages/info.html")
})

routes.get("/mobile",UserNotSession, (req, res) => {
  res.render("controller.html", {
    fb: req.session.fb,
    name: req.session.email,
    photo: req.session.picture,
    cash: req.session.cash
  });
});

routes.get("/login", UserInSession, (req, res) => {
  res.render("pages/login.html");
});

routes.post("/user/creator", UserController.store);

routes.get("/user/find/:id",UserController.show);

routes.get("/user/cancel",(req,res)=>{
  req.session.destroy(function(err) {
     if(err) console.log(err);
     res.send('cancel...');
  })
})

routes.get("/game/list",GameController.index);

module.exports = routes;
