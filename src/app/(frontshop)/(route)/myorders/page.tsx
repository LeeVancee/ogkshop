import Container from '@/components/ui/container';
import OrderList from './components/OrderList';
import { Suspense } from 'react';

export default async function OrdersPage() {
  return (
    <Container className="min-h-screen">
      <Suspense>
        <OrderList />
      </Suspense>
    </Container>
  );
}
