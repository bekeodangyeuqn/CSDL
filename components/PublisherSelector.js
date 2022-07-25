import React, {useState, useEffect} from 'react'

import {getAllPublishers} from '../axios_api/publisher'

function PublisherSelector( { setPublisherId } ) {
    const [selected, setSelected] = useState()
    const [publishers, setPublishers] = useState()

    useEffect(() => {
        const getPublisher = async () => {
            const publishersData = await getAllPublishers()
            setPublishers(publishersData)
        }
        try {
            getPublisher()
        } catch (error) {
            console.log(error)
        }
    }, [])

    const handleChange = (e) => {
        setSelected(e.target.value)
        setPublisherId(Number(e.target.value))
    }

    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Publisher</label>
            <select
            value={selected}
            onChange={handleChange}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                <option value={null}>Choose a publisher</option>
                {publishers && publishers.map((p, index) => (
                    <option key={index} value={p.publisherId}>{p.name}</option>
                ))}
            </select>
        </div>
    )
}

export default PublisherSelector