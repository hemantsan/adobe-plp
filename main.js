import './assets/css/style.css';
import { PlpApp } from './assets/js/app';
import { hideFilterDrawer, showFilterDrawer } from './assets/js/util';

const PlpAppObject = new PlpApp('plp-app');

// async function loadProducts() {
//   const products = await PlpAppObject.fetchProducts();
//   PlpAppObject.renderProductCards(products);
// }

// loadProducts();
// PlpAppObject.registerEvents();
document.querySelector('.menu-button').addEventListener('click', (e) => {
  showFilterDrawer();
});
document.querySelector('.mobile-filter-section__close').addEventListener('click', (e) => {
  hideFilterDrawer();
});
document.querySelector('.mobile-filter-section__cta').addEventListener('click', (e) => {
  hideFilterDrawer();
});
PlpAppObject.loadProducts();
