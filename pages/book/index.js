import React, { useState, useEffect } from "react";
import Link from "next/link";

import { getAllBooks } from '../../axios_api/book'

import BookSeachbar from "../../components/BookSeachbar";
import BookItem from "../../components/BookItem";


function Book() {

  const [books, setBooks] = useState([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const getBooks = async () => {
      const result = await getAllBooks()
      console.log(result.data)
      setBooks(result.data);
    }

    try {
      getBooks()
    } catch (error) {
      console.log(error)
    }
  }, [trigger])

  return (
    <div className="px-8">
      <div className="flex justify-between">
        <p className="text-xl font-extrabold">Books</p>
        <div className="flex justify-center ">
          <BookSeachbar></BookSeachbar>
        </div>
        <Link href='book/create'>
          <button className="px-2 py-1 rounded bg-sky-400 w-20">
            Create
          </button>
        </Link>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Book name</th>
            <th>Genre</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Publish date</th>
            <th>Import date</th>
            <th>Borrowed times</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <BookItem book={book} key={book.bookId} trigger={trigger} setTrigger={setTrigger}></BookItem>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Book;
