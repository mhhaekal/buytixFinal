import { Link } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function Create() {
  const inputProductName = useRef();
  const inputImage = useRef();
  // const inputCode = useRef();
  const inputPrice = useRef();
  const inputDetails = useRef();
  const inputDate = useRef();
  const inputTime = useRef();
  const inputLocation = useRef();
  const inputCategory = useRef();
  // const inputDiscount = useRef();
  const inputLocationId = useRef();
  const navigate = useNavigate();
  const [data, setData] = useState([])
  const [image, setImage] = useState([])

  const onSelectImages = (event) => {
    try {
      const files = [...event.target.files]
      files.forEach(value => {
        if (value.size > 1000000 || value.type.split('/')[0] !== 'image') throw { message: `${value.name} Size Too Large / File Must be Image` }
      })

      setImage(files)
    } catch (error) {
      alert(error.message)
    }
  }

  const onSetInput = async () => {
    try {
      const getId = localStorage.getItem("idLogin");
      const inputs = {
        name: inputProductName.current.value,
        price: Number(inputPrice.current.value),
        details: inputDetails.current.value,
        date: inputDate.current.value,
        time: inputTime.current.value,
        seller_id: Number(getId),
        category_id: Number(inputCategory.current.value),
        location_id: Number(inputLocationId.current.value),
        address: inputLocation.current.value
      };
      setData(inputs)
    } catch (error) {
      alert(error.message)
    }
  }

  const onSubmit = async () => {
    try {
      const token = localStorage.getItem("tokenLogin");
      const test = await axios.get(`http://localhost:4000/users/data/${token}`)
      const inputs = {
        name: inputProductName.current.value,
        price: Number(inputPrice.current.value),
        details: inputDetails.current.value,
        date: inputDate.current.value,
        time: inputTime.current.value,
        seller_id: test.data.data.id,
        category_id: Number(inputCategory.current.value),
        location_id: Number(inputLocationId.current.value),
        address: inputLocation.current.value
      };
      const fd = new FormData()
      fd.append('data', JSON.stringify(inputs))
      image.forEach(value => {
        fd.append('images', value)
      })

      if (
        inputs.name === "" ||
        inputs.image === "" ||
        inputs.price === "" ||
        inputs.details === "" ||
        inputs.date === "" ||
        inputs.time === "" ||
        inputs.address === "" ||
        inputs.category_id === "" ||
        inputs.location_id === ""
      ) {
        toast.error("Please Fill All Data!");
      } else {
        await axios.post(`http://localhost:4000/tickets`, fd);
        toast.success('Create Event Success!')
        setTimeout(() => {
          <Link to={'/'}></Link>
        }, 3000)
        if (inputs) return navigate('/create/success')
      }



    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <div className="h-[200px] bg-gradient-to-r from-black to-purple-800">
        <div className="mx-36 py-16 text-6xl font-bold text-white">LETS CREATE AN EVENT!</div>
      </div>

      <div className="mx-36 pt-10">
        <div>
          <div className="text-2xl font-extrabold">Event Details</div>
          <div className="mt-3 mb-10 bg-gradient-to-r from-black to-purple-800 h-[8px]"></div>
        </div>

        <div className="flex gap-5 flex-wrap">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Event Name</span>
            </label>
            <input type="text" ref={inputProductName} className="input input-bordered w-[500px]" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Date</span>
            </label>
            <input type="date" ref={inputDate} className="input input-bordered w-[300px]" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Time</span>
            </label>
            <input type="time" ref={inputTime} className="input input-bordered w-[200px]" />
          </div>
          <div>
            <label className="label">
              <span className="label-text font-bold">Event Category</span>
            </label>
            <select ref={inputCategory} className="select select-bordered">
              <option disabled selected>
                Pick one
              </option>
              <option value="1">Music</option>
              <option value="2">Comedy</option>
              <option value="3">Education</option>
              <option value="4">Racing</option>
              <option value="5">Football</option>
              <option value="6">Basketball</option>
              <option value="7">Tennis</option>
              <option value="8">Badminton</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Venue Address</span>
            </label>
            <input type="text" ref={inputLocation} className="input input-bordered w-[400px]" />
          </div>
          <div>
            <label className="label">
              <span className="label-text font-bold">Location</span>
            </label>
            <select ref={inputLocationId} className="select select-bordered">
              <option disabled selected>
                Pick one
              </option>
              <option value="1">Indonesia</option>
              <option value="2">USA</option>
              <option value="3">Singapore</option>
              <option value="4">Other Countries</option>
            </select>
          </div>
          {/* <div className="form-control">
            <label className="label">
              <span className="label-text font-bold"> Image (file)</span>
            </label>
            <input type="text" ref={inputImage} className="input input-bordered w-[400px]" />
          </div> */}
          <div>
            <label className="label">
              <span className="label-text font-bold">Event Image</span>
            </label>
            <input onChange={(e) => onSelectImages(e)} type="file" multiple="multiple" className=" file-input file-input-bordered w-full max-w-xs" />
          </div>
          <div>
            <div>
              <label className="label">
                <span className="label-text font-bold">Event Description</span>
              </label>
              <textarea
                ref={inputDetails}
                className="w-[620px] textarea textarea-bordered textarea-lg"
                placeholder="tell us about your event!"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-36 pt-10 pb-20">
        <div>
          <div className="text-2xl font-extrabold">Ticket Pricing</div>
          <div className="mt-3 mb-10 bg-gradient-to-r from-black to-purple-800 h-[8px]"></div>
        </div>
        <div className="flex gap-5 items-center">
          <div className="form-control flex">
            <div>
              <label className="label">
                <span className="label-text font-bold">Ticket Price</span>
              </label>
              <input
                type="number"
                min={0}
                ref={inputPrice}
                className="input input-bordered w-[500px]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-32">
          <Link to={"/"}>
            <div className="btn bg-black text-white w-[200px] hover:bg-black">CANCEL</div>
          </Link>
          <div onClick={onSubmit} className="btn w-[200px] btn-primary ml-10 text-white">
            CREATE EVENT
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div>
    <button disabled={selected.size ? false : true} onClick={() => toast.success("Sucessfully Add to Cart")} className="p-2 w-[250px] border bg-black text-white">ADD TO CART</button>
</div> */
}

//belum bisa mencegah create event di submit tapi kosong
