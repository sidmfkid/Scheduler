import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import moment from "moment";

import ResourceModal from "../ui/ResourceModal";

const CreateResourceButton = (props) => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone_number: "",
    services: [],
    blackout_dates: [],
    availability: {
      Sun: {
        available: false,
        start: moment(),
        end: moment(),
      },
      Mon: {
        available: false,
        start: moment(),
        end: moment(),
      },
      Tues: {
        available: false,
        start: moment(),
        end: moment(),
      },
      Wed: {
        available: false,
        start: moment(),
        end: moment(),
      },
      Thur: {
        available: false,
        start: moment(),
        end: moment(),
      },
      Fri: {
        available: false,
        start: moment(),
        end: moment(),
      },
      Sat: {
        available: false,
        start: moment(),
        end: moment(),
      },
    },
    resourceType: "",
  });
  const [serviceNames, setServiceNames] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchServices();

    () => {
      console.log(cleanUp);
    };
  }, []);

  function fetchServices() {
    function createData(title, id) {
      return { title, id };
    }

    axios
      .get("/services/all")
      .then((res) => res.data.data.importedServices)
      .then((data) => {
        const formattedData = data.map((v) => {
          return {
            id: v._id,
            title: v.title,
          };
        });
        setServiceNames(() =>
          formattedData.map((serv) => createData(serv.title, serv._id))
        );
      });
  }

  function postCreatedResource() {
    console.log("clicked");
    axios
      .post("/resources/new", { body: values })
      .then((res) => console.log(res));
  }

  // console.log(values.services);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Create New Resource
      </Button>
      <ResourceModal
        serviceNames={serviceNames}
        values={values}
        setValues={setValues}
        open={open}
        handleClose={handleClose}
        postCreatedResource={postCreatedResource}
      />
    </div>
  );
};

const Resources = () => {
  return (
    <Box sx={{ padding: "2rem 4rem" }}>
      <CreateResourceButton />
    </Box>
  );
};

export default Resources;
