export default function Book({book}) {

    const handleEdit = () => {

    };

    const handleDelete = () => {

    };

    return (
        <article className="list-horizontal">
            <div className="book-info">
                <div className="book-details">
                    <h3>{book.title}</h3>
                    <p className="author">{book.author}</p>
                    <p className="genre-text">{book.genre}</p>
                </div>
                <div className="book-actions">
                    <button className="action-button edit-button" onClick={handleEdit}>
                        Edytuj
                    </button>
                    <button className="action-button delete-button" onClick={handleDelete}>
                        Usuń
                    </button>
                </div>
            </div>
        </article>
    );
} 