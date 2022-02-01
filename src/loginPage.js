const loginForm = document.getElementById('login');

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const room = e.target.elements.chatrooms.value;
});