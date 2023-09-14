import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";

import {
  Stack,
  Box,
  FormControl,
  InputLabel,
  Typography,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import OrderAccordian from "../components/OrderAccordian";
import TopBar from "../components/TopBar";

import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { Props, data } from "../interfaces";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ConsecutiveSnackbars from "../components/ConsecutiveSnackbars";

const RatingReview: React.FC = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const [orderInfo, setOrderInfo] = useState<Props[][]>([]);
  const [displayOrderInfo, setDisplayOrderInfo] = useState<Props[][]>([]);

  // function
  const handleSearch = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let filtered, input: HTMLInputElement;
    input = e.target as HTMLInputElement;

    filtered = orderInfo.filter((item) => {
      const lowerCaseTitle = item[0].order_id?.toLowerCase();
      const lowerCaseInput = input.value.toLowerCase();
      return lowerCaseTitle?.includes(lowerCaseInput);
    });

    setDisplayOrderInfo(filtered);
  };

  // endpoint
  const getOrdersByVendorId = async () => {
    const res: data = await fetchData(
      "/api/orders/items/vendor_id",
      "POST",
      {
        vendor_id: userCtx?.userId,
      },
      userCtx?.accessToken
    );

    if (res.ok) {
      getOrderByOrderId(res.data.order_id);
    } else {
      //attempt to refresh to get new access token
      // userCtx?.refresh();

      // if failed to refresh
      alert(JSON.stringify(res.data));
    }
  };

  const getOrderByOrderId = async (orderIdArr: string[]) => {
    const res: data = await fetchData(
      "/api/orders/items/order_id",
      "POST",
      orderIdArr,
      userCtx?.accessToken
    );

    if (res.ok) {
      if (res.data.length) {
        //filter orders only with rating or review
        const orderInfo = res.data;
        const filteredOrderInfo = orderInfo.filter(
          (item: any) => item?.[0]?.rating || item?.[0]?.review
        );
        setOrderInfo(filteredOrderInfo);
        setDisplayOrderInfo(filteredOrderInfo);
      }
    } else {
      //attempt to refresh to get new access token
      // userCtx?.refresh();

      // if failed to refresh
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    getOrdersByVendorId();
  }, []);
  return (
    <>
      {" "}
      <Box sx={{ display: "flex" }}>
        <NavBar></NavBar>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <TopBar></TopBar>

          <FormControl
            fullWidth
            variant="outlined"
            onChange={handleSearch}
            sx={{
              boxShadow: 3,
              borderRadius: "2rem",
              bgcolor: "var(--lightgrey)",
              mt: "1.5rem",
            }}
            className="search-bar"
          >
            <InputLabel htmlFor="outlined-adornment" sx={{ ml: "0.5rem" }}>
              <Typography>Search</Typography>
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment"
              type="text"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end" disabled sx={{ mr: "0.1rem" }}>
                    <SearchOutlinedIcon className="icon-orange" />
                  </IconButton>
                </InputAdornment>
              }
              label="Search"
              sx={{ borderRadius: "2rem" }}
            />
          </FormControl>

          <Stack my="2rem" spacing={3}>
            {displayOrderInfo?.map((item, idx) => (
              <OrderAccordian
                key={idx}
                orderInfo={item}
                isReview={true}
              ></OrderAccordian>
            ))}
          </Stack>
          <ConsecutiveSnackbars />
        </Box>
      </Box>
    </>
  );
};

export default RatingReview;
