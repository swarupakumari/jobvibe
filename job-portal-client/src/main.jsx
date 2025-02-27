import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from "@mantine/core";
import router from "./assets/Router/Router.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Auth0Provider
        domain="dev-oegz3g6pqp8fms76.us.auth0.com"
        clientId="SR2zNoiOdIov6x0S7AvWIeU9x5TL5Eh0"
        authorizationParams={{
          redirect_uri: "http://localhost:5173/",
        }}
        audience="http://localhost:3000"
        scope="openid profile email"
      >
        <RouterProvider router={router} />
      </Auth0Provider>
    </MantineProvider>
  </React.StrictMode>
);
