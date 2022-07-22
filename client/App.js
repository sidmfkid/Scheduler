import { hot } from "react-hot-loader/root";
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./css/app.css";
import data from "../server/productData";
import { Box } from "@mui/material/";
import MenuAppBar from "./components/MenuAppBar";
import { Routes, Route, Link } from "react-router-dom";
import Appointment from "./components/routes/Appointment";
import MyCalendar from "./components/routes/Calendar";
import Dashboard from "./components/routes/Dashboard";
import Services from "./components/routes/Services";
import Settings from "./components/routes/Settings";
import Availability from "./components/routes/Availability";
import Plans from "./components/routes/Plans";
import Resources from "./components/routes/Resources";
import { purple, green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// const schedulerData = data.map((data) => {
//   return {
//     startDate: data.startDate,
//     endDate: data.endDate,
//     title: "Consultation",
//     id: data.id,
//   };
// });

// const localizer = momentLocalizer(moment);
//https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/guides/getting-started/

const App = () => {
  const schedulerData = data;
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [getPageTitle, setPageTitle] = useState();

  let theme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: purple[800],
      },
      secondary: {
        main: green.A400,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100vh",
          background: `linear-gradient( to right top,${theme.palette.primary.main}, ${theme.palette.primary.light})`,
        }}
      >
        {/* radial-gradient(ellipse at top, #ce6bfe, #ff9dfe, transparent, #00e676da 60%, transparent),radial-gradient(ellipse at center, #00e676d6, #6a1b9a, transparent) */}

        <Box
          position={"absolute"}
          width={"25%"}
          height={"25%"}
          zIndex="0"
          sx={{
            display: "none",
            background: "radial-gradient(circle, #66ffa6, transparent 70%)",
            filter: "blur(100px)",
            animation: "25s ease-in-out 1s  infinite alternate gradientSkew2",
            top: "0px",
            left: "900px",
            mixBlendMode: "overlay",
          }}
        />

        <Box
          position={"absolute"}
          width={"25%"}
          height={"75%"}
          zIndex="0"
          sx={{
            display: "none",

            background: "radial-gradient(circle, #37006a, transparent 70%)",
            filter: "blur(70px)",
            mixBlendMode: "overlay",
            transform: "rotate(45deg)",
            opacity: ".6",
            // animation: "25s ease-in-out 1s  infinite alternate gradientSkew2",
            top: "290px",
            left: "450px",
          }}
        />
        <Box
          sx={{
            position: "relative",
            zIndex: "2",
            overflowX: "hidden",
            height: "100%",
          }}
        >
          <Box
            position={"fixed"}
            width={"100%"}
            height={"100%"}
            zIndex="-1"
            sx={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1573614999645-e5f0f16ec15d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')",

              filter: "blur(100px)",
              mixBlendMode: "plus-light",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              top: "0px",
              left: "0px",
            }}
          />
          <MenuAppBar setPageTitle={setPageTitle} getPageTitle={getPageTitle} />
          <Routes>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/" element={<MyCalendar />} />
            <Route path="appointments" element={<MyCalendar />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="availability" element={<Availability />} />
            <Route path="plans" element={<Plans />} />
            <Route path="resources" element={<Resources />} />
            <Route
              path="services"
              element={
                <Services
                  success={success}
                  setSuccess={setSuccess}
                  error={error}
                  setError={setError}
                  loading={loading}
                  setLoading={setLoading}
                />
              }
            />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default hot(App);
