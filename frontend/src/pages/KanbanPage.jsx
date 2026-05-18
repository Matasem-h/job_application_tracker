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
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Navbar />

      {/* Toolbar */}
      <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: "1rem", borderBottom: "1px solid #e5e7eb", backgroundColor: "white" }}>
        <h1 style={{ margin: 0, fontSize: "15px", fontWeight: "600" }}>My applications</h1>
        <input
          type="search"
          placeholder="Search by company or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: "6px 10px", border: "1px solid #e5e7eb", borderRadius: "4px", fontSize: "13px", width: "240px" }}
        />
        <button
          onClick={() => handleAddClick("APPLIED")}
          style={{ marginLeft: "auto", padding: "6px 14px", backgroundColor: "black", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px" }}
        >
          + New
        </button>
      </div>

      {error && <p style={{ color: "red", padding: "1rem" }}>{error}</p>}

      {/* Kanban columns */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", padding: "16px" }}>
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


