import React, { useEffect } from "react";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router";
import { useAuth } from "react-oidc-context";
import { ToastAlert } from "../../components/toast-alert/toast-alert";

function CallbackPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  console.log(auth);
  useEffect(() => {
    if (!auth.isLoading) {
      if (!auth.isAuthenticated) {
        navigate("/login");
      } else {
        ToastAlert("Logged In", "success");
        navigate("/resourceApis");
      }
    }
  }, [auth.isAuthenticated]);
  return <Loader />;
}

export default CallbackPage;
