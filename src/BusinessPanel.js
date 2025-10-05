import React from "react";

export default function BusinessPanel() {
  return (
    <div className="panel business-panel">
      <h2>Operations & Business Insights</h2>
      <div className="info-grid">
        <div className="info-card">
          <h3>Active Satellites</h3>
          <p>56</p>
        </div>
        <div className="info-card">
          <h3>Defense Readiness</h3>
          <p>98%</p>
        </div>
        <div className="info-card">
          <h3>Operational Regions</h3>
          <p>12</p>
        </div>
        <div className="info-card">
          <h3>Data Centers Online</h3>
          <p>5</p>
        </div>
      </div>
    </div>
  );
}