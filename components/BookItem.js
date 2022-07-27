import React, { useContext } from "react";
import { useRouter } from "next/router";
import { toast } from 'react-toastify'

import { deleteOneBookById } from '../axios_api/book'
import { userContext } from '../contexts/userProvider'
import formatDate from "../utils/date";

export default function BookItem({ book, trigger, setTrigger }) {
  const { user } = useContext(userContext)

  const router = useRouter();
  const {
    bookId,
    name,
    publisher,
    publishDate,
    importDate,
    quantity,
    imgUrls,
    borrowedTimes,
    genresList,
    authorsList
  } = book

  const renderGenre = () => {
    const genreString = genresList[0] ? genresList.reduce((string, curr) => string + ` ${curr.name}, `, '') : ''
    return genreString.slice(0, genreString.lastIndexOf(","))
  }

  const renderAuthor = () => {
    const authorString = authorsList[0] !== null ? authorsList.reduce((string, curr) => string + ` ${curr.name}, `, '') : ''
    return authorString.slice(0, authorString.lastIndexOf(","))
  }

  const handleEdit = () => {
    router.push(`book/${bookId}/edit`)
  }

  const handleDelete = async () => {
    try {
      const result = await deleteOneBookById(bookId)
      console.log(result)
      if (result.status === 200) {
        toast.success(result.data)
        setTrigger(!trigger)
      }
      else toast.error(result.response.data)
    } catch (error) {
      console.log(error)
      toast.error(result)
    }
  }

  return (
    <tr>
      <td className="p-2 text-center border">{bookId}</td>
      <td className="p-2 text-center w-14 h-14 border">
        <img src="https://cf.shopee.vn/file/7413a5737b1f8867950437c69921ad67"></img>
      </td>
      <td className="p-2 text-center border">{name}</td>
      <td className="p-2 text-center border">
        {renderGenre()}
      </td>
      <td className="p-2 text-center border">
        {renderAuthor()}
      </td>
      <td className="p-2 text-center border">{publisher.name}</td>
      <td className="p-2 text-center border">{formatDate(publishDate)}</td>
      <td className="p-2 text-center border">{formatDate(importDate)}</td>
      <td className="p-2 text-center border">{borrowedTimes}</td>
      <td className="p-2 text-center border">{quantity}</td>
      {
        (user && (user.role === 'librarian' || user.role === 'admin')) &&
        <td className="p-2 text-center border flex flex-col space-y-1 items-center">
          <button className="px-2 py-1 rounded bg-green-500 w-20" onClick={handleEdit}>
            Edit
          </button>
          <button className="px-2 py-1 rounded bg-red-400 w-20" onClick={handleDelete}>
            Delete
          </button>
        </td>
      }

    </tr>
  )
}

