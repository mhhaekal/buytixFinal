import { useState } from "react";
import InputText from "../../Component/Input Text/InputText";
import { useDispatch, useSelector } from "react-redux";
import { onRegisterAsync } from "../../redux/Features";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Register() {
  const [inputNewEmail, setInputNewEmail] = useState("");
  const [inputNewPassword, setInputNewPassword] = useState("");
  const [inputUserNewName, setInputUserNewName] = useState("");
  // const { firstName } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = (inputNewEmail, inputUserNewName, inputNewPassword) => {
    dispatch(onRegisterAsync(inputNewEmail, inputUserNewName, inputNewPassword));
    // navigate("/");
  };

  // if (firstName) return navigate("/");
  return (
    <div className="h-screen">
      <Toaster />

      <div className="flex h-screen">
        <div className="w-[60%] ">
          <div className="ml-20 mt-32">
            <img src={require("./LogoWhite.png")} className=" h-[100px] w-[210px]" alt="logo" />
            <div className="ml-4 my-3">
              <span className="font-bold">Email</span>
              <InputText
                handleStyle={{ width: "500px" }}
                handlePlaceholder={"email"}
                handleType={"email"}
                onChange={(e) => setInputNewEmail(e.target.value)}
                value={inputNewEmail}
              />
            </div>

            <div className="ml-4">
              <span className="font-bold">Username</span>
              <InputText
                handleStyle={{ width: "500px" }}
                handlePlaceholder={"username"}
                handleType={"text"}
                onChange={(e) => setInputUserNewName(e.target.value)}
                value={inputUserNewName}
              />
            </div>

            <div className="ml-4 my-3">
              <span className="font-bold">Password</span>
              <InputText
                handleStyle={{ width: "500px" }}
                handlePlaceholder={"password"}
                handleType={"password"}
                onChange={(e) => setInputNewPassword(e.target.value)}
                value={inputNewPassword}
              />
            </div>
          </div>

          <div>
            <button
              className="w-[500px] my-3 ml-24 rounded-lg bg-black h-[50px] text-white"
              onClick={() => onRegister(inputNewEmail, inputUserNewName, inputNewPassword)}
            >
              CREATE AN ACCOUNT
            </button>
          </div>
          <div className="ml-24">
            {/* <button className="w-[500px] my-3 ml-24 rounded-lg bg-purple-800 h-[50px] text-white">
              SIGN IN
            </button> */}
            <h1>
              Already Have Account ?{" "}
              <Link className="hover:text-purple-800 hover:underline " to={"/login"}>
                SIGN IN
              </Link>
            </h1>
          </div>
        </div>
        <div className="w-[40%] bg-gradient-to-r from-black to-purple-800"></div>
      </div>
    </div>
  );
}

export default Register;
