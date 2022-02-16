<template>
<teleport to='#model'>
    <div class="bg-modal-bg-opacity fixed flex inset-0 justify-center items-center z-20 transition duration-1000" :class="{hidden:!modalToggle}">
      <div class="bg-white max-w-3xl w-full p-10 rounded-md">
                  <h5 class="text-center text-3xl mb-5">
            <span>刪除 {{ item.title }}</span>
          </h5>
        <p class="text-red-600 text-center text-2xl mb-5">是否刪除 <strong>{{ item.title }}</strong> (刪除後將無法恢復)。</p>
        <div class="text-center space-x-5">
          <button type="button" class="text-primary border-[1px] border-primary rounded-md px-3 py-2 hover:bg-primary hover:text-white"
                 @click="$emit('closeDelModal')">取消
          </button>
          <button type="button" class="text-red-600 border-[1px] border-red-600 rounded-md px-3 py-2 hover:bg-red-600 hover:text-white"
                  @click="$emit('delItem')">確認刪除
          </button>
        </div>
      </div>
  </div>
</teleport>
</template>
<script>
export default {
  data () {
    return {
      modalToggle: false
    }
  },
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    delModalOpen: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    delModalOpen () {
      this.modalToggle = this.delModalOpen
    }
  }
}
</script>
