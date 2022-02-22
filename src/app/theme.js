import React from "react";
import { MuiThemeProvider} from "@material-ui/core/styles";

export default ({theme, children }) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
