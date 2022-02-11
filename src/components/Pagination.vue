<template>
  <nav aria-label="Page navigation ">
    <ul class="flex justify-center mt-5">
      <li class="py-2" :class="{'disabled': pages.current_page === 1}">
        <a
          class="border-[1px] border-gray-200 px-3 py-2 hover:border-primary hover:bg-primary hover:text-white"
          href="#"
          aria-label="Previous"
          @click.prevent="emitPages(pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="(item, index) in pages.total_pages"
        :key="index"
       class="py-2"
        :class="{'active': item === pages.current_page}"
      >
        <span class="border-[1px] border-gray-200 px-3 py-2 hover:border-primary hover:bg-primary hover:text-white" v-if="item === pages.current_page">{{ item }}</span>
        <a class="border-[1px] border-gray-200 px-3 py-2 hover:border-primary hover:bg-primary hover:text-white" href="#" v-else @click.prevent="emitPages(item)">{{ item }}</a>
      </li>
      <li class="py-2" :class="{'disabled': pages.current_page === pages.total_pages}">
        <a
          class="border-[1px] border-gray-200 px-3 py-2 hover:border-primary hover:bg-primary hover:text-white"
          href="#"
          aria-label="Next"
          @click.prevent="emitPages(pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: {
    pages: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    emitPages (item) {
      this.$emit('emit-pages', item)
    }
  }
}
</script>
<style scoped>
.active{
  background: #FFA042;
  color: white;
}

</style>
