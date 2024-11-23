/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Button from "@mui/material/Button";
import { MdMenuOpen, MdOutlineMenu } from "react-icons/md";
// import { MdOutlineMenu } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
// import { MdDarkMode } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import SearchBox from "../SearchBox";

import { Avatar } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useContext, useState } from "react";
import { MyContext } from "../../App";
import UserAvatarImgComponent from "../userAvatarImg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpennotificationDrop, setisOpennotificationDrop] = useState(false);
  const openMyAcc = Boolean(anchorEl);
  const openNotifications = Boolean(isOpennotificationDrop);

  const context = useContext(MyContext);

  const handleOpenMyAccDrop = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMyAccDrop = () => {
    setAnchorEl(null);
  };
  const handleOpenNotificationsDrop = () => {
    setisOpennotificationDrop(true);
  };
  const handleCloseNotificationsDrop = () => {
    setisOpennotificationDrop(false);
  };

  const history = useNavigate();
  const logout = () => {
    localStorage.clear();
    setAnchorEl(null);
    setTimeout(() => {
      history("/login");
    }, 1000);
  };
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
                <Button
                  className="rounded-circle mr-3 "
                  onClick={() =>
                    context.setIsToggleSidebar(!context.isToggleSidebar)
                  }
                >
                  {context.isToggleSidebar === false ? (
                    <MdMenuOpen />
                  ) : (
                    <MdOutlineMenu />
                  )}
                </Button>
                <SearchBox />
              </div>

              <div className="col-sm-6 d-flex align-item-center justify-content-end part-3  ">
                <Button
                  className="rounded-circle mr-3"
                  onClick={() => context.setThemeMode(!context.themeMode)}
                >
                  <MdOutlineLightMode />
                </Button>
                <Button className="rounded-circle mr-3">
                  <IoCartOutline />
                </Button>

                <Button className="rounded-circle mr-3">
                  <MdOutlineMailOutline />
                </Button>

                <div className="dropdownWrapper position-relative">
                  <Button
                    className="rounded-circle mr-3"
                    onClick={handleOpenNotificationsDrop}
                  >
                    <FaRegBell />
                  </Button>
                  <Menu
                    anchorEl={isOpennotificationDrop}
                    id="notifications"
                    className="notifications dropdown_list"
                    open={openNotifications}
                    onClose={handleCloseNotificationsDrop}
                    onClick={handleCloseNotificationsDrop}
                    slotProps={{
                      paper: {
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <div className="head pl-3">
                      <h4>Orders (12)</h4>
                    </div>
                    <Divider />

                    <div className="scroll">
                      <MenuItem onClick={handleCloseMyAccDrop}>
                        <div className="d-flex align-items-center">
                          <UserAvatarImgComponent
                            img={
                              "https://mironcoder-hotash.netlify.app/images/avatar/01.webp"
                            }
                          />
                          <div className="dropdownInfo">
                            <h4>
                              <span>
                                <b>Mahmudul</b>
                                added to his favourite list
                                <b> Leather belt steve madden</b>
                              </span>
                            </h4>
                            <p className="text-sky">few seconds ago</p>
                          </div>
                        </div>
                      </MenuItem>

                      <MenuItem onClick={handleCloseMyAccDrop}>
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="userImg">
                              <span className="rounded-circle">
                                <img
                                  src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"
                                  alt="userImg"
                                />
                              </span>
                            </div>
                          </div>
                          <div className="dropdownInfo">
                            <h4>
                              <span>
                                <b>Mahmudul</b>
                                added to his favourite list
                                <b> Leather belt steve madden</b>
                              </span>
                            </h4>
                            <p className="text-sky">few seconds ago</p>
                          </div>
                        </div>
                      </MenuItem>

                      <MenuItem onClick={handleCloseMyAccDrop}>
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="userImg">
                              <span className="rounded-circle">
                                <img
                                  src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"
                                  alt="userImg"
                                />
                              </span>
                            </div>
                          </div>
                          <div className="dropdownInfo">
                            <h4>
                              <span>
                                <b>Mahmudul</b>
                                added to his favourite list
                                <b> Leather belt steve madden</b>
                              </span>
                            </h4>
                            <p className="text-sky">few seconds ago</p>
                          </div>
                        </div>
                      </MenuItem>

                      <MenuItem onClick={handleCloseMyAccDrop}>
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="userImg">
                              <span className="rounded-circle">
                                <img
                                  src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"
                                  alt="userImg"
                                />
                              </span>
                            </div>
                          </div>
                          <div className="dropdownInfo">
                            <h4>
                              <span>
                                <b>Mahmudul</b>
                                added to his favourite list
                                <b> Leather belt steve madden</b>
                              </span>
                            </h4>
                            <p className="text-sky">few seconds ago</p>
                          </div>
                        </div>
                      </MenuItem>

                      <MenuItem onClick={handleCloseMyAccDrop}>
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="userImg">
                              <span className="rounded-circle">
                                <img
                                  src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"
                                  alt="userImg"
                                />
                              </span>
                            </div>
                          </div>
                          <div className="dropdownInfo">
                            <h4>
                              <span>
                                <b>Mahmudul</b>
                                added to his favourite list
                                <b> Leather belt steve madden</b>
                              </span>
                            </h4>
                            <p className="text-sky">few seconds ago</p>
                          </div>
                        </div>
                      </MenuItem>
                    </div>

                    <div className="btn-blue ">
                      <Button className="btn-blue w-100">
                        View All Notifications
                      </Button>
                    </div>
                  </Menu>
                </div>
                {context.isLogin !== true ? (
                  <Link to={"/login"}>
                    <Button className="btn-blue btn-lg btn-round">
                      Sign In
                    </Button>
                  </Link>
                ) : (
                  <div className="myAccWrapper align-items-center">
                    <div
                      className="myAcc d-flex align-items-center"
                      onClick={handleOpenMyAccDrop}
                    >
                      <div className="userImg">
                        <span className="rounded-circle">
                          {context.user?.name?.charAt(0)}
                        </span>
                      </div>

                      <div className="userInfo">
                        <h4>{context.user?.name}</h4>
                        <p className="mb-0">@{context.user?.email}</p>
                      </div>
                    </div>

                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={openMyAcc}
                      onClose={handleCloseMyAccDrop}
                      onClick={handleCloseMyAccDrop}
                      slotProps={{
                        paper: {
                          elevation: 0,
                          sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            "&::before": {
                              content: '""',
                              display: "block",
                              position: "absolute",
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: "background.paper",
                              transform: "translateY(-50%) rotate(45deg)",
                              zIndex: 0,
                            },
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <MenuItem onClick={handleCloseMyAccDrop}>
                        <ListItemIcon>
                          <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        My Account
                      </MenuItem>
                      <MenuItem onClick={handleCloseMyAccDrop}>
                        <ListItemIcon>
                          <Settings fontSize="small" />
                        </ListItemIcon>
                        Reset Password
                      </MenuItem>
                      <MenuItem onClick={logout}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
