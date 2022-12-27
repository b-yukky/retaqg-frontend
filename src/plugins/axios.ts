import axios from 'axios'

const axiosIns = axios.create({

  baseURL: 'https://la.ait.kyushu-u.ac.jp/qu/aqg/api/aqg/',
  timeout: 30000,
  headers: { 
    'Content-Type':  'application/json',
  },
})

export default axiosIns

