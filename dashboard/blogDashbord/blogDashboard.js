const modal = document.getElementById("myModal");
const updateBlogModel = document.getElementById("updateBlogModel");
const btn = document.getElementById("myBtn");
const span = document.querySelector(".close");
const closeUpdateBlogModel = document.querySelector(".closeUpdateBlogModel");

btn.addEventListener("click", () => {
  modal.style.display = "block";
});

span.addEventListener("click", () => {
  modal.style.display = "none";
});

closeUpdateBlogModel.addEventListener("click", () => {
  updateBlogModel.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
  if (event.target === updateBlogModel) {
    updateBlogModel.style.display = "none";
  }
});

// Function to fetch data from localStorage
const fetchData = () => {
  return JSON.parse(localStorage.getItem("blogs")) || [];
};

// Function to save data to localStorage
const saveData = (blogs) => {
  localStorage.setItem("blogs", JSON.stringify(blogs));
};

// Function to display blogs
const displayBlogs = () => {
  const blogs = fetchData();
  const blogList = document.querySelector(".blog-list");
  blogList.innerHTML = "";
  blogs.forEach((blog, index) => {
    const blogItem = `
      <div class="blog">
        <img src="${blog.image}" alt="Blog Image" class="blog-img">
        <div class="blog-content">
          <h2>${blog.title}</h2>
          <p>${blog.content}</p>
          <div class="blog-buttons">
            <button class="blog-update-btn" data-index="${index}">Update</button>
            <button class="blog-delete-btn" data-index="${index}">Delete</button>
          </div>
        </div>
      </div>
    `;
    blogList.innerHTML += blogItem;
  });
};

// Function to add new blog
const addBlog = (image, title, headline, content) => {
  const blogs = fetchData();
  const newBlog = { image, title, headline, content };
  blogs.push(newBlog);
  saveData(blogs);
  displayBlogs();
};

// Function to update blog
const updateBlog = (index, title, headline, content, image = null) => {
  const blogs = fetchData();
  const updatedBlog = {
    title: title,
    headline: headline,
    content: content,
    image: image ? image : blogs[index].image // If image is not provided, keep the existing image
  };
  blogs[index] = updatedBlog;
  saveData(blogs);
  displayBlogs();
};

// Function to delete blog
const deleteBlog = (index) => {
  const blogs = fetchData();
  blogs.splice(index, 1);
  saveData(blogs);
  displayBlogs();
};

// Event delegation for update and delete buttons
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("blog-update-btn")) {
    const index = event.target.dataset.index;
    openUpdateBlogModel(index);
  }
  if (event.target.classList.contains("blog-delete-btn")) {
    const index = event.target.dataset.index;
    deleteBlog(index);
  }
});

// Event listener for form submission
document.getElementById("addBlogForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const fileInput = document.getElementById("image");
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    const image = event.target.result;
    const title = document.getElementById("title").value;
    const headline = document.getElementById("headline").value;
    const content = document.getElementById("content").value;
    addBlog(image, title, headline, content);
    modal.style.display = "none";
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

// Event listener for update form submission
document.getElementById("updateBlogForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const index = document.getElementById("updateBlogIndex").value;
  const title = document.getElementById("updateTitle").value;
  const headline = document.getElementById("updateHeadline").value;
  const content = document.getElementById("updateContent").value;
  const fileInput = document.getElementById("updateImage");
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    const image = event.target.result;
    updateBlog(index, title, headline, content, image);
    updateBlogModel.style.display = "none";
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    // If no new image is selected, update blog without changing the image
    updateBlog(index, title, headline, content);
    updateBlogModel.style.display = "none";
  }
});

// Function to open update blog model with existing data
const openUpdateBlogModel = (index) => {
  const blogs = fetchData();
  const blog = blogs[index];
  document.getElementById("updateTitle").value = blog.title;
  document.getElementById("updateHeadline").value = blog.headline;
  document.getElementById("updateContent").value = blog.content;
  document.getElementById("updateBlogIndex").value = index;
  updateBlogModel.style.display = "block";
};

// Function to close modal
const closeModal = () => {
  modal.style.display = "none";
};



// Display blogs when the page loads
displayBlogs();
