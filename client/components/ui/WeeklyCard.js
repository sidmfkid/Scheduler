import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import moment from "moment";
import WeeklyChart from "./WeeklyChart";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import NavigateNext from "@mui/icons-material/NavigateNext";
import CardHeader from "@mui/material/CardHeader";
import { Box, IconButton } from "@mui/material/";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { purple, green } from "@mui/material/colors";

function WeeklyCard(props) {
  const [getWeekChartData, setWeekChartData] = useState([]);
  const [getCurrentCount, setCurrentCount] = useState(0);
  const [getCurrentRange, setCurrentRange] = useState();
  const chartData = props.chartData;
  const getData = props.getData;
  const bookingData = getData.data;
  const filteredWeek = props.filteredWeek;
  const currentDate = getData.currentDate;

  let graphDays = {
    Sun: [],
    Mon: [],
    Tues: [],
    Wed: [],
    Thurs: [],
    Fri: [],
    Sat: [],
  };

  useEffect(() => {
    setWeek();
    setRange();
    console.log("hello", getCurrentCount);
  }, [getCurrentCount]);

  console.log(bookingData, "WEEKLY CARD BOOKING DATA");

  function setWeek() {
    // setCount(e);
    let selectedWeek;

    selectedWeek =
      getCurrentCount > 0
        ? moment(currentDate)
            .startOf("week")
            .add(getCurrentCount, "week")
            .format("YYYY-MM-DD")
        : moment(currentDate)
            .startOf("week")
            .subtract(Math.abs(getCurrentCount), "week")
            .format("YYYY-MM-DD");

    let filteredWeek = bookingData.filter((data) => {
      let bookingWeek = moment(data.startDate)
        .startOf("week")
        .format("YYYY-MM-DD");

      if (selectedWeek === bookingWeek) {
        return data;
      } else {
        return;
      }
    });
    console.log(filteredWeek, "FILTERED WEEK WEEKLYCARD.JS");

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
      console.log(bookingDay);
      switch (bookingDay) {
        case "Sun":
          graphDays.Sun.push(day);
          break;
        case "Mon":
          graphDays.Mon.push(day);
          break;
        case "Tues":
          graphDays.Tues.push(day);
          break;
        case "Wed":
          graphDays.Wed.push(day);
          break;
        case "Thurs":
          graphDays.Thurs.push(day);
          break;
        case "Fri":
          graphDays.Fri.push(day);
          break;
        case "Sat":
          graphDays.Sat.push(day);
          break;
        default:
          break;
      }
    });

    let chartData = [
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
    console.log(chartData, "Chart Data");
    setWeekChartData((data) => chartData);
  }

  function setRange() {
    let selectedWeekStart =
      getCurrentCount > 0
        ? moment(currentDate)
            .startOf("week")
            .add(getCurrentCount, "week")
            .format("MMMM Do, YYYY")
        : moment(currentDate)
            .startOf("week")
            .subtract(Math.abs(getCurrentCount), "week")
            .format("MMMM Do, YYYY");

    let selectedWeekEnd =
      getCurrentCount > 0
        ? moment(currentDate)
            .endOf("week")
            .add(getCurrentCount, "week")
            .format("MMMM Do, YYYY")
        : moment(currentDate)
            .endOf("week")
            .subtract(Math.abs(getCurrentCount), "week")
            .format("MMMM Do, YYYY");

    let range = `${selectedWeekStart} to ${selectedWeekEnd}`;
    setCurrentRange(range);
  }

  const StyledIconButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: "rgba(135, 72, 174, 0.5)",
    boxShadow: "0px 1px 5px 0px rgba(65, 2, 104, 0.5)",
    borderRadius: "16px",
    color: theme.palette.getContrastText("rgba(135, 72, 174, 0.5)"),

    "&:hover": {
      backgroundColor: "#691b9985",
      boxShadow: "0px 1px 15px -5px rgba(65, 2, 104, 0.5)",
      borderRadius: "16px",

      color: theme.palette.getContrastText("#691b9985"),
    },
    "&:active": {
      backgroundColor: `${theme.palette.primary.light}`,
      borderRadius: "16px",
    },
    "&:focus": {
      boxShadow: `0 0 5px 0.1rem ${theme.palette.secondary.light}`,
      borderRadius: "16px",
    },
  }));

  return (
    <>
      <Box>
        <Typography
          color={"secondary"}
          variant="h5"
          fontWeight={500}
          component="div"
          sx={{ textAlign: "center" }}
        >
          Weekly View
        </Typography>
      </Box>
      <Box
        sx={{
          width: "unset",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
        }}
      >
        <StyledIconButton
          size="large"
          onClick={(e) => setCurrentCount((count) => (count -= 1))}
        >
          <NavigateBefore fontSize="large" />
        </StyledIconButton>
        <WeeklyChart
          chartData={getWeekChartData || chartData}
          graphDays={graphDays}
          filteredWeek={filteredWeek}
        />

        <StyledIconButton
          size="large"
          onClick={(e) => setCurrentCount((count) => (count += 1))}
        >
          <NavigateNext fontSize="large" />
        </StyledIconButton>
      </Box>
      <Box sx={{ width: "100%", margin: "2rem 0" }}>
        <Typography
          variant="caption"
          component="div"
          color={"secondary"}
          sx={{ textAlign: "center", fontSize: "1.4rem" }}
        >
          {getCurrentRange}
        </Typography>
      </Box>
    </>
  );
}

export default WeeklyCard;
