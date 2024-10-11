function showLoader(state) {
  if (state) {
    document.querySelector('.shimmer').style.display = 'flex';
    document.querySelector('.product-list__items').style.display = 'none';
    document.querySelector('#btnLoadMore').style.display = 'none';
  } else {
    document.querySelector('.shimmer').style.display = 'none';
    document.querySelector('.product-list__items').style.display = 'flex';
    document.querySelector('#btnLoadMore').style.display = 'inline-block';
  }
}

function showFilterDrawer() {
  const drawerEl = document.querySelector('.mobile-filter-section');
  drawerEl.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function hideFilterDrawer() {
  const drawerEl = document.querySelector('.mobile-filter-section');
  drawerEl.style.display = 'none';
  document.body.style.overflow = 'unset';
}

export { showLoader, showFilterDrawer, hideFilterDrawer };
