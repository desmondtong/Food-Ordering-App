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

  vendorId: String;
  setVendorId: React.Dispatch<React.SetStateAction<String>>;
  vendorInfo: userInfoType;
  setVendorInfo: React.Dispatch<React.SetStateAction<userInfoType>>;

  haveActiveOrder: boolean;
  setHaveActiveOrder: React.Dispatch<React.SetStateAction<boolean>>;
  activeOrderId: String[];
  setActiveOrderId: React.Dispatch<React.SetStateAction<String[]>>;

  cartItemInfo: Props;
  setCartItemInfo: React.Dispatch<React.SetStateAction<Props>>;
  getCartItems: () => Promise<void>;

  orderInfo: OrderInfo;
  getVendorActiveOrder: () => Promise<void>;
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
  category?: any;
  uuid?: string;
  availability?: any;
  vendor_id?: string;
  image_url?: string;
  is_deleted?: boolean;
  item_id?: string;
  categories?: string[];

  update?: boolean;
  setUpdate?: React.Dispatch<React.SetStateAction<boolean>>;

  // restaurant card component
  address?: String;
  store_name?: String;
  displayVendors?: Props[];

  // top bar component
  handleSearch?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  setDisplayeVendors?: React.Dispatch<React.SetStateAction<Props[]>>;
  vendors?: Props[];

  // cart item component
  orders?: Props[];
  total_price?: String;
  cart_id?: String;
  getCartItems?: () => Promise<void>;
  user_note?: String;
  quantity_ordered?: String;

  // order accordian component
  order_id?: String;
  orderInfo?: Props[];
  status?: keyof statuses;
  date?: string;
  time?: string;

  // tracker component
  rating?: number;
  review?: string;
  is_active?: boolean;
}

export type OrderInfo = Props[][];

export interface statuses {
  SENT: JSX.Element;
  PREPARING: JSX.Element;
  DELIVERING: JSX.Element;
  COMPLETED: JSX.Element;
  CANCELLED: JSX.Element;
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
  cart_id?: String;

  address_id?: Number;
  id?: String;
  address?: String;
  postal_code?: String;
  vendor_id?: String;
  category?: String;
  store_name?: String;
  description?: any;
}
type variant = "indeterminate" | "determinate" | "buffer" | "query" | undefined;

export interface TrackerToaster {
  [key: string]: {
    title?: string;
    url?: string;
    text?: string;
    value?: number[];
    width?: number[];
    variant?: variant[];
  };
}
