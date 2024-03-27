import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import About from "../src/pages/About/About";
import Service from "../src/pages/Services/Service";
import Blog from "../src/pages/Blog/Blog";
import Login from "../src/pages/Login/Login";
import Signup from "../src/pages/Signup/Signup";
import ForgetPassword from "./pages/Login/ForgetPassword";
import Layout from "./pages/sellerDashboard/Layout/Layout";
import Dashboard from "./pages/sellerDashboard/Dashboard/Dashboard";
import Product from "./components/ProductBox/Product";
import Products from "./pages/sellerDashboard/Products/Products";
import Orders from "./pages/sellerDashboard/Orders/Orders";
import CreateProduct from "./pages/sellerDashboard/CreateProduct/CreateProduct";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import UserOrders from "./pages/Orders/Orders";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SuperAdminLayout from "./pages/superAdmin/Layout/SuperAdminLayout";
import SuperAdminDashboard from "./pages/superAdmin/Dashboard/Dashboard";
import Users from "./pages/superAdmin/Users/Users";
import SuperAdminProducts from "./pages/superAdmin/Products/Products";
import SuperAdminOrders from "./pages/superAdmin/Orders/Orders";
import Doctors from "./pages/superAdmin/Doctors/Doctors";
import Consultation from "./pages/sellerDashboard/Consultation/Consultation";
import AdminConsultation from "./pages/superAdmin/AdminConsultations/AdminConsultations";
function App() {
  return (
    <div style={{ position: "relative" }}>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/orders" element={<UserOrders />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route
          path="/seller"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="consultation" element={<Consultation />} />
        </Route>
        <Route path="/super-admin" element={ <ProtectedRoute><SuperAdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<SuperAdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<SuperAdminOrders />} />
          <Route path="products" element={<SuperAdminProducts />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="consultation" element={<AdminConsultation />} />
        </Route>
      </Routes>

      {/* <Footer /> */}
      <ToastContainer />
    </div>
  );
}

export default App;
