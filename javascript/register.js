const apiLink = "https://v2.api.noroff.dev/auth/register";
const mailField = document.getElementById("email-field");
const usernameField = document.getElementById("username-field");
const passwordField = document.getElementById("password-field");
const registerBtn = document.getElementById("submit-button");

registerBtn.onclick = function register() {
    const mailValue = mailField.value;
    const passwordValue = passwordField.value;
    const usernameValue = usernameField.value;

    const postData = {  
        name: usernameValue,
        email: mailValue,
        password: passwordValue
    };

    console.log(JSON.stringify(postData));

    fetch(apiLink, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)  
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 400) {
                return response.json().then(data => {
                    if (data.statusCode === 400 && data.errors && data.errors.length > 0) {
                        window.alert(data.errors[0].message);
                    } else {
                        console.log(data);
                    }
                });
            } else {
                throw new Error('Network response was not ok');
            }
        }
        return response.json();
    })
    .then(data => {
        if (data && data.data && data.data.email === mailValue) {
            window.alert(`User: ${data.data.name} (${data.data.email}) created`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

