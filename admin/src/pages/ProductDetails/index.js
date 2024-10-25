import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";
import Slider from "react-slick";
import { MdBrandingWatermark } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  const imageSrc =
    "https://images.meesho.com/images/products/204307799/pd2lf_1200.jpg";

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4 justify-content-between">
          <h5 className="mb-0 breadhead">Product List</h5>
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

        <div className="card productDetailsSection">
          <div className="row">
            <div className="col-md-5 pt-3 pb-3 pl-4 pr-4">
              <div className="slidebarWrapper p-3">
                <h5 className="mb-3">Product Gallery</h5>
                <Slider {...productSliderOptions} className="sliderBig mb-3">
                  <div className="item">
                    <img src={imageSrc} alt="prod" className="w-100" />
                  </div>
                </Slider>
                <Slider {...productSliderSmlOptions} className="sliderSml">
                  {[...Array(9)].map((_, index) => (
                    <div className="item" key={index}>
                      <img
                        src={imageSrc}
                        alt={`prod-${index}`}
                        className="w-100"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            <div className="col-md-7 pt-3 pb-3 pl-4 pr-4">
              <div className="p-3">
                <h5 className="mb-4 ">Product Details</h5>

                <h4>Sustainable green decorative items for your house needs</h4>

                <div className="productInfo mt-3">
                  <div className="row ">
                    <div className="col-sm-3 d-flex align-items-center mt-4">
                      <span className="icon">
                        <MdBrandingWatermark />
                      </span>
                      <span className="name">Brand</span>
                    </div>
                    <div className="col-sm-7  d-flex align-items-center mt-4">
                      <span>:</span> <span>Ecstasy</span>
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
                      <span>:</span> <span>Man's</span>
                    </div>
                  </div>

                  <div className="row ">
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
                  </div>

                  <div className="row ">
                    <div className="col-sm-3 d-flex align-items-center mt-4">
                      <span className="icon">
                        <BiSolidCategoryAlt />
                      </span>
                      <span className="name">Price</span>
                    </div>
                    <div className="col-sm-7  d-flex align-items-center mt-4">
                      <span>:</span> <span>$37.80</span>
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
                      <span>:</span> <span>(68) Piece</span>
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
                      <span>:</span> <span>(03) Reviews</span>
                    </div>
                  </div>

                  <div className="row ">
                    <div className="col-sm-3 d-flex align-items-center mt-4">
                      <span className="icon">
                        <BiSolidCategoryAlt />
                      </span>
                      <span className="name">Published</span>
                    </div>
                    <div className="col-sm-7  d-flex align-items-center mt-4">
                      <span>:</span> <span>02 Feb 2023</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
