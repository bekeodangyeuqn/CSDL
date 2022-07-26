import { Router, useRouter } from 'next/router';
import React, { useState } from 'react'
import Modal from "react-modal";
import { toast } from 'react-toastify';

import formatDate from '../utils/date';
import { editOneTransactionById, deleteOneTransactionById } from '../axios_api/transaction'

Modal.setAppElement("#__next");

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        minWidth: "300px",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};
function TransactionItem({ transaction, trigger, setTrigger }) {
    const [modalIsOpen, setIsOpen] = useState(false);

    const router = useRouter()

    const {
        transactionId, transDate, expiredDate, status, hasPenalty, penaltyDescription, user, librarian, bookList
    } = transaction

    const toggleModal = () => {
        setIsOpen(!modalIsOpen)
    }

    const handleComplete = async () => {
        const bookIds = []
        if (bookList.length && bookList[0] !== null) {
            bookIds = transaction.bookList.reduce((list, curr) => {
                list = [...list, curr.book_id]
                return list
            }, [])
        }

        const transactionData = {
                userId: transaction.user.user_id,
                librarianId: transaction.librarian.librarian_id,
                transDate: transaction.transDate,
                expiredDate: transaction.expiredDate,
                status: 'complete',
                hasPenalty: transaction.hasPenalty,
                penaltyDescription: transaction.penaltyDescription,
                bookIds: bookIds
            }
        console.log(transactionData)
        try {
            const result = await editOneTransactionById(transactionId, transactionData)
            if (result.status === 200) {
                toast.success(result.data)
                setTrigger(!trigger)
            }
            else toast.error(result.response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        try {
            const result = await deleteOneTransactionById(transactionId)
            if (result.status === 200) {
                toast.success(result.data)
                setTrigger(!trigger)
            }
            else toast.error(result.response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const renderStatus = () => {
        switch (status) {
            case 'ongoing':
                return <span className="text-yellow-500">On going</span>
            case 'complete':
                return <span className="text-green-500">Complete</span>
            case 'late':
                return <span className="text-orange-500">Late</span>
            default:
                return null
        }
    }

    const rende = () => {
        bookList.length && bookList[0] !== null ? bookList.map((book, index) => (
            <p key={index}>{book.name}</p>
        )) : ''
    }

    if (!transaction) {
        return 'loading...';
    }

    return (
        <>
            <Modal isOpen={modalIsOpen} style={customStyles}>
                <div>
                    <div className="flex justify-between">
                        <p className="font-bold">Book list</p>
                        <button
                            className="px-2 py-1 mr-2 rounded bg-sky-500 w-20"
                            onClick={() => toggleModal()}
                        >
                            Close
                        </button>
                    </div>
                    <div>
                        {bookList.length && bookList[0] !== null ? bookList.map((book, index) => (
                            <p key={index}>{book.name}</p>
                        )) : ''}
                    </div>
                </div>
            </Modal>
            <tr>
                <td className="text-center border">{transactionId}</td>
                <td className="text-center border">{`${user.first_name} ${user.last_name}`}</td>
                <td className="text-center border">{`${librarian.first_name} ${librarian.last_name}`}</td>
                <td className="text-center border">{formatDate(transDate)}</td>
                <td className="text-center border">{formatDate(expiredDate)}</td>
                {/* on going: 'ongoing', late: 'late', complete: 'complete' */}
                <td className="text-center border">
                    {renderStatus()}
                </td>
                <td className="text-center border">{hasPenalty ? 'Yes' : 'No'}</td>
                <td className="text-center border">{penaltyDescription}</td>
                <td className="text-center border w-1/4">
                    <button
                        className="px-2 py-1 mr-1 rounded bg-sky-500 w-24"
                        onClick={toggleModal}
                    >
                        More info
                    </button>
                    {
                        status === 'ongoing' &&
                        <button className="px-2 py-1 mr-1 rounded bg-teal-500 w-24" onClick={handleComplete}>
                            Complete
                        </button>
                    }
                    <button className="px-2 py-1 mr-1 rounded bg-green-500 w-24" onClick={() => router.push(`/transaction/${transactionId}/edit`)}>
                        Edit
                    </button>
                    <button className="px-2 py-1 rounded bg-red-400 w-24" onClick={handleDelete}>
                        Delete
                    </button>
                </td>
            </tr>
        </>

    )
}

export default TransactionItem