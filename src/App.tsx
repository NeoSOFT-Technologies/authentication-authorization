import React from "react";
import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import CallbackPage from "./pages/callback/CallbackPage";
import Profile from "./pages/profile/Profile";
import Header from "./components/header/Header";
import { Container } from "reactstrap";
import initFontAwesome from "./utils/init-font-awesome";
import Footer from "./components/footer/Footer";
import Create from "./pages/mock-data/Create";
import Update from "./pages/mock-data/Update";
import List from "./pages/mock-data/List";
import { access, AuthGuard } from "./components/auth-guard/AuthGuard";
import CreateCategory from "./pages/category/Create";
import Delete from "./pages/category/Delete";
import View from "./pages/category/View";
import ResourceAPIs from "./pages/resource-apis/ResourceAPIs";
import CreateEvent from "./pages/event/CreateEvent";
import DeleteEvent from "./pages/event/DeleteEvent";
import ViewEvent from "./pages/event/ViewEvent";
import UpdateEvent from "./pages/event/UpdateEvent";
initFontAwesome();

function App({ authProvider }: any) {
  return (
    <div className="App">
      <BrowserRouter>
        <Header authProvider={authProvider} />
        <Container className="flex-grow-1 mt-3 main-panel">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path={"/landing"} element={<LandingPage />} />
            <Route path={"/callback"} element={<CallbackPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/list" element={<List />} />
            <Route path="/create" element={<Create />} />
            {/* <Route path="/update" element={<Update />} /> */}
            <Route path="/resourceApis" element={<ResourceAPIs />} />
            <Route
              path="/viewCategory"
              element={
                <AuthGuard
                  resource={access.resources.Category}
                  scope={access.scopes.View}
                  protect={access.protect}
                >
                  <View />
                </AuthGuard>
              }
            />
            <Route
              path="/createCategory"
              element={
                <AuthGuard
                  resource={access.resources.Category}
                  scope={access.scopes.Create}
                  protect={access.protect}
                >
                  <CreateCategory />
                </AuthGuard>
              }
            />
            <Route
              path="/updateCategory"
              element={
                <AuthGuard
                  resource={access.resources.Category}
                  scope={access.scopes.Edit}
                  protect={access.protect}
                >
                  <Update />
                </AuthGuard>
              }
            />
            <Route
              path="/deleteCategory"
              element={
                <AuthGuard
                  resource={access.resources.Category}
                  scope={access.scopes.Delete}
                  protect={access.protect}
                >
                  <Delete />
                </AuthGuard>
              }
            />
            <Route
              path="/viewEvent"
              element={
                <AuthGuard
                  resource={access.resources.Event}
                  scope={access.scopes.View}
                  protect={access.protect}
                >
                  <ViewEvent />
                </AuthGuard>
              }
            />
            <Route
              path="/createEvent"
              element={
                <AuthGuard
                  resource={access.resources.Event}
                  scope={access.scopes.Create}
                  protect={access.protect}
                >
                  <CreateEvent />
                </AuthGuard>
              }
            />
            <Route
              path="/updateEvent"
              element={
                <AuthGuard
                  resource={access.resources.Event}
                  scope={access.scopes.Edit}
                  protect={access.protect}
                >
                  <UpdateEvent />
                </AuthGuard>
              }
            />
            <Route
              path="/deleteEvent"
              element={
                <AuthGuard
                  resource={access.resources.Event}
                  scope={access.scopes.Delete}
                  protect={access.protect}
                >
                  <DeleteEvent />
                </AuthGuard>
              }
            />
            <Route
              path="/viewOrder"
              element={
                <AuthGuard
                  resource={access.resources.Order}
                  scope={access.scopes.View}
                  protect={access.protect}
                >
                  <LandingPage />
                </AuthGuard>
              }
            />
            <Route
              path="/createOrder"
              element={
                <AuthGuard
                  resource={access.resources.Order}
                  scope={access.scopes.Create}
                  protect={access.protect}
                >
                  <LandingPage />
                </AuthGuard>
              }
            />
            <Route
              path="/updateOrder"
              element={
                <AuthGuard
                  resource={access.resources.Order}
                  scope={access.scopes.Edit}
                  protect={access.protect}
                >
                  <LandingPage />
                </AuthGuard>
              }
            />
            <Route
              path="/deleteOrder"
              element={
                <AuthGuard
                  resource={access.resources.Order}
                  scope={access.scopes.Delete}
                  protect={access.protect}
                >
                  <LandingPage />
                </AuthGuard>
              }
            />
            <Route
              path="/viewUser"
              element={
                <AuthGuard
                  resource={access.resources.User}
                  scope={access.scopes.View}
                  protect={access.protect}
                >
                  <LandingPage />
                </AuthGuard>
              }
            />
            <Route
              path="/createUser"
              element={
                <AuthGuard
                  resource={access.resources.User}
                  scope={access.scopes.Create}
                  protect={access.protect}
                >
                  <LandingPage />
                </AuthGuard>
              }
            />
            <Route
              path="/updateUser"
              element={
                <AuthGuard
                  resource={access.resources.User}
                  scope={access.scopes.Edit}
                  protect={access.protect}
                >
                  <LandingPage />
                </AuthGuard>
              }
            />
            <Route
              path="/deleteUser"
              element={
                <AuthGuard
                  resource={access.resources.User}
                  scope={access.scopes.Delete}
                  protect={access.protect}
                >
                  <LandingPage />
                </AuthGuard>
              }
            />
            {/* redirect if not match any path */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
