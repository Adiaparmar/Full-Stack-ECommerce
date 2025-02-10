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

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const context = useContext(MyContext);

  useEffect(() => {
    context.setisHideSidebarAndHeader(false);
    fetchDataFromApi("/api/banner").then((res) => {
      console.log(res);
      setBanners(res);
    });
  }, [context]);

  const deleteBanner = (id) => {
    deleteData(`/api/banner/${id}`).then(() => {
      fetchDataFromApi("/api/banner").then((res) => {
        setBanners(res);
      });
    });
  };

  const handleChange = (event, value) => {
    fetchDataFromApi(`/api/banner?pages=${value}`).then((res) => {
      setBanners(res);
    });
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4 justify-content-between">
          <div className="d-flex align-items-center">
            <h5 className="mb-0 breadhead">Banner List</h5>
          </div>
          <div className="ml-auto d-flex align-items-center">
            <Breadcrumbs
              aria-label="breadcrumb"
              className="ml-auto breadcrumbs_"
            >
              <StyledBreadcrumb
                component="a"
                href="#"
                label="Dashboard"
                icon={<HomeIcon fontSize="small" />}
              />
              <StyledBreadcrumb label="Banners" component="a" href="#" />
              <StyledBreadcrumb label="Banner List" />
            </Breadcrumbs>
            &nbsp;&nbsp;&nbsp;
            <Link to="/banners/add">
              <Button className="btn-blue mr-3 pl-3 pr-3">Add Banner</Button>
            </Link>
          </div>
        </div>
        <div className="card shadow border-0 p-3 mt-4">
          <h3 className="hd">Banners</h3>
          <div className="table-responsive mt-3">
            <table className="table table-border v-align">
              <thead className="thead-dark">
                <tr>
                  <th style={{ textAlign: "center" }}>UID</th>
                  <th style={{ textAlign: "center" }}>TITLE</th>
                  <th style={{ width: "100px", textAlign: "center" }}>IMAGE</th>
                  <th style={{ textAlign: "center" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {banners?.length !== 0 &&
                  banners?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>#{index + 1}</td>
                        <td>{item.name}</td>
                        <td>
                          <div className="d-flex align-items-center productBox">
                            <div className="imgWrapper">
                              <div className="img">
                                <img
                                  src={`${context.baseUrl}uploads/banners/${item.image}`}
                                  className="w-100"
                                  alt="banner"
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="actions d-flex align-items-center">
                            <Button
                              color="error"
                              onClick={() => deleteBanner(item.id)}
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
                count={banners?.totalPages}
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

export default Banners;
