import SignUp from "./Authentication/SignUp"
import SignIn from "./Authentication/SignIn"
import { Routes, Route, useLocation } from "react-router-dom"
import Dashboard from "./Dashboard/Dashboard"
import ProfilePage from "./components/ProfilePage"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import PostProduct from "./components/PostProduct"
import ProductDetail from "./components/ProductDetail"
import MyUploads from "./components/MyUploads"
import ForgetPassword from "./Authentication/ForgetPassword"
import VerifyCode from "./Authentication/VerfiyCode"
import ResetPassword from "./Authentication/resetPassword"

function App() {
  const location = useLocation()
  // console.log(location.pathname)
  return (
    <>

      {(location.pathname !== "/signup" && location.pathname !== "/signin") && <Navbar />}
      <Routes>
        <Route path="/" element={< Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/post" element={<PostProduct />} />
        <Route path="/ProductDetail/:id" element={<ProductDetail />} />
        <Route path="/MyUploads" element={<MyUploads />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/VerifyCode" element={<VerifyCode />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />


        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      {(location.pathname !== "/signup" && location.pathname !== "/signin") && <Footer />}
    </>
  )
}

export default App
