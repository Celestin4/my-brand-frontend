import Base_URL from "./API/api.js";
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

  const regularSwiper = new Swiper(".swiper-container", {
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

  function updateNavbar() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser) {
      document.querySelector(".siggning-links").style.display = "none";
      document.querySelector(".dashboard-navlink").style.display = "block";
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
      const response = await fetch(`${Base_URL}/messages/createMessage`, {
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
    localStorage.removeItem("loggedUser");
    updateNavbar();
    window.location.href = "../index.html";
  });

  const blogContainer = document.getElementById("blogContainer");
  blogContainer.innerHTML = "";

  const fetchAllBlogs = async () => {
    try {
      const response = await fetch(`${Base_URL}/blogs/getAllPosts`);
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const blogs = await response.json();
      displayBlogs(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error.message);
    }
  };

  const displayBlogs = async (blogs) => {
    blogs.forEach((blog) => {
      const blogElement = document.createElement("div");
      blogElement.className = "swiper-slide blog-swipper-slide";

      blogElement.innerHTML = `
        <img src="http://localhost:3000/uploads/${blog.imageUrl}" alt="">
        <div class="blog-content">
            <h3>${blog.title}</h3>
            <p>${blog.content}</p>
        </div>
        <button>Read More</button>
        <div class="social-icons">
            <span><i class="fas fa-heart like-icon"></i><span>${blog.likes.length}</span></span>
            <span><i class="fas fa-comment comment-icon"></i><span>${blog.comments.length}</span></span>
            <span ><i class="fas fa-share share-icon"><span>${blog.shares.length}</span></i></span>
            <span><i class="fas fa-eye"><span>${blog.views.length}</span></i></span>
        </div>
    `;
      blogContainer.appendChild(blogElement);
      const likeIcon = blogElement.querySelector(".like-icon");
      const commentIcon = blogElement.querySelector(".comment-icon");
      const shareIcon = blogElement.querySelector(".share-icon");

      likeIcon.addEventListener("click", (e) => {
        const { user, message } = JSON.parse(
          localStorage.getItem("loggedUser")
        );
        const userId = user._id;
        const blogId = blog._id;
        alert("Like");
      });
      commentIcon.addEventListener("click", (e) => {
        alert("comment");
      });
      shareIcon.addEventListener("click", (e) => {
        alert("share");
      });
    });
  };

  fetchAllBlogs();

  async function getAllProjects() {
    try {
      const response = await fetch(`${Base_URL}/portfolios/getAllPortfolios`);
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
              <img src="http://localhost:3000/uploads/${project.image}" alt="" />
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
