import { useContext, useEffect, useState } from "react";
import Logo from "../../assets/images/logo.png";
// import { MyContext } from "../../App";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckBox from "@mui/material/Checkbox";
import { IoMdHome } from "react-icons/io";
import { MyContext } from "../../App";

const SignUp = () => {
  const [inputIndex, setInputIndex] = useState(null);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const context = useContext(MyContext);

  useEffect(() => {
    context.setisHideSidebarAndHeader(true);
  }, [context]);
  const focusInput = (index) => {
    setInputIndex(index);
  };

  return (
    <section className="loginSection signUpSection">
      <div className="row">
        <div className="col-md-8 d-flex align-items-center flex-column part1 justify-content-center">
          <h1>SUSTAINABLE ECOMMERCE PLATFORM & ADMIN PANEL</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="w-100 mt-4">
            <Link to={"/"}>
              <Button className="btn-blue btn-lg btn-big">
                <IoMdHome />
                Go To Home
              </Button>
            </Link>
          </div>
        </div>

        <div className="col-md-4 pr-0">
          <div className="loginBox">
            <div className="logo text-center">
              <img src={Logo} alt="logo" width="60px" />
              <h5 className="font-weight-bold log-log">
                Register to GreenPlore
              </h5>
            </div>
            <div className="wrapper card border p-4">
              <form>
                <div
                  className={`form-group mb-3 position-relative ${
                    inputIndex === 0 && "focus"
                  }`}
                >
                  <span className="icon">
                    <FaUserCircle />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your Name"
                    onFocus={() => focusInput(0)}
                    onBlur={() => setInputIndex(null)}
                    autoFocus
                  />
                </div>

                <div
                  className={`form-group mb-3 position-relative ${
                    inputIndex === 1 && "focus"
                  }`}
                >
                  <span className="icon">
                    <MdEmail />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your email"
                    onFocus={() => focusInput(1)}
                    onBlur={() => setInputIndex(null)}
                  />
                </div>

                <div
                  className={`form-group mb-3 position-relative ${
                    inputIndex === 2 && "focus"
                  }`}
                >
                  <span className="icon">
                    <RiLockPasswordFill />
                  </span>
                  <input
                    type={`${isPasswordShow === true ? "text" : "password"}`}
                    className="form-control"
                    placeholder="Enter your password"
                    onFocus={() => focusInput(2)}
                    onBlur={() => setInputIndex(null)}
                  />
                  <span
                    className="toggleShowPassword"
                    onClick={() => {
                      setIsPasswordShow(!isPasswordShow);
                    }}
                  >
                    {isPasswordShow === true ? <IoMdEyeOff /> : <IoMdEye />}
                  </span>
                </div>

                <div
                  className={`form-group mb-3 position-relative ${
                    inputIndex === 3 && "focus"
                  }`}
                >
                  <span className="icon">
                    <IoShieldCheckmarkSharp />
                  </span>
                  <input
                    type={`${
                      isShowConfirmPassword === true ? "text" : "password"
                    }`}
                    className="form-control"
                    placeholder="Confirm your password"
                    onFocus={() => focusInput(3)}
                    onBlur={() => setInputIndex(null)}
                  />
                  <span
                    className="toggleShowPassword"
                    onClick={() => {
                      setIsShowConfirmPassword(!isShowConfirmPassword);
                    }}
                  >
                    {isShowConfirmPassword === true ? (
                      <IoMdEyeOff />
                    ) : (
                      <IoMdEye />
                    )}
                  </span>
                </div>

                <FormControlLabel
                  control={<CheckBox />}
                  label="I agree to all Terms & Conditions"
                />

                <div className="form-group mb-3">
                  <Button className="btn-blue btn-big w-100">Sign Up</Button>
                </div>

                <div className="form-group text-center mb-2">
                  <div className="d-flex align-items-center justify-content-center or">
                    <span className="line"></span>
                    <span className="txt">or</span>
                    <span className="line"></span>
                  </div>

                  <Button
                    variable="outlined"
                    className="w-100 btn-lg loginWithGoogle btn-big"
                  >
                    <img
                      src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png"
                      alt="google"
                      width="25px"
                      className="mr-4 google"
                    />
                    Sign in with google
                  </Button>
                </div>
              </form>
              <div className="form-group text-center d-block mt-3">
                <span className="txt">
                  Already have an account?
                  <Link to={"/login"} className="link color">
                    Login
                  </Link>
                </span>
              </div>
            </div>

            <div className="wrapper card border footer"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
