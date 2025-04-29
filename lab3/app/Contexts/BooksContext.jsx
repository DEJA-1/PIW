import { createContext, useState, useEffect, useCallback, useMemo } from "react";
import { collection, query, where, onSnapshot, addDoc, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const BooksContext = createContext();

const useBooksQuery = (showMyBooks) => {
  const booksRef = collection(db, "books");
  let q = query(booksRef, where("deleted", "!=", true));
  
  if (showMyBooks && auth.currentUser) {
    q = query(booksRef, 
      where("userId", "==", auth.currentUser.uid),
      where("deleted", "!=", true)
    );
  }
  
  return q;
};

export const BooksProvider = ({ children }) => {
  const [bookList, setBookList] = useState([]);
  const [showMyBooks, setShowMyBooks] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const q = useBooksQuery(showMyBooks);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const books = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBookList(books);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [showMyBooks, currentUser]);

  const addBook = useCallback(async (book) => {
    try {
      if (!currentUser) throw new Error("User not authenticated");
      
      await addDoc(collection(db, "books"), {
        ...book,
        userId: currentUser.uid,
        deleted: false
      });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  }, [currentUser]);

  const editBook = useCallback(async (id, updatedBook) => {
    try {
      const bookRef = doc(db, "books", id);
      await updateDoc(bookRef, updatedBook);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  }, []);

  const value = useMemo(() => ({
    bookList,
    addBook,
    editBook,
    showMyBooks,
    setShowMyBooks,
    currentUser,
    isLoading
  }), [bookList, addBook, editBook, showMyBooks, currentUser, isLoading]);

  return (
    <BooksContext.Provider value={value}>
      {children}
    </BooksContext.Provider>
  );
};
