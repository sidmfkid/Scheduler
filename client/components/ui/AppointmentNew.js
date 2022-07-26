import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Modal } from "@mui/material/";
import AppointmentForm from "./AppointmentForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "calc(30rem + 10vw)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function AppointmentNew(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { services, resources, newAppointment, setNewAppointment } = props;

  return (
    <Box sx={{ mb: 3 }}>
      <Button onClick={handleOpen} variant="contained" color="secondary">
        Add New Appointment
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create New Appointment
          </Typography>
          <AppointmentForm
            services={services}
            resources={resources}
            newAppointment={newAppointment}
            setNewAppointment={setNewAppointment}
          />
        </Box>
      </Modal>
    </Box>
  );
}

export default AppointmentNew;
