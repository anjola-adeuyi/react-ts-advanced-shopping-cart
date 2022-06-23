import { Card } from 'react-bootstrap';

interface Item {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

export function StoreItem({ id, imgUrl, name, price }: Item) {
  return (
    <Card>
      <Card.Img
        variant='top'
        src={imgUrl}
        height='200px'
        style={{ objectFit: 'cover' }}
      />
    </Card>
  );
}
