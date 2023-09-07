import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function BuySuccess() {
  const { id } = useParams();
  const [products, setProduct] = useState(null);
  const [dataSeller, setDataSeller] = useState([]);
  const onFetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:4123/products/${id}`);
      const res2 = await axios.get(`http://localhost:4123/user`);
      console.log(res);
      setProduct(res.data);
      setDataSeller(res2.data);
    } catch (error) {
      console.log(error);
    }
  };
  let referalCode = "";
  for (let i = 0; i < 5; i++) {
    let calculate = Math.floor(Math.random() * 9) + 1;
    referalCode += calculate;
  }
  const getSellerName = dataSeller.filter((value) => value.id === products.sellerId);
  const onSaveReferalCode = async () => {
    const getId = localStorage.getItem("idLogin");
    try {
      const res = await axios.post(`http://localhost:4123/referalcode`, {
        userId: Number(getId),
        code: referalCode,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onFetchData();
  }, []);

  return (
    <div>
      {!products ? null : (
        <div className="flex min-h-screen">
          <div className="w-[80%]">
            <div className="mx-36 mt-10 mb-[100px]">
              <div>
                <div className=" text-6xl font-bold pb-5">{products.productName} </div>

                <div className="flex gap-1 font-bold mb-3">
                  <div className="text-gray-500">{products.date} |</div>
                  <div className="text-gray-500">{products.time} |</div>
                  <div className="text-gray-500">{products.location} |</div>
                  <div className="text-purple-800">by {getSellerName[0].username}</div>
                </div>

                <div className=" mb-10 bg-gradient-to-r from-black to-purple-800 h-[8px]"></div>
              </div>

              <div className="alert alert-success text-xl font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Thank you. Your purchase has been confirmed!</span>
              </div>

              <div className="py-10">
                <div className="flex justify-center text-xl py-3 font-bold">
                  REFERRAL CODE: {referalCode}
                </div>

                <div className="flex justify-center text-center">
                  You can earn 100 points for every friend you refer to Buytix. They will get 10%
                  off for their first purchase! Points can be redeem to available discounts{" "}
                </div>
              </div>

              <div className="flex justify-center">
                <div>
                  <Link to={"/"}>
                    <button
                      onClick={onSaveReferalCode}
                      className="mt-10 btn bg-black hover:bg-black text-white w-[300px] font-bold"
                    >
                      BACK TO MENU
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[40%] bg-gradient-to-r from-black to-purple-800"></div>
        </div>
      )}
    </div>
  );
}

export default BuySuccess;
