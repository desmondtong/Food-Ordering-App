import React from "react";
import { Grid, Typography, Rating } from "@mui/material";
import { Props } from "../interfaces";

const ReviewItem: React.FC<Props> = (props) => {
  return (
    <>
      <Grid item flexGrow="1">
        <Typography variant="body1" fontWeight="light" gutterBottom>
          {props.customer_name}
        </Typography>
      </Grid>
      <Grid item xs={0.5} pr="1rem">
        <Typography variant="body1" fontWeight="light">
          {props.rating}
        </Typography>
      </Grid>
      <Grid item xs={1} container justifyContent="flex-end">
        <Rating
          name="rating"
          value={Number(props.rating)}
          precision={0.5}
          readOnly
          size="small"
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body2" fontWeight="light" color="text.secondary">
          {props.review}
        </Typography>
      </Grid>
    </>
  );
};

export default ReviewItem;
