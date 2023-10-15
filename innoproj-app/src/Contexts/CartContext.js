import { createContext, useContext, useState, useEffect } from "react";

// Create a context for the shopping cart
const CartContext = createContext();

// Custom hook to access the cart context
export function useCart() {
  return useContext(CartContext);
}

// CartProvider component that manages the shopping cart state
export function CartProvider({ children }) {
  // Load cart state from localStorage on initialization
  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || {
      quantity: 0,
      totalPrice: 0.0,
      items: [],
    };
    return savedCart;
  });

  // Function to add an item to the cart
  const addItemToCart = (item) => {
    // Check if item.Account_ID is already in the cart
    const itemInCart = cart.items.find(
      (cartItem) => cartItem.Asset_ID === item.Asset_ID
    );

    if (!itemInCart) {
      // If the item is not in the cart, add it as a new item
      setCart((prevCart) => ({
        ...prevCart,
        quantity: prevCart.quantity + 1,
        totalPrice: prevCart.totalPrice + parseFloat(item.Price),
        items: [...prevCart.items, { ...item, quantity: 1 }],
      }));
    }
  };

  // Function to remove an item from the cart by index
  const removeItemFromCart = (index) => {
    const updatedItems = [...cart.items];
    updatedItems.splice(index, 1);

    setCart((prevCart) => ({
      ...prevCart,
      quantity: prevCart.quantity - 1,
      totalPrice: prevCart.totalPrice - prevCart.items[index].Price,
      items: updatedItems,
    }));
  };

  const removeItemFromCart_ID = (id) => {
    const index = cart.items.findIndex((cartItem) => cartItem.Asset_ID === id);

    if (!isNaN(index)) {
      if (index >= 0) {
        removeItemFromCart(index);
      }
    }
  };

  // Function to reset the cart
  const resetCart = () => {
    setCart(() => ({
      quantity: 0,
      totalPrice: 0,
      items: [],
    }));
  };

  // Save cart state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        removeItemFromCart,
        resetCart,
        removeItemFromCart_ID,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
