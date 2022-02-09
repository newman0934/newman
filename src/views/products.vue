<template>
  <div>
    <Header></Header>
    <div v-if="isLoadingData">
      <div class="xl:max-container mx-auto flex items-center justify-center" style="height:80vh">
        <half-circle-spinner :animation-duration="1000" :size="200" color="#FFA042" />
      </div>
    </div>
    <div class="xl:max-container mx-auto my-16" v-else>
      <div class="flex pt-16 space-x-10">
        <div class="sticky w-[20%]">
          <div class="border-[1px] border-gray-200 rounded-xl overflow-hidden flex flex-col divide-y">
            <a
              class="py-3 pl-3 hover:text-white hover:bg-primary"
              :class="{ active: selectCategory === '' }"
              @click.prevent="getSelectProducts('')"
            >全部商品</a>
            <a
              class="py-3 pl-3 hover:text-white hover:bg-primary"
              :class="{ active: selectCategory === category }"
              v-for="category of getCategories"
              :key="category"
              @click="getSelectProducts(category)"
            >{{ category }}</a>
          </div>
        </div>
        <div class="m-w-full w-full">
          <div class="flex mb-5 items-center justify-between">
              <p class="mb-0">共有 {{ productsLength }} 商品</p>
              <div class="flex items-center">
                <input
                  type="text"
                  placeholder="搜尋商品"
                  aria-label="Search"
                  class="rounded-l-xl border-gray-300"
                  v-model="searchInput"
                />
                <button type="button" class="px-3 py-2 rounded-r-xl text-primary border-[1px] border-primary hover:text-white hover:bg-primary" @click="searchProducts">
                  <SearchIcon class="w-6 h-6"/>
                </button>
              </div>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div class="" v-for="product of selectProducts" :key="product.id">
              <div class="card mb-10 shadow-sm">
                <img :src="product.imageUrl" class="card-img-top" alt />
                <div class="card-body text-center">
                  <h5 class="card-title mb-5">{{ product.title }}</h5>
                  <div class="flex justify-center mb-5">
                    <div
                      class="text-gray-400 mr-2 line-through"
                    >原價：{{ product.origin_price }}</div>
                    <div class="text-primary">特價：{{ product.price }}</div>
                  </div>
                  <div class="w-full mb-5">
                    <router-link
                      class="bg-primary rounded text-white border-[1px] border-primary py-2 px-3 hover:bg-white hover:text-primary mr-2"
                      :to="{ name: 'Product', params: { id: product.id } }"
                    >查看詳情</router-link>
                    <button
                      type="button"
                      class="bg-gray-600 rounded text-white border-gray-600 border-[1px] py-2 px-3 hover:bg-white hover:text-gray-600 "
                      @click="addToCart(product.id)"
                      :disabled="isLoading"
                    >加入購物車</button>
                  </div>
                </div>
              </div>
            </div>
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
import { Toast } from '../utils/sweetAlert'
import { HalfCircleSpinner } from 'epic-spinners'
import { SearchIcon } from '@heroicons/vue/solid'
export default {
  data () {
    return {
      products: [],
      selectCategory: '',
      productsLength: 0,
      selectProducts: [],
      isLoading: false,
      isLoadingData: false,
      searchInput: ''
    }
  },
  computed: {
    getCategories () {
      const categories = new Set()
      this.products.forEach(item => categories.add(item.category))
      return [...categories]
    }
  },
  methods: {
    async fetchProducts () {
      try {
        this.isLoadingData = true
        const { data } = await productAPI.getProducts()
        if (!data.success) {
          throw new Error('取得商品列表失敗')
        }
        this.products = data.products
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
          title: '成功加入購物車'
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
    getSelectProducts (category) {
      this.selectCategory = category
      if (this.selectCategory) {
        const selectProducts = this.products.filter(
          item => item.category === category
        )
        this.productsLength = selectProducts.length
        this.selectProducts = selectProducts
      } else {
        this.productsLength = this.products.length
        this.selectProducts = this.products
      }
    },
    searchProducts () {
      if (this.searchInput) {
        this.selectProducts = this.selectProducts.filter(item =>
          item.title.match(this.searchInput)
        )
        this.productsLength = this.selectProducts.length
      } else {
        this.selectProducts = this.products
        this.productsLength = this.selectProducts.length
        this.selectCategory = ''
      }
    }
  },
  async created () {
    await this.fetchProducts()
    await this.getSelectProducts('')
  },
  components: {
    Header,
    Footer,
    HalfCircleSpinner,
    SearchIcon
  }
}
</script>
<style lang="scss" scoped>
.card {
  transition: all 0.5s;
  &:hover {
    transform: translateY(-10px);
  }
}
.card-img-top {
  width: 100%;
  height: 50vh;
  object-fit: cover;
}

.card-title {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.active{
  background: #FFA042;
  color: white;
}

</style>
