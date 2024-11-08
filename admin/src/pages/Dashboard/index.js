import { FaEye, FaPencilAlt, FaUserCircle } from "react-icons/fa";
import { IoIosTimer, IoMdCart } from "react-icons/io";
import { MdDelete, MdShoppingBag } from "react-icons/md";
import { GiStarsStack } from "react-icons/gi";
import DashboardBox from "./components/dashboardBox";
import { useContext, useEffect, useState } from "react";
import { Button, Menu, MenuItem, Rating } from "@mui/material";
import { HiDotsVertical } from "react-icons/hi";
import { Chart } from "react-google-charts";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import { MyContext } from "../../App";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import { Link } from "react-router-dom";

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
  const [anchorEl, setAnchorEl] = useState(null);
  const [showBy, setshowBy] = useState("");
  const [catBy, setcatBy] = useState("");
  const [productList, setProductList] = useState([]);
  const open = Boolean(anchorEl);

  const ITEM_HEIGHT = 48;
  const context = useContext(MyContext);
  useEffect(() => {
    context.setisHideSidebarAndHeader(false);
    window.scrollTo(0, 0);
    fetchDataFromApi("/api/products").then((res) => {
      setProductList(res);
    });
  }, [context]);

  const deleteProduct = (id) => {
    context.setProgress(40);
    deleteData(`/api/products/${id}`).then((res) => {
      context.setProgress(100);
      alert("Product deleted successfully");
    });
    fetchDataFromApi("/api/products").then((res) => {
      setProductList(res);
    });
  };

  const handleChange = (event, value) => {
    context.setProgress(40);
    fetchDataFromApi(`/api/products?page=${value}`).then((res) => {
      context.setProgress(100);
      setProductList(res);
    });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className="right-content w-100">
        <div className="row dashboardBoxWrapperRow">
          <div className="col-md-8">
            <div className="dashboardBoxWrapper d-flex">
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
              <DashboardBox
                color={["#e1950e", "#f3cd29"]}
                icon={<GiStarsStack />}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="box graphBox">
              <div className="d-flex align-items-center w-100 bottomEle">
                <h6 className="text-white mb-0 mt-0">Total Sales</h6>
                <div className="ml-auto">
                  <Button className="ml-auto toggleIcons" onClick={handleClick}>
                    <HiDotsVertical />
                  </Button>
                  <Menu
                    className="dropdown_menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      paper: {
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: "20ch",
                        },
                      },
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <IoIosTimer /> Last Day
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IoIosTimer /> Last Week
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IoIosTimer /> Last Month
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IoIosTimer /> Last Year
                    </MenuItem>
                  </Menu>
                </div>
              </div>

              <h3 className="text-white font-weight-bold">$3,787,681.00</h3>
              <p>$3,578.90 in last week</p>

              <Chart
                chartType="PieChart"
                width="100%"
                height="200px"
                data={data}
                options={options}
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
                  <th style={{ textAlign: "center" }}>PRODUT</th>
                  <th style={{ textAlign: "center" }}>CATEGORY</th>
                  <th style={{ textAlign: "center" }}>BRAND</th>
                  <th style={{ textAlign: "center" }}>PRICE</th>
                  <th style={{ textAlign: "center" }}>STOCK</th>
                  <th style={{ textAlign: "center" }}>RATING</th>

                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {productList?.products?.length === 0 ? (
                  <tr>
                    <td colSpan="7">No products found for this page.</td>
                  </tr>
                ) : (
                  productList?.products?.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <div className="d-flex align-items-center productBox">
                          <div className="imgWrapper">
                            <div className="img card shadow m-0">
                              <img
                                src={`${context.baseUrl}uploads/${item.images[0]}`}
                                className="w-100"
                                alt="img"
                              />
                            </div>
                          </div>
                          <div className="info ">
                            <h6>{item.name}</h6>
                            <p>{item.description}</p>
                          </div>
                        </div>
                      </td>
                      <td>{item.category.name}</td>
                      <td>{item.brand}</td>
                      <td>
                        <div style={{ width: "70px" }}>
                          <del className="new">Rs. {item.price}</del>
                          <span className="old text-danger">
                            {" "}
                            Rs.{item.oldPrice}
                          </span>
                        </div>
                      </td>
                      <td>{item.countInStock}</td>
                      <td>
                        <Rating
                          name="read-only"
                          defaultValue={item.rating}
                          precision={0.5}
                          size="small"
                          readOnly
                        />
                      </td>
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
                          <Button
                            color="error"
                            onClick={() => deleteProduct(item.id)}
                          >
                            <MdDelete />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="d-flex tableFooter">
              <Pagination
                count={productList?.totalPages}
                color="primary"
                className="pagination"
                showFirstButton
                showLastButton
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
