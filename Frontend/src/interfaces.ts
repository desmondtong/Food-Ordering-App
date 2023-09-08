import { To } from "react-router-dom";

export interface UserContextType {
  accessToken: String;
  setAccessToken: React.Dispatch<React.SetStateAction<String>>;
  refreshToken: String;
  setRefreshToken: React.Dispatch<React.SetStateAction<String>>;
  role: String;
  setRole: React.Dispatch<React.SetStateAction<String>>;
  userId: String;
  setUserId: React.Dispatch<React.SetStateAction<String>>;
  userInfo: userInfoType;
  setUserInfo: React.Dispatch<React.SetStateAction<userInfoType>>;
  handleLogout: () => void;
  refresh: () => Promise<void>;
  getUserInfo: () => Promise<void>;
}

export interface data {
  status?: String;
  errors?: String;
  message?: String;
  msg?: String;
  ok?: Boolean;
  data?: any;
}

export interface returnValue {
  ok: Boolean;
  data: data | any;
}

export interface useFetchType {
  (
    endpoint: String,
    method?: string,
    body?: Object,
    token?: String,
    isExtAPI?: boolean
  ): Promise<{}>;
}

export interface Props {
  //btn component
  onClick?: any;
  width?: String;
  startIcon?: any;
  id?: any;
  children?: any;
  fullWidth?: boolean;
  variant?: "text" | "outlined" | "contained";

  //item card component
  name?: String;
  description?: String;
  item_price?: String;
  category?: String;
}

export interface navBarType {
  item: String;
  link: To;
  icon: JSX.Element;
}

export interface registerBody {
  role: string;
  email: String;
  password: String;
  contact: String;
  first_name: String;
  last_name: String;
  category?: String;
  store_name?: String;
  address?: String;
  postal_code?: String;
}

export interface userInfoType {
  uuid?: String;
  role?: String;
  email?: String;
  password?: String;
  contact?: String;
  is_deleted?: Boolean;
  user_id?: String;
  first_name?: String;
  last_name?: String;

  address_id?: Number;
  id?: String;
  address?: String;
  postal_code?: String;
  vendor_id?: String;
  category?: String;
  store_name?: String;
  description?: any;
}
