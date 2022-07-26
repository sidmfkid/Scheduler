import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { Paper, Box, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SellIcon from "@mui/icons-material/Sell";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import moment from "moment";
import { flash } from "react-universal-flash";
import axios from "axios";
import MyCalendar from "./Calendar";
import AppointmentNew from "../ui/AppointmentNew";

// const TextEditor = (props) => {
//   // eslint-disable-next-line react/destructuring-assignment
//   if (props.type === "multilineTextEditor") {
//     return null;
//   }
//   return <AppointmentForm.TextEditor {...props} />;
// };

// const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
//   const onCustomFieldChange = (nextValue) => {
//     onFieldChange({ customField: nextValue });
//   };

//   return (
//     <AppointmentForm.BasicLayout
//       appointmentData={appointmentData}
//       onFieldChange={onFieldChange}
//       {...restProps}
//     >
//       <AppointmentForm.Label text="Customer's Name" type="title" />
//       <AppointmentForm.TextEditor
//         value={appointmentData.first_name + " " + appointmentData.last_name}
//         onValueChange={onCustomFieldChange}
//         placeholder="Custom field"
//       />
//     </AppointmentForm.BasicLayout>
//   );
// };

// const StyledDiv = styled("div")(({ theme }) => ({
//   [`&.${classes.container}`]: {
//     display: "flex",
//     marginBottom: theme.spacing(2),
//     justifyContent: "flex-end",
//   },
//   [`& .${classes.text}`]: {
//     ...theme.typography.h6,
//     marginRight: theme.spacing(2),
//   },
// }));

// const ResourceSwitcher = ({ mainResourceName, onChange, resources }) => (
//   <StyledDiv className={classes.container}>
//     <div className={classes.text}>Main resource name:</div>
//     <Select
//       variant="standard"
//       value={mainResourceName}
//       onChange={(e) => onChange(e.target.value)}
//     >
//       {resources.map((resource) => (
//         <MenuItem key={resource.fieldName} value={resource.fieldName}>
//           {resource.title}
//         </MenuItem>
//       ))}
//     </Select>
//   </StyledDiv>
// );

const Appointment = (props) => {
  const [services, setServices] = useState([]);
  const [resources, setResources] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    startDate: new Date(),
    endData: new Date(),
    customer: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
    },
    services: [],
    assigned_resource: [],
    store: "",
  });

  useEffect(() => {
    getServices();
    getResources();
    return () => {
      console.log("cleanup");
    };
  }, []);

  useEffect(() => {
    console.log(newAppointment);
    return () => {
      console.log("clean");
    };
  }, [newAppointment]);

  function getServices() {
    axios
      .get("/services/all")
      .then((res) => setServices(res.data.data.importedServices));
  }

  function getResources(params) {
    axios.get("/resources/all").then((res) => setResources(res.data.data));
  }

  return (
    <Box sx={{ padding: "2rem 4rem" }}>
      <AppointmentNew
        services={services}
        resources={resources}
        newAppointment={newAppointment}
        setNewAppointment={setNewAppointment}
      />
      <MyCalendar />
    </Box>
  );
};

export default Appointment;
