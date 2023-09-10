import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"

export default function Buy() {
  const [products, setProduct] = useState(null);
  const [dataSeller, setDataSeller] = useState([]);
  const { id } = useParams();
  const inputFirstName = useRef();
  const inputLastName = useRef();
  const inputEmail = useRef();
  const inputPhoneNumber = useRef();
  const inputRefCode = useRef();
  const navigate = useNavigate();
  const [discount, setDiscount] = useState(null);
  const [price, setPrice] = useState(null);
  const [isbutton, setIsButton] = useState(false);
  const [point, setPoint] = useState(null);
  // const inputPriceTotal = useRef();


  const onFetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/tickets/detail/${id}`);
      const res2 = await axios.get(`http://localhost:4000/users/user`);
      console.log(res);
      setProduct(res.data.data);
      setDataSeller(res2.data.data);
    } catch (error) { }
  };
  const getSellerName = dataSeller.filter((value) => value.id === products.seller_id);
  const onCheckRef = async () => {
    const getId = localStorage.getItem("idLogin");
    console.log(getId);
    try {
      if (!inputRefCode.current.value) return toast.error("Please type the referral code");
      //   const getReferal = awat axios.get()
      const getPrice = await axios.get(`http://localhost:4000/tickets/detail/${id}`);
      const checkRef = await axios.get(`http://localhost:4000/tickets/reff?code=${inputRefCode.current.value}`);
      console.log(checkRef.data.data)
      //   console.log(checkRef.data[0].userId);
      if (checkRef.data.data) {
        const userReferalId = checkRef.data.data.user_id;
        if (userReferalId === Number(getId)) {
          //   console.log("lu curang goblok");
          return toast.error("You cannot use your own refferal code, please try again");
        } else {
          const fixPrice = (10 / 100) * getPrice.data.data.price;
          setDiscount(fixPrice);
          // const getUser = await axios.get(`http://localhost:4000/users/userid/${userReferalId}`);
          // const point = getUser.data.data.point;
          // setPoint(point);
          await axios.patch(`http://localhost:4000/users/userid/${userReferalId}`);
          setIsButton(true);
          return toast.success(`Congratulation! you get 10% discount`);

        }
      } else if (!checkRef.data.data) {
        // console.log(">>>>");
        return toast.error("Refferal code not found, please try again")

      }
    } catch (error) {
      console.log(error);
    }
  };

  const onBuyEventWithPoint = async () => {
    const getId = localStorage.getItem("idLogin");
    try {
      const refid = await axios.post('http://localhost:4000/tickets/refid', { code: Number(inputRefCode.current.value) })
      const inputs = {
        first_name: inputFirstName.current.value,
        last_name: inputLastName.current.value,
        email: inputEmail.current.value,
        phone_number: inputPhoneNumber.current.value,
        referral_code_id: refid.data.data.id,
        ticket_id: Number(id),
        user_id: localStorage.getItem("idLogin")
      };
      if (
        inputs.first_name === "" ||
        inputs.last_name === "" ||
        inputs.email === "" ||
        inputs.phone_number === ""
      ) {
        toast.error("Please fill all the data!");
      } else {
        await axios.post(`http://localhost:4000/tickets/buy`, { ...inputs });
        // const res = await axios.get(`http://localhost:4123/user/${getId}`);
        // const getSellerName = await axios.post('http://localhost:4000/users/userid', { id: res.data.data.seller_id })
        const res = await axios.post('http://localhost:4000/users/userid', { id: getId })
        if (res.data.point === 0) {
          return toast.error("You don't have enough points");
        } else {
          await axios.patch(`http://localhost:4000/users/buypoint`, { id: getId });
        }
        console.log(inputs);
        if (inputs) return navigate(`/buy/success/${id}`);
      }
    } catch (error) { }
  };

  const onPrice = async () => {
    try {
      const checkRef = await axios.get(`http://localhost:4000/tickets/detail/${id}`);
      console.log(checkRef.data.data.price);
      setPrice(checkRef.data.data.price);
    } catch (error) { }
  };

  const onBuyEvent = async () => {
    try {
      console.log("lalala")
      // console.log(Number(inputRefCode.current.value))

      const refid = await axios.post('http://localhost:4000/tickets/refid', { code: Number(inputRefCode.current.value) })
      console.log(refid)

      const inputs = {
        first_name: inputFirstName.current.value,
        last_name: inputLastName.current.value,
        email: inputEmail.current.value,
        phone_number: inputPhoneNumber.current.value,
        referral_code_id: refid.data.data.id,
        ticket_id: Number(id),
        user_id: localStorage.getItem("idLogin")
      };
      if (
        inputs.first_name === "" ||
        inputs.last_name === "" ||
        inputs.email === "" ||
        inputs.phone_number === ""
      ) {
        toast.error("Please fill all the data!");
      } else {
        await axios.post(`http://localhost:4000/tickets/buy`, { ...inputs });
        console.log(inputs);
        if (inputs) return navigate(`/buy/success/${id}`);
      }

      // toast.success('Create Event Success!')
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    onPrice();
    console.log(discount);
    onFetchData();
  }, [discount]);

  return (
    <div>
      <Toaster />
      {!products ? null : (
        <div className="flex h-screen">
          <div className="w-[70%]">
            <div className="mx-36 mt-10 mb-[50px]">
              <div>
                <div className=" w-[700px] text-6xl font-bold pb-5">{products.name} </div>

                <div className="flex gap-1 font-bold mb-3">
                  <div className="text-gray-500">{products.date} |</div>
                  <div className="text-gray-500">{products.time} |</div>
                  <div className="text-gray-500">{products.address} |</div>
                  <div className="text-purple-800">by {getSellerName[0].username}</div>
                </div>

                <div className=" mb-10 bg-gradient-to-r from-black to-purple-800 h-[8px]"></div>
              </div>

              <div>
                <div className="pb-3 mt-12 font-bold text-2xl">Contact Information</div>

                <div className="w-[auto] flex flex-wrap gap-5 ">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">First Name</span>
                    </label>
                    <input
                      type="text"
                      ref={inputFirstName}
                      className="input input-bordered w-[300px]"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Last Name</span>
                    </label>
                    <input
                      type="text"
                      ref={inputLastName}
                      className="input input-bordered w-[300px]"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Email</span>
                    </label>
                    <input
                      type="text"
                      ref={inputEmail}
                      className="input input-bordered w-[300px]"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Phone Number</span>
                    </label>
                    <input
                      type="text"
                      ref={inputPhoneNumber}
                      className="input input-bordered w-[300px]"
                    />
                  </div>
                  <div className="form-control flex flex-row gap-5">
                    <div>
                      <label className="label">
                        <span className="label-text font-bold">Referral Code</span>
                      </label>
                      <input
                        type="text"
                        ref={inputRefCode}
                        className="input input-bordered w-[300px]"
                      />
                    </div>
                    {!isbutton ? (
                      <button onClick={onCheckRef} className="mt-9 btn w-44 font-bold">
                        SUBMIT
                      </button>
                    ) : (
                      <button className="mt-9 btn w-44 font-bold">SUBMIT</button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-5 mt-16">
                <Link to={`/carditem/${id}`}>
                  <div>
                    <button className=" btn bg-black hover:bg-black text-white w-[225px] font-bold">
                      CANCEL
                    </button>
                  </div>
                </Link>
                <div>
                  <button onClick={onBuyEvent} className="btn btn-primary w-[225px] font-bold">
                    BUY
                  </button>
                </div>
                <div>
                  <button
                    onClick={onBuyEventWithPoint}
                    className=" btn btn-green w-[225px] font-bold"
                  >
                    BUY with POINT
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[40%] bg-gradient-to-r from-black to-purple-800">
            <div className="text-white text-xl font-medium px-10 flex flex-col gap-5 justify-end h-full pb-[220px]">
              <div className="flex justify-end text-3xl font-extrabold">Order Summary</div>
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <div>Price</div>
                </div>
                <div>Rp. {price.toLocaleString()}</div>
              </div>

              <div className="flex justify-between">
                <div>Discount</div>
                {discount ? <div>- Rp. {discount.toLocaleString()}</div> : <div>Rp. 0</div>}
              </div>

              <div className="h-2 bg-white"></div>

              <div className="flex justify-between font-extrabold">
                <div>TOTAL</div>
                <div>Rp. {(price - discount).toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
