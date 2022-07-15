import React from "react";
import { Box } from "@mui/material/";

function BlurBG(props) {
  const { theme } = props;
  return (
    <Box
      position={"absolute"}
      top={0}
      left={0}
      zIndex={-1}
      sx={{
        filter: "blur(100px)",

        mixBlendMode: "overlay",
        background: "linear-gradient(to right bottom, #2b0a3f, #654f72)",
      }}
      width={"100%"}
      height={"100%"}
      backgroundColor={theme.palette.primary.dark}
    />
  );
}

export default BlurBG;
