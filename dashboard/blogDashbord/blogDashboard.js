import Base_URL from '../../API/api.js'

const createNewBlogmodal = document.getElementById("myModal");
const updateBlogModel = document.getElementById("updateBlogModel");
const btnCreateNewBlog = document.getElementById("reateNewBlogmodal");
const closeCreateNewBlogModel = document.querySelector(".close");
const closeUpdateBlogModel = document.querySelector(".closeUpdateBlogModel");
const updateBlogForm = document.getElementById("updateBlogForm");



btnCreateNewBlog.addEventListener("click", () => {
  createNewBlogmodal.style.display = "block";
});

closeCreateNewBlogModel.addEventListener("click", () => {
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
    const response = await fetch(`${Base_URL}/blogs/getAllPosts`);
    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }
    const blogs = await response.json();
    console.log(blogs);
    displayBlogs(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
  }
};

// Function to display blogs
const displayBlogs = (blogs) => {
  const blogList = document.querySelector(".blog-list");
  blogList.innerHTML = "";
  blogs.forEach((blog, index) => {
    const blogItem = `
      <div class="blog">
        <img src="http://localhost:3000/uploads/${blog.imageUrl}" alt="Blog Image" class="blog-img">
        <div class="blog-content">
          <h2>${blog.title}</h2>
          <p>${blog.headlineText}</p>
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
    console.log(blogId);
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
    const response = await fetch(
      `${Base_URL}/blogs/createBlogPost`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    console.log(formData);
    if (!response.ok) {
      throw new Error("Failed to add blog");
    }
  } catch (error) {
    console.error("Error adding blog:", error.message);
  }
};

document
  .getElementById("addBlogForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = {
      title: event.target.title.value,
      headlineText: event.target.headline.value,
      content: event.target.content.value,
      image: event.target.image.files[0],
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch(
        `${Base_URL}/blogs/createBlogPost`,
        options
      );

      if (response.ok) {
        const blogPost = await response.json();
        console.log("Blog post created:", blogPost);
        createNewBlogmodal.style.display = "none";
        fetchAllBlogs();

      } else {
        const errorData = await response.json();
        console.error("Error creating blog post:", errorData.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  });

// Function to update blog
const updateBlog = async (formData, blogId) => {
  try {
    const response = await fetch(
      `${Base_URL}/blogs/updateBlogPost/${blogId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update blog");
    }
    fetchAllBlogs();
    updateBlogModel.style.display = "none";
  } catch (error) {
    console.log(formData)
    console.log('id')
    console.log(blogId)
    console.error("Error updating blog:", error.message);
    console.log(error)
  }
};

// Function to delete blog
const deleteBlog = async (blogId) => {
  try {
    const response = await fetch(
      `${Base_URL}/blogs/deleteBlogPost/${blogId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete blog");
    }
    fetchAllBlogs();
  } catch (error) {
    console.error("Error deleting blog:", error.message);
  }
};



  let currentBlogId;

  const openUpdateBlogModel = async (index, blogId) => {
     updateBlogModel.style.display = "block";
     currentBlogId = blogId;
     console.log(index, blogId);
    try {
      const response = await fetch(
        `${Base_URL}/blogs/getSinglePost/${blogId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch blog details");
      }
      const blog = await response.json();
      console.log(blog)
      document.getElementById("updateTitle").value = blog.title;
      document.getElementById("updateHeadline").value = blog.headlineText;
      document.getElementById("updateContent").value = blog.content;
    } catch (error) {
      console.error("Error fetching blog details for update:", error.message);
    }
  };
  
  
  updateBlogForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = {
      title: event.target.updateTitle.value,
      headlineText: event.target.updateHeadline.value,
      content: event.target.updateContent.value,
      imageUrl: event.target.updateImage.value,
    };
    updateBlog(formData, currentBlogId);
  });

fetchAllBlogs();
