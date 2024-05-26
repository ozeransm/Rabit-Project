let cards = [];
const btnAddchange = [];
const modalContent = document.querySelector(".div-admin-content");

function saveJSON(url, data) {
            fetch(url, {
                method: 'POST',
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
    const name = e.currentTarget.form.elements[0].value;
    const price = e.currentTarget.form.elements[1].value;
    const numberElement = e.currentTarget.id.split('-')[e.currentTarget.id.split('-').length - 1];
    cards[numberElement].name = name;
    cards[numberElement].price = price;

    saveJSON()
    console.log(cards);
}

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
                <form action="submit">
                    <label for="name">Name:</label>
                    <input type="text" id="toyBpriceTitle" name="name" value="${el.name}">

                    <label for="price">Price:</label>
                    <input type="text" id="toyBprice" name="price" value="${el.price}">

                    <button type="button" id="btn-edit-${el.id}">Add change</button>
                    <button type="button" id="btn-del-${el.id}">Delete</button>                
                </form>
                                                
                
            </div>
        </div>

                `;
            
    });
  card += `<button type="button" id="new-goods">New card</button>`;
  modalContent.innerHTML = card;
  data.cards.map((el, i) => {
    btnAddchange.push(document.querySelector(`#btn-edit-${el.id}`));
    btnAddchange[i].addEventListener('click', handlerBtnToy);
    
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
