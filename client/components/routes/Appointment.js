import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { Paper, Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SellIcon from "@mui/icons-material/Sell";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import moment from "moment";
import { flash } from "react-universal-flash";
import axios from "axios";

import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
  ViewSwitcher,
  MonthView,
  DateNavigator,
  TodayButton,
  Toolbar,
  WeekView,
  AppointmentTooltip,
  Resources,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import classNames from "clsx";
import { connectProps } from "@devexpress/dx-react-core";

import {
  createTheme,
  ThemeProvider,
  styled,
  alpha,
} from "@mui/material/styles";
import { purple, green } from "@mui/material/colors";
import {
  StyledPaper,
  LayoutContent,
  SchedulerCustom,
  ToolbarCustom,
  ViewSwticherCustom,
  Content,
  HeaderContent,
  AppointmentFormLayout,
  AppointmentFormCommandLayout,
  classes,
  AppointmentEl,
  AppointmentContent,
} from "../styled/Appointment";

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
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isFetched, setFetched] = useState(false);
  const date = moment().format().split("T");
  let theme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: purple[800],
      },
      secondary: {
        main: green.A400,
      },
    },
    typography: {
      color: "#fff",
    },
  });

  const currentDate = date[0];
  const [getData, setData] = useState({
    data: [],
    mainResourceName: "services",
    resources: [
      {
        fieldName: "services",
        title: "Services",
        instances: [],
      },
    ],
  });

  useEffect(() => {
    if (isFetched === false) {
      getAppointmentData();
    }

    if (error) {
      flash("Oops looks like something went wrong", 5000, "error");
    }
    if (success) {
      flash("Success!", 4000, "success");
    }
    if (loading) {
      flash("Loading, One moment please", 3000, "info");
    }
    // return function cleanUp() {
    //   getAppointmentData();
    //   setError(false);
    //   setSuccess(false);
    //   setLoading(false);
    // };
  }, []);

  async function getAppointmentData() {
    setLoading(true);

    axios
      .get("/services/import")
      .then((res) => {
        setData((data) => {
          return {
            ...data,
            resources: [
              {
                instances: [
                  res.data.data[0].services.map((data) => {
                    console.log(data);
                    return {
                      id: data.title,
                      text: data.title,
                    };
                  }),
                ],
              },
            ],
          };
        });
        console.log(res.data.data[0].services);
        console.log(getData);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });

    axios
      .get("/appointments/all")
      .then((res) => {
        setAppointmentData(res.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        console.log(error);
      });

    setSuccess(true);
    setLoading(false);
  }

  function setAppointmentData(data) {
    const usaTime = (date) =>
      new Date(date).toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
      });
    const newArr = data.data.map((booking) => {
      const startDate = moment(booking.startDate).format("YYYY-DD-MMTHH:mm");
      const endDate = moment(booking.endDate).format("YYYY-DD-MMTHH:mm");
      if (booking.customer) {
        return {
          id: booking._id,
          startDate: booking.startDate,
          endDate: booking.endDate,
          email: booking.customer.email || "",
          first_name: booking.customer.first_name,
          last_name: booking.customer.last_name,
          phone_number: booking.customer.phone_number,
          services: booking.services.map((data) => {
            return data.title;
          }),
          title: "Consultation",
        };
      } else {
        return {
          id: booking._id,
          startDate: booking.startDate,
          endDate: booking.endDate,
          services: booking.services.map((data) => {
            return data.title;
          }),
          title: "Consultation",
        };
      }
    });
    // const resourceArr = data.data.map();
    setData((data) => {
      return { ...data, data: newArr };
    });
  }

  console.log(getData);

  // function changeMainResource(mainResourceName) {
  //   setResources({ mainResourceName });
  // }

  function commitChanges({ added, changed, deleted }) {
    setData((state) => {
      let { data } = state;
      console.log(data);
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return { data };
    });
  }

  // const appointmentData = getData.data.map((data) => {
  //   return {
  //     id: data.id,
  //     startDate: data.startDate,
  //     endDate: data.endDate,
  //     title: "Consultation",
  //     services: data.services,
  //   };
  // });
  // const { data, resources } = state;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: "2rem 4rem" }}>
        {/* <ResourceSwitcher
          resources={resources}
          mainResourceName={mainResourceName}
          onChange={this.changeMainResource}
        /> */}
        <StyledPaper elevation={8} background="transparent">
          <Scheduler data={getData.data}>
            <ViewState defaultCurrentDate={currentDate} />
            <EditingState onCommitChanges={commitChanges} />
            <IntegratedEditing />
            <DayView startDayHour={9} endDayHour={14} />
            <WeekView
              // timeTableCellComponent={TimeTableCell}
              startDayHour={10}
              endDayHour={19}
            />
            <MonthView />
            <Toolbar
            // rootComponent={ToolbarCustom}
            />
            <ViewSwitcher
            //  switcherComponent={ViewSwticherCustom}
            />
            <DateNavigator />
            <TodayButton />
            <Appointments
            // appointmentComponent={AppointmentEl}
            // appointmentContentComponent={AppointmentContent}
            />
            <AppointmentTooltip
              showCloseButton
              showOpenButton
              // contentComponent={Content}
              // headerComponent={HeaderContent}
              // layoutComponent={LayoutContent}
            />
            <AppointmentForm
            // layoutComponent={AppointmentFormLayout}
            // commandLayoutComponent={AppointmentFormCommandLayout}
            // basicLayoutComponent={BasicLayout}
            // textEditorComponent={TextEditor}
            // radioGroupComponent={RadioGroup}
            />
            <Resources
              data={getData.resources}
              mainResourceName={getData.mainResourceName}
            />
          </Scheduler>
        </StyledPaper>
      </Box>
    </ThemeProvider>
  );
};

