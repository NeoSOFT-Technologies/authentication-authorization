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
            <Route path="/update" element={<Update />} />
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
