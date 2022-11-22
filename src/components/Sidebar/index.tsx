import { useState } from "react";
import { FiUser, FiHome } from "react-icons/fi";
import { IoMdExit } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

import "./styles.css";

export function Sidebar() {
  const [activeLink, setActiveLink] = useState("dashboard");

  return (
    <div className="sidebar-container">
      <div className="menu">
        <div className="first-menu-list">
          <li>
            <ul>
              <Link
                className={activeLink === "dashboard" ? "activeLink" : ""}
                to="/dashboard"
                onClick={() => setActiveLink("dashboard")}
              >
                <div className="menu-line">
                  <MdOutlineDashboard className="icon" />
                  Dashboard
                </div>
              </Link>
            </ul>
            <ul>
              <Link
                className={activeLink === "Usuários" ? "activeLink" : ""}
                to="/users"
                onClick={() => setActiveLink("Usuários")}
              >
                <div className="menu-line">
                  <FiUser className="icon" />
                  Clientes
                </div>
              </Link>
            </ul>
            <ul>
              <Link
                className={activeLink === "Imóveis" ? "activeLink" : ""}
                to="/real-state"
                onClick={() => setActiveLink("Imóveis")}
              >
                <div className="menu-line">
                  <FiHome className="icon" />
                  Imóveis
                </div>
              </Link>
            </ul>
          </li>
        </div>
        <hr className="divider" />
        <div className="second-menu-list">
          <li>
            <ul>
              <Link
                className={activeLink === "Sair" ? "activeLink" : ""}
                to="/"
                onClick={() => setActiveLink("Sair")}
              >
                <div className="menu-line">
                  <IoMdExit className="icon" />
                  Sair
                </div>
              </Link>
            </ul>
          </li>
        </div>
      </div>
    </div>
  );
}
