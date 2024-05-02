const iconX = document.querySelector(".modal-svg-x");
const modal = document.querySelector(".modal");
const btnMenu = document.querySelectorAll(".btn-menu");
const widthScreen = window.innerWidth;
const heightScreen = window.innerHeight;
const lightbox = new SimpleLightbox('.gallery a', { /* options */ });
let modalContent;

btnMenu.forEach((el, i) => {
    el.addEventListener('click', function handlerBtn() {
        modal.classList.toggle("visually-hidden");
        document.body.style.overflow = 'hidden';    
        switch (i) {
            case 0: modalContent = document.querySelector(".div-modal-contact");
                    document.documentElement.style.setProperty('--modal-width', '200px');
                    document.documentElement.style.setProperty('--modal-height', '250px');
                    break;
            case 1: modalContent = document.querySelector(".div-modal-order");
                    document.documentElement.style.setProperty('--modal-width', (widthScreen * 0.6).toFixed(0).toString() + 'px');
                    document.documentElement.style.setProperty('--modal-height', (heightScreen * 0.6).toFixed(0).toString() + 'px');
                    break;
            case 2: modalContent = document.querySelector(".div-modal-galery");
                    document.documentElement.style.setProperty('--modal-width', (widthScreen * 0.8).toFixed(0).toString() + 'px');
                    document.documentElement.style.setProperty('--modal-height', (heightScreen * 0.8).toFixed(0).toString() + 'px');
                    break;
        }
        modalContent.classList.toggle("visually-hidden");
        console.log((widthScreen*0.6).toFixed(0).toString());
})
})

function handlerX() {
    modal.classList.toggle("visually-hidden");
        modalContent.classList.toggle("visually-hidden");
        document.body.style.overflow = 'auto';
}
document.addEventListener('keydown', function(event) {
  if (event.key === "Escape") {
    handlerX();
  }
});
iconX.addEventListener('click', handlerX);

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
speed: 300,
autoplay: true,
  
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});
