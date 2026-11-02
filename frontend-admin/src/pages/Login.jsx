import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { errMsg } from "../api";
import { useAuth } from "../context/AuthAdminContext";

export default function Login() {
  const {admin_login} = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      const data  = await admin_login({username: form.username, password: form.password});
      if(!data){
        console.log(data);
        return;
      }else{
        console.log("Login attempt with:", data.data.message);

        nav("/orders");
        return data;
      }
      
      
    } catch (err) { setError(errMsg(err)); }
    finally { setBusy(false); }
  };

  return (
    <div className="login-wrap">
      <form className="login" onSubmit={submit}>
        <h1>Tilthai Mart</h1>
        <p className="muted">Sign in to manage orders and the menu.</p>
        <label>Username
          <input type="text" required value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })} />
        </label>
        <label>Password
          <input type="password" required value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn primary" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button>
      </form>
    </div>
  );
}
