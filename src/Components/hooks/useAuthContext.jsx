import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const useAuthContext = () => {
  const auth = useContext(AuthContext);
  
  // Return empty object during SSR/build to prevent errors
  if (typeof window === 'undefined') {
    return {
      user: null,
      loading: true,
      signIn: async () => {},
      signInWithGoogle: async () => {},
      createUser: async () => {},
      logOut: async () => {},
      updateUserProfile: async () => {},
      setUser: () => {},
      setLoading: () => {},
    };
  }
  
  if (auth === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  
  return auth;
};

export default useAuthContext;
