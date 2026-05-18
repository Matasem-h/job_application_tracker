// This is the Dashboard page, showing the user relevant statistics

import { useState, useEffect } from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";
import Navbar from "../components/Navbar.jsx";
import { getStats } from "../services/api.js";

const DashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Displaying statistics on page load
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getStats();
                setStats(response.data);
            } catch (err) {
                setError("Failed to load statistics.");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div style={{padding: "2rem"}}>Loading</div>;
    if (error) return <div style={{padding: "2rem"}}>{error}</div>

    // Getting data for the bar chart
    const chartData = [
        { name: "Applied", value: stats.applied, fill: "#93c5fd" },
        { name: "Interview", value: stats.interview, fill: "#fcd34d" },
        { name: "Offer", value: stats.offer, fill: "#86efac" },
        { name: "Rejected", value: stats.rejected, fill: "#fca5a5" },
    ];

    return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Navbar />

      <div style={{ padding: "16px" }}>
        {/* Metric cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "16px" }}>
          <div style={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e5e7eb", padding: "16px" }}>
            <p style={{ margin: "0 0 4px", fontSize: "12px", color: "#6b7280" }}>Total applications</p>
            <p style={{ margin: 0, fontSize: "24px", fontWeight: "600" }}>{stats.total}</p>
          </div>
          <div style={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e5e7eb", padding: "16px" }}>
            <p style={{ margin: "0 0 4px", fontSize: "12px", color: "#6b7280" }}>Interviews</p>
            <p style={{ margin: 0, fontSize: "24px", fontWeight: "600", color: "#d97706" }}>{stats.interview}</p>
          </div>
          <div style={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e5e7eb", padding: "16px" }}>
            <p style={{ margin: "0 0 4px", fontSize: "12px", color: "#6b7280" }}>Offers</p>
            <p style={{ margin: 0, fontSize: "24px", fontWeight: "600", color: "#16a34a" }}>{stats.offer}</p>
          </div>
          <div style={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e5e7eb", padding: "16px" }}>
            <p style={{ margin: "0 0 4px", fontSize: "12px", color: "#6b7280" }}>Response rate</p>
            <p style={{ margin: 0, fontSize: "24px", fontWeight: "600" }}>{stats.responseRate}%</p>
          </div>
        </div>

        {/* Bar chart */}
        <div style={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e5e7eb", padding: "1.5rem" }}>
          <p style={{ margin: "0 0 1rem", fontSize: "14px", fontWeight: "600" }}>Applications by stage</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis allowDecimals={false} fontSize={12} />
              <Tooltip />
              <Bar dataKey="value" fill="#93c5fd" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;


