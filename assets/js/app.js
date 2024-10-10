class PlpApp {
  constructor(elementId) {
    this.element = document.getElementById(elementId);
    this.limit = 10;
    this.step = 1;
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

  renderProductCards(products) {
    const productsEl = (products || [])
      .map((product) => {
        return this.productCardTemplate(product);
      })
      .join('');

    this.element.querySelector('.product-list__items').innerHTML = productsEl;
  }

  async fetchProducts() {
    try {
      const response = await fetch(`https://fakestoreapi.com/products?limit=${this.limit * this.step}`);
      if (!response.ok) {
        throw new Error(`API Status: ${response.status}`);
      }
      const json = await response.json();
      return json || [];
    } catch (error) {
      console.error(error.message);
      return [];
    }
  }

  async loadProducts() {
    const products = await this.fetchProducts();
    this.renderProductCards(products);
  }

  registerEvents() {
    const self = this;
    const loadMoreCta = this.element.querySelector('.load-more-cta');
    console.info('loadMoreCta =.', loadMoreCta);
    loadMoreCta.addEventListener('click', function () {
      self.step = 2;
      self.loadProducts();
      setTimeout(() => {
        loadMoreCta.scrollIntoView(false);
      }, 500);
    });
  }
}

export { PlpApp };
