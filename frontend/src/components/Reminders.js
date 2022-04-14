import React from 'react'

import FilterSettings from './FilterSettings'
import Counter from './Counter'
import RemindersList from './RemindersList'
import Divider from './Divider'

const reminders = [
  {
      id: 0,
      title: 'do dishing',
      description: 'do it before mom comes home',
      deadline: '',
      place: 'home',
      status: 0,
      priority: 0
  },
  {
      id: 1,
      title: 'make the bed',
      description: 'do it before mom comes home',
      deadline: '',
      place: 'home',
      status: 0,
      priority: 0
  },
  {
      id: 2,
      title: 'feed the cat',
      description: 'do it before mom comes home',
      deadline: '',
      place: 'home',
      status: 0,
      priority: 0
  },
]

function Reminders() {
  return (
    <div className='flex flex-col'>
        {/* <Counter /> */}
        <FilterSettings />
        {/* <Divider /> */}
        <RemindersList reminders={reminders}/>
    </div>
  )
}

export default Reminders