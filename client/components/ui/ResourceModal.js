import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import ResourceForm from "./ResourceForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
  height: "75%",
};

const ResourceModal = (props) => {
  const {
    handleClose,
    open,
    setValues,
    values,
    serviceNames,
    postCreatedResource,
  } = props;

  const handleChange = (prop) => (event) => {
    const {
      target: { value },
    } = event;

    setValues(() => {
      if (typeof value === "string") {
        return { ...values, [prop]: value.split(",") };
      } else {
        return { ...values, [prop]: event.target.value };
      }
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create A New Resource
        </Typography>
        <ResourceForm
          setValues={setValues}
          values={values}
          postCreatedResource={postCreatedResource}
          serviceNames={serviceNames}
        />
        <Box sx={{ m: 1, width: "100%" }}>
          <Button
            onClick={postCreatedResource}
            variant="contained"
            color="secondary"
          >
            Create
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ResourceModal;
