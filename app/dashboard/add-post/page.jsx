'use client';

export const dynamic = 'force-dynamic';

import AddForum from '@/Components/Pages/Trainer Pages/AddForum';
import PrivateRoute from '@/Components/Router/PrivateRoute';
import TrainerRoute from '@/Components/Router/TrainerRoute';

export default function AddPostPage() {
  return (
    <PrivateRoute>
      <TrainerRoute>
        <AddForum />
      </TrainerRoute>
    </PrivateRoute>
  );
}

