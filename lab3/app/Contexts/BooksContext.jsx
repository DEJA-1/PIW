import { createContext, useState } from "react";

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [bookList, setBookList] = useState([
    {
      id: 1,
      title: "Wiedźmin: Ostatnie życzenie",
      author: "Andrzej Sapkowski",
      genre: "fantasy"
    },
    {
      id: 2,
      title: "Pan Tadeusz",
      author: "Adam Mickiewicz",
      genre: "epic"
    },
    {
      id: 3,
      title: "Lalka",
      author: "Bolesław Prus",
      genre: "novel"
    },
    {
      id: 4,
      title: "Zbrodnia i kara",
      author: "Fiodor Dostojewski",
      genre: "psychological"
    },
    {
      id: 5,
      title: "1984",
      author: "George Orwell",
      genre: "dystopian"
    }
  ]);

  const editBook = (id, updatedBook) => {
    setBookList(prev => prev.map(book => 
      book.id === id ? { ...book, ...updatedBook } : book
    ));
  };

  return (
    <BooksContext.Provider value={{ bookList, setBookList, editBook }}>
      {children}
    </BooksContext.Provider>
  );
};
