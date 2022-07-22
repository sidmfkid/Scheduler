import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Badge from "@mui/material/Badge";
import Image from "mui-image";
import Checkbox from "@mui/material/Checkbox";
import { Button, CircularProgress } from "@mui/material";
import {
  styled,
  createTheme,
  ThemeProvider,
  alpha,
} from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";
import EditProductModal from "./EditProductModal";

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const NoList = () => {
  return (
    <ListItem>
      <ListItemText
        primary="No Products Imported Yet! Click The Button Above To Start Importing Your
        Products/Services"
      ></ListItemText>
    </ListItem>
  );
};

const ServiceList = (props) => {
  const checked = props.checked;
  const setChecked = props.setChecked;
  const getAllProducts = props.getAllProducts;
  const imported = props.imported;
  const isFetched = props.isFetched;
  const { success, error, loading, setSaved, isSaved } = props;

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const allTagsUsed = imported.map((data) =>
    data.tags !== "[object Undefined]" ? data.tags : "Undefined"
  );
  const allTags = [...new Set(allTagsUsed)];

  let ListEls = getAllProducts.map((product, i) => {
    const filter = imported.filter(
      (data) => data.shopify_id === product.id
    ).length;
    const labelId = `checkbox-list-secondary-label-${product.id}`;

    if (filter > 0) {
      return (
        <ListItem
          key={product.id}
          secondaryAction={
            <Box sx={{ display: "inline-block", position: "relative" }}>
              <EditProductModal
                setSaved={setSaved}
                isSaved={isSaved}
                imported={imported[i]}
                allTags={allTags}
              />
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: green[500],
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Box>
          }
          disablePadding
          sx={{
            width: "calc(20rem + 20vw)",
            backgroundColor: alpha(theme.palette.secondary.dark, 0.4),
          }}
        >
          <Item sx={{ width: "100%" }}>
            <ListItemButton>
              <Image width="calc(5rem + 1.5vw)" src={product.images[0].src} />
              <Badge
                sx={{ width: "auto", transform: "translateX(50px)" }}
                badgeContent={
                  product.status === "active" ? "Published" : "Unpublished"
                }
                color={product.status === "active" ? "success" : "danger"}
              />
              <Badge
                sx={{ width: "auto", transform: "translateX(150px)" }}
                badgeContent={"Imported"}
                color={"warning"}
              />
              <ListItemText
                sx={{
                  width: "10%",
                  display: "block",
                  margin: "0 0 0 2rem",
                  textAlign: "center",
                  color: "white",
                }}
                id={labelId}
                primary={`${product.title}`}
              />
            </ListItemButton>
          </Item>
        </ListItem>
      );
    } else {
      return (
        <ListItem
          key={product.id}
          secondaryAction={
            <Checkbox
              edge="end"
              onChange={handleToggle(product)}
              checked={checked.indexOf(product) !== -1}
              inputProps={{ "aria-labelledby": labelId }}
            />
          }
          disablePadding
          sx={{
            width: "calc(20rem + 20vw)",
            backgroundColor: alpha(theme.palette.primary.light, 0.4),
          }}
        >
          <Item sx={{ width: "100%" }}>
            <ListItemButton>
              <Image width="calc(5rem + 1.5vw)" src={product.images[0].src} />
              <Badge
                sx={{ width: "auto", transform: "translateX(50px)" }}
                badgeContent={
                  product.status === "active" ? "Published" : "Unpublished"
                }
                color={product.status === "active" ? "success" : "danger"}
              ></Badge>
              <ListItemText
                sx={{
                  width: "10%",
                  display: "block",
                  margin: "0 0 0 2rem",
                  textAlign: "center",
                  color: "white",
                }}
                id={labelId}
                primary={`${product.title}`}
              />
            </ListItemButton>
          </Item>
        </ListItem>
      );
    }
  });

  return (
    <Box sx={{ width: "100%" }}>
      <List
        dense
        sx={{
          width: "100%",
          bgcolor: "transparent",
          padding: "0 2rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        {isFetched === true ? ListEls : <NoList />}
      </List>
    </Box>
  );
};

export default ServiceList;
