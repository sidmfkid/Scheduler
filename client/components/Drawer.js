import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import ScheduleIcon from "@mui/icons-material/Schedule";
import InventoryIcon from "@mui/icons-material/Inventory";
import SettingsIcon from "@mui/icons-material/Settings";
import SellIcon from "@mui/icons-material/Sell";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import { green, purple } from "@mui/material/colors";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

export default function MenuDrawer(props) {
  const state = props.state;
  const toggleDrawer = props.toggleDrawer;
  const anchor = "left";
  const routes = [
    "Dashboard",
    "Appointments",
    "Resources",
    "Avilability",
    "Services",
  ];
  const bottomRoutes = ["Settings", "Plan & Pricing"];
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

  const StyledBox = styled(Box)(({ theme }) => ({
    width: "300px",
    height: "100%",
    background: "linear-gradient(120deg, #37006abd , #9b4dcbb3)",
    color: theme.palette.getContrastText(theme.palette.primary.main),
  }));

  const list = (anchor) => (
    <StyledBox
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {routes.map((text, index) => (
          <Link key={text} to={"/" + text}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {text === routes[0] ? <DashboardIcon /> : ""}
                  {text === routes[1] ? <CalendarMonthIcon /> : ""}
                  {text === routes[2] ? <PermContactCalendarIcon /> : ""}
                  {text === routes[3] ? <ScheduleIcon /> : ""}
                  {text === routes[4] ? <InventoryIcon /> : ""}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {bottomRoutes.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {text === bottomRoutes[0] ? <SettingsIcon /> : ""}
                {text === bottomRoutes[1] ? <SellIcon /> : ""}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </StyledBox>
  );

  return (
    <Drawer
      sx={{ background: "linear-gradient(120deg, #37006abd 60%, #9b4dcbb3)" }}
      anchor={anchor}
      open={state[anchor]}
      onClose={toggleDrawer(anchor, false)}
    >
      {list(anchor)}
    </Drawer>
  );
}
