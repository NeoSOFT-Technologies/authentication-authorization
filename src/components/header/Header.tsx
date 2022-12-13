import React, { useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useAuth } from "react-oidc-context";
// import { access, AuthGuard } from "../auth-guard/AuthGuard";

const Header = ({ authProvider }: any) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAuth();
  const { user, isAuthenticated } = useAuth();
  const toggle = () => setIsOpen(!isOpen);

  const logoutWithRedirect = () => {
    auth.removeUser();
    navigate("/login");
  };
  const loginWithRedirect = () => {
    auth.signinRedirect();
  };

  return (
    <div className="nav-container">
      <Navbar color="light" light expand="md">
        <Container>
          <img
            style={{ height: "5vh", marginRight: "10px" }}
            src="/global/images/logo.png"
            alt="logo"
          ></img>

          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <RouterNavLink
                  to="/landing"
                  className={({ isActive }) =>
                    isActive ? "router-link-exact-active" : "nav-link"
                  }
                >
                  Home
                </RouterNavLink>
              </NavItem>
              {/* {isAuthenticated && (
                <NavItem>
                  <RouterNavLink
                    to="/list"
                    className={({ isActive }) =>
                      isActive ? "router-link-exact-active" : "nav-link"
                    }
                  >
                    External API
                  </RouterNavLink>
                </NavItem>
              )} */}
              {isAuthenticated && (
                <NavItem>
                  <RouterNavLink
                    to="/resourceApis"
                    className={({ isActive }) =>
                      isActive ? "router-link-exact-active" : "nav-link"
                    }
                  >
                    Resource APIs
                  </RouterNavLink>
                </NavItem>
              )}
              {isAuthenticated && (
                <NavItem>
                  <RouterNavLink
                    to="/extendedApis"
                    className={({ isActive }) =>
                      isActive ? "router-link-exact-active" : "nav-link"
                    }
                  >
                    Extended APIs
                  </RouterNavLink>
                </NavItem>
              )}
              {/* {isAuthenticated && (
                <AuthGuard
                  resource={access.resources.Category}
                  scope={access.scopes.View}
                >
                  <NavItem>
                    <RouterNavLink
                      to="/category"
                      className={({ isActive }) =>
                        isActive ? "router-link-exact-active" : "nav-link"
                      }
                    >
                      Category
                    </RouterNavLink>
                  </NavItem>
                </AuthGuard>
              )}
              {isAuthenticated && (
                <AuthGuard
                  resource={access.resources.Event}
                  scope={access.scopes.View}
                >
                  <NavItem>
                    <RouterNavLink
                      to="/event"
                      className={({ isActive }) =>
                        isActive ? "router-link-exact-active" : "nav-link"
                      }
                    >
                      Event
                    </RouterNavLink>
                  </NavItem>
                </AuthGuard>
              )} */}
            </Nav>
            <Nav className="d-none d-md-block" navbar>
              {!isAuthenticated && (
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    className="btn-margin"
                    onClick={() => loginWithRedirect()}
                  >
                    Log in
                  </Button>
                </NavItem>
              )}
              {isAuthenticated && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret id="profileDropDown">
                    {user?.profile.picture ? (
                      <img
                        src={user?.profile.picture}
                        alt="Profile"
                        className="nav-user-profile rounded-circle"
                        width="50"
                      />
                    ) : (
                      <FontAwesomeIcon icon="user" className="mr-3" />
                    )}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>{user?.profile.name}</DropdownItem>
                    <DropdownItem header>
                      <FontAwesomeIcon icon="shield-alt" className="mr-3" />
                      {authProvider?.toUpperCase()}
                    </DropdownItem>
                    <DropdownItem
                      tag={RouterNavLink}
                      to="/profile"
                      className="dropdown-profile"
                      // activeClassName="router-link-exact-active"
                    >
                      <FontAwesomeIcon icon="user" className="mr-3" /> Profile
                    </DropdownItem>
                    <DropdownItem
                      id="qsLogoutBtn"
                      onClick={() => logoutWithRedirect()}
                    >
                      <FontAwesomeIcon icon="power-off" className="mr-3" />{" "}
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
            {!isAuthenticated && (
              <Nav className="d-md-none" navbar>
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    block
                    onClick={() => loginWithRedirect()}
                  >
                    Log in
                  </Button>
                </NavItem>
              </Nav>
            )}
            {isAuthenticated && (
              <Nav
                className="d-md-none justify-content-between"
                navbar
                style={{ minHeight: 170 }}
              >
                <NavItem>
                  <span className="user-info">
                    <img
                      src={user?.profile?.picture}
                      alt="Profile"
                      className="nav-user-profile d-inline-block rounded-circle mr-3"
                      width="50"
                    />
                    <h6 className="d-inline-block">{user?.profile?.name}</h6>
                  </span>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="user" className="mr-3" />
                  <RouterNavLink
                    to="/profile"
                    // activeClassName="router-link-exact-active"
                  >
                    Profile
                  </RouterNavLink>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="power-off" className="mr-3" />
                  <RouterNavLink
                    to="#"
                    id="qsLogoutBtn"
                    onClick={() => logoutWithRedirect()}
                  >
                    Log out
                  </RouterNavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
