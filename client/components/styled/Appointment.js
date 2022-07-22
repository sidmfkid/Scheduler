import React from "react";
import { Paper, Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SellIcon from "@mui/icons-material/Sell";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import {
  Scheduler,
  Appointments,
  ViewSwitcher,
  Toolbar,
  AppointmentTooltip,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";

import { createTheme, styled, alpha } from "@mui/material/styles";
import { purple, green } from "@mui/material/colors";
import Appointment from "../routes/Appointment";
import data from "../../../server/appointmentData";

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

const PREFIX = "CUSTOM";

const classes = {
  icon: `${PREFIX}-icon`,
  textCenter: `${PREFIX}-textCenter`,
  // firstRoom: `${PREFIX}-firstRoom`,
  // secondRoom: `${PREFIX}-secondRoom`,
  // thirdRoom: `${PREFIX}-thirdRoom`,
  header: `${PREFIX}-header`,
  toolBar: `${PREFIX}-toolBar`,
  toolTip: `${PREFIX}-toolTip`,
  todayButton: `${PREFIX}-todayButton`,
  viewSwitcher: `${PREFIX}-viewSwitcher`,
  commandButton: `${PREFIX}-commandButton`,
  todayCell: `${PREFIX}-todayCell`,
  weekendCell: `${PREFIX}-weekendCell`,
  today: `${PREFIX}-today`,
  weekend: `${PREFIX}-weekend`,
  scheduler: `${PREFIX}-scheduler`,
  appointmentForm: `${PREFIX}-appointmentForm`,
  container: `${PREFIX}-container`,
  text: `${PREFIX}-text`,
};

const StyledToolbar = styled(Toolbar.Root)(({ theme }) => ({
  [`&.${classes.toolBar}`]: {
    backgroundColor: alpha(theme.palette.secondary.dark, 0.4),
    color: "#fff",
    "&:hover": {
      backgroundColor: alpha(theme.palette.secondary.dark, 0.4),
    },
    "&:focus": {
      backgroundColor: alpha(theme.palette.secondary.dark, 0.4),
    },
  },
}));

const ToolbarCustom = (props) => {
  return <StyledToolbar {...props} className={classes.toolBar} />;
};

const StyledViewSwitcher = styled(ViewSwitcher.Switcher)(({ theme }) => ({
  [`&.${classes.viewSwitcher}`]: {
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
    },
    "&:focus": {
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
    },
  },
}));

const ViewSwticherCustom = (props) => {
  return <StyledViewSwitcher {...props} className={classes.viewSwitcher} />;
};

const StyledScheduler = styled(Scheduler.Root)(({ theme }) => ({
  [`&.${classes.scheduler}`]: {
    backgroundColor: alpha("#000", 0.15),
    color: "#fff",
    borderRadius: "10px",
    border: `1px solid ${theme.palette.primary.dark}`,
    borderSpacing: 0,
    borderCollapse: "collapse",
    overflow: "hidden",
    "&:hover": {
      backgroundColor: alpha("#000", 0.15),
    },
    "&:focus": {
      backgroundColor: alpha("#000", 0.15),
    },
  },
}));

const SchedulerCustom = (props) => {
  return <StyledScheduler {...props} className={classes.scheduler} />;
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.secondary.dark, 0.17),
  borderRadius: "10px",
  // overflow: "hidden",
}));

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
    color: palette.primary.main,
  },
}));

const StyledSellIcon = styled(SellIcon)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: palette.primary.main,
  },
}));

const LayoutContent = ({ children, style, appointmentData, ...restProps }) => (
  <AppointmentTooltip.Layout
    {...restProps}
    appointmentData={appointmentData}
    style={{
      ...style,
    }}
    className={classes.toolTip}
  >
    {children}
  </AppointmentTooltip.Layout>
);

