const emailValue = document.getElementById("mail-field");
const usernameValue = document.getElementById("username-field");
const passwordValue = document.getElementById("password-field");
const submitButton = document.getElementById("submit-button");
const apiURL = "https://v2.api.noroff.dev/auth/create";

submitButton.onclick = function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    let postData = {
        email: emailValue.value,
        username: usernameValue.value,
        password: passwordValue.value 
    };

    fetch(apiURL, {
        method: "POST",
        body: JSON.stringify(postData)
    })
    .then(response => {
        console.log(postData);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
        console.error('Response status:', error.response.status);
        console.error('Response text:', error.response.statusText);
    });
    };
