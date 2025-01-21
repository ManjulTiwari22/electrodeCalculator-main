import React from "react";
import WeldingCalculator from "./components/WeldingCalculator";
import Navbar from "./components/Navbar";
import Header from "./components/Headers";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WeildingCalculatorResult from "./components/WeildingCalculatorResult";
import { ToastContainer, toast } from "react-toastify";
const Home = () => (
  <div>
    <h2>Welcome to the Home Page</h2>
    {/* other content */}
  </div>
);

export const App = () => {
  return (
    <Router>
      {" "}
      {/* Wrap everything with Router */}
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Navbar />
          <Routes>
            {" "}
            {/* Define routes within Routes component */}
            <Route path="/calculator" element={<WeldingCalculator />} />
            <Route
              path="/calculatorResult"
              element={<WeildingCalculatorResult />}
            />
            <Route path="/home" element={<Home />} />{" "}
            {/* Example additional route */}
            {/* Add more routes here as needed */}
          </Routes>
        </div>

        <style jsx>{`
          .app-container {
            display: flex;
            min-height: 100vh;
            max-width: 150rem;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
          }

          .main-content {
            display: flex;
            flex: 1;
            width: 100%;
            /* Adjust max width of content */
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            background-color: #fff;
            border-radius: 10px;
            overflow: hidden;
          }

          @media (max-width: 768px) {
            .main-content {
              flex-direction: column;
              width: 100%; /* Full width on mobile */
            }
          }

          /* Center text and add padding for the Home component */
          h2 {
            text-align: center;
            margin-top: 20px;
          }
        `}</style>
      </div>
      <ToastContainer />
    </Router>
  );
};