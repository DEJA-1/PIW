import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { BooksContext } from "../Contexts/BooksContext";

export function meta() {
  return [
    { title: "Dodaj książkę - Mocna Księga" },
    { name: "description", content: "Dodaj nową książkę do biblioteki" },
  ];
}

export default function NewBook() {
  const navigate = useNavigate();
  const { setBookList } = useContext(BooksContext);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "fantasy"
  });

  const genres = ["fantasy", "epic", "novel", "psychological", "dystopian"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      id: Date.now(),
      ...formData
    };
    
    setBookList(prev => [...prev, newBook]);
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
      <h1>Dodaj nową książkę</h1>
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

        <button type="submit">Dodaj książkę</button>
      </form>
    </main>
  );
} 