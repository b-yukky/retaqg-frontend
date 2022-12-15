import axios from 'axios'

const axiosIns = axios.create({

  baseURL: 'http://localhost:8000/aqg/',
  timeout: 10000,
  headers: { 
    'Content-Type':  'application/json',
  },
})

export default axiosIns
