import { Routes, Route, createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ScrollRestoration } from "react-router-dom";
import Login from '@/views/Login'
import Register from '@/views/Register'
import Profile from '@/views/profile/Profile'
import Textures from '@/views/profile/Textures'
import Security from '@/views/profile/Security'
import UserAdmin from "@/views/admin/UserAdmin";
import NeedLogin from "@/components/NeedLogin";
import SendEmail from "@/views/SendEmail";
import { sendForgotEmail, sendRegEmail } from "@/apis/apis";
import Forgot from "@/views/Forgot";
import HomePage from "@/views/HomePage";
import Error from "@/views/Error";

const router = createBrowserRouter([
    { path: "*", Component: Root },
])

function Root() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register_email" element={<SendEmail title="注册" sendService={sendRegEmail} />} />
        <Route path="/forgot_email" element={<SendEmail title="重设密码" anyEmail sendService={sendForgotEmail} />} />
        <Route path="/forgot" element={<Forgot />} />

        {/* 需要登录的路由组 */}
        <Route element={<NeedLogin><Outlet /></NeedLogin>}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/textures" element={<Textures />} />
          <Route path="/security" element={<Security />} />
        </Route>

        {/* 需要管理员权限的路由组 */}
        <Route element={<NeedLogin needAdmin><Outlet /></NeedLogin>}>
          <Route path="/admin/user" element={<UserAdmin />} />
        </Route>

        {/* 404 处理 */}
        <Route path="*" element={<Error/>} />
      </Routes>
      <ScrollRestoration />
    </>
  )
}


export function PageRoute() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

