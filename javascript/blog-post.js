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
        const createdDate = data.created.slice(0, 10)
        blogEntry.innerHTML = `
            <img id="header-image" src="${data.media.url}" alt="${data.media}">
            <h2>${data.title}</h2>
            <p>Author: ${data.author.name}</p>
            <p style="margin-top: 0px; font-size: 12px">Created: ${createdDate}</p>
            <p style="margin-top: 0px; font-size: 12px">${data.tags}</p>
            <p>${data.body}</p>
   
        `;
        document.body.style.backgroundImage = `url(${data.media.url})`;
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
    
        blogEntry.style.position = 'relative';
        blogEntry.style.zIndex = '1';
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
