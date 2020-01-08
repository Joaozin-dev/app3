const firebase = require('../config/firebase');
function listAllUsers(nextPageToken) {
// List batch of users, 1000 at a time.
	firebase.auth().listUsers(1000, nextPageToken)
	.then(function(listUsersResult) {
		listUsersResult.users.forEach(function(userRecord) {
			console.log('user', userRecord.toJSON());
		});
		if (listUsersResult.pageToken) {
			// List next batch of users.
			listAllUsers(listUsersResult.pageToken);
		}
	})
	.catch(function(error) {
		console.log('Error listing users:', error);
	});
}
module.exports = {
	store(req,res){
		const { email,picture,name,password} = req.body;
		firebase.auth().createUser({
			email,
			emailVerified:false,
			password,
			photoURL:picture,
			disabled:false,
			displayName:name
		}).then((result)=>{
			const {uid} = result;
			res.json({uid,email});
		}).catch((err)=>{
			if(err.code === 'auth/email-already-exists'){
				res.json({create:false,error:err.code,message:'Usuario já existe'})
			}
		});
	},
	show(req,res){
		var token = req.body.token;
		if(token){
			firebase.auth().getUser(token).then((result)=>{
				req.session.user = result.uid;
				req.session.name = result.displayName;
				req.session.photo = result.photoURL;
				res.json({ok:true});
			})
		}
	}
}