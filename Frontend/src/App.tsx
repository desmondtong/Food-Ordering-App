import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./context/user";
import { socket } from "./socket";

import Login from "./pages_customer/Login";
import Registration from "./pages_customer/Registration";
import Homepage from "./pages_customer/Homepage";
import RestaurantDetails from "./pages_customer/RestaurantDetails";
import Cart from "./pages_customer/Cart";
import CheckOut from "./pages_customer/CheckOut";
import History from "./pages_customer/History";
import HistoryDetail from "./pages_customer/HistoryDetail";
import Favourite from "./pages_customer/Favourite";
import Tracker from "./pages_customer/Tracker";
import Dashboard from "./pages_vendor/Dashboard";
import Menu from "./pages_vendor/Menu";
import HistoryVendor from "./pages_vendor/HistoryVendor";
import Alert from "./pages_vendor/Alert";
import RatingReview from "./pages_vendor/RatingReview";

import useFetch from "./hooks/useFetch";
import useFetchImg from "./hooks/useFetchImg";
import {
  OrderInfo,
  Props,
  SnackbarMessage,
  data,
  userInfoType,
} from "./interfaces";

function App() {
  const fetchData = useFetch();
  const fetchDataImg = useFetchImg();
  const navigate = useNavigate();

  // states for login
  const initAccessToken = JSON.parse(localStorage.getItem("accessToken")!);
  const initRefreshToken = JSON.parse(localStorage.getItem("refreshToken")!);
  const initRole = JSON.parse(localStorage.getItem("role")!);
  const initUserId = JSON.parse(localStorage.getItem("userId")!);

  const initCustomerClaims = JSON.parse(
    localStorage.getItem("customerClaims")!
  );
  const initVendorClaims = JSON.parse(localStorage.getItem("vendorClaims")!);

  const [accessToken, setAccessToken] = useState<String>(initAccessToken);
  const [refreshToken, setRefreshToken] = useState<String>(initRefreshToken);
  const [role, setRole] = useState<String>(initRole);
  const [userId, setUserId] = useState<String>(initUserId);

  const [customerClaims, setCustomerClaims] =
    useState<Props>(initCustomerClaims);
  const [vendorClaims, setVendorClaims] = useState<Props>(initVendorClaims);
  const [userInfo, setUserInfo] = useState<Props>({});

  // other states
  const [vendorId, setVendorId] = useState<String>("");
  const [vendorInfo, setVendorInfo] = useState<userInfoType>({});

  const [haveActiveOrder, setHaveActiveOrder] = useState<boolean>(false);
  const [activeOrderId, setActiveOrderId] = useState<String[]>([]);

  const [cartItemInfo, setCartItemInfo] = useState<Props>({});
  const [orderInfo, setOrderInfo] = useState<OrderInfo>([]);

  const [imageUrl, setImageUrl] = useState<string>("");
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([]);

  // endpoint
  const getUserInfo = async () => {
    const res: data = await fetchData(
      "/auth/accounts/" + userId,
      undefined,
      undefined,
      accessToken
    );

    if (res.ok) {
      setUserInfo(res.data);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const refresh = async () => {
    const res: data = await fetchData("/auth/refresh/", "POST", {
      refresh: refreshToken,
    });
    console.log("refreshing");

    if (res.ok) {
      setAccessToken(res.data.access);
      return;
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const getCartItems = async () => {
    const res: data = await fetchData(
      "/api/carts/" + userId,
      "POST",
      undefined,
      accessToken
    );

    if (res.ok) {
      setCartItemInfo(res.data);
      setVendorId(res.data.vendor_id);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const getCustomerLastOrder = async () => {
    const res: data = await fetchData(
      "/api/orders/items/active/user_id",
      "POST",
      {
        user_id: userId,
      },
      accessToken
    );

    if (res.ok) {
      if (res.data[0].length) {
        setOrderInfo(res.data);

        setHaveActiveOrder(true);
        setActiveOrderId([res.data[0][0].order_id]);
      }
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const getVendorActiveOrder = async () => {
    const res: data = await fetchData(
      "/api/orders/items/active/vendor_id",
      "POST",
      {
        vendor_id: userId,
      },
      accessToken
    );

    if (res.ok) {
      if (res.data.length) {
        setOrderInfo(res.data);
        setHaveActiveOrder(true);
      } else {
        setOrderInfo([]);
        setHaveActiveOrder(false);
      }
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const displayImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.files!;

    const formData = new FormData();
    formData.append("image", input[0]);

    const res: data = await fetchDataImg(
      "/api/image",
      "POST",
      formData,
      accessToken
    );

    if (res.ok) {
      setImageUrl(res.data.imageUrl);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  // function
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    localStorage.removeItem("customerClaims");
    localStorage.removeItem("vendorClaims");

    setAccessToken("");
    setRefreshToken("");
    setRole("");
    setUserId("");

    setCustomerClaims({});
    setVendorClaims({});
    setHaveActiveOrder(false);

    if (role === "CUSTOMER") {
      navigate("/");
    } else {
      navigate("/login/vendor");
    }
  };

  // useEff to control instance of sockets received from server to 2
  // was 6-8 times before useEff
  useEffect(() => {
    socket.on("orderStatusUpdate", (user_id) => {
      console.log("CUSTOMER SOCKET");
      if (userId === user_id) {
        getCustomerLastOrder();
        // activate snackbar for notifications
        setSnackPack((prev) => [
          ...prev,
          { message: "test", key: new Date().getTime() },
        ]);
      }
    });

    socket.on("newOrder", (vendor_id) => {
      console.log("VENDOR SOCKET");
      if (userId === vendor_id) {
        getVendorActiveOrder();
        // activate snackbar for notifications
        setSnackPack((prev) => [
          ...prev,
          { message: "test", key: new Date().getTime() },
        ]);
      }
    });
  }, [socket]);

  useEffect(() => {
    // for customer
    role === "CUSTOMER" && getCartItems();

    // for customer
    role === "CUSTOMER" && getCustomerLastOrder();

    // for vendor
    role === "VENDOR" && getVendorActiveOrder();
  }, [userId]);

  return (
    <div>
      <UserContext.Provider
        value={{
          accessToken,
          setAccessToken,
          refreshToken,
          setRefreshToken,
          role,
          setRole,
          userId,
          setUserId,
          handleLogout,
          refresh,
          vendorId,
          setVendorId,
          setVendorInfo,
          vendorInfo,
          haveActiveOrder,
          setHaveActiveOrder,
          activeOrderId,
          setActiveOrderId,
          cartItemInfo,
          setCartItemInfo,
          getCartItems,
          orderInfo,
          getVendorActiveOrder,
          getCustomerLastOrder,
          vendorClaims,
          setVendorClaims,
          customerClaims,
          setCustomerClaims,
          imageUrl,
          setImageUrl,
          displayImage,
          userInfo,
          getUserInfo,
          snackPack,
          setSnackPack,
        }}
      >
        <Routes>
          {/* customer pages */}
          {!accessToken && <Route path="/" element={<Login />}></Route>}
          <Route path="/registration" element={<Registration />}></Route>

          {role === "CUSTOMER" && (
            <>
              <Route path="/" element={<Homepage />}></Route>
              <Route
                path="/details/:item"
                element={<RestaurantDetails />}
              ></Route>

              <Route path="/cart/:item" element={<Cart />}></Route>
              <Route path="/cart/:item/checkout" element={<CheckOut />}></Route>

              <Route path="/history" element={<History />}></Route>
              <Route
                path="history/details/:item"
                element={<HistoryDetail />}
              ></Route>

              <Route path="/favourite" element={<Favourite />}></Route>

              <Route path="/tracker/:item" element={<Tracker />}></Route>
            </>
          )}

          {/* vendor pages */}
          <Route path="/login/vendor" element={<Login />}></Route>
          <Route path="/registration/vendor" element={<Registration />}></Route>

          {role === "VENDOR" && (
            <>
              <Route path="/" element={<Dashboard />}></Route>

              <Route path="/menu" element={<Menu />}></Route>

              <Route path="/history" element={<HistoryVendor />}></Route>

              <Route path="/alert" element={<Alert />}></Route>

              <Route path="/ratingreview" element={<RatingReview />}></Route>
            </>
          )}
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
