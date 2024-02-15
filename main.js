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

