import { Link } from "react-router-dom";
import { setFirstName } from "../../redux/Features";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
// import { setFirstName } from "../../redux/Features";
function Nav() {
  const [data, setData] = useState(null);
  const [email, setEmail] = useState(null);
  const [point, setPoint] = useState(null);

  const { firstName } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onSignOut = () => {
    localStorage.removeItem("idLogin");
    dispatch(setFirstName(""));
  };
  const fetchData = async () => {
    const getId = localStorage.getItem("idLogin");
    try {
      const res = await axios.get(`http://localhost:4123/user/${getId}`);
      console.log(res.data);
      setEmail(res.data.email);
      setPoint(res.data.point);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="navbar bg-black gap-2 px-40 h-[50px]">
        <Link to={"/"}>
          <div className=" navbar-start mr-5 ">
            <img src={require("./LogoBlack.png")} className=" h-[50px] w-[220px]" alt="logo" />
          </div>
        </Link>

        <div className="navbar-center">
          <div className="form-control h-8 w-[300px]"></div>
        </div>

        <div className="navbar-end flex-none flex gap-3">
          {firstName ? (
            <Link to={"/create"}>
              <div className="btn btn-ghost bg-black text-white">Create Event</div>
            </Link>
          ) : (
            <div className="btn btn-ghost bg-black text-white">Create Event</div>
          )}
          {firstName ? (
            <div className="dropdown dropdown-hover dropdown-end">
              <label tabIndex={0} className="btn btn-ghost m-1 bg-black text-white">
                {firstName}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="hover:bg-white">
                  <p className="hover:bg-white">{email}</p>
                </li>
                <li className="hover:bg-white">
                  <p className="hover:bg-white">point : {point}</p>
                </li>
                <li>
                  <Link className="bg-black text-white font-semibold" onClick={onSignOut}>
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to={"/login "}>
              <div className="btn btn-ghost bg-black text-white">Sign in</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
