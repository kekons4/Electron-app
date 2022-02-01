const chatForm = document.getElementById('chatForm');
const conversation = document.querySelector('#conversation');
const roomName = document.getElementById('room-name');
const usersElm = document.getElementById('users');

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

const socket = io('http://localhost:3000');

// let room = 'Kreiosia';
// let username = 'Melvin';
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({roomy, users}) => {
    outputRoomName(roomy);
    outputUsers(users);
});

// Messages recieved from server
socket.on('message', msg => {
    outputMessage(msg);

    // Scroll down
    conversation.scrollTop = conversation.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Grabbing the text from the form on client side
    const msg = e.target.elements.msg.value;

    // Emitting message to server
    socket.emit('chatMessage', msg);

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

// Output messages from DOM
function outputMessage(msg) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p>${msg.username} <span>${msg.time}</span></p>
    <p>
        ${msg.txt}
    </p>
    `;
    document.querySelector('#conversation').appendChild(div);
}

// Add room Name to DOM
function outputRoomName(roomy) {
    roomName.innerText = roomy;
}

// Add users to DOM list
function outputUsers(users) {
    usersElm.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}