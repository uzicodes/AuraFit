'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PropTypes from "prop-types";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../Shared/LoadingSpinner";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && role !== "Admin") {
      router.push("/dashboard");
    }
  }, [role, isLoading, router]);

  if (isLoading) return <LoadingSpinner />;
  if (role === "Admin") return children;
  return null;
};

export default AdminRoute;

AdminRoute.propTypes = {
  children: PropTypes.element,
};
