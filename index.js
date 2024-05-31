const iconX = document.querySelector(".modal-svg-x");
const modal = document.querySelector(".modal");
const btnMenu = document.querySelectorAll(".btn-menu");
const cardContent = document.querySelector(".div-modal-card");

const btnAddOrder = [];
const widthScreen = window.innerWidth;
const heightScreen = window.innerHeight;
const lightbox = new SimpleLightbox('.gallery a', { /* options */ });
let sel = [];
let modalContent;
let cards = [];
let shopCard = [];

function createCards(modalContent) {
  async function loadJSON(callback) {
    try {
                
      const response = await fetch('http://127.0.0.1:3000');
        
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
        
      callback(await response.json());
      
             
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }  
  
loadJSON(function(data) {
  
  let card = '';
  cards = data.cards;
  if (sel.length === 0) {
    sel.length = data.cards.length;
    sel.fill(1);
  }
  data.cards.map((el, i) => {
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
                <p>${el.description}</p>
                <p id="toyBname">${el.name}</p>
                <span id="toyBpriceTitle">price</span>
                <span id="toyBprice">${el.price}</span>
                <label for="toyBselect">quantity:</label>
                <select id="quantity-${el.id}" name="toyBselect">
                    <option value="0" ${sel[i]===0 ? 'selected' : ''}>0</option>
                    <option value="1" ${sel[i]===1 ? 'selected' : ''}>1</option>
                    <option value="2" ${sel[i]===2 ? 'selected' : ''}>2</option>
                    <option value="3" ${sel[i]===3 ? 'selected' : ''}>3</option>
                    <option value="4" ${sel[i]===4 ? 'selected' : ''}>4</option>
                    <option value="5" ${sel[i]===5 ? 'selected' : ''}>5</option>
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
  sel[parseInt(e.target.id.split('-')[1])] = Number(quantityOrder.value);
  
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
