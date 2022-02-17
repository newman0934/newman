<template>
  <teleport to="#model">
    <div
      class="bg-modal-bg-opacity flex fixed inset-0 justify-center items-center z-20"
      :class="{ hidden: !modalToggle }"
    >
      <div class="bg-white max-w-3xl w-full p-10 rounded-md">
        <h5 class="text-center text-3xl mb-5">
          <span>訂單細節</span>
        </h5>
        <div class="flex space-x-10 mb-10">
          <div>
            <h3 class="text-2xl mb-5">用戶資料</h3>
            <table class="table-auto text-left">
              <tbody v-if="tempOrder.user">
                <tr>
                  <th class="pr-5">姓名</th>
                  <td>{{ tempOrder.user.name }}</td>
                </tr>
                <tr>
                  <th class="pr-5">Email</th>
                  <td>{{ tempOrder.user.email }}</td>
                </tr>
                <tr>
                  <th class="pr-5">電話</th>
                  <td>{{ tempOrder.user.tel }}</td>
                </tr>
                <tr>
                  <th class="pr-5">地址</th>
                  <td>{{ tempOrder.user.address }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h3 class="text-2xl mb-5">訂單細節</h3>
            <table class="table-auto text-left">
              <tbody>
                <tr>
                  <th class="pr-5">訂單編號</th>
                  <td>{{ tempOrder.id }}</td>
                </tr>
                <tr>
                  <th class="pr-5">下單時間</th>
                  <td>{{ $filters.date(tempOrder.create_at) }}</td>
                </tr>
                <tr>
                  <th class="pr-5">付款時間</th>
                  <td>
                    <span v-if="tempOrder.paid_date">{{ $filters.date(tempOrder.paid_date) }}</span>
                    <span v-else>時間不正確</span>
                  </td>
                </tr>
                <tr>
                  <th class="pr-5">付款狀態</th>
                  <td>
                    <strong v-if="tempOrder.is_paid" class="text-success">已付款</strong>
                    <span v-else class="text-muted">尚未付款</span>
                  </td>
                </tr>
                <tr>
                  <th class="pr-5">總金額</th>
                  <td>{{ $filters.currency(tempOrder.total) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h5 class="text-center text-3xl mb-5">
            <span>購買商品</span>
          </h5>
          <table class="table-auto w-full mb-10">
            <tbody>
              <tr v-for="item in tempOrder.products" :key="item.id" class="text-left">
                <th>{{ item.product.title }}</th>
                <td>{{ item.qty }} / {{ item.product.unit }}</td>
                <td class="text-end">{{ $filters.currency(item.final_total) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex mb-5">
          <div>
            <input
              class="form-check-input"
              type="checkbox"
              value
              id="flexCheckDefault"
              v-model="tempOrder.is_paid"
            />
            <label class="form-check-label" for="flexCheckDefault">
              <span v-if="tempOrder.is_paid">已付款</span>
              <span v-else>未付款</span>
            </label>
          </div>
        </div>
        <div class="text-right space-x-5">
          <button
            type="button"
            class="text-primary border-[1px] border-primary rounded-md px-3 py-2 hover:bg-primary hover:text-white"
            @click="$emit('closeOrderModal')"
          >取消</button>
          <button
            type="button"
            class="text-red-600 border-[1px] border-red-600 rounded-md px-3 py-2 hover:bg-red-600 hover:text-white"
            @click="$emit('update-paid', tempOrder)"
          >修改付款狀態</button>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script>
export default {
  props: {
    order: {
      type: Object,
      default () {
        return {}
      }
    },
    orderModalOpen: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      status: {},
      modal: '',
      tempOrder: {},
      isPaid: false,
      modalToggle: false
    }
  },
  watch: {
    order () {
      this.tempOrder = this.order
    },
    orderModalOpen () {
      this.modalToggle = this.orderModalOpen
    }
  }
}
</script>
