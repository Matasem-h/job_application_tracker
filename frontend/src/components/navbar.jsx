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
    <nav style={{ backgroundColor: "white", borderBottom: "1px solid #e5e7eb", padding: "0 1.5rem", height: "48px", display: "flex", alignItems: "center", gap: "1rem" }}>
      {/* Logo */}
      <span style={{ fontSize: "15px", fontWeight: "600", marginRight: "1rem" }}>Job Tracker</span>

      {/* Navigation links */}
      <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: location.pathname === "/" ? "600" : "400", padding: "4px 8px", borderRadius: "4px", backgroundColor: location.pathname === "/" ? "#f3f4f6" : "transparent" }}>
        Board
      </button>
      <button onClick={() => navigate("/dashboard")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: location.pathname === "/dashboard" ? "600" : "400", padding: "4px 8px", borderRadius: "4px", backgroundColor: location.pathname === "/dashboard" ? "#f3f4f6" : "transparent" }}>
        Dashboard
      </button>

      {/* Right side */}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ fontSize: "13px", color: "#6b7280" }}>{user?.email}</span>
        <button onClick={handleLogout} style={{ fontSize: "13px", padding: "5px 12px", cursor: "pointer", border: "1px solid #e5e7eb", borderRadius: "4px", background: "none" }}>
          Log out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;


