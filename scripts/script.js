const headerCityButton = document.querySelector('.header__city-button');

let hash = location.hash.substring(1);

if (localStorage.getItem('lomoda-location')) {
  headerCityButton.textContent = localStorage.getItem('lomoda-location');
} else {
  headerCityButton.addEventListener('click', () => {
    const city = prompt('Укажите ваш город');
    headerCityButton.textContent = city;
    localStorage.setItem('lomoda-location', city);
  });
}

// modal

const subheaderCart = document.querySelector('.subheader__cart'),
      cartOverlay = document.querySelector('.cart-overlay');
      cart = document.querySelector('.cart');


const disableScroll = () => {
  const widthScroll = window.innerWidth - document.body.offsetWidth;
  document.body.dbScrollY = window.scrollY;
  document.body.style.cssText = `
    position: fixed;
    top: ${-window.scrollY}px;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    padding-right: ${widthScroll}px;
  `;
};
const enableScroll = () => {
  document.body.style.cssText = ``;
  window.scroll({
    top: document.body.dbScrollY
  });
};
      
const cartModalOpen = () => {
  cartOverlay.classList.add('cart-overlay-open');
  disableScroll();
};
const cartModalClose = () => {
  cartOverlay.classList.remove('cart-overlay-open');
  enableScroll();
};

subheaderCart.addEventListener('click', cartModalOpen);
cartOverlay.addEventListener('click', (e) => {
  if (e.target === e.currentTarget || e.target.matches('.cart__btn-close')) {
    cartModalClose();
  }
});
document.addEventListener('keyup', (e) => {
  if (e.which === 27) {
    cartModalClose();
  }
});


// db
const getData = async () => {
  const data = await fetch('db.json');
 
  if (data.ok) {
    return data.json();
  } else {
    throw new Error(`Данные не были получены, ошибка ${data.status} ${data.statusText}`);
  }
};

const getGoods = (callback, value) => {

  getData()
  .then(data => {
    if (value) {
      callback(data.filter(item => item.category === value));
    } else {
      callback(data);
    }
  })
  .catch((err) => {
    console.log(err);
  });
};


try {
  const goodsList = document.querySelector('.goods__list');
  if (!goodsList) {
    throw 'This is not a goods page!';
  }

  const navigation = document.querySelector('.navigation__list'),
        goodsTitle = document.querySelector('.goods__title');
  let title;
  navigation.addEventListener('click', (e) => {
    goodsTitle.innerText = e.target.textContent || e.target.innerText;
  });

  const createCard = ({id, preview, cost, brand, name, sizes}) => {
    
    const li = document.createElement('li');
    li.classList.add('goods__item');

    li.innerHTML = `
      <article class="good">
        <a class="good__link-img" href="card-good.html#${id}">
          <img class="good__img" src="goods-image/${preview}" alt="${name}">
        </a>
        <div class="good__description">
          <p class="good__price">${cost} &#8381;</p>
          <h3 class="good__title">${brand} <span class="good__title__grey">/ ${name}</span></h3>
          ${sizes ? 
              `<p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(' ')}</span></p>`
            :
              ``
          }
          <a class="good__link" href="card-good.html#${id}">Подробнее</a>
        </div>
      </article>
    `;
    
    return li;
  };

  const renderGoodsList = data => {
    goodsList.textContent = '';

    data.forEach(item => {
      const card = createCard(item);
      goodsList.append(card);
    });
  };

  window.addEventListener('hashchange', () => {
    hash = location.hash.substring(1);
    getGoods(renderGoodsList, hash);
  });


} catch(err) {
  console.warn(err);
}