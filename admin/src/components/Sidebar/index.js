import Button from "@mui/material/Button";
import { MdDashboard, MdMessage } from "react-icons/md";
import { FaAngleRight, FaBell } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IoMdLogOut } from "react-icons/io";
// import { MyContext } from "../../App";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);

  const isOpenSubmenu = (index) => {
    setActiveTab(index);
    setIsToggleSubmenu(!isToggleSubmenu);
  };
  return (
    <>
      <div className="sidebar">
        <ul>
          <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 0 ? "active" : ""}`}
                onClick={() => isOpenSubmenu(0)}
              >
                <span className="icon">
                  <MdDashboard />
                </span>
                Dashboard
                <span className="arrow">
                  <FaAngleRight />
                </span>
              </Button>
            </Link>
          </li>
          <li>
            <Button
              className={`w-100 ${
                activeTab === 1 && isToggleSubmenu === true ? "active" : ""
              }`}
              onClick={() => isOpenSubmenu(1)}
            >
              <span className="icon">
                <FaProductHunt />
              </span>
              Products
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
            <div
              className={`submenuWrapper ${
                activeTab === 1 && isToggleSubmenu === true
                  ? "colapse"
                  : "colapsed"
              }`}
            >
              <ul className="submenu">
                <li>
                  <Link to="#">Product List</Link>
                </li>
                <li>
                  <Link to="#">Product View</Link>
                </li>
                <li>
                  <Link to="#">Product Upload</Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 2 ? "active" : ""}`}
                onClick={() => isOpenSubmenu(2)}
              >
                <span className="icon">
                  <FaCartArrowDown />
                </span>
                Orders
                <span className="arrow">
                  <FaAngleRight />
                </span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 3 ? "active" : ""}`}
                onClick={() => isOpenSubmenu(3)}
              >
                <span className="icon">
                  <MdMessage />
                </span>
                Messages
                <span className="arrow">
                  <FaAngleRight />
                </span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 4 ? "active" : ""}`}
                onClick={() => isOpenSubmenu(4)}
              >
                <span className="icon">
                  <FaBell />
                </span>
                Notifications
                <span className="arrow">
                  <FaAngleRight />
                </span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 5 ? "active" : ""}`}
                onClick={() => isOpenSubmenu(5)}
              >
                <span className="icon">
                  <IoIosSettings />
                </span>
                Setting
                <span className="arrow">
                  <FaAngleRight />
                </span>
              </Button>
            </Link>
          </li>
        </ul>

        <br />
        <div className="logoutWrapper">
          <div className="logoutBox">
            <Button variant="contained">
              <IoMdLogOut /> LogOut
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
