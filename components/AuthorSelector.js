import React, { useState, useEffect } from 'react'

import { getAllAuthors, createOneAuthor } from '../axios_api/author'

function AuthorSelector({ authorIds, setAuthorIds }) {
    const [selected, setSelected] = useState([])
    const [authors, setAuthors] = useState()
    const [name, setName] = useState('')
    const [nationality, setNationality] = useState('')
    const [hidden, setHidden] = useState(true)
    const [needReRender, setNeedReRender] = useState(false)

    useEffect(() => {
        const getAuthors = async () => {
            const authorsData = await getAllAuthors()
            setAuthors(authorsData)
        }
        try {
            getAuthors()
        } catch (error) {
            console.log(error)
        }
    },[needReRender, authorIds])

    useEffect(() => {
        if (authorIds) {
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-3/5 p-2.5" required placeholder='Name'/>
                    <input
                        type="text"
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                        onFocus={() => setHidden(false)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-2/5 p-2.5 " required placeholder='Nationality'/>
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
                            onClick={() => handleSelect(author)}
                            onFocus={() => setHidden(false)}
                            className='text-sm w-full p-1 cursor-pointer border-b'
                        >{author.name}</div>
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