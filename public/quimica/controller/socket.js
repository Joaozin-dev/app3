import Socket from '/quimica/js/socket.js';
const socket = new Socket('http://localhost:3000').connect();

export default socket;