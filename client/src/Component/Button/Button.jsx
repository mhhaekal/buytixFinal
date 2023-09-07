function Button(props) {
    return (
        <>

            <button onClick={props.handleFunction} style={props.handleStyle} className="btn btn-primary">
                {props.text}
            </button>
        </>
    )
}

export default Button