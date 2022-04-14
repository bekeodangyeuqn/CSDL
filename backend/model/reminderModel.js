const pool = require('./poolConnector');

const getReminders = async () => {
    try {
        const result = await pool.query('SELECT * FROM public.reminders ORDER BY "reminderId" ASC');
        return result.rows;
    } catch (error) {
        console.log(error);
    }
}

const getOneReminder = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM public.reminders WHERE "reminderId" = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
    }
}

const postReminder = async (reminder) => {
    try {
        const result = await pool.query('INSERT INTO reminders (title, description, deadline, place, status, priority) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [reminder.title, reminder.description, reminder.deadline, reminder.place, reminder.status, reminder.priority]);
        return result;
    } catch (error) {
        console.log(error);
    }
}

const updateOneReminder = async (reminder) => {
    try {
        const result = await pool.query('UPDATE reminders SET title = $1, description = $2, deadline = $3, place = $4, status = $5, priority = $6 WHERE "reminderId" = $7 RETURNING *', [reminder.title, reminder.description, reminder.deadline, reminder.place, reminder.status, reminder.priority, reminder.reminderId]);
        return result.rows;
    } catch (error) {
        console.log(error);
    }
}

const deleteOneReminder = async (id) => {
    try {
        const result = await pool.query('DELETE FROM public.reminders WHERE "reminderId" = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getReminders, getOneReminder, updateOneReminder, postReminder, deleteOneReminder }