document.addEventListener("DOMContentLoaded", function() {
    const submit = document.getElementById("submit-button");
    const apiURL = "https://v2.api.noroff.dev/blog/posts/Aksel_Oldeide";

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

    function getQueryParamValue(parameter) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(parameter);
    }

        //################ Check URL parameter ################

        const postID = getQueryParamValue("ID");
        if (postID) {
            fetchBlogPostData(postID);
        } else {
            console.error("Post ID not found in URL");
        }

    //################ Indicator for character count display ################
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


    //################ Populating the input fields with fetch GET data ################

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
            const getData = data.data;
            document.getElementById("title").value = getData.title || "";
            document.getElementById("body").value = getData.body || "";
            document.getElementById("tag").value = (getData.tags && getData.tags.length > 0) ? getData.tags[0] : "";
            document.getElementById("image").value = (getData.media && getData.media.url) ? getData.media.url : "";
            document.getElementById("alt").value = getData.media.alt || "";

            adjustTextareaHeight(document.getElementById("body"));
            updateCharCount()
            loadPreview()
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    //################ Indicator for character count display ################

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
            media: isValidUrl(imageData) ? { url: imageData, alt: altData} : undefined,
        };
    
        fetch(apiURL+"/"+postID, {
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
            alert(`Blogpost ID ${data.data.id} edited`);
            window.location.href = "/post/entries.html"
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };



    //################ Image preview module ################

    const imgPreview = document.getElementById("image-preview")
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
    document.getElementById('image').addEventListener('input', loadPreview);

    
    //################ Text area sizing ################

    function adjustTextareaHeight(textarea) {
        if (textarea) {
            textarea.style.height = 'auto'; 
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    }
    document.getElementById("body").addEventListener("input", function() {
        adjustTextareaHeight(this);
    });
    
    document.getElementById("body").addEventListener("click", function() {
        adjustTextareaHeight(this);
    });
    document.getElementById("body").addEventListener("click", function() {
        adjustTextareaHeight(this);
    });

    const bodyTextarea = document.getElementById("body");
    adjustTextareaHeight(bodyTextarea);
});

// ############## Log out #################
const logoutButtons = document.querySelectorAll(".log-out-button");

logoutButtons.forEach(button => {
    button.addEventListener("click", function logout() {
        sessionStorage.removeItem("session-key");
        window.location.href = "/account/login.html";
    });
});