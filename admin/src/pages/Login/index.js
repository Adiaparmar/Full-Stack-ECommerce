import { useContext, useEffect, useState } from "react";
import Logo from "../../assets/images/logo.png";
import { MyContext } from "../../App";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  const [inputIndex, setInputIndex] = useState(null);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const context = useContext(MyContext);
  useEffect(() => {
    context.setIsHideSidebarAndHeader(true);
  });
  const focusInput = (index) => {
    setInputIndex(index);
  };

  return (
    <section className="loginSection">
      <div className="loginBox">
        <div className="logo text-center">
          <img src={Logo} alt="logo" width="60px" />
          <h5 className="font-weight-bold log-log">Login to GreenPlore</h5>
        </div>
        <div className="wrapper mt-3 card border p-4">
          <form>
            <div
              className={`form-group mb-3 position-relative ${
                inputIndex === 0 && "focus"
              }`}
            >
              <span className="icon">
                <MdEmail />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email"
                onFocus={() => focusInput(0)}
                onBlur={() => setInputIndex(null)}
              />
            </div>

            <div
              className={`form-group mb-3 position-relative ${
                inputIndex === 1 && "focus"
              }`}
            >
              <span className="icon">
                <RiLockPasswordFill />
              </span>
              <input
                type={`${isPasswordShow === true ? "text" : "password"}`}
                className="form-control"
                placeholder="Enter your password"
                onFocus={() => focusInput(1)}
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

            <div className="form-group mb-3">
              <Button className="btn-blue btn-big w-100">Sign In</Button>
            </div>

            <div className="form-group text-center mb-2">
              <Link to={"/forgot-password"} className="link ">
                FORGOT PASSWORD?
              </Link>
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
        </div>

        <div className="wrapper mt-3 card border footer">
          <div className="form-group text-center">
            <span className="txt">Don't have an account?</span>
            <Link to={"/signUp"} className="link color">
              Register
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
