import { To } from "react-router-dom";

export interface Props {
  //btn component
  onClick?: any;
  width?: any;
  startIcon?: any;
  id?: any;
  children?: any;
}

export interface navBarType {
  item: String;
  link: To;
  icon: JSX.Element;
}
