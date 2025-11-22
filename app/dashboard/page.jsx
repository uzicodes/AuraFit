'use client';

import MainDash from '@/Components/Pages/Dashboard/MainDash';
import PrivateRoute from '@/Components/Router/PrivateRoute';

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <MainDash />
    </PrivateRoute>
  );
}
