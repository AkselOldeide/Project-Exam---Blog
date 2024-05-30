document.addEventListener("DOMContentLoaded", function() {

    const submit = document.getElementById("submit-button");
    const apiURL = "https://v2.api.noroff.dev/blog/posts/Aksel_Oldeide";

  
    //################ Bearer token check ################

    function checkUserValidity() {
        const sessionToken = sessionStorage.getItem("session-key");
        if (!sessionToken) {
            alert("No access");
            window.location.href = "/account/login.html";
            return null;
        }
        return sessionToken;
    }

    const bearerToken = checkUserValidity();
    if (!bearerToken) return;

    //################ Update "characters left"-counter ################

    function updateCharCount() {
        const wordCount = document.getElementById("char-counter")
        const text = document.getElementById('body').value;
        wordCount.textContent = `Characters left: ${2000 - text.length}`

        if (text.length == 2000){
            wordCount.style.color = "red"
            wordCount.textContent = "You have reached the maximum number of characters"

        }
        else if (text.length > 1800){
            wordCount.style.color = "orange"
        }
        else if (text.length > 1500){
            wordCount.style.color = "yellow"
        }
        else if (text.length <= 1500){
            wordCount.style.color = ""
        }
    }
     
    document.getElementById('body').addEventListener('input', updateCharCount);

    //################ Expand textarea while accoding to calue length ################

    function adjustTextareaHeight(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    document.getElementById("body").addEventListener("input", function() {
        adjustTextareaHeight(this);
    });
    const bodyTextarea = document.getElementById("body");
    adjustTextareaHeight(bodyTextarea);

    //################ Form submission ################

    submit.onclick = function postContent(event) {
        event.preventDefault();
    
        const titleData = document.getElementById("title").value.trim();
        const bodyData = document.getElementById("body").value.trim();
        const tagData = document.getElementById("tag").value.trim();
        const imageData = document.getElementById("image").value.trim();
        const altData = document.getElementById("alt").value.trim();
    
        if (!titleData || !bodyData || !tagData || !imageData) {
            alert("All fields are required.");
            return;
        }
    
        function isValidUrl(url) {
            try {
                new URL(url);
                return true;
            } catch (error) {
                return false;
            }
        }
    
        if (imageData.length > 0 && !isValidUrl(imageData)) {
            alert("Please enter a valid image URL.");
            return;
        }
    
        const postData = {
            title: titleData,
            body: bodyData,
            tags: [tagData],
            media: isValidUrl(imageData) ? { url: imageData, alt:altData} : undefined
        };
    
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
            alert(`Blogpost ID ${data.data.id} created successfully`);
            window.location.href = "/post/entries.html"
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    //################ Image preview module ################

    const imgPreview = document.getElementById("image-preview")
    document.getElementById('image').addEventListener('input', loadPreview);
    function loadPreview(){
        let imageURL = document.getElementById("image")
   
        if (imageURL.value.length > 12) {
            imgPreview.innerHTML = `
                <label>Image preview:</label>
                <img id="preview-image" src="${imageURL.value}" alt="Preview image">    
            `;
        } else {
            imgPreview.innerHTML = '';
        }
    }

});

// ############## Log out #################
const logoutButtons = document.querySelectorAll(".log-out-button");

logoutButtons.forEach(button => {
    button.addEventListener("click", function logout() {
        sessionStorage.removeItem("session-key");
        window.location.href = "/account/login.html";
    });
});