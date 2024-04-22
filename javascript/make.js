const submit = document.getElementById("submit-button");
const formData = document.getElementById("admin-blog-post");
const apiURL = "https://v2.api.noroff.dev/blog/posts/Aksel_Oldeide";

function checkUserValidity(){
    const sessionToken = sessionStorage.getItem("session-key")
    if (sessionToken == "" || sessionToken == undefined || sessionToken == NaN){
        window.alert(`no access`);
        window.location.href = "/account/login.html"
    }
    return sessionToken
}
const bearerToken = checkUserValidity();

submit.onclick = function postContent(event) {
    event.preventDefault();

    const titleData = document.getElementById("title").value;
    const bodyData = document.getElementById("body").value;
    const tagData = document.getElementById("tag").value;
    const imageData = document.getElementById("image").value.trim(); // Trim the value to remove leading and trailing whitespaces

    const postData = {
        title: titleData
    };

    if (bodyData.trim() !== "") {
        postData.body = bodyData;
    }

    if (tagData.trim() !== "") {
        postData.tags = [tagData];
    }

    if (imageData !== "") {
        if (!isValidUrl(imageData)) {
            window.alert("Please enter a valid URL or leave the field blank");
            return;
        }

        postData.media = {
            url: imageData
        };
    }

    fetch(apiURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${bearerToken}`
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
        console.log('Success:', data);
        window.alert(`Blogpost ID ${data.id} created successfully`);
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}
