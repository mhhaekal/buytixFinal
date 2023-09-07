import { Link } from "react-router-dom"

function Nav2() {
    return (
        <div>
            <div className="navbar bg-black gap-2 px-40 h-[50px]">

                <Link to={"/"}>
                    <div className=" navbar-start mr-5">
                        <img src={require("./LogoBlack.png")} className=" h-[50px] w-[220px]" />
                    </div>
                </Link>

                <div className="navbar-end flex-1 flex gap-3">

                    <div className="btn btn-ghost bg-black text-white">Location</div>
                    <div className="btn btn-ghost bg-black text-white">Create Event</div>
                    <div className="btn btn-ghost bg-black text-white">Username</div>
                </div>

            </div>

        </div>
    )

}

export default Nav2