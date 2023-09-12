import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
// import { useDispatch } from "react-redux";

const initialState = {
  firstName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFirstName: (initialState, action) => {
      console.log(action.payload);
      initialState.firstName = action.payload;
    },
  },
});

export const onRegisterAsync = (email, username, pwd) => async (dispatch) => {
  const data = {
    username: username,
    email: email,
    password: pwd,
    point: 0,
  };
  try {
    if (!username || !email || !pwd) return toast.error(`Fields should not be empty`);
    // const checkEmail = await axios.post(`http://localhost:4000/user?email=${data.email}`);

    // if (checkEmail.data.length) {
    //   return toast.error("email already registerd, please use another email");
    // } else {
    const res = await axios.post(`http://localhost:4000/users`, data);
    // console.log(res.data);
    // console.log(res.isError);
    if (res.data.isError) return toast.error(` email already registerd, please use another email`);
    // const getId = await axios.get(`http://localhost:4123/user?email=${data.email}`);

    toast.success(` check your email ${data.username}`);
    // dispatch(setFirstName(data.username));

    // setTimeout(() => {
    //   dispatch(setFirstName(data.username));
    // }, 2000);

    //toast.success(`${data.username} Welcome onboard!`)
    // }
    // if(res.data.length) return alert('email telah digunakan')
  } catch (error) {
    console.log(error);
  }
};

export const onLoginAsync = (email, password) => async (dispatch) => {
  try {
    console.log(">>>>");
    if (!email || !password) return toast.error(`Fields should not be empty`);
    console.log(email);
    console.log(password);
    const res = await axios.get(
      `http://localhost:4000/users/login?email=${email}&password=${password}`
    );
    if (res.data.isError) return toast.error(res.data.message);
    console.log(res);
    console.log(res.data.token);
    // if (!res.data.length) return toast.error("email or password is not found, please try again");
    localStorage.setItem("tokenLogin", res.data.token);
    setTimeout(() => {
      dispatch(setFirstName(res.data.data));
    }, 2000);
    //dispatch(setFirstName(res.data[0].username));
    //alert(`Welcome Back ${res.data[0].username}!`);
    toast.success(`Welcome Back ${res.data.data}!`);
    // if (res.data.length) return true;
  } catch (error) {
    console.log(error);
  }
};

export const onCheckisLogin = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("tokenLogin");
    console.log(token);
    const res = await axios.get(`http://localhost:4000/users/verif/${token}`);
    console.log(res);
    alert("test");
    // console.log(res.data.username);
    dispatch(setFirstName(res.data.data));
  } catch (error) {
    // if(res.response.data)
    if (error.response.data.isError && localStorage.getItem("tokenLogin")) {
      localStorage.removeItem("tokenLogin");
      // alert("please re-login");
      toast.success("your account is expired");
      console.log("ayam");
      // setTimeout(() => {
      //   toast.error("your account is expired");
      // }, 3000);
    } else {
      console.log(error);
    }
  }
};

export const { setFirstName } = userSlice.actions;
export default userSlice.reducer;
