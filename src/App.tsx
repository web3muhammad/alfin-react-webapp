import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./components/layout/layout";
import { Home } from "./pages/home";
import { PaymentForm } from "./pages/payment";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/payment",
          element: <PaymentForm />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
