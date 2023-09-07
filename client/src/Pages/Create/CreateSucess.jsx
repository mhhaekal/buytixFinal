import { Link } from "react-router-dom"


function CreateSuccess() {
    return (
        <div className="h-screen">
            <div className=" bg-gradient-to-r from-black to-purple-800 w-[auto]">
                <div className="mx-36 py-16 text-6xl font-bold text-white">LETS CREATE AN EVENT!</div>
            </div>

            <div className="bg-white h-auto">

                <div className="mx-36 my-5 mb-[100px]">
                    <div className="mb-20">
                        <div className="mt-20 alert alert-success text-xl font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Thank you. Your event has been successfully created!</span>
                        </div>
                    </div>

                    <div className=" text-center font-medium text-lg leading-loose">Congratulations, event creator! Your event is now a reality. Time to turn your vision into an unforgettable experience! <br /> Don't Forget to share it with all of your friends and family! <br />

                        <div className="text-purple-800 font-extrabold">Goodluck!</div></div>


                    <div className="flex justify-center mt-20 mb-[50px]">
                        <div>
                            <Link to={'/'}>
                                <button className=" btn bg-black hover:bg-black text-white w-[300px] font-bold">BACK TO MENU</button>
                            </Link>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default CreateSuccess