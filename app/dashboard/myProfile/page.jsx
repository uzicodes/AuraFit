'use client';

export const dynamic = 'force-dynamic';

import MemberProfile from '@/Components/Pages/Member Pages/MemberProfile';
import PrivateRoute from '@/Components/Router/PrivateRoute';

export default function MyProfilePage() {
  return (
    <PrivateRoute>
      <MemberProfile />
    </PrivateRoute>
  );
}

