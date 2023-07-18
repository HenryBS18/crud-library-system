const InputSelectOptions = (props) => {
    return (
        <div className="mb-3">
            <label htmlFor={props.id} className="form-label">{props.children}</label>
            <select className="form-select" id={props.id}>
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
                <option value="admin">Admin</option>
            </select>
        </div>
    )
}

export default InputSelectOptions;