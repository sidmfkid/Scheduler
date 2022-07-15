import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Flasher, flash } from "react-universal-flash";
import Message from "./components/ui/Message";
import CssBaseline from "@mui/material/CssBaseline";

render(
  <BrowserRouter>
    <Flasher>
      <Message />
    </Flasher>
    <CssBaseline>
      <App />
    </CssBaseline>
  </BrowserRouter>,
  document.getElementById("root")
);
