// This file contains the navigation bar that is shown on all protected pages
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
    const {logout, user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

  return (
    <nav style={{ backgroundColor: "#262A33", padding: "0 1.5rem", height: "52px", display: "flex", alignItems: "center", gap: "1rem" }}>
      {/* Logo */}
      <span style={{ fontSize: "16px", fontWeight: "700", marginRight: "1rem", color: "white" }}>Job Tracker</span>

      {/* Navigation links */}
      <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "500", padding: "6px 14px", borderRadius: "6px", color: location.pathname === "/" ? "white" : "#9ca3af", backgroundColor: location.pathname === "/" ? "#407AFC" : "transparent" }}>
        📋 Board
      </button>
      <button onClick={() => navigate("/dashboard")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "500", padding: "6px 14px", borderRadius: "6px", color: location.pathname === "/dashboard" ? "white" : "#9ca3af", backgroundColor: location.pathname === "/dashboard" ? "#407AFC" : "transparent" }}>
        📊 Statistics
      </button>

      {/* Right side */}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ fontSize: "13px", color: "#627296" }}>{user?.email}</span>
        <button onClick={handleLogout} style={{ fontSize: "13px", padding: "5px 14px", cursor: "pointer", border: "1px solid #555963", borderRadius: "6px", background: "none", color: "#9ca3af" }}>
          Log out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;


