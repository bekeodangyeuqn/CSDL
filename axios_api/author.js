import axios from "axios";

const url = 'http://localhost:3000/api/author'

export const getAllAuthors = async () => {
    try {
        const res = await axios.get(url)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const getOneAuthorById = async (id) => {
    try {
        const res = await axios.get(url + `/${id}`, id)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const createOneAuthor = async (author) => {
    try {
        const res = await axios.post(url, author)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const editOneAuthorById = async (data) => {
    try {
        const res = await axios.patch(url + `/${id}`, data)
        return res.data
    } catch (error) {
        return error.response.data
    }
}
export const deleteOneAuthorById = async (id) => {
    return axios.delete(url + `/${id}`, id)
}