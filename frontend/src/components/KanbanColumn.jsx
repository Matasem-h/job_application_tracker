// This file represents a single column on the Kanban board
import ApplicationCard from "./ApplicationCard.jsx";

const stageLabels = {
    APPLIED: "Applied",
    INTERVIEW: "Interview",
    OFFER: "Offer",
    REJECTED: "Rejected",
};

const stageCountColors = {
    APPLIED: { background: "#dbeafe", color: "#1d4ed8" },
    INTERVIEW: { background: "#fef3c7", color: "#92400e" },
    OFFER: { background: "#dcfce7", color: "#166534" },
    REJECTED: { background: "#fee2e2", color: "#991b1b" },
};

const stageBorderColors = {
    APPLIED: "#407AFC",
    INTERVIEW: "#f59e0b",
    OFFER: "#16a34a",
    REJECTED: "#ef4444",
};

const KanbanColumn = ({ stage, applications, onCardClick, onAddClick }) => {
    const countStyle = stageCountColors[stage];
    const borderColor = stageBorderColors[stage];

    return (
        <div style={{ backgroundColor: "white", borderRadius: "10px", border: "1px solid #e5e7eb", borderTop: `3px solid ${borderColor}`, padding: "12px", display: "flex", flexDirection: "column", minHeight: "200px" }}>
            {/* Column header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "#262A33" }}>{stageLabels[stage]}</span>
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
                style={{ width: "100%", padding: "6px", fontSize: "12px", color: "#627296", backgroundColor: "transparent", border: "1px dashed #5B7EC9", borderRadius: "6px", cursor: "pointer", marginTop: "auto" }}
            >
                + Add
            </button>
        </div>
    );
};

export default KanbanColumn;


