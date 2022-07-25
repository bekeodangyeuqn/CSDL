import axios from './axios';

export const getAllUser = () => {
    return axios.get('/api/user');
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