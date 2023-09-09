import axios from "axios"
import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Nav from "../../Component/Nav/Nav";
import Footer from "../../Component/Footer/Footer"


export default function CardPage() {
    const [products, setProduct] = useState(null);
    const [dataSeller, setDataSeller] = useState([]);
    const { id } = useParams();
    const [selected, setSelected] = useState({})
    const qty = useRef()

    const onFetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/tickets/detail/${id}`);
            const res2 = await axios.get(`http://localhost:4000/users/user`);
            console.log(res);
            // const totalStock = res.data.stocks.reduce((a, b) => {
            //     return a + b
            // })

            // setSelected({ ...selected, stockSize: totalStock })
            setProduct(res.data.data);
            setDataSeller(res2.data.data);

        } catch (error) { }
    };
    const getSellerName = dataSeller.filter((value) => value.id === products.seller_id)
    useEffect(() => {
        onFetchData();
        // console.log(getSellerName[0].username)
    }, []);






    return (

        <div>
            {
                !products ? null : (
                    <div>

                        <Nav />


                        <div>
                            <img className="h-[500px] w-full object-fit pb-10 px-64 py-10" src={products.image} alt="" />
                        </div>



                        <div className="px-64 pb-10">
                            <div>
                                <div className="text-7xl font-bold text-black mb-5">{products.name}</div>

                                <div className=" mb-10 bg-gradient-to-r from-black to-purple-800 h-[8px]">
                                </div>
                            </div>

                            <div className="flex justify-between gap-20 text-justify h-[500px] mb-20">

                                <div className="flex-1">
                                    <div className="text-3xl font-semibold text-purple-800 pb-5">Description</div>
                                    <div>{products.details}</div>
                                </div>


                                <div className="w-[300px] flex flex-col gap-5 ">
                                    <div className="">

                                        <div className="text-3xl font-semibold text-purple-800 pb-5 ">Where and When</div>
                                        <div>
                                            <div className="font-semibold">Date and Time</div>
                                            <div>{products.date} | {products.time}</div>
                                        </div>
                                        <div>
                                            <div className="font-semibold pt-5">Location</div>
                                            <div>{products.address}</div>
                                        </div>
                                    </div>


                                    <div className=" font-semibold text-purple-800 pb-5"> by {getSellerName[0].username}</div>

                                    <div className=" ">
                                        <Link to={`/buy/${id}`}>
                                            <button className="btn btn-primary w-[300px]">Buy Now</button>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <Footer />

                    </div>
                )
            }

        </div >
    )
}