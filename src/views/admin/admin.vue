<template>
  <div>
    <nav class="my-5 text-center">
      <router-link to="/admin" class="mx-3">商品列表</router-link>
      <router-link to="/admin/order" class="mx-3">訂單</router-link>
      <router-link to="/admin/coupon" class="mx-3">優惠券</router-link>
    </nav>
    <router-view></router-view>
  </div>
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
