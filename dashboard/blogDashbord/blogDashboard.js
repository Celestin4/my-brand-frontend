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
    const response = await fetch(`${Base_URL}/blogs`);
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
          <h4 class='blog-title'>${blog.title}</h4>
          <p class='blog-headline-text'>${blog.headlineText}</p>
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

document
  .getElementById("addBlogForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", event.target.title.value);
    formData.append("headlineText", event.target.headline.value);
    formData.append("content", event.target.content.value);
    formData.append("blogImage", event.target.blogImage.files[0]);
console.log(Array.from(formData.entries()));
    const token = JSON.parse(localStorage.getItem("token"));

    const options = {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    };

    try {
      const response = await fetch(`${Base_URL}/blogs`, options);

      if (response.ok) {
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


  const updateBlog = async (formData, blogId) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
  
      const response = await fetch(
        `${Base_URL}/blogs/${blogId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` }),
          },
          body: JSON.stringify(formData),
        }
        );
        console.log(formData)
      if (!response.ok) {
        throw new Error("Failed to update blog");
      }
      fetchAllBlogs();
      updateBlogModel.style.display = "none";
    } catch (error) {
      console.error("Error updating blog:", error.message);
    }
  };
  
const deleteBlog = async (blogId) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'));

    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");

    if (!confirmDelete) {
      return;
    }

    const response = await fetch(
      `${Base_URL}/blogs/${blogId}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`, 
        },
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
      `${Base_URL}/blogs/${blogId}`
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


updateBlogForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const token = JSON.parse(localStorage.getItem('token'));

  const formData = new FormData();
  formData.append("title", event.target.updateTitle.value);
  formData.append("headlineText", event.target.updateHeadline.value);
  formData.append("content", event.target.updateContent.value);
  formData.append("updatedBlogImage", event.target.updatedBlogImage.files[0]); // Assuming this is a file input

  try {
    const response = await fetch(`${Base_URL}/blogs/${currentBlogId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`, // Add authorization token to headers
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to update blog");
    }

    fetchAllBlogs();
    updateBlogModel.style.display = "none";
  } catch (error) {
    console.error("Error updating blog:", error.message);
  }
});

fetchAllBlogs();
