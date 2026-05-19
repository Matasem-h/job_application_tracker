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
    <div style={{ display: "flex", minHeight: "100vh", margin: 0 }}>
        {/* Left panel - 60% */}
        <div style={{ flex: 6, background: "linear-gradient(135deg, #262A33 0%, #407AFC 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem", color: "white" }}>
            <h1 style={{ fontSize: "3.5rem", fontWeight: "700", margin: "0 0 1rem", textAlign: "center" }}>Job Tracker</h1>
            <p style={{ fontSize: "1.1rem", textAlign: "center", opacity: 0.85, maxWidth: "340px", lineHeight: "1.6" }}>Track your job search, stay organized, and land your dream job!</p>
            <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", gap: "1rem", width: "100%", maxWidth: "320px" }}>
                {[
                    "📋 Never lose track of job applications again!",
                    "📊 See your progress with a live dashboard!",
                    "🔔 Stay ready for every deadline!",
                    "🔍 Find all your applications in seconds!"
                ].map((feature) => (
                    <div key={feature} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.95rem", opacity: 0.9 }}>
                        <span>{feature}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Right panel - 40% */}
        <div style={{ flex: 4, backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem" }}>
            <div style={{ width: "100%", maxWidth: "400px" }}>
                <h2 style={{ fontSize: "1.75rem", fontWeight: "700", color: "#262A33", marginBottom: "0.5rem" }}>
                    {isLogin ? "Welcome!" : "Create an account"}
                </h2>
                <p style={{ color: "#627296", marginBottom: "2rem", fontSize: "0.9rem" }}>
                    {isLogin ? "Log in to your account to continue." : "Start tracking your job search today."}
                </p>

                {/* Tab switcher */}
                <div style={{ display: "flex", marginBottom: "1.5rem", borderBottom: "2px solid #e5e7eb" }}>
                    <button onClick={() => setIsLogin(true)} style={{ flex: 1, padding: "0.6rem", background: "none", border: "none", borderBottom: isLogin ? "2px solid #407AFC" : "none", fontWeight: isLogin ? "600" : "400", color: isLogin ? "#407AFC" : "#627296", cursor: "pointer", fontSize: "0.9rem", marginBottom: "-2px" }}>
                        Log in
                    </button>
                    <button onClick={() => setIsLogin(false)} style={{ flex: 1, padding: "0.6rem", background: "none", border: "none", borderBottom: !isLogin ? "2px solid #407AFC" : "none", fontWeight: !isLogin ? "600" : "400", color: !isLogin ? "#407AFC" : "#627296", cursor: "pointer", fontSize: "0.9rem", marginBottom: "-2px" }}>
                        Register
                    </button>
                </div>

                {/* Error message */}
                {error && <p style={{ color: "#dc2626", marginBottom: "1rem", fontSize: "0.875rem", backgroundColor: "#fef2f2", padding: "0.75rem", borderRadius: "6px" }}>{error}</p>}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.875rem", fontWeight: "500", color: "#555963" }}>Email address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: "100%", padding: "0.65rem 0.75rem", border: "1px solid #5B7EC9", borderRadius: "6px", boxSizing: "border-box", fontSize: "0.9rem", color: "#262A33", outline: "none" }} placeholder="you@example.com" />
                    </div>
                    <div style={{ marginBottom: "1.5rem" }}>
                        <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.875rem", fontWeight: "500", color: "#555963" }}>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%", padding: "0.65rem 0.75rem", border: "1px solid #5B7EC9", borderRadius: "6px", boxSizing: "border-box", fontSize: "0.9rem", color: "#262A33", outline: "none" }} placeholder="••••••••" />
                    </div>
                    <button type="submit" disabled={loading} style={{ width: "100%", padding: "0.75rem", backgroundColor: "#407AFC", color: "white", border: "none", borderRadius: "6px", cursor: loading ? "not-allowed" : "pointer", fontSize: "0.9rem", fontWeight: "700", opacity: loading ? 0.7 : 1 }}>
                        {loading ? "Please wait..." : isLogin ? "Log in" : "Create account"}
                    </button>
                </form>
            </div>
        </div>
    </div>
);

};

export default LoginPage;


