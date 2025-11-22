'use client';

import RecoClasses from '@/Components/Pages/Member Pages/RecoClasses';
import PrivateRoute from '@/Components/Router/PrivateRoute';

export default function RecoClassesPage() {
  return (
    <PrivateRoute>
      <RecoClasses />
    </PrivateRoute>
  );
}
