'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PropTypes from "prop-types";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../Shared/LoadingSpinner";

const TrainerRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && role !== "Trainer") {
      router.push("/dashboard");
    }
  }, [role, isLoading, router]);

  if (isLoading) return <LoadingSpinner />;
  if (role === "Trainer") return children;
  return null;
};

export default TrainerRoute;

TrainerRoute.propTypes = {
  children: PropTypes.element,
};
