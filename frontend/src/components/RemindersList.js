import React from 'react'
import Reminder from './Reminder'

function RemindersList({ reminders }) {
    return (
        <div>
          {reminders.map(reminder => (
                <Reminder key={reminder.id} reminder={reminder} />
            ))}
        </div>

    )
}

export default RemindersList