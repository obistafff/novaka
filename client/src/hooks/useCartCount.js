import { useEffect, useState } from "react";
import { readCart, cartCount } from "../utils/cart.js";

export function useCartCount() {
  const [count, setCount] = useState(() => cartCount(readCart()));

  useEffect(() => {
    // update when user changes tabs/windows
    function onStorage(e) {
      if (!e.key || e.key === "nokava_cart_v1") {
        setCount(cartCount(readCart()));
      }
    }

    // update in same tab (we will dispatch a custom event)
    function onCartUpdated() {
      setCount(cartCount(readCart()));
    }

    window.addEventListener("storage", onStorage);
    window.addEventListener("cart:updated", onCartUpdated);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cart:updated", onCartUpdated);
    };
  }, []);

  return count;
}
