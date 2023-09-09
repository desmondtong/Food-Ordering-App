import React, { useState, useEffect, useContext } from "react";
import NavBar from "../components/NavBar";

import { Grid, Box, Typography, IconButton } from "@mui/material";
import TopBar from "../components/TopBar";
import Cuisine from "../components/Cuisine";

import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { Props, data } from "../interfaces";
import Restaurant from "../components/Restaurant";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
      //attempt to refresh to get new access token
      // userCtx?.refresh();

      // if failed to refresh
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
      //attempt to refresh to get new access token
      // userCtx?.refresh();

      // if failed to refresh
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
                <Grid item xs={8} sx={{ borderStyle: "solid" }}>
                  BANNER 1
                </Grid>
                <Grid item xs={4} sx={{ borderStyle: "solid" }}>
                  BANNER 2
                </Grid>

                {/* cuisines cards */}
                <Grid item xs={12}>
                  <Typography variant="h4" gutterBottom>
                    Cuisines
                  </Typography>
                </Grid>
                {categories.map((category, idx) => (
                  <Grid
                    item
                    xs={1.5}
                    key={idx}
                    onClick={(e) => handleSearch(e, false)}
                  >
                    <Cuisine
                      category={category}
                      // handleSearch={handleSearch}
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
              <Typography variant="h4" gutterBottom>
                Restaurants
              </Typography>
            </Grid>
            {displayVendors.map((item, idx) => (
              <Grid item xs={3} key={idx}>
                <Restaurant
                  name={item.store_name}
                  address={item.address}
                  // postal_code={item.postal_code}
                ></Restaurant>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Homepage;
