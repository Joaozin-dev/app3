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
        res.json({
          msg: 'user success add',
          code: 4
        });
        req.session.fb = query.id;
        req.session.email = query.email;
        req.session.picture = query.picture.data.url;
        req.session.name = query.name;
        req.session.save((err)=>{
          if(err) console.log(err);
        })
      })
      .catch(err => {
        console.log("Nao foi possivel inserir esse malandro.");
        console.log(err);
        res.json({
          error: { msg: "Nao foi possivel inserir esse usuario", code: 1 }
        });
      });
  },
  async show(req,res){
    return UserModel.findAll({
      attributes: ['facebook_id','user_nome','user_email','user_picture']
    }).then((query)=>{
      const users = JSON.parse(JSON.stringify(query));
      if(users.length > 0){
        for(var i = 0; i < users.length; i++){
          console.log(users[i].facebook_id);
          if(users[i].facebook_id === req.params.id){
            req.session.fb = users[i].facebook_id;
            req.session.email = users[i].user_email;
            req.session.picture = users[i].user_picture;
            req.session.name = users[i].user_name;
            
            res.send()
          } else {
            res.json({
              msg: 'user not found',
              code: 2
            })
          }
        } 
      } else {
       res.json({
          msg: 'user not found',
          code: 2
        });
      }
    })
  }
};
