// src/assets/Router/Router.jsx
import { createBrowserRouter } from "react-router-dom";
import Home from "../../Pages/Home";
import About from "../../Pages/About";
import App from "../../App";
import CreateJob from "../../Pages/CreateJob";
import MyJobs from "../../Pages/MyJobs";
import SalaryPage from "../../Pages/SalaryPage";
import UpdateJob from "../../Pages/UpdateJob";
import ProtectedRoute from "../../components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />, // Home is publicly accessible
      },
      {
        path: "/post-job",
        element: (
          <ProtectedRoute>
            <CreateJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-job",
        element: (
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/salary",
        element: (
          <ProtectedRoute>
            <SalaryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-job/:id",
        element: (
          <ProtectedRoute>
            <UpdateJob />
          </ProtectedRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/all-jobs/${params.id}`),
      },
    ],
  },
]);

export default router;
