import axios from "axios";

const url = 'http://localhost:3000/api/genre'

export const getAllGenres = async () => {
    try {
        const res = await axios.get(url)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const getOneGenreById = async (id) => {
    try {
        const res = await axios.get(url + `/${id}`, id)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const createOneGenre = async (genre) => {
    try {
        const res = await axios.post(url, genre)
    } catch (error) {
        return error.response.data
    }
}

export const editOneGenreById = async (id, data) => {
    try {
        const res = await axios.patch(url + `/${id}`, data)
        return res.data
    } catch (error) {
        return error.response.data
    }
}
export const deleteOneGenreById = async (id) => {
    return await axios.delete(url + `/${id}`, id)
}