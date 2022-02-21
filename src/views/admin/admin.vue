<template>
  <div>
    <Header></Header>
    <nav class="xl:max-container mx-auto my-16 pt-10">
      <ul class="flex my-5 list-unstyled space-x-5">
        <li class="">
          <router-link to="/admin" class="border-[1px] rounded px-3 py-3 border-primary text-primary hover:bg-primary hover:text-white">商品列表</router-link>
        </li>
        <li class="">
          <router-link to="/admin/order" class="border-[1px] rounded px-3 py-3 border-primary text-primary hover:bg-primary hover:text-white">訂單</router-link>
        </li>
        <li class="">
          <router-link to="/admin/coupon" class="border-[1px] rounded px-3 py-3 border-primary text-primary hover:bg-primary hover:text-white">優惠券</router-link>
        </li>
        <li class="">
          <router-link to="/admin/blog" class="border-[1px] rounded px-3 py-3 border-primary text-primary hover:bg-primary hover:text-white">部落格</router-link>
        </li>
      </ul>
    </nav>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>
<script>
import loginAPI from '@/apis/login'
import { Toast } from '@/utils/sweetAlert'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
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
  },
  components: {
    Header,
    Footer
  }
}
</script>
<style scoped lang="scss">
.active{
  background: #FFA042;
  color: white;
}

</style>
