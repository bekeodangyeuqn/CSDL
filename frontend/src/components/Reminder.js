import React from 'react'

function Reminder({ reminder }) {
    return (
        <div className='flex flex-col my-2 p-2 w-full rounded-md bg-slate-100'>
            <div className='flex justify-between'>
                <div className='group relative flex-grow'>
                    <p className='text-xl font-semibold'>{reminder.title}</p>
                    {/* <p className='hidden group-hover:block absolute w-full border-slate-800 bg-slate-100'>{reminder.description}</p> */}
                </div>
                <div className='flex'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className='flex flex-col'>
                <p>Priority: <span className='font-medium'>{reminder.priority}</span></p>
                <div className='flex'>
                    <p className='mr-2'>Place: <span className='font-medium'>{reminder.place}</span></p>
                    <p>Deadline: <span className='font-medium'>{reminder.deadline || 'none'}</span></p>
                </div>
            </div>
        </div>
    )
}

export default Reminder