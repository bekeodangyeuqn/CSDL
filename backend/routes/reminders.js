const express = require('express');
const router = express.Router();
const { getReminders, getOneReminder, postReminder, updateOneReminder, deleteOneReminder } = require('../model/reminderModel')

router.get('/', async (req, res) => {
    try {
        const result = await getReminders();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await getOneReminder(id);
        res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.post('/', async (req, res) => {
    const saveReminder = req.body;
    try {
        const result = await postReminder(saveReminder);
        res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.patch('/:id', async (req, res) => {
    // const id = req.params.id; //KHONG CAN THIET VI DA CO ID TRONG OBJECT
    const saveReminder = req.body;
    try {
        const result = await updateOneReminder(saveReminder);
        res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await deleteOneReminder(id);
        res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;