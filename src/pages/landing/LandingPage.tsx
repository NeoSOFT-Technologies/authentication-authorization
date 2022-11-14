import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "react-oidc-context";

function LandingPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      navigate("/login");
    }
  }, []);

  return <></>;
}

export default LandingPage;
