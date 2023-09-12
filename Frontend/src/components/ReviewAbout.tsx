import React, { useState } from "react";

import {
  Box,
  Stack,
  Tab,
  Tabs,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import ReviewItem from "./ReviewItem";
import { Props } from "../interfaces";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ReviewAbout: React.FC<Props> = (props) => {
  const [value, setValue] = useState(0);
  const [showReview, setShowReview] = useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    event;
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label="Reviews"
              {...a11yProps(0)}
              onClick={() => setShowReview(false)}
            />
            <Tab
              label="About"
              {...a11yProps(1)}
              onClick={() => setShowReview(true)}
            />
          </Tabs>
        </Box>

        {!showReview ? (
          <>
            {/* Review & ratings */}
            <Stack mt="1.5rem">
              <Typography variant="h5">Reviews</Typography>
              {props.reviewInfo?.map((order, idx) => (
                <React.Fragment key={idx}>
                  <Divider sx={{ borderWidth: "0.1rem", my: "1rem" }}></Divider>
                  <Grid container>
                    <ReviewItem
                      customer_name={order[0].customer_name}
                      rating={order[0].rating}
                      review={order[0].review}
                    ></ReviewItem>
                  </Grid>
                </React.Fragment>
              ))}
            </Stack>
          </>
        ) : (
          <>
            {/* About */}
            <Stack mt="1.5rem">
              <Typography variant="h5" gutterBottom>
                Opening hours
              </Typography>

              <Typography variant="h5" gutterBottom>
                Address
              </Typography>
              <Typography variant="body1" fontWeight="light">
                {props.vendorInfo?.address}
              </Typography>
            </Stack>
          </>
        )}
      </Box>
    </>
  );
};

export default ReviewAbout;
