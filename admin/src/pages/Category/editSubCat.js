/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useState } from "react";
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
import { editData, fetchDataFromApi } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 14,
    h5: {
      fontWeight: 500,
    },
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

function EditSubCat() {
  const [data, setdata] = useState([]);
  const [categoryVal, setCategoryVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    subCat: "",
  });

  const context = useContext(MyContext);
  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetchDataFromApi(`/api/subCat/${id}`).then((res) => {
      setdata(res);
      setCategoryVal(res.category.id);
      setFormFields((e) => ({
        ...formFields,
        category: res.category.id,
        subCat: res.subCat,
      }));
      setIsLoading(false);
    });
  }, [id]);

  const handleChangeCategory = (event) => {
    setCategoryVal(event.target.value);
    setFormFields((e) => ({
      ...formFields,
      category: event.target.value,
    }));
  };

  const inputChange = (e) => {
    setFormFields((prevFormFields) => ({
      ...prevFormFields,
      [e.target.name]: e.target.value,
    }));
  };

  const editSubCat = (e) => {
    e.preventDefault();
    if (formFields.category === "") {
      alert("Please select a category");
      return;
    }

    if (formFields.subCat === "") {
      alert("Please enter a sub-category name");
      return;
    }

    setIsLoading(true);
    editData(`/api/subCat/${id}`, formFields).then(() => {
      setIsLoading(false);
      history("/subCategory");
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4 justify-content-between">
          <h5 className="mb-0 breadhead">Edit Sub Category</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb label="Sub Category" component="a" href="#" />
            <StyledBreadcrumb label="Edit Sub Category" />
          </Breadcrumbs>
        </div>

        <form className="form" onSubmit={editSubCat}>
          <div className="row">
            <div className="col-sm-9">
              <div className="card p-4 mt-0">
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>CATEGORY</h6>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
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
                          context.catData?.categoryList?.map((cat, index) => (
                            <MenuItem key={index} value={cat.id}>
                              {cat.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <h6>SUB CATEGORY</h6>
                      <input
                        type="text"
                        className="form-control"
                        name="subCat"
                        value={formFields.subCat}
                        onChange={inputChange}
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="btn-blue btn-lg btn-big w-100">
                  <FaCloudUploadAlt /> &nbsp;{" "}
                  {isLoading ? (
                    <CircularProgress color="inherit" className="loader" />
                  ) : (
                    "EDIT SUB CATEGORY"
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

export default EditSubCat;
