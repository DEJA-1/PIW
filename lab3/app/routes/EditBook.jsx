import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BooksContext } from "../Contexts/BooksContext";

export function meta() {
  return [
    { title: "Edytuj książkę - Mocna Księga" },
    { name: "description", content: "Edytuj książkę w bibliotece" },
  ];
}

export default function EditBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { bookList, editBook, currentUser } = useContext(BooksContext);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "fantasy"
  });

  const genres = ["fantasy", "epic", "novel", "psychological", "dystopian"];

  useEffect(() => {
    const book = bookList.find(b => b.id === id);
    if (!book) {
      navigate("/");
      return;
    }
    if (book.userId !== currentUser?.uid) {
      navigate("/");
      return;
    }
    setFormData({
      title: book.title,
      author: book.author,
      genre: book.genre
    });
  }, [id, bookList, currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editBook(id, formData);
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="list-vertical">
      <h1>Edytuj książkę</h1>
      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-group">
          <label htmlFor="title">Tytuł:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Autor:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Gatunek:</label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          >
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        <button type="submit">Zapisz zmiany</button>
      </form>
    </main>
  );
} 