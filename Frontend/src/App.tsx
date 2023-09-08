import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./context/user";

import Login from "./pages_customer/Login";
import Registration from "./pages_customer/Registration";
import Homepage from "./pages_customer/Homepage";
import SearchResults from "./pages_customer/SearchResults";
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
  const initRole = JSON.parse(localStorage.getItem("role")!);
  const initUserId = JSON.parse(localStorage.getItem("userId")!);

  const [accessToken, setAccessToken] = useState<String>(initAccessToken);
  const [role, setRole] = useState<String>(initRole);
  const [userId, setUserId] = useState<String>(initUserId);
  const [userInfo, setUserInfo] = useState<userInfoType>({});

  const fetchData = useFetch();
  const navigate = useNavigate();

  // function
  const getUserInfo = async () => {
    const res: data = await fetchData(
      "/auth/accounts/" + userId,
      undefined,
      undefined,
      accessToken
    );

    // Store userInfo to localStorage and set as initial state
    localStorage.setItem("userInfo", JSON.stringify(res.data));

    // Set initial userInfo from localStorage after component mounts
    const initUserInfo = JSON.parse(localStorage.getItem("userInfo")!);
    if (initUserInfo) {
      setUserInfo(initUserInfo);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    setAccessToken("");
    setRole("");
    setUserId("");

    if (role === "CUSTOMER") {
      navigate("/");
    } else {
      navigate("/login/vendor");
    }
  };

  //when user logs in, userId is updated and app gets user info
  useEffect(() => {
    getUserInfo();
  }, [userId]);

  return (
    <div>
      <UserContext.Provider
        value={{
          accessToken,
          setAccessToken,
          role,
          setRole,
          userId,
          setUserId,
          userInfo,
          setUserInfo,
          handleLogout,
        }}
      >
        <Routes>
          {/* customer pages */}
          {!accessToken && <Route path="/" element={<Login />}></Route>}
          <Route path="/registration" element={<Registration />}></Route>

          {role === "CUSTOMER" && (
            <>
              <Route path="/" element={<Homepage />}></Route>
              <Route path="/searchresults" element={<SearchResults />}></Route>
              <Route
                path="/details/:item"
                element={<RestaurantDetails />}
              ></Route>

              <Route path="/cart/:item" element={<Cart />}>
                <Route
                  path="/cart/:item/checkout"
                  element={<CheckOut />}
                ></Route>
              </Route>

              <Route path="/history" element={<History />}>
                <Route
                  path="history/details/:item"
                  element={<HistoryDetail />}
                ></Route>
              </Route>

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
