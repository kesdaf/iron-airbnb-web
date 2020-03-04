import axios from 'axios'

const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
})

http.interceptors.response.use(
    response => response.data,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.clear()
            window.location.assign('/login')
        }

        return Promise.reject(error)
    }
)

const login = (user) => http.post('/login',user)
const logout = () => http.post('/logout')
const register = (newUser) => http.post('/user', newUser)

const createLocal = (local) => http.post('/locals',local);
const getLocals = ()=> http.get('/locals');
const deleteLocal = (id)=> http.delete(`/locals/${id}`);
const findLocal = (find) => http.post('/findLocal',find);
const getLocalDetail = (id) => http.get(`/locals/${id}`);
const getLocalReserves = (id) => http.get(`/reserve/local/${id}`);
const createReserve = (body) => http.post(`/reserve`,body);
const getReserves = ()=> http.get('/reserve');
const acceptReserve = (id) => http.patch(`/reserve/${id}`);
const deleteReserve = (id) => http.delete(`/reserve/${id}`);

export default {
    login,
    logout,
    register,
    createLocal,
    getLocals,
    deleteLocal,
    findLocal,
    getLocalDetail,
    getLocalReserves,
    createReserve,
    getReserves,
    acceptReserve,
    deleteReserve
}