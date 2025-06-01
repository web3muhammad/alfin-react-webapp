import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./components/layout/layout";
import { Home } from "./pages/home";
import { PaymentForm } from "./pages/payment";
import { ProfilePage } from "./pages/profile";
import { AboutPage } from "./pages/about";
import { FAQPage } from "./pages/faq";
import { ReferralPage } from "./pages/referral";
import { TransactionHistoryPage } from "./pages/history";
import { PersonalDataForm } from "./pages/personal-data";
import { BankCardsPage } from "./pages/bank-cards";
import { AddCardForm } from "./pages/bank-cards/add-edit-delete-card";
import { AmlPage } from "./pages/aml";
import { WithdrawlPage } from "./pages/referral/withdrawl";
import { AmlResultPage } from "./pages/aml/aml-result";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/profile", element: <ProfilePage /> },
        { path: "/payment", element: <PaymentForm /> },
        { path: "/history", element: <TransactionHistoryPage /> },
        { path: "/personal-data", element: <PersonalDataForm /> },
        { path: "/bank-cards", element: <BankCardsPage /> },
        { path: "/add-card", element: <AddCardForm /> },
        { path: "/about", element: <AboutPage /> },
        { path: "/faq", element: <FAQPage /> },
        { path: "/referral", element: <ReferralPage /> },
        { path: "/aml", element: <AmlPage /> },
        { path: "/withdrawl", element: <WithdrawlPage /> },
        { path: "/aml-result", element: <AmlResultPage /> },
      ],  
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
