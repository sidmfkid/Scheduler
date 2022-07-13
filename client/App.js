import { hot } from "react-hot-loader/root";
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./css/app.css";
import data from "../server/productData";
import Paper from "@mui/material/Paper";
import MenuAppBar from "./components/MenuAppBar";
import { Routes, Route, Link } from "react-router-dom";
import Appointment from "./components/routes/Appointment";
import Dashboard from "./components/routes/Dashboard";
import Services from "./components/routes/Services";
import Settings from "./components/routes/Settings";
import Availability from "./components/routes/Availability";
import Plans from "./components/routes/Plans";
import Resources from "./components/routes/Resources";
import axios from "axios";

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
  const date = moment().format().split("T");

  const schedulerData = data;
  const currentDate = date[0];
  const [getPageTitle, setPageTitle] = useState();
  const [getData, setData] = useState({
    data: schedulerData,
    currentDate: currentDate,
  });

  useEffect(() => {
    axios
      .get("/appointments/all")
      .then((res) => setAppointmentData(res.data))
      .then((data) => console.log(data, getData));
  }, []);

  function setAppointmentData(data) {
    console.log(data.data[1].customer.email);
    const newArr = data.data.map((booking) => {
      if (booking.customer) {
        return {
          startDate: booking.startDate,
          endDate: booking.endDate,
          email: booking.customer.email || "",
          first_name: booking.customer.first_name,
          last_name: booking.customer.last_name,
          phone_number: booking.customer.phone_number,
          services: booking.services,
          title: "Consultation",
        };
      } else {
        return {
          startDate: booking.startDate,
          endDate: booking.endDate,
          services: booking.services,
          title: "Consultation",
        };
      }
    });
    setData({ data: newArr, currentDate: currentDate });
  }

  return (
    <Paper>
      <MenuAppBar setPageTitle={setPageTitle} getPageTitle={getPageTitle} />
      <Routes>
        <Route
          path=""
          element={<Dashboard currentDate={currentDate} getData={getData} />}
        />
        <Route
          path="/"
          element={
            <Appointment
              currentDate={currentDate}
              getData={getData}
              setData={setData}
            />
          }
        />
        <Route
          path="appointments"
          element={
            <Appointment
              currentDate={currentDate}
              getData={getData}
              setData={setData}
            />
          }
        />
        <Route
          path="dashboard"
          element={<Dashboard currentDate={currentDate} getData={getData} />}
        />
        <Route path="availability" element={<Availability />} />
        <Route path="plans" element={<Plans />} />
        <Route path="resources" element={<Resources />} />
        <Route path="services" element={<Services />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </Paper>
  );
};

export default hot(App);
