import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import { styled } from "@mui/material/styles";
import SellIcon from "@mui/icons-material/Sell";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
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
import classNames from "clsx";

import data from "../../../server/productData";

const Appointment = (props) => {
  const getData = props.getData;
  const setData = props.setData;

  // useEffect(() => {
  //   axios
  //     .get("/appointments/all")
  //     .then((res) => setAppointmentData(res.data))
  //     .then((data) => console.log(data, getData));
  // }, []);

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

  // function setAppointmentData(data) {
  //   console.log(data.data[1].customer.email);
  //   const newArr = data.data.map((booking) => {
  //     if (booking.customer) {
  //       return {
  //         startDate: booking.startDate,
  //         endDate: booking.endDate,
  //         email: booking.customer.email || "",
  //         first_name: booking.customer.first_name,
  //         last_name: booking.customer.last_name,
  //         phone_number: booking.customer.phone_number,
  //         services: booking.services,
  //         title: "Consultation",
  //       };
  //     } else {
  //       return {
  //         startDate: booking.startDate,
  //         endDate: booking.endDate,
  //         services: booking.services,
  //         title: "Consultation",
  //       };
  //     }
  //   });
  //   setData({ data: newArr, currentDate: currentDate.currentDate });
  // }

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
            {appointmentData.customer
              ? appointmentData.customer.first_name +
                " " +
                appointmentData.customer.last_name
              : ""}
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
                    <ListItemText primary={data.title} />
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
    <Scheduler data={getData.data}>
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
  );
};

export default Appointment;
