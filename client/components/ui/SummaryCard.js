import React, { useState, useEffect } from "react";
import moment from "moment";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { purple, green } from "@mui/material/colors";

function SummaryCard(props) {
  const filteredWeek = props.filteredWeek;
  const filteredMonth = props.filteredMonth;

  const StyledBox = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: "#fff",
  }));

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
      <StyledBox>
        <Typography
          color="#fff"
          variant="h6"
          component="div"
          sx={{ textAlign: "center" }}
        >
          Summary Overview
        </Typography>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography color="#fff">
                  This Weeks Appoointment Total:
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color={theme.palette.secondary.light}>
                  {filteredWeek.length}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography color="#fff">
                  This Months Appointment Total:
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color={theme.palette.secondary.light}>
                  {filteredMonth.length}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </StyledBox>
    </ThemeProvider>
  );
}

export default SummaryCard;
