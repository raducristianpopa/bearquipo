import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { Layout } from "./components/Layout";
import App from "./App";
import "./assets/styles/style.css";
import store from "./utils/store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Layout>
        <App />
      </Layout>
    </Provider>
  </React.StrictMode>
);
