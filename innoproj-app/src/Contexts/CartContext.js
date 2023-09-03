import { createContext, useContext, useState, useEffect } from "react";

// Create a context for the shopping cart
const CartContext = createContext();

// Custom hook to access the cart context
export function useCart() {
  return useContext(CartContext);
}

// CartProvider component that manages the shopping cart state
export function CartProvider({ children }) {
  /**
   * items array - [
   *  {
   *   item - name of the item|product, *In the first assignment (img, title, price)*
   *   price - unit price of the product
   *   qty - number of units
   * }
   * ....
   * ]
   * */

  // Load cart state from localStorage on initialization
  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || {
      quantity: 0,
      totalPrice: 0,
      items: [],
    };
    return savedCart;
  });

  // Function to add an item to the cart
  const addItemToCart = (item) => {
    setCart((prevCart) => ({
      ...prevCart,
      quantity: prevCart.quantity + item.qty,
      totalPrice: prevCart.totalPrice + item.price * item.qty,
      items: [...prevCart.items, item],
    }));
  };

  // Function to remove an item from the cart by index
  const removeItemFromCart = (index) => {
    const updatedItems = [...cart.items];
    updatedItems.splice(index, 1);

    setCart((prevCart) => ({
      ...prevCart,
      quantity: prevCart.quantity - prevCart.items[index].qty,
      totalPrice:
        prevCart.totalPrice -
        prevCart.items[index].price * prevCart.items[index].qty,
      items: updatedItems,
    }));
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
      value={{ cart, addItemToCart, removeItemFromCart, resetCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
