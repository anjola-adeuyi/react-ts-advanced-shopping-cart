import { createContext, ReactNode, useContext, useState } from 'react';

interface ShoppingCartProviderProps {
  children: ReactNode;
}

interface CartItem {
  id: number;
  quantity: number;
}

interface ShoppingCartContextProps {
  getItemQuantity: (itemId: number) => number;
  increaseCartQuantity: (itemId: number) => void;
  decreaseCartQuantity: (itemId: number) => void;
  removeItem: (itemId: number) => void;
}

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const getItemQuantity = (itemId: number) => {
    const item = cartItems.find((item) => item.id === itemId);
    return item ? item.quantity : 0;
  };

  const increaseCartQuantity = (itemId: number) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      setCartItems([
        ...cartItems.filter((item) => item.id !== itemId),
        { ...item, quantity: item.quantity + 1 },
      ]);
    } else {
      setCartItems([...cartItems, { id: itemId, quantity: 1 }]);
    }
  };

  const decreaseCartQuantity = (itemId: number) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      if (item.quantity === 1) {
        setCartItems(cartItems.filter((item) => item.id !== itemId));
      } else {
        setCartItems([
          ...cartItems.filter((item) => item.id !== itemId),
          { ...item, quantity: item.quantity - 1 },
        ]);
      }
    }
  };

  const removeItem = (itemId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeItem,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
