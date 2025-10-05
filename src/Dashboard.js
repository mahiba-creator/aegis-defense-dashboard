import React, { useState } from "react";
import OrbitalView from "./OrbitalView";
import "./styles.css";

export default function Dashboard() {
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs((prev) => [message, ...prev.slice(0, 19)]); // keep latest 20 logs
  };

  return (
    <div className="dashboard">
      <div id="orbital-container" className="orbital-view"></div>
      <div className="threat-dashboard">
        <h2>Threat Dashboard</h2>
        <div className="log-container">
          {logs.length === 0 ? (
            <p>No threats detected yet.</p>
          ) : (
            logs.map((log, index) => (
              <p key={index} className="log-entry">
                {log}
              </p>
            ))
          )}
        </div>
      </div>
      <OrbitalView addLog={addLog} />
    </div>
  );
}