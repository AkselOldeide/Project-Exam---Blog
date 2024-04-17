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
            <h2>${data.title}</h2>
            <p>${data.body}</p>
            <p>Tag: ${data.tag}</p>
            ${data.media ? `<img src="${data.media.url}" alt="${data.media.alt}">` : ''}
            <p>Author: ${data.author.name}</p>
        `;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
