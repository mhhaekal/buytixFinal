import Nav from "../../Component/Nav/Nav"
import Category from "../../Component/Category/Category"
import Event from "../../Component/Event/Event"
import Footer from "../../Component/Footer/Footer"


function Landing() {

    return (
        <div>

            <Nav />
            <div className="h-[400px] bg-gradient-to-r from-black to-purple-800">
                <div className="flex flex-col justify-center w-[auto] h-[400px] gap-4 pr-40 text-white text-8xl">
                    <div className="flex justify-end">Discover. Connect.</div>
                    <div className="flex justify-end font-extrabold">Buy<div className="text-black">tix</div>.</div>
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

export default Landing