const HistoricModel = require('../Model/HistoricModel');
module.exports = {
  async show(req,res){
    const userID = req.params.id;
    const 
    HistoricModel.findAll({
      attributes: ['usuarios_user_id','games_game_id']
    }).then((query)=>{
      axios.get('/user/find/'+query.usuarios_user_id).then((result)=>{
        response
      })
    })
  }
}