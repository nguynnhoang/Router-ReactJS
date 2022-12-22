// get: doc du lieu
// post: tao moi du lieu
// put, patch: update data
// delete: xoa data

import instance from "../libs/axios"

const userApi = {
    getAll: () => {
        return instance.get('/users')
    },
    getById: (userId) => {
        return instance.get(`/users?userId=${userId}`)
    },
    delete: (userId) => {
        return instance.delete(`/users/${userId}`)
    }
}

export default userApi