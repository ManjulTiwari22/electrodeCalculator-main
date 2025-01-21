import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State for mobile collapse

  const menuItems = [
    {
      title: "Calculator",
      items: ["Calculator"],
      link: "/calculator", // Link for Calculator route
    },
    {
      title: "Products",
      items: [
        "Pressure Vessel",
        "Heat Exchanger",
        "Launcher/Receiver",
        "Quick Opening Closure",
      ],
    },
    {
      title: "Manufacturing",
      items: [
        "Dish End Plate Calculation",
        "Plate Cutting",
        "Welding",
        "Painting",
        "Radiography",
      ],
    },
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <button className="navbar-toggle" onClick={toggleCollapse}>
          {/* Hamburger icon (you can use an SVG or other icon here) */}
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <span className="navbar-brand">All Apps</span>
      </div>
      <div className={`navbar-collapse ${isCollapsed ? "collapsed" : ""}`}>
        {" "}
        {/* Conditionally add 'collapsed' class */}
        <ul className="navbar-nav">
          {menuItems.map((menu, index) => (
            <li key={index} className="nav-item">
              <span className="nav-title">{menu.title}</span>
              {menu.link && ( // Check if link exists for the menu item
                <Link to={menu.link} className="nav-sublist">
                  {" "}
                  {/* Use Link for navigation */}
                  {menu.items.map((item, subIndex) => (
                    <li key={subIndex} className="nav-subitem">
                      {item}
                    </li>
                  ))}
                </Link>
              )}
              {!menu.link && ( // If no link, render a simple sublist without Link
                <ul className="nav-sublist">
                  {menu.items.map((item, subIndex) => (
                    <li key={subIndex} className="nav-subitem">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .navbar {
          background-color: #fff;
          border-right: 1px solid #eee;
          padding: 10px;
          width: 250px; /* Adjust as needed */
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
        }

        .navbar-header {
          display: none;
        }

        .navbar-brand {
          font-weight: bold;
          margin-bottom: 10px;
          display: block;
        }

        .navbar-nav {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .nav-item {
          margin-bottom: 15px;
        }

        .nav-title {
          color: #007bff; /* Blue for titles */
          font-weight: 500;
          cursor: default;
          display: block;
          margin-bottom: 5px;
        }

        .nav-sublist {
          list-style: none;
          padding-left: 15px;
          margin: 0;
        }

        .nav-subitem {
          color: #333;
          cursor: pointer;
          padding: 5px 0;
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .navbar {
            width: 100%;
            position: static;
            border-right: none;
            border-bottom: 1px solid #eee;
          }
          .navbar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .navbar-brand {
            margin: 0;
          }
          .navbar-collapse {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-out;
          }

          .navbar-collapse.collapsed {
            max-height: 500px; /* Adjust as needed */
          }

          .navbar-toggle {
            background: none;
            border: none;
            cursor: pointer;
            padding: 5px;
          }

          .icon-bar {
            display: block;
            width: 22px;
            height: 2px;
            background-color: #333;
            margin: 3px 0;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
