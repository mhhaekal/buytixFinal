function CategoryBtn(props) {
    return (
        <div>
            <button className="rounded-full btn bg-black btn-primary h-[50px] w-[250px] text-2xl text-white">{props.item.name}</button>
        </div>
    )

}

export default CategoryBtn