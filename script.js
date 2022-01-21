'use strict';

const sendData = ({ url, data = {} }) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(response => response.json())
        .then(data => console.log('serverMessage:', data))
        .catch(error => console.log(error));
};

const getData = () => {
    fetch('db.json')
        .then(response => {
            return response.json();
        }).then(data => {
            sendData({
                url: 'https://jsonplaceholder.typicode.com/posts/',
                data: data
            });
        })
        .catch(error => {
            console.error(error);
        });
};

getData();