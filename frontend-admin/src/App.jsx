import { Navigate, NavLink, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import { useAuth } from "./context/AuthAdminContext";


// const isAuthed = () => !!localStorage.getItem("admin_token");



function Layout() {
  const {isAuthenticated, setUser, admin_logout} = useAuth();
  const nav = useNavigate();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  const logout = async (e) => { await admin_logout(); nav("/login"); };
  return (
    <div className="shell">
      <aside className="side">
        <h1>Tilthai Mart</h1>
        <NavLink to="/orders">Orders</NavLink>
        <NavLink to="/products">Products</NavLink>
        <button className="btn danger" onClick={logout}>Log out</button>
      </aside>
      <main className="main"><Outlet /></main>
    </div>
  );
}

export default function App() {
  const {isAuthenticated} = useAuth();
  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/orders" replace /> : <Login />} />
      <Route element={<Layout />}>
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
      </Route>
      <Route path="*" element={<Navigate to="/orders" replace />} />
    </Routes>
  );
}
