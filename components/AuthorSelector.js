import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import { getAllAuthors, createOneAuthor, deleteOneAuthorById } from '../axios_api/author'

function AuthorSelector({ authorIds, setAuthorIds }) {
    const [selected, setSelected] = useState([])
    const [authors, setAuthors] = useState()
    const [name, setName] = useState('')
    const [nationality, setNationality] = useState('')
    const [hidden, setHidden] = useState(true)
    const [needReRender, setNeedReRender] = useState(false)

    const getAuthors = async () => {
        const authorsData = await getAllAuthors()
        setAuthors(authorsData)
    }

    useEffect(() => {
        try {
            getAuthors()
        } catch (error) {
            console.log(error)
        }
    }, [needReRender, authorIds])

    useEffect(() => {
        if (authorIds.length && authorIds[0] !== null && authors.length && authors[0] !== null) {
            const list = authorIds.reduce((list, id) => {
                const index = authors.findIndex((author) => author.authorId === id)
                return [...list, authors[index]]
            }, [])
            setSelected(list)
        }
    }, [authorIds])

    const handleSelect = (author) => {
        if (!selected.some(item => item.name === author.name)) {
            setSelected([...selected, author])
            setAuthorIds([...authorIds, author.authorId])
        }
    }

    const handleClear = () => {
        setSelected([])
        setAuthorIds([])
    }

    const handleDelete = async (id) => {
        try {
            const result = await deleteOneAuthorById(id)
            if (result.status == 200) {
                toast.success(result.data)
                setSelected([])
                setAuthors([])
                getAuthors()
            } else console.log(result.response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCreate = () => {
        const createAuthor = async () => {
            const result = createOneAuthor({
                name: name,
                nationality: nationality
            })
        }
        try {
            createAuthor()
            setName('')
            setNationality('')
            setNeedReRender('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='relative bg-white '>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Author</label>
            <div className='w-full flex flex-wrap'>
                <div className='flex'>
                    {selected.length > 0 &&
                        <>
                            {selected.map((item, index) => (
                                <div key={index} className='px-2 mx-1 my-1 text-sm bg-gray-200 rounded-xl'>{item.name}</div>
                            ))}
                            <button className="px-2 mx-1 my-1 text-sm rounded-xl bg-orange-400" onClick={() => handleClear()}>
                                Clear
                            </button>
                        </>
                    }
                </div>

                <div className='flex space-x-1 w-full'>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setHidden(false)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-3/5 p-2.5" required placeholder='Name' />
                    <input
                        type="text"
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                        onFocus={() => setHidden(false)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-2/5 p-2.5 " required placeholder='Nationality' />
                </div>
            </div>

            {
                !hidden &&
                <div className='absolute w-full bg-gray-100  rounded-sm'>
                    <div className='bg-white flex justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                        </svg>
                    </div>

                    {name &&
                        <div
                            onClick={() => handleCreate()}
                            className='flex items-center bg-white border border-gray-300 text-gray-900 text-sm rounded-sm w-full p-1.5 cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Create this new author: &nbsp;
                            <span className='font-bold'>{name}&nbsp;</span>
                            <span className='font-bold'>{nationality ? ` - ${nationality}` : ''}</span>
                        </div>}
                    {authors && authors.map((author, index) => (
                        <div
                            key={index}
                            onFocus={() => setHidden(false)}
                            className='text-sm w-full p-1 cursor-pointer border-b flex justify-between'
                        >
                            <div onClick={() => handleSelect(author)}>{author.name}</div>
                            <div onClick={() => handleDelete(author.authorId)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                        </div>
                    ))}
                    <div className='bg-white flex justify-center'>
                        <button className="px-2 mx-1 my-1 text-sm rounded-xl bg-gray-400" onClick={() => setHidden(true)}>
                            Close
                        </button>
                    </div>
                </div>
            }

        </div>
    )
}

export default AuthorSelector