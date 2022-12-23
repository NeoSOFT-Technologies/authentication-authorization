import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store";
import * as serviceWorker from "./serviceWorker";
import "./i18n/config";
import { AuthProvider } from "react-oidc-context";
import { Provider } from "react-redux";
import { WebStorageStateStore } from "oidc-client-ts";
import { AuthProviders } from "./utils/oidc-config";

const Identityprovider: any = AuthProviders.Azure;
const oidc = {
  config: Identityprovider.config,
  name: Identityprovider.name,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider
        userStore={
          new WebStorageStateStore({
            store: localStorage,
          })
        }
        {...oidc?.config!}
      >
        <App authProvider={oidc.name} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
  document.querySelector("#root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
