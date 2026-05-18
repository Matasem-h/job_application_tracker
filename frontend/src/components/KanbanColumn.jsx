// This file represents a single column on the Kanban board
import ApplicationCard from "./ApplicationCard.jsx";

const stageLabels = {
    APPLIED: "Applied",
    INTERVIEW: "Interview",
    OFFER: "Offer",
    REJECTED: "Rejected",
};

const stageCountColors = {
    APPLIED: {background: "#dbeafe", color: "#1d4ed8"},
    INTERVIEW: {background: "#fef3c7", color: "#92400e"},
    OFFER: {background: "#dcfce7", color: "#166534"},
    REJECTED: {background: "#fee2e2", color: "#991b1b"},
};

const KanbanColumn = ({stage, applications, onCardClick, onAddClick}) => {
    const countStyle = stageCountColors[stage];
    
      return (
    <div style={{ backgroundColor: "#f9fafb", borderRadius: "8px", border: "1px solid #e5e7eb", padding: "10px", display: "flex", flexDirection: "column" }}>
      {/* Column header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <span style={{ fontSize: "13px", fontWeight: "600", color: "#111827" }}>{stageLabels[stage]}</span>
        <span style={{ fontSize: "11px", fontWeight: "600", padding: "2px 8px", borderRadius: "99px", backgroundColor: countStyle.background, color: countStyle.color }}>
          {applications.length}
        </span>
      </div>

      {/* Application cards */}
      {applications.map((app) => (
        <ApplicationCard key={app.id} application={app} onClick={onCardClick} />
      ))}

      {/* Add button */}
      <button
        onClick={() => onAddClick(stage)}
        style={{ width: "100%", padding: "6px", fontSize: "12px", color: "#6b7280", backgroundColor: "transparent", border: "1px dashed #d1d5db", borderRadius: "6px", cursor: "pointer", marginTop: "4px" }}
      >
        + Add
      </button>
    </div>
  );
};

export default KanbanColumn;


