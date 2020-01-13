const routes = require("express").Router();
const sql = require("./connec-sql.js");

const UserController = require("./Controller/UserController");
const HistoricController = require("./Controller/HistoricController");
const GameController = require("./Controller/GameController");

const { UserInSession , UserNotSession } = require("./Middleware/UserMiddle");

routes.get("/", (req, res) => {
  res.render("index.html");
});

routes.get("/screen", (req, res) => {
  res.render("screen.html");
});

routes.get("/privacidade",(req,res)=>{
  res.send("TUDO SEU, MEU")
})

routes.get("/game/info/:id",UserNotSession,GameController.show);

routes.get("/mobile",UserNotSession, (req, res) => {
  res.render("controller.html", {
    fb: req.session.fb,
    name: req.session.name,
    photo: req.session.picture,
    cash: req.session.cash
  });
});

routes.get("/login", UserInSession, (req, res) => {
  res.render("pages/login.html");
});

routes.get("/historic", UserNotSession, (req, res) => {
  res.render("pages/historic.html");
});

routes.post("/user/creator", UserController.store);

routes.get("/user/find/:id",UserController.show);

routes.get("/user/historic/:id",HistoricController.show);

routes.get("/user/cancel",(req,res)=>{
  req.session.destroy(function(err) {
     if(err) console.log(err);
     res.send('cancel...');
  })
})

routes.get("/game/list",GameController.index);

routes.get("/game",(req,res)=>{
  
});

module.exports = routes;
