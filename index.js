const iconX = document.querySelector(".modal-svg-x");
const modal = document.querySelector(".modal");
const btnMenu = document.querySelectorAll(".btn-menu");
const cardContent = document.querySelectorAll(".div-modal-card");

const btnToyA = document.querySelector("#toyA");
const toyAname = document.querySelector("#toyAname");
const toyAprice = document.querySelector("#toyAprice");
const toyAselect = document.querySelector("#toyAselect");

const btnToyB= document.querySelector("#toyB");
const toyBname = document.querySelector("#toyBname");
const toyBprice = document.querySelector("#toyBprice");
const toyBselect = document.querySelector("#toyBselect");


const widthScreen = window.innerWidth;
const heightScreen = window.innerHeight;
const lightbox = new SimpleLightbox('.gallery a', { /* options */ });
const cardOrder = [];
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
            case 3: modalContent = document.querySelector(".div-modal-card");
                    document.documentElement.style.setProperty('--modal-width', (widthScreen * 0.5).toFixed(0).toString() + 'px');
                    document.documentElement.style.setProperty('--modal-height', (heightScreen * 0.5).toFixed(0).toString() + 'px');
                    break;
          default: modalContent = null;
        }
        modalContent?.classList.toggle("visually-hidden");
        
})
})

function handlerX() {
    modal.classList.toggle("visually-hidden");
        modalContent.classList.toggle("visually-hidden");
        document.body.style.overflow = 'auto';
}
function handlerBtnToy(e) {
  let newCardOrder = [];
  switch (e.currentTarget.id) {
    case 'toyA':
      newCardOrder = [...cardOrder.filter((el) => el.id !== e.currentTarget.id)];
      cardOrder.length = 0;
      cardOrder.push(...newCardOrder, { id: e.currentTarget.id, name: toyAname.innerHTML, quantity: toyAselect.value, price: toyAprice.innerHTML });
     
      break;
    case 'toyB':
      
      newCardOrder = [...cardOrder.filter((el) => el.id !== e.currentTarget.id)];
      cardOrder.length = 0;
      cardOrder.push(...newCardOrder, { id: e.currentTarget.id, name: toyBname.innerHTML, quantity: toyBselect.value, price: toyBprice.innerHTML });
      
      break;
    default: break;
  }
  cardContent[0].innerHTML = cardOrder.reduce((akk, el) => akk + '<p>' + el.name + el.quantity + el.price + '</p>', '');
  console.log(cardContent[0].innerHTML);
}
document.addEventListener('keydown', function(event) {
  if (event.key === "Escape") {
    handlerX();
  }
});
iconX.addEventListener('click', handlerX);

btnToyA.addEventListener('click', handlerBtnToy);
btnToyB.addEventListener('click', handlerBtnToy);


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
