import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';

import formatDate from '../../../utils/date';

import PublisherSelector from '../../../components/PublisherSelector';
import GenreSelector from '../../../components/GenreSelector';
import AuthorSelector from '../../../components/AuthorSelector';
import { getOneBookById, editOneBookById } from '../../../axios_api/book';

function Edit() {
    const [name, setName] = useState('')
    const [publisherId, setPublisherId] = useState(null)
    const [publishDate, setPublishDate] = useState()
    const [importDate, setImportDate] = useState(new Date())
    const [quantity, setQuantity] = useState(0)
    const [genreIds, setGenreIds] = useState([])
    const [authorIds, setAuthorIds] = useState([])

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        const getBookData = async () => {
            if (!id) {
                return;
            }

            const rs = await getOneBookById(id)
            const data = rs.data[0]
            console.log(data.genresList, data.authorsList)
            const genresIdsList = []
            const authorsIdList = []
            if(data.genresList.length && data.genresList[0] !== null) {
                genresIdsList = rs.data[0].genresList.reduce((list, curr) => {
                    list = [...list, curr.genre_id]
                    return list
                }, [])
            }
            if(data.authorsList.length && data.authorsList[0] !== null) {
                authorsIdList = rs.data[0].authorsList.reduce((list, curr) => {
                    list = [...list, curr.author_id]
                    return list
                }, [])
            }
            setName(rs.data[0].name)
            setPublisherId(rs.data[0].publisher.publisher_id)
            setPublishDate(Date.parse(rs.data[0].publishDate))
            setImportDate(Date.parse(rs.data[0].importDate))
            setQuantity(rs.data[0].quantity)
            setGenreIds(genresIdsList)
            setAuthorIds(authorsIdList)
        }
        try {
            getBookData();
        } catch (e) {
            console.log(e)
        }
    }, [id])

    const handleEdit = async () => {

        try {
            const formattedPublishDate = publishDate ? formatDate(publishDate) : null;
            const formattedImportDate = importDate ? formatDate(importDate) : null;
            const bookData = {
                name,
                publisherId,
                publishDate: formattedPublishDate,
                importDate: formattedImportDate,
                quantity,
                genreIds,
                authorIds
            }
            const result = await editOneBookById(id, bookData)
            if (result.status === 200) {
                toast.success(`Update book ${id} successfully!`)
                router.push('/book')
            } else {
                toast.error(`Update book ${id} failed!`)
            }
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    if (!id) {
        return 'loading...';
    }

    return (
        <div className='container mx-auto'>
            <div className='text-center text-xl bold'>Edit Book</div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className='col-span-full'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                        value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <PublisherSelector publisherId={publisherId} setPublisherId={setPublisherId}></PublisherSelector>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Publish date</label>
                    <DatePicker
                        selected={publishDate}
                        onChange={(date) => setPublishDate(date)}
                        dateFromat='YYYY-MM-dd'
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        placeholder="Date of birth"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Import date</label>
                    <DatePicker
                        selected={importDate}
                        onChange={(date) => setImportDate(date)}
                        dateFromat='YYYY-MM-dd'
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        placeholder="Date of birth"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Quantity</label>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                        value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div>
                    <GenreSelector genreIds={genreIds} setGenreIds={setGenreIds} />
                </div>
                <div>
                    <AuthorSelector authorIds={authorIds} setAuthorIds={setAuthorIds} />
                </div>
            </div>
            <div className='text-center'>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleEdit}>Submit</button>
            </div>
        </div>
    )
}

export default Edit