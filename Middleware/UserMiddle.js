const firebase = require('../config/firebase');
module.exports ={
	UserInSession(req, res, next){
		if(req.session.user){
			next();
		} else {
			res.redirect('/login');
		}
	}
}