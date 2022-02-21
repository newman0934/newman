<template>

  <teleport to="#model">
      <div
      class="bg-modal-bg-opacity flex fixed inset-0 justify-center items-center z-20"
      :class="{ hidden: !modalToggle }"
      @click.self="$emit('closeProductModal')"
    >
      <div class="bg-white max-w-3xl w-full p-10 rounded-md h-screen overflow-y-auto">
        <div class="text-gray-600">
          <h5 class="text-3xl text-center mb-10">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
        </div>
        <div>
          <div class="flex overflow-auto space-x-5">
            <div class="w-[50%]">
              <div class="mb-3">
                <label for="image" class="block mb-5">輸入圖片網址</label>
                <input
                  type="text"
                  class="w-full rounded border-gray-300"
                  id="image"
                  v-model="tempProduct.imageUrl"
                  placeholder="請輸入圖片連結"
                />
              </div>
              <div class="mb-3">
                <label for="customFile" class="block mb-5"
                  >或 上傳圖片
                  <i
                    class="fas fa-spinner fa-spin"
                    v-if="status.fileUploading"
                  ></i>
                </label>
                <input
                  type="file"
                  id="customFile"
                  class="w-full rounded border-gray-300"
                  ref="fileInput"
                  @change="uploadFile"
                />
              </div>
              <img class="img-fluid" :src="tempProduct.imageUrl" />
              <!-- 延伸技巧，多圖 -->
              <div class="mt-5" v-if="tempProduct.imagesUrl">
                <div
                  v-for="(image, key) in tempProduct.imagesUrl"
                  class="mb-3"
                  :key="key"
                >
                  <input
                    type="url"
                    class="w-full rounded border-gray-300"
                    v-model="tempProduct.imagesUrl[key]"
                    placeholder="請輸入連結"
                  />
                  <div>
                    <img class="img-fluid" :src="image"/>
                  </div>
                  <button
                    type="button"
                    class="text-red-600 border-[1px] border-red-600 rounded-md px-3 py-2 hover:bg-red-600 hover:text-white my-5"
                    @click="tempProduct.imagesUrl.splice(key, 1)"
                  >
                    移除圖片
                  </button>
                </div>
                <div
                  v-if="
                    tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1] ||
                    !tempProduct.imagesUrl.length
                  "
                >
                  <button
                    class="text-primary border-[1px] border-primary rounded-md px-3 py-2 hover:bg-primary hover:text-white"
                    @click="tempProduct.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                </div>
              </div>
            </div>
            <div class="w-full">
              <div class="mb-3">
                <label for="title" class="block mb-5">標題</label>
                <input
                  type="text"
                  class="w-full rounded border-gray-300 mb-5"
                  id="title"
                  v-model="tempProduct.title"
                  placeholder="請輸入標題"
                />
              </div>

              <div>
                <div class="mb-3 col-md-6">
                  <label for="category" class="block mb-5">分類</label>
                  <input
                    type="text"
                    class="w-full rounded border-gray-300 mb-5"
                    id="category"
                    v-model="tempProduct.category"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="block mb-5">單位</label>
                  <input
                    type="text"
                    class="w-full rounded border-gray-300 mb-5"
                    id="unit"
                    v-model="tempProduct.unit"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>

              <div>
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="block mb-5">原價</label>
                  <input
                    type="number"
                    class="w-full rounded border-gray-300 mb-5"
                    id="origin_price"
                    min="0"
                    v-model.number="tempProduct.origin_price"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="block mb-5">售價</label>
                  <input
                    type="number"
                    class="w-full rounded border-gray-300 mb-5"
                    id="price"
                    v-model.number="tempProduct.price"
                    min="0"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label for="description" class="block mb-5">產品描述</label>
                <textarea
                  type="text"
                  class="w-full rounded border-gray-300"
                  id="description"
                  v-model="tempProduct.description"
                  placeholder="請輸入產品描述"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="block mb-5">說明內容</label>
                <textarea
                  type="text"
                  class="w-full rounded border-gray-300"
                  id="content"
                  v-model="tempProduct.content"
                  placeholder="請輸入產品說明內容"
                ></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    type="checkbox"
                    v-model="tempProduct.is_enabled"
                    :true-value="1"
                    :false-value="0"
                    id="is_enabled"
                  />
                  <label for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-right space-x-5">
          <button
            type="button"
            class="text-primary border-[1px] border-primary rounded-md px-3 py-2 hover:bg-primary hover:text-white"
            data-bs-dismiss="modal"
            @click="$emit('closeProductModal')"
          >
            取消
          </button>
          <button
            type="button"
            class="text-red-600 border-[1px] border-red-600 rounded-md px-3 py-2 hover:bg-red-600 hover:text-white"
            @click="$emit('update-product', tempProduct)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script>
import productAdminAPI from '@/apis/admin/products.js'
export default {
  props: {
    product: {
      type: Object,
      default () {
        return {
        }
      }
    },
    isNew: {
      type: Boolean,
      default: false
    },
    productModalOpen: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      status: {},
      modal: '',
      tempProduct: {},
      modalToggle: false
    }
  },
  methods: {
    async uploadFile () {
      try {
        const uploadedFile = this.$refs.fileInput.files[0]
        const formData = new FormData()
        formData.append('file-to-upload', uploadedFile)
        this.status.fileUploading = true
        const { data } = await productAdminAPI.uploadFile(formData)
        this.status.fileUploading = false
        if (!data.success) {
          throw new Error('上傳圖片失敗')
        }
        this.tempProduct.imageUrl = data.imageUrl
        this.$refs.fileInput.value = ''
      } catch (error) {
        window.alert(error.message)
      }
    }
  },
  watch: {
    product () {
      this.tempProduct = this.product
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = []
      }
      if (!this.tempProduct.imageUrl) {
        this.tempProduct.imageUrl = ''
      }
    },
    productModalOpen () {
      this.modalToggle = this.productModalOpen
    }
  }
}
</script>
