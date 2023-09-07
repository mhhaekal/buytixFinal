import { useEffect, useState } from "react";
import InputText from "../../Component/Input Text/InputText";
import { onLoginAsync } from "../../redux/Features";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"

function Login() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const { firstName } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (inputEmail, inputPassword) => {
    console.log(inputEmail);
    console.log(inputPassword);
    dispatch(onLoginAsync(inputEmail, inputPassword));
  };

  useEffect(() => {
    if (firstName) {
      navigate("/");
    }
  }, [firstName]);


  return (
    <div className="h-screen">

      <Toaster />
      <div className="flex h-screen">
        <div className="w-[60%] ">
          <div className="ml-20 mt-32">
            <img src={require("./LogoWhite.png")} alt="Logo" className=" h-[100px] w-[210px]" />

            <div className="ml-4">
              <span className="font-bold">Email</span>
              <InputText
                handleStyle={{ width: "500px" }}
                handlePlaceholder={"username"}
                handleType={"text"}
                onChange={(e) => setInputEmail(e.target.value)}
                value={inputEmail}
              />
            </div>

            <div className="ml-4 my-3">
              <span className="font-bold">Password</span>
              <InputText
                handleStyle={{ width: "500px" }}
                handlePlaceholder={"password"}
                handleType={"password"}
                onChange={(e) => setInputPassword(e.target.value)}
                value={inputPassword}
              />
            </div>
          </div>

          <div>
            <button
              className="w-[500px] my-3 ml-24 rounded-lg bg-purple-800 h-[50px] text-white"
              onClick={() => handleLogin(inputEmail, inputPassword)}
            >
              SIGN IN
            </button>
          </div>

          <div>
            <Link to={"/register"}>
              <button className="w-[500px] my-3 ml-24 rounded-lg bg-black h-[50px] text-white">
                CREATE AN ACCOUNT
              </button>
            </Link>
          </div>
        </div>
        <div className="w-[40%] bg-gradient-to-r from-black to-purple-800"></div>
      </div>
    </div>
  );
}

export default Login;
