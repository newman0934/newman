<template>
  <div class="xl:max-container mx-auto mb-20">
    <div class="overflow-x-auto w-full">
      <table class="table-auto mt-4 border-[1px] border-gray-200 rounded-md overflow-hidden w-full">
        <thead class="bg-primary border-b-[1px] border-gray-600 text-left">
          <tr>
            <th
              class="py-3 px-6 text-md font-medium tracking-wider text-gray-700 whitespace-nowrap"
            >購買時間</th>
            <th
              class="py-3 px-6 text-md font-medium tracking-wider text-gray-700 whitespace-nowrap"
            >Email</th>
            <th
              class="py-3 px-6 text-md font-medium tracking-wider text-gray-700 whitespace-nowrap"
            >購買款項</th>
            <th
              class="py-3 px-6 text-md font-medium tracking-wider text-gray-700 whitespace-nowrap"
            >應付金額</th>
            <th
              class="py-3 px-6 text-md font-medium tracking-wider text-gray-700 whitespace-nowrap"
            >是否付款</th>
            <th
              class="py-3 px-6 text-md font-medium tracking-wider text-gray-700 whitespace-nowrap"
            >編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order of orders"
            :key="order.id"
            class="hover:bg-gray-200"
            :class="{ 'text-gray-500': !order.is_paid }"
          >
            <td
              class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap"
            >{{ $filters.date(order.create_at) }}</td>
            <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
              <span v-text="order.user.email" v-if="order.user"></span>
            </td>
            <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
              <ul class="list-unstyled">
                <li v-for="(product, i) in order.products" :key="i">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td
              class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap"
            >{{ order.total }}</td>
            <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
              <div class="form-check form-switch">
                <input
                  class="text-primary mr-2"
                  type="checkbox"
                  :id="`paidSwitch${order.id}`"
                  v-model="order.is_paid"
                  @change="updatePaid(order)"
                />
                <label :for="`paidSwitch${order.id}`">
                  <span v-if="order.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </td>
            <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
              <div class="btn-group">
                <button
                  class="px-2 py-1 rounded-l border-[1px] border-primary text-primary hover:text-white hover:bg-primary"
                  type="button"
                  @click="openModal(order)"
                >檢視</button>
                <button
                  class="px-2 py-1 rounded-r border-[1px] border-red-500 text-red-500 hover:text-white hover:bg-red-500"
                  type="button"
                  @click="openDelOrderModal(order)"
                >刪除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :pages="pagination" @emitPages="fetchOrders"></Pagination>
    <DelModal
      :item="tempOrder"
      :delModalOpen="delModalOpen"
      @delItem="delOrder"
      @closeDelModal="closeDelModal"
    ></DelModal>
    <OrderModal
      :order="tempOrder"
      :orderModalOpen="orderModalOpen"
      @updatePaid="updatePaid"
      @closeOrderModal="closeOrderModal"
    ></OrderModal>
  </div>
</template>
<script>
import adminOrdersAPI from '@/apis/admin/orders.js'
import DelModal from '@/components/DelModal.vue'
import OrderModal from '@/components/OrderModal.vue'
import Pagination from '@/components/Pagination.vue'
import { Toast } from '@/utils/sweetAlert'
import { ref } from 'vue'

export default {
  setup () {
    const orders = ref({})
    const isNew = ref(false)
    const pagination = ref({})
    const isLoading = ref(false)
    const tempOrder = ref({})
    const orderModalOpen = ref(false)
    const delModalOpen = ref(false)

    const fetchOrders = async (page) => {
      try {
        const { data } = await adminOrdersAPI.getAdminOrders(page)
        if (!data.success) {
          throw new Error('取得訂單列表失敗')
        }
        orders.value = data.orders
        pagination.value = data.pagination
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      }
    }
    fetchOrders()

    const delOrder = async () => {
      try {
        const { data } = await adminOrdersAPI.deleteAdminOrder(
          tempOrder.value.id
        )
        if (!data.success) {
          throw new Error('刪除訂單失敗')
        }
        Toast.fire({
          icon: 'success',
          title: '刪除訂單成功'
        })
        delModalOpen.value = false
        fetchOrders()
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      }
    }

    const updatePaid = async (item) => {
      try {
        isLoading.value = true
        const paid = ref({
          is_paid: item.is_paid
        })
        const { data } = await adminOrdersAPI.updatePaid(item.id, paid.value)
        if (!data.success) {
          throw new Error('修改訂單失敗')
        }
        Toast.fire({
          icon: 'success',
          title: '修改訂單成功'
        })
        isLoading.value = false
        orderModalOpen.value = false
        fetchOrders()
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      }
    }

    const openDelOrderModal = (item) => {
      tempOrder.value = { ...item }
      delModalOpen.value = true
    }
    const openModal = (item) => {
      tempOrder.value = { ...item }
      orderModalOpen.value = true
    }
    const closeDelModal = () => {
      delModalOpen.value = false
    }
    const closeOrderModal = () => {
      orderModalOpen.value = false
    }

    return {
      orders,
      isNew,
      pagination,
      isLoading,
      tempOrder,
      orderModalOpen,
      delModalOpen,
      fetchOrders,
      delOrder,
      updatePaid,
      openDelOrderModal,
      openModal,
      closeDelModal,
      closeOrderModal

    }
  },
  components: {
    Pagination,
    DelModal,
    OrderModal
  }
}
</script>
