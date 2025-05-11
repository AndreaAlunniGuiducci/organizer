import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    const user = window.localStorage.getItem("user");
    console.log("user in protected route", user);
    setIsLoggedIn(!!user);
  }, [location]);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
