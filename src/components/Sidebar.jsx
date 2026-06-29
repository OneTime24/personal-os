import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaCalendarAlt,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

function Sidebar({ closeSidebar }) {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
      isActive
        ? "bg-blue-100 text-blue-600"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 p-6">
      <h2 className="text-2xl font-bold mb-8">
        PersonalOS
      </h2>

      <nav className="flex flex-col gap-2">
        <NavLink
          to="/"
          end
          className={linkClass}
          onClick={closeSidebar}
        >
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink
          to="/schedule"
          className={linkClass}
          onClick={closeSidebar}
        >
          <FaCalendarAlt />
          Schedule
        </NavLink>

        <NavLink
          to="/analytics"
          className={linkClass}
          onClick={closeSidebar}
        >
          <FaChartBar />
          Analytics
        </NavLink>

        <NavLink
          to="/settings"
          className={linkClass}
          onClick={closeSidebar}
        >
          <FaCog />
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;