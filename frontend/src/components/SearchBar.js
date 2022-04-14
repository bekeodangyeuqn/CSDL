import React from 'react'

function SearchBar() {
  return (
    <div>
        <input className='p-1 w-50 border border-sky-500 placeholder:italic placeholder:text-slate-400 focus:outline-0 hover:ring-1 focus:ring' placeholder='Looking for reminders'></input>
    </div>
  )
}

export default SearchBar