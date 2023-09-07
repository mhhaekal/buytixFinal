import axios from "axios"
import { useEffect, useState } from "react";

function Data() {


    const [data, setData] = useState([])
    const [dataToEdit, setDataToEdit] = useState(null)

    const onFetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:4123/product1`)
            console.log(response.data);
            setData(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        onFetchData()
    }, [])


    return (
        <div>

            <h1>NETWORK CALL & CRUD</h1>


            {
                data.map((value, index) => {

                    return (
                        <div key={index}>
                            {
                                dataToEdit?.id === value.id ?
                                    <input type="text" onChange={(e) => setDataToEdit({ ...dataToEdit, name: e.target.value })} value={dataToEdit?.name} />
                                    :
                                    <span style={{ marginRight: '30px' }}>
                                        {value.id}. {value.name}
                                    </span>}
                            <button onClick={() => setDataToEdit({ id: value.id, name: value.name })}>
                                {dataToEdit?.id === value.id ? 'Save' : 'Edit'}
                            </button>

                        </div>



                    )
                })
            }
        </div>
    )
}

export default Data