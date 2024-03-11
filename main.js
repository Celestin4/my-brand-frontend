import Base_URL from "./API/api.js";
import  STORAGE_URI from "./API/storageApi.js";
import {gettingUserId, gettingToken} from './Services/userServices.js'


document.addEventListener("DOMContentLoaded", function () {
  const mobileToggler = document.getElementById("mobile-toggle");
  const navbarLinks = document.getElementById("navbarLinks");
  const loggoutButton = document.getElementById("loggout-button");
  const contactForm = document.getElementById("contactForm");
  const navlinks = document.querySelectorAll(".navlink");

  const testimonialSwiper = new Swiper(".testimonial-swipper", {
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const BlogSwiper = new Swiper(".swiper-container", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  });

  mobileToggler.addEventListener("click", function () {
    navbarLinks.classList.toggle("mobile");
    mobileToggler.classList.toggle("fa-bars");
    mobileToggler.classList.toggle("fa-times");
  });

  navlinks.forEach(function (navlink) {
    navlink.addEventListener("click", function () {
      navbarLinks.classList.remove("mobile");
      mobileToggler.classList.toggle("fa-bars");
      mobileToggler.classList.toggle("fa-times");
    });
  });

  function decodeToken(token) {
            const payload = token.split('.')[1];
            const decodedPayload = atob(payload);
            return JSON.parse(decodedPayload);
        }

  function updateNavbar() {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const decodedToken = decodeToken(token);
      const {role} = decodedToken
      console.log(role)


      document.querySelector(".siggning-links").style.display = "none";
      if(role !== 'Admin') {
        document.querySelector(".dashboard-navlink").style.display = "block";
        document.getElementById("dashbord-link").style.display = "none";
      }
    } else {
      document.querySelector(".siggning-links").style.display = "block";
      document.querySelector(".dashboard-navlink").style.display = "none";
    }
  }

  updateNavbar();

  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const messageData = {
      fullName: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      createdAt: new Date().toLocaleString(),
    };

    try {
      const response = await fetch(`${Base_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      console.log(messageData);

      if (!response.ok) {
        throw new Error("Failed to send message.");
      }

      alert("Message sent successfully!");
      contactForm.reset();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send message. Please try again later.");
    }
  });

  loggoutButton.addEventListener("click", function (e) {
    localStorage.removeItem("token");
    updateNavbar();
    window.location.href = "../index.html";
  });

  const blogContainer = document.getElementById("blogContainer");
  blogContainer.innerHTML = "";

  const fetchAllBlogs = async () => {
    try {
      const response = await fetch(`${Base_URL}/blogs`);
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const blogs = await response.json();
      displayBlogs(blogs);
    } catch (error) {
      blogContainer.innerHTML = "This section is under maintenance";
      console.error("Error fetching blogs:", error.message);
    }
  };
  const displayBlogs = async (blogs) => {
    blogs.forEach((blog) => {
      const blogElement = document.createElement("div");
      blogElement.className = "swiper-slide blog-swipper-slide";

      blogElement.innerHTML = `
        <img src="${STORAGE_URI}/${blog.imageUrl}" alt="">
        <div class="blog-content">
            <h3>${blog.title}</h3>
            <p>${blog.content}</p>
        </div>
        <button>Read More</button>
        <div class="social-icons">
            <span><i class="fas fa-heart like-icon" data-blogId="${blog._id}"></i><span>${blog.likes.length}</span></span>
            <span><i class="fas fa-comment comment-icon" data-blogId="${blog._id}"></i><span>${blog.comments.length}</span></span>
            <span><i class="fas fa-share share-icon" data-blogId="${blog._id}"><span>${blog.shares.length}</span></i></span>
            <span><i class="fas fa-eye" data-blogId="${blog._id}"><span>${blog.views.length}</span></i></span>
        </div>
    `;
      blogContainer.appendChild(blogElement);
      const likeIcon = blogElement.querySelector(".like-icon");
      const commentIcon = blogElement.querySelector(".comment-icon");
      const shareIcon = blogElement.querySelector(".share-icon");
      const userId = gettingUserId();
      const token = gettingToken();
      

      likeIcon.addEventListener("click", (e) => {
    
    
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    
        fetch('http://localhost:3000/api/blogs/like', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert(`Like button clicked for blog ID: ${blogId} and ${userId}`);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    });
    
      commentIcon.addEventListener("click", (e) => {
        const blogId = e.target.dataset.blogid;
        alert(`Comment button clicked for blog ID: ${blogId}`);
      });
      shareIcon.addEventListener("click", (e) => {
        const blogId = e.target.dataset.blogid;
        alert(`Share button clicked for blog ID: ${blogId}`);
      });
    });
};

  fetchAllBlogs();

  async function getAllProjects() {
    try {
      const response = await fetch(`${Base_URL}/portfolio`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch projects: ${response.status} ${response.statusText}`
        );
      }
      const projects = await response.json();
      console.log(projects);

      return projects;
    } catch (error) {
      console.error("Error getting projects:", error);
      return []; // or throw error if needed
    }
  }

  const portifolioList = document.getElementById("portifolio-list");
  const portifolioItem = document.createElement("div");
  portifolioItem.classList.add("portifolio-content");

  function displayProjects() {
    getAllProjects().then((projects) => {
      portifolioList.innerHTML = "";
      projects.forEach((project, index) => {
        const portifolioItem = document.createElement("div"); // Create a new element for each project
        portifolioItem.classList.add("portifolio-content");

        portifolioItem.innerHTML = `
      <div class="portifolio-image">
              <img src="${STORAGE_URI}/${project.image}" alt="" />
            </div>

            <div class="portifolio-title">
              <h3>${project.title}</h3>
            </div>
            <div class="portifolio-type">
              <a href="${project.githubLink}"><span class="portifolio-github-link">Github Link</a>
            </div>
      `;
        portifolioList.appendChild(portifolioItem);
      });
    });
  }

  displayProjects();
});
