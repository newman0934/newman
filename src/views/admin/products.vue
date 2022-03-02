<template>
  <div class="xl:max-container mx-auto mb-20">
      <div class="text-right mt-4">
      <button class="rounded-md border-[1px] border-primary text-primary px-3 py-2 mb-5 hover:bg-primary hover:text-white" type="button" @click="openProductModal(true)">
        建立新的產品
      </button>
      </div>
    <div class="overflow-x-auto w-full">
          <table class="table-auto mt-4 border-[1px] border-gray-200 rounded-md w-full">
      <thead class="bg-primary border-b-[1px] border-gray-600 text-left">
        <tr class="">
          <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700 whitespace-nowrap">分類</th>
          <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700 whitespace-nowrap">產品名稱</th>
          <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700 whitespace-nowrap">原價</th>
          <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700 whitespace-nowrap">售價</th>
          <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700 whitespace-nowrap">是否啟用</th>
          <th class="py-3 px-6 text-md font-medium tracking-wider text-gray-700 whitespace-nowrap">編輯</th>
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
                class="px-2 py-1 rounded-l border-[1px] border-primary text-primary hover:text-white hover:bg-primary whitespace-nowrap"
                type="button"
                @click="openProductModal(false, item)"
              >編輯</button>
              <button
                class="px-2 py-1 rounded-r border-[1px] border-red-500 text-red-500 hover:text-white hover:bg-red-500 whitespace-nowrap"
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
    <DelModal :item="tempProduct" :delModalOpen="delModalOpen" @delItem="delProduct" @closeDelModal="closeDelModal"></DelModal>
    <ProductModal :product="tempProduct" :isNew="isNew" :productModalOpen="productModalOpen" @update-product="updateProduct" @closeProductModal="closeProductModal"></ProductModal>
  </div>
</template>
<script>
import adminProductsAPI from '@/apis/admin/products'
import Pagination from '@/components/Pagination'
import DelModal from '@/components/DelModal'
import ProductModal from '@/components/ProductModal'
import { Toast } from '@/utils/sweetAlert'
import { ref } from 'vue'
export default {
  data () {
    return {
      // products: [],
      // pagination: {},
      // tempProduct: {},
      // isNew: false,
      // status: {
      //   fileUploading: false
      // },
      // productModalOpen: false,
      // delModalOpen: false
    }
  },
  methods: {
    // async fetchProducts (page = 1) {
    //   try {
    //     const { data } = await adminProductsAPI.getAdminProducts(page)
    //     this.products = data.products
    //     this.pagination = data.pagination
    //   } catch (error) {
    //     Toast.fire({
    //       icon: 'error',
    //       title: error.message
    //     })
    //   }
    // },
    // async delProduct () {
    //   try {
    //     const { data } = await adminProductsAPI.deleteAdminProduct(this.tempProduct.id)
    //     if (!data.success) {
    //       throw new Error('刪除商品失敗')
    //     }
    //     Toast.fire({
    //       icon: 'success',
    //       title: '刪除商品成功'
    //     })
    //     this.delModalOpen = false
    //     this.fetchProducts()
    //   } catch (error) {
    //     Toast.fire({
    //       icon: 'error',
    //       title: error.message
    //     })
    //   }
    // },
    // async updateProduct (item) {
    //   try {
    //     this.tempProduct = item
    //     if (this.isNew) {
    //       const { data } = await adminProductsAPI.postAdminProduct(this.tempProduct)
    //       console.log(data)
    //       if (!data.success) {
    //         throw new Error('新增商品失敗')
    //       }
    //       Toast.fire({
    //         icon: 'success',
    //         title: '新增商品成功'
    //       })
    //       this.productModalOpen = false
    //       this.fetchProducts()
    //     } else {
    //       const { data } = await adminProductsAPI.putAdminProduct(this.tempProduct.id, this.tempProduct)
    //       console.log(data)
    //       if (!data.success) {
    //         throw new Error('修改商品失敗')
    //       }
    //       Toast.fire({
    //         icon: 'success',
    //         title: '修改商品成功'
    //       })
    //       this.productModalOpen = false
    //       this.fetchProducts()
    //     }
    //   } catch (error) {
    //     Toast.fire({
    //       icon: 'error',
    //       title: error.message
    //     })
    //   }
    // },
    // openDelProductModal (item) {
    //   this.tempProduct = { ...item }
    //   this.delModalOpen = true
    // },
    // openProductModal (isNew, item) {
    //   if (isNew) {
    //     this.tempProduct = {}
    //     this.isNew = true
    //   } else {
    //     this.tempProduct = { ...item }
    //     this.isNew = false
    //   }
    //   this.productModalOpen = true
    // },
    // closeDelModal () {
    //   this.delModalOpen = false
    // },
    // closeProductModal () {
    //   this.productModalOpen = false
    // }
  },
  setup () {
    const products = ref([])
    const pagination = ref({})
    const tempProduct = ref({})
    const isNew = ref(false)
    const status = ref({
      fileUploading: false
    })
    const productModalOpen = ref(false)
    const delModalOpen = ref(false)

    const fetchProducts = async (page = 1) => {
      try {
        const { data } = await adminProductsAPI.getAdminProducts(page)
        products.value = data.products
        pagination.value = data.pagination
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      }
    }
    fetchProducts()

    const delProduct = async () => {
      try {
        const { data } = await adminProductsAPI.deleteAdminProduct(tempProduct.value.id)
        if (!data.success) {
          throw new Error('刪除商品失敗')
        }
        Toast.fire({
          icon: 'success',
          title: '刪除商品成功'
        })
        delModalOpen.value = false
        fetchProducts()
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      }
    }

    const updateProduct = async (item) => {
      try {
        tempProduct.value = item
        if (isNew.value) {
          const { data } = await adminProductsAPI.postAdminProduct(tempProduct.value)
          if (!data.success) {
            throw new Error('新增商品失敗')
          }
          Toast.fire({
            icon: 'success',
            title: '新增商品成功'
          })
          productModalOpen.value = false
          fetchProducts()
        } else {
          const { data } = await adminProductsAPI.putAdminProduct(tempProduct.value.id, tempProduct.value)
          if (!data.success) {
            throw new Error('修改商品失敗')
          }
          Toast.fire({
            icon: 'success',
            title: '修改商品成功'
          })
          productModalOpen.value = false
          fetchProducts()
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: error.message
        })
      }
    }

    const openDelProductModal = (item) => {
      tempProduct.value = { ...item }
      delModalOpen.value = true
    }
    const openProductModal = (modalStatus, item) => {
      if (modalStatus) {
        tempProduct.value = {}
        isNew.value = true
      } else {
        tempProduct.value = { ...item }
        isNew.value = false
      }
      productModalOpen.value = true
    }
    const closeDelModal = () => {
      delModalOpen.value = false
    }
    const closeProductModal = () => {
      productModalOpen.value = false
    }

    return {
      products,
      pagination,
      tempProduct,
      isNew,
      status,
      productModalOpen,
      delModalOpen,
      fetchProducts,
      delProduct,
      updateProduct,
      openDelProductModal,
      openProductModal,
      closeDelModal,
      closeProductModal
    }
  },
  components: {
    Pagination,
    DelModal,
    ProductModal
  }
}
</script>
