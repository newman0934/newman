<template>
  <div>
    <Header></Header>
    <div v-if="!hasProduct" class="container my-15 py-15">
      <h1>喔喔！您現在的購物車沒有東西喔！</h1>
      <h2>請商品列表挑選您喜愛的商品吧！</h2>
      <router-link to="/products" class="btn btn-lg btn-primary">前往購物</router-link>
    </div>
    <div v-else class="container my-15 py-15">
      <div class="text-end mb-5">
        <button class="btn btn-outline-danger" type="button" :disabled="isLoading" @click="deleteCarts">清空購物車</button>
      </div>
      <table class="table table-hover table-striped align-middle">
        <thead>
          <tr>
            <th>品名</th>
            <th style="width: 150px">數量</th>
            <th>單價</th>
            <th>刪除商品</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cart.carts">
            <tr v-for="cartItem of cart.carts" :key="cartItem.id">
              <td>
                {{ cartItem.product.title }}
                <div class="text-success" v-if="cartItem.coupon">已套用優惠券</div>
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <div class="input-group mb-3">
                    <input
                      min="1"
                      type="number"
                      class="form-control"
                      :disabled="isLoading"
                      v-model.number="cartItem.qty"
                      @blur="updateCartQty(cartItem)"
                    />
                  </div>
                </div>
              </td>
              <td>
                <small v-if="cart.final_total !== cart.total" class="text-primary">折扣價：</small>
                {{ cartItem.final_total }}
              </td>
              <td>
                <button
                  type="button"
                  :disabled="isLoading"
                  class="btn btn-outline-danger btn-sm"
                  @click="deleteCartItem(cartItem.id)"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ cart.total }}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td colspan="3" class="text-end text-primary">折扣價</td>
            <td class="text-end text-primary">{{ cart.final_total }}</td>
          </tr>
        </tfoot>
      </table>
      <div class="input-group coupon-input-group mb-15 input-group-sm ms-auto">
        <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="addCouponCode" :disabled="isLoading">套用優惠碼</button>
        </div>
      </div>

      <v-form ref="form" class="col-md-6 mx-auto mb-5" v-slot="{ errors }" @submit="addOder">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <v-field
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="order.user.email"
          ></v-field>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <v-field
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="required"
            v-model="order.user.name"
          ></v-field>
          <error-message name="姓名" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <v-field
            id="tel"
            name="電話"
            type="tel"
            class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話"
            rules="required|min:8|max:10|number"
            v-model="order.user.tel"
          ></v-field>
          <error-message name="電話" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <v-field
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
            v-model="order.user.address"
          ></v-field>
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea id="message" class="form-control" cols="30" rows="10" v-model="order.message"></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-primary" :disabled="isLoading">送出訂單</button>
        </div>
      </v-form>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import cartAPI from '../apis/cart'
import Header from '../components/Header'
import Footer from '../components/Footer'
import orderAPI from '../apis/orders'
import couponAPI from '../apis/coupons'
import { Toast } from '../utils/sweetAlert'
export default {
  data () {
    return {
      cart: {},
      order: {
        user: {
          email: '',
          name: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      coupon_code: '',
      hasProduct: false,
      isLoading: false
    }
  },
  methods: {
    async fetchCarts () {
      try {
        const { data } = await cartAPI.getCart()
        if (!data.success) {
          throw new Error('取得購物車失敗')
        }
        this.cart = data.data
        this.hasProduct = !!data?.data?.carts[0]?.id
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      }
    },
    async addOder () {
      try {
        this.isLoading = true
        const order = this.order
        const { data } = await orderAPI.postOder(order)
        if (!data.success) {
          throw new Error('送出訂單失敗')
        }
        this.$refs.form.resetForm()
        this.isLoading = false
        this.$router.push(`/checkout/${data.orderId}`)
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      }
    },
    async deleteCarts () {
      try {
        this.isLoading = true
        const { data } = await cartAPI.deleteCarts()
        if (!data.success) {
          throw new Error('刪除購物車失敗')
        }
        Toast.fire({
          icon: 'success',
          title: '刪除購物車成功'
        })
        this.isLoading = false
        this.fetchCarts()
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      }
    },
    async deleteCartItem (id) {
      try {
        this.isLoading = true
        const { data } = await cartAPI.deleteCart(id)
        if (!data.success) {
          throw new Error('刪除購物車品項失敗')
        }
        Toast.fire({
          icon: 'success',
          title: '刪除商品成功'
        })
        this.isLoading = false
        this.fetchCarts()
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      }
    },
    async updateCartQty (item) {
      try {
        this.isLoading = true
        const cartItem = {
          product_id: item.product_id,
          qty: item.qty
        }
        const { data } = await cartAPI.putCartQty(item.id, cartItem)
        if (!data.success) {
          throw new Error('更改購物車商品數量失敗')
        }
        this.isLoading = false
        this.fetchCarts()
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      }
    },
    async addCouponCode () {
      try {
        this.isLoading = true
        const { data } = await couponAPI.postCoupon({ code: this.coupon_code })
        if (!data.success) {
          throw new Error('加入優惠券失敗')
        }
        this.isLoading = false
        this.fetchCarts()
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
    this.fetchCarts()
  },
  components: {
    Header,
    Footer
  }
}
</script>
<style lang="scss" scoped>
.coupon-input-group {
  width: 25%;
  @include mobile{
    width: 100%;
  }
}
</style>
