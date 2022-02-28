<template>
  <div class="xl:max-container mx-auto mb-20">
    <div class="text-right mt-4">
      <button class="rounded-md border-[1px] border-primary text-primary px-3 py-2 mb-5 hover:bg-primary hover:text-white" type="button" @click="openCouponModal(true)">建立新的優惠券</button>
    </div>
    <div class="overflow-x-auto w-full">
          <table class="table-auto mt-4 border-[1px] border-gray-200 rounded-md overflow-hidden w-full">
      <thead class="bg-primary border-b-[1px] border-gray-600 text-left">
        <tr>
          <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700 whitespace-nowrap">名稱</th>
          <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700 whitespace-nowrap">折扣百分比</th>
          <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700 whitespace-nowrap">到期日</th>
          <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700 whitespace-nowrap">是否啟用</th>
          <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700 whitespace-nowrap">編輯</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 ">
        <tr v-for="(item, key) in coupons" :key="key" class="hover:bg-gray-200">
          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{{ item.title }}</td>
          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{{ item.percent }}%</td>
          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{{ $filters.date(item.due_date) }}</td>
          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
            <span v-if="item.is_enabled === 1" class="text-green-500">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
            <div class="flex">
              <button
                class="px-2 py-1 rounded-l border-[1px] border-primary text-primary hover:text-white hover:bg-primary whitespace-nowrap"
                @click="openCouponModal(false, item)"
              >編輯</button>
              <button class="px-2 py-1 rounded-r border-[1px] border-red-500 text-red-500 hover:text-white hover:bg-red-500 whitespace-nowrap" @click="openDelCouponModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <Pagination :pages="pagination" @emit-pages="fetchCoupons"></Pagination>
    <Couponmodal :coupon="tempCoupon" :is-new="isNew" :couponModalOpen="couponModalOpen" @updateCoupon="updateCoupon" @closeCouponModal="closeCouponModal"></Couponmodal>
    <DelModal :item="tempCoupon" :delModalOpen="delModalOpen" @delItem="deleteCoupon" @closeDelModal="closeDelModal"></DelModal>

  </div>
</template>
<script>
import adminCouponAPI from '@/apis/admin/coupons'
import Couponmodal from '@/components/CouponModal'
import DelModal from '@/components/DelModal'
import Pagination from '@/components/Pagination'
import { Toast } from '@/utils/sweetAlert'
import { ref } from 'vue'
export default {
  setup () {
    const coupons = ref([])
    const pagination = ref({})
    const tempCoupon = ref({
      title: '',
      is_enabled: 0,
      percent: 100,
      code: ''
    })
    const isNew = ref(false)
    const couponModalOpen = ref(false)
    const delModalOpen = ref(false)

    const fetchCoupons = async (page = 1) => {
      try {
        const { data } = await adminCouponAPI.getAdminCoupons(page)
        if (!data.success) {
          throw new Error('取得優惠券列表失敗')
        }
        coupons.value = data.coupons
        pagination.value = data.pagination
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      }
    }
    fetchCoupons()

    const updateCoupon = async (tempCoupon) => {
      try {
        if (isNew.value) {
          const { data } = await adminCouponAPI.postAdminCoupon(tempCoupon)
          if (!data.success) {
            throw new Error('新增優惠券失敗')
          }
          Toast.fire({
            icon: 'success',
            title: '新增優惠券成功'
          })
          fetchCoupons()
          couponModalOpen.value = false
        } else {
          const { data } = await adminCouponAPI.putAdminCoupon(tempCoupon.id, tempCoupon)
          if (!data.success) {
            throw new Error('更改優惠券失敗')
          }
          Toast.fire({
            icon: 'success',
            title: '修改優惠券成功'
          })
          fetchCoupons()
          couponModalOpen.value = false
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      }
    }

    const deleteCoupon = async () => {
      try {
        const { data } = await adminCouponAPI.deleteAdminCoupon(tempCoupon.value.id)
        if (!data.success) {
          throw new Error('刪除優惠券失敗')
        }
        Toast.fire({
          icon: 'success',
          title: '刪除優惠券成功'
        })
        fetchCoupons()
        delModalOpen.value = false
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      }
    }

    const openCouponModal = (modalStatus, item) => {
      isNew.value = modalStatus
      if (isNew.value) {
        tempCoupon.value = {
          due_date: new Date().getTime() / 1000,
          is_enabled: 0
        }
      } else {
        tempCoupon.value = { ...item }
      }
      couponModalOpen.value = true
    }

    const openDelCouponModal = (item) => {
      tempCoupon.value = { ...item }
      console.log(tempCoupon.value)
      delModalOpen.value = true
    }
    const closeDelModal = () => {
      delModalOpen.value = false
    }
    const closeCouponModal = () => {
      couponModalOpen.value = false
    }

    return {
      coupons,
      pagination,
      tempCoupon,
      isNew,
      couponModalOpen,
      delModalOpen,
      updateCoupon,
      deleteCoupon,
      openDelCouponModal,
      openCouponModal,
      closeDelModal,
      closeCouponModal,
      fetchCoupons
    }
  },
  components: {
    Couponmodal,
    DelModal,
    Pagination
  }
}
</script>
