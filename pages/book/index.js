import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";

import { getAllBooks } from '../../axios_api/book'
import { userContext } from '../../contexts/userProvider'

import BookSeachbar from "../../components/BookSeachbar";
import BookItem from "../../components/BookItem";


function Book() {
  const { user } = useContext(userContext)

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
      <div className="flex justify-between mb-2">
        <p className="text-xl font-extrabold">Books</p>
        <div className="flex justify-center ">
          <BookSeachbar></BookSeachbar>
        </div>
        {
          (user && (user.role != 'librarian' || user.role != 'admin')) ?
            <div></div>
            :
            <Link href='book/create'>
              <button className="px-2 py-1 rounded bg-sky-400 w-20">
                Create
              </button>
            </Link>
        }
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border">ID</th>
            <th className="border">Image</th>
            <th className="border">Book name</th>
            <th className="border">Genre</th>
            <th className="border">Author</th>
            <th className="border">Publisher</th>
            <th className="border">Publish date</th>
            <th className="border">Import date</th>
            <th className="border">Borrowed times</th>
            <th className="border">Amount</th>
            {
              (user && (user.role === 'librarian' || user.role === 'admin')) &&
              <th className="border"></th>
            }
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
