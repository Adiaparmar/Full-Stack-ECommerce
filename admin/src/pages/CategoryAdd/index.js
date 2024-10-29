import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react";
import { postData } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

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

const AddCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
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

  const history = useNavigate();
  const addImgUrl = (e) => {
    const arr = [];
    arr.push(e.target.value);
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: arr,
    }));
  };

  const addCategory = (e) => {
    e.preventDefault();

    if (
      formFields.name !== "" &&
      formFields.images.length !== 0 &&
      formFields.color !== ""
    ) {
      setIsLoading(true);
      postData("/api/category/create", formFields).then((res) => {
        setIsLoading(false);
        history("/categories");
      });
    } else {
      setError(true);
    }
  };
  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 w-100 flex-row p-4 justify-content-between">
        <h5 className="mb-0 breadhead">Add Category</h5>
        <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
          <StyledBreadcrumb
            components="a"
            href="#"
            label="Dashboard"
            icon={<HomeIcon fontSize="small" />}
          />
          <StyledBreadcrumb label="Category" components="a" href="#" />
          <StyledBreadcrumb label="Add Category" />
        </Breadcrumbs>
      </div>

      <form className="form" onSubmit={addCategory}>
        <div className="row">
          <div className="col-sm-9">
            <div className="card p-4">
              {error === true && (
                <p className="text-danger">Please fill all the fields </p>
              )}
              <div className="form-group">
                <h6>Category Name</h6>
                <input type="text" name="name" onChange={changeInput} />
              </div>

              <div className="form-group">
                <h6>Image Url</h6>
                <input type="text" name="images" onChange={addImgUrl} />
              </div>

              <div className="form-group">
                <h6>Color</h6>
                <input type="text" name="color" onChange={changeInput} />
              </div>

              <br />
              <Button type="submit" className="btn-blue btn-lg btn-big">
                <FaCloudUploadAlt /> &nbsp;{" "}
                {isLoading === true ? (
                  <CircularProgress
                    color="inherit"
                    size={20}
                    className=" loader"
                  />
                ) : (
                  "PUBLISH & VIEW"
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
