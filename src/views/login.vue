<template>
  <div>
    <Header></Header>
    <div class="container my-15 py-15">
      <div class="row justify-content-center">
        <h1 class="h3 mb-3 font-weight-normal text-center">請先登入</h1>
        <div class="col-8">
          <v-form id="form" v-slot="{ errors }" class="form-signin">
            <div class="form-floating mb-3">
              <v-field
                type="email"
                class="form-control"
                id="username"
                placeholder="name@example.com"
                autofocus
                v-model="email"
                name="email"
                rules="required|email"
                :class="{ 'is-invalid': errors['email'] }"
              />
              <label for="username">Email address</label>
              <error-message name="email" class="invalid-feedback"></error-message>
            </div>
            <div class="form-floating">
              <v-field
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                v-model="password"
                name="password"
                rules="required|min:8"
                :class="{ 'is-invalid': errors['password'] }"
              />
              <label for="password">Password</label>
              <error-message name="password" class="invalid-feedback"></error-message>
            </div>
            <button
              class="btn btn-lg btn-primary w-100 mt-3"
              type="submit"
              @click.prevent="login()"
              :disabled="isLoading"
            >登入</button>
          </v-form>
        </div>
      </div>
      <p class="mt-5 mb-3 text-muted text-center">&copy; 2021~∞ - 六角學院</p>
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
