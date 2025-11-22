'use client';

import NewsletterSubsc from '@/Components/Pages/Admin Pages/NewsletterSubscribers/NewsletterSubsc';
import PrivateRoute from '@/Components/Router/PrivateRoute';
import AdminRoute from '@/Components/Router/AdminRoute';

export default function NewsletterSubscPage() {
  return (
    <PrivateRoute>
      <AdminRoute>
        <NewsletterSubsc />
      </AdminRoute>
    </PrivateRoute>
  );
}
