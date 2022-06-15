import axios from 'axios'

// create axios instance

const service = axios.create({
    baseURL: window.location.origin + '/api/v1alpha1',
    timout: 3000,
})

service.interceptors.request.use(
    (config) => {
        return config
    },
    (err) => {
        console.log(err)
    }
)

service.interceptors.response.use(
    (response) => {
        let res = {}
        res.status = response.status
        res.data = response.data
        return res
    },
    (err) => console.log(err)
)

export default service