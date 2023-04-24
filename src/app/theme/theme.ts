import { createTheme } from "@mui/material";
import { green } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: green["700"],
      contrastText: "#fff"
    }
  },
  typography: {
    fontFamily: 'monospace',
  },

})
