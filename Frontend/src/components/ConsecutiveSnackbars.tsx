import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Grid, Paper, Typography, Stack } from "@mui/material";
import { SnackbarMessage } from "../interfaces";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

export interface State {
  open: boolean;
  snackPack: readonly SnackbarMessage[];
  messageInfo?: SnackbarMessage;
}

const ConsecutiveSnackbars: React.FC = () => {
  const userCtx = useContext(UserContext);
  const timeNow = new Date().toLocaleTimeString();
  const order_id = userCtx?.orderInfo?.[0]?.[0].order_id?.split("-")[4];

  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(
    undefined
  );

  // function
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      event;
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  useEffect(() => {
    if (userCtx?.snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...userCtx?.snackPack[0] });
      userCtx?.setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (userCtx?.snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [userCtx?.snackPack, messageInfo, open]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        key={messageInfo ? messageInfo.key : undefined}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
        message={messageInfo ? messageInfo.message : undefined}
        action={
          <React.Fragment>
            <Button color="warning" size="small" onClick={handleClose}>
              helo
            </Button>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      >
        <Paper
          sx={{
            width: "22rem",
            height: "6rem",
            p: "1rem",
            bgcolor: "var(--orange)",
            borderRadius: "0.7rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <ReceiptLongOutlinedIcon
                sx={{ fontSize: "4rem", color: "var(--white)" }}
              />
            </Grid>
            <Grid item xs={9}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
              >
                <Typography variant="h6" fontWeight="bold" color="var(--white)">
                  {userCtx?.role === "VENDOR"
                    ? `Order #${order_id}`
                    : "Order status update"}
                </Typography>
                <Typography variant="body1" color="var(--white)">
                  {timeNow}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Snackbar>
    </>
  );
};

export default ConsecutiveSnackbars;
