import React, { useState, useEffect } from "react";
import moment from "moment";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Table, TableBody, TableCell, TableRow } from "@mui/material";

function SummaryCard(props) {
  const filteredWeek = props.filteredWeek;
  const filteredMonth = props.filteredMonth;

  return (
    <Box>
      <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
        Summary Overview
      </Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>This Weeks Appoointment Total:</TableCell>
            <TableCell>{filteredWeek.length}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>This Months Appointment Total:</TableCell>
            <TableCell>{filteredMonth.length}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}

export default SummaryCard;
