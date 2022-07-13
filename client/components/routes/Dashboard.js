import React, { useState, useEffect } from "react";
import { Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import WeeklyCard from "../ui/WeeklyCard";
import MonthlyCard from "../ui/MonthlyCard";
import moment from "moment";
import { Week } from "react-big-calendar";
import AppointmentList from "../ui/AppointmentList";
import SummaryCard from "../ui/SummaryCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Dashboard = (props) => {
  const getData = props.getData;

  const bookingData = getData.data;
  const currentDate = getData.currentDate;

  const currentMonth = moment(currentDate)
    .startOf("month")
    .format("YYYY-MM-DD");
  let currentWeek = moment(currentDate).startOf("week").format("YYYY-MM-DD");

  const filteredMonth = bookingData.filter((data) => {
    const bookingMonth = moment(data.startDate)
      .startOf("month")
      .format("YYYY-MM-DD");

    if (currentMonth === bookingMonth) {
      return data;
    } else {
      return;
    }
  });

  const filteredWeek = bookingData.filter((data) => {
    const bookingWeek = moment(data.startDate)
      .startOf("week")
      .format("YYYY-MM-DD");

    if (currentWeek === bookingWeek) {
      return data;
    } else {
      return;
    }
  });

  let graphDays = {
    Sun: [],
    Mon: [],
    Tues: [],
    Wed: [],
    Thurs: [],
    Fri: [],
    Sat: [],
  };
  filteredWeek.map((day) => {
    const bookingDay = moment(day.startDate).format("ddd");

    switch (bookingDay) {
      case "Sun":
        graphDays.Sun.push(day);
      case "Mon":
        graphDays.Mon.push(day);
      case "Tues":
        graphDays.Tues.push(day);
      case "Wed":
        graphDays.Wed.push(day);
      case "Thurs":
        graphDays.Thurs.push(day);
      case "Fri":
        graphDays.Fri.push(day);
      case "Sat":
        graphDays.Sat.push(day);
      default:
        break;
    }
  });

  const chartData = [
    {
      name: "Sun",
      Appointments: graphDays.Sun.length,
    },
    {
      name: "Mon",
      Appointments: graphDays.Mon.length,
    },
    {
      name: "Tues",
      Appointments: graphDays.Tues.length,
    },
    {
      name: "Wed",
      Appointments: graphDays.Wed.length,
    },
    {
      name: "Thurs",
      Appointments: graphDays.Thurs.length,
    },
    {
      name: "Fri",
      Appointments: graphDays.Fri.length,
    },
    {
      name: "Sat",
      Appointments: graphDays.Sat.length,
    },
  ];

  console.log(filteredMonth, filteredWeek, graphDays, chartData);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6}>
        <Item sx={{ marginTop: "2rem" }}>
          <WeeklyCard
            getData={getData}
            chartData={chartData}
            graphDays={graphDays}
            filteredWeek={filteredWeek}
          />
        </Item>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Item sx={{ marginTop: "2rem" }}>
          <MonthlyCard getData={getData} filteredMonth={filteredMonth} />
        </Item>
      </Grid>
      <Grid item xs={12} sm={8} md={8}>
        <Item>
          <AppointmentList getData={getData} />
        </Item>
      </Grid>

      <Grid item xs={12} sm={4} md={4}>
        <Item>
          <SummaryCard
            filteredWeek={filteredWeek}
            filteredMonth={filteredMonth}
          />
        </Item>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
