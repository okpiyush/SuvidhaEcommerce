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

const App = () => {
  return(
    <BrowserRouter>
      <div>
        <Navbar/>
        <Announcement/>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="products" element={<ProductList />} />
            <Route path="product" element={<SingleProduct />} />
            <Route path="login" element={<Login />} />
            <Route path="cart" element={<Cart />} />
            <Route path="register" element={<Register />} />
            {/* <Route path="tnc" element={<Terms />} /> */}
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/profile" element={<Profile/>}/>
          </Route>
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  )
};

export default App;
