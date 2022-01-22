'use strict';

const sendData = ({ url, data = {} }) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(response => response.json())
        .then(data => console.log('Server-Message-FETCH:', data))
        .catch(error => console.log(error));
};

const getData = () => {
    fetch('db.json')
        .then(response => {
            return response.json();
        }).then(data => {
            sendData({
                url: 'https://jsonplaceholder.typicode.com/posts',
                data: data
            });
        })
        .catch(error => {
            console.error(error);
        });
};

getData();

let xhrGet = new XMLHttpRequest();
let xhrSend = new XMLHttpRequest();
xhrGet.open('GET', './db.json', true);
xhrGet.responseType = 'json';
xhrGet.send();

xhrGet.onload = function () {
    if (xhrGet.status != 200) {
        alert(`Ошибка ${xhrGet.status}: ${xhrGet.statusText}`);
    } else {
        xhrSend.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);
        xhrSend.responseType = 'json';
        xhrSend.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhrSend.send(JSON.stringify(xhrGet.response));
    }
};

// xhrSend.upload.onprogress = function (event) {
//     console.log(`Отправлено XMLHttpRequest: ${event.loaded} из ${event.total}`);
// };

xhrSend.onload = function () {
    console.log("XMLHttpRequest-Server-Message: ", xhrSend.response);
};

