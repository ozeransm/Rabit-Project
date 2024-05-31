let cards = [];
const btnAddchange = [];
const btnDel = [];
const modalContent = document.querySelector(".div-admin-content");

function saveJSON(data, del=0) {
    
            fetch('http://localhost:3000', {
                method: del===0 ? 'POST' : 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Не вдалося зберегти файл');
                }
                return response.json();
            })
            .then(data => {
                console.log('File saved:', data);
            })
            .catch(error => {
                console.error('Помилка:', error);
            });
}

function handlerBtnToy(e) {
    const description = e.currentTarget.form.elements[0].value;
    const name = e.currentTarget.form.elements[1].value;
    const price = e.currentTarget.form.elements[2].value;
    const numberElement = e.currentTarget.id.split('-')[e.currentTarget.id.split('-').length - 1];
    cards[numberElement].name = name;
    cards[numberElement].price = price;
    
    saveJSON({ id: numberElement, name, price, description });
    
}

function handlerBtnDel(e) {
    const numberElement = e.currentTarget.id.split('-')[e.currentTarget.id.split('-').length - 1];
    const title = document.querySelector(`.title-deleted-toy-${numberElement}`);

    for (let i = 0; i < e.currentTarget.form.elements.length; i++){
        e.currentTarget.form.elements[i].disabled = true;
    }
    title.classList.remove('visually-hidden');
    saveJSON({ id: numberElement }, 1);
}

function handlerBtnNewCard() {
    console.log("qwertyuilmnbvdszxcvbnmkjhgfd")
}

async function loadJSON(callback) {
    
    try {
                
        const response = await fetch('http://localhost:3000');
        
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
                
                <form action="submit">
                    <label for="description">Description:</label>
                    <textarea name="description" rows="4" cols="30" >${el.description}</textarea>                

                    <label for="name">Name:</label>
                    <input type="text" name="name" value="${el.name}">

                    <label for="price">Price:</label>
                    <input type="text" name="price" value="${el.price}">

                    <button type="button" id="btn-edit-${el.id}">Add change</button>
                    <button type="button" id="btn-del-${el.id}">Delete</button>                
                </form>
                                                
                
            </div>
            <p class="title-deleted-${el.id} visually-hidden">deleted</p>
        </div>

                `;
            
    });
    card += `<button type="button" id="new-goods">New card</button>`;
    modalContent.innerHTML = card;
    const btnNewCard = document.querySelector('#new-goods');
    btnNewCard.addEventListener('click', handlerBtnNewCard);
    data.cards.map((el, i) => {
    btnAddchange.push(document.querySelector(`#btn-edit-${el.id}`));
    btnAddchange[i].addEventListener('click', handlerBtnToy);
    btnDel.push(document.querySelector(`#btn-del-${el.id}`));
    btnDel[i].addEventListener('click', handlerBtnDel);
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
