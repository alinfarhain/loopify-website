import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getProductById } from "../data/products.js";

const CartContext = createContext(undefined);

const STORAGE_KEY = "loopify-shopping-cart";
const MAX_CART_BOXES = 3;

function createCartItem(product, quantity) {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    shortName: product.shortName || product.name,
    price: Number(product.price) || 0,
    boxCount: Number(product.boxCount) || 1,
    theme: product.theme || "mixed",
    quantity,
  };
}

function loadCartFromStorage() {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);

    if (!savedCart) {
      return [];
    }

    const parsedCart = JSON.parse(savedCart);

    if (!Array.isArray(parsedCart)) {
      return [];
    }

    /*
     * Remove old bundle products and update old RM7 items
     * to the current RM5 product information.
     */
    const validItems = parsedCart
      .map((savedItem) => {
        const currentProduct = getProductById(savedItem.id);

        if (!currentProduct) {
          return null;
        }

        const savedQuantity = Math.floor(
          Number(savedItem.quantity) || 1,
        );

        const safeQuantity = Math.min(
          MAX_CART_BOXES,
          Math.max(1, savedQuantity),
        );

        return createCartItem(currentProduct, safeQuantity);
      })
      .filter(Boolean);

    /*
     * There is currently only one product, so keep only
     * the first valid product entry.
     */
    return validItems.slice(0, 1);
  } catch (error) {
    console.error("Unable to load the shopping cart:", error);
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(
    loadCartFromStorage,
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(cartItems),
      );
    } catch (error) {
      console.error("Unable to save the shopping cart:", error);
    }
  }, [cartItems]);

  function addItem(product, requestedQuantity = 1) {
    if (!product || !product.id) {
      console.error("An invalid product cannot be added.");
      return;
    }

    const requestedAmount = Math.max(
      1,
      Math.floor(Number(requestedQuantity) || 1),
    );

    setCartItems((currentItems) => {
      const currentTotalBoxes = currentItems.reduce(
        (total, item) =>
          total + item.quantity * item.boxCount,
        0,
      );

      const availableBoxes =
        MAX_CART_BOXES - currentTotalBoxes;

      const productBoxCount =
        Number(product.boxCount) || 1;

      const maximumAdditionalQuantity = Math.floor(
        availableBoxes / productBoxCount,
      );

      const quantityToAdd = Math.min(
        requestedAmount,
        maximumAdditionalQuantity,
      );

      if (quantityToAdd <= 0) {
        return currentItems;
      }

      const existingItem = currentItems.find(
        (item) => item.id === product.id,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...createCartItem(product, item.quantity),
                quantity: item.quantity + quantityToAdd,
              }
            : item,
        );
      }

      return [
        ...currentItems,
        createCartItem(product, quantityToAdd),
      ];
    });
  }

  function updateQuantity(itemId, requestedQuantity) {
    const quantity = Math.floor(
      Number(requestedQuantity),
    );

    if (!Number.isFinite(quantity)) {
      return;
    }

    setCartItems((currentItems) => {
      if (quantity <= 0) {
        return currentItems.filter(
          (item) => item.id !== itemId,
        );
      }

      return currentItems.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        const otherItemsBoxCount = currentItems
          .filter(
            (cartItem) => cartItem.id !== itemId,
          )
          .reduce(
            (total, cartItem) =>
              total +
              cartItem.quantity * cartItem.boxCount,
            0,
          );

        const maximumQuantityForItem = Math.floor(
          (MAX_CART_BOXES - otherItemsBoxCount) /
            item.boxCount,
        );

        const safeQuantity = Math.min(
          maximumQuantityForItem,
          Math.max(1, quantity),
        );

        return {
          ...item,
          quantity: safeQuantity,
        };
      });
    });
  }

  function removeItem(itemId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId),
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  function isItemInCart(itemId) {
    return cartItems.some((item) => item.id === itemId);
  }

  function getItemQuantity(itemId) {
    const item = cartItems.find(
      (cartItem) => cartItem.id === itemId,
    );

    return item ? item.quantity : 0;
  }

  const totalPacks = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalBoxes = cartItems.reduce(
    (total, item) =>
      total + item.quantity * item.boxCount,
    0,
  );

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0,
  );

  const remainingCapacity = Math.max(
    0,
    MAX_CART_BOXES - totalBoxes,
  );

  const value = {
    cartItems,
    totalPacks,
    totalBoxes,
    subtotal,
    remainingCapacity,
    maxCartBoxes: MAX_CART_BOXES,
    canAddMore: remainingCapacity > 0,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    isItemInCart,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error(
      "useCart must be used inside a CartProvider.",
    );
  }

  return context;
}