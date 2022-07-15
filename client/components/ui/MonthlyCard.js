import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import MonthlyChart from "./MonthlyChart";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import NavigateNext from "@mui/icons-material/NavigateNext";
import moment from "moment";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { purple, green } from "@mui/material/colors";

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
    typography: {
      color: "#fff",
    },
  });

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
        <StyledIconButton
          size="large"
          onClick={(e) => setCurrentCount((count) => (count -= 1))}
        >
          <NavigateBefore fontSize="large" />
        </StyledIconButton>
        <MonthlyChart chartData={getMonthChartData} />
        <StyledIconButton
          size="large"
          onClick={(e) => setCurrentCount((count) => (count += 1))}
        >
          <NavigateNext fontSize="large" />
        </StyledIconButton>
      </Box>
      <Box sx={{ width: "100%", margin: "2rem 0" }}>
        <Typography
          color={"secondary"}
          variant="caption"
          component="div"
          sx={{ textAlign: "center", fontSize: "1.4rem" }}
        >
          {getCurrentRange}
        </Typography>
      </Box>
    </>
  );
}

export default MonthlyCard;
