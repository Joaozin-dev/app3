var admin = require("firebase-admin");

var serviceAccount = require("./firebase-token.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://utopian-datum-242716.firebaseio.com/"
});

module.exports = admin;
