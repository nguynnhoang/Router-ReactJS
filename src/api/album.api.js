import instance from "../libs/axios"


const albumApi = {
    getByUser: (userId) => {
        return instance.get(`/albums?userId=${userId}`)
    },
    delete: (id) => {
        return instance.delete(`/albums/${id}`)
    },
    update: (id, newAlbum) => {
        return instance.put(`/albums/${id}`, newAlbum)
    }
}

export default albumApi