export default Appointment;

// import * as React from "react";
// import Paper from "@mui/material/Paper";
// import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
// import {
//   Scheduler,
//   Resources,
//   MonthView,
//   Appointments,
//   AppointmentTooltip,
//   AppointmentForm,
//   EditRecurrenceMenu,
//   DragDropProvider,
// } from "@devexpress/dx-react-scheduler-material-ui";
// // import { owners } from "../../../demo-data/tasks";
// // import { appointments, resourcesData } from "../../../demo-data/resources";
// const appointments = [
//   {
//     title: "Website Re-Design Plan",
//     startDate: new Date(2018, 5, 25, 12, 35),
//     endDate: new Date(2018, 5, 25, 15, 0),
//     id: 0,
//     members: [1, 3, 5],
//     location: "Room 1",
//   },
//   {
//     title: "Book Flights to San Fran for Sales Trip",
//     startDate: new Date(2018, 5, 26, 12, 35),
//     endDate: new Date(2018, 5, 26, 15, 0),
//     id: 1,
//     members: [2, 4],
//     location: "Room 2",
//   },
//   {
//     title: "Install New Router in Dev Room",
//     startDate: new Date(2018, 5, 27, 12, 35),
//     endDate: new Date(2018, 5, 27, 15, 0),
//     id: 2,
//     members: [3],
//     location: "Room 3",
//   },
//   {
//     title: "Approve Personal Computer Upgrade Plan",
//     startDate: new Date(2018, 5, 28, 12, 35),
//     endDate: new Date(2018, 5, 28, 15, 0),
//     id: 3,
//     members: [4, 1],
//     location: "Room 4",
//   },
//   {
//     title: "Final Budget Review",
//     startDate: new Date(2018, 5, 29, 12, 35),
//     endDate: new Date(2018, 5, 29, 15, 0),
//     id: 4,
//     members: [5, 1, 3],
//     location: "Room 5",
//   },
// ];

// export default class Appointment extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: appointments,
//       mainResourceName: "members",
//       resources: [
//         {
//           fieldName: "location",
//           title: "Location",
//           instances: [
//             { id: "Room 1", text: "Room 1" },
//             { id: "Room 2", text: "Room 2" },
//             { id: "Room 3", text: "Room 3" },
//             { id: "Room 4", text: "Room 4" },
//             { id: "Room 5", text: "Room 5" },
//           ],
//         },
//         {
//           fieldName: "members",
//           title: "Members",
//           allowMultiple: true,
//           instances: [
//             { id: 1, text: "Andrew Glover" },
//             { id: 2, text: "Arnie Schwartz" },
//             { id: 3, text: "John Heart" },
//             { id: 4, text: "Taylor Riley" },
//             { id: 5, text: "Brad Farkus" },
//           ],
//         },
//       ],
//     };

//     this.commitChanges = this.commitChanges.bind(this);
//   }

//   commitChanges({ added, changed, deleted }) {
//     this.setState((state) => {
//       let { data } = state;
//       if (added) {
//         const startingAddedId =
//           data.length > 0 ? data[data.length - 1].id + 1 : 0;
//         data = [...data, { id: startingAddedId, ...added }];
//       }
//       if (changed) {
//         data = data.map((appointment) =>
//           changed[appointment.id]
//             ? { ...appointment, ...changed[appointment.id] }
//             : appointment
//         );
//       }
//       if (deleted !== undefined) {
//         data = data.filter((appointment) => appointment.id !== deleted);
//       }
//       return { data };
//     });
//   }

//   render() {
//     const { data, resources } = this.state;

//     return (
//       <Paper>
//         <Scheduler data={data}>
//           <ViewState defaultCurrentDate="2018-06-27" />
//           <EditingState onCommitChanges={this.commitChanges} />
//           <EditRecurrenceMenu />

//           <MonthView />
//           <Appointments />
//           <AppointmentTooltip showOpenButton />
//           <AppointmentForm />

//           <Resources data={resources} mainResourceName="roomId" />
//           <DragDropProvider />
//         </Scheduler>
//       </Paper>
//     );
//   }
// }
