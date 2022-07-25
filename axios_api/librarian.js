import axios from "axios";

const url = 'http://localhost:3000/api/book'

export const getAllLibrarians = async () => {
    return await axios.get(url)
}