const submit = document.getElementById("submit-button");
const formData = document.getElementById("admin-blog-post");
const apiURL = "https://v2.api.noroff.dev/blog/posts/Aksel_Oldeide";
const bearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWtzZWxfT2xkZWlkZSIsImVtYWlsIjoiYWtzaGVsODc3MDdAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3MTMyNjc5MTB9.TsBdlfVTqtVHp8ekmGGf1WP1kYm0pokKGLM9fdVcEMg";

function getQueryParamValue(parameter) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
}

function fetchBlogPostData(postID) {
    const dynamicApiURL = `${apiURL}/${postID}`;
    fetch(dynamicApiURL, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${bearerToken}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const getData = data.data
        document.getElementById("title").value = getData.title || "";
        document.getElementById("body").value = getData.body || "";
        document.getElementById("tag").value = (getData.tags && getData.tags.length > 0) ? getData.tags[0] : "";
        document.getElementById("image").value = (getData.media && getData.media.url) ? getData.media.url : "";
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

submit.onclick = function postContent(event) {
    event.preventDefault();

    const titleData = document.getElementById("title").value;
    const bodyData = document.getElementById("body").value.trim();
    const tagData = document.getElementById("tag").value.trim();
    const imageData = document.getElementById("image").value.trim();

    // Check if imageData is not empty before validating URL
    if (imageData !== "") {
        // Check URL validity
        if (!isValidUrl(imageData)) {
            window.alert("Please enter a valid URL or leave the field blank for no image");
            return;
        }
    }

    const postData = {
        title: titleData
    };

    if (bodyData !== "") {
        postData.body = bodyData;
    }

    if (tagData !== "") {
        postData.tags = [tagData];
    }

    if (isValidUrl(imageData)) {
        postData.media = {
            url: imageData
        };
    }

    const postID = getQueryParamValue("ID");
    if (!postID) {
        console.error("Post ID not found in URL");
        return;
    }
    
    const dynamicApiURL = `${apiURL}/${postID}`;
    fetch(dynamicApiURL, {
        method: "PUT",
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
        window.alert("Post updated successfully!");
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

const postID = getQueryParamValue("ID");
if (postID) {
    fetchBlogPostData(postID);
} else {
    console.error("Post ID not found in URL");
}
