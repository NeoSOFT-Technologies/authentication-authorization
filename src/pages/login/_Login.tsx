import React, { useEffect, useState } from "react";
import { Form, Button, Alert, InputGroup, Col, Row } from "react-bootstrap";
import { logo, regexForEmail, regForPassword } from "../../resources/constants";
import Loader from "../../components/loader/Loader";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { LoginPageState } from "../../types/redux";
import { ToastAlert } from "../../components/toast-alert/toast-alert";
import { getUserDetails } from "../../store/login/slice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import PasswordButtons from "../../components/password-field/Password";
import { RootState } from "../../store";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "react-oidc-context";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();
  console.log(auth);

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  const dispatch = useAppDispatch();

  const loginState: LoginPageState = useAppSelector(
    (state: RootState) => state.login
  );
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowpassword] = useState(false);
  const handle = (event: any) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setFormData({ ...formdata, email: value });

        setError({
          ...error,
          email: regexForEmail.test(value) ? "" : "Email is not valid",
        });
        break;
      case "password":
        setFormData({ ...formdata, password: value });
        setError({
          ...error,
          password: regForPassword.test(value) ? "" : "password is not valid",
        });
        break;
      default:
        break;
    }
  };
  const validate = () => {
    let valid = false;

    valid = !(formdata.email.length === 0 || formdata.password.length === 0);

    return valid;
  };
  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (validate()) {
      const data = {
        username: formdata.email,
        password: formdata.password,
      };
      dispatch(getUserDetails(data));
    } else {
      ToastAlert("Please fill all the fields", "error");
    }
  };

  useEffect(() => {
    if (!auth.isLoading && auth.isAuthenticated) {
      navigate("/landing");
    }
  }, [auth.isLoading]);

  useEffect(() => {
    if (
      !loginState.loading &&
      loginState.data !== undefined &&
      loginState.error === undefined
    ) {
      ToastAlert("Logged In", "success");
      navigate("/landing");
    } else if (!loginState.loading && !loginState.data && loginState.error) {
      ToastAlert(`${loginState.error}!!!`, "error");
    }
  }, [loginState]);

  const handleLogin = () => {
    auth.signinRedirect();
  };

  return (
    <>
      {auth.isLoading ? (
        <Loader />
      ) : (
        <div className="d-flex align-items-center auth px-0 mt-3 login">
          <div className="row w-100 mx-0">
            <div className="col-lg-6 col-md-8 col-sm-10 mx-auto">
              <div className="auth-form-light text-center px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={logo} alt="logo" style={{ height: "10VH" }} />
                </div>
                <h2>{t("greeting")}</h2>
                <h4 className="font-weight-light">{t("sign-in-clause")}</h4>
                <Form className="pt-3">
                  <Row>
                    <Col className="col-lg-12">
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="email"
                          data-testid="email-input"
                          name="email"
                          placeholder={t("email-placeholder")}
                          onChange={handle}
                          required
                        />
                        {error.email.length > 0 && (
                          <Alert variant="danger" className="mt-2">
                            {t("email-error")}
                          </Alert>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <InputGroup>
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            name="password"
                            data-testid="password-input"
                            placeholder={t("password-placeholder")}
                            onChange={handle}
                          />
                          <PasswordButtons
                            viewPassword={showPassword}
                            setViewPassword={setShowpassword}
                          />
                        </InputGroup>
                        {error.password.length > 0 && (
                          <Alert variant="danger" className="mt-2">
                            {t("email-password")}
                          </Alert>
                        )}
                      </Form.Group>
                      <div className="mt-3">
                        <Button
                          data-testid="signin-button"
                          className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                          onClick={(e) => {
                            handleSubmit(e);
                          }}
                        >
                          {t("sign-in-button")}
                        </Button>
                      </div>
                      <div className="my-3 d-flex justify-content-between align-items-center">
                        <div className="form-check">
                          <label className="form-check-label text-muted">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              data-testid="keep-signed-in"
                            />
                            <i className="input-helper"></i>
                            {t("keep-signed-in")}
                          </label>
                        </div>
                        <Link
                          className="text-primary  font-weight-heavy"
                          to="/registration"
                        >
                          {t("registration-page-link")}
                        </Link>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-lg-12" style={{ textAlign: "center" }}>
                      <b>OR</b>
                    </Col>
                    <Col className="col-lg-12">
                      <div className="mt-3">
                        <h4 className="font-weight-light">
                          Sign in with KEYCLOAK
                        </h4>
                        <Button
                          data-testid="signin-button"
                          className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                          onClick={() => {
                            handleLogin();
                          }}
                        >
                          KEYCLOAK LOGIN
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
