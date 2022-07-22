import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Input,
  Select,
  MenuItem,
  Chip,
  Button,
  OutlinedInput,
  InputLabel,
  FormControl,
  TextField,
  FormHelperText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple, green } from "@mui/material/colors";
import axios from "axios";
import AdapterMoment from "@date-io/moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import moment from "moment";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ResourceForm = (props) => {
  const { values, setValues, serviceNames, postCreatedResource } = props;
  //   const serviceNames = values.services.map((serv) => serv.title);

  const handleChange = (prop) => (event) => {
    const {
      target: { value },
    } = event;

    console.log(values);
    setValues(() => {
      if (typeof value === "string" && prop === "services") {
        return { ...values, [prop]: value.split(",") };
      } else {
        return { ...values, [prop]: event.target.value };
      }
    });
  };

  const handleAvailabilityChange = (prop, type) => (event) => {
    console.log(prop, "props");
    console.log(event, "event");
    // console.log(event.target.value, "event.target.value");
    console.log(type, "type");
    console.log(values, "values");

    if (type === "switch") {
      const {
        target: { value },
      } = event;

      return setValues((prevState) => {
        return {
          ...prevState,
          availability: {
            ...prevState.availability,
            [prop]: {
              ...prevState.availability[prop],
              available: prevState.availability[prop].available ? false : true,
            },
          },
        };
      });
    }

    if (type === "start") {
      return setValues((prevState) => {
        return {
          ...prevState,
          availability: {
            ...prevState.availability,
            [prop]: {
              ...prevState.availability[prop],
              start: event._isValid
                ? event._d
                : prevState.availability[prop].start,
            },
          },
        };
      });
    }

    if (type === "end") {
      return setValues((prevState) => {
        return {
          ...prevState,
          availability: {
            ...prevState.availability,
            [prop]: { ...prevState.availability[prop], end: event },
          },
        };
      });
    }
  };

  const theme = createTheme({
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
    <Box component="form" sx={{ width: "calc(30rem + 10vw)" }}>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Box sx={{ width: "100%" }}>
          <Typography variant="h6">Resource Name</Typography>
        </Box>
        <TextField
          label="Name"
          onChange={handleChange("name")}
          id="resourceName"
          defaultValue={values.name}
          sx={{ m: 1, width: "100%" }}
        />
        <Box sx={{ width: "100%" }}>
          <Typography variant="h6">Contact Info</Typography>
        </Box>
        <TextField
          label="Email"
          onChange={handleChange("email")}
          id="outlined-start-adornment"
          defaultValue={values.email}
          sx={{ m: 1, width: "auto" }}
        />
        <TextField
          label="Phone Number"
          onChange={handleChange("phone_number")}
          id="outlined-start-adornment"
          defaultValue={values.phone_number}
          sx={{ m: 1, width: "auto" }}
        />
        <Box sx={{ width: "100%" }}>
          <Typography variant="h6">Resource Settings</Typography>
        </Box>
        <FormControl sx={{ m: 1, width: "auto" }}>
          <TextField
            label="Type"
            onChange={handleChange("resourceType")}
            id="outlined-start-adornment"
            defaultValue={values.type}
          />
          <FormHelperText>Ex: Room, Staff, Equipment etc</FormHelperText>
        </FormControl>

        <FormControl sx={{ m: 1, width: "100%" }}>
          <InputLabel id="services">Services</InputLabel>
          <Select
            labelId="services"
            id="services"
            multiple
            value={values.services}
            onChange={handleChange("services")}
            input={<OutlinedInput id="services" label="services" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {serviceNames.map((name) => (
              <MenuItem
                key={name.title}
                value={name.title}
                style={getStyles(name.title, values.services, theme)}
              >
                {name.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TableContainer>
          <Table>
            <TableHead>
              <TableCell>WeekDay</TableCell>
              <TableCell align="center">Available</TableCell>
              <TableCell align="center">Start Time</TableCell>
              <TableCell align="center">End Time</TableCell>
            </TableHead>
            <TableBody>
              {["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"].map(
                (day) => {
                  return (
                    <TableRow key={day}>
                      <TableCell scope="row">{day}</TableCell>
                      <TableCell align="center">
                        <Switch
                          value={values.availability[day].available}
                          onChange={handleAvailabilityChange(day, "switch")}
                        />
                      </TableCell>

                      <TableCell sx={{ maxWidth: "30rem" }} align="center">
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <TimePicker
                            label="Basic example"
                            value={values.availability[day].start}
                            onChange={handleAvailabilityChange(day, "start")}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </TableCell>
                      <TableCell sx={{ maxWidth: "30rem" }} align="center">
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <TimePicker
                            label="Basic example"
                            value={values.availability[day].end}
                            onChange={handleAvailabilityChange(day, "end")}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Box>
  );
};

export default ResourceForm;
