import { createContext, ReactNode, useContext, useState } from 'react';
import { ShoppingCart } from '../components';

interface ShoppingCartProviderProps {
  children: ReactNode;
}

interface CartItem {
  id: number;
  quantity: number;
}

interface ShoppingCartContextProps {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (itemId: number) => number;
  increaseCartQuantity: (itemId: number) => void;
  decreaseCartQuantity: (itemId: number) => void;
  removeItem: (itemId: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
}

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const openCart = () => setIsOpen(true);

  const closeCart = () => setIsOpen(false);

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
        cartQuantity,
        cartItems,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
