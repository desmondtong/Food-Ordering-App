import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Divider,
  Stack,
  Typography,
  Grid,
  Paper,
  CssBaseline,
  IconButton,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  DialogActions,
  Rating,
} from "@mui/material";

import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { Props, TrackerToaster, data } from "../interfaces";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import ConsecutiveSnackbars from "../components/ConsecutiveSnackbars";

const Tracker: React.FC = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const params = useParams();

  const [openReview, setOpenReview] = useState<boolean>(false); // model
  const [ratingValue, setRatingValue] = useState<number | null>();

  const reviewRef = useRef<HTMLInputElement>();

  const orderInfo = userCtx?.orderInfo?.[0];
  const status = userCtx?.orderInfo?.[0]?.[0].status;

  const trackerContent: TrackerToaster = {
    SENT: {
      title: "The restaurant is preparing your order!",
      url: "../tracker-cook.jpg",
      value: [0, 0, 0],
      width: [30, 15, 15],
      variant: ["indeterminate", "determinate", "determinate"],
    },
    PREPARING: {
      title: "The restaurant is preparing your order!",
      url: "../tracker-cook.jpg",
      value: [0, 0, 0],
      width: [30, 15, 15],
      variant: ["indeterminate", "determinate", "determinate"],
    },
    DELIVERING: {
      title: "The rider is heading to your location!",
      url: "../tracker-delivering.jpg",
      value: [100, 0, 0],
      width: [15, 30, 15],
      variant: ["determinate", "indeterminate", "determinate"],
    },
    COMPLETED: {
      title: "Delivered!",
      url: "../tracker-done.jpg",
      value: [100, 100, 100],
      width: [15, 15, 30],
      variant: ["determinate", "determinate", "determinate"],
    },
    CANCELLED: {
      title: "Your order has been cancelled..",
      url: "../tracker-done.jpg", //UPDATE TO CANCELLED PIC
      value: [0, 0, 0],
      width: [20, 20, 20],
      variant: ["determinate", "determinate", "determinate"],
    },
  };

  // endpoint
  const updateOrderRatingReviews = async () => {
    const body: Props = { is_active: false };
    if (ratingValue) body.rating = ratingValue;
    if (reviewRef.current?.value) body.review = reviewRef.current?.value;
    console.log(body);

    const res: data = await fetchData(
      "/api/orders/" + params.item,
      "PATCH",
      body,
      userCtx?.accessToken
    );

    if (res.ok) {
      userCtx?.setHaveActiveOrder(false);
      // userCtx?.setActiveOrderId([]);

      // close modal and go back to previous page
      setOpenReview(false);
      history.back();
    } else {
      //attempt to refresh to get new access token
      // userCtx?.refresh();

      // if failed to refresh
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    if (status === "COMPLETED" || status === "CANCELLED") {
      setOpenReview(true);
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        className="tracker"
        sx={{
          backgroundImage:
            "url(../tracker-bg.png),linear-gradient(var(--orange),var(--blue))",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <IconButton
          sx={{ bgcolor: "var(--white)", m: "2rem" }}
          onClick={() => history.back()}
          className="back-btn"
          size="large"
        >
          <ArrowBackIcon
            sx={{ color: "var(--orange)" }}
            fontSize="large"
          ></ArrowBackIcon>
        </IconButton>

        <Paper
          sx={{
            width: "35%",
            borderRadius: "1rem",
            px: "1rem",
            py: "2rem",
          }}
          elevation={20}
        >
          <Stack direction="column" justifyContent="center" alignItems="center">
            <img src="../logo-word-2.jpg" style={{ width: "8rem" }}></img>
            <Typography variant="h5" gutterBottom>
              {trackerContent[status!]?.title}
            </Typography>
            <Typography fontWeight="light" variant="body1" gutterBottom>
              Estimate time 10 - 15 min
            </Typography>

            <img
              src={trackerContent[status!]?.url}
              style={{ margin: "1rem 0" }}
            ></img>
          </Stack>

          <Stack direction="row" justifyContent="center" alignItems="center">
            <LinearProgress
              color="warning"
              variant={trackerContent[status!]?.variant?.[0]}
              value={trackerContent[status!]?.value?.[0]}
              sx={{
                width: `${trackerContent[status!]?.width?.[0]}%`,
                height: "0.5rem",
                borderRadius: "1rem",
                mr: "0.5rem",
              }}
            />
            <LinearProgress
              color="warning"
              variant={trackerContent[status!]?.variant?.[1]}
              value={trackerContent[status!]?.value?.[1]}
              sx={{
                width: `${trackerContent[status!]?.width?.[1]}%`,
                height: "0.5rem",
                borderRadius: "1rem",
                mr: "0.5rem",
              }}
            />
            <LinearProgress
              color="warning"
              variant={trackerContent[status!]?.variant?.[2]}
              value={trackerContent[status!]?.value?.[2]}
              sx={{
                width: `${trackerContent[status!]?.width?.[2]}%`,
                height: "0.5rem",
                borderRadius: "1rem",
              }}
            />
          </Stack>

          <Grid container alignItems="center" px="5rem">
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold" textAlign="left">
                Here's your receipt
              </Typography>
            </Grid>
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
        <ConsecutiveSnackbars />
      </Stack>

      {/* rating review modal */}
      <Dialog open={openReview} fullWidth maxWidth="sm">
        <DialogTitle variant="h6" fontWeight="bold" textAlign="center">
          Rate our service
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={updateOrderRatingReviews}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Stack direction="row" justifyContent="center">
          <Rating
            name="rating"
            defaultValue={0}
            precision={0.5}
            size="large"
            sx={{ fontSize: "3rem" }}
            onChange={(_, newValue) => {
              setRatingValue(newValue);
            }}
          />
        </Stack>
        <DialogContent>
          <DialogContentText
            my="1rem"
            variant="h6"
            fontWeight="bold"
            textAlign="center"
          >
            Drop us a review!
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="review"
            label="Review"
            placeholder="Tell us about your meal and service.."
            multiline
            rows={4}
            type="text"
            fullWidth
            inputRef={reviewRef}
          />
        </DialogContent>

        <DialogActions sx={{ m: "1rem" }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                onClick={updateOrderRatingReviews}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Tracker;
