import { CartProvider } from "./context/CartProvider";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Cards from "./component/Cards";
import ErrorPage from "./pages/ErrorPage"
import Tickets from "./pages/Tickets";
import Body from "./component/Body";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Venue from "./pages/Venue"
import { ModalProvider } from "./context/ModalContext";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ModalProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />}>
                <Route
                  index
                  element={
                    <>
                      <Body />
                      <Cards />
                    </>
                  }
                />
                <Route path="/tickets/:name" element={<Tickets />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/venue" element={<Venue />} />
                <Route path="*" element={<ErrorPage />} />
              </Route>

            </Routes>

          </BrowserRouter>
        </ModalProvider>
      </CartProvider>
    </AuthProvider>
  );
}
