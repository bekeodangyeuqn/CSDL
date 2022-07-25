import axios from "axios";

const url = 'http://localhost:3000/api/publisher'

export const getAllPublishers = async () => {
    try {
        const res = await axios.get(url)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const getOnePublisherById = async (id) => {
    try {
        const res = await axios.get(url + `${id}`, id)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const createOnePublisher = async () => {
    try {
        const res = await axios.post(url)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const editOnePublisherById = async (id) => {
    try {
        const res = await axios.patch(url + `${id}`, id)
        return res.data
    } catch (error) {
        return error.response.data
    }
}
export const deleteOnePublisherById = async (id) => {
    try {
        const res = await axios.delete(url + `${id}`, id)
        return res.data
    } catch (error) {
        return error.response.data
    }
}