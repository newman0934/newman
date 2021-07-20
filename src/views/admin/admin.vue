<template>
  <nav class="container">
    <ul class="nav nav-tabs my-5 list-unstyled">
      <li class="nav-item">
        <router-link to="/admin" class="nav-link mx-3">商品列表</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin/order" class="nav-link mx-3">訂單</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin/coupon" class="nav-link mx-3">優惠券</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </nav>
</template>
<script>
import loginAPI from '@/apis/login'
import { Toast } from '@/utils/sweetAlert'
export default {
  methods: {
    async check () {
      try {
        const { data } = await loginAPI.check()
        if (!data.success) {
          throw new Error(data.message)
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error.message
        })
        this.$router.replace('/login')
      }
    }
  },
  created () {
    this.check()
  }
}
</script>
