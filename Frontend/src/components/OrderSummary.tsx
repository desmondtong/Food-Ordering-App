import React, { useContext } from "react";
import UserContext from "../context/user";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  Paper,
  Grid,
  Typography,
  Divider,
  Button,
  Tooltip,
} from "@mui/material";
import { Props } from "../interfaces";

const OrderSummary: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const userCtx = useContext(UserContext);

  const isCheckOut = window.location.pathname.includes("checkout");

  return (
    <>
      <Paper sx={{ borderRadius: "1rem" }} elevation={4}>
        <Grid container alignItems="center" p="1rem">
          <Grid item xs={12}>
            <Typography variant="h6">
              {isCheckOut ? "Your Order From" : "Order Summary"}
            </Typography>
            {isCheckOut && (
              <Typography fontWeight="light" gutterBottom color="var(--orange)">
                {userCtx?.cartItemInfo.store_name}
              </Typography>
            )}
          </Grid>

          {isCheckOut && (
            <>
              {props.orders?.map((item, idx) => (
                <Grid item container xs={12} my="1rem" key={idx}>
                  <Grid item xs={1.2}>
                    <Typography variant="body1">{`${item.quantity_ordered} x`}</Typography>
                  </Grid>
                  <Grid item flexGrow="1">
                    <Typography variant="body1" fontWeight="light">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" fontWeight="light">
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
            </>
          )}
        </Grid>

        {isCheckOut && <Divider sx={{ mx: "0.5rem", mb: "1rem" }}></Divider>}

        <Grid container alignItems="center" p="1rem">
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
          <Grid item xs={9} mt="1rem">
            <Typography variant="body2" fontWeight="light">
              Delivery Fee
            </Typography>
          </Grid>
          <Grid item xs={3} container justifyContent="flex-end" mt="1rem">
            <Typography variant="body2" fontWeight="bold">
              S$ 1.00
            </Typography>
          </Grid>
        </Grid>

        {!isCheckOut && <Divider sx={{ m: "0.5rem" }}></Divider>}

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

          {!isCheckOut && (
            <Tooltip
              title={
                userCtx?.haveActiveOrder ? "You Have An Active Order!" : ""
              }
            >
              <Grid item xs={12} mt="2rem">
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate(`/cart/${params.item}/checkout`)}
                  disabled={userCtx?.haveActiveOrder}
                >
                  Checkout
                </Button>
              </Grid>
            </Tooltip>
          )}
        </Grid>
      </Paper>
    </>
  );
};

export default OrderSummary;
