import InputLabel from "./input/InputLabel";

const AddBook = () => {

    const handleSubmit = (e) => {
        e.preventDefault();

        const title = document.getElementById('inputTitle').value;
        const author = document.getElementById('inputAuthor').value;
        const publisher = document.getElementById('inputPublisher').value;
        const cover = document.getElementById('inputCover').value;
        const quantity = document.getElementById('inputQuantity').value;

        addBook(title, author, publisher, cover, quantity);
    }

    const addBook = async (title, author, publisher, cover, quantity) => {
        const query = new URLSearchParams();

        query.append('title', title);
        query.append('author', author);
        query.append('publisher', publisher);
        query.append('cover', cover);
        query.append('availableQuantity', quantity);

        const result = await fetch(`${process.env.REACT_APP_API_URL}/books/add?${query.toString()}`, {
            method: 'POST'
        }).then(res => res.json());

        alert(result.message);
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <form onSubmit={handleSubmit}>
                            <InputLabel type='text' id='inputTitle'>Title</InputLabel>
                            <InputLabel type='text' id='inputAuthor'>Author</InputLabel>
                            <InputLabel type='text' id='inputCover'>Cover</InputLabel>
                            <InputLabel type='text' id='inputPublisher'>Publisher</InputLabel>
                            <InputLabel type='number' id='inputQuantity'>Quantity</InputLabel>
                            <button type="submit" className="btn btn-primary col-12">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddBook;