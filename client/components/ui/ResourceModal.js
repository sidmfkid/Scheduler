import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ResourceForm from "./ResourceForm";
import moment from "moment";

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
    modalType,
    resources,
    editCreatedResource,
    deleteCreatedResource,
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

  if (modalType === "create") {
    console.log(serviceNames);

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
            modalType={modalType}
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
  }

  if (modalType === "edit") {
    useEffect(() => {
      selectResource();
      return () => {
        console.log("cleanUp");
      };
    }, [open]);
    console.log(values);

    function selectResource() {
      setValues(() => {
        return {
          ...resources,
        };
      });
    }
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
            modalType={modalType}
            resources={resources}
            open={open}
            serviceNames={serviceNames}
          />
          <Box sx={{ m: 1, width: "100%" }}>
            <Button
              onClick={editCreatedResource}
              variant="contained"
              color="secondary"
            >
              Update
            </Button>
            <Button
              sx={{ ml: 2 }}
              onClick={() => {
                deleteCreatedResource();
                handleClose();
              }}
              variant="contained"
              color="warning"
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  }
  if (modalType === "") {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <ResourceForm
          setValues={setValues}
          values={values}
          modalType={modalType}
          resources={resources}
          open={open}
        /> */}
      </Modal>
    );
  }
};

export default ResourceModal;
