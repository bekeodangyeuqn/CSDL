import axios from "axios";

const url = 'http://localhost:3000/api/transaction'

export const getAllTransactions = async () => {
    return await axios.get(url)
}

export const getOneTransactionById = async (id) => {
    return await axios.get(url + `/${id}`, id)
}

export const createOneTransaction = async (transaction) => {
    return await axios.post(url, transaction)
}

export const editOneTransactionById = async (id, transaction) => {
    return await axios.patch(url + `/${id}`, transaction)
}
export const deleteOneTransactionById = async (id) => {
    return await axios.delete(url + `/${id}`, id)
}