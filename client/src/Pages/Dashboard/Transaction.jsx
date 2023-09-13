import { Link } from "react-router-dom";
import Nav from "../../Component/Nav/Nav";
import Footer from "../../Component/Footer/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Transaction = () => {
  // const [users, setUser] = useState([])
  const [data, setData] = useState([]);
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("category");
  console.log(id);
  const fetchData = async () => {
    const token = localStorage.getItem("tokenLogin");
    try {
      const trans = await axios.get(`http://localhost:4000/users/trans/${token}`);
      console.log(trans);
      setData(trans.data.data);
      // setUser(trans.data.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Nav />

      <div className="flex h-[800px]">
        <div className="w-[20%] bg-zinc-900 border-r-black">
          <div className=" flex flex-col text-lg">
            <Link to={"/dashboard/account"}>
              <div className=" font-semibold  pl-5 py-5 hover:underline  text-white">Account</div>
            </Link>
            <div className="border border-b-slate-800 border-zinc-900	 bg-purple-800 font-semibold pl-5 py-5 hover:underline text-white">
              Transaction History
            </div>
            <Link to={"/dashboard/myevent"}>
              <div className="font-semibold pl-5 py-5 hover:underline text-white">My Event</div>
            </Link>
          </div>
        </div>

        <div className="w-[80%] pl-10 pt-10 pr-24 ">
          <div className="">
            <div className="font-bold text-4xl">TRANSACTION HISTORY</div>

            <div className="h-[5px] w-[full] bg-black mt-3"></div>

            <div className="overflow-x-auto shadow-xl">
              <table className="table">
                {/* head */}
                <thead>
                  <tr className="bg-black text-white">
                    <th></th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Event</th>
                  </tr>
                </thead>
                {/* <tbody> */}
                {/* row 1 */}
                {!data.length ? (
                  <div className=" flex justify-center h-10 items-center">No Recent Yet</div>
                ) : (
                  data.map((value, index) => {
                    {
                      return (
                        <tbody>
                          <tr>
                            <th>{index + 1}</th>
                            <td>{value.first_name}</td>
                            <td>{value.last_name}</td>
                            <td>{value.email}</td>
                            <td>{value.phone_number}</td>
                            <td>{value.ticket?.name}</td>
                          </tr>
                        </tbody>
                      );
                    }
                  })
                )}
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Transaction;
