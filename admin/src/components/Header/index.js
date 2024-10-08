import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Button from "@mui/material/Button";
import { MdMenuOpen } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import SearchBox from "../SearchBox";

const Header = () => {
  return (
    <>
      <header className=" d-flex align-items-center">
        <div className=" container-fluid w-100">
          <div className="row d-flex align-items-center">
            <div className="col-xs-3 d-flex align-items-center w-100">
              {/* Logo Wrapper */}
              <div className="col-sm-2 part-1">
                <Link to={"/"} className="d-flex logo  align-items-center">
                  <img src={logo} alt="logo" />
                  <span>GreenPlore</span>
                </Link>
              </div>

              <div className="col-xs-3 d-flex align-item-center part-2 pl-4">
                <Button className="rounded-circle mr-3">
                  <MdMenuOpen />
                </Button>
                <SearchBox />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
