import { createContext, useState, useEffect, useCallback } from "react";
import { collection, query, where, onSnapshot, addDoc, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const BooksContext = createContext();

const useBooksQuery = (showMyBooks) => {
  const booksRef = collection(db, "books");
  return showMyBooks && auth.currentUser
    ? query(booksRef, where("userId", "==", auth.currentUser.uid))
    : booksRef;
};

const useBooksSnapshot = (showMyBooks, setBookList) => {
  useEffect(() => {
    const q = useBooksQuery(showMyBooks);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const books = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBookList(books);
    });

    return () => unsubscribe();
  }, [showMyBooks, auth.currentUser]);
};

export const BooksProvider = ({ children }) => {
  const [bookList, setBookList] = useState([]);
  const [showMyBooks, setShowMyBooks] = useState(false);

  useBooksSnapshot(showMyBooks, setBookList);

  const addBook = useCallback(async (book) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");
      
      await addDoc(collection(db, "books"), {
        ...book,
        userId: user.uid
      });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  }, []);

  const editBook = useCallback(async (id, updatedBook) => {
    try {
      const bookRef = doc(db, "books", id);
      await updateDoc(bookRef, updatedBook);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  }, []);

  const value = {
    bookList,
    addBook,
    editBook,
    showMyBooks,
    setShowMyBooks,
    currentUser: auth.currentUser
  };

  return (
    <BooksContext.Provider value={value}>
      {children}
    </BooksContext.Provider>
  );
};
