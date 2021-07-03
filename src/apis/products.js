import axios from 'axios'

export default {
  getProducts () {
    return axios.get(`${process.env.VUE_APP_URL}/products`)
  },
  getProduct ({ id }) {
    return axios.get(`${process.env.VUE_APP_URL}/product/${id}`)
  }
}
