const blogEntry = document.getElementById("blog-entry");

function getQueryParamValue(parameter) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
}

const postId = getQueryParamValue('ID');
const blogPage = "https://v2.api.noroff.dev/blog/posts/Aksel_Oldeide/";

fetch(`${blogPage}${postId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        const data = result.data; 
        blogEntry.innerHTML = `
            <img id="header-image" src="${data.media.url}">
            <h2>${data.title}</h2>
            <p>Author: ${data.author.name}</p>
            <p>${data.body}</p>
            <p>Tag: ${data.tags}</p>
        `;
        document.body.style.backgroundImage = `url(${data.media.url})`;
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        
        // Ensure the content sits above the overlay
        blogEntry.style.position = 'relative';
        blogEntry.style.zIndex = '1';
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
