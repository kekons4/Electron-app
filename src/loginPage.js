const loginForm = document.getElementById('login');
const themeElm = document.getElementById('theme');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    // console.log(username);
    try{
        const res = await axios.post('http://localhost:3000/login', {username, password});
        console.log(res);
        document.cookie = `username=${username}`;
        document.location.href = `http://localhost:3000/chat.html?username=${username}&room=General`;
    } catch(err) {
        console.log(err);
    }
});

themeElm.addEventListener('change', (e) => {
    e.preventDefault();
    const theme = e.target.value;
    console.log(theme);
    const styleSheet = document.querySelector('link');
    if(theme === 'dark') {
        styleSheet.href = './darktheme.css';
        document.cookie = `theme=./darktheme.css`;
    }
    else if(theme === 'light') {
        styleSheet.href = './styles.css';
        document.cookie = `theme=./styles.css`;
    }
    else styleSheet.href = './styles.css';
});