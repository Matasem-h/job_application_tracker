// This file represents a single job application card on the Kanban board
const ApplicationCard = ({application, onClick}) => {
    const stageColors = {
        APPLIED: "#dbeafe",
        INTERVIEW: "#fef3c7",
        OFFER: "#dcfce7",
        REJECTED: "#fee2e2",
    }

  return (
    <div
      onClick={() => onClick(application)}
      style={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "6px", padding: "10px", marginBottom: "8px", cursor: "pointer" }}
    >
      {/* Company name and priority flag */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2px" }}>
        <p style={{ fontSize: "13px", fontWeight: "600", margin: 0, color: "#111827" }}>{application.company}</p>
        {application.priority && <span style={{ color: "#ef4444", fontSize: "12px" }}>⚑</span>}
      </div>

      {/* Job role */}
      <p style={{ fontSize: "11px", color: "#6b7280", margin: "0 0 8px 0" }}>{application.role}</p>

      {/* Date and deadline */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "11px", color: "#9ca3af" }}>
          {new Date(application.appliedAt).toLocaleDateString()}
        </span>
        {application.deadline && (
          <span style={{ fontSize: "11px", color: "#f59e0b" }}>
            📅 {new Date(application.deadline).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default ApplicationCard;


