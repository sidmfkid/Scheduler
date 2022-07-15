import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box } from "@mui/material";
import { green, purple } from "@mui/material/colors";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const MonthlyChart = (props) => {
  const data = props.chartData;
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
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "80%",
          height: "auto",
          display: "block",
        }}
      >
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              stroke={theme.palette.secondary.light}
              strokeDasharray="5 5"
            />
            <XAxis stroke={theme.palette.secondary.light} dataKey="name" />
            <YAxis stroke={theme.palette.secondary.light} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Appointments" fill={green.A400} />
            {/* <Bar dataKey="uv" stackId="a" fill="#82ca9d" /> */}
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </ThemeProvider>
  );
};

export default MonthlyChart;
