//Form and form inputs
const form = document.getElementById('dataForm');
const inputEmail = document.getElementById('input-email');
const inputPassword = document.getElementById('input-password');
const inputAge = document.getElementById('input-age');
//Buttons
const boton = document.getElementById('button-form');
const botonGet = document.getElementById('button-get');


boton.addEventListener('click', function (event) {
    event.preventDefault();
    const data = new FormData(form);
    let dataObj = convertFormDataToObj(data);
    let dataObjJSON = JSON.stringify(dataObj);
    //POST
    try {
        fetch(`http://localhost:8080/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: dataObjJSON,
        });
        form.reset();
    } catch (err) {
        console.log(err);
    }
});

//GET 
botonGet.addEventListener('click', function () {
    //Cuando yo toco este boton, hago un fetch y le pego al localhost:8080/get
    fetch('http://localhost:8080/get')
        .then(data => {
            return data.json();
        })
        .then(post => {
            console.log(post);
        });
});



function convertFormDataToObj(data) {
    let email = data.get('transactionEmail');
    let password = data.get('transactionPassword');
    let name = data.get('transactionName');
    let surname = data.get('transactionSurname');
    let age = parseInt(data.get('transactionAge'));

    return {
        name,
        surname,
        email,
        age,
        password,
    }
};
