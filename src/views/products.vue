<template>
  <div>
    <Header></Header>
    <div class="container my-15">
      <div class="row pt-15">
        <div class="col-md-3 mb-10">
          <div class="list-group sticky-top">
            <a
              class="list-group-item list-group-item-action"
              :class="{active: selectCategory === ''}"
              @click.prevent="getSelectProducts('')"
            >全部商品</a>
            <a
              class="list-group-item list-group-item-action"
              :class="{active: selectCategory === category}"
              v-for="category of getCategories"
              :key="category"
              @click="getSelectProducts(category)"
            >{{category}}</a>
          </div>
        </div>
        <div class="col-md-9">
          <div class="row mb-5 align-items-center">
            <div class="col-6">
              <p class="mb-0">共有 {{productsLength}} 商品</p>
            </div>
            <div class="col-6">
              <div class="input-group">
                <input type="text" placeholder="搜尋商品" aria-label="Search" class="form-control" v-model="searchInput" />
                <button type="button" class="btn btn-outline-primary" @click="searchProducts">
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4" v-for="product of selectProducts" :key="product.id">
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
export default {
  data () {
    return {
      products: [],
      selectCategory: '',
      productsLength: 0,
      selectProducts: [],
      isLoading: false,
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
        this.selectProducts = this.selectProducts.filter(item => item.title.match(this.searchInput))
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
    Footer
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

.list-group-item:hover {
  cursor: pointer;
}

.sticky-top {
  top: 55px;
}
</style>
