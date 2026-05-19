// This is the Dashboard page, showing the user relevant statistics

import { useState, useEffect } from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell} from "recharts";
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
        { name: "Applied", value: stats.applied, fill: "#407AFC" },
        { name: "Interview", value: stats.interview, fill: "#f59e0b" },
        { name: "Offer", value: stats.offer, fill: "#22c55e" },
        { name: "Rejected", value: stats.rejected, fill: "#ef4444" },
    ];

    return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Navbar />

      {/* Page header */}
      <div style={{ padding: "16px 24px", backgroundColor: "#f0f2f5", borderBottom: "2px solid #5B7EC9" }}>
        <h1 style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#262A33" }}>📊 Statistics</h1>
      </div>

      <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>

        {/* 4 Metric cards in a row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
          <div style={{ backgroundColor: "white", borderRadius: "10px", border: "1px solid #e5e7eb", borderLeft: "4px solid #407AFC", padding: "20px" }}>
            <p style={{ margin: "0 0 8px", fontSize: "13px", color: "#627296", fontWeight: "500" }}>Total Applications</p>
            <p style={{ margin: 0, fontSize: "36px", fontWeight: "700", color: "#262A33" }}>{stats.total}</p>
          </div>
          <div style={{ backgroundColor: "white", borderRadius: "10px", border: "1px solid #e5e7eb", borderLeft: "4px solid #f59e0b", padding: "20px" }}>
            <p style={{ margin: "0 0 8px", fontSize: "13px", color: "#627296", fontWeight: "500" }}>Interviews</p>
            <p style={{ margin: 0, fontSize: "36px", fontWeight: "700", color: "#f59e0b" }}>{stats.interview}</p>
          </div>
          <div style={{ backgroundColor: "white", borderRadius: "10px", border: "1px solid #e5e7eb", borderLeft: "4px solid #16a34a", padding: "20px" }}>
            <p style={{ margin: "0 0 8px", fontSize: "13px", color: "#627296", fontWeight: "500" }}>Offers</p>
            <p style={{ margin: 0, fontSize: "36px", fontWeight: "700", color: "#16a34a" }}>{stats.offer}</p>
          </div>
          <div style={{ backgroundColor: "white", borderRadius: "10px", border: "1px solid #e5e7eb", borderLeft: "4px solid #627296", padding: "20px" }}>
            <p style={{ margin: "0 0 8px", fontSize: "13px", color: "#627296", fontWeight: "500" }}>Response Rate</p>
            <p style={{ margin: 0, fontSize: "36px", fontWeight: "700", color: "#262A33" }}>{stats.responseRate}%</p>
          </div>
        </div>

        {/* Bar chart */}
        <div style={{ backgroundColor: "white", borderRadius: "10px", border: "1px solid #e5e7eb", padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <p style={{ margin: "0 0 1rem", fontSize: "15px", fontWeight: "700", color: "#262A33" }}>Applications by stage</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f5" />
              <XAxis dataKey="name" fontSize={12} tick={{ fill: "#627296" }} />
              <YAxis allowDecimals={false} fontSize={12} tick={{ fill: "#627296" }} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;


