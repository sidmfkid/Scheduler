import { hot } from "react-hot-loader/root";
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./css/app.css";
import data from "../server/productData";
import Paper from "@mui/material/Paper";
import MenuAppBar from "./components/MenuAppBar";
import MenuDrawer from "./components/Drawer";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import { styled } from "@mui/material/styles";
import SellIcon from "@mui/icons-material/Sell";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import classNames from "clsx";

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
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";

const currentDate = "2022-11-01";
const schedulerData = data;
// const schedulerData = data.map((data) => {
//   return {
//     startDate: data.startDate,
//     endDate: data.endDate,
//     title: "Consultation",
//     id: data.id,
//   };
// });
console.log(schedulerData);

const localizer = momentLocalizer(moment);

//https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/guides/getting-started/

const App = () => {
  const [getData, setData] = useState({
    data: schedulerData,
    currentDate: "2022-10-01",
  });

  function commitChanges({ added, changed, deleted }) {
    setData((state) => {
      let { data } = state;
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

  const PREFIX = "Demo";

  const classes = {
    icon: `${PREFIX}-icon`,
    textCenter: `${PREFIX}-textCenter`,
    // firstRoom: `${PREFIX}-firstRoom`,
    // secondRoom: `${PREFIX}-secondRoom`,
    // thirdRoom: `${PREFIX}-thirdRoom`,
    header: `${PREFIX}-header`,
    commandButton: `${PREFIX}-commandButton`,
  };

  const StyledGrid = styled(Grid)(() => ({
    [`&.${classes.textCenter}`]: {
      textAlign: "center",
      alignSelf: "start",
    },
  }));

  const StyledGridServices = styled(Grid)(() => ({
    [`&.${classes.textCenter}`]: {
      textAlign: "center",
      alignSelf: "start",
      marginTop: 3,
    },
  }));

  const StyledPerson = styled(PersonIcon)(({ theme: { palette } }) => ({
    [`&.${classes.icon}`]: {
      color: palette.action.active,
    },
  }));

  const StyledSellIcon = styled(SellIcon)(({ theme: { palette } }) => ({
    [`&.${classes.icon}`]: {
      color: palette.action.active,
    },
  }));

  const Content = ({ children, appointmentData, ...restProps }) => (
    <AppointmentTooltip.Content
      {...restProps}
      appointmentData={appointmentData}
    >
      <Grid container alignItems="center">
        <StyledGrid item xs={2} className={classes.textCenter}>
          <StyledPerson className={classes.icon} />
        </StyledGrid>
        <Grid item xs={10}>
          <span>
            {appointmentData.first_name + " " + appointmentData.last_name}
          </span>
        </Grid>
        <StyledGridServices item xs={2} className={classes.textCenter}>
          <StyledSellIcon className={classes.icon} />
        </StyledGridServices>
        <Grid item xs={10}>
          <List>
            {appointmentData.services.map((data) => {
              return (
                <>
                  <ListItem disablePadding disableGutters>
                    <ListItemText primary={data.name} />
                  </ListItem>
                  <Divider />
                </>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </AppointmentTooltip.Content>
  );

  return (
    <Paper>
      <MenuAppBar />

      <Scheduler data={schedulerData}>
        <ViewState defaultCurrentDate={getData.currentDate} />
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <DayView startDayHour={9} endDayHour={14} />
        <WeekView startDayHour={10} endDayHour={19} />
        <MonthView />
        <Toolbar />
        <ViewSwitcher />
        <DateNavigator />
        <TodayButton />
        <Appointments />
        <AppointmentTooltip
          showCloseButton
          showOpenButton
          contentComponent={Content}
        />
        <AppointmentForm />
      </Scheduler>
    </Paper>
  );
};

export default hot(App);
