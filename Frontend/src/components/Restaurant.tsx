import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, IconButton, Paper } from "@mui/material";
import { Props } from "../interfaces";

import StarIcon from "@mui/icons-material/Star";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Restaurant: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const [favorite, setFavorite] = useState<Boolean>(false);

  return (
    <Card sx={{ borderRadius: "0.5rem" }} elevation={10}>
      <Grid container className="restaurant-card">
        <CardMedia
          component="img"
          alt="image title"
          sx={{
            aspectRatio: 1.5,
            backgroundSize: "cover",
            backgroundPosition: "center",
            p: "0.7rem",
          }}
          style={{ borderRadius: "1rem" }}
          image="./WESTERN.jpg" // to add to row to vendor_details table
        ></CardMedia>

        {/* favorite button */}
        <IconButton
          className="love-icon"
          size="small"
          style={{ backgroundColor: "var(--white)" }}
          sx={{ m: "1rem" }}
          onClick={() => setFavorite(!favorite)}
        >
          {favorite ? (
            <FavoriteIcon fontSize="small" sx={{ color: "red" }}></FavoriteIcon>
          ) : (
            <FavoriteBorderIcon
              fontSize="small"
              sx={{ color: "var(--orange)" }}
            ></FavoriteBorderIcon>
          )}
        </IconButton>

        {/* time estimation tag */}
        <Paper
          className="time-ETA"
          sx={{
            width: "11%",
            bgcolor: "var(--lightgrey)",
            borderRadius: "0 0.5rem 0 0.5rem",
          }}
          elevation={20}
        >
          <Typography variant="body2" fontWeight="light" textAlign="center">
            10
          </Typography>
          <Typography fontSize="0.7rem" fontWeight="light" textAlign="center">
            MIN
          </Typography>
        </Paper>
      </Grid>
      <CardContent>
        <Grid container>
          <Grid item xs={9}>
            <Typography variant="body1" component="div" gutterBottom>
              {props.name}
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            {props.rating && (
              <>
                <StarIcon
                  sx={{
                    fontSize: "1rem",
                    mr: "0.3rem",
                    color: "var(--orange)",
                  }}
                ></StarIcon>
                <Typography variant="body2" component="div" fontWeight="light">
                  {props.rating}
                </Typography>
              </>
            )}
          </Grid>
          <Grid item xs={9}>
            <Grid container direction="row">
              <LocationOnOutlinedIcon />
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="medium"
                gutterBottom
              >
                {props.address}
              </Typography>
            </Grid>
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight="light"
            >
              <span style={{ color: "var(--orange)" }}>$1.00</span> Delivery Fee
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button
              size="small"
              variant="contained"
              fullWidth
              sx={{ height: "2rem" }}
              onClick={() => navigate(`/details/${props.uuid}`)}
            >
              Visit
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Restaurant;
