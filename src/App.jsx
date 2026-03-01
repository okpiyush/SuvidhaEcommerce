import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import SingleProduct from "./Pages/SingleProduct";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Navbar from "./Components/Navbar";
import Announcement from "./Components/Announcement/Announcement";
import Footer from "./Components/Footer";
import ForgotPassword from "./Pages/ForgotPassword"
import Profile from "./Pages/Profile/Profile";
import Chat from "./Pages/Chat/Chat";
import Checkout from "./Pages/Checkout";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #0f172a;
    --accent: #10b981;
    --bg: #f9fafb;
    --text-main: #1f2937;
    --text-muted: #6b7280;
    --radius: 8px;
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Outfit', 'Inter', sans-serif;
  }

  body {
    background-color: var(--bg);
    color: var(--text-main);
    -webkit-font-smoothing: antialiased;
    line-height: 1.5;
  }

  button {
    cursor: pointer;
    transition: all 0.2s ease;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <div>
        <Navbar />
        <Announcement />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="products" element={<ProductList />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="login" element={<Login />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="register" element={<Register />} />
            <Route path="chat" element={<Chat />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
};

export default App;
