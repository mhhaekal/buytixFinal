// import { Link } from "react-router-dom"
import { useState } from "react"
import Button from "../../Component/Button/Button"

function Home() {

    const [number, setNumber] = useState(0)

    const onChangeNumber = (operator) => {

        if (operator === "-") {
            setNumber(number - 1)
        } else {
            setNumber(number + 1)
        }
    }


    return (

        <>
            < h1 >
                Ini Home Page
            </h1 >
            <div>
                {number}
            </div>

            {/* <Button text='Button Home' /> */}
            <Button text='-' handleFunction={() => onChangeNumber("-")} handleStyle={{ color: 'red' }} />
            <Button text='+' handleFunction={() => onChangeNumber("+")} handleStyle={{ color: 'blue' }} />

            <div>

            </div>

        </>
    )
}

export default Home