<template>
  <div class="my-5 row justify-content-center">
    <Header></Header>
    <div v-if="isLoadingData">
            <div class="lg:max-container mx-auto my-16 flex items-center justify-center" style="height:80vh">
              <half-circle-spinner :animation-duration="1000" :size="200" color="#FFA042" />
      </div>
    </div>
    <form v-else class="lg:max-container mx-auto my-16 py-16" @submit.prevent="payOrder">
      <h2 class="text-primary mb-10 text-5xl">感謝您的購買，以下是您購買的資訊</h2>
      <h3 class="mb-5 text-4xl">訂單資訊</h3>
      <table class="table-auto mt-4 min-w-full border-[1px] border-gray-200 rounded-md overflow-hidden">
        <thead class="bg-primary border-b-[1px] border-gray-600 text-left">
          <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700">品名</th>
          <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700">數量</th>
          <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700">單價</th>
        </thead>
        <tbody class="divide-y divide-gray-200 ">
          <tr v-for="item in order.products" :key="item.id">
            <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{{ item.product.title }}</td>
            <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{{ item.qty }}</td>
            <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{{ item.final_total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr clas="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
            <td colspan="2" class="text-right">總計</td>
            <td class="text-right">{{ order.total }}</td>
          </tr>
        </tfoot>
      </table>
      <h3 class="mb-5 text-4xl">購買人資訊</h3>
      <table class="table-auto mt-4 min-w-full border-[1px] border-gray-200 rounded-md overflow-hidden">
        <tbody>
          <tr>
            <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700">Email</th>
            <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{{ order.user.email }}</td>
          </tr>
          <tr>
            <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700">姓名</th>
            <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{{ order.user.name }}</td>
          </tr>
          <tr>
            <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700">收件人電話</th>
            <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700">收件人地址</th>
            <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{{ order.user.address }}</td>
          </tr>
          <tr>
            <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700">付款狀態</th>
            <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-green-600">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-right" v-if="order.is_paid === false">
        <button class="border-[1px] border-red-600 text-red-600 rounded px-3 py-2 hover:bg-red-600 hover:text-white" :disabled="isLoading">確認付款去</button>
      </div>
      <div class="text-center mt-10">
        <router-link to="/products" class="border-[1px] border-primary text-primary rounded px-3 py-2 hover:bg-primary hover:text-white">回到產品列表</router-link>
      </div>
    </form>
    <Footer></Footer>
  </div>
</template>
<script>
import orderAPI from '@/apis/orders.js'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Toast } from '@/utils/sweetAlert'
import { HalfCircleSpinner } from 'epic-spinners'
export default {
  data () {
    return {
      order: {
        user: {}
      },
      orderId: '',
      isLoading: false,
      isLoadingData: false
    }
  },
  methods: {
    async fetchOrder () {
      try {
        this.isLoadingData = true
        const { data } = await orderAPI.getOrder(this.orderId)
        if (!data.success) {
          throw new Error('取得訂單失敗')
        }
        this.order = data.order
        this.isLoadingData = false
      } catch (error) {
        this.isLoadingData = false
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      }
    },
    async payOrder () {
      try {
        this.isLoading = true
        const { data } = await orderAPI.payOrder(this.orderId)
        if (!data.success) {
          throw new Error('付款失敗')
        }
        Toast.fire({
          icon: 'success',
          title: '付款成功'
        })
        this.isLoading = false
        this.fetchOrder()
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      }
    }
  },
  created () {
    this.orderId = this.$route.params.id
    this.fetchOrder()
  },
  components: {
    Header,
    Footer,
    HalfCircleSpinner
  }
}
</script>
