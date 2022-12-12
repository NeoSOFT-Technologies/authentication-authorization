import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Loader from "../../components/loader/Loader";
import { useAuth } from "react-oidc-context";
import ReactJson from "react-json-view";
import { useNavigate } from "react-router";

export const ProfileComponent = () => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading]);

  return !isLoading && isAuthenticated ? (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={1}>
          {user?.profile.picture ? (
            <img
              src={user?.profile.picture}
              alt="Profile"
              width="50"
              className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
            />
          ) : (
            <img src="/global/images/user.png" alt="Profile" width="80" />
          )}
        </Col>
        <Col md>
          <h2>{user?.profile?.name}</h2>
          <p className="lead text-muted">{user?.profile?.email}</p>
        </Col>
      </Row>
      <Row>
        <Col md>
          <pre>
            <ReactJson
              src={{ user }}
              enableClipboard={true}
              collapseStringsAfterLength={80}
            />
          </pre>
        </Col>
      </Row>
    </Container>
  ) : (
    <Loader />
  );
};

export default ProfileComponent;
