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
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import EditProductModal from "./EditProductModal";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
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

  const { success, error, loading } = props;

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

  let ListEls = getAllProducts.map((product) => {
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
              <EditProductModal imported={imported} />
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
      <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
        {isFetched === true ? ListEls : <NoList />}
      </List>
    </Box>
  );
};

export default ServiceList;
