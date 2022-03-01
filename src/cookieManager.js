let cookie = document.cookie;

function setCookie(cname, cvalue, exdays) {
    cookie = `${cname} = ${cvalue}; path=/`;
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
      user = prompt("Please enter your name:", "");
      if (user != "" && user != null) {
        setCookie("username", user, 365);
      }
    }
  }

  function setTheme() {
    const styleSheet = document.querySelector('link');
    const themeElm = document.getElementById('theme');

    const theme = getCookie('theme');
    styleSheet.href = theme;

    if(theme === './darktheme.css') themeElm.value = 'dark';
    else if(theme === './styles.css') themeElm.value = 'light';
  }

  setTheme();