<template>
  <nav class="navbar navbar-expand-lg fixed-top text-white">
    <div class="container">
      <router-link class="navbar-brand text-primary" to="/">NEWMAN</router-link>
      <button
        class="navbar-toggler text-white"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="bi bi-list"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/products">商品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/cart">購物車<span v-if="cartLength" class="bg-danger py-1 px-2 rounded-circle ms-1">{{cartLength}}</span></router-link>
          </li>
          <li class="nav-item" v-if="!hasToken">
            <router-link class="nav-link text-white" to="/login">登入</router-link>
          </li>
          <li class="nav-item" v-else>
            <router-link class="nav-link text-white" to="/" @click="logOut">登出</router-link>
          </li>
          <li class="nav-item" v-if="hasToken">
            <router-link class="nav-link text-white" to="/admin/order">進入後台</router-link>
          </li>
        </ul>
      </div>
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
.navbar {
  background: rgba(0, 0, 0, 0.5);
  .navbar-brand {
    font-family: 'Berkshire Swash', cursive;
  }
  .navbar-toggler {
    border: 1px solid #fff;
  }
  .nav-link {
    position: relative;
    &:after {
      transition: all 1s;
      content: '';
      position: absolute;
      bottom: 0;
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
}
</style>
