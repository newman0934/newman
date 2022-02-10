<template>
  <div>
    <Header></Header>
    <div class="xl:max-container mx-auto my-16 py-16">
      <h1 class="mb-3 text-5xl text-center">請先登入</h1>
          <v-form id="form" v-slot="{ errors }" class="xl:w-[800px] mx-auto  bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-10">
            <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Email address</label>
              <v-field
                type="email"
                class="shadow border-black rounded w-full py-2 px-3 focus:border-primary text-gray-700 leading-tight focus:ring-0"
                id="username"
                placeholder="name@example.com"
                autofocus
                v-model="email"
                name="email"
                rules="required|email"
                :class="{ 'is-invalid': errors['email'] }"
              />
              <error-message name="email" class="invalid-feedback text-red-600"></error-message>
            </div>
            <div class="mb-10">
              <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <v-field
                type="password"
                class="shadow border focus:border-primary rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-0"
                id="password"
                placeholder="Password"
                v-model="password"
                name="password"
                rules="required|min:8"
                :class="{ 'is-invalid': errors['password'] }"
              />
              <error-message name="password" class="invalid-feedback text-red-600"></error-message>
            </div>
            <button
              class="py-3 border-[1px] border-primary text-primary rounded-lg w-full mt-3 hover:bg-primary hover:text-white"
              type="submit"
              @click.prevent="login()"
              :disabled="isLoading"
            >登入</button>
          </v-form>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import loginAPI from '../apis/login'
import { Toast } from '../utils/sweetAlert'
export default {
  data () {
    return {
      email: '',
      password: '',
      isLoading: false
    }
  },
  methods: {
    async login () {
      try {
        this.isLoading = true
        if (!this.email || !this.email) {
          throw new Error('請輸入帳密')
        }
        const user = {
          username: this.email,
          password: this.password
        }
        const { data } = await loginAPI.login(user)
        if (!data.success) {
          throw new Error('無法登入')
        }
        localStorage.setItem('token', data.token)
        this.isLoading = false
        this.$router.replace('/admin')
      } catch (err) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: err.message
        })
      }
    }
  },
  components: {
    Header,
    Footer
  }
}
</script>
