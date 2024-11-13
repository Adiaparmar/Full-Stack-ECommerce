/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import {
  Breadcrumbs,
  Chip,
  emphasize,
  ThemeProvider,
  createTheme,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { styled } from "@mui/system";
import { MyContext } from "../../App";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  typography: {
    // Ensure all sub-properties needed are defined
    fontFamily: "Roboto, sans-serif",
    fontSize: 14,
    h5: {
      fontWeight: 500,
    },
    // Add other properties as needed
  },
});

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

function AddSubCat() {
  const [categoryVal, setCategoryVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    subCat: "",
  });

  const context = useContext(MyContext);
  const handleChangeCategory = (event) => {
    setCategoryVal(event.target.value);
    setFormFields((e) => ({
      ...formFields,
      category: event.target.value,
    }));
  };
  const history = useNavigate();

  const inputChange = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };

  const addSubCat = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("category", formFields.category);
    formdata.append("subCat", formFields.subCat);

    if (formFields.category === "") {
      alert("Please select a category");
      return false;
    }

    if (formFields.subCat === "") {
      alert("Please select a sub category");
      return false;
    }

    postData("/api/subCat/create", formFields).then((res) => {
      setIsLoading(false);
      history("/subCategory");
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4 justify-content-between">
          <h5 className="mb-0 breadhead">Add Sub Category</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              components="a"
              href="#"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb label="Category" components="a" href="#" />
            <StyledBreadcrumb label="Add Sub Category" />
          </Breadcrumbs>
        </div>

        <form className="form" onSubmit={addSubCat}>
          <div className="row">
            <div className="col-sm-9">
              <div className="card p-4 mt-0">
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>CATEGORY</h6>
                      <Select
                        value={categoryVal}
                        onChange={handleChangeCategory}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                        name="category"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {context.catData?.categoryList?.length !== 0 &&
                          context.catData?.categoryList?.map((cat, index) => {
                            return (
                              <MenuItem key={index} value={cat.id}>
                                {cat.name}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <h6>SUB CATEGORY</h6>
                      <input
                        type="text"
                        name="subCat"
                        value={formFields.subCat}
                        onChange={inputChange}
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="btn-blue btn-lg btn-big w-100">
                  <FaCloudUploadAlt /> &nbsp;{" "}
                  {isLoading === true ? (
                    <CircularProgress color="inherit" className="loader" />
                  ) : (
                    "ADD SUB CATEGORY"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </ThemeProvider>
  );
}

export default AddSubCat;
