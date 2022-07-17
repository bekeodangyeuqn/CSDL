import React from 'react'

function Seachbar() {
    return (
        <div className='flex space-x-2 items-center'>
            <div className='relative mr-6'>
                <div className='absolute top-2 left-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input className='pl-10 pr-2 py-2 rounded hover:outline-none  hover:ring-1 hover:ring-sky-400  focus:outline-none focus:ring-1 focus:ring-sky-400'></input>
            </div>
            <div className='flex items-center'>
                <label htmlFor="search-by" className="block mr-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-400">Search by</label>
                <select id="search-by" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:outline-none
                 hover:border-sky-500 focus:outline-none
                focus:ring-sky-400 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-sky-400">
                    <option defaultValue value="bookName">Book&apos;s name</option>
                    <option value="name">User&apos;s name</option>
                    <option value="userId">User ID</option>
                    <option value="bookId">Book ID</option>
                    <option value="name">Librarian ID</option>
                    <option value="transactionDate">Transaction Date</option>
                    <option value="expiredDate">Expired Date</option>
                </select>
            </div>
        </div>

    )
}

export default Seachbar