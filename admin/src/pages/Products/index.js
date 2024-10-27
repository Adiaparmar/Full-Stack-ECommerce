import { FaEye, FaPencilAlt, FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { MdDelete, MdShoppingBag } from "react-icons/md";
import DashboardBox from "../Dashboard/components/dashboardBox";
import { useContext, useEffect, useState } from "react";
import { Button, emphasize, MenuItem, styled } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

export const data = [
  ["Year", "Sales", "Expenses"],
  ["2013", 1000, 400],
  ["2014", 1170, 460],
  ["2015", 660, 1120],
  ["2016", 1030, 540],
];

export const options = {
  backgroundColor: "transparent",
  chartArea: { width: "100%", height: "80%" },
};

const Dashboard = () => {
  //   const [anchorEl, setAnchorEl] = useState(null);
  const [showBy, setshowBy] = useState("");
  const [catBy, setcatBy] = useState("");
  //   const open = Boolean(anchorEl);

  //   const ITEM_HEIGHT = 48;
  const context = useContext(MyContext);
  useEffect(() => {
    context.setisHideSidebarAndHeader(false);
    window.scrollTo(0, 0);
  }, [context]);

  //   const handleClick = (event) => {
  //     setAnchorEl(event.currentTarget);
  //   };
  //   const handleClose = () => {
  //     setAnchorEl(null);
  //   };
  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4 justify-content-between">
          <h5 className="mb-0 breadhead">Product List</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              components="a"
              href="#"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb label="Products" components="a" href="#" />
            <StyledBreadcrumb label="Products List" />
          </Breadcrumbs>
        </div>
        <div className="row dashboardBoxWrapperRow">
          <div className="col-md-12">
            <div className="dashboardBoxWrapper d-flex flex-nowrap">
              <DashboardBox
                color={["#1da256", "#48d483"]}
                icon={<FaUserCircle />}
                grow={true}
              />
              <DashboardBox
                color={["#c012e2", "#eb64fe"]}
                icon={<IoMdCart />}
              />
              <DashboardBox
                color={["#2c78e5", "#60aff5"]}
                icon={<MdShoppingBag />}
              />
            </div>
          </div>
        </div>

        <div className="card shadow border-0 p-3 mt-4">
          <h3 className="hd">Best Selling Products</h3>
          <div className="row cardFilters mt-3">
            <div className="col-md-3">
              <h4>SHOW BY</h4>
              <FormControl size="small" className="w-100">
                <Select
                  value={showBy}
                  onChange={(e) => setshowBy(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  className="w-100"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="col-md-3">
              <h4>CATEGORY BY</h4>
              <FormControl size="small" className="w-100">
                <Select
                  value={catBy}
                  onChange={(e) => setcatBy(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  laabelId="demo-select-small-label"
                  className="w-100"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="table-responsive mt-3">
            <table className="table table-border v-align">
              <thead className="thead-dark">
                <tr>
                  <th>UID</th>
                  <th>PRODUT</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th>PRICE</th>
                  <th>STOCK</th>
                  <th>RATING</th>
                  <th>ORDER</th>
                  <th>SALES</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>#1</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img
                            src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                            className="w-100"
                            alt="img"
                          />
                        </div>
                      </div>
                      <div className="info ">
                        <h6>Tops and skirts set for female...</h6>
                        <p>
                          Women's exclusive summer tops and skirts set for
                          female Tops and Skirts set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>womans</td>
                  <td>richman</td>
                  <td>$21.00</td>
                  <td>30</td>
                  <td>4.9(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Link to="/product/details">
                        <Button color="secondary">
                          <FaEye />
                        </Button>
                      </Link>
                      <Button color="success">
                        <FaPencilAlt />
                      </Button>
                      <Button color="error">
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>#1</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img
                            src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                            className="w-100"
                            alt="img"
                          />
                        </div>
                      </div>
                      <div className="info ">
                        <h6>Tops and skirts set for female...</h6>
                        <p>
                          Women's exclusive summer tops and skirts set for
                          female Tops and Skirts set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>womans</td>
                  <td>richman</td>
                  <td>$21.00</td>
                  <td>30</td>
                  <td>4.9(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Link to="/product/details">
                        <Button color="secondary">
                          <FaEye />
                        </Button>
                      </Link>
                      <Button color="success">
                        <FaPencilAlt />
                      </Button>
                      <Button color="error">
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>#1</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img
                            src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                            className="w-100"
                            alt="img"
                          />
                        </div>
                      </div>
                      <div className="info ">
                        <h6>Tops and skirts set for female...</h6>
                        <p>
                          Women's exclusive summer tops and skirts set for
                          female Tops and Skirts set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>womans</td>
                  <td>richman</td>
                  <td>$21.00</td>
                  <td>30</td>
                  <td>4.9(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Link to="/product/details">
                        <Button color="secondary">
                          <FaEye />
                        </Button>
                      </Link>
                      <Button color="success">
                        <FaPencilAlt />
                      </Button>
                      <Button color="error">
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>#1</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img
                            src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                            className="w-100"
                            alt="img"
                          />
                        </div>
                      </div>
                      <div className="info ">
                        <h6>Tops and skirts set for female...</h6>
                        <p>
                          Women's exclusive summer tops and skirts set for
                          female Tops and Skirts set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>womans</td>
                  <td>richman</td>
                  <td>$21.00</td>
                  <td>30</td>
                  <td>4.9(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Link to="/product/details">
                        <Button color="secondary">
                          <FaEye />
                        </Button>
                      </Link>
                      <Button color="success">
                        <FaPencilAlt />
                      </Button>
                      <Button color="error">
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>#1</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img
                            src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                            className="w-100"
                            alt="img"
                          />
                        </div>
                      </div>
                      <div className="info ">
                        <h6>Tops and skirts set for female...</h6>
                        <p>
                          Women's exclusive summer tops and skirts set for
                          female Tops and Skirts set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>womans</td>
                  <td>richman</td>
                  <td>$21.00</td>
                  <td>30</td>
                  <td>4.9(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Link to="/product/details">
                        <Button color="secondary">
                          <FaEye />
                        </Button>
                      </Link>
                      <Button color="success">
                        <FaPencilAlt />
                      </Button>
                      <Button color="error">
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>#1</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img
                            src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                            className="w-100"
                            alt="img"
                          />
                        </div>
                      </div>
                      <div className="info ">
                        <h6>Tops and skirts set for female...</h6>
                        <p>
                          Women's exclusive summer tops and skirts set for
                          female Tops and Skirts set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>womans</td>
                  <td>richman</td>
                  <td>$21.00</td>
                  <td>30</td>
                  <td>4.9(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Link to="/product/details">
                        <Button color="secondary">
                          <FaEye />
                        </Button>
                      </Link>
                      <Button color="success">
                        <FaPencilAlt />
                      </Button>
                      <Button color="error">
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>#1</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img
                            src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                            className="w-100"
                            alt="img"
                          />
                        </div>
                      </div>
                      <div className="info ">
                        <h6>Tops and skirts set for female...</h6>
                        <p>
                          Women's exclusive summer tops and skirts set for
                          female Tops and Skirts set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>womans</td>
                  <td>richman</td>
                  <td>$21.00</td>
                  <td>30</td>
                  <td>4.9(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Link to="/product/details">
                        <Button color="secondary">
                          <FaEye />
                        </Button>
                      </Link>
                      <Button color="success">
                        <FaPencilAlt />
                      </Button>
                      <Button color="error">
                        <MdDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex tableFooter">
              <p>
                showing <b>12</b> of <b>60 </b>results
              </p>
              <Pagination
                count={10}
                color="primary"
                className="pagination"
                showFirstButton
                showLastButton
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;