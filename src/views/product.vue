<template>
  <div>
    <Header></Header>
        <div v-if="isLoadingData">
      <div class="xl:max-container mx-auto my-16 flex items-center justify-center" style="height:80vh">
              <half-circle-spinner :animation-duration="1000" :size="200" color="#FFA042" />
      </div>
    </div>
    <div class="xl:max-container mx-auto my-16" v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
        <div class="mb-16">
          <swiper :navigation="true">
          <swiper-slide v-for="(image, i ) of product.imagesUrl" :key="i">
            <img :src="image" class="block w-full">
          </swiper-slide>
          </swiper>
        </div>
        <div class="ml-10 md:ml-0">
          <h2 class="text-4xl">{{ product.title }}</h2>
          <small>{{ product.description }}</small>
          <h4 class="mt-10 mb-5 text-3xl">產品說明</h4>
          <ul class="mb-5" v-html="product.content"></ul>
          <p class="mb-5 text-gray-300 line-through">原價：{{ product.origin_price }}</p>
          <h5 class="mb-10 text-primary text-xl">售價：{{ product.price }}</h5>
          <div>
            <input type="number" class="rounded-l-md border-gray-300" min="1" v-model.number="qty" />
            <button
              type="button"
              class="rounded-r-md px-2 py-2 border-[1px] border-primary text-primary hover:bg-primary hover:text-white"
              @click="addToCart(product.id, qty)"
            >加入購物車</button>
          </div>
        </div>
      </div>
    </div>
    <h1 class="text-center mb-5 text-5xl md:block hidden">你可能也喜歡</h1>
    <swiper class="mb-16 xl:max-container mx-auto md:block hidden" :slides-per-view="swiperView" :space-between="50" :loop="true" :loopFillGroupWithBlank="true" :pagination='{
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
            <div class="w-full mb-4">
              <router-link
                class="bg-primary rounded text-white border-[1px] border-primary py-2 px-3 hover:bg-white hover:text-primary mr-2"
                :to="{name:'Product', params:{id:product.id}}"
              >查看詳情</router-link>
              <button
                type="button"
                class="bg-gray-600 rounded text-white border-gray-600 border-[1px] py-2 px-3 hover:bg-white hover:text-gray-600"
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
