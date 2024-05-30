const carouselEndpoint = "https://v2.api.noroff.dev/blog/posts/Aksel_Oldeide?limit=3&page=1&sort=created&sortOrder=desc";
const leftPost = document.getElementById('left-post');

const allCategoriesBtn = document.getElementById('tag-show-all');
const hiphopBtn = document.getElementById('tag-hiphop');
const electronicBtn = document.getElementById('tag-electronic');
const indieBtn = document.getElementById('tag-indie');

const centerPost = document.getElementById('center-post');
const rightPost = document.getElementById('right-post');
const blogGrid = document.getElementById('display-blog');
const sortBtn = document.getElementById('sort-button');
const paramBtn = document.getElementById('parameter-button');
const nextBtns = document.querySelectorAll(".next-button");
const prevBtns = document.querySelectorAll('.previous-button');
const pageIndicators = document.querySelectorAll('.page-indicator');


/*
############################################# Carousel  ###################################################
*/
let currentIndex = 0;
let posts = [];

function fetchCarousel() {
  fetch(carouselEndpoint)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      posts = data.data;
      updateCarousel();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function updateCarousel() {
  const centerIndex = currentIndex % posts.length;
  const leftIndex = (centerIndex - 1 + posts.length) % posts.length;
  const rightIndex = (centerIndex + 1) % posts.length;

  leftPost.innerHTML = getPostHTML(posts[leftIndex], 'left');
  centerPost.innerHTML = getPostHTML(posts[centerIndex]);
  rightPost.innerHTML = getPostHTML(posts[rightIndex], 'right');

  centerPost.onclick = () => {
    const postId = posts[centerIndex].id;
    window.location.href = `/blog-post.html?ID=${postId}`;
  };
}

function getPostHTML(post, position) {
  if (!post) return '';
  const overlayHTML = position ? `<div class="overlay arrow-${position}"></div>` : '';
  return `
    <div class="post">
      <img class="thumbnail-image" alt="${post.media.alt}" src="${post.media.url || ''}"></img>
      ${overlayHTML}
      <h2 id="post-title-center">${post.title}</h2>
    </div>
  `;
}


leftPost.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + posts.length) % posts.length;
  updateCarousel();
  leftPost.classList.add('active');
  centerPost.classList.add('active');
  rightPost.classList.add('active');
});

rightPost.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % posts.length;
  updateCarousel();
  leftPost.classList.add('active');
  centerPost.classList.add('active');
  rightPost.classList.add('active');
});

/*######################################### Sortable main content ######################################## */

let currentPage = 1;
let postsPerPage = 12;
let currentSort = 'created';
let sortOrder = 'desc';
let currentFilter = '';
allCategoriesBtn.disabled = true

function fetchBlog() {
  let blogEndpoint = `https://v2.api.noroff.dev/blog/posts/Aksel_Oldeide?limit=${postsPerPage}&page=${currentPage}&sort=${currentSort}&sortOrder=${sortOrder}&_tag=${currentFilter}`;
  fetch(blogEndpoint)
    .then(blogResponse => {
      if (!blogResponse.ok) {
        throw new Error('Network response was not ok');
      }
      return blogResponse.json();
    })
    .then(blogData => {
      blogPost = blogData.data;
      renderPosts(blogData);
      updatePageIndicators(currentPage);

      if (blogData.data.length < postsPerPage) {
        nextBtns.forEach(btn => btn.disabled = true);
      } else {
        nextBtns.forEach(btn => btn.disabled = false);
      }

      updatePrevBtnStatus();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function renderPosts(blogData) {
  blogGrid.innerHTML = '';

  blogData.data.forEach((blogPost) => {
    const postElement = document.createElement('div');
    postElement.classList.add('post-tile');
    postElement.style.backgroundImage = `url(${blogPost.media.url})`;
    postElement.style.backgroundRepeat = "no-repeat"
    postElement.style.backgroundSize = "cover"

    postElement.innerHTML = `
      <img src="${blogPost.media.url}" class="python-image" alt=${blogPost.media.alt} width="200px">   
      <article class="text-content">
        <h2>${blogPost.title}</h2>
        <h3>By Aksel Oldeide</h3>
        <p class="main-text">${blogPost.body}</p>
      </article>
    `;

    // Add an event listener to navigate to the blog post page when clicked
    postElement.addEventListener('click', () => {
      window.location.href = `/blog-post.html?ID=${blogPost.id}`;
    });

    blogGrid.appendChild(postElement);
  });
}

function updatePageIndicators(currentPage) {
  pageIndicators.forEach(indicator => {
    indicator.innerText = `Page ${currentPage}`;
  });
}

function updatePrevBtnStatus() {
  prevBtns.forEach(btn => {
    btn.disabled = (currentPage === 1);
  });
}

// ###################### Buttons ######################## 
allCategoriesBtn.addEventListener('click', function(){
  currentFilter = ""
  currentPage = 1;
  fetchBlog();
  
  allCategoriesBtn.disabled = true
  hiphopBtn.disabled = false
  electronicBtn.disabled = false
  indieBtn.disabled = false
})

hiphopBtn.addEventListener('click', function(){
  currentFilter = "hiphop"
  currentPage = 1;
  fetchBlog();
  
  allCategoriesBtn.disabled = false
  hiphopBtn.disabled = true
  electronicBtn.disabled = false
  indieBtn.disabled = false

})

electronicBtn.addEventListener('click', function(){
  currentFilter = "electronic"
  currentPage = 1;
  fetchBlog();
  
  allCategoriesBtn.disabled = false
  hiphopBtn.disabled = false
  electronicBtn.disabled = true
  indieBtn.disabled = false

})

indieBtn.addEventListener('click', function(){
  currentFilter = "indie-rock"
  currentPage = 1;
  fetchBlog();
  
  allCategoriesBtn.disabled = false
  hiphopBtn.disabled = false
  electronicBtn.disabled = false
  indieBtn.disabled = true

})

sortBtn.addEventListener('click', function() {
  sortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
  fetchBlog();
  sortBtn.innerText = sortOrder === 'desc' ? 'Descending ⬇️' : 'Ascending ⬆️';
});

paramBtn.addEventListener('click', function() {
  currentSort = currentSort === 'created' ? 'title' : 'created';
  fetchBlog();
  paramBtn.innerText = currentSort === 'created' ? 'Date of creation 📅' : 'Title alphabetical 🔤';
});

nextBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    currentPage++;
    fetchBlog();
  });
});

prevBtns.forEach(btn => {
  btn.disabled = true;
  btn.addEventListener('click', function() {
    if (currentPage > 1) {
      currentPage--;
      fetchBlog();
    }
  });
});

updatePrevBtnStatus();

fetchCarousel();
fetchBlog();
