import axios from 'axios';
import queryString from 'query-string';
import camelCase from 'camelcase-keys';

const axiosClient = axios.create({
    baseURL: process.env.API_END_POINT,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
    transformResponse: [(data) => camelCase(data, { deep: true })],
});
axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
})
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return camelCase(JSON.parse(response.data), { deep: true });
    }
    return camelCase(JSON.parse(response), { deep: true });
}, (error) => {
    // Handle errors
    throw error;
});
export default axiosClient;