const Content = ({ children, style, appointmentData, ...restProps }) => (
  <AppointmentTooltip.Content
    {...restProps}
    appointmentData={appointmentData}
    style={{
      ...style,
      background: alpha(theme.palette.secondary.dark, 0.9),
      color: "white",
      fill: "white",
    }}
  >
    <Grid container alignItems="center">
      <StyledGrid item xs={2} className={classes.textCenter}>
        <StyledPerson className={classes.icon} />
      </StyledGrid>
      {console.log(appointmentData, "APPOINTMENT DATA")}
      <Grid item xs={10}>
        <span>
          {appointmentData
            ? appointmentData.first_name + " " + appointmentData.last_name
            : ""}
        </span>
      </Grid>
      <StyledGridServices item xs={2} className={classes.textCenter}>
        <StyledSellIcon className={classes.icon} />
      </StyledGridServices>
      <Grid item xs={10}>
        <List>
          {appointmentData.serviceInfo.map((data) => {
            return (
              <>
                <ListItem disablePadding disableGutters>
                  <ListItemText primary={data.title} />
                </ListItem>
                <Divider
                  sx={{ background: alpha(theme.palette.primary.main, 0.7) }}
                />
              </>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={10}>
        {children}
      </Grid>
    </Grid>
  </AppointmentTooltip.Content>
);

const HeaderContent = ({ children, style, appointmentData, ...restProps }) => (
  <AppointmentTooltip.Header
    {...restProps}
    appointmentData={appointmentData}
    style={{
      ...style,
      background: alpha(theme.palette.secondary.dark, 0.9),
      color: "white",
    }}
  >
    {children}
  </AppointmentTooltip.Header>
);

const AppointmentFormLayout = ({
  children,
  style,
  appointmentData,
  ...restProps
}) => (
  <AppointmentForm.Layout
    {...restProps}
    appointmentData={appointmentData}
    style={{
      ...style,
      background: alpha(theme.palette.secondary.dark, 0.9),
      color: "white",
    }}
    className={classes.appointmentForm}
  >
    {children}
  </AppointmentForm.Layout>
);

const AppointmentFormCommandLayout = ({
  children,
  style,
  appointmentData,
  ...restProps
}) => (
  <AppointmentForm.CommandLayout
    {...restProps}
    appointmentData={appointmentData}
    style={{
      ...style,
      background: alpha(theme.palette.secondary.dark, 0.9),
      color: "white",
    }}
    className={classes.appointmentForm}
  >
    {children}
  </AppointmentForm.CommandLayout>
);

const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === "multilineTextEditor") {
    return null;
  }
  return <AppointmentForm.TextEditor {...props} />;
};

const RadioGroup = (props) => {
  return <AppointmentForm.RadioGroup {...props} />;
};

const RadioSelect = (props) => {
  const servicesArr = props.appointmentData.services.map((data) => {
    return { id: data._id, text: data.title };
  });
  return <AppointmentForm.Select availableOptions={servicesArr} {...props} />;
};

const AppointmentEl = ({ children, style, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: alpha(theme.palette.secondary.dark, 0.3),
      color: theme.palette.secondary.light,
      borderColor: theme.palette.secondary.light,
      borderRadius: "6px",
    }}
  >
    {children}
  </Appointments.Appointment>
);

const AppointmentContent = ({
  children,
  style,
  appointmentData,
  ...restProps
}) => (
  <Appointments.AppointmentContent
    {...restProps}
    style={{
      ...style,
      color: theme.palette.secondary.light,
      borderRadius: "6px",
    }}
  >
    {children}
  </Appointments.AppointmentContent>
);
export {
  StyledPaper,
  LayoutContent,
  SchedulerCustom,
  ToolbarCustom,
  ViewSwticherCustom,
  Content,
  HeaderContent,
  AppointmentFormLayout,
  AppointmentFormCommandLayout,
  TextEditor,
  RadioGroup,
  AppointmentEl,
  AppointmentContent,
  classes,
};
