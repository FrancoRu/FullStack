import axios from './axios'

export const registerRequest = (user: object) =>
  axios.post(`/api/register`, user)

export const loginRequest = (user: object) => axios.post(`api/login`, user)

export const profileRequest = (user: object) => axios.post(`api/profile`, user)

export const verifyTokenRequest = () => axios.get(`api/verifyToken`)

export const GetLogOutRequest = () => axios.get('api/logout')
