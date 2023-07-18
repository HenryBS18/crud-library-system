const InputDate = (props) => {

    const minDate = () => {
        const today = new Date();
        const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

        const year = tomorrow.getFullYear();
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const day = String(tomorrow.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const maxDate = () => {
        const today = new Date();
        const maxDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // Adding 7 days (7 * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)

        const year = maxDate.getFullYear();
        const month = String(maxDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const day = String(maxDate.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    return (
        <div className="mb-3">
            <label htmlFor={props.id} className="form-label">{props.children}</label>
            <input type={'date'} className="form-control" id={props.id}
                onKeyDown={(e) => e.preventDefault()}
                min={minDate()}
                max={maxDate()}
                required />
        </div>
    );
}

export default InputDate;