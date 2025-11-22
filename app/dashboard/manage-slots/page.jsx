'use client';

import ManageSlotts from '@/Components/Pages/Trainer Pages/ManageSlotts';
import PrivateRoute from '@/Components/Router/PrivateRoute';
import TrainerRoute from '@/Components/Router/TrainerRoute';

export default function ManageSlotsPage() {
  return (
    <PrivateRoute>
      <TrainerRoute>
        <ManageSlotts />
      </TrainerRoute>
    </PrivateRoute>
  );
}
