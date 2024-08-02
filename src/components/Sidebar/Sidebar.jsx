import { NavLink } from "react-router-dom";
import { FaPlusCircle, FaRegCalendarCheck, FaDolly } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink
          to={"/add"}
          className={({ isActive }) =>
            isActive ? "sidebar-option active" : "sidebar-option "
          }
        >
          <FaPlusCircle className="sidebar-option-icon" />
          <p>Ajouter un item</p>
        </NavLink>
        <NavLink
          to={"/list"}
          className={({ isActive }) =>
            isActive ? "sidebar-option active" : "sidebar-option "
          }
        >
          <FaRegCalendarCheck className="sidebar-option-icon" />
          <p>Liste des items</p>
        </NavLink>
        <NavLink
          to={"/orders"}
          className={({ isActive }) =>
            isActive ? "sidebar-option active" : "sidebar-option "
          }
        >
          <FaDolly className="sidebar-option-icon" />
          <p>Commandes</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
