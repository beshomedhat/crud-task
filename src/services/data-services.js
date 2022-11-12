/* eslint-disable */
import http from '@/plugins/http-common.js'

class DataService {
  // api for add new item
  addNewItem(item_data) {
    return http.post('/AddOrUpdateArrivingMethod', item_data)
  }

  // api for update item
  updateItem(item_data) {
    return http.post('/AddOrUpdateArrivingMethod', item_data)
  }

  // api for get all items
  getAllData(page, rows) {
    return http.get(`/GetAllArrivingMethods?first=0&page=${page}&rows=${rows}`)
  }

  // api for delete item by id
  deleteItem(item_data) {
    return http.post('/DeleteArrivingMethod', item_data)
  }
}

export default new DataService()
