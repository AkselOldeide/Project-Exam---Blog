const apiLink = "https://v2.api.noroff.dev/auth/login"
const mailField = document.getElementById("email-field")
const passwordField = document.getElementById("password-field")
const submitBtn = document.getElementById("submit-button")

submitBtn.onclick = function authorize(){
    const mailValue = mailField.value
    const passwordValue = passwordField.value
    const postData = {
        email: mailValue,
        password: passwordValue
    };
    
    fetch(apiLink, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        window.alert(`user ${data.data.name} logged in`);
        sessionStorage.setItem("session-key", data.data.accessToken);
        window.location.href = "/post/entries.html";
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
