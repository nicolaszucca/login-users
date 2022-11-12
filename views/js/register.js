//Form and form inputs
const form = document.getElementById('dataForm');
const inputEmail = document.getElementById('input-email');
const inputPassword = document.getElementById('input-password');
const inputAge = document.getElementById('input-age');
//Buttons
const boton = document.getElementById('button-form');
const botonGet = document.getElementById('button-get');
const pResponse = document.getElementById('errors');

let count = 0;


form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const data = new FormData(form);
    let dataObj = convertFormDataToObj(data);
    let dataObjJSON = JSON.stringify(dataObj);
    removeErrors();
    count++;

    //POST
    try {
        const res = await fetch(`http://localhost:8080/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: dataObjJSON,
        });

        const user = await res.json();
        console.log(user)

        controllerErrorsResponse(user, count)

    } catch (err) {
        console.log(err);
    }
});



function convertFormDataToObj(data) {
    let name = data.get('transactionName');
    let surname = data.get('transactionSurname');
    let email = data.get('transactionEmail');
    let age = parseInt(data.get('transactionAge'));
    let password = data.get('transactionPassword');

    return {
        name,
        surname,
        email,
        age,
        password,
    };
};

function createAndShowMsg(user = 0, msg = 0) {
    if (!msg) {
        user.errors.forEach(error => {
            let createPElement = document.createElement("p");
            createPElement.classList.add('data-response');
            createPElement.textContent = error.msg;
            pResponse.appendChild(createPElement);
        });
    } else if (!user) {
        let createPElement = document.createElement("p");
        createPElement.classList.add('data-response');
        createPElement.textContent = msg;
        pResponse.appendChild(createPElement);
    };
};

function removeErrors() {
    let allP = document.querySelectorAll("#errors > .data-response");
    for (let element of allP) element.remove();
};

function controllerErrorsResponse(user, count) {
    if (user.errors && count === 1) {
        count++;
        createAndShowMsg(user);
    } else if (user.errors && count > 1) {
        removeErrors()

        createAndShowMsg(user);
    } else if (!user.errors) {
        count = 0;
        form.reset();
        removeErrors();
        createAndShowMsg(0, 'creado exitosamente!');
        setTimeout(function () {
            window.location = 'http://localhost:8080/home';
        }, 1000);
    };
};