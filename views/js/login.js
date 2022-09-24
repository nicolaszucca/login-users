const form = document.getElementById('dataForm');
const inputEmail = document.getElementById('input-email');
const inputPassword = document.getElementById('input-password');
const pResponse = document.getElementById('errors');



form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const data = new FormData(form);
    let dataObj = convertFormDataToObj(data);
    let dataObjJSON = JSON.stringify(dataObj);
    try {
        const res = await fetch(`http://localhost:8080/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: dataObjJSON,
        });

        const user = await res.json();
        console.log(user)
        controllerErrors(user);


    } catch (err) {
        console.log(err);
    }
});

function convertFormDataToObj(data) {
    let email = data.get('transactionEmail');
    let password = data.get('transactionPassword');

    return {
        email,
        password,
    };
};

function controllerErrors(user) {
    if (user.errors) {
        pResponse.innerText = user.errors[0].msg;
    } else if (!user.errors) {
        form.reset();
        pResponse.innerText = 'Loading...';
        setTimeout(function () {
            window.location = 'http://localhost:8080/users/home'
        }, 1000);
    };
};