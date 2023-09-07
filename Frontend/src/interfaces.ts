import { To } from "react-router-dom";

export interface useFetchType {
  (
    endpoint: String,
    method: string,
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
}

export interface navBarType {
  item: String;
  link: To;
  icon: JSX.Element;
}
