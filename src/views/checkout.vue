<template>
  <div class="my-5 row justify-content-center">
    <Header></Header>
    <form class="col-md-6 my-15 py-15" @submit.prevent="payOrder">
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
        <button class="btn btn-danger">確認付款去</button>
      </div>
    </form>
    <Footer></Footer>
  </div>
</template>
<script>
import orderAPI from '@/apis/orders.js'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  data () {
    return {
      order: {
        user: {}
      },
      orderId: ''
    }
  },
  methods: {
    async fetchOrder () {
      try {
        const { data } = await orderAPI.getOrder(this.orderId)
        if (!data.success) {
          throw new Error('取得訂單失敗')
        }
        console.log(data)
        this.order = data.order
      } catch (error) {
        window.alert(error.message)
      }
    },
    async payOrder () {
      try {
        const { data } = await orderAPI.payOrder(this.orderId)
        if (!data.success) {
          throw new Error('付款失敗')
        }
        this.fetchOrder()
      } catch (error) {
        window.alert(error.message)
      }
    }
  },
  created () {
    this.orderId = this.$route.params.id
    this.fetchOrder()
  },
  components: {
    Header,
    Footer
  }
}
</script>
