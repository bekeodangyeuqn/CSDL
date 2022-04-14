import React from 'react'


function AddButton() {
    return (
        <div className='p-1 inline-block bg-sky-400 text-white hover:bg-sky-600 text-lg'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
        </div>
    )
}

export default AddButton