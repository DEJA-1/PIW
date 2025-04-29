import { useContext, useMemo } from "react";
import { useNavigate } from "react-router";
import { BooksContext } from "../Contexts/BooksContext";

export default function Book({ book }) {
  const navigate = useNavigate();
  const { editBook, currentUser } = useContext(BooksContext);
  
  const isOwner = useMemo(() => 
    currentUser && book.userId === currentUser.uid,
    [currentUser, book.userId]
  );

  const handleEdit = () => {
    navigate(`/edit/${book.id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Czy na pewno chcesz usunąć tę książkę?")) {
      await editBook(book.id, { deleted: true });
    }
  };

  return (
    <article className="list-horizontal">
      <div className="book-info">
        <div className="book-details">
          <h3>{book.title}</h3>
          <p className="author">{book.author}</p>
          <p className="genre-text">{book.genre}</p>
        </div>
        {isOwner && (
          <div className="book-actions">
            <button className="action-button edit-button" onClick={handleEdit}>
              Edytuj
            </button>
            <button className="action-button delete-button" onClick={handleDelete}>
              Usuń
            </button>
          </div>
        )}
      </div>
    </article>
  );
} 