import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./components/layout/layout";
import { Home } from "./pages/home";
import { PaymentForm } from "./pages/payment";
import { ProfilePage } from "./pages/profile";
import { AboutPage } from "./pages/about";
import { FAQPage } from "./pages/faq";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/profile", element: <ProfilePage /> },
        { path: "/about", element: <AboutPage /> },
        { path: "/payment", element: <PaymentForm /> },
        { path: "/faq", element: <FAQPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
