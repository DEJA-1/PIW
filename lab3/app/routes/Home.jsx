import { useContext, useState } from "react";
import Book from "../Components/Book";
import { BooksContext } from "../Contexts/BooksContext";

export function meta() {
  return [
    { title: "Mocna Księga" },
    { name: "description", content: "Biblioteka Mocna Księga" },
  ];
}

export default function Home() {
  const genres = ["fantasy", "epic", "novel", "psychological", "dystopian"];
  const context = useContext(BooksContext);
  const bookList = context?.bookList || [];
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");

  const filteredBooks = bookList
    .filter((book) => {
      const matchesText = book.title.toLowerCase().includes(query.toLowerCase()) ||
                         book.author.toLowerCase().includes(query.toLowerCase());
      const matchesGenre = selectedGenre === "all" || book.genre === selectedGenre;
      return matchesText && matchesGenre;
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  const bookListHTML = filteredBooks.map((book) => (
    <Book key={book.id} book={book} />
  ));

  return (
    <main className="list-vertical">
      <h1>Mocna Księga</h1>
      <div className="filters">
        <input
          placeholder="Szukaj po tytule lub autorze"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        
        <select 
          value={selectedGenre} 
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="all">Wszystkie gatunki</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>

        {context?.currentUser && (
          <button 
            className={`my-books-button ${context.showMyBooks ? 'active' : ''}`}
            onClick={() => context.setShowMyBooks(!context.showMyBooks)}
          >
            MOJE
          </button>
        )}
      </div>

      {context?.isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        bookListHTML
      )}
    </main>
  );
}
