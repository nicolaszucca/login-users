const logout = document.getElementById('btn-logout');


logout.addEventListener('click', () => {
    fetch('http://localhost:8080/users/logout')
    window.location = 'http://localhost:8080/users'
})