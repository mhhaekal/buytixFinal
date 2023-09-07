import React, { useState } from 'react'
import Input from '../Component/Input'
import { Button } from 'flowbite-react'
import axios from 'axios'

const CreateEvent = (props) => {

    const [input, setInput] = useState(
        {
            nama_event: "",
            date: "",
            time: "",
            biaya: 0,
            image_link: "",
            max_peserta: 0,
            deskripsi_singkat: "",
            deskripsi_detail: "",
            discount: 0,
            email_pembuat_acara: props.pengguna,
            detail_lokasi: "",
            kota: "",
            jenis_event: "",
            kategori_event: "",
            jenis_event: "",
            userId: localStorage.getItem("userId")
        }
    )

    const onCreate = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`http://localhost:3004/events`, { ...input })
            alert(`Selamat Event Telah Berhasil Didaftar`)
            setInput({
                nama_event: "",
                date: "",
                time: "",
                biaya: 0,
                image_link: "",
                max_peserta: 0,
                deskripsi_singkat: "",
                deskripsi_detail: "",
                discount: 0,
                email_pembuat_acara: props.pengguna,
                detail_lokasi: "",
                kota: "",
                jenis_event: "",
                kategori_event: "",
                jenis_event: ""
            })

        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        const newInput = { ...input }
        newInput[e.target.name] = e.target.value
        setInput(newInput)
    }

    // console.log(input);
    return (
        <div className=''>
            <div className='border md:px-40 flex flex-col py-10'>
                <span className='text-4xl m-auto font-bold justify-center items-center align-middle'>Create Your Event </span>
                <form action="" className='rounded-lg shadow-gray-500 py-10 px-16 grid md:grid-cols-2 gap-3' >
                    <Input onChange={handleChange} value={input.nama_event} type="text" name="nama_event" placeholder="" >Nama Event</Input>
                    <Input onChange={handleChange} value={input.image_link} type="text" name="image_link" placeholder="" >Image Link</Input>
                    <Input onChange={handleChange} value={input.detail_lokasi} name="detail_lokasi" type="text" placeholder="" >Detail Lokasi</Input>
                    <Input onChange={handleChange} value={input.deskripsi_singkat} type="text" name="deskripsi_singkat" placeholder="" >Deskripsi Singkat</Input>
                    <Input onChange={handleChange} value={input.date} type="date" name="date" placeholder="" >Tangga Acara</Input>
                    <Input onChange={handleChange} value={input.time} type="time" name="time" placeholder="" >Time</Input>
                    <Input onChange={handleChange} value={input.biaya} type="number" name="biaya" placeholder="" >Biaya</Input>
                    <Input onChange={handleChange} value={input.max_peserta} type="number" name="max_peserta" placeholder="" >Maxsimum Peserta</Input>
                    <Input onChange={handleChange} value={input.discount} type="number" name="discount" placeholder="" >Discount</Input>

                    <select required onChange={handleChange} name="kategori_event" className='mb-6 text-sm border rounded w-full text-slate-700 placeholder:opacity-50'>
                        <option >Kategori Event</option>
                        <option value="anime">Anime</option>
                        <option value="seni">Seni</option>
                        <option value="olahraga">Olahraga</option>
                        <option value="komedi">Komedi</option>
                        <option value="edukasi">Edukasi</option>
                    </select>

                    <select required onChange={handleChange} name="kota" className='mb-6 text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder:opacity-50'>
                        <option >Pilih Kota</option>
                        <option value="jakarta">Jakarta</option>
                        <option value="bogor">Bogor</option>
                        <option value="tangerang">Tangerang</option>
                        <option value="bekasi">Bekasi</option>
                    </select>

                    <select required onChange={handleChange} name="jenis_event" className='mb-6 text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder:opacity-50'>
                        <option >Online / Ofline</option>
                        <option value="online">Online</option>
                        <option value="ofline">Ofline</option>
                    </select>

                    <textarea onChange={handleChange} value={input.deskripsi_detail} name="deskripsi_detail" placeholder="deskripsi detail" className="h-40">Deskripsi Detail</textarea>
                    <Button onClick={onCreate}>Submit</Button>
                </form>
            </div>
        </div>
    )
}

export default CreateEvent