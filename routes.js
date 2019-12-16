const routes = require('express').Router();

routes.get('/',(req,res)=>{
    res.render('quimica/screen.html');
})

routes.get('/mobile',(req,res)=>{
	res.render('quimica/controller.html');
})


module.exports = routes;