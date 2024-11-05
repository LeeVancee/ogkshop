import { OrderClient } from './components/client';

const OrdersPage = async () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient />
      </div>
    </div>
  );
};

export default OrdersPage;
