import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { BrowserRouter } from "react-router-dom";

import Profile from "./Profile";

it("render without crashing Error401", () => {
  render(
    <BrowserRouter>
      <Profile />
    </BrowserRouter>
  );
});
