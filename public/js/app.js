console.log('client side JS has been loaded');

// fetch('http://localhost:3000/weather?address=boston')
//     .then(res => {
//         if (res.status !== 200) {
//             throw new Error(`There was an error with status code ${res.status}`)
//         } else {
//             //console.log(res);
//             console.log(res.json());
//             //return res.json()
//             //console.log(res.blob());
//             //return res.json()
//         }
//     })



fetch('http://localhost:3000/weather?address=boston').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error);
        } else {
            console.log(data.location);
            console.log(data.forecast);
        }
    })
});







const weatherForm = document.getElementById("form")
const searchElement = document.querySelector('input')
const messageOne = document.getElementById('message-one')
const messageTwo = document.getElementById('message-two')

messageOne.textContent = "waiting for your input"
weatherForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const location = searchElement.value;
    messageOne.textContent = "Loading...";
    messageTwo.textContent = '';
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.TextContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    });
})