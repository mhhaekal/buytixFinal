import { Link } from "react-router-dom"
import Nav from "../../Component/Nav/Nav"
import Footer from "../../Component/Footer/Footer"
import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"


const Account = () => {
    const [users, setUser] = useState([])

    const search = useLocation().search;
    const id = new URLSearchParams(search).get("category")
    console.log(id)
    const fetchData = async () => {
        const token = localStorage.getItem('tokenLogin')
        try {
            const users = await axios.get(`http://localhost:4000/users/data/${token}`)
            console.log(users);
            setUser(users.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()

    }, [])
    return (
        <div>
            <Nav />
            <div className="flex h-[500px]">
                <div className="w-[20%] bg-zinc-900 border-r-black">
                    <div className=" flex flex-col text-lg">
                        <div className=" font-semibold  pl-5 py-5 hover:underline bg-purple-800 text-white">
                            Account
                        </div>
                        <Link to={'/dashboard/transaction'}>
                            <div className="border border-b-slate-800 border-zinc-900 font-semibold pl-5 py-5 hover:underline text-white">
                                Transaction History
                            </div>
                        </Link>
                        <Link to={'/dashboard/myevent'}>
                            <div className="font-semibold pl-5 py-5 hover:underline text-white">
                                My Event
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="w-[80%] pl-10 pt-10 pr-24 ">

                    <div className="">

                        <div className="font-bold text-4xl">
                            ACCOUNT
                        </div>

                        <div className="h-[5px] w-[full] bg-black mt-3">

                        </div>



                        <div className="flex flex-col gap-5 py-10 w-[500px]">
                            <div className="flex justify-between border border-white border-b-gray-600 pb-5">
                                <div className="font-semibold text-zinc-500">Username</div>
                                <div className="font-semibold text-black">{users.username}</div>
                            </div>

                            <div className="flex justify-between border border-white border-b-gray-600 pb-5">
                                <div className="font-semibold text-zinc-500">Email</div>
                                <div className="font-semibold text-black">{users.email}</div>
                            </div>

                            <div className="flex justify-between">
                                <div className="font-semibold text-zinc-500">Point</div>
                                <div className="font-semibold text-black">{users.point}</div>
                            </div>
                        </div>



                    </div>

                </div>
            </div>

            <Footer />
        </div>

    )
}

export default Account