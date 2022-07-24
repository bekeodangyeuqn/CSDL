import axios from "axios";

const url = 'http://localhost:3000/api/transaction'

export const getAllTransactions = async () => {
    try {
        const res = await axios.get(url)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const getOneTransactionById = async (id) => {
    try {
        const res = await axios.get(url + `${id}`, id)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const createOneTransaction = async () => {
    try {
        const res = await axios.post(url)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const editOneTransactionById = async (id) => {
    try {
        const res = await axios.patch(url + `${id}`, id)
        return res.data
    } catch (error) {
        return error.response.data
    }
}
export const deleteOneTransactionById = async (id) => {
    try {
        const res = await axios.delete(url + `${id}`, id)
        return res.data
    } catch (error) {
        return error.response.data
    }
}