import React from "react";

import { Paper, Grid, Typography, Divider, Button } from "@mui/material";
import { Props } from "../interfaces";

const OrderSummary: React.FC<Props> = (props) => {
  return (
    <>
      <Paper sx={{ borderRadius: "1rem" }} elevation={4}>
        <Grid container alignItems="center" p="1rem">
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography
              variant="body2"
              fontWeight="light"
            >{`Subtotal (${props.orders?.length} items)`}</Typography>
          </Grid>
          <Grid item xs={3} container justifyContent="flex-end">
            <Typography variant="body2" fontWeight="bold">
              {`S$ ${(Number(props.total_price) - 1).toFixed(2)}`}
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="body2" fontWeight="light">
              Delivery Fee
            </Typography>
          </Grid>
          <Grid item xs={3} container justifyContent="flex-end">
            <Typography variant="body2" fontWeight="bold">
              S$ 1.00
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ m: "0.5rem" }}></Divider>

        <Grid container alignItems="center" p="1rem">
          <Grid item xs={9}>
            <Typography variant="body2" fontWeight="bold">
              Total
            </Typography>
          </Grid>
          <Grid item xs={3} container justifyContent="flex-end">
            <Typography variant="body2" fontWeight="bold">
              {`S$ ${props.total_price}`}
            </Typography>
          </Grid>
          <Grid item xs={12} mt="2rem">
            <Button fullWidth variant="contained">
              Checkout
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default OrderSummary;
