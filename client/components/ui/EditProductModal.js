import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditProductForm from "./EditProductForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function EditProductModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { imported, allTags, isSaved, setSaved } = props;
  return (
    <div>
      <Button
        sx={{ marginLeft: "1rem" }}
        variant="contained"
        color="success"
        onClick={handleOpen}
        // onClick={handleImportClick}
      >
        Edit Products
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Product
          </Typography>
          <EditProductForm
            isSaved={isSaved}
            setSaved={setSaved}
            imported={imported}
            allTags={allTags}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default EditProductModal;
