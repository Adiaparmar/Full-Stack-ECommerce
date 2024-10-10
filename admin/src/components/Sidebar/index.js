import Button from "@mui/material/Button";
import { MdDashboard, MdMessage } from "react-icons/md";
import { FaAngleRight, FaBell } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <ul>
          <li>
            <Link to="/">
              <Button className="w-100">
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
            <Link to="/">
              <Button className="w-100">
                <span className="icon">
                  <FaProductHunt />
                </span>
                Products
                <span className="arrow">
                  <FaAngleRight />
                </span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Button className="w-100">
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
              <Button className="w-100">
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
              <Button className="w-100">
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
              <Button className="w-100">
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
      </div>
    </>
  );
};

export default Sidebar;
