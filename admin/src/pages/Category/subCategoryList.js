/* eslint-disable no-unused-vars */
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { Button, emphasize, styled } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import Pagination from "@mui/material/Pagination";
import { MyContext } from "../../App";
import HomeIcon from "@mui/icons-material/Home";
import { deleteData, fetchDataFromApi } from "../../utils/api";

import { Link } from "react-router-dom";

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

const SubCategory = () => {
  const [subCatData, setSubCatData] = useState([]);

  const context = useContext(MyContext);
  useEffect(() => {
    context.setisHideSidebarAndHeader(false);

    fetchDataFromApi("/api/subCat").then((res) => {
      setSubCatData(res);
    });
  }, [context]);

  const deleteSubCat = (id) => {
    deleteData(`/api/subCat/${id}`).then((res) => {
      fetchDataFromApi("/api/subCat/").then((res) => {
        setSubCatData(res);
      });
    });
  };

  const handleChange = (event, value) => {
    fetchDataFromApi(`/api/subCat?pages=${value}`).then((res) => {
      setSubCatData(res);
    });
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4 justify-content-between">
          <div className="d-flex align-items-center">
            <h5 className="mb-0 breadhead">Sub Category List</h5>
          </div>

          <div className="ml-auto d-flex align-items-center">
            <Breadcrumbs
              aria-label="breadcrumb"
              className="ml-auto breadcrumbs_"
            >
              <StyledBreadcrumb
                components="a"
                href="#"
                label="Dashboard"
                icon={<HomeIcon fontSize="small" />}
              />
              <StyledBreadcrumb label="Sub Category" components="a" href="#" />
              <StyledBreadcrumb label="Sub Category List" />
            </Breadcrumbs>
            &nbsp;&nbsp;&nbsp;
            <Link to="/subCat/add">
              <Button className="btn-blue mr-3 pl-3 pr-3">
                Add Sub Category
              </Button>
            </Link>
          </div>
        </div>

        <div className="card shadow border-0 p-3 mt-4">
          <h3 className="hd">Sub Categories</h3>

          <div className="table-responsive mt-3">
            <table className="table table-border v-align">
              <thead className="thead-dark">
                <tr>
                  <th style={{ textAlign: "center" }}>UID</th>
                  <th style={{ textAlign: "center" }}>IMAGE</th>
                  <th style={{ textAlign: "center" }}>CATEGORY</th>
                  <th style={{ textAlign: "center" }}>SUB CATEGORY</th>
                  <th style={{ textAlign: "center" }}>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {subCatData?.subCategoryList?.length !== 0 &&
                  subCatData?.subCategoryList?.map((item, index) => {
                    return (
                      <tr>
                        <td>#{index + 1}</td>

                        <td>
                          <div className="d-flex align-items-center productBox">
                            <div className="imgWrapper">
                              <div className="img">
                                <img
                                  src={`${context.baseUrl}uploads/${item.category.images[0]}`}
                                  className="w-100"
                                  alt="img"
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{item.category.name}</td>
                        <td>{item.subCat}</td>

                        <td>
                          <div className="actions d-flex align-items-center">
                            <Link to={`/subCategory/edit/${item.id}`}>
                              <Button color="success">
                                <FaPencilAlt />
                              </Button>
                            </Link>
                            <Button
                              color="error"
                              onClick={() => deleteSubCat(item.id)}
                            >
                              <MdDelete />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className="d-flex tableFooter">
              <Pagination
                count={subCatData?.totalPages}
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

export default SubCategory;
