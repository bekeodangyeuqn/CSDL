import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify'

import { userContext } from "../../../contexts/userProvider"
import formatDate from '../../../utils/date';
import { getAllBooks } from '../../../axios_api/book'
import { getAllUsers } from '../../../axios_api/user'
import { getOneTransactionById, editOneTransactionById } from '../../../axios_api/transaction'

function Edit() {
    const { user } = useContext(userContext)
    const router = useRouter()
    const { id } = router.query

    const [userId, setUserId] = useState('')
    const [librarianId, setLibrarianId] = useState(user.user_id)
    const [bookIds, setBookIds] = useState([])
    const [transDate, setTransDate] = useState()
    const [expiredDate, setExpiredDate] = useState()
    const [status, setStatus] = useState()
    const [hasPenalty, setHasPenalty] = useState()
    const [penaltyDescription, setPenaltyDescription] = useState('')
    const [users, setUsers] = useState([])
    const [books, setBooks] = useState([])

    useEffect(() => {
        const getDatas = async () => {
            if (!id) {
                return;
            }

            const rs = await getOneTransactionById(id)
            const data = rs.data[0]
            setUserId(data.userId)
            setLibrarianId(data.librarianId)
            setTransDate(Date.parse(data.transDate))
            setExpiredDate(Date.parse(data.expiredDate))
            setStatus(data.status)
            setHasPenalty(data.hasPenalty)
            setPenaltyDescription(data.penaltyDescription === null ? '' : data.penaltyDescription)
            setBookIds(data.bookIds[0] === null ? [] : data.bookIds)

            const usersData = await getAllUsers()
            const booksData = await getAllBooks()
            setUsers(usersData)
            setBooks(booksData.data)
        }
        try {
            getDatas()
        } catch (error) {
            console.log(error)
        }
    }, [id])

    const handleSelectBook = (e) => {
        const id = Number(e.target.value)
        if (!bookIds.some((bookId) => bookId === id)) {
            setBookIds([...bookIds, id])
        }
    }

    const handleClearSelectedBooks = () => {
        setBookIds([])
    }

    const handleCreate = async () => {
        const formattedTransDate = transDate ? formatDate(transDate) : null
        const formattedExpiredDate = expiredDate ? formatDate(expiredDate) : null
        setPenaltyDescription(() => hasPenalty ? penaltyDescription : '')
        const transactionData = { userId, librarianId, bookIds, transDate: formattedTransDate, expiredDate: formattedExpiredDate, status, hasPenalty, penaltyDescription: hasPenalty ? penaltyDescription : '' }

        try {
            const result = await editOneTransactionById(id, transactionData)
            if (result.status === 200) {
                toast.success(result.data)
                router.push('/transaction')
            } else toast.error(result.response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const renderBooksList = () => {
        if (books.length && books[0] != null && bookIds.length && bookIds[0] != null) {
            return bookIds.map((id) => {
                const index = books.findIndex((book) => book.bookId == id)
                return <p key={index}>{books[index].name}</p>
            })
        }
    }

    if (!id) {
        return 'loading...';
    }

    return (
        <div className='container mx-auto'>
            <div className='text-center text-xl bold'>Edit Transaction</div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Transaction Date</label>
                    <DatePicker
                        selected={transDate}
                        onChange={(date) => setTransDate(date)}
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
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Expired Date</label>
                    <DatePicker
                        selected={expiredDate}
                        onChange={(date) => setExpiredDate(date)}
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
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">User</label>
                    <select
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    >
                        <option value={null}>Select User</option>
                        {/* why is user's attributes in camel case automatically ???????????????????????????????????????????????? */}
                        {users.map((u, index) => (
                            <option key={index} value={u.userId}>{`${u.firstName} ${u.lastName}`}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Book</label>
                    <select
                        value='default'
                        onChange={handleSelectBook}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    >
                        <option value='default'>Select book</option>
                        {books.map((b, index) => (
                            <option key={index} value={b.bookId} onClick={() => handleSelectBook(b)}>{b.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    >
                        <option value='ongoing'>On going</option>
                        <option value='complete'>Complete</option>
                        <option value='late'>Late</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Has penalty?</label>
                    <div className='flex space-x-4 h-full' onChange={(e) => setHasPenalty(e.target.value === 'true' ? true : false)}>
                        <label>
                            <input id='has-penalty' name='has-penalty' type="radio" readOnly checked={hasPenalty == true} value={true} />
                            &nbsp;Yes
                        </label>
                        <label>
                            <input id="has-penalty" name='has-penalty' type="radio" readOnly checked={hasPenalty == false} value={false} />
                            &nbsp;No
                        </label>
                    </div>
                </div>
                <div className='col-span-full'>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Penalty Description</label>
                    <input
                        value={penaltyDescription}
                        onChange={(e) => setPenaltyDescription(e.target.value)}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    ></input>
                </div>
                <div className='col-span-full flex flex-col items-center'>
                    <p className='text-sm font-bold'>{`Selected book(s):`}</p>
                    <div className='flex flex-col items-center'>
                        {renderBooksList()}
                        <button className='px-4 py-1 mt-2 rounded-lg bg-gray-300' onClick={handleClearSelectedBooks}>Clear</button>
                    </div>
                </div>
            </div>
            <div className='text-center'>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleCreate}>Submit</button>
            </div>
        </div>
    )
}

export default Edit