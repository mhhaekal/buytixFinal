import { useEffect, useState } from "react"
import CategoryBtn from "./CategoryBtn"
import axios from "axios"
import { Link } from "react-router-dom"


function Category() {


    const [category, setCategory] = useState([])

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:4123/category`)
            setCategory(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()

    }, [])


    return (

        <div>


            {/* <div className=" mt-14 mb-10 mx-40 borde font-bold text-5xl pb-4  border-white border-b-purple-800 border-b-8">
                Category
            </div> */}
            <div className=" mt-14 mx-40 borde font-bold text-5xl pb-4">
                Category
            </div>

            <div className=" mx-40 mb-10 bg-gradient-to-r from-black to-purple-800 h-[8px]"></div>

            <div className="flex flex-wrap px-40 justify-between gap-5">
                {category.map((value, index) => {
                    return (
                        <div key={index}>
                            <Link to={`/category?category=${value.id}`}>
                                <CategoryBtn item={value} />
                            </Link>
                        </div>

                    )

                })


                }

            </div>


        </div>
    )


}

export default Category