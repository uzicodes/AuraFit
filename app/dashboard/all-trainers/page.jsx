'use client';

export const dynamic = 'force-dynamic';

import AdminTrainers from '@/Components/Pages/Admin Pages/AdminTrainers/AdminTrainers';
import PrivateRoute from '@/Components/Router/PrivateRoute';
import AdminRoute from '@/Components/Router/AdminRoute';

export default function AllTrainersPage() {
  return (
    <PrivateRoute>
      <AdminRoute>
        <AdminTrainers />
      </AdminRoute>
    </PrivateRoute>
  );
}

