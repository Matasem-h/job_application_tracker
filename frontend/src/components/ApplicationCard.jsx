// This file represents a single job application card on the Kanban board
const ApplicationCard = ({ application, onClick }) => {
    return (
        <div
            onClick={() => onClick(application)}
            style={{ backgroundColor: "#f8faff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 12px", marginBottom: "8px", cursor: "pointer" }}
        >
            {/* Company name and priority flag */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2px" }}>
                <p style={{ fontSize: "13px", fontWeight: "600", margin: 0, color: "#262A33" }}>{application.company}</p>
                {application.priority && <span style={{ color: "#407AFC", fontSize: "12px" }}>⚑</span>}
            </div>

            {/* Job role */}
            <p style={{ fontSize: "11px", color: "#627296", margin: "0 0 8px 0" }}>{application.role}</p>

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


