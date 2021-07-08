const headerCityButton = document.querySelector('.header__city-button');

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
}
const enableScroll = () => {
  document.body.style.cssText = ``;
  window.scroll({
    top: document.body.dbScrollY
  })
}
      
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