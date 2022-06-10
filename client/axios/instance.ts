import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND,
})

// Using interceptors to dynamically set header for each request
// instance.interceptors.request.use(
//   (request) => {
//     const token = localStorage.getItem('access_token')

//     if (token) {
//       request.headers = {
//         Authorization: `Bearer ${token}`,
//       }
//     }
//     return request
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )
