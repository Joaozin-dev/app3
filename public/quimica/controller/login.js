var firebaseConfig = {
	apiKey: "AIzaSyC2drfbLMlgc3id4RfAecGonEGbZ-4GYuA",
	authDomain: "utopian-datum-242716.firebaseapp.com",
	databaseURL: "https://utopian-datum-242716.firebaseio.com",
	projectId: "utopian-datum-242716",
	storageBucket: "utopian-datum-242716.appspot.com",
	messagingSenderId: "915566538882",
	appId: "1:915566538882:web:cea3ba25465057f4fec49b",
	measurementId: "G-H7BTBPXS7E"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function addUser(){
    const password = document.getElementById('password').value;
    const picture = profile.getImageUrl();
    const email = profile.getEmail();
    const name = profile.getName();
    axios.post('login/register',{name,email,picture,password})
    .then((result)=>{
        console.log(result);
        if(result.data.error !== 'auth/email-already-exists') {
            localStorage.setItem('user',JSON.stringify(result.data));
        } else {
            validateUser(email,password);
        }
    });
}

function validateUser(email,password){
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(async(result)=>{
        const token = firebase.auth().currentUser.uid
        axios.post('/validate',{token}).then((returns)=>{
            console.log(returns.ok);
            if(returns.data.ok){
                window.location='/mobile';
            }
        });
    })
    .catch((err)=>{
        if(err.code === 'auth/wrong-password'){
            alert(`WRONG PASSWORD TRY AGAIN`);
        }
    });
}

document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault();
    addUser();
});