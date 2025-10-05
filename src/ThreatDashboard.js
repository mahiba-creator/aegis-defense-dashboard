import React from "react";

export default function ThreatDashboard({ logs }) {
  return (
    <div className="panel threat-dashboard">
      <h2>Threat Detection Log</h2>
      <div className="log-container">
        {logs.length === 0 ? (
          <p>No current threats.</p>
        ) : (
          logs.map((log, index) => (
            <p key={index} className="log-entry">
              {log}
            </p>
          ))
        )}
      </div>
    </div>
  );
}