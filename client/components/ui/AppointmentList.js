import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import moment from "moment";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  ),
];

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

  return (
    <React.Fragment>
      <Title>Upcoming Appointments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Customer Name</TableCell>
            <TableCell>Appointment Date/Time</TableCell>
            <TableCell>Email Address</TableCell>
            <TableCell>Phone Number</TableCell>
            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredMonth.map((booking, i) => (
            <TableRow key={i}>
              <TableCell>
                {booking.first_name + " " + booking.last_name}
              </TableCell>
              <TableCell>
                {moment(booking.startDate).format("dddd, MMM Do YY HH:MM") +
                  " " +
                  moment(booking.endDate).format("hh:mm LT")}
              </TableCell>

              <TableCell>{booking.email}</TableCell>
              <TableCell>{booking.phone_number}</TableCell>
              {/* <TableCell align="right">{`$${booking.amount}`}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more appointments
      </Link>
    </React.Fragment>
  );
}
