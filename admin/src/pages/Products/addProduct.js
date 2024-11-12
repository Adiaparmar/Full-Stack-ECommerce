/* eslint-disable no-unused-vars */
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { Button, MenuItem } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Select } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useContext, useEffect, useState } from "react";
import { FaCloudUploadAlt, FaRegImages } from "react-icons/fa";
import { MyContext } from "../../App";
import { fetchDataFromApi, postData } from "../../utils/api";

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

const ProductUpload = () => {
  const [categoryVal, setCategoryVal] = useState("");
  const [subCatVal, setSubCatVal] = useState("");
  const [ratingsValue, setRatingsValue] = useState(1);
  const [isFeaturedValue, setisFeaturedValue] = useState("");
  const [catData, setCatData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [files, setFiles] = useState([]);
  const [imgFiles, setimgFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isSelectedFiles, setIsSelectedFiles] = useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    subCat: "",
    description: "",
    images: [],
    brand: "",
    price: 0,
    oldPrice: 0,
    category: "",
    countInStock: 0,
    rating: 0,
    isFeatured: false,
  });
  const context = useContext(MyContext);
  const formdata = new FormData();
  // const productImages = useRef(null);

  useEffect(() => {
    setCatData(context.catData);
  }, [context]);

  useEffect(() => {
    if (!imgFiles) return;
    let tmp = [];
    for (let i = 0; i < imgFiles.length; i++) {
      tmp.push(URL.createObjectURL(imgFiles[i]));
    }

    const objectUrls = tmp;
    setPreviews(objectUrls);

    //free memory
    for (let i = 0; i < imgFiles.length; i++) {
      return () => {
        URL.revokeObjectURL(objectUrls[i]);
      };
    }
  }, [imgFiles]);

  const handleChangeCategory = (event) => {
    setCategoryVal(event.target.value);
    setFormFields((e) => ({
      ...formFields,
      category: event.target.value,
    }));
  };
  const handleChangeSubCategory = (event) => {
    setSubCatVal(event.target.value);
    setFormFields((e) => ({
      ...formFields,
      subCat: event.target.value,
    }));
  };

  const handleChangeisFeaturedValue = (event) => {
    setisFeaturedValue(event.target.value);
    setFormFields((e) => ({
      ...formFields,
      isFeatured: event.target.value,
    }));
  };

  const inputChange = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeFile = async (e, apiEndPoint) => {
    try {
      const imgArr = [];
      const files = e.target.files;

      for (var i = 0; i < files.length; i++) {
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/png")
        ) {
          setimgFiles(files);
          const file = files[i];
          imgArr.push(file);
          formdata.append("images", file);
        } else {
          alert("Please upload only image files");
        }
      }
      setIsSelectedFiles(true);
      setFiles(imgArr);
      console.log(imgArr);
      postData(apiEndPoint, formdata).then((res) => {});
    } catch (err) {
      console.log(err);
    }
  };

  const addProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);
    formdata.append("name", formFields.name);
    formdata.append("subCat", formFields.subCat);
    formdata.append("description", formFields.description);
    formdata.append("brand", formFields.brand);
    formdata.append("price", formFields.price);
    formdata.append("oldPrice", formFields.oldPrice);
    formdata.append("category", formFields.category);
    formdata.append("countInStock", formFields.countInStock);
    formdata.append("rating", formFields.rating);
    formdata.append("isFeatured", formFields.isFeatured);

    if (formFields.name === "") {
      alert("Product Name is required");
      return false;
    }

    if (formFields.description === "") {
      alert("Product Description is required");
      return false;
    }
    if (formFields.brand === "") {
      alert("Product Brand is required");
      return false;
    }
    if (formFields.price !== 0 && formFields.price === "") {
      alert("Product Price is required");
      return false;
    }
    if (formFields.oldPrice !== 0 && formFields.oldPrice === "") {
      alert("Product Old Price is required");
      return false;
    }
    if (formFields.category === "") {
      alert("Product Category is required");
      return false;
    }
    if (formFields.subCat === "") {
      alert("Product subCat is required");
      return false;
    }
    if (formFields.countInStock !== 0 && formFields.countInStock === "") {
      alert("Product Stock is required");
      return false;
    }
    if (formFields.rating === 0) {
      alert("Product Rating is required");
      return false;
    }
    if (formFields.isFeatured === 0) {
      alert("Product isFeatured is required");
      return false;
    }

    postData("/api/products/create", formFields).then((res) => {
      alert("Product Added Successfully");

      setIsLoading(false);

      setFormFields({
        name: "",
        description: "",
        images: [],
        brand: "",
        price: 0,
        oldPrice: 0,
        category: "",
        subCat: "",
        countInStock: 0,
        rating: 0,
        isFeatured: false,
      });
      setPreviews([]);
      setCategoryVal("");
      setisFeaturedValue("");
    });
  };
  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 w-100 flex-row p-4 justify-content-between">
        <h5 className="mb-0 breadhead">Product Upload</h5>
        <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
          <StyledBreadcrumb
            components="a"
            href="#"
            label="Dashboard"
            icon={<HomeIcon fontSize="small" />}
          />
          <StyledBreadcrumb label="Products" components="a" href="#" />
          <StyledBreadcrumb label="Product Upload" />
        </Breadcrumbs>
      </div>

      <form className="form" onSubmit={addProduct}>
        <div className="row">
          <div className="col-md-12">
            <div className="card p-4">
              <h5 className="mb-4">Basic Information</h5>
              <div className="form-group">
                <h6>PRODUCT NAME</h6>
                <input
                  type="text"
                  name="name"
                  onChange={inputChange}
                  value={formFields.name}
                />
              </div>

              <div className="form-group">
                <h6>DESCRIPTION</h6>
                <textarea
                  rows={5}
                  cols={10}
                  name="description"
                  onChange={inputChange}
                  value={formFields.description}
                />
              </div>

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
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {catData?.categoryList?.length !== 0 &&
                        catData?.categoryList?.map((cat, index) => {
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
                    <Select
                      value={subCatVal}
                      onChange={handleChangeSubCategory}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      className="w-100"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {catData?.categoryList?.length !== 0 &&
                        catData?.categoryList?.map((cat, index) => {
                          return (
                            <MenuItem key={index} value={cat.id}>
                              {cat.subCat}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <h6>REGULAR PRICE</h6>
                    <input
                      type="text"
                      name="price"
                      value={formFields.price}
                      onChange={inputChange}
                    />
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <h6>DISCOUNTED PRICE</h6>
                    <input
                      type="text"
                      name="oldPrice"
                      value={formFields.oldPrice}
                      onChange={inputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <h6 className="text-uppercase">is Featured</h6>
                    <Select
                      value={isFeaturedValue}
                      onChange={handleChangeisFeaturedValue}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      className="w-100"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={true}>True</MenuItem>
                      <MenuItem value={false}>False</MenuItem>
                    </Select>
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <h6>PRODUCT STOCK</h6>
                    <input
                      type="text"
                      name="countInStock"
                      onChange={inputChange}
                      value={formFields.countInStock}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <h6>RATINGS</h6>
                    <Rating
                      name="simple-controlled"
                      value={ratingsValue}
                      onChange={(event, newValue) => {
                        setRatingsValue(newValue);
                        setFormFields((e) => ({
                          ...formFields,
                          rating: newValue,
                        }));
                      }}
                    />
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <h6>BRAND</h6>
                    <input
                      type="text"
                      name="brand"
                      value={formFields.brand}
                      onChange={inputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-4 mt-0">
          <div className="imagesUpploadSec">
            <h5 className="mb-4">Media and Published</h5>
            <div className="imgUploadBox d-flex align-items-center">
              {previews?.length !== 0 &&
                previews?.map((img, index) => {
                  return (
                    <div className="uploadBox" key={index}>
                      <img src={img} className="w-100" alt="img" />
                    </div>
                  );
                })}
              <div className="uploadBox">
                <input
                  type="file"
                  multiple
                  onChange={(e) => onChangeFile(e, "/api/products/upload")}
                  name="images"
                />
                <div className="info">
                  <FaRegImages />
                  <h5>Image Upload</h5>
                </div>
              </div>
            </div>

            <br />
            <Button type="submit" className="btn-blue btn-lg btn-big w-100">
              <FaCloudUploadAlt /> &nbsp;{" "}
              {isLoading === true ? (
                <CircularProgress color="inherit" className="loader" />
              ) : (
                "PUBLISH AND VIEW"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductUpload;
