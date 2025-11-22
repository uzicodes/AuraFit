import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const useAuthContext = () => {
  const auth = useContext(AuthContext);
  
  if (auth === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  
  return auth;
};

export default useAuthContext;
