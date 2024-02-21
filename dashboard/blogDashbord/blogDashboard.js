const createNewBlogmodal = document.getElementById("myModal");
const updateBlogModel = document.getElementById("updateBlogModel");
const btn = document.getElementById("myBtn");
const span = document.querySelector(".close");
const closeUpdateBlogModel = document.querySelector(".closeUpdateBlogModel");

btn.addEventListener("click", () => {
  createNewBlogmodal.style.display = "block";
});

span.addEventListener("click", () => {
  createNewBlogmodal.style.display = "none";
});

closeUpdateBlogModel.addEventListener("click", () => {
  updateBlogModel.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === createNewBlogmodal) {
    createNewBlogmodal.style.display = "none";
  }
  if (event.target === updateBlogModel) {
    updateBlogModel.style.display = "none";
  }
});

// Function to fetch all blog posts from the backend
const fetchAllBlogs = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/blogs/getAllPosts');
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    const blogs = await response.json();
    displayBlogs(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error.message);
  }
};

// Function to display blogs
const displayBlogs = (blogs) => {
  const blogList = document.querySelector(".blog-list");
  blogList.innerHTML = "";
  blogs.forEach((blog, index) => {
    const blogItem = `
      <div class="blog">
        <img src="${blog.imageUrl}" alt="Blog Image" class="blog-img">
        <div class="blog-content">
          <h2>${blog.title}</h2>
          <p>${blog.content}</p>
          <div class="blog-buttons">
            <button class="blog-update-btn" data-index="${index}" data-id="${blog._id}">Update</button>
            <button class="blog-delete-btn" data-id="${blog._id}">Delete</button>
          </div>
        </div>
      </div>
    `;
    blogList.innerHTML += blogItem;
  });
};

// Event delegation for update and delete buttons
document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("blog-update-btn")) {
    const index = event.target.dataset.index;
    const blogId = event.target.dataset.id;
    openUpdateBlogModel(index, blogId);
  }
  if (event.target.classList.contains("blog-delete-btn")) {
    const blogId = event.target.dataset.id;
    await deleteBlog(blogId);
  }
});

// Function to add new blog
const addBlog = async (formData) => {
  try {
    const response = await fetch('http://localhost:3000/api/blogs/createBlogPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Failed to add blog');
    }
    fetchAllBlogs(); // Refresh blogs after adding
    createNewBlogmodal.style.display = "none";
  } catch (error) {
    console.error('Error adding blog:', error.message);
  }
};

// Function to update blog
const updateBlog = async (formData, blogId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/blogs/updatePost/${blogId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Failed to update blog');
    }
    fetchAllBlogs(); // Refresh blogs after updating
    updateBlogModel.style.display = "none";
  } catch (error) {
    console.error('Error updating blog:', error.message);
  }
};

// Function to delete blog
const deleteBlog = async (blogId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/blogs/deletePost/${blogId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete blog');
    }
    fetchAllBlogs(); // Refresh blogs after deletion
  } catch (error) {
    console.error('Error deleting blog:', error.message);
  }
};

// Event listener for form submission
document.getElementById("addBlogForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = {
    title: event.target.title.value,
    // headlineText: event.target.headlineText.value,
    content: event.target.content.value,
    // date: event.target.date.value,
    // imageUrl: event.target.imageUrl.value,
    // author: event.target.author.value
  };
  addBlog(formData);
});

// Event listener for update form submission
document.getElementById("updateBlogForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = {
    title: event.target.updateTitle.value,
    headlineText: event.target.updateHeadline.value,
    content: event.target.updateContent.value,
    imageUrl: event.target.updateImageUrl.value,
    author: event.target.updateAuthor.value
  };
  const blogId = event.target.blogId.value;
  updateBlog(formData, blogId);
});

// Function to open update blog model with existing data
const openUpdateBlogModel = async (index, blogId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/blogs/getSinglePost/${blogId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blog details');
    }
    const blog = await response.json();
    document.getElementById("updateTitle").value = blog.title;
    document.getElementById("updateHeadline").value = blog.headlineText;
    document.getElementById("updateContent").value = blog.content;
    document.getElementById("updateImageUrl").value = blog.imageUrl;
    document.getElementById("updateAuthor").value = blog.author;
    document.getElementById("blogId").value = blog._id;
    updateBlogModel.style.display = "block";
  } catch (error) {
    console.error('Error fetching blog details for update:', error.message);
  }
};

// Display blogs when the page loads
fetchAllBlogs();
