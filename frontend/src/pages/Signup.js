import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Radio } from "antd";
import LoginAimator from "../images/loginAnimator.gif";
import RightArrow from "../images/rightArrow.png";
import AuthImage1 from "../images/auth1.png";
import AuthImage2 from "../images/auth2.png";
import AuthImage3 from "../images/auth3.png";
import Loader from "../images/loader.gif";
import api from "../api";
import userStore from "../stores/userStore";

const bgColor = ["#3030fb", "#3030fb", "#A641FF", "#ff40dc"];

const Signup = () => {
  const [currentImage, setCurrentImage] = useState(AuthImage1);
  const [currentBg, setCurrentBg] = useState("");
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState("");
  const [role, setRole] = useState(0);

  const { setUserDetails } = userStore();

  const navigate = useNavigate();

  const onRadioChange = (e) => {
    console.log("radio checked", e.target.value);
    setRole(e.target.value);
  };

  useEffect(() => {
    const imageArray = [LoginAimator, AuthImage1, AuthImage2, AuthImage3];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % imageArray.length;
      setCurrentImage(imageArray[currentIndex]);
      setCurrentBg(bgColor[currentIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setShowErrorMessage("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setShowErrorMessage("");
  };

  const checkValidations = () => {
    if (!email.trim()) {
      return "Email cannot be empty";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }

    if (!password.trim()) {
      return "Password cannot be empty";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }

    if (role === 0) {
      return "Choose one of the following roles";
    }

    return "";
  };

  const handleRegister = async () => {
    setLoader(true);
    const errorMsg = checkValidations();
    if (errorMsg) {
      setLoader(false);
      setShowErrorMessage(errorMsg);
    } else {
      const resp = await api.post("/users/register", {
        email,
        password,
        role,
      });
      console.log("Proceed with regged in: ", resp);
      const { data, token } = resp.data;
      console.log("data: ", data);
      setUserDetails(data);
      localStorage.setItem("token", token);
      setTimeout(() => {
        setLoader(false);
        navigate("/onboarding");
      }, 3000);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="rgba(64,64,255,1)"
          >
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"></path>
          </svg>
          <h1>neTask</h1>
        </div>
        <div className="auth-text">
          <h3>
            Back to your <span>digital life.</span>
          </h3>
          <p>Choose one of the options to go.</p>
        </div>
        <div className="mt-14">
          <div>
            <div className="email-input">
              <input
                type="text"
                placeholder="Email ID"
                name={email}
                value={email}
                onChange={handleEmail}
              />
            </div>
          </div>
          <div className="mt-14">
            <div className="email-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name={password}
                value={password}
                onChange={handlePassword}
              />
              <div
                className="cursor-pointer"
                style={{ width: "18px" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="rgba(123,123,123,1)"
                  >
                    <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="rgba(123,123,123,1)"
                  >
                    <path d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12.0003 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12.0003 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12.0003 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12.0003 5.00016C11.1544 5.00016 10.3329 5.11773 9.55249 5.33818L7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925ZM11.7229 7.50857C11.8146 7.50299 11.9071 7.50016 12.0003 7.50016C14.4855 7.50016 16.5003 9.51488 16.5003 12.0002C16.5003 12.0933 16.4974 12.1858 16.4919 12.2775L11.7229 7.50857Z"></path>
                  </svg>
                )}
              </div>
            </div>
          </div>

          <div className="mt-10 w-full">
            <div className="flex justify-between">
              <Radio.Group onChange={onRadioChange} value={role}>
                <Radio value={"manager"}>Product Manager</Radio>
                <Radio value={"developer"}>Software Developer</Radio>
              </Radio.Group>
            </div>
          </div>

          <div
            className={
              showErrorMessage.length === 0 ? "not-error" : "error-box"
            }
          >
            {showErrorMessage}
          </div>

          <div className="btn-auth" onClick={handleRegister}>
            <p>Sign Up</p>
            {loader ? (
              <img className="w-[30px] ml-3" src={Loader} alt="" />
            ) : (
              <img className="w-[18px] ml-3" src={RightArrow} alt="" />
            )}
          </div>
          <div className="new-account">
            Already have an account?{" "}
            <span>
              <Link to="/login">Login.</Link>
            </span>
          </div>
          <div className="copyright">
            © all copyrights reserved to their respective owner.
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: currentBg }} className="auth-right">
        <div className="right-content">
          <p className="wht-new">Think, Create, & Manage.</p>
          <p className="wht-new-para">
            Onetask is the best workplace for managing projects. Providing
            additional features for to manage your team's works, projects, and
            tasks online.
          </p>
        </div>
        <img className="auth-img" src={LoginAimator} alt="" />
        <div className="creative-box-2">
          <p>GitHub Project Repo</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="rgba(255,255,255,1)"
          >
            <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Signup;
