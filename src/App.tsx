import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./components/layout/layout";
import { Home } from "./pages/home";
import { PaymentForm } from "./pages/payment";
import { ProfilePage } from "./pages/profile";
import { AboutPage } from "./pages/about";
import { FAQPage } from "./pages/faq";
import { ReferralInfoPage } from "./pages/referral-info";
import { TransactionHistoryPage } from "./pages/history";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/profile", element: <ProfilePage /> },
        { path: "/history", element: <TransactionHistoryPage /> },
        { path: "/about", element: <AboutPage /> },
        { path: "/payment", element: <PaymentForm /> },
        { path: "/faq", element: <FAQPage /> },
        { path: "/referral-info", element: <ReferralInfoPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
