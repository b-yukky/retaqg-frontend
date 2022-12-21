import axios from 'axios'

const axiosIns = axios.create({

  baseURL: 'http://192.168.101.36:8000/aqg/',
  timeout: 10000,
  headers: { 
    'Content-Type':  'application/json',
  },
})

export default axiosIns

