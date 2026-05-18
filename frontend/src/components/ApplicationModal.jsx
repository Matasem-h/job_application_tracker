// This file is used for viewing, creating, and editing a job application
import { useEffect, useState } from "react";

const STAGES = ["APPLIED", "INTERVIEW", "OFFER", "REJECTED"];

const ApplicationModal = ({application, initialStage, onClose, onSave, onDelete}) => {

    const isEditing = !!application;

    const [formData, setFormData] = useState({
        company: "",
        role: "",
        location: "",
        url: "",
        contact: "",
        notes: "",
        deadline: "",
        priority: false,
        stage: initialStage || "APPLIED"
    });

    // Filling the form with existing data when editing
    useEffect(() => {
    if (application){
        setFormData({
            company: application.company || "",
            role: application.role || "",
            location: application.location || "",
            url: application.url || "",
            contact: application.contact || "",
            notes: application.notes || "",
            deadline: application.deadline ? application.deadline.split("T")[0] : "",
            priority: application.priority || false,
            stage: application.stage || "APPLIED"
        });
    }
}, [application]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ backgroundColor: "white", borderRadius: "8px", width: "90%", maxWidth: "520px", padding: "1.5rem", maxHeight: "90vh", overflowY: "auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>{isEditing ? "Edit Application" : "New Application"}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#6b7280" }}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Company and Role */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", marginBottom: "4px" }}>Company *</label>
              <input name="company" value={formData.company} onChange={handleChange} required style={{ width: "100%", padding: "0.5rem", border: "1px solid #e5e7eb", borderRadius: "4px", boxSizing: "border-box", fontSize: "13px" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", marginBottom: "4px" }}>Role *</label>
              <input name="role" value={formData.role} onChange={handleChange} required style={{ width: "100%", padding: "0.5rem", border: "1px solid #e5e7eb", borderRadius: "4px", boxSizing: "border-box", fontSize: "13px" }} />
            </div>
          </div>

          {/* Location and Contact */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", marginBottom: "4px" }}>Location</label>
              <input name="location" value={formData.location} onChange={handleChange} style={{ width: "100%", padding: "0.5rem", border: "1px solid #e5e7eb", borderRadius: "4px", boxSizing: "border-box", fontSize: "13px" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", marginBottom: "4px" }}>Contact person</label>
              <input name="contact" value={formData.contact} onChange={handleChange} style={{ width: "100%", padding: "0.5rem", border: "1px solid #e5e7eb", borderRadius: "4px", boxSizing: "border-box", fontSize: "13px" }} />
            </div>
          </div>

          {/* URL and Deadline */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", marginBottom: "4px" }}>Job posting URL</label>
              <input name="url" value={formData.url} onChange={handleChange} style={{ width: "100%", padding: "0.5rem", border: "1px solid #e5e7eb", borderRadius: "4px", boxSizing: "border-box", fontSize: "13px" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", marginBottom: "4px" }}>Deadline</label>
              <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} style={{ width: "100%", padding: "0.5rem", border: "1px solid #e5e7eb", borderRadius: "4px", boxSizing: "border-box", fontSize: "13px" }} />
            </div>
          </div>

          {/* Stage */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "12px", marginBottom: "4px" }}>Stage</label>
            <select name="stage" value={formData.stage} onChange={handleChange} style={{ width: "100%", padding: "0.5rem", border: "1px solid #e5e7eb", borderRadius: "4px", fontSize: "13px" }}>
              {STAGES.map((s) => <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>)}
            </select>
          </div>

          {/* Notes */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "12px", marginBottom: "4px" }}>Notes</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} style={{ width: "100%", padding: "0.5rem", border: "1px solid #e5e7eb", borderRadius: "4px", boxSizing: "border-box", fontSize: "13px", resize: "vertical" }} />
          </div>

          {/* Priority checkbox */}
          <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "8px" }}>
            <input type="checkbox" name="priority" id="priority" checked={formData.priority} onChange={handleChange} />
            <label htmlFor="priority" style={{ fontSize: "13px" }}>Mark as high priority</label>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
            {isEditing && (
              <button type="button" onClick={onDelete} style={{ padding: "8px 16px", fontSize: "13px", color: "#ef4444", border: "1px solid #ef4444", borderRadius: "4px", background: "none", cursor: "pointer" }}>
                Delete
              </button>
            )}
            <div style={{ display: "flex", gap: "8px", marginLeft: "auto" }}>
              <button type="button" onClick={onClose} style={{ padding: "8px 16px", fontSize: "13px", border: "1px solid #e5e7eb", borderRadius: "4px", background: "none", cursor: "pointer" }}>
                Cancel
              </button>
              <button type="submit" style={{ padding: "8px 16px", fontSize: "13px", backgroundColor: "black", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                {isEditing ? "Save changes" : "Add application"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationModal;
















