import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material/";

function createData(name, email, phone_number, availability, type) {
  return { name, email, phone_number, availability, type };
}

function ResourceList(props) {
  const { resources, handleOpen, currentEdit, setCurrentEdit } = props;

  return (
    <TableContainer sx={{ mt: 3 }} component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {resources.map((data, i) => {
            return (
              <TableRow key={data.name}>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.resourceType}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.phone_number}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setCurrentEdit(i);
                      handleOpen();
                    }}
                    size="small"
                    variant="contained"
                    color="primary"
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ResourceList;
