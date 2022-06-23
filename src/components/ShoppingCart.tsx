import { Offcanvas } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';

interface ShoppingCartProps {
  isOpen: boolean;
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart } = useShoppingCart();

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
    </Offcanvas>
  );
}
