const routes = require('express').Router();

const UserController = require('./Controller/UserController');

const {UserInSession} = require('./Middleware/UserMiddle');


routes.get('/',(req,res)=>{
    res.render('screen.html');
});
routes.post('/validate',UserController.show);

routes.get('/mobile',UserInSession,(req,res)=>{
	res.render('controller.html',{
		user: req.session.user,
		name:req.session.name,
		photo:req.session.photo
	});
});

routes.get('/login',(req,res)=>{
	res.render('pages/login.html');
});

routes.post('/login/register',UserController.store);

// routes.get('/login/:uid',UserController.show);

module.exports = routes;