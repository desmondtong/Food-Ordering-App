import React, { useState, useEffect, useContext } from "react";

import NavBar from "../components/NavBar";

import { Box, Grid, Chip, Button } from "@mui/material";
import TopBar from "../components/TopBar";

import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { Props, data } from "../interfaces";
import ItemCard from "../components/ItemCard";

const Menu: React.FC = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const [categories, setCategories] = useState<String[]>([]);
  const [items, setItems] = useState<Props[]>([]);
  const [displayItem, setDisplayItem] = useState<Props[]>([]);

  // function
  const handleFilter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const input = e.target as HTMLElement;

    if (input.innerText == "All") {
      setDisplayItem(items);
    } else {
      const filtered = items.filter(
        (item) => item.category === input.innerText
      );
      setDisplayItem(filtered);
    }
  };

  // endpoint
  const getCategories = async () => {
    const res: data = await fetchData(
      "/api/items/categories/" + userCtx?.userId,
      undefined,
      undefined,
      userCtx?.accessToken
    );

    if (res.ok) {
      setCategories(res.data);
    } else {
      //attempt to refresh to get new access token
      userCtx?.refresh;

      // if failed to refresh
      alert(JSON.stringify(res.data));
    }
  };

  const getItems = async () => {
    const res: data = await fetchData(
      "/api/items/" + userCtx?.userId,
      undefined,
      undefined,
      userCtx?.accessToken
    );

    if (res.ok) {
      setItems(res.data);
      setDisplayItem(res.data);
    } else {
      //attempt to refresh to get new access token
      userCtx?.refresh;
      
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    getCategories();
    getItems();
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar></NavBar>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <TopBar></TopBar>

          <Grid container mt="1.5rem" alignItems="center">
            <Grid item sx={{ flexGrow: 1 }}>
              <Chip
                label="All"
                sx={{ mr: "0.5rem" }}
                onClick={(e) => handleFilter(e)}
              />
              {categories.map((item, idx) => (
                <Chip
                  label={item}
                  key={idx}
                  sx={{ mr: "0.5rem" }}
                  onClick={(e) => handleFilter(e)}
                />
              ))}
            </Grid>
            <Grid
              item
              xs={2}
              container
              direction="row"
              justifyContent="flex-end"
            >
              <Button variant="contained" size="small">
                + Add Item
              </Button>
            </Grid>
          </Grid>

          {/* listing */}
          <Grid container mt="0.1rem" alignItems="center" spacing={4}>
            {displayItem.map((item, idx) => (
              <Grid item xs={6} key={idx}>
                <ItemCard
                  name={item.name}
                  description={item.description}
                  item_price={item.item_price}
                ></ItemCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Menu;
