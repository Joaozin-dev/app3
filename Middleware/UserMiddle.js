const firebase = require('../config/firebase');
module.exports ={
	UserInSession(req, res, next){
		if(req.session.fb){
			next();
		} else {
			res.redirect('/login');
		}
	}
}