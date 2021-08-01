<template>
  <div>
    <Header></Header>
        <div v-if="isLoadingData">
      <div class="container my-15 d-flex align-items-center justify-content-center" style="height:80vh">
              <half-circle-spinner :animation-duration="1000" :size="200" color="#FFA042" />
      </div>
    </div>
    <div class="container my-15" v-else>
      <div class="row pt-10">
        <div class="col-md-6 mb-15">
          <div id="imagesList" class="carousel slide carousel-fade" data-bs-ride="carousel">
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
          <ul class v-html="product.content"></ul>
          <p class="lh-lg text-secondary text-decoration-line-through">原價：{{ product.origin_price }}</p>
          <h5 class="mb-10 text-primary">售價：{{ product.price }}</h5>
          <div class="input-group">
            <input type="number" class="form-control" min="1" v-model.number="qty" />
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="addToCart(product.id, qty)"
            >加入購物車</button>
          </div>
        </div>
      </div>
    </div>
    <h1 class="text-center mb-5">你可能也喜歡</h1>
    <swiper class="mb-15 container" :slides-per-view="swiperView" :space-between="50" :loop="true" :loopFillGroupWithBlank="true" :pagination='{
  "clickable": true
}' :navigation="true">
      <swiper-slide v-for="product of randomProducts" :key="product.id">
        <div class="card mb-10 shadow-sm">
          <img :src="product.imageUrl" class="card-img-top" alt />
          <div class="card-body text-center">
            <h5 class="card-title mb-5">{{ product.title }}</h5>
            <div class="row mb-5">
              <div
                class="col-6 text-secondary text-decoration-line-through"
              >原價：{{product.origin_price}}</div>
              <div class="col-6 text-primary">特價：{{product.price}}</div>
            </div>
            <div class="btn-group w-100">
              <router-link
                class="btn btn-primary me-2"
                :to="{name:'Product', params:{id:product.id}}"
              >查看詳情</router-link>
              <button
                type="button"
                class="btn btn-secondary"
                @click="addToCart(product.id)"
                :disabled="isLoading"
              >加入購物車</button>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <Footer></Footer>
  </div>
</template>
<script>
import productAPI from '../apis/products'
import cartAPI from '../apis/cart'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Toast } from '../utils/sweetAlert'
import { HalfCircleSpinner } from 'epic-spinners'
import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore, { Pagination, Navigation } from 'swiper/core'
import 'swiper/swiper.scss'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'
SwiperCore.use([Pagination, Navigation])

export default {
  data () {
    return {
      product: {},
      qty: 1,
      isLoading: false,
      isLoadingData: false,
      products: [],
      randomProducts: [],
      swiperView: 3
    }
  },
  methods: {
    async fetchProduct (id) {
      try {
        this.isLoadingData = true
        const { data } = await productAPI.getProduct({ id })
        if (!data.success) {
          throw new Error('獲取商品資料失敗')
        }
        this.product = data.product
        this.isLoadingData = false
      } catch (error) {
        this.isLoadingData = false
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      }
    },
    async addToCart (id, qty = 1) {
      try {
        this.isLoading = true
        const cartItem = {
          product_id: id,
          qty
        }
        const { data } = await cartAPI.postCart(cartItem)
        if (!data.success) {
          throw new Error('加入購物車失敗')
        }
        Toast.fire({
          icon: 'success',
          title: '加入購物車成功'
        })
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      }
    },
    async fetchProducts () {
      try {
        const { data } = await productAPI.getProducts()
        if (!data.success) {
          throw new Error('取得商品列表失敗')
        }
        this.products = data.products
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      }
    },
    getRandomNumber (max) {
      return Math.floor(Math.random() * max)
    },
    getRandomProducts () {
      const maxSize = this.products.length > 4 ? this.products.length : 4
      const arraySet = new Set([])
      for (let index = 0; index < maxSize; index++) {
        const num = this.getRandomNumber(this.products.length)
        arraySet.add(num)
      }
      arraySet.forEach(i => {
        this.randomProducts.push(this.products[i])
      })
    }
  },
  async created () {
    const { id } = this.$route.params
    await this.fetchProduct(id)
    await this.fetchProducts()
    await this.getRandomProducts()

    if (/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      console.log('手機')
      this.swiperView = 1
    } else {
      this.swiperView = 3
    }
  },
  components: {
    Header,
    Footer,
    Swiper,
    SwiperSlide,
    HalfCircleSpinner
  }
}
</script>
<style lang="scss" scoped>
.card-img-top {
  width: 100%;
  height: 50vh;
  object-fit: cover;
}
</style>
