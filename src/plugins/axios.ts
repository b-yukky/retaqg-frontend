import axios from 'axios'

const production = process.env.NODE_ENV

let API_URL = 'https://la.ait.kyushu-u.ac.jp/qu/aqg/api/aqg/'

if (production === 'development') {
  API_URL = 'http://192.168.101.38:8000/aqg/'
}

console.log('my api',API_URL)

const axiosIns = axios.create({

  baseURL: API_URL,
  timeout: 30000,
  headers: { 
    'Content-Type':  'application/json',
  },
})

export default axiosIns

