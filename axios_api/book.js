import axios from "axios";

const url = 'http://localhost:3000/api/book'

export const getAllBooks = async () => {
    try {
        const res = await axios.get(url)
        return res
    } catch (error) {
        return error
    }
}

export const getOneBookById = async (id) => {
    try {
        const res = await axios.get(url + `/${id}`, id)
        return res
    } catch (error) {
        return error
    }
}

export const createOneBook = async (book) => {
    try {
        const res = await axios.post(url, book)
        return res
    } catch (error) {
        return error
    }
}

export const editOneBookById = async (id, book) => {
    try {
        const res = await axios.patch(url + `/${id}`, book)
        return res
    } catch (error) {
        return error
    }
}
export const deleteOneBookById = async (id) => {
    try {
        const res = await axios.delete(url + `/${id}`, id)
        return res
    } catch (error) {
        return error
    }
}