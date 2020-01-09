const UserModel = require("../Model/UserModel");
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
module.exports = {
  async store(req, res) {
    const user_senha = uuidv4();
    const query = req.body;
    return UserModel.create({
      user_email: query.email,
      user_senha,
      user_nome: query.name,
      user_picture: query.picture.data.url,
      facebook_id: query.id
    })
      .then(() => {
        console.log("Individuo adicionado com sucesso.");
        res.send("Individuo adicionado com sucesso.");
        (req.session.fb = facebook_id),
          (req.session.email = user_email),
          (req.session.picture = user_picture);
      })
      .catch(err => {
        console.log("Nao foi possivel inserir esse malandro.");
        console.log(err);
        res.json({
          error: { msg: "Nao foi possivel inserir esse usuario", code: 001 }
        });
      });
  }
};
