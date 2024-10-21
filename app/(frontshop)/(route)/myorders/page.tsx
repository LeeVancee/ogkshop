import { auth } from '@/auth';
import Container from '@/components/ui/container';
import prismadb from '@/lib/prismadb';
import { formatter } from '@/lib/utils';
import { format } from 'date-fns';
import { OrderColumn } from '@/types';
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
