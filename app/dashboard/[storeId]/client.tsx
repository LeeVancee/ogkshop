'use client';

import { CreditCard, DollarSign, Package } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { Overview } from '@/components/backside/overview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/backside/heading';

import { formatter } from '@/lib/utils';
import { useParams } from 'next/navigation';
import {
  useGetGraphRevenue,
  useGetSalesCount,
  useGetStockCount,
  useGetTotalRevenue,
} from '@/features/manange/api/use-get-overview';
import HomeLoader from '@/components/loader/home-loader';

const DashboardPageClient = () => {
  const params = useParams();
  const { data: totalRevenue, isLoading: totalRevenueLoading } = useGetTotalRevenue(params.storeId as string);
  const { data: salesCount, isLoading: salesCountLoading } = useGetSalesCount(params.storeId as string);
  const { data: stockCount, isLoading: stockCountLoading } = useGetStockCount(params.storeId as string);
  const { data: graphRevenue, isLoading: graphRevenueLoading } = useGetGraphRevenue(params.storeId as string);

  if (totalRevenueLoading || salesCountLoading || stockCountLoading || graphRevenueLoading) {
    return <HomeLoader />;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatter.format(totalRevenue as number)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products In Stock</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPageClient;
