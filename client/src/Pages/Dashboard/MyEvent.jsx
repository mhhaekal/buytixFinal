import { Link, useLocation } from "react-router-dom";
import Nav from "../../Component/Nav/Nav";
import Footer from "../../Component/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

const MyEvent = () => {
  // const [users, setUser] = useState([])
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("tokenLogin");
      const test = await axios.get(`http://localhost:4000/users/data/${token}`);
      console.log(test.data.data.id);
      const ticket = await axios.get(`http://localhost:4000/users/myevent/${token}`);
      console.log(ticket);
      setData(ticket.data.data);
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

      <div className="flex h-[500px]">
        <div className="w-[20%] bg-zinc-900 border-r-black">
          <div className=" flex flex-col text-lg">
            <Link to={"/dashboard/account"}>
              <div className=" font-semibold  pl-5 py-5 hover:underline  text-white">Account</div>
            </Link>
            <Link to={"/dashboard/transaction"}>
              <div className="border border-b-slate-800 border-zinc-900	font-semibold pl-5 py-5 hover:underline text-white">
                Transaction History
              </div>
            </Link>
            <div className="font-semibold  bg-purple-800 pl-5 py-5 hover:underline text-white">
              My Event
            </div>
          </div>
        </div>

        <div className="w-[80%] pl-10 pt-10 pr-24 ">
          <div className="">
            <div className="font-bold text-4xl">MY EVENT</div>

            <div className="h-[5px] w-[full] bg-black mt-3"></div>

            <div className="overflow-x-auto shadow-xl">
              <table className="table">
                {/* head */}
                <thead>
                  <tr className="bg-black text-white">
                    <th></th>
                    <th>Event Name</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Address</th>
                    <th></th>
                  </tr>
                </thead>

                {!data.length ? (
                  <div className=" flex justify-center h-10 items-center">No Recent Yet</div>
                ) : (
                  data.map((value, index) => {
                    return (
                      <tbody>
                        <tr>
                          <th>{index + 1}</th>
                          <th>{value.name}</th>
                          <th>Rp. {value.price}</th>
                          <th>{value.date}</th>
                          <th>{value.time}</th>
                          <th>{value.location.location}</th>
                          <th>{value.address}</th>
                          <th>
                            <button className="btn btn-ghost btn-xs bg-black text-white hover:text-black">
                              DELETE
                            </button>
                          </th>
                        </tr>
                      </tbody>
                    );
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

export default MyEvent;
