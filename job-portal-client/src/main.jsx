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
        domain="dev-ig7i51uf0c4fxrbb.us.auth0.com"
        clientId="TqUTUNDGQsAgquGJorrSAjka8lVqtIpC"
        authorizationParams={{
          redirect_uri: "https://jobvibe-front.vercel.app/",
        }}
        audience="http://localhost:3000"
        scope="openid profile email"
      >
        <RouterProvider router={router} />
      </Auth0Provider>
    </MantineProvider>
  </React.StrictMode>
);
