function deletePost(blogName, postId) {
    const deleteUrl = `https://v2.api.noroff.dev/blog/posts/${blogName}/${postId}`;
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWtzZWxfT2xkZWlkZSIsImVtYWlsIjoiYWtzaGVsODc3MDdAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3MTMyNjc5MTB9.TsBdlfVTqtVHp8ekmGGf1WP1kYm0pokKGLM9fdVcEMg"; // Replace "YOUR_BEARER_TOKEN" with your actual bearer token
    
    fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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

function append(data) {
    data.data.forEach((post) => {
        const container = document.createElement("div");
        container.classList.add("blog-post")
        container.innerHTML = `
            <div>
                <button class="modify-btn" data-post-id="${post.id}">Modify</button>
                <button class="delete-btn" data-post-id="${post.id}">Delete</button>
            </div>
            <h2>${post.title}</h2>
            ${post.body ? `<p>${post.body}</p>` : ''}
            ${post.tag ? `<p>Tag: ${post.tag}</p>` : ''}
            ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt}">` : ''}
            <p>Author: ${post.author.name}</p>
            <a href="/blog-post.html?ID=${post.id}">Click to read more</a>
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
