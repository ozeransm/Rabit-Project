const iconX = document.querySelector(".modal-svg-x");
const modal = document.querySelector(".modal");
const btnMenu = document.querySelectorAll(".btn-menu");
const cardContent = document.querySelector(".div-modal-card");

const btnAddOrder = [];
const widthScreen = window.innerWidth;
const heightScreen = window.innerHeight;
const lightbox = new SimpleLightbox('.gallery a', { /* options */ });
let modalContent;
let cards = [];
let shopCard = [];

function createCards(modalContent) {
    
  function loadJSON(path, callback) {
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error('Не вдалося завантажити файл');
            }
            return response.json();
        })
        .then(data => {
            callback(data);
        })
        .catch(error => {
            console.error('Помилка:', error);
        });
}

loadJSON('cards.json', function(data) {
  
  let card = '';
  cards = data.cards;
  data.cards.map(el => {
    card += `
                <div class="order-card">
            <div class="initswiper">
                <div class="swiper">
                    <div class="swiper-wrapper">
                                ${el.img.reduce((akk, val) => akk +
      `<div class="swiper-slide">
                                     <img class="sw-img" src="${val}" alt="">
                                  </div>`
      , '')}
                                                
                            </div>
                    <div class="swiper-pagination"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
        
                    <div class="swiper-scrollbar"></div>
                </div>
            </div>
            <div class="order-description">
                <h3>Description:</h3>
                <p id="toyBname">Fluffy bunny</p>
                <span id="toyBpriceTitle">price</span>
                <span id="toyBprice">60</span>
                <label for="toyBselect">quantity:</label>
                <select id="quantity-${el.id}" name="toyBselect">
                    <option value="0">0</option>
                    <option value="1" selected>1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button type="button" id="${el.id}">Add</button>
            </div>
        </div>

                `;
        
    
  })
  // 
  modalContent.innerHTML = card;
  data.cards.map((el, i) => {
    btnAddOrder.push(document.querySelector(`#${el.id}`));
    btnAddOrder[i].addEventListener('click', handlerBtnToy);
    
  })
  
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

});
}

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
                    createCards(modalContent);
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
  btnAddOrder.length = 0;
  modal.classList.toggle("visually-hidden");
  modalContent.classList.toggle("visually-hidden");
  document.body.style.overflow = 'auto';
}

modal.addEventListener('click', function (event) {
    if (event.target.className === "modal") handlerX();
});
  

function handlerBtnToy(e) {
  const quantityOrder = document.querySelector(`#quantity-${e.target.id}`);
  console.log(quantityOrder.options[Number(quantityOrder.value)]);
  quantityOrder.options[Number(quantityOrder.value)].selected = true;
  const card = { ...cards.filter(el => el.id === e.target.id)[0], quantity: quantityOrder.value, summ: 0 };
  if (shopCard.length === 0) shopCard.push(card)
    else {
  shopCard.map(el => {
    if (el.id === e.target.id) {
      shopCard = shopCard.filter(val => val.id !== e.target.id);
      
    }
  })
  shopCard.push(card);  
}
  shopCard = shopCard.filter(val => Number(val.quantity) !== 0);
  shopCard.map(el => el.summ = Number(el.price) * Number(el.quantity));
  const summ = Number(quantityOrder.value) * Number(card.price);
  cardContent.innerHTML = shopCard.reduce((akk, val) => akk += `<h2>Name - ${val.name} Price - ${val.price} Quantity -
      ${val.quantity} Summ - ${val.summ}</h2>`, '');
    
}

document.addEventListener('keydown', function (event) {
  if (event.key === "Escape") {
    handlerX();
  }
  
});
iconX.addEventListener('click', handlerX);
