// import { useContext, useEffect, useState } from "react";
// import Logo from "../../assets/images/logo.png";
// import { MyContext } from "../../App";
// import { MdEmail } from "react-icons/md";
// import { RiLockPasswordFill } from "react-icons/ri";
// import { IoMdEye } from "react-icons/io";
// import { IoMdEyeOff } from "react-icons/io";
// import { Button } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import { postData } from "../../utils/api";

// const Login = () => {
//   const [inputIndex, setInputIndex] = useState(null);
//   const [isPasswordShow, setIsPasswordShow] = useState(false);
//   const context = useContext(MyContext);

//   const [formFields, setFormFields] = useState({
//     email: "",
//     password: "",
//     isAdmin: true,
//   });

//   useEffect(() => {
//     context.setisHideSidebarAndHeader(true);
//   });
//   const focusInput = (index) => {
//     setInputIndex(index);
//   };

//   const history = useNavigate();

//   const onChangeInput = (e) => {
//     setFormFields(() => ({
//       ...formFields,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const signIn = (e) => {
//     e.preventDefault();
//     if (formFields.email === "") {
//       alert("Please enter your email");
//       return;
//     }
//     if (formFields.password === "") {
//       alert("Please enter your password");
//       return;
//     }

//     postData("/api/user/signin", formFields).then((res) => {
//       try {
//         if (res.status !== 400) {
//           localStorage.setItem("token", res.token);
//           const user = {
//             name: res.user?.name,
//             email: res.user?.email,
//             userId: res.user?.id,
//           };
//           localStorage.setItem("user", JSON.stringify(user));

//           alert("Login successfully");

//           setTimeout(() => {
//             // history("/dashboard");
//             window.location.href = "/dashboard";
//           }, 1000);
//         } else {
//           alert(res.message);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     });
//   };

//   return (
//     <section className="loginSection">
//       <div className="loginBox">
//         <div className="logo text-center">
//           <img src={Logo} alt="logo" width="60px" />
//           <h5 className="font-weight-bold log-log">Login to GreenPlore</h5>
//         </div>
//         <div className="wrapper mt-3 card border p-4">
//           <form onSubmit={signIn}>
//             <div
//               className={`form-group mb-3 position-relative ${
//                 inputIndex === 0 && "focus"
//               }`}
//             >
//               <span className="icon">
//                 <MdEmail />
//               </span>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter your email"
//                 onFocus={() => focusInput(0)}
//                 onBlur={() => setInputIndex(null)}
//                 autoFocus
//                 name="email"
//                 onChange={onChangeInput}
//               />
//             </div>

//             <div
//               className={`form-group mb-3 position-relative ${
//                 inputIndex === 1 && "focus"
//               }`}
//             >
//               <span className="icon">
//                 <RiLockPasswordFill />
//               </span>
//               <input
//                 type={`${isPasswordShow === true ? "text" : "password"}`}
//                 className="form-control"
//                 placeholder="Enter your password"
//                 onFocus={() => focusInput(1)}
//                 onBlur={() => setInputIndex(null)}
//                 name="password"
//                 onChange={onChangeInput}
//               />
//               <span
//                 className="toggleShowPassword"
//                 onClick={() => {
//                   setIsPasswordShow(!isPasswordShow);
//                 }}
//               >
//                 {isPasswordShow === true ? <IoMdEyeOff /> : <IoMdEye />}
//               </span>
//             </div>

//             <div className="form-group mb-3">
//               <Button className="btn-blue btn-big w-100 " type="submit">
//                 Sign In
//               </Button>
//             </div>

//             <div className="form-group text-center mb-2">
//               <Link to={"/forgot-password"} className="link ">
//                 FORGOT PASSWORD?
//               </Link>
//               <div className="d-flex align-items-center justify-content-center or">
//                 <span className="line"></span>
//                 <span className="txt">or</span>
//                 <span className="line"></span>
//               </div>

//               <Button
//                 variable="outlined"
//                 className="w-100 btn-lg loginWithGoogle btn-big"
//               >
//                 <img
//                   src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png"
//                   alt="google"
//                   width="25px"
//                   className="mr-4 google"
//                 />
//                 Sign in with google
//               </Button>
//             </div>
//           </form>
//         </div>

//         <div className="wrapper mt-3 card border footer">
//           <div className="form-group text-center">
//             <span className="txt">Don't have an account?</span>
//             <Link to={"/signUp"} className="link color">
//               Register
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;

import { useContext, useEffect, useState } from "react";
import Logo from "../../assets/images/logo.png";
import { MyContext } from "../../App";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../../utils/api";
import { auth, provider, signInWithPopup } from "../../firebase";

const Login = () => {
  const [inputIndex, setInputIndex] = useState(null);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const context = useContext(MyContext);

  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
    isAdmin: true,
  });

  useEffect(() => {
    context.setisHideSidebarAndHeader(true);
  });

  const focusInput = (index) => {
    setInputIndex(index);
  };

  const history = useNavigate();

  const onChangeInput = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  const signIn = async (e) => {
    e.preventDefault();
    if (formFields.email === "") {
      alert("Please enter your email");
      return;
    }
    if (formFields.password === "") {
      alert("Please enter your password");
      return;
    }

    try {
      const res = await postData("/api/user/signin", formFields);
      if (res.status !== 400) {
        localStorage.setItem("token", res.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: res.user.name,
            email: res.user.email,
            userId: res.user.id,
          })
        );
        alert("Login successfully");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      let phone = "";
      const existingUser = await fetch(
        `/api/user/check?email=${user.email}`
      ).then((res) => res.json());

      if (!existingUser.status) {
        phone = prompt("Please enter your phone number:");
        if (!phone) {
          alert("Phone number is required for Google sign-in.");
          return;
        }
      }

      const res = await postData("/api/user/google-signin", {
        name: user.displayName,
        email: user.email,
        userId: user.uid,
        phone,
      });

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
      alert("Failed to sign in with Google");
    }
  };

  return (
    <section className="loginSection">
      <div className="loginBox">
        <div className="logo text-center">
          <img src={Logo} alt="logo" width="60px" />
          <h5 className="font-weight-bold log-log">Login to GreenPlore</h5>
        </div>
        <div className="wrapper mt-3 card border p-4">
          <form onSubmit={signIn}>
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
                name="email"
                onChange={onChangeInput}
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
                type={isPasswordShow ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                onFocus={() => focusInput(1)}
                onBlur={() => setInputIndex(null)}
                name="password"
                onChange={onChangeInput}
              />
              <span
                className="toggleShowPassword"
                onClick={() => setIsPasswordShow(!isPasswordShow)}
              >
                {isPasswordShow ? <IoMdEyeOff /> : <IoMdEye />}
              </span>
            </div>

            <div className="form-group mb-3">
              <Button className="btn-blue btn-big w-100" type="submit">
                Sign In
              </Button>
            </div>
          </form>
          <div className="form-group text-center mb-2">
            <Link to="/forgot-password" className="link">
              FORGOT PASSWORD?
            </Link>
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
        </div>
        <div className="wrapper mt-3 card border footer">
          <div className="form-group text-center">
            <span className="txt">Don't have an account?</span>
            <Link to="/signUp" className="link color">
              Register
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
