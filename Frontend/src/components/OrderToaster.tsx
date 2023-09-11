import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";

import { Stack, Typography } from "@mui/material";
import UserContext from "../context/user";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

const OverLay: React.FC = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const status = userCtx?.orderInfo?.[0]?.[0].status;

  const toasterContent: { [key: string]: { url?: string; text?: string } } = {
    SENT: {
      url: "../preparing.png" || "./preparing.png",
      text: "Preparing your food!",
    },
    PREPARING: {
      url: "../preparing.png" || "./preparing.png",
      text: "Preparing your food!",
    },
    DELIVERING: {
      url: "../delivering.png" || "./delivering.png",
      text: "Your food in on the way!",
    },
    COMPLETED: {
      text: "Rate us after your Burps!",
    },
    CANCELLED: {
      text: "Your order is cancelled..",
    },
  };

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
          cursor: "pointer",
        }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        onClick={() => navigate(`/tracker/${userCtx?.activeOrderId}`)}
      >
        {/* conditional rendering based on order statuses */}
        {status === "COMPLETED" || status === "CANCELLED" ? (
          status === "COMPLETED" ? (
            <ThumbUpOffAltIcon
              fontSize="large"
              sx={{
                fontSize: "3.5rem",
                mr: "1rem",
                color: "var(--white)",
              }}
            />
          ) : (
            <SentimentDissatisfiedIcon
              fontSize="large"
              sx={{
                fontSize: "3.5rem",
                mr: "1rem",
                color: "var(--white)",
              }}
            />
          )
        ) : (
          <img
            src={toasterContent[status!]?.url}
            style={{ marginRight: "1rem" }}
          ></img>
        )}
        <Typography
          textAlign="center"
          variant="h5"
          fontWeight="bold"
          color="var(--white)"
        >
          {toasterContent[status!]?.text}
        </Typography>
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
