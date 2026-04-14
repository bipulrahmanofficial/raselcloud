"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!user || user.role !== "admin") {
    return <div className="min-h-screen bg-background" />;
  }

  return <>{children}</>;
};

export default AdminRoute;
