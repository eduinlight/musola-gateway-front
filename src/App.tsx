import React, { FunctionComponent } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import { CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import "./styles.scss";
import "typeface-roboto";
import LoadApp from "./LoadApp";
import dayjsIO from "@date-io/dayjs";
import "dayjs/locale/en";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { routes } from "./routes";
import Routes from "./components/shared/Routes";
import { getService } from "./core/services";
import { ConfigService } from "./core/services/config.service";

const configService = getService<ConfigService>(ConfigService);

const App: FunctionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <LoadApp>
          <MuiPickersUtilsProvider utils={dayjsIO}>
            <SnackbarProvider
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              transitionDuration={
                configService.notifications.transitionDuration
              }
              autoHideDuration={configService.notifications.autoHideDuration}
              maxSnack={3}
            >
              <Router>
                <Routes routes={routes} />
              </Router>
            </SnackbarProvider>
          </MuiPickersUtilsProvider>
        </LoadApp>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
