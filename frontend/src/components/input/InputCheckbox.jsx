const InputCheckbox = (props) => {
    return (
        <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id={props.id} onChange={props.onChange} />
            <label className="form-check-label" htmlFor={props.id}>{props.children}</label>
        </div>
    );
}

export default InputCheckbox;