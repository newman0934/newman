<template>
  <div>
      <div class="text-right mt-4">
      <button class="rounded-md border-[1px] border-primary text-primary px-3 py-2 mb-5 hover:bg-primary hover:text-white" type="button" @click="openProductModal(true)">
        建立新的產品
      </button>
      </div>
    <div class="overflow-x-auto w-full">
          <table class="table-fixed mt-4 w-[200%] md:w-full border-[1px] border-gray-200 rounded-md">
      <thead class="bg-primary border-b-[1px] border-gray-600 text-left">
        <tr class="">
          <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700">分類</th>
          <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700">產品名稱</th>
          <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700">原價</th>
          <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700">售價</th>
          <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700">是否啟用</th>
          <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700">編輯</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 ">
        <tr v-for="item in products" :key="item.id" class="hover:bg-gray-200">
          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{{ item.category }}</td>
          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{{ item.title }}</td>
          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{{ $filters.currency(item.origin_price)}}</td>
          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{{ $filters.currency(item.price)}}</td>
          <td>
            <span v-if="item.is_enabled" class="py-4 px-6 text-sm font-medium whitespace-nowrap text-green-600">啟用</span>
            <span v-else class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">未啟用</span>
          </td>
          <td>
            <div class="flex">
              <button
                class="px-2 py-1 rounded-l border-[1px] border-primary text-primary hover:text-white hover:bg-primary"
                type="button"
                @click="openProductModal(false, item)"
              >編輯</button>
              <button
                class="px-2 py-1 rounded-r border-[1px] border-red-500 text-red-500 hover:text-white hover:bg-red-500"
                type="button"
                @click="openDelProductModal(item)"
              >刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <Pagination :pages="pagination" @emitPages="fetchProducts"></Pagination>
    <DelModal :item="tempProduct" @delItem="delProduct" ref="delModal"></DelModal>
    <ProductModal :product="tempProduct" :isNew="isNew" ref="productModal" @update-product="updateProduct"></ProductModal>
  </div>
</template>
<script>
import adminProductsAPI from '@/apis/admin/products'
import Pagination from '@/components/Pagination'
import DelModal from '@/components/DelModal'
import ProductModal from '@/components/ProductModal'
import { Toast } from '@/utils/sweetAlert'
export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      status: {
        fileUploading: false
      }
    }
  },
  methods: {
    async fetchProducts (page = 1) {
      try {
        const { data } = await adminProductsAPI.getAdminProducts(page)
        this.products = data.products
        this.pagination = data.pagination
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      }
    },
    async delProduct () {
      try {
        const { data } = await adminProductsAPI.deleteAdminProduct(this.tempProduct.id)
        if (!data.success) {
          throw new Error('刪除商品失敗')
        }
        Toast.fire({
          icon: 'success',
          title: '刪除商品成功'
        })
        this.$refs.delModal.hideModal()
        this.fetchProducts()
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      }
    },
    async updateProduct (item) {
      try {
        this.tempProduct = item
        if (this.isNew) {
          const { data } = await adminProductsAPI.postAdminProduct(this.tempProduct)
          console.log(data)
          if (!data.success) {
            throw new Error('新增商品失敗')
          }
          Toast.fire({
            icon: 'success',
            title: '新增商品成功'
          })
          this.$refs.productModal.hideModal()
          this.fetchProducts()
        } else {
          const { data } = await adminProductsAPI.putAdminProduct(this.tempProduct.id, this.tempProduct)
          console.log(data)
          if (!data.success) {
            throw new Error('修改商品失敗')
          }
          Toast.fire({
            icon: 'success',
            title: '修改商品成功'
          })
          this.$refs.productModal.hideModal()
          this.fetchProducts()
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      }
    },
    openDelProductModal (item) {
      this.tempProduct = { ...item }
      this.$refs.delModal.openModal()
    },
    openProductModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
        this.isNew = true
      } else {
        this.tempProduct = { ...item }
        this.isNew = false
      }
      this.$refs.productModal.openModal()
    }
  },
  created () {
    this.fetchProducts()
  },
  components: {
    Pagination,
    DelModal,
    ProductModal
  }
}
</script>
