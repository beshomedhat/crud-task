/* eslint-disable */
import axios from 'axios'

export default axios.create({
  baseURL: 'http://40.127.194.127:777/api/Emergency',
  headers: {
    "Content-Type": "application/json"
  },
})
