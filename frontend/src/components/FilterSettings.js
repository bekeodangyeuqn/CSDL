import React from 'react'

const filters = [
    {
        status: 'done',
        bgColor: 'bg-green-500'
    },
    {
        status: 'on going',
        bgColor: 'bg-amber-500'
    },
    {
        status: `i'm lazy`,
        bgColor: 'bg-rose-500'
    }
];

const FilterItem = ({filter}) => {
    return (
        <div className={`flex justify-between py-1 px-2 w-28 rounded-3xl text-gray` + ' ' + filter.bgColor}>
            {filter.status}
            <div className=''>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
            </div>
        </div>
    )
}

function FilterSettings() {
    return (
        <div className='flex'>
            {filters.map((f) => (<FilterItem key={f.status} filter={f}></FilterItem>))}
        </div>
    )
}

export default FilterSettings