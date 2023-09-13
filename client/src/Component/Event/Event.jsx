import { useEffect, useState } from "react";
import Card from "../Card/Card";
import Skeleton from "../Skeleton/Skeleton";
import axios from "axios";
import { Link } from "react-router-dom";

function Event() {
    const [products, SetProducts] = useState([]);
    const [dataSeller, setDataSeller] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/tickets/alldetail`);
            // const response = await axios.get(`http://localhost:4000/tickets/all`);
            // const res2 = await axios.get(`http://localhost:4000/users/user`);
            // console.log(response.data)
            SetProducts(response.data.data.slice(0, 8));
            // setDataSeller(res2.data.data);
            // console.log(res2)
            // console.log(dataSeller)
        } catch (error) {
            console.log(error);
        }
    };
    // const productsSeller = products.map((value) => {
    //     const seller = dataSeller.find((item) => item.id === value.id);
    //     return {
    //         // console.log(seller)
    //         ...value,
    //         sellerName: seller ? seller.username : "unknown",
    //     };
    // });
    console.log(products)
    useEffect(() => {
        // console.log(getSellerName)
        fetchData();
    }, []);

    if (!products) {
        return (
            <div>
                <Skeleton />
            </div>
        );
    }

    return (
        <div className="mt-10">
            <div className="flex justify-between">
                <div className=" mt-16 mx-40 font-bold text-5xl pb-4">Event</div>

            </div>

            <div className=" mx-40 mb-10 bg-gradient-to-r from-black to-purple-800 h-[8px]"></div>

            <div className="flex flex-wrap justify-between mx-40 gap-10">
                {products.map((value, index) => {
                    return (
                        <div key={index}>
                            <Link to={`./carditem/${value.id}`}>
                                <Card item={value} />
                            </Link>
                        </div>
                    );
                })}
            </div>

            <div className="mt-20 flex justify-center">
                <Link to={"/allevents"}>
                    <button className="mx-40 btn w-[300px] font-extrabold">SHOW MORE EVENTS!</button>
                </Link>
            </div>
        </div>
    );
}

export default Event;
