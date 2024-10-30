import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { Button, MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useContext, useEffect, useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
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
  const [ratingsValue, setRatingsValue] = useState(1);
  const [isFeaturedValue, setisFeaturedValue] = useState("");
  const [catData, setCatData] = useState([]);
  const [productImagesArr, setProductImagesArr] = useState([]);
  const [formFields, setFormFields] = useState({
    name: "",
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
  const productImages = useRef(null);

  useEffect(() => {
    context.setProgress(20);

    fetchDataFromApi("/api/category").then((res) => {
      setCatData(res);
      context.setProgress(100);
    });
  }, [context]);

  const handleChangeCategory = (event) => {
    setCategoryVal(event.target.value);
    setFormFields((e) => ({
      ...formFields,
      category: event.target.value,
    }));
  };

  const handleChangeisFeaturedValue = (event) => {
    setisFeaturedValue(event.target.value);
    setFormFields((e) => ({
      ...formFields,
      isFeatured: event.target.value,
    }));
  };

  const addProductImages = () => {
    setProductImagesArr((prevArray) => [
      ...prevArray,
      productImages.current.value,
    ]);
    productImages.current.value = "";
  };

  const inputChange = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };

  const addProduct = (e) => {
    e.preventDefault();
    formFields.images = productImagesArr;
    postData("/api/products/create", formFields).then((res) => {
      alert("Product Added Successfully");

      setFormFields({
        name: "",
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
      setProductImagesArr([]);
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
          <div className="col-sm-9">
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
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <h6>PRODUCT IMAGES</h6>
                    <div className="position-relative inputBtn">
                      <input
                        type="text"
                        ref={productImages}
                        style={{ paddingRight: "100px" }}
                        name="images"
                        onChange={inputChange}
                      ></input>
                      <Button className="btn-blue" onClick={addProductImages}>
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <br />
              <Button type="submit" className="btn-blue btn-lg btn-big">
                <FaCloudUploadAlt /> &nbsp; PUBLISH & VIEW
              </Button>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="stickyBox">
              {productImagesArr?.length !== 0 && <h4>Product Images</h4>}
              <div className="imgGrid d-flex" id="imgGrid">
                {productImagesArr?.map((image, index) => {
                  return (
                    <div className="img" key={index}>
                      <img src={image} alt="img" className="w-100" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductUpload;
