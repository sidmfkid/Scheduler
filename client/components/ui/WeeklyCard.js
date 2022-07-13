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
import Box from "@mui/material/Box";

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

  console.log(getCurrentRange);

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
            .format("YYYY-MM-DD")
        : moment(currentDate)
            .startOf("week")
            .subtract(Math.abs(getCurrentCount), "week")
            .format("YYYY-MM-DD");

    let selectedWeekEnd =
      getCurrentCount > 0
        ? moment(currentDate)
            .endOf("week")
            .add(getCurrentCount, "week")
            .format("YYYY-MM-DD")
        : moment(currentDate)
            .endOf("week")
            .subtract(Math.abs(getCurrentCount), "week")
            .format("YYYY-MM-DD");

    let range = `${selectedWeekStart} to ${selectedWeekEnd}`;
    setCurrentRange(range);
  }

  return (
    <>
      <Box>
        <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
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
        <Button
          onClick={(e) => setCurrentCount((count) => (count -= 1))}
          sx={{ display: "block" }}
          variant="text"
        >
          <NavigateBefore />
        </Button>
        <WeeklyChart
          chartData={getWeekChartData || chartData}
          graphDays={graphDays}
          filteredWeek={filteredWeek}
        />

        <Button
          onClick={(e) => setCurrentCount((count) => (count += 1))}
          variant="text"
          sx={{ display: "block" }}
        >
          <NavigateNext />
        </Button>
      </Box>
      <Box sx={{ width: "100%", margin: "2rem 0" }}>
        <Typography
          variant="caption"
          component="div"
          sx={{ textAlign: "center" }}
        >
          {getCurrentRange}
        </Typography>
      </Box>
    </>
  );
}

export default WeeklyCard;
