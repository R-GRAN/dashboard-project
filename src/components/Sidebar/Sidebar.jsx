import "@/components/Sidebar/Sidebar.scss";
import {FaPlusCircle ,FaRegCalendarCheck } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <div className="sidebar-option">
          <FaPlusCircle className="sidebar-option-icon" />
          <p>Ajouter un item</p>
        </div>
        <div className="sidebar-option">
          <FaRegCalendarCheck className="sidebar-option-icon" />
          <p>Liste des items</p>
        </div>
        <div className="sidebar-option">
          <FaRegCalendarCheck className="sidebar-option-icon" />
          <p>Commandes</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
