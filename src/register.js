const registerElm = document.getElementById('register');

registerElm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const first_name = e.target.elements.fName.value;
    const last_name = e.target.elements.lName.value;
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    const cPassword = e.target.elements.cPassword.value;

    try{
        if(password !== cPassword) {
            throw new Error('Passwords do not match, please try again...');
        }
        const res = await axios.post('http://localhost:3000/register', {first_name, last_name, username, password});
        console.log(res);
        // Set the cookie to be the new username
        document.cookie = `username=${username}`;
        document.location.href = `http://localhost:3000/chat.html?username=${username}&room=General`;
    } catch (err) {
        console.error(err);
    }

});