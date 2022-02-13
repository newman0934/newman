<template>
  <nav class="flex fixed-top bg-black opacity-50 fixed top-0 inset-x-0 z-10">
    <div class="xl:max-container w-full flex justify-between items-center py-3 mx-auto text-white">
      <router-link class="brand text-primary text-3xl" to="/">NEWMAN</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="bi bi-list"></i>
      </button>
        <ul class="flex space-x-5">
          <li>
            <router-link class="nav-link" to="/products">商品列表</router-link>
          </li>
          <li>
            <router-link class="nav-link" to="/cart">購物車<span v-if="cartLength" class="bg-danger py-1 px-2 rounded-circle ms-1">{{cartLength}}</span></router-link>
          </li>
          <li v-if="!hasToken">
            <router-link class="nav-link" to="/login">登入</router-link>
          </li>
          <li v-else>
            <router-link class="nav-link" to="/" @click="logOut">登出</router-link>
          </li>
          <li v-if="hasToken">
            <router-link class="nav-link" to="/admin/order">進入後台</router-link>
          </li>
        </ul>
    </div>
  </nav>
</template>
<script>
import cartAPI from '../apis/cart'
import { Toast } from '../utils/sweetAlert'
export default {
  data () {
    return {
      cartLength: 0,
      hasToken: false
    }
  },
  methods: {
    async fetchCarts () {
      try {
        const { data } = await cartAPI.getCart()
        if (!data.success) {
          throw new Error('取得購物車數量失敗')
        }
        this.cartLength = data.data.carts.length
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      }
    },
    getToken () {
      const token = localStorage.getItem('token')
      if (token) {
        this.hasToken = true
      } else {
        this.hasToken = false
      }
    },
    logOut () {
      localStorage.removeItem('token')
      this.getToken()
      this.$router.replace('/')
    }
  },
  created () {
    this.fetchCarts()
    this.getToken()
  }
}
</script>
<style lang="scss">
  .brand {
    font-family: 'Berkshire Swash', cursive;
  }
  .nav-link {
    position: relative;
    &:after {
      transition: all 1s;
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      right: 0;
      margin: auto;
      width: 0%;
      height: 2px;
      background: #ffa042;
    }
    &:hover:after {
      width: 100%;
    }
  }
</style>
