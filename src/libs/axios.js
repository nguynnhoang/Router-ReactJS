import axios from "axios";

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        "Contents-type": 'application/json' 
    }
})

export default instance