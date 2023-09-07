
function CatPageCard(props) {

    return (
        <div>

            <div className="card border pl-6 p-3 shadow-lg">
                <div className="flex justify-between">
                    <div className="w-[20%]">
                        <div className="font-bold text-lg" >{props.item.date}</div>
                        <div className="font-bold text-gray-400">{props.item.time}</div>
                    </div>

                    <div className="w-[70%]">
                        <div className="font-bold text-lg">{props.item.productName}</div>
                        <div className="font-bold text-gray-400">{props.item.location}</div>
                    </div>
                    <div className="rounded-2xl btn bg-black btn-primary h-[50px] w-[15%] text-white">BUY</div>
                </div>
            </div>

        </div>
    )
}


export default CatPageCard