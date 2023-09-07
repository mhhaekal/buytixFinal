import Nav from "../../Component/Nav/Nav"
import CatPageCard from "./CatPageCard"
import Footer from "../../Component/Footer/Footer"
import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useParams, useSearchParams } from "react-router-dom"
import { Link } from "react-router-dom"




function CatPage() {

    const [product, setProduct] = useState([])
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const { idProduct } = useParams();

    const search = useLocation().search;
    const id = new URLSearchParams(search).get("category")
    // const idProduct = new URLSearchParams(search).get("products")
    console.log(id)


    const fetchData = async () => {
        try {
            const ticket = await axios.get(`http://localhost:4123/products?category=${id}`)
            console.log(ticket.data);
            setProducts(ticket.data)

        } catch (error) {
            console.log(error);
        }
    }

    const fetchCatName = async () => {
        try {
            const catName = await axios.get(`http://localhost:4123/category/${id}`)
            console.log(catName.data.name)
            setCategory(catName.data.name.toUpperCase())
        } catch (error) {

        }

    }

    const onFetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:4123/products/${id}`);
            console.log(res.data.id);
            setProduct(res.data);
        } catch (error) { }
    };


    useEffect(() => {
        onFetchData()
        fetchData()
        fetchCatName()

    }, [])


    return (
        <div>
            {
                !products ? null : (
                    <div>
                        <Nav />

                        <div className="flex">
                            <div className=" flex-1 h-[1000px] ">

                                <div className="mt-20">

                                    <div className="flex">
                                        <div className="w-[51%] mx-40 font-bold text-5xl pb-4">
                                            {category}
                                        </div>
                                    </div>


                                    <div className=" ml-40 mr-20 mb-10 bg-gradient-to-r from-black to-purple-800 h-[8px]"></div>
                                </div>

                                <div className="ml-40 mr-20 flex flex-col gap-5">
                                    {
                                        products.map((value, index) => {
                                            return (
                                                <div key={index}>
                                                    <Link to={`/carditem/${value.id}`}>
                                                        <CatPageCard item={value} />
                                                    </Link>
                                                </div>
                                            )
                                        })
                                    }
                                </div>


                            </div>
                            <div className="w-[25%] h-[vh] bg-gradient-to-r from-black to-purple-800">


                            </div>
                        </div>

                        <Footer />
                    </div>
                )
            }



        </div >

    )
}

export default CatPage