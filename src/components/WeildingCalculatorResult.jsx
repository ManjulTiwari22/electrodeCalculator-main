import React from "react";
import { useLocation } from "react-router-dom";

const WeildingCalculatorResult = () => {
  const location = useLocation();
  const { formData } = location.state;
  console.log(formData);
  return (
    <div style={styles.container}>
      <div style={styles.header}>WELD DEPOSITION</div>

      <div style={styles.details}>
        <div style={styles.item}>
          <span style={styles.label}>Total Weld Deposition (in kg):</span>
          <span style={styles.value}>40</span>
        </div>
        <div style={styles.item}>
          <span style={styles.label}>Longitudinal Weld Deposition:</span>
          <span style={styles.value}>20</span>
        </div>
        <div style={styles.item}>
          <span style={styles.label}>Circumferential Weld Deposition:</span>
          <span style={styles.value}>10</span>
        </div>
        <div style={styles.item}>
          <span style={styles.label}>Total Nozzles Weld Deposition:</span>
          <span style={styles.value}>10</span>
        </div>
      </div>

      <div style={styles.consumables}>
        <div style={styles.item}>
          <span style={styles.label}>Electrodes Consumption:</span>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Size</th>
                  <th style={styles.th}>Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.td}>Φ 3.15 (mm)</td>
                  <td style={styles.td}>40</td>
                </tr>
                <tr>
                  <td style={styles.td}>Φ 4 (mm)</td>
                  <td style={styles.td}>40</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div style={styles.item}>
          <span style={styles.label}>SAW Consumption (in kg):</span>
          <span style={styles.value}>40 kg</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    border: "2px solid lightblue", // Light blue border
    padding: "20px",
    width: "100%",
    borderRadius: "5px",
    fontFamily: "sans-serif",
  },
  header: {
    fontWeight: "bold",
    marginBottom: "15px",
    fontSize: "1.5em",
    color: "darkblue", // Dark blue heading
  },
  details: {
    marginBottom: "20px",
  },
  consumables: {
    marginBottom: "20px",
  },
  item: {
    display: "flex",
    alignItems: "baseline",
    marginBottom: "8px",
  },
  label: {
    fontWeight: "500",
    marginRight: "10px",
    width: "250px",
    display: "inline-block",
  },
  value: {
    color: "blue", // Blue color for result values
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
    marginTop: "5px",
  },
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
    backgroundColor: "#f2f2f2",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  },
};

export default WeildingCalculatorResult;
