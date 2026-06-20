import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(undefined);

const STORAGE_KEY = "loopify-shopping-cart";

function loadCartFromStorage() {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);

    if (!savedCart) {
      return [];
    }

    const parsedCart = JSON.parse(savedCart);

    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch (error) {
    console.error("Unable to load the shopping cart:", error);
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadCartFromStorage);

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
      console.error("Cannot add an invalid product to the cart.");
      return;
    }

    const quantity = Math.max(
      1,
      Number(requestedQuantity) || 1,
    );

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                price: product.price,
              }
            : item,
        );
      }

      return [
        ...currentItems,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          shortName: product.shortName || product.name,
          price: Number(product.price) || 0,
          boxCount: Number(product.boxCount) || 1,
          theme: product.theme || "mixed",
          quantity,
        },
      ];
    });
  }

  function updateQuantity(itemId, requestedQuantity) {
    const quantity = Number(requestedQuantity);

    if (!Number.isFinite(quantity)) {
      return;
    }

    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    const safeQuantity = Math.min(
      20,
      Math.max(1, Math.floor(quantity)),
    );

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: safeQuantity,
            }
          : item,
      ),
    );
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

  const totalPacks = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
      ),
    [cartItems],
  );

  const totalBoxes = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + item.quantity * item.boxCount,
        0,
      ),
    [cartItems],
  );

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + item.price * item.quantity,
        0,
      ),
    [cartItems],
  );

  const cartValue = useMemo(
    () => ({
      cartItems,
      totalPacks,
      totalBoxes,
      subtotal,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      isItemInCart,
      getItemQuantity,
    }),
    [cartItems, totalPacks, totalBoxes, subtotal],
  );

  return (
    <CartContext.Provider value={cartValue}>
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