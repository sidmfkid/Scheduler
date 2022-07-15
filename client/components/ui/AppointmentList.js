import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import { TableRow, Typography } from "@mui/material";
import Title from "./Title";
import moment from "moment";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { purple, green } from "@mui/material/colors";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

function preventDefault(event) {
  event.preventDefault();
}

export default function AppointmentList(props) {
  const getData = props.getData;
  const currentDate = getData.currentDate;
  const bookingData = getData.data;
  const currentMonth = moment(currentDate)
    .startOf("month")
    .format("YYYY-MM-DD");
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
  console.log(filteredMonth);

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
      <Title>Upcoming Appointments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="#fff">Customer Name</Typography>
            </TableCell>
            <TableCell>
              <Typography color="#fff">Appointment Date/Time</Typography>
            </TableCell>
            <TableCell>
              <Typography color="#fff">Email Address</Typography>
            </TableCell>
            <TableCell>
              <Typography color="#fff">Phone Number</Typography>
            </TableCell>
            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredMonth.map((booking, i) => (
            <TableRow key={i}>
              <TableCell>
                <Typography color="#fff">
                  {booking.first_name + " " + booking.last_name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="#fff">
                  {moment(booking.startDate).format("dddd, MMM Do YY HH:MM") +
                    " " +
                    moment(booking.endDate).format("hh:mm LT")}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography color="#fff">{booking.email}</Typography>
              </TableCell>
              <TableCell>
                <Typography color="#fff">{booking.phone_number}</Typography>
              </TableCell>
              {/* <TableCell align="right">{`$${booking.amount}`}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more appointments
      </Link>
    </ThemeProvider>
  );
}
