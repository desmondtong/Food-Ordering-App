import React, { useState, useContext } from "react";
import {
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Button,
} from "@mui/material";

import UserContext from "../context/user";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import MopedOutlinedIcon from "@mui/icons-material/MopedOutlined";
import DoneIcon from "@mui/icons-material/Done";
import { Props } from "../interfaces";

const alertIcons = {
  PREPARING: (
    <Grid item xs={0.5} mr="1rem">
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
    <Grid item xs={0.5} mr="1rem">
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
    <Grid item xs={0.5} mr="1rem">
      <DoneIcon
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
};

const OrderAccordian: React.FC<Props> = (props) => {
    const userCtx = useContext(UserContext);

  const [expanded, setExpanded] = useState<string | false>(false);

  const formattedOrderId = props.orderInfo?.order_id
    ?.split("-")[4]
    .toUpperCase();

  // function
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
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
            {alertIcons.DELIVERING}
            <Grid item flexGrow="1">
              <Typography variant="h6" fontWeight="bold">
                {`Order #${formattedOrderId}`}
              </Typography>
            </Grid>
            <Grid
              item
              xs={1}
              container
              direction="column"
              alignItems="flex-end"
            >
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="light"
              >
                date-time
              </Typography>
              <Typography variant="h6">S$ price</Typography>
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
            {/* order details */}
            <Grid item xs={10}>
              <Stack direction="row" spacing={3}>
                <Button variant="contained">Preparing</Button>
                <Button variant="contained">Delivering</Button>
                <Button variant="contained">Completed</Button>
                <Button variant="outlined">Chat With Customer</Button>
              </Stack>
            </Grid>
            <Grid item xs={2} container justifyContent="flex-end">
              <Button variant="contained" color="error">
                Cancel Order
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default OrderAccordian;
