import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import moment from "moment";

import ResourceModal from "../ui/ResourceModal";
import ResourceList from "../ui/ResourceList";

const CreateResourceButton = (props) => {
  const [open, setOpen] = useState(false);
  const [serviceNames, setServiceNames] = useState([]);
  const { values, setValues, modalType, setModalType, setResourceEdit } = props;
  const handleOpen = () => {
    setModalType("create");
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchServices();
    clearValues();
    () => {
      console.log("cleanUp");
    };
  }, [modalType]);
  console.log(values);

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

  function clearValues() {
    setValues(() => {
      return {
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
      };
    });
  }
  function postCreatedResource() {
    console.log("clicked");
    axios
      .post("/resources/new", { body: values })
      .then((res) => {
        console.log(res);
        setResourceEdit(true);
      })
      .catch((error) => console.log(error));
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
        modalType={modalType}
      />
    </div>
  );
};

const Resources = () => {
  const [getResources, setResources] = useState([]);
  const [serviceNames, setServiceNames] = useState([]);
  const [currentEdit, setCurrentEdit] = useState(0);
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
  const [modalType, setModalType] = useState("");
  const [open, setOpen] = useState(false);
  const [resourceEdit, setResourceEdit] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setModalType("edit");
    setOpen(true);
  };

  useEffect(() => {
    fetchResources();
    fetchServices();
    console.log(getResources);
    return () => {
      setResourceEdit(false);
      console.log("cleanup");
    };
  }, [resourceEdit]);

  function editCreatedResource() {
    console.log("clicked");
    axios
      .post("/resources/edit", { body: values })
      .then((res) => {
        console.log(res);
        setResourceEdit(true);
      })
      .catch((error) => console.log(error));
  }

  function deleteCreatedResource() {
    console.log("clicked");
    axios
      .post("/resources/delete", { body: values })
      .then((res) => {
        console.log(res);
        setResourceEdit(true);
      })
      .catch((error) => console.log(error));
  }

  function fetchResources() {
    axios.get("/resources/all").then((res) => {
      const resources = res.data.data;
      resources.map((resource) => {
        resource.services = resource.services.map((v) => v.title);
      });
      console.log(resources, "resources with services mapped");
      setResources(res.data.data);
    });
  }

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

  return (
    <Box sx={{ padding: "2rem 4rem" }}>
      <CreateResourceButton
        resources={getResources}
        setValues={setValues}
        values={values}
        setModalType={setModalType}
        modalType={modalType}
        setResourceEdit={setResourceEdit}
      />
      <ResourceList
        setCurrentEdit={setCurrentEdit}
        currentEdit={currentEdit}
        resources={getResources}
        handleOpen={handleOpen}
        setValues={setValues}
        values={values}
        setModalType={setModalType}
        modalType={modalType}
      />
      <ResourceModal
        setResourceEdit={setResourceEdit}
        deleteCreatedResource={deleteCreatedResource}
        resources={getResources[currentEdit]}
        open={open}
        handleClose={handleClose}
        setValues={setValues}
        values={values}
        setModalType={setModalType}
        editCreatedResource={editCreatedResource}
        modalType={modalType}
        serviceNames={serviceNames}
      />
    </Box>
  );
};

export default Resources;
