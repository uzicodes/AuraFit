'use client';

export const dynamic = 'force-dynamic';

import AdmBallance from '@/Components/Pages/Admin Pages/AdminBallance/AdmBallance';
import PrivateRoute from '@/Components/Router/PrivateRoute';
import AdminRoute from '@/Components/Router/AdminRoute';

export default function BallancePage() {
  return (
    <PrivateRoute>
      <AdminRoute>
        <AdmBallance />
      </AdminRoute>
    </PrivateRoute>
  );
}

