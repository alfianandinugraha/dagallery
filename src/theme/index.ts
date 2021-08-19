import { createTheme } from "@material-ui/core";

const overrideTheme = createTheme({
  typography: {
    fontFamily: '\'Lato\', sans-serif'
  },
  palette: {
    error: {
      main: '#F2251C'
    }
  }
})

export default overrideTheme