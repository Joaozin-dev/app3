const HistoricModel = require('../Model/HistoricModel');
module.exports = {
  async show(req,res){
    const userID = req.params.id;
    var response = {};
    HistoricModel.findAll({
      attributes: ['usuarios_user_id','games_game_id']
    }).then((query)=>{
      const users = JSON.parse(JSON.stringify(query));
      users.forEach(item=>{
        if(item.user_id === userID){
          axios.get('/user/find/'+query.usuarios_user_id).then((result)=>{
            response = {...response,user:result.data};
          });
          axios.get('/game/info/'+query.usuarios_user_id).then((result)=>{
            response = {...response,game:result.data};
          })
        } else {
          response = {
            msg: "user not found",
            code: 2
          };
        }
      })
    })
    res.json(response);
  }
}