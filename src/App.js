import "./App.css";
import Routes from "./routes";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import Store from "./redux/store";
import theme from "./constants/theme";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

function App() {
  return (
    <div className="App">
      <I18nextProvider i18n={i18n}>
        <Provider store={Store()}>
          <ThemeProvider theme={theme}>
            <Routes />
          </ThemeProvider>
        </Provider>
      </I18nextProvider>
    </div>
  );
}

export default App;
