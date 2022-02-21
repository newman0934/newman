import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/views/index'
import Products from '@/views/products'
import Product from '@/views/product'
import Cart from '@/views/cart'
import Checkout from '@/views/checkout'
import Admin from '@/views/admin/admin'
import AdminProducts from '@/views/admin/products'
import AdminCoupon from '@/views/admin/coupons'
import AdminOrder from '@/views/admin/orders'
import AdminBLog from '@/views/admin/blog'
import Login from '@/views/login'

const token = localStorage.getItem('token')
const hasLogin = (to, from, next) => {
  if (!token) {
    next('/login')
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/checkout/:id',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    beforeEnter: hasLogin,
    children: [
      {
        path: '',
        component: AdminProducts
      },
      {
        path: 'coupon',
        component: AdminCoupon
      },
      {
        path: 'order',
        component: AdminOrder
      },
      {
        path: 'blog',
        component: AdminBLog
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: 'active'
})

export default router
