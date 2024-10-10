import './assets/css/style.css';
import { PlpApp } from './assets/js/app';

const PlpAppObject = new PlpApp('plp-app');

async function loadProducts() {
  const products = await PlpAppObject.fetchProducts();
  PlpAppObject.renderProductCards(products);
}

loadProducts();

PlpAppObject.registerEvents();
