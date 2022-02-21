<template>
  <teleport to='#model'>
<div class="bg-modal-bg-opacity flex fixed inset-0 justify-center items-center z-20" :class="{hidden: !modalToggle}" @click="$emit('closeCouponModal')">
        <div class="bg-white max-w-3xl w-full p-10 rounded-md">
                  <h5 class="text-center text-gray-600 text-3xl mb-3">
            <span v-if="isNew">新增優惠卷</span>
            <span v-else>編輯優惠卷</span>
          </h5>
          <form>
            <div class="mb-3">
            <label class="block text-gray-600 mb-2" for="title">標題</label>
            <input
              type="text"
              class="w-full border-gray-400 rounded-md mb-2"
              id="title"
              v-model="tempCoupon.title"
              placeholder="請輸入標題"
            />
          </div>
          <div class="mb-3">
            <label class="block text-gray-600 mb-2" for="coupon_code">優惠碼</label>
            <input
              type="text"
              class="w-full border-gray-400 rounded-md mb-2"
              id="coupon_code"
              v-model="tempCoupon.code"
              placeholder="請輸入優惠碼"
            />
          </div>
          <div class="mb-3">
            <label class="block text-gray-600 mb-2" for="due_date">到期日</label>
            <input type="date" class="w-full border-gray-400 rounded-md mb-2" id="due_date" v-model="due_date" />
          </div>
          <div class="mb-3">
            <label class="block text-gray-600 mb-2" for="price">折扣百分比</label>
            <input
              type="number"
              class="w-full border-gray-400 rounded-md mb-2"
              id="price"
              min="0"
              v-model.number="tempCoupon.percent"
              placeholder="請輸入折扣百分比"
            />
          </div>
          <div class="mb-3">
            <div class="flex items-center">
              <input
                class=""
                type="checkbox"
                :true-value="1"
                :false-value="0"
                v-model="tempCoupon.is_enabled"
                id="is_enabled"
              />
              <label class="ml-3" for="is_enabled">是否啟用</label>
            </div>
          </div>
          </form>
                  <div class="text-right space-x-5">
          <button type="button" class="border-[1px] rounded-md border-primary text-primary px-3 py-2 hover:bg-primary hover:text-white" data-bs-dismiss="modal" @click="$emit('closeCouponModal')">Close</button>
          <button
            type="button"
            class="border-[1px] rounded-md border-red-600 text-red-600 px-3 py-2 hover:bg-red-600 hover:text-white"
            @click="$emit('update-coupon', tempCoupon)"
          >更新優惠券</button>
        </div>
      </div>
</div>
  </teleport>
</template>
<script>
export default {
  props: {
    coupon: {
      type: Object,
      default () {
        return {}
      }
    },
    isNew: {
      type: Boolean,
      default: false
    },
    couponModalOpen: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tempCoupon: {},
      due_date: '',
      modalToggle: false
    }
  },
  watch: {
    coupon () {
      this.tempCoupon = this.coupon
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000)
        .toISOString().split('T');
      [this.due_date] = dateAndTime
    },
    due_date () {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000)
    },
    couponModalOpen () {
      this.modalToggle = this.couponModalOpen
    }
  }
}
</script>
