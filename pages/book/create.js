import React, { useState } from 'react'
import { useRouter } from 'next/router';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import formatDate from '../../utils/date';

import PublisherSelector from '../../components/PublisherSelector';
import GenreSelector from '../../components/GenreSelector';
import AuthorSelector from '../../components/AuthorSelector';
import { createOneBook } from '../../axios_api/book';

function Create() {
    const [name, setName] = useState('')
    const [publisherId, setPublisherId] = useState(null)
    const [formattedPublishDate, setFormattedPublishDate] = useState()
    const [formattedImportDate, setFormattedImportDate] = useState(new Date())
    const [quantity, setQuantity] = useState(0)
    const [genreIds, setGenreIds] = useState([])
    const [authorIds, setAuthorIds] = useState([])

    const [error, setError] = useState()

    const router = useRouter();

    const handleCreate = async () => {


        try {
            const publishDate = publishDate ? formatDate(formattedPublishDate) : null;
            const importDate = formatDate(formattedImportDate);
            const bookData = {
                name,
                publisherId,
                publishDate,
                importDate,
                quantity,
                genreIds,
                authorIds
            }

            
            const result = await createOneBook(bookData)
            if (result != 'Something went wrong, try again!') router.push('/book')
        } catch (error) {
            setError(error)
        }
    }

    return (
        <div className='container mx-auto'>
            <div className='text-center text-xl bold' onClick={() => {
                const formatedPublishDate = formatDate(publishDate);
                const formatedImportDate = formatDate(importDate);
                const bookData = {
                    name,
                    publisherId,
                    formatedPublishDate,
                    formatedImportDate,
                    quantity,
                    genreIds,
                    authorIds
                }
                console.log(bookData)
            }}>Create New Book</div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className='col-span-full'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <PublisherSelector setPublisherId={setPublisherId}></PublisherSelector>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Publish date</label>
                    <DatePicker
                        dateFormat="yyyy/MM/dd"
                        selected={formattedPublishDate}
                        onChange={(date) => setFormattedPublishDate(date)}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Import date</label>
                    <DatePicker
                        dateFormat="yyyy/MM/dd"
                        selected={formattedImportDate}
                        onChange={(date) => setFormattedImportDate(date)}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Quantity</label>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                        onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div>
                    <GenreSelector genreIds={genreIds} setGenreIds={setGenreIds} />
                </div>
                <div>
                    <AuthorSelector authorIds={authorIds} setAuthorIds={setAuthorIds} />
                </div>
            </div>
            <div className='text-center'>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleCreate}>Submit</button>
            </div>
        </div>
    )
}

export default Create