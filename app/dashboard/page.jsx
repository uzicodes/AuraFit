'use client';

import MainDash from '@/Components/Pages/Dashboard/MainDash';
import PrivateRoute from '@/Components/Router/PrivateRoute';

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <MainDash />
    </PrivateRoute>
  );
}
