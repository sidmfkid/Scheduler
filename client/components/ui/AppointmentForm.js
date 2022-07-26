import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Autocomplete,
} from "@mui/material/";
import AdapterMoment from "@date-io/moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function AppointmentForm(props) {
  const { services, resources, newAppointment, setNewAppointment } = props;
  // const [change, setChange] = useState(false);

  const selectedServices = newAppointment.services
    .map((serv, i) => {
      return serv.resources;
    })
    .flat();

  const filteredResources = selectedServices.filter((val, index, self) => {
    return (
      index ===
      self.findIndex((t) => {
        return t.name === val.name && t._id === val._id;
      })
    );
  });
  console.log(newAppointment.customer);
  const resourceSelect =
    newAppointment.services.length > 0 ? (
      <Autocomplete
        multiple
        id="tags-standard"
        options={filteredResources}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => {
          setNewAppointment((vals) => {
            return {
              ...vals,
              assigned_resources: newValue,
            };
          });
        }}
        value={newAppointment.resources}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Select Resources"
            placeholder="Resources"
          />
        )}
      />
    ) : (
      <Autocomplete
        disabled
        multiple
        id="tags-standard"
        options={filteredResources}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => {
          setNewAppointment((vals) => {
            return {
              ...vals,
              assigned_resources: newValue,
            };
          });
        }}
        value={newAppointment.resources}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Select Resources"
            placeholder="Resources"
          />
        )}
      />
    );

  return (
    <Box>
      <Typography
        sx={{ mt: 2, mb: 1 }}
        id="modal-modal-title"
        variant="h6"
        component="h3"
      >
        Select Services
      </Typography>
      <Autocomplete
        onChange={(event, newValue) => {
          setNewAppointment((vals) => {
            return {
              ...vals,
              services: newValue,
            };
          });
        }}
        multiple
        id="tags-standard"
        options={services}
        getOptionLabel={(option) => option.title}
        value={newAppointment.services}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Select Services"
            placeholder="Services"
          />
        )}
      />
      <Typography
        sx={{ mt: 2 }}
        id="modal-modal-title"
        variant="h6"
        component="h3"
      >
        Select Resources
      </Typography>
      {resourceSelect}
      <Typography
        sx={{ mt: 2, mb: 2 }}
        id="modal-modal-title"
        variant="h6"
        component="h3"
      >
        Customer Info
      </Typography>
      <Box sx={{ gap: 2, display: "flex" }}>
        <TextField
          variant="outlined"
          label="First Name"
          value={newAppointment.customer.first_name}
          onChange={(e) => {
            setNewAppointment((vals) => {
              return {
                ...vals,
                customer: {
                  ...vals.customer,
                  first_name: e.target.value,
                },
              };
            });
          }}
        />
        <TextField
          variant="outlined"
          label="Last Name"
          value={newAppointment.customer.last_name}
          onChange={(e) => {
            setNewAppointment((vals) => {
              return {
                ...vals,
                customer: {
                  ...vals.customer,
                  last_name: e.target.value,
                },
              };
            });
          }}
        />
      </Box>
      <Box sx={{ mt: 2, gap: 2, display: "flex" }}>
        <TextField
          variant="outlined"
          label="Email"
          value={newAppointment.customer.email}
          onChange={(e) => {
            setNewAppointment((vals) => {
              return {
                ...vals,
                customer: {
                  ...vals.customer,
                  email: e.target.value,
                },
              };
            });
          }}
        />
        <TextField
          variant="outlined"
          label="Phone Number"
          value={newAppointment.customer.phone_number}
          onChange={(e) => {
            setNewAppointment((vals) => {
              return {
                ...vals,
                customer: {
                  ...vals.customer,
                  phone_number: e.target.value,
                },
              };
            });
          }}
        />
      </Box>
      <Box sx={{ mt: 2, gap: 2, display: "flex" }}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            label="Start Date"
            value={newAppointment.startDate}
            onChange={(newVal) => {
              setNewAppointment((vals) => {
                return {
                  ...vals,
                  startDate: newVal,
                };
              });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            label="End Date"
            value={newAppointment.endDate}
            onChange={(newVal) => {
              setNewAppointment((vals) => {
                return {
                  ...vals,
                  endDate: newVal,
                };
              });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      {/* <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateTimePicker
          value={newAppointment.startDate}
          label="Start Date And Time"
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Typography
        sx={{ my: 2 }}
        id="modal-modal-title"
        variant="h6"
        component="h3"
      >
        End Time
      </Typography>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateTimePicker
          value={newAppointment.endDate}
          label="End Date And Time"
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider> */}
    </Box>
  );
}

export default AppointmentForm;
