<template>
  <nav class="flex fixed-top fixed bg-black top-0 inset-x-0 z-10 bg-manu-bg-opacity">
    <div class="xl:max-container w-full flex justify-between items-center py-3 mx-auto text-white">
      <router-link class="brand text-primary text-3xl" to="/">NEWMAN</router-link>
      <button
        type="button"
        class="block sm:hidden"
        @click="toggleMenu"
      >
        <ViewListIcon class="w-10 h-10 text-white"/>
      </button>
        <ul class="space-x-0 sm:space-x-5 fixed sm:static block sm:flex right-0 left-0 top-16 space-y-5 sm:space-y-0 text-center z-10 py-2 bg-gray-700 sm:bg-transparent" :class="{hidden: menuValue}">
          <li>
            <router-link to="/products" class="hover:text-primary nav-link">商品列表</router-link>
          </li>
          <li>
            <router-link class="hover:text-primary relative nav-link" to="/cart">購物車<span v-if="cartLength" class="absolute bg-primary -top-1 -right-2 rounded-full ml-1 text-xs px-1">{{cartLength}}</span></router-link>
          </li>
          <li v-if="!hasToken">
            <router-link class="hover:text-primary nav-link" to="/login">登入</router-link>
          </li>
          <li v-else>
            <router-link class="hover:text-primary nav-link" to="/" @click="logOut">登出</router-link>
          </li>
          <li v-if="hasToken">
            <router-link class="hover:text-primary nav-link" to="/admin/order">進入後台</router-link>
          </li>
        </ul>
    </div>
  </nav>
</template>
<script>
import cartAPI from '../apis/cart'
import { Toast } from '../utils/sweetAlert'
import { ViewListIcon } from '@heroicons/vue/outline'
export default {
  data () {
    return {
      cartLength: 0,
      hasToken: false,
      menuValue: true
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
    },
    toggleMenu () {
      this.menuValue = !this.menuValue
    }
  },
  created () {
    this.fetchCarts()
    this.getToken()
  },
  components: {
    ViewListIcon
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
