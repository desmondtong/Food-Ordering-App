import React from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Props } from "../interfaces";
// import { Checkbox } from "@mui/material";
// import { orange } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

// const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
//   color: theme.status.danger,
//   "&.Mui-checked": {
//     color: theme.status.danger,
//   },
// }));

// const theme = createTheme({
//   status: {
//     danger: orange[500],
//   },
// });

const btnTheme = createTheme({
  palette: {
    background: {
      default: "#f56416",
    },
  },
});

const Btn: React.FC<Props> = (props) => {
  return (
    <>
      <ThemeProvider theme={btnTheme}>
        <Button
          variant={props.variant}
          fullWidth={props.fullWidth}
          onClick={props.onClick}
          style={{ width: `${props.width}rem`, margin: "0.25rem" }}
          startIcon={props.startIcon}
          id={props.id}
        >
          {props.children}
        </Button>
      </ThemeProvider>
    </>
  );
};

export default Btn;
