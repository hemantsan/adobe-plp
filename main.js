// import { PlpApp } from './assets/js/app';
// import { hideFilterDrawer, showFilterDrawer } from './assets/js/util';

class PlpApp {
  constructor(elementId) {
    this.element = document.getElementById(elementId);
    this.limit = 10;
    this.step = 1;
    this.category = null;
    this.products = [];
    this.sort = 'price-low-to-high';

    this.renderCategories();

    setTimeout(() => {
      this.registerEvents();
    }, 500);
  }

  productCardTemplate(product) {
    const { title, price, image, description, id } = product;

    // <p class="product-item__description">${description}</p>
    return `<div class="product-item" data-product-id="product_${id}">
        <img alt="${title}" onLoad="this.src='${image}'" class="product-item__image" src="/assets/images/loader.gif"/>
        <h4 class="product-item__name">${title}</h4>
        <span class="product-item__price">$${price}</span>
        <a href="javascript:void(0)">
        <img src="/assets/images/wishlist.png" alt="wishlist icon image" class="product-item__icon" />
        </a>
    </div>`;
  }

  categoryTemplate(category, id) {
    return `<label for="${id}" class="filter-section__option">
                <input type="checkbox" name="${id}" value="${category}" id="${id}" />
                ${category}
              </label>`;
  }

  async renderCategories() {
    const data = await fetchCategories();
    const categoryEl = (data || [])
      .map((cat, idx) => {
        return this.categoryTemplate(cat, `category_${idx}`);
      })
      .join('');

    this.element.querySelector(
      '#divFilterCategory'
    ).innerHTML = `<h3 class="filter-section__subheading">Categories</h3>${categoryEl}`;
    document.querySelector(
      '#divFilterCategoryMobile'
    ).innerHTML = `<h3 class="filter-section__subheading">Categories</h3>${categoryEl}`;
  }

  renderProductCards(products) {
    this.products = products;
    const productsEl = (products || [])
      .map((product) => {
        return this.productCardTemplate(product);
      })
      .join('');

    this.element.querySelector('.product-list__total').innerText = `${products.length} Results`;
    document.querySelector('.mobile-filter-section__cta').innerText = `See ${products.length} Results`;
    this.element.querySelector('.product-list__items').innerHTML = productsEl;
  }

  async loadProducts() {
    showLoader(true);
    const products = await fetchProducts(this.limit, this.step, this.category);
    this.renderProductCards(products);
    showLoader(false);
  }

  registerEvents() {
    const self = this;
    const loadMoreCta = this.element.querySelector('.load-more-cta');
    const categoriesEl = document.querySelectorAll('.filter-section__option');
    loadMoreCta.addEventListener('click', function () {
      self.step++;
      self.loadProducts();
      setTimeout(() => {
        loadMoreCta.scrollIntoView(false);
      }, 500);
    });

    // Handle category checkbox change
    Array.from(categoriesEl).forEach((el) => {
      const checkbox = el.getElementsByTagName('input')[0];
      checkbox.addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
          const catInputs = document.querySelectorAll('.filter-section__option input');
          catInputs.forEach(function (item) {
            if (item != event.target) {
              item.checked = false;
            }
          });
          this.category = event.target.value;
          document.querySelector('.mobile-filter-section__clear-cta').style.display = 'inline-block';
        } else {
          this.category = null;
          document.querySelector('.mobile-filter-section__clear-cta').style.display = 'none';
        }
        this.loadProducts();
      });
    });

    // Handle Product price sort
    this.element.querySelector('#ddlProductSort').addEventListener('change', (e) => {
      const value = e.target.value;
      this.sort = value;
      if (value === 'price-low-to-high') {
        const products = (this.products || []).sort((itemA, itemB) => itemA.price - itemB.price);
        this.renderProductCards(products);
      } else if (value === 'price-high-to-low') {
        const products = (this.products || []).sort((itemA, itemB) => itemB.price - itemA.price);
        this.renderProductCards(products);
      }
    });
  }
}
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
