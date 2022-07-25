import axios from "axios";

const url = 'http://localhost:3000/api/book'

export const getAllBooks = async () => {
    try {
        const res = await axios.get(url)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const getOneBookById = async (id) => {
    try {
        const res = await axios.get(url + `${id}`, id)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const createOneBook = async () => {
    try {
        const res = await axios.post(url)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const editOneBookById = async (id) => {
    try {
        const res = await axios.patch(url + `${id}`, id)
        return res.data
    } catch (error) {
        return error.response.data
    }
}
export const deleteOneBookById = async (id) => {
    try {
        const res = await axios.delete(url + `${id}`, id)
        return res.data
    } catch (error) {
        return error.response.data
    }
}