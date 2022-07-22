import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceList from "../ui/ServiceList";
import { Grid, Button, Alert, CircularProgress, Box } from "@mui/material";
import {
  styled,
  createTheme,
  alpha,
  ThemeProvider,
} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { green, purple } from "@mui/material/colors";

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
  backgroundColor: alpha(theme.palette.secondary.main, 0.2),
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Services = (props) => {
  const [getAllProducts, setAllProducts] = useState([]);
  const [imported, setImported] = useState([]);
  const [isFetched, setFetched] = useState(false);
  const [isSelected, setSelected] = useState(false);
  const [isSaved, setSaved] = useState(false);

  const [checked, setChecked] = useState([]);

  const { success, setSuccess, error, setError, loading, setLoading } = props;

  useEffect(() => {
    if (isFetched === true || isSaved) {
      handleSelectProductsButtonClick();
      console.log("getched producrs");
    }
    if (isSelected) {
      handleImportClick();
    }
    return function cleanUp() {
      setSelected(false);
      setSaved(false);
      console.log("cleanUP!");
    };
  }, [isSelected, isFetched, isSaved]);

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  function handleSelectProductsButtonClick() {
    setLoading(true);

    axios
      .get("/services/all")
      .then((res) => {
        setAllProducts((data) => res.data.data.data);
        setImported((data) => res.data.data.importedServices);
        console.log(res.data);
        return res.data.data;
      })
      .then((data) => {
        setSuccess(true);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }

  function handleImportClick() {
    setLoading(true);
    axios
      .post("/services/import", { data: checked })
      .then((res) => {
        res.data;
        console.log(res.data);
      })
      .then((data) => {
        setSuccess(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
      });

    setChecked([]);
  }

  const importButtonText = `Import (${checked.length}) product${
    checked.length > 1 ? "s" : ""
  }`;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: "2rem 4rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <Item sx={{ marginTop: "2rem" }}>
              <Box sx={{ display: "inline-block", position: "relative" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setFetched(true)}
                >
                  Select Products
                </Button>
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
              <Box sx={{ display: "inline-block", position: "relative" }}>
                <Button
                  sx={{ marginLeft: "1rem" }}
                  variant="contained"
                  color="secondary"
                  onClick={() => setSelected(true)}
                >
                  {importButtonText}
                </Button>
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
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Item sx={{ marginTop: "2rem" }}>
              <ServiceList
                loading={loading}
                succes={success}
                error={error}
                checked={checked}
                setSaved={setSaved}
                isSaved={isSaved}
                setChecked={setChecked}
                getAllProducts={getAllProducts}
                imported={imported}
                isFetched={isFetched}
              />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Services;
