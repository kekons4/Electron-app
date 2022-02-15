const loginForm = document.getElementById('login');
const themeElm = document.getElementById('theme');

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    console.log(username);
});

themeElm.addEventListener('change', (e) => {
    e.preventDefault();
    const theme = e.target.value;
    console.log(theme);
    const styleSheet = document.querySelector('link');
    if(theme === 'dark') styleSheet.href = './darktheme.css';
    else if(theme === 'light') styleSheet.href = './styles.css';
    else styleSheet.href = './styles.css';
});