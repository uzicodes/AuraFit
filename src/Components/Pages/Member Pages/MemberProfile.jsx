import { useState } from "react";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import useAuthContext from "../../hooks/useAuthContext";
import useRole from "../../hooks/useRole";
import { Dialog, DialogPanel, TransitionChild, Transition } from "@headlessui/react";

const MemberProfile = () => {
  const { user, updateUserProfile, setUser, loading } = useAuthContext() || {};
  const [role, isLoading] = useRole();
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    
    updateUserProfile(name, photo);
    setUser({ ...user, photoURL: photo, displayName: name });
  };

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  if (isLoading || loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden">
          <div className="relative h-48 bg-[#16A34A]">
            <div className="absolute inset-0 backdrop-blur-sm mix-blend-overlay"></div>
          </div>
          
          <div className="relative px-6 pb-8">
            <div className="flex flex-col items-center -mt-24">
              <img
                src={user?.photoURL}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 shadow-lg object-cover"
              />
              
              <span className="mt-4 px-4 py-1 bg-green-500 dark:bg-green-600 text-white text-sm font-medium rounded-full uppercase tracking-wide">
                {role}
              </span>
              
              <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                {user?.displayName}
              </h2>
              
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                ID: {user?.uid}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{user?.email}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Member Status</h3>
                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white capitalize">{role}</p>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={open}
                className="px-6 py-3 bg-[#16A34A] text-white"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>

        <Transition appear show={isOpen}>
          <Dialog
            as="div"
            className="relative z-50"
            onClose={close}
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm">
              <div className="fixed inset-0 flex items-center justify-center p-4">
                <TransitionChild
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <DialogPanel className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Update Profile</h3>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                        <input
                          defaultValue={user.displayName}
                          type="text"
                          name="name"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-600 dark:bg-gray-700 dark:text-white"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email (uneditable)</label>
                        <input
                          defaultValue={user.email}
                          type="email"
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Photo URL</label>
                        <input
                          defaultValue={user.photoURL}
                          type="url"
                          name="photo"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-600 dark:bg-gray-700 dark:text-white"
                          required
                        />
                      </div>

                      <div className="mt-6">
                        <button onClick={close}
                          type="submit"
                          className="w-full px-4 py-2 bg-[#16A34A] text-white font-semibold rounded-lg shadow-md transform transition hover:scale-105"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
};

export default MemberProfile;
