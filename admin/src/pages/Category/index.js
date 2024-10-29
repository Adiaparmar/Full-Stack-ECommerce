import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { Button, emphasize, styled } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import Pagination from "@mui/material/Pagination";
import { MyContext } from "../../App";
import HomeIcon from "@mui/icons-material/Home";
import { deleteData, editData, fetchDataFromApi } from "../../utils/api";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
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

const Category = () => {
  const [catData, setCatData] = useState([]);
  const [open, setOpen] = useState(false);
  // const [editFields, setEditFields] = useState({});
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
    color: "",
  });

  const changeInput = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };

  const addImgUrl = (e) => {
    const arr = [];
    arr.push(e.target.value);
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: arr,
    }));
  };

  const context = useContext(MyContext);
  useEffect(() => {
    context.setisHideSidebarAndHeader(false);
    window.scrollTo(0, 0);
    context.setProgress(20);
    fetchDataFromApi("/api/category").then((res) => {
      setCatData(res);
      console.log(res);
      context.setProgress(100);
    });
  }, [context]);

  const editCategory = (id) => {
    setFormFields({
      name: "",
      images: "",
      color: "",
    });
    setOpen(true);
    setEditId(id);
    fetchDataFromApi(`/api/category/${id}`).then((res) => {
      setFormFields({
        name: res.name,
        images: res.images,
        color: res.color,
      });
      console.log(res);
    });
  };

  const categoryEditFun = (e) => {
    e.preventDefault();
    setIsLoading(true);
    editData(`/api/category/${editId}`, formFields).then((res) => {
      fetchDataFromApi("/api/category/").then((res) => {
        setCatData(res);
        setOpen(false);
        setIsLoading(false);
      });
    });
  };

  const deleteCat = (id) => {
    deleteData(`/api/category/${id}`).then((res) => {
      fetchDataFromApi("/api/category/").then((res) => {
        setCatData(res);
      });
    });
  };

  const handleChange = (event, value) => {
    fetchDataFromApi(`/api/category?pages=${value}`).then((res) => {
      setCatData(res);
    });
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4 justify-content-between">
          <div className="d-flex align-items-center">
            <h5 className="mb-0 breadhead">Category List</h5>
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
              <StyledBreadcrumb label="Category" components="a" href="#" />
              <StyledBreadcrumb label="Category List" />
            </Breadcrumbs>
            &nbsp;&nbsp;&nbsp;
            <Link to="/category/add">
              <Button className="btn-blue mr-3 pl-3 pr-3">Add Category</Button>
            </Link>
          </div>
        </div>

        <div className="card shadow border-0 p-3 mt-4">
          <h3 className="hd">Categories</h3>

          <div className="table-responsive mt-3">
            <table className="table table-border v-align">
              <thead className="thead-dark">
                <tr>
                  <th style={{ textAlign: "center" }}>UID</th>
                  <th style={{ textAlign: "center" }}>CATEGORY</th>
                  <th style={{ width: "100px", textAlign: "center" }}>IMAGE</th>
                  <th style={{ textAlign: "center" }}>COLOR</th>
                  <th style={{ textAlign: "center" }}>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {catData?.categoryListt?.length !== 0 &&
                  catData?.categoryList?.map((item, index) => {
                    return (
                      <tr>
                        <td>#{index + 1}</td>
                        <td>{item.name}</td>
                        <td>
                          <div className="d-flex align-items-center productBox">
                            <div className="imgWrapper">
                              <div className="img">
                                <img
                                  src={item.images[0]}
                                  className="w-100"
                                  alt="img"
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="dotdiv">
                          <span
                            className="dot"
                            style={{ background: item.color }}
                          ></span>
                        </td>

                        <td>
                          <div className="actions d-flex align-items-center">
                            <Button
                              color="success"
                              onClick={() => {
                                editCategory(item.id);
                              }}
                            >
                              <FaPencilAlt />
                            </Button>
                            <Button
                              color="error"
                              onClick={() => deleteCat(item.id)}
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
                count={catData?.totalPages}
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

      <Dialog
        className="editModal"
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Edit Category</DialogTitle>
        <form>
          <DialogContent>
            <div className="form-group mb-3">
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="name"
                label="Category Name"
                type="text"
                fullWidth
                value={formFields.name}
                onChange={changeInput}
              />
            </div>

            <div className="form-group mb-3">
              <TextField
                autoFocus
                required
                margin="dense"
                id="images"
                name="images"
                label="Category Image"
                type="text"
                fullWidth
                value={formFields.images}
                onChange={addImgUrl}
              />
            </div>

            <div className="form-group mb-3">
              <TextField
                autoFocus
                required
                margin="dense"
                id="color"
                name="color"
                label="Category Color"
                type="text"
                fullWidth
                value={formFields.color}
                onChange={changeInput}
              />
            </div>
          </DialogContent>
        </form>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button type="button" onClick={categoryEditFun} variant="contained">
            {isLoading === true ? (
              <CircularProgress color="inherit" size={20} className=" loader" />
            ) : (
              "Submit"
            )}
          </Button>
        </DialogActions>
        <br />
      </Dialog>
    </>
  );
};

export default Category;
