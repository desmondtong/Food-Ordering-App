import React, { useContext } from "react";
import {
  Divider,
  Stack,
  Typography,
  Grid,
  Paper,
  CssBaseline,
} from "@mui/material";
import UserContext from "../context/user";

const Tracker: React.FC = () => {
  const userCtx = useContext(UserContext);

  const orderInfo = userCtx?.orderInfo?.[0];

  return (
    <>
      <CssBaseline />
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        // sx={{
        //   backgroundImage:
        //     "url(../tracker-bg.png),linear-gradient(var(--orange),var(--blue))",
        //   backgroundRepeat: "no-repeat",
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
      >
        <Paper
          sx={{
            width: "30%",
            borderRadius: "1rem",
            px: "1rem",
            py: "2rem",
          }}
          elevation={10}
        >
          <Stack direction="column" justifyContent="center" alignItems="center">
            {/* <img src="../logo-word-2.jpg" style={{ width: "8rem" }}></img> */}
            <Typography variant="h5" gutterBottom>
              The restaurant is preparing your order!
            </Typography>
            <Typography fontWeight="light" variant="body1" gutterBottom>
              Estimate time 10 - 15 min
            </Typography>

            <img src="../tracker-cook.jpg" style={{ margin: "1rem 0" }}></img>

            <Typography variant="h6" fontWeight="bold">
              Here's your receipt
            </Typography>

            <Grid container alignItems="center" px="5rem">
              {orderInfo?.map((item, idx) => (
                <Grid item container xs={12} mt="1rem" key={idx}>
                  <Grid item xs={1.2}>
                    <Typography variant="body1">{`${item.quantity_ordered} x`}</Typography>
                  </Grid>
                  <Grid item flexGrow="1">
                    <Typography variant="body1" fontWeight="light">
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight="light"
                      color="text.secondary"
                    >
                      {item.user_note}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} container justifyContent="flex-end">
                    <Typography
                      variant="body2"
                      fontWeight="light"
                    >{`S$ ${item.item_price}`}</Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Stack>

          <Divider
            variant="middle"
            sx={{
              mx: "2rem",
              my: "1.5rem",
              borderStyle: "dashed",
              borderWidth: "0.13rem",
            }}
          ></Divider>

          <Grid container alignItems="center" px="5rem">
            <Grid item xs={9}>
              <Typography
                variant="body2"
                fontWeight="light"
                color="text.secondary"
              >{`Subtotal (${orderInfo?.length} items)`}</Typography>
            </Grid>
            <Grid item xs={3} container justifyContent="flex-end">
              <Typography variant="body2" fontWeight="bold">
                {`S$ ${(Number(orderInfo?.[0].total_price) - 1).toFixed(2)}`}
              </Typography>
            </Grid>
            <Grid item xs={9} mt="1rem">
              <Typography
                variant="body2"
                fontWeight="light"
                color="text.secondary"
              >
                Delivery Fee
              </Typography>
            </Grid>
            <Grid item xs={3} container justifyContent="flex-end" mt="1rem">
              <Typography variant="body2" fontWeight="bold">
                S$ 1.00
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h6" fontWeight="bold" mt="1rem">
                Total
              </Typography>
            </Grid>
            <Grid item xs={3} container justifyContent="flex-end">
              <Typography variant="h6" fontWeight="bold" mt="1rem">
                {`S$ ${orderInfo?.[0].total_price}`}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Stack>
    </>
  );
};

export default Tracker;
