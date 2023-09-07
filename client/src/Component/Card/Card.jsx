function Card(props) {
    return (
        <div className="">
            <div className="card w-60 h-[450px] bg-base-100 shadow-xl hover:scale-105 ease-in duration-200">
                <div className=" h-[500px] flex flex-col">
                    <figure className="border rounded-t-xl object-cover h-[100px]">
                        <img src={props.item.image} alt="Event Picture" />
                    </figure>

                    <div className="card-body">
                        <div className="h-[auto] bg-black-700 ">
                            <div className="h-[90px]">
                                <h2 className="card-title font-bold">{props.item.productName}</h2>
                            </div>
                            <div className=" bg-gradient-to-r from-black to-purple-800 h-[8px]"></div>
                            <p className="text-sm pt-2 font-bold">
                                {props.item.date} | {props.item.time}
                            </p>
                            <p className="text-sm pt-2  h-[70px]">{props.item.location} </p>
                            <p className="text-l pt-2 font-bold text-purple-800">by {props.item.sellerName}</p>
                            <div className=" pt-5 card-actions justify-start">
                                <button className="btn btn-outline btn-primary btn-block text-white ">
                                    See More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
