import { useContext, useEffect, useState } from "react";
import Logo from "../../assets/images/logo.png";
// import { MyContext } from "../../App";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaUserCircle } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckBox from "@mui/material/Checkbox";
import { IoMdHome } from "react-icons/io";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";
import { auth, provider, signInWithPopup } from "../../firebase";

const SignUp = () => {
  const [inputIndex, setInputIndex] = useState(null);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    isAdmin: true,
  });
  const context = useContext(MyContext);
  const history = useNavigate();

  useEffect(() => {
    context.setisHideSidebarAndHeader(true);
  }, [context]);
  const focusInput = (index) => {
    setInputIndex(index);
  };

  const onChangeInput = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };

  const signUp = (e) => {
    e.preventDefault();
    try {
      if (formFields.name === "") {
        alert("Please enter your name");
        return;
      }

      if (formFields.email === "") {
        alert("Please enter your email");
        return;
      }

      if (formFields.phone === "") {
        alert("Please enter your phone");
        return;
      }

      if (formFields.password === "") {
        alert("Please enter your password");
        return;
      }

      if (formFields.confirmPassword === "") {
        alert("Please enter your confirm password");
        return;
      }

      if (formFields.password !== formFields.confirmPassword) {
        alert("Password and confirm password does not match");
        return;
      }

      postData("/api/user/signUp", formFields).then((res) => {
        if (res.status !== false) {
          alert("User created successfully");
          setTimeout(() => {
            history("/login");
          }, 1000);
        } else {
          alert(res.message);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const checkUserExists = async (email) => {
    try {
      const res = await fetch(`/api/user/check?email=${email}`);

      // Ensure the response is valid JSON
      const text = await res.text();
      console.log("Check User Raw Response:", text);

      const data = JSON.parse(text); // Parse after checking
      return data;
    } catch (error) {
      console.error("Error checking user:", error);
      return { status: false }; // Assume user doesn't exist if error
    }
  };
  const signInWithGoogle = async () => {
    try {
      console.log("Starting Google Sign-In...");
      const result = await signInWithPopup(auth, provider);
      console.log("Google Sign-In Success:", result);

      const user = result.user;
      let phone = "";

      // 🔹 Check if user already exists
      const existingUser = await checkUserExists(user.email);

      // 🔹 If user does not exist, ask for phone number
      if (!existingUser.status) {
        phone = prompt("Please enter your phone number:");
        if (!phone) {
          alert("Phone number is required for Google sign-in.");
          return;
        }
      }

      // 🔹 Send data to backend
      const res = await postData("/api/user/google-signin", {
        name: user.displayName,
        email: user.email,
        phone,
      });

      console.log("Server Response:", res);

      if (res.status === 200) {
        localStorage.setItem("token", res.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: res.user.name,
            email: res.user.email,
            userId: res.user.id,
          })
        );

        alert("Login successful");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Failed to sign in with Google. Please try again.");
    }
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
              <form onSubmit={signUp}>
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
                    name="name"
                    onChange={onChangeInput}
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
                    name="email"
                    onChange={onChangeInput}
                  />
                </div>

                <div
                  className={`form-group mb-3 position-relative ${
                    inputIndex === 2 && "focus"
                  }`}
                >
                  <span className="icon">
                    <FaPhoneAlt />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your phone"
                    onFocus={() => focusInput(1)}
                    onBlur={() => setInputIndex(null)}
                    name="phone"
                    onChange={onChangeInput}
                  />
                </div>

                <div
                  className={`form-group mb-3 position-relative ${
                    inputIndex === 3 && "focus"
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
                    name="password"
                    onChange={onChangeInput}
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
                    inputIndex === 4 && "focus"
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
                    name="confirmPassword"
                    onChange={onChangeInput}
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
                  <Button className="btn-blue btn-big w-100" type="submit">
                    Sign Up
                  </Button>
                </div>

                <div className="form-group text-center mb-2">
                  <div className="d-flex align-items-center justify-content-center or">
                    <span className="line"></span>
                    <span className="txt">or</span>
                    <span className="line"></span>
                  </div>

                  <Button
                    variant="outlined"
                    className="w-100 btn-lg loginWithGoogle btn-big"
                    onClick={signInWithGoogle}
                  >
                    <img
                      src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png"
                      alt="google"
                      width="25px"
                      className="mr-4 google"
                    />
                    Sign in with Google
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
