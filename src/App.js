import "./App.css";
import Routes from "./routes";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import Store from "./redux/store";
import theme from "./constants/theme";
function App() {
  window.alert = (data) => console.log(data);
  return (
    <div className="App">
      <Provider store={Store()}>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
