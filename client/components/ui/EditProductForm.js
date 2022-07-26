import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Input, Select, MenuItem, Chip, Button } from "@mui/material/";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple, green } from "@mui/material/colors";
import axios from "axios";
import data from "../../../server/productData";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
});

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function getHours(num) {
  return Math.floor(num / 60);
}

function getMinutes(num) {
  return (num / 60 - getHours(num)) * 60;
}

export default function EditProductForm(props) {
  const { imported, allTags, setSaved, isSaved, resources } = props;
  const tags = allTags;
  const importedHours = getHours(imported.duration);
  const importedMinutes = getMinutes(imported.duration);

  const resourcesSelected = resources.map((res) => {
    const titles = res.services.map((v) => v.title);
    if (titles.includes(imported.title)) {
      return res.name;
    }
  });

  const [values, setValues] = useState({
    id: imported._id,
    hours: importedHours || "",
    minutes: importedMinutes || "",
    title: imported.title,
    resources:
      typeof resourcesSelected === [undefined] ? [] : resourcesSelected,
    tags: imported.tags.includes("[object Undefined]")
      ? ["Undefined"]
      : [imported.tags],
    details: imported.details,
  });

  const names = resources.map((res) => {
    return {
      name: res.name,
      _id: res._id,
    };
  });
  console.log(values, resourcesSelected, "AllValues");

  useEffect(() => {
    if (isSaved) {
      handleSave();
    }
  }, [isSaved]);

  const handleChange = (prop) => (event) => {
    const {
      target: { value },
    } = event;

    setValues(() => {
      if (
        event.target.id === "resource" ||
        (event.target.id === "tags" && typeof value === "string")
      ) {
        return { ...values, [prop]: value.split(",") };
      } else {
        return { ...values, [prop]: event.target.value };
      }
    });
  };

  const handleSave = () => {
    console.log(values);

    axios.post("/services/edit", { data: values }).then((res) => {
      console.log(res.data);
    });
  };

  // const handleClickShowPassword = () => {
  //   setValues({
  //     ...values,
  //     showPassword: !values.showPassword,
  //   });
  // };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <div>
        <Box sx={{ width: "100%" }}>
          <Typography variant="h6">Edit Product/Serivce Name</Typography>
        </Box>
        <TextField
          label="Name"
          onChange={handleChange("title")}
          id="outlined-start-adornment"
          // value={values.title}
          defaultValue={values.title}
          sx={{ m: 1, width: "100%" }}
        />

        <Box sx={{ width: "100%" }}>
          <Typography variant="h6">Set Duration</Typography>
        </Box>
        <TextField
          label="Hours"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          onChange={handleChange("hours")}
          defaultValue={values.hours}
          id="outlined-start-adornment"
          sx={{ m: 1, width: "25ch" }}
        />
        <TextField
          label="Minutes"
          defaultValue={values.minutes}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          onChange={handleChange("minutes")}
          id="outlined-start-adornment"
          sx={{ m: 1, width: "25ch" }}
        />
        <Box sx={{ width: "100%" }}>
          <Typography variant="h6">Assign Resources</Typography>
        </Box>
        <FormControl sx={{ m: 1, width: "100%" }}>
          <InputLabel id="resource">Resources</InputLabel>
          <Select
            labelId="resource"
            id="resource"
            multiple
            value={values.resources}
            onChange={handleChange("resources")}
            input={
              <OutlinedInput id="select-multiple-chip" label="Resources" />
            }
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name, i) => (
              <MenuItem
                key={name.name ? name.name : i}
                value={name._id || i}
                style={getStyles(name.name || name, values.resources, theme)}
              >
                {name.name || name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ width: "100%" }}>
          <Typography variant="h6">Assign Tags</Typography>
        </Box>
        <FormControl sx={{ m: 1, width: "100%" }}>
          <InputLabel id="tags">Tags</InputLabel>
          <Select
            labelId="tags"
            id="tags"
            multiple
            value={values.tags}
            onChange={handleChange("tags")}
            input={<OutlinedInput id="tags" label="Tags" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {tags.map((tag) => {
              if (tag !== "" || tag !== "[object Undefined]") {
                return (
                  <MenuItem
                    key={tag}
                    value={tag}
                    style={getStyles(tag, values.tags, theme)}
                  >
                    {tag}
                  </MenuItem>
                );
              }
            })}
          </Select>
        </FormControl>
        <Box sx={{ mt: 1, width: "100%" }}>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => setSaved(true)}
          >
            Save
          </Button>
          <Button sx={{ mx: 1 }} color="primary" variant="contained">
            Undo Changes
          </Button>
          <Button color="warning" variant="contained">
            Undo Import
          </Button>
        </Box>
      </div>
    </Box>
  );
}
