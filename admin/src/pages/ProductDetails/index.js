/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-no-comment-textnodes */
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import React, { useRef } from "react";
import Slider from "react-slick";
import { MdBrandingWatermark } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserAvatarImgComponent from "../../components/userAvatarImg";
import { Button, Rating } from "@mui/material";
import { FaReply } from "react-icons/fa";

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
    "https://kingdomofwhite.com/cdn/shop/files/KOW53716_3000x.jpg?v=1724396209";

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
                  <div className="item">
                    <img src={imageSrc} alt="prod" className="w-100" />
                  </div>
                  <div className="item">
                    <img src={imageSrc} alt="prod" className="w-100" />
                  </div>
                  <div className="item">
                    <img src={imageSrc} alt="prod" className="w-100" />
                  </div>
                  <div className="item">
                    <img src={imageSrc} alt="prod" className="w-100" />
                  </div>
                  <div className="item">
                    <img src={imageSrc} alt="prod" className="w-100" />
                  </div>
                  <div className="item">
                    <img src={imageSrc} alt="prod" className="w-100" />
                  </div>
                  <div className="item">
                    <img src={imageSrc} alt="prod" className="w-100" />
                  </div>
                  <div className="item">
                    <img src={imageSrc} alt="prod" className="w-100" />
                  </div>
                </Slider>
                <Slider
                  {...productSliderSmlOptions}
                  ref={productSliderSml}
                  className="sliderSml"
                >
                  <div className="item" onClick={() => goToSlide(1)}>
                    <img src={imageSrc} alt="prod" className="w-100" />
                  </div>
                  <div className="item" onClick={() => goToSlide(2)}>
                    <img src={imageSrc} alt="prod" className="w-100" />
                  </div>
                  <div className="item" onClick={() => goToSlide(3)}>
                    <img src={imageSrc} alt="prod" className="w-100" />
                  </div>
                  <div className="item" onClick={() => goToSlide(4)}>
                    <img src={imageSrc} alt="prod" className="w-100" />
                  </div>
                  <div className="item" onClick={() => goToSlide(5)}>
                    <img src={imageSrc} alt="prod" className="w-100" />
                  </div>
                  <div className="item" onClick={() => goToSlide(6)}>
                    <img src={imageSrc} alt="prod" className="w-100" />
                  </div>
                  <div className="item" onClick={() => goToSlide(7)}>
                    <img src={imageSrc} alt="prod" className="w-100" />
                  </div>
                  <div className="item" onClick={() => goToSlide(8)}>
                    <img src={imageSrc} alt="prod" className="w-100" />
                  </div>
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

          <div className="p-4">
            <h5 className="mt-4 mb-3">Product Description</h5>
            <p className="proddesc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est
              laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <br />
            <h5 className="mt-4 mb-4">Rating Analytics</h5>
            <div className="ratingSection">
              <div className="ratingrow d-flex align-item-center">
                <span className="col1">5 star</span>
                <span className="col2">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </span>
                <span className="col3">(22)</span>
              </div>

              <div className="ratingrow d-flex align-item-center">
                <span className="col1">4 star</span>
                <span className="col2">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "30%" }}
                    ></div>
                  </div>
                </span>
                <span className="col3">(2)</span>
              </div>

              <div className="ratingrow d-flex align-item-center">
                <span className="col1">3 star</span>
                <span className="col2">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </span>
                <span className="col3">(42)</span>
              </div>

              <div className="ratingrow d-flex align-item-center">
                <span className="col1">2 star</span>
                <span className="col2">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "30%" }}
                    ></div>
                  </div>
                </span>
                <span className="col3">(32)</span>
              </div>

              <div className="ratingrow d-flex align-item-center">
                <span className="col1">1 star</span>
                <span className="col2">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "20%" }}
                    ></div>
                  </div>
                </span>
                <span className="col3">(12)</span>
              </div>
            </div>

            <br />

            <h5 className="mt-4 mb-4">Customer Reviews</h5>

            <div className="reviewsSection">
              <div className="reviewsRow">
                <div className="row">
                  <div className="col-sm-7 d-flex">
                    <div className="d-flex  flex-column">
                      <div className="userInfo d-flex mb-3 align-items-center">
                        <UserAvatarImgComponent
                          img="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"
                          lg={true}
                        />
                        <div className="info pl-2">
                          <h5>Miron Mahmud</h5>
                          <span>25 mins ago</span>
                        </div>
                      </div>

                      <Rating
                        name="read-only"
                        value={4.5}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-sm-5 d-flex align-items-center">
                    <div className="btn-rev">
                      <Button className=" btn-blue btn-big btn-lg ml-auto">
                        <FaReply /> &nbsp; Reply
                      </Button>
                    </div>
                  </div>
                  <p className="mt-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor.
                  </p>
                </div>
              </div>

              <div className="reviewsRow reply">
                <div className="row">
                  <div className="col-sm-7 d-flex">
                    <div className="d-flex  flex-column">
                      <div className="userInfo d-flex mb-3 align-items-center">
                        <UserAvatarImgComponent
                          img="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"
                          lg={true}
                        />
                        <div className="info pl-2">
                          <h5>Miron Mahmud</h5>
                          <span>25 mins ago</span>
                        </div>
                      </div>

                      <Rating
                        name="read-only"
                        value={4.5}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-sm-5 d-flex align-items-center">
                    <div className="btn-rev">
                      <Button className=" btn-blue btn-big btn-lg ml-auto">
                        <FaReply /> &nbsp; Reply
                      </Button>
                    </div>
                  </div>
                  <p className="mt-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor.
                  </p>
                </div>
              </div>

              <div className="reviewsRow reply">
                <div className="row">
                  <div className="col-sm-7 d-flex">
                    <div className="d-flex  flex-column">
                      <div className="userInfo d-flex mb-3 align-items-center">
                        <UserAvatarImgComponent
                          img="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"
                          lg={true}
                        />
                        <div className="info pl-2">
                          <h5>Miron Mahmud</h5>
                          <span>25 mins ago</span>
                        </div>
                      </div>

                      <Rating
                        name="read-only"
                        value={4.5}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-sm-5 d-flex align-items-center">
                    <div className="btn-rev">
                      <Button className=" btn-blue btn-big btn-lg ml-auto">
                        <FaReply /> &nbsp; Reply
                      </Button>
                    </div>
                  </div>
                  <p className="mt-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor.
                  </p>
                </div>
              </div>

              <div className="reviewsRow">
                <div className="row">
                  <div className="col-sm-7 d-flex">
                    <div className="d-flex  flex-column">
                      <div className="userInfo d-flex mb-3 align-items-center">
                        <UserAvatarImgComponent
                          img="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"
                          lg={true}
                        />
                        <div className="info pl-2">
                          <h5>Miron Mahmud</h5>
                          <span>25 mins ago</span>
                        </div>
                      </div>

                      <Rating
                        name="read-only"
                        value={4.5}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-sm-5 d-flex align-items-center">
                    <div className="btn-rev">
                      <Button className=" btn-blue btn-big btn-lg ml-auto">
                        <FaReply /> &nbsp; Reply
                      </Button>
                    </div>
                  </div>
                  <p className="mt-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor.
                  </p>
                </div>
              </div>

              <div className="reviewsRow">
                <div className="row">
                  <div className="col-sm-7 d-flex">
                    <div className="d-flex  flex-column">
                      <div className="userInfo d-flex mb-3 align-items-center">
                        <UserAvatarImgComponent
                          img="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"
                          lg={true}
                        />
                        <div className="info pl-2">
                          <h5>Miron Mahmud</h5>
                          <span>25 mins ago</span>
                        </div>
                      </div>

                      <Rating
                        name="read-only"
                        value={4.5}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-sm-5 d-flex align-items-center">
                    <div className="btn-rev">
                      <Button className=" btn-blue btn-big btn-lg ml-auto">
                        <FaReply /> &nbsp; Reply
                      </Button>
                    </div>
                  </div>
                  <p className="mt-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor.
                  </p>
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
