import axios from "axios";
import Footer from "../../Component/Footer/Footer";
import Nav from "../../Component/Nav/Nav";
import CatPageCard from "../Category Page/CatPageCard";
import { useEffect, useState } from "react";
import Checkbox from "../../Component/Checkbox/Checkbox";
import { Link } from "react-router-dom";

function AllEvents() {
    const [backupProducts, setBackupProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedType, setselectedType] = useState([]);
    const [type, setType] = useState([]);
    const [location, setLocation] = useState([]);
    // ini dibuat untuk menampung id
    const [activefilters, setActiveFilters] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState([]);
    const [dataSeller, setDataSeller] = useState([]);

    // const name = "Gelora Bung Karno Stadium, Jakarta, Indonesia";

    const fetchData = async () => {
        try {
            const ticket = await axios.get(`http://localhost:4123/products`);
            const loc = await axios.get(`http://localhost:4123/locations`);
            const type = await axios.get("http://localhost:4123/category");
            const res2 = await axios.get(`http://localhost:4123/user`);
            setBackupProducts(ticket.data);
            setProducts(ticket.data);
            setType(type.data);
            setLocation(loc.data);
            setDataSeller(res2.data);
            console.log(dataSeller);
            // console.log(location);
        } catch (error) {
            console.log(error);
        }
    };

    const productsSeller = backupProducts.map((value) => {
        const seller = dataSeller.find((item) => item.id === value.sellerId);

        return {
            ...value,
            sellerName: seller ? seller.username : "data tidak ditemukan",
        };
    });
    productsSeller.forEach((value) => console.log(value.sellerName));

    // const handleCheckbox = (_typeId) => {
    //   const tempSelectedType = [...selectedType];
    //   // console.log(tempSelectedType)
    //   const tempProducts = [...backupProducts];

    //   if (tempSelectedType.includes(_typeId)) {
    //     tempSelectedType.splice(tempSelectedType.indexOf(_typeId), 1);
    //   } else {
    //     tempSelectedType.push(_typeId);
    //   }

    //   const filtered = tempProducts.filter((value) => {
    //     // console.log(value);
    //     return tempSelectedType.includes(value.category);
    //   });

    //   setselectedType(tempSelectedType);
    //   filtered.length ? setProducts(filtered) : setProducts(tempProducts);
    // };
    const handleChange = (categoryId) => {
        // 1
        console.log(categoryId);
        // setSelectedFilter(e);
        // console.log(e);
        if (activefilters.includes(categoryId)) {
            // []
            // dengan cara ini dapat menghapus sebuah id yang sudah ditampung pada
            // ActiveFilters
            setActiveFilters((prev) => prev.filter((id) => id !== categoryId));
        } else {
            // jika categoriId belum terdapat pada activeFilters maka akan ditambahkan ke variable tsb
            setActiveFilters((prev) => [...prev, categoryId]); // [1]
            // console.log(activefilters);
        }
    };

    const handleChange1 = (locationId) => {
        console.log(locationId);
        // setSelectedFilter(e);
        // console.log(e);
        if (selectedFilter.includes(locationId)) {
            // dengan cara ini dapat menghapus sebuah id yang sudah ditampung pada
            // ActiveFilters
            setSelectedFilter((prev) => prev.filter((id) => id !== locationId));
        } else {
            // jika categoriId belum terdapat pada activeFilters maka akan ditambahkan ke variable tsb
            setSelectedFilter((prev) => [...prev, locationId]);
            // console.log(activefilters);
        }
    };
    let filteredData = products.filter((item) => {
        if (selectedFilter.length && !activefilters.length) {
            return selectedFilter.includes(item.locationId);
        } else if (!selectedFilter.length && activefilters.length) {
            return activefilters.includes(item.category);
        } else {
            return selectedFilter.includes(item.locationId) && activefilters.includes(item.category);
        }
    });

    useEffect(() => {
        fetchData();
        console.log(filteredData);
    }, []);

    if (!products) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Nav />
            <div className="flex">
                <div className="flex-1 ">
                    <div>
                        <div className="mt-20">
                            <div className="">
                                <div className="w-[51%] mx-40 font-bold text-5xl pb-4">ALL EVENTS</div>
                            </div>
                        </div>

                        <div className="flex ml-40 mr-20 mb-10 bg-gradient-to-r from-black to-purple-800 h-[8px]"></div>

                        <div className="flex gap-10 ml-40 mr-20 pb-10">
                            <div className="sticky top-10 h-[70%]">
                                <div className="collapse collapse-plus bg-base-200 mb-5">
                                    <input type="radio" name="my-accordion-3" className="" />
                                    <div className="collapse-title text-xl font-semibold">CATEGORIES</div>
                                    <div className="collapse-content">
                                        {type &&
                                            type.map((value, index) => {
                                                // console.log(value.id);
                                                return (
                                                    <Checkbox
                                                        typeName={value.name}
                                                        typeId={value.id}
                                                        handleFunction={handleChange}
                                                    />
                                                );
                                            })}
                                    </div>
                                </div>
                                <div className="collapse collapse-plus bg-base-200">
                                    <input type="radio" name="my-accordion-3" />
                                    <div className="collapse-title text-xl font-semibold">LOCATION</div>
                                    <div className="collapse-content">
                                        {location &&
                                            location.map((value, index) => {
                                                // console.log(value.id);
                                                return (
                                                    <Checkbox
                                                        typeName={value.name}
                                                        // value={value.id}
                                                        typeId={value.id}
                                                        handleFunction={handleChange1}
                                                    />
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex flex-col gap-5 mb-32 ">
                                {!activefilters.length && !selectedFilter.length ? (
                                    productsSeller.map((value, index) => {
                                        return (
                                            <div key={index}>
                                                <Link to={`/carditem/${value.id}`}>
                                                    <CatPageCard item={value} />
                                                </Link>
                                            </div>
                                        );
                                    })
                                ) : !filteredData.length ? (
                                    // <div className="">

                                    <div className="alert alert-error">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="stroke-current shrink-0 h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span>
                                            Sorry :( Looks like the event that you are looking for is not available
                                        </span>
                                    </div>
                                ) : (
                                    filteredData.map((value, index) => {
                                        return (
                                            <div key={index}>
                                                <Link to={`/carditem/${value.id}`}>
                                                    <CatPageCard item={value} />
                                                </Link>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="  w-[10%] h-[vh] bg-gradient-to-r from-black to-purple-800"></div>
            </div>

            <Footer />
        </div>
    );
}

export default AllEvents;
