import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./context/user";

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
import { data, userInfoType } from "./interfaces";

function App() {
  const initAccessToken = JSON.parse(localStorage.getItem("accessToken")!);
  const initRefreshToken = JSON.parse(localStorage.getItem("refreshToken")!);
  const initRole = JSON.parse(localStorage.getItem("role")!);
  const initUserId = JSON.parse(localStorage.getItem("userId")!);

  const [accessToken, setAccessToken] = useState<String>(initAccessToken);
  const [refreshToken, setRefreshToken] = useState<String>(initRefreshToken);
  const [role, setRole] = useState<String>(initRole);
  const [userId, setUserId] = useState<String>(initUserId);
  const [userInfo, setUserInfo] = useState<userInfoType>({});

  const [vendorId, setVendorId] = useState<String>("");
  const [vendorInfo, setVendorInfo] = useState<userInfoType>({});

  const fetchData = useFetch();
  const navigate = useNavigate();

  // endpoint
  const getUserInfo = async (isVendor = false) => {
    const id = isVendor ? vendorId : userId;
    
    const res: data = await fetchData(
      "/auth/accounts/" + id,
      undefined,
      undefined,
      accessToken
    );

    if (res.ok) {
      if (!isVendor) {
        // Store userInfo to localStorage and set as initial state
        localStorage.setItem("userInfo", JSON.stringify(res.data));

        // Set initial userInfo from localStorage after component mounts
        const initUserInfo = JSON.parse(localStorage.getItem("userInfo")!);
        if (initUserInfo) {
          setUserInfo(initUserInfo);
        }
      } else {
        setVendorInfo(res.data);
      }
    } else {
      // alert(JSON.stringify(res.data));
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

  // function
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("userInfo");

    setAccessToken("");
    setRefreshToken("");
    setRole("");
    setUserId("");
    setUserInfo({});

    if (role === "CUSTOMER") {
      navigate("/");
    } else {
      navigate("/login/vendor");
    }
  };

  // when user logs in, userId is updated and app gets user info
  useEffect(() => {
    getUserInfo();
  }, [userId]);

  useEffect(() => {
    console.log(vendorId);
    if (vendorId) getUserInfo(true);
  }, [vendorId]);

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
          userInfo,
          setUserInfo,
          handleLogout,
          refresh,
          getUserInfo,
          setVendorId,
          setVendorInfo,
          vendorInfo,
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

              <Route path="/favourite/:item" element={<Favourite />}></Route>

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
