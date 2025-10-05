import React from "react";
import OrbitalView from "./OrbitalView";
import ThreatDashboard from "./ThreatDashboard";
import BusinessPanel from "./BusinessPanel";
import "./styles.css";

export default function AegisOrbDashboard() {
  const [logs, setLogs] = React.useState([]);

  const addLog = (message) => {
    setLogs((prev) => [message, ...prev.slice(0, 29)]);
  };

  return (
    <div className="aegisorb-dashboard">
      {/* Top Bar */}
      <header className="header">
        <h1>AegisOrb Global Defense Interface</h1>
      </header>

      {/* Main Content Area */}
      <div className="main-layout">
        <div id="orbital-container" className="orbital-view"></div>

        <div className="side-panels">
          <ThreatDashboard logs={logs} />
          <BusinessPanel />
        </div>
      </div>

      {/* Orbital 3D Renderer */}
      <OrbitalView addLog={addLog} />
    </div>
  );
}