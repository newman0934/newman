<template>
  <div>
    <Header></Header>
    <div class="container my-15">
      <div class="row pt-10">
        <div class="col-md-6 mb-15">
          <div
            id="imagesList"
            class="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner">
              <div
                class="carousel-item"
                :class="{ active: i == 0}"
                v-for="(image, i) of product.imagesUrl"
                :key="i"
              >
                <img :src="image" class="d-block w-100" />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#imagesList"
              data-bs-slide="prev"
            >
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#imagesList"
              data-bs-slide="next"
            >
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div class="col-md-6">
          <h2>{{ product.title }}</h2>
          <small>{{ product.description }}</small>
          <h4 class="mt-10 mb-5">產品說明</h4>
          <ul class="" v-html="product.content"></ul>
          <p class="lh-lg text-secondary text-decoration-line-through">原價：{{ product.origin_price }}</p>
          <h5 class="mb-10 text-primary">售價：{{ product.price }}</h5>
<div class="input-group">
            <input type="number" class="form-control" min="1" v-model.number="qty" />
          <button type="button" class="btn btn-outline-primary" @click="addToCart(product.id, qty)">加入購物車</button>
</div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import productAPI from '../apis/products'
import cartAPI from '../apis/cart'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default {
  data () {
    return {
      product: {},
      qty: 1
    }
  },
  methods: {
    async fetchProduct (id) {
      try {
        const { data } = await productAPI.getProduct({ id })
        if (!data.success) {
          throw new Error('獲取商品資料失敗')
        }
        this.product = data.product
      } catch (error) {
        window.alert(error.message)
      }
    },
    async addToCart (id, qty = 1) {
      try {
        const cartItem = {
          product_id: id,
          qty
        }
        const { data } = await cartAPI.postCart(cartItem)
        if (!data.success) {
          throw new Error('加入購物車失敗')
        }
        window.alert('加入購物車成功')
      } catch (error) {
        window.alert(error.message)
      }
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchProduct(id)
  },
  components: {
    Header,
    Footer
  }
}
</script>
