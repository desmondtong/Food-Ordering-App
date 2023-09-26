import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TopBar from "../components/TopBar";
import ConsecutiveSnackbars from "../components/ConsecutiveSnackbars";

import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import { Props, data } from "../interfaces";

const HistoryVendor: React.FC = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const [historyOrders, setHistoryOrders] = useState<Props[]>([]);

  // endpoint
  const getAllOrders = async () => {
    const res: data = await fetchData(
      "/api/orders/items/vendor_id",
      "POST",
      {
        vendor_id: userCtx?.userId,
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
                  <TableCell width="12.5%">
                    <Typography variant="body1">Order Id</Typography>
                  </TableCell>
                  <TableCell width="10%">
                    <Typography variant="body1">Date</Typography>
                  </TableCell>
                  <TableCell width="10%">
                    <Typography variant="body1">Time</Typography>
                  </TableCell>
                  <TableCell width="12.5%">
                    <Typography variant="body1">Customer</Typography>
                  </TableCell>
                  <TableCell width="12.5%">
                    <Typography variant="body1">Email</Typography>
                  </TableCell>
                  <TableCell width="10%">
                    <Typography variant="body1">Amount</Typography>
                  </TableCell>
                  <TableCell width="12.5%">
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
                      <Typography variant="body1" color="var(--orange)">
                        #{row.order_id?.split("-")[4].toUpperCase()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="light">
                        {new Date(row.date!).toDateString().slice(4)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="light">
                        {row.time?.slice(0, 5)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="light">
                        {`${row.first_name} ${row.last_name}`}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="light">
                        {row.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        fontWeight="light"
                      >{`S$ ${row.total_price}`}</Typography>
                    </TableCell>
                    <TableCell>
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
    </>
  );
};

export default HistoryVendor;
