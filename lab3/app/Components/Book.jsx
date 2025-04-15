export default function Book({ book }) {
  return (
    <article className="list-horizontal">
      <div className="book-info">
        <div className="book-details">
          <h3>{book.title}</h3>
          <p className="author">{book.author}</p>
          <p className="genre-text">{book.genre}</p>
        </div>
      </div>
    </article>
  );
} 