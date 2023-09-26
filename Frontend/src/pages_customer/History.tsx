import React, { useEffect, useContext, useState } from "react";
import NavBar from "../components/NavBar";

import {
  Box,
  CardMedia,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { Props, data } from "../interfaces";

import ConsecutiveSnackbars from "../components/ConsecutiveSnackbars";
import OrderToaster from "../components/OrderToaster";
import TopBar from "../components/TopBar";

const History: React.FC = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const [historyOrders, setHistoryOrders] = useState<Props[]>([]);

  // endpoint
  const getAllOrders = async () => {
    const res: data = await fetchData(
      "/api/orders/items/user_id",
      "POST",
      {
        user_id: userCtx?.userId,
      },
      userCtx?.accessToken
    );

    if (res.ok) {
      setHistoryOrders(res.data);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    getAllOrders();
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

          <TableContainer component={Paper} elevation={0} sx={{ mt: "1.5rem" }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell width="40%">
                    <Typography variant="body1">Past Order</Typography>
                  </TableCell>
                  <TableCell width="20%" align="center">
                    <Typography variant="body1">Order ID & Date</Typography>
                  </TableCell>
                  <TableCell width="20%" align="center">
                    <Typography variant="body1">Cost</Typography>
                  </TableCell>
                  <TableCell width="20%" align="center">
                    <Typography variant="body1">Status</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {historyOrders.map((row, idx) => (
                  <TableRow
                    hover
                    key={idx}
                    onClick={() => console.log(row.order_id)}
                  >
                    <TableCell>
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                      >
                        <CardMedia
                          component="img"
                          sx={{ width: "6rem", height: "6rem" }}
                          image={row.image_url || "./WESTERN.jpg"}
                        />
                        <Typography variant="body1" fontWeight="medium">
                          {row.store_name}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell align="center">
                      <Stack direction="column">
                        <Typography variant="body2" color="var(--orange)">
                          Order ID : #{row.order_id?.split("-")[4].toUpperCase()}
                        </Typography>
                        <Typography variant="body2" fontWeight="light">
                          {new Date(row.date!).toDateString().slice(4)},{" "}
                          {row.time?.slice(0, 5)}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">{`S$ ${row.total_price}`}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body2"
                        color={
                          row.status === "COMPLETED"
                            ? "var(--green)"
                            : "var(--red)"
                        }
                      >
                        {row.status}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <ConsecutiveSnackbars />
        </Box>
      </Box>

      <OrderToaster></OrderToaster>
    </>
  );
};

export default History;
