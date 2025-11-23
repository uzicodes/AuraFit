'use client';

import PropTypes from "prop-types";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext";
import LoadingSpinner from "../Shared/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=${pathname}`);
    }
  }, [user, loading, router, pathname]);

  if (loading) return <LoadingSpinner />;
  if (user) return children;
  return null;
};

PrivateRoute.propTypes = {
  children: PropTypes.element,
};

export default PrivateRoute;
