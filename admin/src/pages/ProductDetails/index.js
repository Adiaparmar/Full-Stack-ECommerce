/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-no-comment-textnodes */
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { MdBrandingWatermark } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { useContext } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import UserAvatarImgComponent from "../../components/userAvatarImg";
// import { Button, Rating } from "@mui/material";
// import { FaReply } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
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

const ProductDetails = () => {
  const productSliderBig = useRef();
  const productSliderSml = useRef();

  const [productData, setProductData] = useState(null);
  const context = useContext(MyContext);
  const productSliderOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const productSliderSmlOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const { id } = useParams();

  useEffect(() => {
    fetchDataFromApi(`/api/products/${id}`).then((res) => {
      setProductData(res);
    });
  }, [id]);

  const goToSlide = (index) => {
    productSliderBig.current.slickGoTo(index);
  };
  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4 justify-content-between">
          <h5 className="mb-0 breadhead">Product View</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              components="a"
              href="#"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb label="Products" components="a" href="#" />
            <StyledBreadcrumb label="Product View" />
          </Breadcrumbs>
        </div>

        <div className="card productDetailsSection ">
          <div className="row">
            <div className="col-md-5 pt-3 pb-3 pl-4 pr-4">
              <div className="slidebarWrapper p-3">
                <h5 className="mb-3">Product Gallery</h5>
                <Slider
                  {...productSliderOptions}
                  ref={productSliderBig}
                  className="sliderBig mb-3"
                >
                  {productData?.images?.length !== 0 &&
                    productData?.images?.map((image, index) => {
                      return (
                        <div className="item" key={index}>
                          <img
                            src={`${context.baseUrl}uploads/${image}`}
                            alt="prod"
                            className="w-100"
                          />
                        </div>
                      );
                    })}
                </Slider>
                <Slider
                  {...productSliderSmlOptions}
                  ref={productSliderSml}
                  className="sliderSml"
                >
                  {productData?.images?.length !== 0 &&
                    productData?.images?.map((image, index) => {
                      return (
                        <div
                          className="item"
                          key={index}
                          onClick={() => goToSlide(index)}
                        >
                          <img
                            src={`${context.baseUrl}uploads/${image}`}
                            alt="prod"
                            className="w-100"
                          />
                        </div>
                      );
                    })}
                </Slider>
              </div>
            </div>
            <div className="col-md-7 pt-3 pb-3 pl-4 pr-4">
              <div className="p-3">
                <h5 className="mb-4 ">Product Details</h5>

                <h4>{productData?.name}</h4>

                <div className="productInfo mt-3">
                  <div className="row ">
                    <div className="col-sm-3 d-flex align-items-center mt-4">
                      <span className="icon">
                        <MdBrandingWatermark />
                      </span>
                      <span className="name">Brand</span>
                    </div>
                    <div className="col-sm-7  d-flex align-items-center mt-4">
                      <span>:</span> <span>{productData?.brand}</span>
                    </div>
                  </div>

                  <div className="row ">
                    <div className="col-sm-3 d-flex align-items-center mt-4">
                      <span className="icon">
                        <BiSolidCategoryAlt />
                      </span>
                      <span className="name">Category</span>
                    </div>
                    <div className="col-sm-7  d-flex align-items-center mt-4">
                      <span>:</span> <span>{productData?.category?.name}</span>
                    </div>
                  </div>

                  {/* <div className="row ">
                    <div className="col-sm-3 d-flex align-items-center mt-4">
                      <span className="icon">
                        <BiSolidCategoryAlt />
                      </span>
                      <span className="name">Tags</span>
                    </div>
                    <div className="col-sm-7  d-flex align-items-center mt-4">
                      <span>:</span>{" "}
                      <span>
                        <ul className="list list-inline tags sml">
                          <li className="list-inline-item">
                            <span>SUIT</span>
                          </li>
                          <li className="list-inline-item">
                            <span>PARTY</span>
                          </li>
                          <li className="list-inline-item">
                            <span>DRESS</span>
                          </li>
                          <li className="list-inline-item">
                            <span>MEN</span>
                          </li>
                        </ul>
                      </span>
                    </div>
                  </div>

                  <div className="row ">
                    <div className="col-sm-3 d-flex align-items-center mt-4">
                      <span className="icon">
                        <BiSolidCategoryAlt />
                      </span>
                      <span className="name">Color</span>
                    </div>
                    <div className="col-sm-7  d-flex align-items-center mt-4">
                      <span>:</span>{" "}
                      <span>
                        <ul className="list list-inline tags sml">
                          <li className="list-inline-item">
                            <span>RED</span>
                          </li>
                          <li className="list-inline-item">
                            <span>BLUE</span>
                          </li>
                          <li className="list-inline-item">
                            <span>WHITE</span>
                          </li>
                        </ul>
                      </span>
                    </div>
                  </div>

                  <div className="row ">
                    <div className="col-sm-3 d-flex align-items-center mt-4">
                      <span className="icon">
                        <BiSolidCategoryAlt />
                      </span>
                      <span className="name">Size</span>
                    </div>
                    <div className="col-sm-7  d-flex align-items-center mt-4">
                      <span>:</span>{" "}
                      <span>
                        <ul className="list list-inline tags sml">
                          <li className="list-inline-item">
                            <span>SM</span>
                          </li>
                          <li className="list-inline-item">
                            <span>MD</span>
                          </li>
                          <li className="list-inline-item">
                            <span>L</span>
                          </li>
                          <li className="list-inline-item">
                            <span>XL</span>
                          </li>
                          <li className="list-inline-item">
                            <span>XXL</span>
                          </li>
                        </ul>
                      </span>
                    </div>
                  </div> */}

                  <div className="row ">
                    <div className="col-sm-3 d-flex align-items-center mt-4">
                      <span className="icon">
                        <BiSolidCategoryAlt />
                      </span>
                      <span className="name">Price</span>
                    </div>
                    <div className="col-sm-7  d-flex align-items-center mt-4">
                      <span>:</span> <span>{productData?.oldPrice}</span>
                    </div>
                  </div>

                  <div className="row ">
                    <div className="col-sm-3 d-flex align-items-center mt-4">
                      <span className="icon">
                        <BiSolidCategoryAlt />
                      </span>
                      <span className="name">Discounted Price</span>
                    </div>
                    <div className="col-sm-7  d-flex align-items-center mt-4">
                      <span>:</span> <span>{productData?.price}</span>
                    </div>
                  </div>

                  <div className="row ">
                    <div className="col-sm-3 d-flex align-items-center mt-4">
                      <span className="icon">
                        <BiSolidCategoryAlt />
                      </span>
                      <span className="name">Stock</span>
                    </div>
                    <div className="col-sm-7  d-flex align-items-center mt-4">
                      <span>:</span>{" "}
                      <span>{productData?.countInStock} pieces</span>
                    </div>
                  </div>

                  <div className="row ">
                    <div className="col-sm-3 d-flex align-items-center mt-4">
                      <span className="icon">
                        <BiSolidCategoryAlt />
                      </span>
                      <span className="name">Review</span>
                    </div>
                    <div className="col-sm-7  d-flex align-items-center mt-4">
                      <span>:</span> <span>{productData?.rating} Reviews</span>
                    </div>
                  </div>

                  {/* <div className="row ">
                    <div className="col-sm-3 d-flex align-items-center mt-4">
                      <span className="icon">
                        <BiSolidCategoryAlt />
                      </span>
                      <span className="name">Published</span>
                    </div>
                    <div className="col-sm-7  d-flex align-items-center mt-4">
                      <span>:</span> <span>02 Feb 2023</span>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h5 className="mt-4 mb-3">Product Description</h5>
            <p className="proddesc">{productData?.description}</p>

            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
