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
    mobileToggler.classList.toggle('fa-bars');
    mobileToggler.classList.toggle('fa-times');
  });

  navlinks.forEach(function (navlink) {
    navlink.addEventListener("click", function () {
      navbarLinks.classList.remove("mobile");
      mobileToggler.classList.toggle('fa-bars');
    mobileToggler.classList.toggle('fa-times');

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

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const messageData = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      date: new Date().toLocaleString(),
    };
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.push(messageData);
    localStorage.setItem("messages", JSON.stringify(messages));
    alert("Message sent successfully!");
    contactForm.reset();
  });

  loggoutButton.addEventListener("click", function (e) {
    localStorage.removeItem("loggedUser");
    updateNavbar();
    window.location.href = '../index.html';
  });
});
