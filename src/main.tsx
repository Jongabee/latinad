import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";
import esES from "antd/lib/locale/es_ES";
import App from "./App";
import "./index.css";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ConfigProvider locale={esES}>
          <App />
        </ConfigProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
