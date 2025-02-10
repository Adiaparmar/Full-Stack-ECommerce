/* eslint-disable no-unused-vars */
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { Button } from "@mui/material";
import { FaCloudUploadAlt, FaRegImages } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { postData } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";

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

const AddBanner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSelectedFile, setIsSelectedFile] = useState(false);
  const [error, setError] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    image: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const context = useContext(MyContext);
  const formData = new FormData();
  const history = useNavigate();

  useEffect(() => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const onChangeFile = (e) => {
    try {
      const selectedFile = e.target.files[0];
      if (
        selectedFile &&
        (selectedFile.type === "image/jpeg" ||
          selectedFile.type === "image/jpg" ||
          selectedFile.type === "image/png")
      ) {
        setFile(selectedFile);
        setIsSelectedFile(true);

        formData.append("image", selectedFile);
        postData("/api/banner/upload", formData).then((res) => {
          setFormFields((prev) => ({ ...prev, image: res.image }));
        });
      } else {
        alert("Please upload only image files");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changeInput = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const addBanner = (e) => {
    e.preventDefault();
    formData.append("name", formFields.name);
    formData.append("image", formFields.image);

    if (formFields.name !== "" && isSelectedFile) {
      setIsLoading(true);
      postData("/api/banner", formFields).then((res) => {
        setIsLoading(false);
        history("/banners");
      });
    } else {
      setError(true);
    }
  };

  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 w-100 flex-row p-4 justify-content-between">
        <h5 className="mb-0 breadhead">Add Banner</h5>
        <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
          <StyledBreadcrumb
            components="a"
            href="#"
            label="Dashboard"
            icon={<HomeIcon fontSize="small" />}
          />
          <StyledBreadcrumb label="Banners" components="a" href="#" />
          <StyledBreadcrumb label="Add Banner" />
        </Breadcrumbs>
      </div>

      <form className="form" onSubmit={addBanner}>
        <div className="row">
          <div className="col-sm-9">
            <div className="card p-4">
              {error && (
                <p className="text-danger">Please fill all the fields</p>
              )}
              <div className="form-group">
                <h6>Banner Name</h6>
                <input
                  type="text"
                  name="name"
                  value={formFields.name}
                  onChange={changeInput}
                />
              </div>
              <div className="imagesUploadSec">
                <h5 className="mb-4">Banner Image</h5>
                <div className="imgUploadBox d-flex align-items-center">
                  {preview && (
                    <div className="uploadBox">
                      <img
                        src={preview}
                        className="w-100"
                        alt="banner preview"
                      />
                    </div>
                  )}
                  <div className="uploadBox">
                    <input type="file" onChange={onChangeFile} name="image" />
                    <div className="info">
                      <FaRegImages />
                      <h5>Image Upload</h5>
                    </div>
                  </div>
                </div>
                <br />
                <Button type="submit" className="btn-blue btn-lg btn-big w-100">
                  <FaCloudUploadAlt /> &nbsp;
                  {isLoading ? (
                    <CircularProgress color="inherit" className="loader" />
                  ) : (
                    "PUBLISH AND VIEW"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBanner;
