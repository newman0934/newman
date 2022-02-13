<template>
  <div>
    <Header></Header>
    <div v-if="isLoadingData">
            <div class="xl:max-container mx-auto my-16 flex items-center justify-center" style="height:80vh">
              <half-circle-spinner :animation-duration="1000" :size="200" color="#FFA042" />
      </div>
    </div>
    <div v-else>
          <div v-if="!hasProduct" class="xl:max-container mx-auto my-16 py-16">
      <h1 class="text-5xl mb-10">喔喔！您現在的購物車沒有東西喔！</h1>
      <h2 class="text-4xl mb-10">請商品列表挑選您喜愛的商品吧！</h2>
      <router-link to="/products" class="text-primary border-[1px] rounded-md border-primary text-5xl px-3 py-2 hover:text-white hover:bg-primary">前往購物</router-link>
    </div>
    <div v-else class="xl:max-container mx-auto my-16 py-16">
      <div class="text-right mb-5">
        <button class="border-[1px] border-red-600 rounded-md text-red-600 px-3 py-2 hover:bg-red-600 hover:text-white" type="button" :disabled="isLoading" @click="deleteCarts">清空購物車</button>
      </div>
      <table class="table-auto mt-4 min-w-full border-[1px] border-gray-200 rounded-md overflow-hidden">
        <thead class="bg-primary border-b-[1px] border-gray-600 text-left">
          <tr>
            <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700">品名</th>
            <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700">數量</th>
            <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700">單價</th>
            <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700">刪除商品</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 ">
          <template v-if="cart.carts">
            <tr v-for="cartItem of cart.carts" :key="cartItem.id" class="hover:bg-gray-200">
              <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                {{ cartItem.product.title }}
                <div class="text-green-600" v-if="cartItem.coupon">已套用優惠券 </div>
              </td>
              <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
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
              <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                <small v-if="cart.final_total !== cart.total" class="text-primary">折扣價：</small>
                {{ cartItem.final_total }}
              </td>
              <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                <button
                  type="button"
                  :disabled="isLoading"
                  class="border-[1px] border-red-600 rounded-md text-red-600 px-3 py-2 hover:bg-red-600 hover:text-white"
                  @click="deleteCartItem(cartItem.id)"
                >
                  <TrashIcon class="w-4 h-4"/>
                </button>
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-right">總計</td>
            <td class="text-right">{{ cart.total }}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td colspan="3" class="text-end text-primary">折扣價</td>
            <td class="text-end text-primary">{{ cart.final_total }}</td>
          </tr>
        </tfoot>
      </table>
      <div class="flex justify-end items-center mt-10">
        <input type="text" class="border-gray-200 rounded-l-lg" v-model="coupon_code" placeholder="請輸入優惠碼" />
        <div class="">
          <button class="rounded-r-lg border-primary border-[1px] px-2 py-2 text-primary hover:text-white hover:bg-primary" type="button" @click="addCouponCode" :disabled="isLoading">套用優惠碼</button>
        </div>
      </div>

      <v-form ref="form" class="lg:max-w-[60%] mx-auto mb-5 border-[1px] border-gray-100 shadow mt-10 p-5" v-slot="{ errors }" @submit="addOder">
        <div class="mb-3">
          <label for="email" class="block mb-4">Email</label>
          <v-field
            id="email"
            name="email"
            type="email"
            class="border-gray-200 rounded rounded w-full lg:w-[60%]"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="order.user.email"
          ></v-field>
          <error-message name="email" class="text-red-600 ml-4"></error-message>
        </div>

        <div class="mb-3">
          <label for="name" class="block mb-4">收件人姓名</label>
          <v-field
            id="name"
            name="姓名"
            type="text"
            class="border-gray-200 rounded w-full lg:w-[60%]"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="required"
            v-model="order.user.name"
          ></v-field>
          <error-message name="姓名" class="text-red-600 ml-4"></error-message>
        </div>

        <div class="mb-3">
          <label for="tel" class="block mb-4">收件人電話</label>
          <v-field
            id="tel"
            name="電話"
            type="tel"
            class="border-gray-200 rounded w-full lg:w-[60%]"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話"
            rules="required|min:8|max:10|number"
            v-model="order.user.tel"
          ></v-field>
          <error-message name="電話" class="text-red-600 ml-4"></error-message>
        </div>

        <div class="mb-3">
          <label for="address" class="block mb-4">收件人地址</label>
          <v-field
            id="address"
            name="地址"
            type="text"
            class="border-gray-200 rounded w-full lg:w-[60%]"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
            v-model="order.user.address"
          ></v-field>
          <error-message name="地址" class="text-red-600 ml-4"></error-message>
        </div>

        <div class="mb-3">
          <label for="message" class="block mb-4">留言</label>
          <textarea id="message" class="border-gray-200 rounded lg:w-[60%] w-full" cols="30" rows="10" v-model="order.message"></textarea>
        </div>
        <div class="text-center">
          <button type="submit" class="py-2 px-5 text-primary border-[1px] border-primary rounded-md hover:bg-primary hover:text-white" :disabled="isLoading">送出訂單</button>
        </div>
      </v-form>
    </div>
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
import { HalfCircleSpinner } from 'epic-spinners'
import { TrashIcon } from '@heroicons/vue/outline'
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
      isLoading: false,
      isLoadingData: false
    }
  },
  methods: {
    async fetchCarts () {
      try {
        this.isLoadingData = true
        const { data } = await cartAPI.getCart()
        if (!data.success) {
          throw new Error('取得購物車失敗')
        }
        this.cart = data.data
        this.hasProduct = !!data?.data?.carts[0]?.id
        this.isLoadingData = false
      } catch (error) {
        this.isLoadingData = false
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
    Footer,
    HalfCircleSpinner,
    TrashIcon
  }
}
</script>
<style lang="scss" scoped>
// .coupon-input-group {
//   width: 25%;
//   @include mobile{
//     width: 100%;
//   }
// }
</style>
