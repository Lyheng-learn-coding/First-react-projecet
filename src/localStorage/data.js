export function saveCartPro(cartProduct) {
  localStorage.setItem("cartProduct", JSON.stringify(cartProduct));
  window.dispatchEvent(new Event("cart-updated"));
}

export function getCartPro() {
  const cart = localStorage.getItem("cartProduct");
  if (!cart || cart === "undefined") {
    return [];
  }

  return JSON.parse(cart) || [];
}

export function saveRecentSearch(recentSearch) {
  localStorage.setItem("recentSearch", recentSearch);
}

export function getRecentSearch() {
  const recentSearch = localStorage.getItem("recentSearch");
  return recentSearch || "";
}
