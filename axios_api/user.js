import axios from './axios';

export const getAllUser = (data) => {
    console.log({ data })
    return axios.get('/api/user', {
        params: data
    });
}
export const deleteUser = (id) => {
    return axios.delete(`/api/user/${id}`);
}

export const getUser = (id) => {
    return axios.get(`/api/user/${id}`);
}

export const updateUser = (user) => {
    return axios.patch(`/api/user/${user.userId}`, user);
}
const url = 'http://localhost:3000/api/user'

export const getAllUsers = async () => {
    try {
        const res = await axios.get(url)
        return res
    } catch (error) {
        return error
    }
}

export const getOneUserById = async (id) => {
    try {
        const res = await axios.get(url + `${id}`, id)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const createOneUser = async () => {
    try {
        const res = await axios.post(url)
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const editOneUserById = async (id) => {
    try {
        const res = await axios.patch(url + `${id}`, id)
        return res.data
    } catch (error) {
        return error.response.data
    }
}
export const deleteOneUserById = async (id) => {
    try {
        const res = await axios.delete(url + `${id}`, id)
        return res.data
    } catch (error) {
        return error.response.data
    }
}