import React, { useState, useContext } from "react";
import {
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Button,
  Rating,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import MopedOutlinedIcon from "@mui/icons-material/MopedOutlined";
import { Props, data, statuses } from "../interfaces";
import OrderItem from "./OrderItem";

const alertIcons: statuses = {
  SENT: (
    <Grid item xs={0.5} mr="1.5rem">
      <ReceiptLongOutlinedIcon
        sx={{
          bgcolor: "var(--yellow)",
          borderRadius: "50%",
          p: "0.8rem",
          fontSize: "3.5rem",
          color: "var(--white)",
        }}
      />
    </Grid>
  ),
  PREPARING: (
    <Grid item xs={0.5} mr="1.5rem">
      <ReceiptLongOutlinedIcon
        sx={{
          bgcolor: "var(--yellow)",
          borderRadius: "50%",
          p: "0.8rem",
          fontSize: "3.5rem",
          color: "var(--white)",
        }}
      />
    </Grid>
  ),
  DELIVERING: (
    <Grid item xs={0.5} mr="1.5rem">
      <MopedOutlinedIcon
        sx={{
          bgcolor: "var(--orange)",
          borderRadius: "50%",
          p: "0.8rem",
          fontSize: "3.5rem",
          color: "var(--white)",
        }}
      />
    </Grid>
  ),
  COMPLETED: (
    <Grid item xs={0.5} mr="1.5rem">
      <CheckIcon
        sx={{
          bgcolor: "var(--green)",
          borderRadius: "50%",
          p: "0.8rem",
          fontSize: "3.5rem",
          color: "var(--white)",
        }}
      />
    </Grid>
  ),
  CANCELLED: (
    <Grid item xs={0.5} mr="1.5rem">
      <ClearIcon
        sx={{
          bgcolor: "var(--red)",
          borderRadius: "50%",
          p: "0.8rem",
          fontSize: "3.5rem",
          color: "var(--white)",
        }}
      />
    </Grid>
  ),
};

const OrderAccordian: React.FC<Props> = (props) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const [expanded, setExpanded] = useState<string | false>(false);

  const formattedOrderId = props.orderInfo?.[0].order_id
    ?.split("-")[4]
    .toUpperCase();
  const status = props.orderInfo?.[0].status!;
  const date = new Date(props.orderInfo?.[0].date!).toDateString().slice(4);
  const time = props.orderInfo?.[0].time?.slice(0, 5);

  // function
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      event;
    };

  // endpoint
  const updateStatus = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const input = e.target as HTMLElement;
    const status = input.innerText.toUpperCase();

    const res: data = await fetchData(
      "/api/orders/" + props.orderInfo?.[0].order_id,
      "PATCH",
      {
        status: status === "CANCEL ORDER" ? "CANCELLED" : status,
      },
      userCtx?.accessToken
    );

    if (res.ok) {
      userCtx?.getVendorActiveOrder();
    } else {
      //attempt to refresh to get new access token
      // userCtx?.refresh();

      // if failed to refresh
      alert(JSON.stringify(res.data));
    }
  };

  return (
    <>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        elevation={3}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Grid container alignItems="center" height="4rem">
            {alertIcons[status]}
            <Grid item flexGrow="1">
              <Typography variant="h6" fontWeight="medium">
                {`Order #${formattedOrderId}`}
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              container
              direction="column"
              alignItems="flex-end"
            >
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="light"
              >
                {`${date}, ${time}`}
              </Typography>

              {!props.isReview && (
                <>
                  <Typography variant="h6">{`S$ ${props.orderInfo?.[0].total_price}`}</Typography>
                  <Typography
                    variant="subtitle2"
                    fontWeight="light"
                    fontStyle="italic"
                    color="text.secondary"
                    sx={{ fontSize: "0.7rem" }}
                  >
                    Inclusive of delivery fee
                  </Typography>
                </>
              )}
            </Grid>
            <Grid item xs={1} container justifyContent="flex-end">
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="light"
              >
                See details
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container alignItems="center">
            <Grid item xs={0.5}></Grid>
            <Grid item xs={11.5}>
              {props.orderInfo?.map((item, idx) => (
                <OrderItem
                  name={item.name}
                  user_note={item.user_note}
                  item_price={item.item_price}
                  quantity_ordered={item.quantity_ordered}
                  image_url={item.image_url}
                  key={idx}
                ></OrderItem>
              ))}
            </Grid>

            {!props.isReview && (
              <>
                <Grid item xs={10}>
                  <Stack direction="row" spacing={3}>
                    <Button
                      variant="contained"
                      disabled={
                        status == "PREPARING" ||
                        status == "DELIVERING" ||
                        status == "COMPLETED"
                      }
                      onClick={updateStatus}
                    >
                      Preparing
                    </Button>
                    <Button
                      variant="contained"
                      disabled={status != "PREPARING"}
                      onClick={updateStatus}
                    >
                      Delivering
                    </Button>
                    <Button
                      variant="contained"
                      onClick={updateStatus}
                      disabled={status != "DELIVERING"}
                    >
                      Completed
                    </Button>
                    <Button variant="outlined">Chat With Customer</Button>
                  </Stack>
                </Grid>
                <Grid item xs={2} container justifyContent="flex-end">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={updateStatus}
                  >
                    Cancel Order
                  </Button>
                </Grid>
              </>
            )}

            {props.isReview && (
              <>
                <Grid item flexGrow="1">
                  <Typography variant="body1" fontWeight="light" gutterBottom>
                    {props.orderInfo?.[0].customer_name}
                  </Typography>
                </Grid>
                <Grid item xs={0.5} pr="1rem">
                  <Typography variant="body1" fontWeight="light">
                    {props.orderInfo?.[0].rating}
                  </Typography>
                </Grid>
                <Grid item xs={1} container justifyContent="flex-end">
                  <Rating
                    name="rating"
                    value={Number(props.orderInfo?.[0].rating)}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    fontWeight="light"
                    color="text.secondary"
                  >
                    {props.orderInfo?.[0].review}
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default OrderAccordian;
