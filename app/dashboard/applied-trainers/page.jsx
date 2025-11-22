'use client';

import AdmApliedTrainers from '@/Components/Pages/Admin Pages/AdmApliedTrainers/AdmApliedTrainers';
import PrivateRoute from '@/Components/Router/PrivateRoute';
import AdminRoute from '@/Components/Router/AdminRoute';

export default function AppliedTrainersPage() {
  return (
    <PrivateRoute>
      <AdminRoute>
        <AdmApliedTrainers />
      </AdminRoute>
    </PrivateRoute>
  );
}
