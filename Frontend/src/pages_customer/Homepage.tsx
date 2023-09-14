import React, { useState, useEffect, useContext } from "react";
import NavBar from "../components/NavBar";

import {
  Grid,
  Box,
  Typography,
  IconButton,
  Paper,
  Button,
} from "@mui/material";
import TopBar from "../components/TopBar";
import Cuisine from "../components/Cuisine";
import Restaurant from "../components/Restaurant";

import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { Props, data } from "../interfaces";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OrderToaster from "../components/OrderToaster";
import ConsecutiveSnackbars from "../components/ConsecutiveSnackbars";

const Homepage: React.FC = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const [categories, setCategories] = useState<String[]>([]);
  const [vendors, setVendors] = useState<Props[]>([]);
  const [displayVendors, setDisplayVendors] = useState<Props[]>([]);
  const [isSearching, setIsSearching] = useState<Boolean>(false);

  // function
  const handleSearch = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    searchBar = true
  ) => {
    let filtered, input: HTMLInputElement;
    input = e.target as HTMLInputElement;

    if (searchBar) {
      setIsSearching(input.value ? true : false);

      filtered = vendors.filter((item) => {
        const lowerCaseTitle = item.store_name?.toLowerCase();
        const lowerCaseInput = input.value.toLowerCase();
        return lowerCaseTitle?.includes(lowerCaseInput);
      });

      setDisplayVendors(filtered);
    } else {
      setIsSearching(input.id ? true : false);

      filtered = vendors.filter((item) => {
        const lowerCaseTitle = item.category;
        const lowerCaseInput = input.id;
        return lowerCaseTitle?.includes(lowerCaseInput);
      });

      setDisplayVendors(filtered);
    }
  };

  const handleClearSearch = () => {
    setIsSearching(false);
    setDisplayVendors(vendors);
  };

  // endpoint
  const getCategories = async () => {
    const res: data = await fetchData(
      "/api/categories",
      undefined,
      undefined,
      userCtx?.accessToken
    );

    if (res.ok) {
      setCategories(res.data);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const getAllVendors = async () => {
    const res: data = await fetchData(
      "/auth/accounts/vendor",
      undefined,
      undefined,
      userCtx?.accessToken
    );

    if (res.ok) {
      setVendors(res.data);
      setDisplayVendors(res.data);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    getCategories();
    getAllVendors();
  }, []);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar></NavBar>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <TopBar handleSearch={handleSearch}></TopBar>

          <Grid container mt="1.5rem" alignItems="center" spacing={4}>
            {/* to hide banner and cuisines card when using search bar */}
            {!isSearching && (
              <>
                <Grid item xs={8}>
                  <Paper
                    sx={{
                      borderRadius: "1rem",
                      backgroundImage: "url(../mooncake.avif)",
                      bgcolor: "var(--lightgrey)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      p: "1.5rem",
                      height: "25rem",
                    }}
                    elevation={5}
                  >
                    <Typography
                      variant="h2"
                      mb="0.5rem"
                      color="var(--white)"
                      fontWeight="bold"
                      sx={{
                        textShadow: "0.5rem 0.5rem 0.5rem var(--darkgrey-text)",
                      }}
                    >
                      Happy Mooncake Festival from{" "}
                      <span style={{ color: "var(--orange)" }}>Burps</span>
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="light"
                      color="var(--white)"
                      mb="1.5rem"
                    >
                      Best food for you
                    </Typography>
                    <Button variant="contained" size="large" color="warning">
                      Celebrate with us
                    </Button>
                  </Paper>
                </Grid>

                <Grid item xs={4}>
                  <Paper
                    sx={{
                      borderRadius: "1rem",
                      backgroundImage: "url(../tracker-bg.png)",
                      backgroundSize: "cover",
                      backgroundPosition: "right",
                      bgcolor: "var(--lightgrey)",
                      p: "1.5rem",
                      height: "25rem",
                    }}
                    elevation={5}
                  >
                    <Typography variant="h4" mb="0.5rem">
                      Best food for you
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="light"
                      color="text.secondary"
                      mb="1.5rem"
                    >
                      Best food for you
                    </Typography>
                    <Button variant="contained" size="large" color="warning">
                      Explore More
                    </Button>
                  </Paper>
                </Grid>

                {/* cuisines cards */}
                <Grid item xs={12}>
                  <Typography variant="h4">Cuisines</Typography>
                </Grid>
                {categories.map((category, idx) => (
                  <Grid
                    item
                    xs={2}
                    key={idx}
                    onClick={(e) => handleSearch(e, false)}
                  >
                    <Cuisine
                      category={category}
                    ></Cuisine>
                  </Grid>
                ))}
              </>
            )}

            {isSearching && (
              <Grid item xs={12}>
                <IconButton
                  sx={{ bgcolor: "var(--orange)" }}
                  onClick={handleClearSearch}
                >
                  <ArrowBackIcon sx={{ color: "var(--white)" }}></ArrowBackIcon>
                </IconButton>
              </Grid>
            )}

            {/* restaurant cards */}
            <Grid item xs={12}>
              <Typography variant="h4">Restaurants</Typography>
            </Grid>
            {isSearching && (
              <Grid item xs={12}>
                <Typography variant="body1" fontWeight="light">
                  {`${displayVendors.length} restaurants found`}
                </Typography>
              </Grid>
            )}
            {displayVendors.map((item, idx) => (
              <Grid item xs={3} key={idx}>
                <Restaurant
                  name={item.store_name}
                  address={item.address}
                  rating={item.rating}
                  uuid={item.uuid}
                ></Restaurant>
              </Grid>
            ))}
          </Grid>
          <ConsecutiveSnackbars />
        </Box>
      </Box>

      <OrderToaster></OrderToaster>
    </>
  );
};

export default Homepage;
