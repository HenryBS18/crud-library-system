const InputLabel = (props) => {
    return (
        <div className="mb-3">
            <label htmlFor={props.id} className="form-label">{props.children}</label>
            <input type={props.type} className="form-control" id={props.id} defaultValue={props.value} required />
        </div>
    )
}

export default InputLabel;