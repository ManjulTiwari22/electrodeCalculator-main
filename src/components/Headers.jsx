import React from "react";

const Header = ({ title }) => {
  return (
    <header className="header">
      <h1>{title || "Welding Electrode Calculator"}</h1>
      <style jsx>{`
        .header {
          background-color: #f0f0f0;
          padding: 20px;
          width: 100%; /* Corrected: Full width */
          text-align: center;
          border-bottom: 1px solid #ddd;
          box-sizing: border-box; /* Include padding and border in width */
        }

        h1 {
          margin: 0;
          font-size: 2em;
          color: #333;
        }
      `}</style>
    </header>
  );
};

export default Header;
