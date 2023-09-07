import Nav2 from "../../Component/Nav/Nav2"
import Category from "../../Component/Category/Category"
import Event from "../../Component/Event/Event"
import Footer from "../../Component/Footer/Footer"

function LandingV2() {

    return (
        <div>
            <Nav2 />
            <div className="h-[400px] bg-gradient-to-r from-black to-purple-800">
                <div className="flex flex-col justify-center w-[auto] h-[400px] gap-10 text-white">
                    <div className="flex justify-center text-7xl">Discover. Connect. <div className="flex justify-end font-extrabold"> Buy<div className="text-black">tix</div>.</div></div>

                    <div className=" flex justify-center h-[60px] text-black">
                        <input type="text" placeholder="your journey starts here." className=" input input-bordered rounded-full w-[500px] h-[60px] text-xl" />
                    </div>
                </div>

            </div>

            <div className="h-auto mb-20">

                <Category />
                <Event />


            </div>


            <Footer />

        </div>
    )

}

export default LandingV2