import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MonthlyChart from "./MonthlyChart";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import NavigateNext from "@mui/icons-material/NavigateNext";
import moment from "moment";

function MonthlyCard(props) {
  const [getMonthChartData, setMonthChartData] = useState([]);
  const [getCurrentCount, setCurrentCount] = useState(0);
  const [getCurrentRange, setCurrentRange] = useState();
  const getData = props.getData;
  const bookingData = getData.data;

  const currentDate = getData.currentDate;

  useEffect(() => {
    setMonth();
  }, [getCurrentCount]);

  const selectedMonth =
    getCurrentCount >= 0
      ? moment(currentDate)
          .endOf("month")
          .add(getCurrentCount, "month")
          .format("YYYY-MM-DD")
      : moment(currentDate)
          .endOf("month")
          .subtract(Math.abs(getCurrentCount), "month")
          .format("YYYY-MM-DD");
  let daysOfMonth = moment(selectedMonth).endOf("month").format("D");

  let graphDays = () => {
    let arr = [];
    for (let i = 1; i <= Number(daysOfMonth); i++) {
      arr.push({
        name: i,
        Appointments: [],
      });
    }
    return arr;
  };

  function setMonth() {
    let allDays = graphDays();
    const selectedMonthFormated = moment(selectedMonth).format("MMMM");
    const selectedMonthYearFormated = moment(selectedMonth).format("YYYY");

    setCurrentRange(selectedMonthFormated + " " + selectedMonthYearFormated);

    let filteredMonth = bookingData.filter((data) => {
      let bookingMonth = moment(data.startDate)
        .endOf("month")
        .format("YYYY-MM-DD");

      if (selectedMonth === bookingMonth) {
        return data;
      } else {
        return;
      }
    });

    let daysOfMonth = moment(selectedMonth).endOf("month").format("D");

    filteredMonth.map((day) => {
      const dayNum = Number(moment(day.startDate).format("D"));
      const graphFilter = allDays.filter((days) => days.name === dayNum).length;

      if (graphFilter > 0 && allDays[dayNum]) {
        allDays[dayNum].Appointments.push(day);
      }
    });

    let MonthlyChartData = allDays.map((days) => {
      return { name: days.name, Appointments: days.Appointments.length };
    });
    setMonthChartData(MonthlyChartData);
  }

  return (
    <>
      <Box>
        <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
          Monthly View
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
        <MonthlyChart chartData={getMonthChartData} />
        <Button
          sx={{ display: "block" }}
          onClick={(e) => setCurrentCount((count) => (count += 1))}
          variant="text"
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

export default MonthlyCard;
