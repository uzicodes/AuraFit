'use client';

import AdmAddClasses from '@/Components/Pages/Admin Pages/AdmAddClasses/AdmAddClasses';
import PrivateRoute from '@/Components/Router/PrivateRoute';
import AdminRoute from '@/Components/Router/AdminRoute';

export default function AddClassesPage() {
  return (
    <PrivateRoute>
      <AdminRoute>
        <AdmAddClasses />
      </AdminRoute>
    </PrivateRoute>
  );
}
