import React, { useContext } from "react";
import ReactDOM from "react-dom";

import { Stack, Typography } from "@mui/material";
import UserContext from "../context/user";
import { Props } from "../interfaces";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

const OverLay: React.FC<Props> = (props) => {
  const userCtx = useContext(UserContext);

  const status = userCtx?.orderInfo?.[0]?.[0].status;

  return (
    <>
      <Stack
        style={{
          backgroundColor: "var(--orange)",
          zIndex: "100",
          overflow: "hidden",
          position: "fixed",
          top: "93%",
          height: "7%",
          left: "77%",
          width: "22%",
          borderRadius: "1rem 1rem 0 0",
        }}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {(status === "SENT" || status === "PREPARING") && (
          <>
            <img src="./preparing.png" style={{ marginRight: "1rem" }}></img>
            <Typography
              textAlign="center"
              variant="h5"
              fontWeight="bold"
              color="var(--white)"
            >
              Preparing your food!
            </Typography>
          </>
        )}

        {status === "DELIVERING" && (
          <>
            <img src="./delivering.png" style={{ marginRight: "1rem" }}></img>
            <Typography
              textAlign="center"
              variant="h5"
              fontWeight="bold"
              color="var(--white)"
            >
              Your food in on the way!
            </Typography>
          </>
        )}

        {status === "COMPLETED" && (
          <>
            <ThumbUpOffAltIcon
              fontSize="large"
              sx={{
                fontSize: "3.5rem",
                mr: "1rem",
                color: "var(--white)",
              }}
            />
            <Typography
              textAlign="center"
              variant="h5"
              fontWeight="bold"
              color="var(--white)"
            >
              Rate us after your Burps!
            </Typography>
          </>
        )}
      </Stack>
    </>
  );
};

const OrderToaster = () => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay />,
        document.querySelector("#modal-root")!
      )}
    </>
  );
};

export default OrderToaster;
