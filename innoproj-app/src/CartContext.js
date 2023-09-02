import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState({
    quantity: 0,
    items: [],
  });

  // Function to add an item to the cart
  const addItemToCart = (item) => {
    setCart((prevCart) => ({
      ...prevCart,
      quantity: prevCart.quantity + 1,
      items: [...prevCart.items, item],
    }));
  };

  // Function to remove an item from the cart by index
  const removeItemFromCart = (index) => {
    const updatedItems = [...cart.items];
    updatedItems.splice(index, 1);

    setCart((prevCart) => ({
      ...prevCart,
      quantity: prevCart.quantity - 1,
      items: updatedItems,
    }));
  };

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
