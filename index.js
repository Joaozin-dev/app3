const express = require("express");
const path = require("path");
const fs = require("fs");

const cors = require("cors");
const helmet = require("helmet");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");

const routes = require("./routes");
const session = require("express-session");

app.use(helmet());
app.set("trust proxy", 1);
app.use(
  session({
    secret: "s3Cur3",
    name: "sessionId"
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "Views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(cors('https://airgames.tk'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.use("/quimica/:file", (req, res, next) => {
  res.render("quimica/" + req.params.file);
});

const CM = require("./Model/ConnectionModel");

io.on("connect", socket => {
  socket.on("join", async data => {
    if (data.type === "screen") {
      CM.setConnectionScreen(socket);
    }
  });
  socket.on("new-controller", data => {
    CM.syncConnection(data, socket);
    setTimeout(() => {
      CM.getScreenId(socket);
    }, 3000);
  });
  socket.on("disconnect", () => {
    CM.removeConnection(socket);
  });
  // 	QUANDO A TELA ENVIA PARA O CONTROLE A MENSSAGEM
  socket.on("screen-controller", data => {
    const { device_id, msg } = data;
    socket.to(device_id).emit("controller-screen", msg);
    console.log(
      `Menssagem do screen-controller(${JSON.stringify(
        data.device_id
      )}): ${JSON.stringify(data.msg)}`
    );
  });

  // 	QUANDO O CONTROLE ENVIA PARA A TELA A MENSSAGEM
  socket.on("controller-screen", data => {
    const { device_id, msg } = data;
    socket.to(device_id).emit("screen-controller", msg);
    console.log(
      `Menssagem do controller-screen(${JSON.stringify(
        data.device_id
      )}): ${JSON.stringify(data.msg)}`
    );
  });
  socket.on("getScreen", data => {
    // PEGAR O ID DA TELA
    CM.getScreenId(socket, data);
  });
  socket.on("getController", data => {
    // PEGAR O IDS DOS CONTROLLES
    CM.getControllerId(socket, data);
  });
  // ENVIAR O CÓDIGO DO CONTROLE
  socket.on("game", data => {
    CM.gameAprove(data, socket);
  });
});

server.listen(process.env.PORT, () => {
  console.log("SERVIDOR LIGADO NÁ PORTA", process.env.PORT);
});
