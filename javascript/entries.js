function checkUserValidity(){
    const sessionToken = sessionStorage.getItem("session-key")
    if (sessionToken == "" || sessionToken == undefined || sessionToken == NaN){
        window.alert(`no access`);
        window.location.href = "/account/login.html"
    }
    return sessionToken
}
const bearerToken = checkUserValidity();


function deletePost(blogName, postId) {
    const deleteUrl = `https://v2.api.noroff.dev/blog/posts/${blogName}/${postId}`;
    
    fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
        },
    })
    .then(response => {
        if (response.ok) {
            console.log('Post deleted successfully');
            window.alert("Post deleted successfully!");
            location.reload();
        } else {
            console.error('Error deleting post:', response.status);
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        console.error('Error deleting post:', error);
    });
}


document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('delete-btn')) {
        const postId = event.target.dataset.postId;
        const blogName = "Aksel_Oldeide";
        const confirmation = window.confirm("Are you sure you want to delete this entry?");
        if (confirmation) {
            deletePost(blogName, postId);
        }
    }
});

document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('modify-btn')) {
        const postId = event.target.dataset.postId;
        window.location.href = `edit.html?ID=${postId}`;
    }
});

// ########################## Append data from fetch GET #####################

function append(data) {
    data.data.forEach((post) => {
        console.log(JSON.stringify(post.tags))
        const createdDate = post.created.slice(0, 10)
        const createdTime = post.created.slice(11, 19)
        const editedDate = post.updated.slice(0, 10)
        const editedTime = post.updated.slice(11, 19)
    
        const container = document.createElement("div");
        container.classList.add("blog-post")
        container.innerHTML = `
            <div class=date>
                <p>Created: ${createdDate} (${createdTime})</p>
                <p>Last edit: ${editedDate} (${editedTime})</p>
            </div>
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <p>Tag: ${((JSON.stringify(post.tags)).slice(2)).slice(0, -2)}</p>
            <img src="${post.media.url || ""}">
            <p>Author: ${post.author.name}</p>
            <a href="/blog-post.html?ID=${post.id}">Click to read more</a>
            <div class="button-container">
                <button class="modify-btn red-button" data-post-id="${post.id}">Modify</button>
                <button class="delete-btn red-button" data-post-id="${post.id}">Delete</button>
            </div>
        `;
        content.appendChild(container);
    });
}




const blogPage = "https://v2.api.noroff.dev/blog/posts/Aksel_Oldeide";
const content = document.getElementById("display-blog");

fetch(blogPage)
    .then((response) => response.json())
    .then((data) => append(data))
    .catch((error) => {
        console.error('Error fetching data:', error);
        const div = document.createElement("div");
        div.textContent = "Error fetching data.";
        content.appendChild(div);
    });
