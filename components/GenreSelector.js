import React, { useState, useEffect } from 'react'

import { getAllGenres, createOneGenre } from '../axios_api/genre'

function GenreSelector({ genreIds, setGenreIds }) {
    const [selected, setSelected] = useState([])
    const [genres, setGenres] = useState()
    const [input, setInput] = useState('')
    const [hidden, setHidden] = useState(true)
    const [needReRender, setNeedReRender] = useState(false)

    useEffect(() => {
        const getGenres = async () => {
            const genresData = await getAllGenres()
            setGenres(genresData)
        }
        try {
            getGenres()
        } catch (error) {
            console.log(error)
        }
    }, [needReRender, genreIds])

    useEffect(() => {
        if (genreIds) {
            const list = genreIds.reduce((list, id) => {
                const index = genres.findIndex((genre) => genre.genreId === id)
                return [...list, genres[index]]
            }, [])
            setSelected(list)
        }
    }, [genreIds])

    const handleSelect = (genre) => {
        if (!selected.some(item => item.name === genre.name)) {
            setSelected([...selected, genre])
            setGenreIds([...genreIds, genre.genreId])
        }
    }

    const handleClear = () => {
        setSelected([])
        setGenreIds([])
    }

    const handleCreate = () => {
        const createGenre = async () => {
            const result = await createOneGenre({
                name: input
            })
        }
        try {
            createGenre()
            setInput('')
            setNeedReRender(!needReRender)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='relative bg-white '>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Genre</label>
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

                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onFocus={() => setHidden(false)}
                    placeholder='Genre'
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " required />
            </div>

            {
                !hidden &&
                <div className='absolute w-full bg-gray-100  rounded-sm'>
                    <div className='bg-white flex justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                        </svg>
                    </div>

                    {input &&
                        <div
                            onClick={() => handleCreate()}
                            className='flex items-center bg-white border border-gray-300 text-gray-900 text-sm rounded-sm w-full p-1.5 cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Create this new genre: &nbsp;
                            <span className='font-bold'>{input}</span>
                        </div>}
                    {genres && genres.map((genre, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelect(genre)}
                            onFocus={() => setHidden(false)}
                            className='text-sm w-full p-1 cursor-pointer border-b'
                        >{genre.name}</div>
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

export default GenreSelector