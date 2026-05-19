// This file is for the Kanban page, it combines all 4 of its components

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import KanbanColumn from "../components/KanbanColumn.jsx";
import ApplicationModal from "../components/ApplicationModal.jsx";
import { getApplications, createApplication, updateApplication, deleteApplication } from "../services/api.js"; 

const STAGES = ["APPLIED", "INTERVIEW", "OFFER", "REJECTED"];

const KanbanPage = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [initialStage, setInitialStage] = useState("APPLIED");
    const [searchQuery, setSearchQuery] = useState("");

    // Fetching all applications on page laod
    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await getApplications();
            setApplications(response.data);
        } catch (err) {
            setError("Failed to load applications.")
        } finally {
            setLoading(false)
        }
    };

    // Filtering applications by search query
    const filteredApplications = applications.filter((app) =>
        app.company.toLowerCase().includes(searchQuery.toLocaleLowerCase()) || app.role.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
    );

    // Getting applications for a specific stage
    const getStageApplications = (stage) =>
        filteredApplications.filter((app) => app.stage === stage );

    // Openning modal to add a new application
    const handleAddClick = (stage) => {
        setSelectedApplication(null);
        setInitialStage(stage);
        setModalOpen(true);
    };

    // Openning modal to edit an existing application
    const handleCardClick = (application) => {
        setSelectedApplication(application);
        setModalOpen(true);
    };

    // Saving a new or updated application
    const handleSave = async (formData) => {
        try {
            if (selectedApplication) {
                await updateApplication(selectedApplication.id, formData);
            } else {
                await createApplication(formData);
            }
            setModalOpen(false);
            fetchApplications();
        } catch (err) {
            setError("Failed to save the application.")
        }
    };

    // Delete an application
    const handleDelete = async () => {
        try {
            await deleteApplication(selectedApplication.id);
            setModalOpen(false);
            fetchApplications();
        } catch (err) {
            setError("Failed to delete application.");
        }
    };

    if (loading) return <div style={{padding: "2rem"}}>Loading...</div>

    return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Navbar />

      {/* Toolbar */}
      <div style={{ padding: "12px 24px", display: "flex", alignItems: "center", gap: "1rem", backgroundColor: "#f0f2f5", borderBottom: "2px solid #5B7EC9" }}>
        <h1 style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#262A33" }}>My applications</h1>
        <input
          type="search"
          placeholder="Search by company or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: "6px 12px", border: "1px solid #5B7EC9", borderRadius: "6px", fontSize: "13px", width: "240px", color: "#262A33", outline: "none", backgroundColor: "white" }}
        />
        <button
          onClick={() => handleAddClick("APPLIED")}
          style={{ marginLeft: "auto", padding: "8px 20px", backgroundColor: "#407AFC", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "700", boxShadow: "0 2px 6px rgba(64,122,252,0.4)" }}
        >
          + New Application
        </button>
      </div>

      {error && <p style={{ color: "#dc2626", padding: "1rem" }}>{error}</p>}

      {/* Kanban columns — centered */}
      <div style={{ display: "flex", justifyContent: "center", padding: "24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 260px)", gap: "16px" }}>
          {STAGES.map((stage) => (
            <KanbanColumn
              key={stage}
              stage={stage}
              applications={getStageApplications(stage)}
              onCardClick={handleCardClick}
              onAddClick={handleAddClick}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <ApplicationModal
          application={selectedApplication}
          initialStage={initialStage}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default KanbanPage;


