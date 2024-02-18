const mobileToggler = document.getElementById('mobile-toggle');
const navbarLinks = document.getElementById('navbarLinks');
// let circularProgress = document.querySelector(".circular-progress"),
//     progressValue = document.querySelector(".progress-value");

// let progressStartValue = 0,    
//     progressEndValue = 90,    
//     speed = 100;
    
// let progress = setInterval(() => {
//     progressStartValue++;

//     progressValue.textContent = `${progressStartValue}%`
//     circularProgress.style.background = `conic-gradient(#7d2ae8 ${progressStartValue * 3.6}deg, #ededed 0deg)`

//     if(progressStartValue == progressEndValue){
//         clearInterval(progress);
//     }    
// }, speed);



var swiper = new Swiper(".testimonial-swipper", {
  pagination: {
    el: ".swiper-pagination",
    // type: "progressbar",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


var swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
  },
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
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
    
  }
});


mobileToggler.addEventListener('click', ()=> {
  navbarLinks.classList.toggle('mobile')
})


const navlinks = document.querySelectorAll('.navlink');

    navlinks.forEach(function(navlink) {
      navlink.addEventListener('click', function() {
        navbarLinks.classList.remove('mobile');
      });
    });



    document.addEventListener('DOMContentLoaded', function() {
      const mobileToggler = document.getElementById('mobile-toggle');
      const navbarLinks = document.getElementById('navbarLinks');
    
      // Check if there is a user in local storage
      const user = JSON.parse(localStorage.getItem('userData'));
    
      // Function to update the navbar based on user login status
      function updateNavbar() {
        if (user) {
          // User is logged in, show Dashboard link and hide Login and Signup links
          document.querySelector('.siggning-links').style.display = 'none';
          document.querySelector('.navlink-dashboard').style.display = 'block';
        } else {
          // User is not logged in, show Login and Signup links and hide Dashboard link
          document.querySelector('.siggning-links').style.display = 'block';
          document.querySelector('.navlink-dashboard').style.display = 'none';
        }
      }
    
      // Call updateNavbar to initially set the navbar based on user login status
      updateNavbar();
    
      mobileToggler.addEventListener('click', () => {
        navbarLinks.classList.toggle('mobile');
      });
    
      const navlinks = document.querySelectorAll('.navlink');
    
      navlinks.forEach(function(navlink) {
        navlink.addEventListener('click', function() {
          navbarLinks.classList.remove('mobile');
        });
      });
    });
    

    document.addEventListener("DOMContentLoaded", function() {
      const contactForm = document.getElementById("contactForm");
    
      contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission
    
        // Retrieve form data
        const formData = new FormData(contactForm);
        const messageData = {
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          date: new Date().toLocaleString() // Add creation date
        };
    
        // Store message data in localStorage
        let messages = JSON.parse(localStorage.getItem("messages")) || [];
        messages.push(messageData);
        localStorage.setItem("messages", JSON.stringify(messages));
    
        // Optionally, provide feedback to the user
        alert("Message sent successfully!");
        contactForm.reset(); // Reset form fields
      });
    });
    