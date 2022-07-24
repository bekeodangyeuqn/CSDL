import React, { useEffect, useState } from "react";

export default function BookItem({ book }) {
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

  return (
    <tr>
      <td className="p-2 text-center border-r">{bookId}</td>
      <td className="p-2 text-center w-14 h-14 border-r">
        <img src="https://cf.shopee.vn/file/7413a5737b1f8867950437c69921ad67"></img>
      </td>
      <td className="p-2 text-center border-r">{name}</td>
      <td className="p-2 text-center border-r">
        {renderGenre()}
      </td>
      <td className="p-2 text-center border-r">
        {renderAuthor()}
      </td>
      <td className="p-2 text-center border-r">{publisher.name}</td>
      <td className="p-2 text-center border-r">{importDate}</td>
      <td className="p-2 text-center border-r">{publishDate}</td>
      <td className="p-2 text-center border-r">{borrowedTimes}</td>
      <td className="p-2 text-center border-r">{quantity}</td>
      <td className="p-2 text-center flex flex-col space-y-1">
        <button className="px-2 py-1 mr-2 rounded bg-green-500 w-20">
          Edit
        </button>
        <button className="px-2 py-1 rounded bg-red-400 w-20">
          Delete
        </button>
      </td>
    </tr>
  )
}

