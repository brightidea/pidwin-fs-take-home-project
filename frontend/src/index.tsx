import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import "./index.css";
import loginReducer from "./reducers/login";
import coinTossReducer from "./reducers/coinToss";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themes/Default";

const store = configureStore({
    reducer: {
        user: loginReducer,
        coinToss: coinTossReducer,
    },
});
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </ThemeProvider>
);
