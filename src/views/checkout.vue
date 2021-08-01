<template>
  <div class="my-5 row justify-content-center">
    <Header></Header>
    <div v-if="isLoadingData">
            <div class="container my-15 d-flex align-items-center justify-content-center" style="height:80vh">
              <half-circle-spinner :animation-duration="1000" :size="200" color="#FFA042" />
      </div>
    </div>
    <form v-else class="col-md-6 my-15 py-15" @submit.prevent="payOrder">
      <h2 class="text-primary mb-10">感謝您的購買，以下是您購買的資訊</h2>
      <h3 class="mb-5">訂單資訊</h3>
      <table class="table table-hover table-striped align-middle mb-10">
        <thead>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td>{{ item.product.title }}</td>
            <td>{{ item.qty }}</td>
            <td>{{ item.final_total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-end">總計</td>
            <td class="text-end">{{ order.total }}</td>
          </tr>
        </tfoot>
      </table>
      <h3 class="mb-5">購買人資訊</h3>
      <table class="table">
        <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-end" v-if="order.is_paid === false">
        <button class="btn btn-danger" :disabled="isLoading">確認付款去</button>
      </div>
      <div class="text-center">
        <router-link to="/products" class="btn btn-primary">回到產品列表</router-link>
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
