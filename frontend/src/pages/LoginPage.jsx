// This is the Log-In/Registeration page
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

// Page elements 
const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
        if (isLogin) {
            await login(email, password);
        } else {
            await register(email, password);
        }
        navigate("/");
    } catch (err) {
        setError(err.response?.data?.message || "Something went wrong.");
    } finally {
        setLoading(false);
    }
};
    return (
        <div style={{minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f3f4f6"}}>
        <div style= {{backgroundColor: "white", padding: "2rem", borderRadius: "8px", width: "100%", maxWidth: "400px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)"}}>
        <h1 style={{textAlign: "center", marginBottom: "1.5rem", fontSize: "1.5rem"}}>Job Tracker</h1>

        {/* Tab switcher */}
        <div style={{ display: "flex", marginBottom: "1.5rem", borderBottom: "1px solid #e5e7eb" }}>
          <button onClick={() => setIsLogin(true)} style={{ flex: 1, padding: "0.5rem", background: "none", border: "none", borderBottom: isLogin ? "2px solid black" : "none", fontWeight: isLogin ? "600" : "400", cursor: "pointer" }}>
            Log in
          </button>
          <button onClick={() => setIsLogin(false)} style={{ flex: 1, padding: "0.5rem", background: "none", border: "none", borderBottom: !isLogin ? "2px solid black" : "none", fontWeight: !isLogin ? "600" : "400", cursor: "pointer" }}>
            Register
          </button>
        </div>

        {/* Error message */}
        {error && <p style={{color: "red",marginBottom: "1rem", fontSize: "0.875rem" }}>{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.875rem" }}>Email address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: "100%", padding: "0.5rem", border: "1px solid #e5e7eb", borderRadius: "4px", boxSizing: "border-box" }} placeholder="you@example.com" />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.875rem" }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%", padding: "0.5rem", border: "1px solid #e5e7eb", borderRadius: "4px", boxSizing: "border-box" }} placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} style={{ width: "100%", padding: "0.75rem", backgroundColor: "black", color: "white", border: "none", borderRadius: "4px", cursor: loading ? "not-allowed" : "pointer", fontSize: "0.875rem" }}>
            {loading ? "Please wait..." : isLogin ? "Log in" : "Create account"}
          </button>
        </form>
     
     </div>
     </div>
    )
};

export default LoginPage;


