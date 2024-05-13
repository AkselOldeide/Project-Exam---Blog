const carouselEndpoint = "https://v2.api.noroff.dev/blog/posts/Aksel_Oldeide?limit=3&page=1&sort=created&sortOrder=desc";
const leftPost = document.getElementById('left-post');
const centerPost = document.getElementById('center-post');
const rightPost = document.getElementById('right-post');
const blogGrid = document.getElementById('display-blog');
const sortBtn = document.getElementById('sort-button');
const paramBtn = document.getElementById('parameter-button');
const nextBtn = document.getElementById('next-button');
const prevBtn = document.getElementById('previous-button');
const pageIndicator = document.getElementById('page-indicator');

/* ############################################# Carousel  ################################################### */

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

  leftPost.innerHTML = getPostHTML(posts[leftIndex]);
  centerPost.innerHTML = getPostHTML(posts[centerIndex]);
  rightPost.innerHTML = getPostHTML(posts[rightIndex]);

  centerPost.onclick = () => {
    const postId = posts[centerIndex].id;
    window.location.href = `/blog-post.html?ID=${postId}`;
  };
}

function getPostHTML(post) {
  if (!post) return '';
  return `
    <div class="post">
      <h3>${post.title || ''}</h3>
      <img src="${post.media.url || ''}"></img>
    </div>
  `;
}

leftPost.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + posts.length) % posts.length;
  updateCarousel();
});

rightPost.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % posts.length;
  updateCarousel();
});

/*######################################### Python ######################################## */

let currentPage = 1;
let postsPerPage = 12;
let currentSort = 'created'; // Default sorting criteria
let sortOrder = 'desc'; // Default sort order

function fetchBlog() {
  let blogEndpoint = `https://v2.api.noroff.dev/blog/posts/Aksel_Oldeide?limit=${postsPerPage}&page=${currentPage}&sort=${currentSort}&sortOrder=${sortOrder}`;
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
      updatePageIndicator(currentPage);

      if (blogData.data.length < postsPerPage) {
        nextBtn.disabled = true;
      } else {
        nextBtn.disabled = false;
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
      
      postElement.innerHTML = `
          <h2>${blogPost.title}</h2>
          <p>${blogPost.body}</p>
          <a href="/blog-post.html?ID=${blogPost.id}">Click here to read more</a>
      `;

      blogGrid.appendChild(postElement);
  });
}

function updatePageIndicator(currentPage) {
  pageIndicator.innerText = `Page ${currentPage}`;
}

fetchCarousel();
fetchBlog();

/*######################################### Filtering  ######################################## */

sortBtn.onclick = function toggleOrder(){
  if (sortOrder === "desc"){
    sortOrder = "asc"
    fetchBlog()
    sortBtn.innerText= "Ascending ⬆️"
  }
  else{
    sortOrder = "desc"
    fetchBlog()
    sortBtn.innerText= "Descending ⬇️"
  }
}

paramBtn.onclick = function toggleParam(){
  if (currentSort === "created"){
    currentSort = "title"
    fetchBlog()
    paramBtn.innerText= "Title alphabetical 🔤"
  }
  else{
    currentSort = "created"
    fetchBlog()
    paramBtn.innerText= "Date of creation 📅"
  }
}
nextBtn.onclick = function nextPage() {
  currentPage++;
  fetchBlog();
}


prevBtn.disabled = true;

function updatePrevBtnStatus() {
  prevBtn.disabled = (currentPage === 1);
}


prevBtn.onclick = function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    prevBtn.disabled = false;
    fetchBlog();
    if (nextBtn.disabled) {
      nextBtn.disabled = false;
    }
    updatePrevBtnStatus();
  }
};

updatePrevBtnStatus();
