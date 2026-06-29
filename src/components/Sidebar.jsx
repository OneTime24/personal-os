import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaCalendarAlt,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

const linkStyle = ({ isActive }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "14px",
  textDecoration: "none",
  color: isActive ? "#2563eb" : "#334155",
  background: isActive ? "#eff6ff" : "transparent",
  borderRadius: "10px",
  fontWeight: "600",
});

function Sidebar() {
  return (
    <aside
      style={{
        width: "240px",
        background: "white",
        padding: "25px",
        borderRight: "1px solid #e2e8f0",
      }}
    >
      <h2
        style={{
          marginBottom: "35px",
        }}
      >
        PersonalOS
      </h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <NavLink to="/" end style={linkStyle}>
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink to="/schedule" style={linkStyle}>
          <FaCalendarAlt />
          Schedule
        </NavLink>

        <NavLink to="/analytics" style={linkStyle}>
          <FaChartBar />
          Analytics
        </NavLink>

        <NavLink to="/settings" style={linkStyle}>
          <FaCog />
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;