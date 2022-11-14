import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { BrowserRouter } from "react-router-dom";

import CallbackPage from "./CallbackPage";

it("render without crashing Error401", () => {
  render(
    <BrowserRouter>
      <CallbackPage />
    </BrowserRouter>
  );
});
