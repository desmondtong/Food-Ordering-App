import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";

import { Stack, Box } from "@mui/material";
import OrderAccordian from "../components/OrderAccordian";
import TopBar from "../components/TopBar";

import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { Props, data } from "../interfaces";

const RatingReview: React.FC = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const [orderInfo, setOrderInfo] = useState<Props[][]>([]);

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
      console.log(res.data.order_id);
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
        setOrderInfo(res.data);
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
          <Stack my="2rem" spacing={3}>
            {orderInfo?.map((item, idx) => (
              <OrderAccordian
                key={idx}
                orderInfo={item}
                isReview={true}
              ></OrderAccordian>
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default RatingReview;
