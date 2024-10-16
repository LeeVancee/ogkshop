import DashboardPageClient from './client';

interface DashboardPageProps {
  params: Promise<{ storeId: string }>;
}

const DashboardPage = async () => {
  return <DashboardPageClient />;
};

export default DashboardPage;
