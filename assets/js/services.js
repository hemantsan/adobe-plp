async function fetchCategories() {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/categories`);
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

async function fetchProducts(limit, step, category, sort) {
  try {
    let url = `https://fakestoreapi.com/products`;
    let qp = `?limit=${limit * step}`;
    if (category) {
      url = `${url}/category/${category}`;
    }
    const response = await fetch(`${url}${qp}`);
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

// export { fetchCategories, fetchProducts };
