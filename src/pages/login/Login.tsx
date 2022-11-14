import React, { useEffect } from "react";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "react-oidc-context";
import { Table } from "reactstrap";

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  useEffect(() => {
    if (!auth.isLoading && auth.isAuthenticated) {
      navigate("/landing");
    }
  }, [auth.isLoading]);
  console.log(auth);
  return (
    <>
      {!auth.isLoading && auth.error ? (
        <>oops! Error: {auth.error.message}</>
      ) : auth.isLoading ? (
        <Loader />
      ) : (
        <>
          <Table responsive bordered style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th>FRONTEND</th>
                <th>AUTHENTICATION/AUTHORIZATION</th>
                <th>BACKEND</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    style={{ height: "50vh" }}
                    src="/global/images/react_final.jpg"
                    alt="logo"
                  ></img>
                </td>
                <td>
                  <img
                    style={{ height: "50vh" }}
                    src="/global/images/oidc_final.jpg"
                    alt="logo"
                  ></img>
                </td>
                <td>
                  <img
                    style={{ height: "50vh" }}
                    src="/global/images/rest_final.jpg"
                    alt="logo"
                  ></img>
                </td>
              </tr>
            </tbody>
          </Table>
        </>
      )}
    </>
  );
}
